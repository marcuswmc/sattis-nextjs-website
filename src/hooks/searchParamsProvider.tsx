"use client";

import { ReactNode } from "react";
import { useSearchParams } from "next/navigation";

export function SearchParamsProvider({ children }: { children: ReactNode }) {
  useSearchParams();
  return <>{children}</>;
}
