"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppointments } from "@/hooks/appointments-context";
import { useCategories } from "./hooks/useCategories";
import { useAppointmentForm } from "./hooks/useAppointmentForm";
import { useAvailability } from "./hooks/useAvailability";
import { isDateDisabled } from "./utils/dateUtils";
import CategoryStep from "./steps/CategoryStep";
import ServiceStep from "./steps/ServiceStep";
import ProfessionalStep from "./steps/ProfessionalStep";
import DateTimeStep from "./steps/DateTimeStep";
import CustomerDataStep from "./steps/CustomerDataStep";
import ConfirmationStep from "./steps/ConfirmationStep";

const cardVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export default function AppointmentForm() {
  const timeScrollRef = useRef<HTMLDivElement>(null);
  
  // Context data
  const {
    services,
    professionals,
    fetchServicesAndProfessionals,
    fetchAppointments,
  } = useAppointments();

  const { categories, loading: loadingCategories } = useCategories();
  
  const {
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
  } = useAppointmentForm({ services, professionals });

  const { availableTimes, loading: loadingTimes } = useAvailability({
    serviceId: selectedService,
    professionalId: selectedProfessional,
    date: formData.date,
  });

  // Inicializa dados necessários
  useEffect(() => {
    fetchServicesAndProfessionals(undefined);
    fetchAppointments(undefined);
  }, [fetchServicesAndProfessionals, fetchAppointments]);

  // Reseta horário quando muda profissional ou serviço
  useEffect(() => {
    if (selectedProfessional || selectedService) {
      setSelectedTime("");
    }
  }, [selectedProfessional, selectedService, setSelectedTime]);

  const handleDateChange = (date: string) => {
    setFormData({ ...formData, date });
    setSelectedTime(""); // Reseta horário ao mudar data
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
              onBack={handleBackStep}
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
              onBack={handleBackStep}
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
              onChangeDate={handleDateChange}
              isDateDisabled={isDateDisabled}
              availableTimes={availableTimes}
              loadingTimes={loadingTimes}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              timeScrollRef={timeScrollRef}
              onNext={handleNextStep}
              onBack={handleBackStep}
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
              onBack={handleBackStep}
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
}