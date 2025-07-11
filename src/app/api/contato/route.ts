import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContatoRequestBody {
  nome: string;
  email: string;
  telefone?: string;
  mensagem: string;
}

export async function POST(request: Request) {
  let body: ContatoRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { nome, email, telefone = "Não informado", mensagem } = body;

  if (!nome || !email || !mensagem) {
    return NextResponse.json({ error: "Campos obrigatórios faltando (nome, email ou mensagem)" }, { status: 400 });
  }

  try {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailResponse = await transporter.sendMail({
      from: `"${nome}" <${process.env.SMTP_USER}>`, 
      replyTo: email,
      to: process.env.MAIL_TO,
      subject: "📩 Nova mensagem do portfólio",
      html: `
        <h2>Nova mensagem recebida</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Mensagem:</strong></p>
        <blockquote>${mensagem}</blockquote>
      `,
    });

    return NextResponse.json({ success: true, messageId: mailResponse.messageId });
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    return NextResponse.json({ error: "Erro interno ao enviar e-mail" }, { status: 500 });
  }
}
