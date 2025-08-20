import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { hashPassword } from '@/lib/auth/session';

async function seedUsers() {
    console.log('Seeding users...');

    const usersData = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            passwordHash: await hashPassword('password123'),
            role: 'admin'
        },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            passwordHash: await hashPassword('password123'),
            role: 'manager'
        },
        {
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            passwordHash: await hashPassword('password123'),
            role: 'member'
        },
        {
            name: 'Sarah Williams',
            email: 'sarah.williams@example.com',
            passwordHash: await hashPassword('password123'),
            role: 'member'
        },
        {
            name: 'David Brown',
            email: 'david.brown@example.com',
            passwordHash: await hashPassword('password123'),
            role: 'member'
        },
        {
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            passwordHash: await hashPassword('password123'),
            role: 'manager'
        },
        {
            name: 'Chris Wilson',
            email: 'chris.wilson@example.com',
            passwordHash: await hashPassword('password123'),
            role: 'member'
        },
        {
            name: 'Lisa Anderson',
            email: 'lisa.anderson@example.com',
            passwordHash: await hashPassword('password123'),
            role: 'member'
        },
        {
            name: 'Robert Taylor',
            email: 'robert.taylor@example.com',
            passwordHash: await hashPassword('password123'),
            role: 'member'
        },
        {
            name: 'Maria Garcia',
            email: 'maria.garcia@example.com',
            passwordHash: await hashPassword('password123'),
            role: 'member'
        }
    ];

    try {
        const insertedUsers = await db.insert(users).values(usersData).returning();
        console.log(`Successfully seeded ${insertedUsers.length} users`);
        return insertedUsers;
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

seedUsers()
.catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });

