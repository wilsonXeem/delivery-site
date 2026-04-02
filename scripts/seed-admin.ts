import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  const { seedDefaultAdmin } = await import("../lib/seed");

  const result = await seedDefaultAdmin();

  if (result.created) {
    console.log("Default admin created successfully.");
    return;
  }

  if (result.updated) {
    console.log("Default admin credentials synchronized successfully.");
    return;
  }

  console.log(result.reason ?? "Default admin was not created.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
