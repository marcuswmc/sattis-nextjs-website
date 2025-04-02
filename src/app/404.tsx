// app/404.tsx (ou a página 404 do seu projeto)
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const NotFoundPage = () => {
  const searchParams = useSearchParams();

  return (
    <div>
      {/* Lógica para lidar com searchParams */}
      <p>Page not found</p>
    </div>
  );
};

export default function Custom404() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundPage />
    </Suspense>
  );
}
