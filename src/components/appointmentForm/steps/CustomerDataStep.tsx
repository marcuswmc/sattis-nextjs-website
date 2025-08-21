"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MessageCircle } from "lucide-react";

interface CustomerDataStepProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  validationErrors: { [key: string]: string };
  onChangeName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePhone: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function CustomerDataStep({
  customerName,
  customerEmail,
  customerPhone,
  validationErrors,
  onChangeName,
  onChangeEmail,
  onChangePhone,
  onSubmit,
  onBack,
  loading,
}: CustomerDataStepProps) {
  return (
    <Card className="bg-black text-card-foreground border-none">
      <CardHeader>
        <CardTitle className="flex flex-col gap-4 text-foreground ">
          <p className="text-lg font-medium leading-tight">
            Preencha com seus dados para confirmar a sua marcação
          </p>
          <div className="flex items-center gap-2 text-black bg-white p-2 rounded-sm">
            <MessageCircle size={18} />
            <span className="font-light text-[10px]">
              Os seus dados são importantes para confirmar a marcação e também para notificações caso seja necessário.
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-foreground">Nome Completo*</Label>
            <Input
              type="text"
              value={customerName}
              onChange={(e) => onChangeName(e.target.value)}
              className="bg-background text-foreground border-border focus:border-primary"
            />
            {validationErrors.customerName && (
              <p className="text-destructive text-sm mt-1">
                {validationErrors.customerName}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Email*</Label>
            <Input
              type="email"
              value={customerEmail}
              onChange={(e) => onChangeEmail(e.target.value)}
              className="bg-background text-foreground border-border focus:border-primary"
            />
            {validationErrors.customerEmail && (
              <p className="text-destructive text-sm mt-1">
                {validationErrors.customerEmail}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Telefone*</Label>
            <Input
              type="text"
              value={customerPhone}
              onChange={(e) => onChangePhone(e.target.value)}
              className="bg-background text-foreground border-border focus:border-primary"
            />
            {validationErrors.customerPhone && (
              <p className="text-destructive text-sm mt-1">
                {validationErrors.customerPhone}
              </p>
            )}
          </div>
        </div>
        <Button
          className="mt-10 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onSubmit}
        >
          {loading ? (
            <Loader2 className="h-10 w-10 animate-spin text-primary-foreground" />
          ) : (
            "Confirmar Marcação"
          )}
        </Button>
        <Button
          variant="ghost"
          className="mt-4 w-full text-foreground hover:bg-accent"
          onClick={onBack}
        >
          Voltar
        </Button>
      </CardContent>
    </Card>
  );
}


