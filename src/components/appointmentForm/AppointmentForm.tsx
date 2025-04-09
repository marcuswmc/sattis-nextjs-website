"use client";

import { z } from "zod";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { pt } from "date-fns/locale";
import { format } from "date-fns";
import {
  Professional,
  Service,
  useAppointments,
} from "@/hooks/appointments-context";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  Euro,
  Hourglass,
  Loader2,
  MessageCircle,
  Target,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
}

const AppointmentSchema = z.object({
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
      return selectedDate >= today;
    },
    { message: "Data deve ser hoje ou no futuro" }
  ),
  categoryId: z.string().min(1, { message: "Selecione uma categoria" }),
  serviceId: z.string().min(1, { message: "Selecione um serviço" }),
  professionalId: z.string().min(1, { message: "Selecione um profissional" }),
  time: z.string().min(1, { message: "Selecione um horário" }),
});

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
  const [step, setStep] = useState(6);
  const [selectedService, setSelectedService] = useState<string>("");
  const [availableProfessionals, setAvailableProfessionals] = useState<
    Professional[]
  >([]);
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
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

  const timeScrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    timeScrollRef.current?.scrollBy({ left: -120, behavior: "smooth" });
  };

  const scrollRight = () => {
    timeScrollRef.current?.scrollBy({ left: 120, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch(
          `https://services-appointment-api.onrender.com/api/categories`
        );
        if (!response.ok) throw new Error("Erro ao buscar categorias");

        const data = await response.json();
        setCategories(data);
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
      const fetchAvailableTimes = async () => {
        setLoadingTimes(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/services/available?date=${formData.date}`
          );
          if (!response.ok)
            throw new Error("Erro ao buscar horários disponíveis");

          const data = await response.json();

          const service = data.find((s: Service) => s._id === selectedService);

          if (!service) {
            setAvailableTimes([]);
            return;
          }

          const professionalBookedTimes = appointments
            .filter(
              (appt) =>
                appt.professionalId?._id === selectedProfessional &&
                appt.date === formData.date &&
                appt.status === "CONFIRMED"
            )
            .map((appt) => appt.time);

          const freeTimes = service.availableTimes.filter(
            (time: string) => !professionalBookedTimes.includes(time)
          );

          setAvailableTimes(freeTimes);
        } catch (error) {
          console.error(error);
          setAvailableTimes([]);
        } finally {
          setLoadingTimes(false);
        }
      };

      fetchAvailableTimes();
    }
  }, [selectedService, formData.date, selectedProfessional, appointments]);

  const isDateDisabled = (date: Date) => {
    // Desabilitar domingos e segundas-feiras
    return date.getDay() === 0 || date.getDay() === 1;
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
        {/* Step 1: Escolha da Categoria */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black text-card-foreground border-none ">
              <CardHeader className="items-center">
                <CardTitle className="flex flex-col gap-4 text-foreground">
                  <p className="text-lg font-medium leading-tight">
                    Selecione a área desejada para prosseguir com a marcação.
                  </p>
                  <div className="flex items-center gap-2 text-black bg-white p-2 rounded-sm">
                    <MessageCircle size={18} />
                    <span className="font-light text-[10px]">
                      * Ao clicar em <span className="font-bold">tattoo</span>{" "}
                      ou <span className="font-bold">piercing</span> será
                      redirecionado
                      <br />
                      para o atendimento via whatsapp.
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {loadingCategories ? (
                    Array.from({ length: 2 }).map((_, index) => (
                      <div
                        key={index}
                        className="w-full h-10 bg-gray-900 rounded animate-pulse"
                      />
                    ))
                  ) : categories.length > 0 ? (
                    categories.map((category: Category) => (
                      <Button
                        key={category._id}
                        variant="outline"
                        className={`text-foreground bg-gray-900 border-border hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                          selectedCategory === category._id
                            ? "bg-gray-500 text-accent-foreground hover:bg-gray-500"
                            : ""
                        }`}
                        onClick={() => setSelectedCategory(category._id)}
                      >
                        {category.name}
                      </Button>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Nenhuma área disponível para esta data.
                    </p>
                  )}
                  <div className="col-span-2"></div>

                  <Button
                    asChild
                    variant="outline"
                    className="text-foreground border-border bg-gray-900 hover:bg-accent hover:text-accent-foreground grid"
                  >
                    <Link href={"https://wa.me/351914668874"} target="_blank">
                      Tattoo
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="text-foreground border-border bg-gray-900 hover:bg-accent hover:text-accent-foreground"
                  >
                    <Link href={"https://wa.me/351913534380"} target="_blank">
                      Piercing
                    </Link>
                  </Button>
                </div>

                <Button
                  className="mt-8 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleNextStep}
                  disabled={!selectedCategory}
                >
                  Próximo
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Escolha do Serviço */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black text-card-foreground border-none">
              <CardHeader className="items-center">
                <CardTitle className="flex flex-col gap-4 text-foreground">
                  <p className="text-lg font-medium leading-tight">
                    Agora escolha um dos serviços disponíveis.
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[280px]">
                  <div className="grid gap-2">
                    {filteredServices.map((service: Service) => (
                      <Button
                        key={service._id}
                        className={`py-10 px-4 bg-gray-900 text-foreground rounded-md border border-border hover:bg-accent hover:text-accent-foreground flex ${
                          selectedService === service._id
                            ? "bg-gray-500 text-accent-foreground hover:bg-gray-500"
                            : ""
                        }`}
                        onClick={() => setSelectedService(service._id)}
                      >
                        <div className="w-full flex flex-col gap-2 items-start">
                          <div className="flex flex-col items-start">
                            <div className="text-md">{service.name}</div>
                            <div className="text-[10px] font-light truncate">
                              {service.description}
                            </div>
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <div className="flex gap-2 text-[16px] items-center">
                              <Euro size={16} /> {service.price}
                            </div>
                            <div className="flex gap-2 text-[14px] items-center">
                              <Hourglass size={14} /> {service.duration} min
                            </div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
                <Button
                  className="mt-10 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleNextStep}
                  disabled={!selectedService}
                >
                  Próximo
                </Button>
                <Button
                  variant="ghost"
                  className="mt-4 w-full text-foreground hover:bg-accent"
                  onClick={() => setStep(1)}
                >
                  Voltar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Escolha do Profissional */}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black text-card-foreground border-none">
              <CardHeader className="items-center">
                <CardTitle className="flex flex-col gap-4 text-foreground ">
                  <p className="text-lg font-medium leading-tight">
                    Agora escolha um dos profissionais disponíveis.
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {availableProfessionals.map((pro) => (
                    <Button
                      key={pro._id}
                      variant="outline"
                      className={`text-foreground bg-gray-900 border-border hover:bg-accent hover:text-accent-foreground ${
                        selectedProfessional === pro._id
                          ? "bg-gray-500 text-accent-foreground hover:bg-gray-500"
                          : ""
                      }`}
                      onClick={() => setSelectedProfessional(pro._id)}
                    >
                      {pro.name}
                    </Button>
                  ))}
                </div>
                <Button
                  className="mt-10 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleNextStep}
                  disabled={!selectedProfessional}
                >
                  Próximo
                </Button>
                <Button
                  variant="ghost"
                  className="mt-4 w-full text-foreground hover:bg-accent"
                  onClick={() => setStep(2)}
                >
                  Voltar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Escolha da Data e Horário */}
        {step === 4 && (
          <motion.div
            key="step4"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black text-card-foreground border-none">
              <CardHeader>
                <CardTitle className="flex flex-col gap-4 text-foreground ">
                  <p className="text-lg font-medium leading-tight">
                    Escolha uma data e horário.
                  </p>
                  <div className="flex items-center gap-2 text-black bg-white p-2 rounded-sm">
                    <MessageCircle size={18} />
                    <span className="font-light text-[10px]">
                      Escolha o dia e em seguida defina o horário de sua
                      preferência.
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-background rounded-md p-1 border border-border">
                  <Calendar
                    mode="single"
                    selected={
                      formData.date ? new Date(formData.date) : undefined
                    }
                    onSelect={(selectedDate) => {
                      if (selectedDate) {
                        const formattedDate = format(
                          selectedDate,
                          "yyyy-MM-dd"
                        );
                        setFormData({ ...formData, date: formattedDate });
                      }
                    }}
                    disabled={(date) =>
                      date < new Date() || isDateDisabled(date)
                    }
                    locale={pt}
                    className="w-full"
                  />
                </div>

                {formData.date && (
                  <div className="relative mt-6">
                    <div
                      ref={timeScrollRef}
                      className="flex gap-3 overflow-x-auto"
                    >
                      {loadingTimes ? (
                        Array.from({ length: 5 }).map((_, index) => (
                          <div
                            key={index}
                            className="w-24 h-10 bg-gray-900 rounded animate-pulse"
                          />
                        ))
                      ) : availableTimes.length > 0 ? (
                        availableTimes.map((time) => (
                          <Button
                            key={time}
                            variant="outline"
                            className={` bg-gray-900 text-foreground border-border hover:bg-accent hover:text-accent-foreground ${
                              selectedTime === time
                                ? "bg-gray-500 text-accent-foreground hover:bg-gray-500"
                                : ""
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Nenhum horário disponível para esta data.
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between pt-4">
                      <Button
                        onClick={scrollLeft}
                        className=" bg-white p-2 rounded-md shadow hover:bg-gray-100"
                        aria-label="Scroll Left"
                      >
                        <ChevronLeft />
                      </Button>
                      <Button
                        onClick={scrollRight}
                        className=" bg-white p-2 rounded-md shadow hover:bg-gray-100"
                        aria-label="Scroll Right"
                      >
                        <ChevronRight />
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  className="mt-10 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleNextStep}
                  disabled={!selectedTime || !formData.date}
                >
                  Próximo
                </Button>
                <Button
                  variant="ghost"
                  className="mt-4 w-full text-foreground hover:bg-accent"
                  onClick={() => setStep(3)}
                >
                  Voltar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 5: Dados do Cliente */}
        {step === 5 && (
          <motion.div
            key="step5"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black text-card-foreground border-none">
              <CardHeader>
                <CardTitle className="flex flex-col gap-4 text-foreground ">
                  <p className="text-lg font-medium leading-tight">
                    Preencha com seus dados para confirmar a sua marcação
                  </p>
                  <div className="flex items-center gap-2 text-black bg-white p-2 rounded-sm">
                    <MessageCircle size={18} />
                    <span className="font-light text-[10px]">
                      Os seus dados são importantes para confirmar a marcação e
                      também para notificações caso seja necessário.
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
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerName: e.target.value,
                        })
                      }
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
                      value={formData.customerEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerEmail: e.target.value,
                        })
                      }
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
                      value={formData.customerPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerPhone: e.target.value,
                        })
                      }
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
                  onClick={handleSubmit}
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
                  onClick={() => setStep(4)}
                >
                  Voltar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 6: Confirmação */}
        {step === 6 && (
          <motion.div
            key="step6"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black text-card-foreground border-none">
              <CardHeader>
                <CardTitle className="text-lg text-foreground text-center">
                  A marcação foi efetuada!
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p className="text-sm mb-2 text-muted-foreground">
                  Resumo da marcação:
                </p>
                <p className="text-sm text-foreground">
                  <strong>Categoria:</strong>{" "}
                  {categories.find((c) => c._id === selectedCategory)?.name}
                </p>
                <p className="text-sm text-foreground">
                  <strong>Serviço:</strong>{" "}
                  {services.find((s) => s._id === selectedService)?.name}
                </p>
                <p className="text-sm text-foreground">
                  <strong>Profissional:</strong>{" "}
                  {
                    professionals.find((p) => p._id === selectedProfessional)
                      ?.name
                  }
                </p>
                <p className="text-sm text-foreground">
                  <strong>Data:</strong> {formData.date}
                </p>
                <p className="text-sm text-foreground">
                  <strong>Hora:</strong> {selectedTime}
                </p>
                <p className="text-sm text-foreground">
                  <strong>Nome:</strong> {formData.customerName}
                </p>
                <p className="text-sm text-foreground">
                  <strong>Email:</strong> {formData.customerEmail}
                </p>
                <p className="text-sm text-foreground">
                  <strong>Telefone:</strong> {formData.customerPhone}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 items-start">
                <p className="text-sm text-white">
                  *O pagamento deverá ser realizado em dinheiro.
                </p>
                <p className="text-sm text-muted-foreground">
                  *Não comparecimento sem aviso prévio de 24 horas ou atrasos
                  superiores a 15 minutos será cobrado 30% do valor do
                  procedimento que faltou para conseguir remarcar novamente.
                </p>
                <p className="text-sm text-muted-foreground">
                  Para mais informações ou dúvidas, estamos à disposição!
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppointmentForm;
