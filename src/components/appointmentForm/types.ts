"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { z } from "zod";

export interface Category {
  _id: string;
  name: string;
}

export interface CustomerFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
}

export interface AppointmentPayload extends CustomerFormData {
  categoryId: string;
  serviceId: string;
  professionalId: string;
  time: string;
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const useAppointmentSchema = () => {
  const t = useTranslations("book-form.customer-data-step");

  return z.object({
    customerName: z
      .string()
      .min(2, { message: t('validate-input.customer-name') }),
    customerEmail: z.string().email({ message: t('validate-input.customer-email') }),
    customerPhone: z
      .string().regex(phoneRegex, t('validate-input.customer-phone')),
    date: z.string().refine(
      (value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "Data deve ser hoje ou no futuro" }
    ),
    categoryId: z.string().min(1, { message: "Selecione uma categoria" }),
    serviceId: z.string().min(1, { message: "Selecione um serviço" }),
    professionalId: z.string().min(1, { message: "Selecione um profissional" }),
    time: z.string().min(1, { message: "Selecione um horário" }),
  });
};
