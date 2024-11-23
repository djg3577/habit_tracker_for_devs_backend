import expressLoader from "./express";

export default async ({ expressApp }) => {
  try {
    expressLoader({ app: expressApp });
  } catch (e) {
    console.log(e)
    process.exit(1);
  }
};
