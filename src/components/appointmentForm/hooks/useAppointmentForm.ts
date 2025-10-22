import { useState, useMemo } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Professional, Service } from "@/hooks/appointments-context";
import { CustomerFormData, useAppointmentSchema } from "../types";
import { useTranslations } from "next-intl";

interface UseAppointmentFormParams {
  services: Service[];
  professionals: Professional[];
}

export function useAppointmentForm({ services, professionals }: UseAppointmentFormParams) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState<CustomerFormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    date: "",
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Serviços filtrados pela categoria selecionada
  const filteredServices = useMemo(
    () => services.filter((service) => service.category === selectedCategory),
    [services, selectedCategory]
  );

  // Profissionais disponíveis para o serviço selecionado
  const availableProfessionals = useMemo(
    () =>
      selectedService
        ? professionals.filter((pro) =>
            pro.services.some((s) => s._id === selectedService)
          )
        : [],
    [selectedService, professionals]
  );

  const t = useTranslations('book-form')
  const AppointmentSchema = useAppointmentSchema();

  const validateStep = () => {
    const validations: Record<number, () => boolean> = {
      1: () => {
        if (!selectedCategory) {
          toast.error(`${t('validate-steps-msgs.selected-category')}`);
          return false;
        }
        return true;
      },
      2: () => {
        if (!selectedService) {
          toast.error(`${t('validate-steps-msgs.selected-service')}`);
          return false;
        }
        return true;
      },
      3: () => {
        if (!selectedProfessional) {
          toast.error(`${t('validate-steps-msgs.selected-professional')}`);
          return false;
        }
        return true;
      },
      4: () => {
        if (!formData.date) {
          toast.error(`${t('validate-steps-msgs.selected-date')}`);
          return false;
        }
        if (!selectedTime) {
          toast.error(`${t('validate-steps-msgs.selected-time')}`);
          return false;
        }
        return true;
      },
      5: () => {
        try {
          const fullData = {
            ...formData,
            categoryId: selectedCategory,
            serviceId: selectedService,
            professionalId: selectedProfessional,
            time: selectedTime,
          };
          AppointmentSchema.parse(fullData);
          setValidationErrors({});
          return true;
        } catch (error) {
          if (error instanceof z.ZodError) {
            const errors = error.errors.reduce((acc, curr) => {
              acc[curr.path[0] as string] = curr.message;
              return acc;
            }, {} as Record<string, string>);
            setValidationErrors(errors);
          }
          return false;
        }
      },
    };

    return validations[step]?.() ?? true;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBackStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    const payload = {
      ...formData,
      categoryId: selectedCategory,
      serviceId: selectedService,
      professionalId: selectedProfessional,
      time: selectedTime,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointment/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success(`${t('validate-steps-msgs.create-success')}`);
        setStep(6);
      } else {
        toast.error(`${t('validate-steps-msgs.create-error')}`);
      }
    } catch (error) {
      toast.error(`${t('validate-steps-msgs.create-error')}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    selectedCategory,
    selectedService,
    selectedProfessional,
    selectedTime,
    formData,
    validationErrors,
    loading,
    filteredServices,
    availableProfessionals,
    setSelectedCategory,
    setSelectedService,
    setSelectedProfessional,
    setSelectedTime,
    setFormData,
    handleNextStep,
    handleBackStep,
    handleSubmit,
  };
}