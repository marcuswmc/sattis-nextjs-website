"use client";

import { z } from "zod";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Professional,
  Service,
  useAppointments,
} from "@/hooks/appointments-context";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import CategoryStep from "./steps/CategoryStep";
import ServiceStep from "./steps/ServiceStep";
import ProfessionalStep from "./steps/ProfessionalStep";
import DateTimeStep from "./steps/DateTimeStep";
import CustomerDataStep from "./steps/CustomerDataStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import { AppointmentSchema, Category, CustomerFormData } from "./types";

const cardVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const AppointmentForm = () => {
  const {
    services,
    professionals,
    appointments,
    fetchServicesAndProfessionals,
    fetchAppointments,
  } = useAppointments();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>("");
  const [availableProfessionals, setAvailableProfessionals] = useState<
    Professional[]
  >([]);
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState<CustomerFormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    date: "",
  });
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [fullyBookedDates, setFullyBookedDates] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([
    "2025-09-19",
    "2025-09-20",
    "2025-09-23",
    "2025-09-24",
    "2025-09-25",
    "2025-09-26",
    "2025-09-27",
    "2025-09-30",

  ]);

  const timeScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch(
          `https://services-appointment-api.onrender.com/api/categories`
        );
        if (!response.ok) throw new Error("Erro ao buscar categorias");

        const data = await response.json();

        const firstCategory = data.length > 0 ? [data[0]] : [];

        setCategories(firstCategory);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        toast("Erro ao carregar categorias");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
    fetchServicesAndProfessionals(undefined);
    fetchAppointments(undefined);
  }, [fetchServicesAndProfessionals, fetchAppointments]);

  useEffect(() => {
    if (selectedProfessional && selectedService) {
      setFullyBookedDates([]);
    }
  }, [selectedProfessional, selectedService]);

  const filteredServices = services.filter(
    (service: Service) => service.category === selectedCategory
  );

  useEffect(() => {
    if (selectedService) {
      const professionalsForService = (professionals || []).filter((pro) =>
        pro.services.some((s) => s._id === selectedService)
      );
      setAvailableProfessionals(professionalsForService);
    }
  }, [selectedService, professionals]);

  useEffect(() => {
    if (selectedService && formData.date && selectedProfessional) {
      setLoadingTimes(true);

      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/availability?` +
          new URLSearchParams({
            professionalId: selectedProfessional,
            serviceId: selectedService,
            date: formData.date,
          })
      )
        .then((res) => (res.ok ? res.json() : Promise.reject("Erro")))
        .then((times: string[]) => {
          const now = new Date();
          const selectedDate = new Date(formData.date);
          const isToday = now.toDateString() === selectedDate.toDateString();

          // Salva todos os horários antes de filtrar
          if (times.length === 0) {
            setFullyBookedDates((prev) => [...prev, formData.date]);
            setAvailableTimes([]);
            return;
          }

          const filteredTimes = isToday
            ? times.filter((timeStr) => {
                const [hours, minutes] = timeStr.split(":").map(Number);
                const timeDate = new Date(formData.date);
                timeDate.setHours(hours, minutes, 0, 0);
                return timeDate > now;
              })
            : times;

          setAvailableTimes(filteredTimes);
        })
        .catch((err) => {
          console.error(err);
          setAvailableTimes([]);
        })
        .finally(() => setLoadingTimes(false));
    }
  }, [selectedService, formData.date, selectedProfessional]);

  const isDateDisabled = (date: Date) => {
    const allowedMonday = "2025-09-15";
    const formattedDate = format(date, "yyyy-MM-dd");
    const isAllowedMonday =
      formattedDate === allowedMonday && date.getDay() === 1;

    // Disable Sundays (0) and Mondays (1), exceto a segunda específica
    if (!isAllowedMonday && (date.getDay() === 0 || date.getDay() === 1)) {
      return true;
    }

    // Bloqueios específicos
    const selectedPro = (professionals || []).find(
      (p) => p._id === selectedProfessional
    );
    const shouldApplyBlockedDates =
      (selectedPro?.name || "").toLowerCase() === "paulinha";

    if (shouldApplyBlockedDates && blockedDates.includes(formattedDate)) {
      return true;
    }

    if (fullyBookedDates.includes(formattedDate)) {
      return true;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const validateStep = () => {
    try {
      if (step === 1 && !selectedCategory) {
        toast("Selecione uma categoria");
        return false;
      }

      if (step === 2 && !selectedService) {
        toast("Selecione um serviço");
        return false;
      }

      if (step === 3 && !selectedProfessional) {
        toast("Selecione um profissional");
        return false;
      }

      if (step === 4) {
        if (!formData.date) {
          toast("Selecione uma data");
          return false;
        }
        if (!selectedTime) {
          toast("Selecione um horário");
          return false;
        }
      }

      if (step === 5) {
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
      }

      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {} as { [key: string]: string });

        setValidationErrors(errors);
        return false;
      }
      return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleSubmit = async () => {
    if (validateStep()) {
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
          toast("Agendamento realizado com sucesso!");
          setStep(6);
        } else {
          toast("Erro ao agendar. Tente novamente!");
        }
      } catch (error) {
        console.error("Erro ao agendar:", error);
        toast("Erro ao agendar. Tente novamente!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex w-full md:w-lg rounded-md flex-col justify-center bg-black text-foreground dark pt-2">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <CategoryStep
              categories={categories}
              selectedCategory={selectedCategory}
              loadingCategories={loadingCategories}
              onSelectCategory={setSelectedCategory}
              onNext={handleNextStep}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ServiceStep
              services={filteredServices}
              selectedService={selectedService}
              onSelectService={setSelectedService}
              onNext={handleNextStep}
              onBack={() => setStep(1)}
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ProfessionalStep
              professionals={availableProfessionals}
              selectedProfessional={selectedProfessional}
              onSelectProfessional={setSelectedProfessional}
              onNext={handleNextStep}
              onBack={() => setStep(2)}
            />
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <DateTimeStep
              formDate={formData.date}
              onChangeDate={(d) => setFormData({ ...formData, date: d })}
              isDateDisabled={isDateDisabled}
              availableTimes={availableTimes}
              loadingTimes={loadingTimes}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              timeScrollRef={timeScrollRef}
              onNext={handleNextStep}
              onBack={() => setStep(3)}
            />
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <CustomerDataStep
              customerName={formData.customerName}
              customerEmail={formData.customerEmail}
              customerPhone={formData.customerPhone}
              validationErrors={validationErrors}
              onChangeName={(v) => setFormData({ ...formData, customerName: v })}
              onChangeEmail={(v) => setFormData({ ...formData, customerEmail: v })}
              onChangePhone={(v) => setFormData({ ...formData, customerPhone: v })}
              onSubmit={handleSubmit}
              onBack={() => setStep(4)}
              loading={loading}
            />
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            key="step6"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ConfirmationStep
              categories={categories}
              services={services}
              professionals={professionals}
              selectedCategory={selectedCategory}
              selectedService={selectedService}
              selectedProfessional={selectedProfessional}
              date={formData.date}
              time={selectedTime}
              customerName={formData.customerName}
              customerEmail={formData.customerEmail}
              customerPhone={formData.customerPhone}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppointmentForm;
