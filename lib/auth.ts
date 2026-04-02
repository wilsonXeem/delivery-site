import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

import { authenticateAdmin } from "@/lib/admin-auth";
import { loginSchema } from "@/lib/validation";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Admin login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          if (process.env.NODE_ENV === "development") {
            console.warn("[auth] Admin sign-in rejected: validation_failed");
          }
          return null;
        }

        const result = await authenticateAdmin(parsed.data.email, parsed.data.password);

        if (!result.ok) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`[auth] Admin sign-in rejected: ${result.reason}`, { email: result.email });
          }

          return null;
        }

        return {
          id: result.admin.id,
          email: result.admin.email,
          name: result.admin.name,
          role: result.admin.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? "";
        session.user.role = token.role ?? "admin";
      }

      return session;
    },
  },
};

export async function getServerAuthSession() {
  return getServerSession(authOptions);
}

export async function requireAdminSession() {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    redirect("/admin/login");
  }

  return session;
}

export async function assertAdminSession() {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  return session;
}
