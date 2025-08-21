"use client";

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

export const AppointmentSchema = z.object({
  customerName: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  customerEmail: z.string().email({ message: "Email inválido" }),
  customerPhone: z
    .string()
    .regex(/^\d{8,11}$/, { message: "Telefone deve ter 8 ou 11 dígitos" }),
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


