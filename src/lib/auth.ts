import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", "http://192.168.18.205:3000"],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    }
});
