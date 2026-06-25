import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "./email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", "http://192.168.18.205:3000"],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-radius: 8px;">
          <h2 style="color: #0f172a; margin-bottom: 16px;">Recuperação de Senha</h2>
          <p style="color: #334155; font-size: 14px; line-height: 24px;">
            Olá, você solicitou a redefinição de senha para a sua conta. Clique no botão abaixo para criar uma nova senha:
          </p>
          <div style="margin: 24px 0; text-align: center;">
            <a href="${url}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 6px; display: inline-block;">
              Redefinir Minha Senha
            </a>
          </div>
          <p style="color: #64748b; font-size: 12px; line-height: 20px;">
            Se o botão não funcionar, copie e cole o link a seguir no seu navegador:<br />
            <a href="${url}" style="color: #2563eb;">${url}</a>
          </p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 11px;">
            Se você não solicitou essa alteração, pode ignorar este e-mail com segurança.
          </p>
        </div>
      `;

      await sendEmail({
        to: user.email,
        subject: "Redefinição de Senha - Oliver Imports",
        html: emailHtml,
      });
    },
    onPasswordReset: async ({ user }, request) => {
      console.log(`🔒 A senha do usuário ${user.email} foi alterada com sucesso.`);
    },
  },
});
