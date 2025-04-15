import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { procs } from "./procs/procs";

const prisma = new PrismaClient();



async function executeSQLFile(filePath: string) {
  try {
    const sql = fs.readFileSync(filePath, "utf8");

       // Split SQL statements on semicolons
       const statements = sql.split(/;\s*$/gm).filter(statement => statement.trim() !== '');

       for (const statement of statements) {
          //  console.log("statments",statement )
         await prisma.$executeRawUnsafe(statement);
       }

      // await prisma.$executeRawUnsafe(sql);
    console.log(`✅ Executed: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error executing ${filePath}:`, error);
  }
}





async function executeProcFile(procName:string , procBody:string) {
  try {

    await prisma.$executeRawUnsafe(procBody);
      // await prisma.$executeRawUnsafe(sql);
    console.log(`✅ seeder Executed of proc: ${procName}`);
  } catch (error) {
    console.error(`❌ seeder Error in proc :  ${procName}:`, error);
  }
}



  async function  seedingProcedured() {
    console.log("🚀 Starting proc seeding...");
  
    for(let [procName ,  procBody] of Object.entries(procs)  ) {
      await executeProcFile(procName ,  procBody  )
     }


    console.log("🚀  proc seeding completed...");
  }

 
async function main() {
  console.log("🚀 Starting database seed...");

  // Truncate tables (with CASCADE to remove dependencies) ,  makw sure to mentiona all the table before 


  let oldQuery2 = ` 
  
    SET session_replication_role = 'replica';

  -- Step 1: DELETE all data from each table one by one
  DELETE FROM cities;
  DELETE FROM countries;
  DELETE FROM permissions;
  DELETE FROM roles;
  DELETE FROM utils_status;
  DELETE FROM utils_status_names;
  DELETE FROM utils_config;
  DELETE FROM states;
  DELETE FROM type_of_user;
  DELETE FROM type_of_vhicle;
  DELETE FROM vhicle_services;
  DELETE FROM localities; 
  DELETE FROM nav_items; 
  DELETE FROM sub_nav_items; 
  DELETE FROM travel_ways; 
  



  -- Step 2: Reset ID sequences
  ALTER SEQUENCE utils_status_id_seq RESTART WITH 1;
  ALTER SEQUENCE utils_status_names_id_seq RESTART WITH 1;
  ALTER SEQUENCE utils_config_id_seq RESTART WITH 1;
  ALTER SEQUENCE countries_id_seq RESTART WITH 1;
  ALTER SEQUENCE states_id_seq RESTART WITH 1;
  ALTER SEQUENCE cities_id_seq RESTART WITH 1;
  ALTER SEQUENCE permissions_id_seq RESTART WITH 1;
  ALTER SEQUENCE type_of_user_id_seq RESTART WITH 1;
  ALTER SEQUENCE type_of_vhicle_id_seq RESTART WITH 1;
  ALTER SEQUENCE vhicle_services_id_seq RESTART WITH 1;
  ALTER SEQUENCE roles_id_seq RESTART WITH 1;
  ALTER SEQUENCE localities_id_seq RESTART WITH 1;
  ALTER SEQUENCE nav_items_id_seq RESTART WITH 1;
  ALTER SEQUENCE sub_nav_items_id_seq RESTART WITH 1;
  ALTER SEQUENCE travel_ways_id_seq RESTART WITH 1;

  
  -- Re-enable foreign key constraints
  SET session_replication_role = 'origin';
  `

   let dltBeforeQueries1 = `
    TRUNCATE TABLE   cities  , countries ,permissions , roles ,states ,
    type_of_user , type_of_vhicle , vhicle_services , cities ,localities ,
    utils_status_names , utils_status , utils_config 
    RESTART IDENTITY CASCADE;

    `



  const statements = oldQuery2.split(/;\s*$/gm).filter(statement => statement.trim() !== '');
        for (const statement of statements) {
        //  console.log("statments",statement )
          await prisma.$executeRawUnsafe(statement);
        }



  const seedDir = path.join(__dirname, "./queries");
  const files = fs.readdirSync(seedDir).sort(); // Ensure files run in order

  console.log(">>",files,">>")
  for (const file of files) {
    const filePath = path.join(seedDir, file);
    await executeSQLFile(filePath);
  }
  console.log("🎉 Database seeding complete.");

    // procs 
    // await seedingProcedured()
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
