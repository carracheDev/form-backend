import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
// Le service est injectable dans tous les autres composants (controllers, guards, etc.)
export class UsersService {
  // Injection de dependance de PrismaService via le constructeur
  // Cela permet d'acceder a la base de donnees
  constructor(private prisma: PrismaService) {}

  // Cree un nouvel utilisateur
  // @param email - Adresse email unique
  // @param name - Nom de l'utilisateur
  // @param password - Mot de passe hashe (NE JAMAIS passer le mot de passe en clair!)
  // @param verifyToken - Token pour verifier l'adresse email
  // @returns Promise<User> - L'utilisateur cree
  async create(
    email: string,
    name: string,
    password: string,
    verifyToken: string,
  ): Promise<User> {
    try {
      // Prisma.create() insert un nouvel enregistrement dans la table User
      return await this.prisma.user.create({
        data: {
          email,
          name,
          password,
          verifyToken: verifyToken || null,
        },
      });
    } catch (error) {
      // Gestion des erreurs Prisma
      // P2002 = "Record to update not found" - violation d'unicite
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // Genere une exception 409 Conflict
          throw new ConflictException(
            `Un utilisateur avec l'email ${email} existe deja.`,
          );
        }
      }
      // Rethrow les autres erreurs
      throw error;
    }
  }

  // Recherche un utilisateur par son token de verification
  // Utilise lors de la verification d'email
  async findByVerifyToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { verifyToken: token },
    });
  }

  // Marque l'email comme verifie
  // Met a jour emailVerified = true et supprime le token
  async markEmailAsVerified(id: number): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { emailVerified: true, verifyToken: null },
    });
  }

  // Recherche un utilisateur par son email
  // Retourne null si aucun utilisateur n'est trouve
  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Recherche un utilisateur par son ID
  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Retourne tous les utilisateurs (attention: ne pas exposer en production!)
  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
