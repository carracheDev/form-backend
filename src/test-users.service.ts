// test-users.service.ts
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma/prisma.service';

async function testUsersService() {
  const prismaService = new PrismaService();
  const usersService = new UsersService(prismaService);

  try {
    await prismaService.onModuleInit();
    console.log('✅ Connexion à la base de données réussie !');

    // Utiliser un email unique avec un timestamp
    const email = `test-${Date.now()}@example.com`;
    const name = 'Test User';
    const password = 'password123';
    const verifyToken = 'test-verify-token';

    // Tester la création d'un utilisateur
    const newUser = await usersService.create(
      email,
      name,
      password,
      verifyToken,
    );
    console.log('Nouvel utilisateur créé :', newUser);

    // Tester la recherche par email
    const foundUser = await usersService.findByEmail(email);
    console.log('Utilisateur trouvé par email :', foundUser);

    // Tester la recherche par ID
    const foundUserById = await usersService.findById(newUser.id);
    console.log('Utilisateur trouvé par ID :', foundUserById);

    // Tester la recherche de tous les utilisateurs
    const allUsers = await usersService.findAll();
    console.log('Tous les utilisateurs :', allUsers);
  } catch (error) {
    console.error('❌ Erreur :', error);
  } finally {
    await prismaService.onModuleDestroy();
  }
}

testUsersService();
