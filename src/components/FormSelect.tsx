/* eslint-disable @typescript-eslint/no-explicit-any */
import { LucideIcon } from 'lucide-react';

interface FormSelectProps {
  label: string;
  icon: LucideIcon;
  error?: string;
  register: any;
  name: string;
  required?: boolean;
  hasSubmittedOnce?: boolean;
  options: string[];
  disabled?: boolean;
}

export default function FormSelect({
  label,
  icon: Icon,
  error,
  register,
  name,
  required,
  hasSubmittedOnce,
  options,
  disabled = false,
}: FormSelectProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
        <Icon className="w-4 h-4" />
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...register(name)}
        disabled={disabled}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && hasSubmittedOnce && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
