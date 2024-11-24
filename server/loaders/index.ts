import expressLoader from "./express";
import databaseLoader from "./postgres";

export default async ({ expressApp }) => {
  try {
    // Initialize database first
    await databaseLoader();
    console.log("✅ Database loaded");

    expressLoader({ app: expressApp });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
