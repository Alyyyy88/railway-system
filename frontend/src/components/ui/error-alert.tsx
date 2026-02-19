import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorAlertProps {
  error: Error | { message: string };
  className?: string;
}

export function ErrorAlert({ error, className }: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
}
