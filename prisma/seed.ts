import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create default users
  await prisma.users.create({
    data: {email:"random222@gmail.com" ,password:"rdsdsdskd" , user_type:1 ,updated_on:new Date()}
  });

 
  console.log("Database seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
