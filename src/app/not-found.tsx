'use client'

import { Suspense } from "react";
import { SearchParamsProvider } from "@/hooks/searchParamsProvider";

export default function Custom404() {
  return (
    <Suspense fallback={null}>
      <SearchParamsProvider>
        <h1>Página não encontrada</h1>
      </SearchParamsProvider>
    </Suspense>
  );
}
