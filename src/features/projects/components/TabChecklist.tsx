"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import { createChecklistItemAction, toggleChecklistItemAction, deleteChecklistItemAction } from "../actions";

interface TabChecklistProps {
  projectId: string;
  checklist: any[];
}

export function TabChecklist({ projectId, checklist }: TabChecklistProps) {
  const [newCheck, setNewCheck] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    if (!newCheck.trim()) return toast.error("A descrição do item não pode ser vazia.");
    startTransition(async () => {
      await createChecklistItemAction(projectId, newCheck.trim());
      setNewCheck("");
    });
  };

  return (
    <div className="space-y-3 mt-4">
      <Card className="p-3">
        <div className="flex gap-2">
          <Input
            placeholder="Adicionar nova entrega ao checklist..."
            value={newCheck}
            onChange={(e) => setNewCheck(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            disabled={isPending}
          />
          <Button onClick={handleAdd} disabled={isPending} size="icon" className="shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {checklist.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-6">Nenhum item adicionado ao cronograma.</p>
      ) : (
        <div className="space-y-2">
          {checklist.map((item) => (
            <Card
              key={item.id}
              className="p-3  cursor-pointer hover:bg-muted/30"
              onClick={() => startTransition(() => toggleChecklistItemAction(item.id, !item.isCompleted, projectId))}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {item.isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <span className={`text-sm ${item.isCompleted ? "line-through text-muted-foreground" : ""}`}>{item.description}</span>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    startTransition(() => deleteChecklistItemAction(item.id, projectId));
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
