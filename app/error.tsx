"use client";
import ErrorPage from "@/components/ErrorPage";

export default function Error({ error, reset }) {
  return (
    <ErrorPage 
      type="error"
      showRetry 
      onRetry={reset}
      errorMessage={error.message}
    />
  );
}