"use server"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getSession() { 
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        return session;
    } catch (error) {
        console.error("Erro ao obter sessão:", error);
        return null;
    }
}


async function handleLogout() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
}

export { getSession, handleLogout };