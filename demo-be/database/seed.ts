import dotenv from "dotenv";
import pool from "../src/config/database";
import { seedDatabase, runMigrations } from "../src/utils/db-init";

dotenv.config();

/**
 * Standalone script to run migrations and seed the database
 * Usage: npm run seed
 */
async function main() {
  try {
    console.log("🔄 Running migrations...");
    await runMigrations();

    console.log("\n🌱 Starting database seeding...");
    await seedDatabase(true); // Force seed (clear existing data)

    console.log("\n🏁 Migration and seeding completed!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await pool.end();
    console.log("🔌 Database connection closed");
  }
}

// Run the main function
main();
