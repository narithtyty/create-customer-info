/* eslint-disable @typescript-eslint/no-explicit-any */
import { LucideIcon } from 'lucide-react';

interface FormTextareaProps {
  label: string;
  icon: LucideIcon;
  error?: string;
  placeholder?: string;
  register: any;
  name: string;
  rows?: number;
  required?: boolean;
  hasSubmittedOnce?: boolean;
}

export default function FormTextarea({
  label,
  icon: Icon,
  error,
  placeholder,
  register,
  name,
  rows = 3,
  required,
  hasSubmittedOnce,
}: FormTextareaProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
        <Icon className="w-4 h-4" />
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        {...register(name)}
        rows={rows}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
      />
      {error && hasSubmittedOnce && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
