"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Professional } from "@/hooks/appointments-context";
import { useTranslations } from "next-intl";

interface ProfessionalStepProps {
  professionals: Professional[];
  selectedProfessional: string;
  onSelectProfessional: (professionalId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ProfessionalStep({
  professionals,
  selectedProfessional,
  onSelectProfessional,
  onNext,
  onBack,
}: ProfessionalStepProps) {

  const t = useTranslations('book-form')

  return (
    <Card className="bg-black text-card-foreground border-none">
      <CardHeader className="items-center">
        <CardTitle className="flex flex-col gap-4 text-foreground ">
          <p className="text-lg font-medium leading-tight">
           {t('professional-step.title')}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {professionals.map((pro) => (
            <Button
              key={pro._id}
              variant="outline"
              aria-label={pro.name}
              className={`relative text-foreground bg-gray-900 border-border hover:bg-accent hover:text-accent-foreground px-0 text-md h-[140px] overflow-hidden rounded-md p-0 ${
                selectedProfessional === pro._id
                  ? "ring-2 ring-accent"
                  : ""
              }`}
              onClick={() => onSelectProfessional(pro._id)}
            >
              <div
                className="w-full h-full rounded-md overflow-hidden relative"
                style={{
                  backgroundImage: `url(${pro.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  maxWidth: "360px",
                  width: "100%",
                }}
              >
                <div className="absolute inset-0 bg-black/0" />

                <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-3 left-4 text-white text-lg font-medium drop-shadow-md">
                  {pro.name}
                </div>
              </div>
            </Button>
          ))}
        </div>
        <Button
          className="mt-10 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onNext}
          disabled={!selectedProfessional}
        >
          {t('form-btns.next-step-btn')}
        </Button>
        <Button
          variant="ghost"
          className="mt-4 w-full text-foreground hover:bg-accent"
          onClick={onBack}
        >
          {t('form-btns.back-step-btn')}  
        </Button>
      </CardContent>
    </Card>
  );
}
