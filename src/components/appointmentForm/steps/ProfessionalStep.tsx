"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
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
        <div className="grid gap-3">
          {professionals.map((pro) => (
            <Button
              key={pro._id}
              variant="outline"
              className={`text-foreground bg-gray-900 border-border hover:bg-accent hover:text-accent-foreground h-[80px] px-0 text-md overflow-hidden ${
                selectedProfessional === pro._id
                  ? "bg-gray-500 text-accent-foreground hover:bg-gray-500"
                  : ""
              }`}
              onClick={() => onSelectProfessional(pro._id)}
            >
              <div className="flex justify-between w-full items-center">
                <div className="pl-4 flex flex-col items-start gap-0.5">
                  {pro.name}
                </div>

                <div>
                  <Image
                    src={pro.image}
                    alt={pro.name}
                    width={60}
                    height={60}
                    className="rounded-r-md object-contain"
                    quality={100}
                  />
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
