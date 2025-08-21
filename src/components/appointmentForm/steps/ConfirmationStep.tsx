"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "../types";
import { Professional, Service } from "@/hooks/appointments-context";

interface ConfirmationStepProps {
  categories: Category[];
  services: Service[];
  professionals: Professional[];
  selectedCategory: string;
  selectedService: string;
  selectedProfessional: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export default function ConfirmationStep({
  categories,
  services,
  professionals,
  selectedCategory,
  selectedService,
  selectedProfessional,
  date,
  time,
  customerName,
  customerEmail,
  customerPhone,
}: ConfirmationStepProps) {
  return (
    <Card className="bg-black text-card-foreground border-none">
      <CardHeader>
        <CardTitle className="text-lg text-foreground text-center">
          A marcação foi efetuada!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-sm mb-2 text-muted-foreground">Resumo da marcação:</p>
        <p className="text-sm text-foreground">
          <strong>Categoria:</strong> {categories.find((c) => c._id === selectedCategory)?.name}
        </p>
        <p className="text-sm text-foreground">
          <strong>Serviço:</strong> {services.find((s) => s._id === selectedService)?.name}
        </p>
        <p className="text-sm text-foreground">
          <strong>Profissional:</strong> {professionals.find((p) => p._id === selectedProfessional)?.name}
        </p>
        <p className="text-sm text-foreground">
          <strong>Data:</strong> {date}
        </p>
        <p className="text-sm text-foreground">
          <strong>Hora:</strong> {time}
        </p>
        <p className="text-sm text-foreground">
          <strong>Nome:</strong> {customerName}
        </p>
        <p className="text-sm text-foreground">
          <strong>Email:</strong> {customerEmail}
        </p>
        <p className="text-sm text-foreground">
          <strong>Telefone:</strong> {customerPhone}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <p className="text-sm text-muted-foreground">
          *Não comparecimento sem aviso prévio de 24 horas ou atrasos superiores a 15 minutos será cobrado 30% do valor do procedimento que faltou para conseguir remarcar novamente.
        </p>
        <p className="text-sm text-muted-foreground">Para mais informações ou dúvidas, estamos à disposição!</p>
      </CardFooter>
    </Card>
  );
}


