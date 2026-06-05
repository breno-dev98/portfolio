'use client'
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function BudGetButton() { 
    return (
      <Button asChild variant="default">
        <Link href="/onboarding">
          <Plus className="h-4 w-4" /> Novo orçamento
        </Link>
      </Button>
    );
}