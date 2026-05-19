import z from "zod"
export const contatoSchema = z.object({
    nome: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("Email inválido"),
    telefone: z.string().min(1, "O telefone é obrigatório"),
    mensagem: z.string().min(1, "A mensagem é obrigatória")

});

export type ContatoSchemaType = z.infer<typeof contatoSchema>;