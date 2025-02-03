import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();



async function executeSQLFile(filePath: string) {
  try {
    const sql = fs.readFileSync(filePath, "utf8");

       // Split SQL statements on semicolons
       const statements = sql.split(/;\s*$/gm).filter(statement => statement.trim() !== '');

       for (const statement of statements) {
         console.log("statments",statement )
         await prisma.$executeRawUnsafe(statement);
       }

      // await prisma.$executeRawUnsafe(sql);
    console.log(`✅ Executed: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error executing ${filePath}:`, error);
  }
}


  async function  seedingProcedured() {
    console.log("🚀 Starting proc seeding...");
  
  const seedDir = path.join(__dirname, "./procs");
  const procFiles = fs.readdirSync(seedDir).sort(); // Ensure files run in order
  
    console.log("proc files>>>>" ,procFiles , "proc files>>>>")
    for (const file of procFiles) {
      const filePath = path.join(seedDir, file);
      await executeSQLFile(filePath);
    }

    console.log("🚀  proc seeding completed...");
  }

 
async function main() {
  console.log("🚀 Starting database seed...");

  // Truncate tables (with CASCADE to remove dependencies) ,  makw sure to mentiona all the table before 
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE   cities  , countries ,permissions ,roles ,states ,type_of_user , vhicle_services , cities ,localities  RESTART IDENTITY CASCADE;
  `);

  const seedDir = path.join(__dirname, "./queries");
  const files = fs.readdirSync(seedDir).sort(); // Ensure files run in order

  console.log(">>",files,">>")
  for (const file of files) {
    const filePath = path.join(seedDir, file);
    await executeSQLFile(filePath);
  }
  console.log("🎉 Database seeding complete.");



    await seedingProcedured()


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
