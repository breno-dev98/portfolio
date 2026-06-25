import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Plus } from "lucide-react";
import Link from "next/link";

export function EmptyState() {
  return (
    <Card className="p-10 text-center bg-[image:var(--gradient-card)] border-dashed">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Sparkles className="h-6 w-6" />
      </div>
      <h3 className="font-display text-lg font-semibold">Você ainda não tem orçamentos</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
        Em 6 passos rápidos você envia seu primeiro pedido e recebe uma proposta personalizada.
      </p>
      <Button asChild className="mt-4">
        <Link href="/onboarding">
          <Plus className="h-4 w-4 mr-1" /> Solicitar orçamento
        </Link>
      </Button>
    </Card>
  );
}
