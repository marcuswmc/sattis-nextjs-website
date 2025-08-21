"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Category } from "../types";

interface CategoryStepProps {
  categories: Category[];
  selectedCategory: string;
  loadingCategories: boolean;
  onSelectCategory: (categoryId: string) => void;
  onNext: () => void;
}

export default function CategoryStep({
  categories,
  selectedCategory,
  loadingCategories,
  onSelectCategory,
  onNext,
}: CategoryStepProps) {
  return (
    <Card className="bg-black text-card-foreground border-none ">
      <CardHeader className="items-center">
        <CardTitle className="flex flex-col gap-4 text-foreground">
          <p className="text-lg font-medium leading-tight">
            Selecione a área desejada para prosseguir com a marcação.
          </p>
          <div className="flex items-center gap-2 text-black bg-white p-2 rounded-sm">
            <MessageCircle size={18} />
            <span className="font-light text-[10px]">
              * Ao clicar em <span className="font-bold">Tattoo</span> será redirecionado para o atendimento via whatsapp.
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {loadingCategories ? (
            <div className="w-full h-10 bg-gray-900 rounded animate-pulse" />
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
                onClick={() => onSelectCategory(category._id)}
              >
                {category.name}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhuma área disponível para esta data.
            </p>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="text-foreground border-border bg-gray-900 hover:bg-accent hover:text-accent-foreground grid"
              >
                Tattoo
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-50">
              <div className="flex flex-col gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-700 bg-gray-900 hover:bg-accent hover:text-accent-foreground"
                >
                  <Link href={"https://wa.me/351964935644"} target="_blank">
                    Lou Lopes
                    <MessageCircle />
                  </Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          className="mt-8 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onNext}
          disabled={!selectedCategory}
        >
          Próximo
        </Button>
      </CardContent>
    </Card>
  );
}


