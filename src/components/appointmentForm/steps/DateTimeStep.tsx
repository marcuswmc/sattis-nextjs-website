"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { pt } from "date-fns/locale";
import { format } from "date-fns";
import { MessageCircle } from "lucide-react";
import { RefObject } from "react";

interface DateTimeStepProps {
  formDate: string;
  onChangeDate: (date: string) => void;
  isDateDisabled: (d: Date) => boolean;
  availableTimes: string[];
  loadingTimes: boolean;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  timeScrollRef: RefObject<HTMLDivElement | null>;
  onNext: () => void;
  onBack: () => void;
}

export default function DateTimeStep({
  formDate,
  onChangeDate,
  isDateDisabled,
  availableTimes,
  loadingTimes,
  selectedTime,
  onSelectTime,
  timeScrollRef,
  onNext,
  onBack,
}: DateTimeStepProps) {
  return (
    <Card className="bg-black text-card-foreground border-none">
      <CardHeader>
        <CardTitle className="flex flex-col gap-4 text-foreground ">
          <p className="text-lg font-medium leading-tight">
            Escolha uma data e horário. <br/>
            <span className="font-medium text-sm">Férias: 19 a 30 de Setembro de 2025.</span>
          </p>
          <div className="flex items-center gap-2 text-black bg-white p-2 rounded-sm">
            <MessageCircle size={18} />
            <p className="font-light text-[10px]">
              Escolha o dia e em seguida defina o horário de sua preferência.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-background rounded-md p-1 border border-border">
          <Calendar
            mode="single"
            selected={formDate ? new Date(formDate) : undefined}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                const formattedDate = format(selectedDate, "yyyy-MM-dd");
                onChangeDate(formattedDate);
              }
            }}
            disabled={isDateDisabled}
            locale={pt}
            className="w-full"
          />
        </div>

        {formDate && (
          <div className="relative mt-6">
            <div ref={timeScrollRef} className="flex gap-3 overflow-x-auto">
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
                    onClick={() => onSelectTime(time)}
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
          </div>
        )}

        <Button
          className="mt-10 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onNext}
          disabled={!selectedTime || !formDate}
        >
          Próximo
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


