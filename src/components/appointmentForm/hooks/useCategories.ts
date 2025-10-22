import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Category } from "../types";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        
        if (!response.ok) {
          throw new Error("Erro ao buscar categorias");
        }

        const data = await response.json();
        // Retorna apenas a primeira categoria
        setCategories(data.length > 0 ? [data[0]] : []);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        toast.error("Erro ao carregar categorias");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
}