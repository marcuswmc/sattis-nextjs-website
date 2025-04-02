"use client";

import { useState, useEffect } from "react";
import { AppointmentsProvider } from "@/hooks/appointments-context";

export default function AppointmentsProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return <AppointmentsProvider>{children}</AppointmentsProvider>;
}
