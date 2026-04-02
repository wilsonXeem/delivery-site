import { syncDefaultAdminFromEnvironment } from "@/lib/admin-auth";

export type SeedAdminResult = {
  created: boolean;
  updated: boolean;
  skipped: boolean;
  reason?: string;
};

let seedPromise: Promise<SeedAdminResult> | null = null;

async function runSeed() {
  const result = await syncDefaultAdminFromEnvironment();

  return {
    created: result.created,
    updated: result.updated,
    skipped: result.skipped,
    reason: result.reason,
  };
}

export async function seedDefaultAdmin() {
  if (!seedPromise) {
    seedPromise = runSeed().finally(() => {
      seedPromise = null;
    });
  }

  return seedPromise;
}

export async function ensureDefaultAdmin() {
  return seedDefaultAdmin();
}
