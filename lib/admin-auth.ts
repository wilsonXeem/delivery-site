import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export type DefaultAdminConfig = {
  email: string;
  name: string;
  password: string;
};

export type DefaultAdminSyncResult = {
  admin: {
    email: string;
    id: string;
    name: string;
    role: string;
  } | null;
  created: boolean;
  updated: boolean;
  skipped: boolean;
  reason?: string;
};

export type AdminAuthResult =
  | {
      admin: {
        email: string;
        id: string;
        name: string;
        role: string;
      };
      ok: true;
      source: "database" | "environment";
    }
  | {
      email: string;
      ok: false;
      reason: "admin_not_found" | "password_mismatch";
    };

function serializeAdmin(admin: {
  _id?: { toString(): string } | string;
  email: string;
  id?: string;
  name: string;
  role: string;
}) {
  return {
    email: admin.email,
    id: admin.id ?? String(admin._id),
    name: admin.name,
    role: admin.role,
  };
}

export function getDefaultAdminConfig(): DefaultAdminConfig | null {
  const name = process.env.ADMIN_NAME?.trim();
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!name || !email || !password) {
    return null;
  }

  return {
    email,
    name,
    password,
  };
}

export function normalizeAdminEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function syncDefaultAdminFromEnvironment(): Promise<DefaultAdminSyncResult> {
  const config = getDefaultAdminConfig();

  if (!config) {
    return {
      admin: null,
      created: false,
      updated: false,
      skipped: true,
      reason: "ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD must be set to seed the default admin.",
    };
  }

  await connectToDatabase();

  const existingAdmin = await Admin.findOne({
    email: config.email,
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(config.password, 12);

    const admin = await Admin.create({
      email: config.email,
      name: config.name,
      passwordHash,
      role: "admin",
    });

    return {
      admin: serializeAdmin(admin),
      created: true,
      updated: false,
      skipped: false,
    };
  }

  let shouldUpdate = false;

  if (existingAdmin.name !== config.name) {
    existingAdmin.name = config.name;
    shouldUpdate = true;
  }

  if (existingAdmin.role !== "admin") {
    existingAdmin.role = "admin";
    shouldUpdate = true;
  }

  const currentPasswordMatches = await bcrypt.compare(config.password, existingAdmin.passwordHash);

  if (!currentPasswordMatches) {
    existingAdmin.passwordHash = await bcrypt.hash(config.password, 12);
    shouldUpdate = true;
  }

  if (shouldUpdate) {
    await existingAdmin.save();
  }

  return {
    admin: serializeAdmin(existingAdmin),
    created: false,
    updated: shouldUpdate,
    skipped: !shouldUpdate,
    reason: shouldUpdate
      ? "Default admin credentials synchronized from environment."
      : "Default admin already matches environment credentials.",
  };
}

export async function authenticateAdmin(email: string, password: string): Promise<AdminAuthResult> {
  const normalizedEmail = normalizeAdminEmail(email);

  // Ensure the default admin is seeded/synced before attempting auth
  await syncDefaultAdminFromEnvironment();

  await connectToDatabase();

  const admin = await Admin.findOne({ email: normalizedEmail });

  if (!admin) {
    return {
      email: normalizedEmail,
      ok: false,
      reason: "admin_not_found",
    };
  }

  const passwordMatches = await bcrypt.compare(password.trim(), admin.passwordHash);

  if (!passwordMatches) {
    return {
      email: normalizedEmail,
      ok: false,
      reason: "password_mismatch",
    };
  }

  return {
    admin: serializeAdmin(admin),
    ok: true,
    source: "database",
  };
}
