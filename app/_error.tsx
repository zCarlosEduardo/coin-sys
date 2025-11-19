"use client";
import ErrorPage from "@/components/ErrorPage";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <ErrorPage 
      type="error"
      showRetry 
      onRetry={reset}
      errorMessage={error.message}
    />
  );
}