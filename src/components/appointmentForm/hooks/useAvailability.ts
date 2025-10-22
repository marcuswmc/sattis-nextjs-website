import { useState, useEffect } from "react";

interface UseAvailabilityParams {
  serviceId: string;
  professionalId: string;
  date: string;
}

export function useAvailability({ serviceId, professionalId, date }: UseAvailabilityParams) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Só busca se todos os parâmetros estiverem preenchidos
    if (!serviceId || !professionalId || !date) {
      setAvailableTimes([]);
      return;
    }

    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          professionalId,
          serviceId,
          date,
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/availability?${params}`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar disponibilidade");
        }

        const times: string[] = await response.json();

        // Filtra horários passados se for hoje
        const now = new Date();
        const selectedDate = new Date(date);
        const isToday = now.toDateString() === selectedDate.toDateString();

        const filteredTimes = isToday
          ? times.filter((timeStr) => {
              const [hours, minutes] = timeStr.split(":").map(Number);
              const timeDate = new Date(date);
              timeDate.setHours(hours, minutes, 0, 0);
              return timeDate > now;
            })
          : times;

        setAvailableTimes(filteredTimes);
      } catch (error) {
        console.error("Erro ao buscar disponibilidade:", error);
        setAvailableTimes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [serviceId, professionalId, date]);

  return { availableTimes, loading };
}