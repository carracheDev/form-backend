// src/auth/auth.service.ts
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    this.logger.log(`Registering user: ${registerDto.email}`);
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà.');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const user = await this.usersService.create(
      registerDto.email,
      registerDto.name,
      hashedPassword,
      verifyToken,
    );
    return user;
  }

  //Ajout d'une methode pour vérifier l'email
  async verifyEmail(token: string) {
    const user = await this.usersService.findByVerifyToken(token);
    if (!user) {
      throw new NotFoundException('Token de vérification invalide.');
    }
    return this.usersService.markEmailAsVerified(user.id);
  }

  async login(loginDto: LoginDto) {
    this.logger.log(`Logging in user: ${loginDto.email}`);
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
