"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

const CancelAppointment = () => {
  const { slug } = useParams();
  const router = useRouter(); // ✅ Mantido fora para evitar recriação
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug) {
      console.error("Slug não encontrado");
    }
  }, [slug]);

  const handleCancelConfirm = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointment/cancel/confirm/${slug}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        toast("Erro ao cancelar a marcação. Tente novamente.");
        setLoading(false); // ✅ Se falhar, desativa o loading imediatamente
        return;
      }

      toast("Marcação cancelada com sucesso!");

      // ✅ Aguarda 2 segundos para exibir a mensagem antes de redirecionar
      setTimeout(() => {
        setLoading(false); // 🔹 Agora o botão volta ao normal só antes de redirecionar
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast("Erro ao cancelar a marcação. Tente novamente.");
      setLoading(false); // ✅ Se houver erro, desativa o loading imediatamente
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <Card className="bg-black border-none w-full max-w-md p-4 text-white">
        <CardHeader>
          <CardTitle className="text-lg text-center">
            Cancelamento de Marcação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Tens certeza de que deseja cancelar sua marcação? Esta ação não poderá ser desfeita.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 mt-4">
          <Button onClick={handleCancelConfirm} disabled={loading} className="cursor-pointer">
            {loading ? "Cancelando..." : "Confirmar Cancelamento"}
          </Button>
          <Link href="/">
            <Button variant="ghost">Voltar</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CancelAppointment;
