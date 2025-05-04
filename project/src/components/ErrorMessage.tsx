import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string | null;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/20 p-3 text-red-200 backdrop-blur-sm animate-fadeIn">
      <AlertCircle size={20} />
      <span>{message}</span>
    </div>
  );
}