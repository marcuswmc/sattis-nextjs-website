"use client";

import { AppointmentsProvider } from "@/hooks/appointments-context";

export default function AppointmentsProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppointmentsProvider>{children}</AppointmentsProvider>;
}
