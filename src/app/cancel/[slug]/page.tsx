"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CancelAppointment = () => {

  const { slug } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug) {
      console.error('Slug não encontrado');
    } else {
      console.log('Slug carregado:', slug);
    }
  }, [slug]);

  const handleCancelConfirm = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointment/cancel/confirm/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        toast("Marcação cancelada com sucesso!");
        router.push("/");
      } else {
        toast("Erro ao cancelar a marcação. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      toast("Erro ao cancelar a marcação. Tente novamente.");
    } finally {
      setLoading(false);
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
          <Button variant="ghost" onClick={() => router.back()}>
            Voltar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};


export default CancelAppointment;
