import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Charge les variables d'environnement
dotenv.config();

@Injectable()
// Herite de PrismaClient pour avoir acces aux methodes de base de donnees
// Implements OnModuleInit et OnModuleDestroy pour gerer le cycle de vie de la connexion
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Cree un pool de connexions PostgreSQL
    // Le pool permet de gerer plusieurs connexions simultanees a la BDD
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // Cree un adaptateur Prisma pour PostgreSQL
    const adapter = new PrismaPg(pool);

    // Initialise PrismaClient avec l'adaptateur
    super({ adapter });
  }

  // Methode executee automatiquement quand le module est charge
  // Etablit la connexion a la base de donnees
  async onModuleInit() {
    await this.$connect();
  }

  // Methode executee automatiquement quand le module est detruit
  // Ferme proprement toutes les connexions
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
