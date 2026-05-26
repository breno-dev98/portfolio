import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjetoProps } from "../types";
import { Trash2 } from "lucide-react";
import { deletarProjeto } from "../actions";

export function CardProjeto({ projeto }: { projeto: ProjetoProps }) {
  return (
    <Card className="w-full h-fit bg-background rounded-lg shadow-md p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">{projeto.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs md:text-sm text-muted-foreground font-medium">Status: {projeto.status}</p>
        <p>Progresso: {projeto.progress}%</p>
      </CardContent>
      <CardFooter>
        <CardAction className="text-sm text-primary hover:underline">Ver detalhes</CardAction>
        <CardAction className="flex" title="Deletar Projeto" onClick={() => deletarProjeto(projeto.id)}>
          <Trash2 width={20} height={20} className="cursor-pointer text-muted-foreground hover:text-red-500" />
        </CardAction>
      </CardFooter>
    </Card>
  );
}
