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
import { useTranslations } from "next-intl";

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
  const t = useTranslations('book-form')
  return (
    <Card className="bg-black text-card-foreground border-none">
      <CardHeader>
        <CardTitle className="text-lg text-foreground text-center">
          {t('confirmation-step.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-sm mb-2 text-muted-foreground">{t('confirmation-step.summary')}</p>
        <p className="text-sm text-foreground">
          <strong>{t('confirmation-step.category')}</strong> {categories.find((c) => c._id === selectedCategory)?.name}
        </p>
        <p className="text-sm text-foreground">
          <strong>{t('confirmation-step.service')}</strong> {services.find((s) => s._id === selectedService)?.name}
        </p>
        <p className="text-sm text-foreground">
          <strong>{t('confirmation-step.professional')}</strong> {professionals.find((p) => p._id === selectedProfessional)?.name}
        </p>
        <p className="text-sm text-foreground">
          <strong>{t('confirmation-step.date')}</strong> {date}
        </p>
        <p className="text-sm text-foreground">
          <strong>{t('confirmation-step.time')}</strong> {time}
        </p>
        <p className="text-sm text-foreground">
          <strong>{t('confirmation-step.name')}</strong> {customerName}
        </p>
        <p className="text-sm text-foreground">
          <strong>{t('confirmation-step.email')}</strong> {customerEmail}
        </p>
        <p className="text-sm text-foreground">
          <strong>{t('confirmation-step.phone')}</strong> {customerPhone}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <p className="text-sm text-muted-foreground">
          *{t('confirmation-step.note-01')}
        </p>
        <p className="text-sm text-muted-foreground">{t('confirmation-step.note-02')}</p>
      </CardFooter>
    </Card>
  );
}


