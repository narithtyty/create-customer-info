import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Phone, Mail, MapPin, Building2, Globe } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormSelect from './FormSelect';
import { locationData, mockEmailCheck } from '../data/locationData';

const customerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  middleName: z.string().optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]\d{1,14}$/, 'Invalid phone number'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  province: z.string().min(1, 'Province is required'),
  district: z.string().min(1, 'District is required'),
  subdistrict: z.string().min(1, 'Subdistrict is required'),
  zipcode: z.string().regex(/^\d{5}$/, 'Invalid zipcode format'),
});

type CustomerFormData = z.infer<typeof customerSchema>;

export default function CustomerForm() {
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false); // check if form has been submitted
  const [districts, setDistricts] = useState<string[]>([]);
  const [subdistricts, setSubdistricts] = useState<string[]>([]);

  // Form state
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    watch,
    setValue,
    setError,
    // clearErrors,
    reset: resetForm,
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    mode: hasSubmittedOnce ? 'onChange' : 'onSubmit',
  });

  const province = watch('province'); // watch for changes in province
  const district = watch('district'); // watch for changes in district

  useEffect(() => {
    if (province) {
      const selectedProvince = locationData.find(
        (p) => p.province === province
      );
      const newDistricts = selectedProvince?.districts.map((d) => d.name) || [];
      setDistricts(newDistricts);
      setValue('district', '');
      setValue('subdistrict', '');
      setSubdistricts([]);
    }
  }, [province, setValue]);

  useEffect(() => {
    if (province && district) {
      const selectedProvince = locationData.find(
        (p) => p.province === province
      );
      const selectedDistrict = selectedProvince?.districts.find(
        (d) => d.name === district
      );
      setSubdistricts(selectedDistrict?.subdistricts || []);
      setValue('subdistrict', '');
    }
  }, [province, district, setValue]);

  const reset = () => {
    resetForm();
    setHasSubmittedOnce(false);
    setDistricts([]);
    setSubdistricts([]);
  };

  const onSubmit = async (data: CustomerFormData) => {
    try {
      const emailExists = await mockEmailCheck(data.email);
      if (emailExists) {
        setError('email', {
          type: 'manual',
          message: 'This email is already registered',
        });
        return;
      }
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);

      // Reset form
      reset();
      alert('Customer information saved successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while saving customer information.');
    }
  };

  // Check if form is valid
  const isFormValid =
    !hasSubmittedOnce || (hasSubmittedOnce && isValid && isDirty);

  return (
    <form
      onSubmit={(e: FormEvent) => {
        setHasSubmittedOnce(true);
        handleSubmit(onSubmit)(e);
      }}
      className="space-y-6 w-full max-w-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="First Name"
          icon={User}
          error={errors.firstName?.message}
          placeholder="John"
          register={register}
          name="firstName"
          required
          hasSubmittedOnce={hasSubmittedOnce}
        />

        <FormInput
          label="Middle Name (Optional)"
          icon={User}
          error={errors.middleName?.message}
          placeholder="William"
          register={register}
          name="middleName"
          hasSubmittedOnce={hasSubmittedOnce}
        />

        <FormInput
          label="Last Name"
          icon={User}
          error={errors.lastName?.message}
          placeholder="Doe"
          register={register}
          name="lastName"
          required
          hasSubmittedOnce={hasSubmittedOnce}
        />

        <FormInput
          label="Email"
          icon={Mail}
          type="email"
          error={errors.email?.message}
          placeholder="john.doe@example.com"
          register={register}
          name="email"
          required
          hasSubmittedOnce={hasSubmittedOnce}
          // onBlur={async () => {
          //   const email = watch('email');
          //   if (email && !errors.email) {
          //     const exists = await mockEmailCheck(email);
          //     if (exists) {
          //       setError('email', {
          //         type: 'manual',
          //         message: 'This email is already registered',
          //       });
          //     } else {
          //       clearErrors('email');
          //     }
          //   }
          // }}
        />

        <FormInput
          label="Phone"
          icon={Phone}
          type="tel"
          error={errors.phone?.message}
          placeholder="0123456789"
          register={register}
          name="phone"
          required
          hasSubmittedOnce={hasSubmittedOnce}
        />

        <FormInput
          label="Company"
          icon={Building2}
          error={errors.company?.message}
          placeholder="Acme Inc."
          register={register}
          name="company"
          required
          hasSubmittedOnce={hasSubmittedOnce}
        />

        <FormInput
          label="Website (Optional)"
          icon={Globe}
          type="url"
          error={errors.website?.message}
          placeholder="https://example.com"
          register={register}
          name="website"
          hasSubmittedOnce={hasSubmittedOnce}
        />
      </div>

      <FormTextarea
        label="Address"
        icon={MapPin}
        error={errors.address?.message}
        placeholder="123 Business Street, Suite 100"
        register={register}
        name="address"
        required
        hasSubmittedOnce={hasSubmittedOnce}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Province"
          icon={MapPin}
          error={errors.province?.message}
          register={register}
          name="province"
          required
          hasSubmittedOnce={hasSubmittedOnce}
          options={locationData.map((p) => p.province)}
        />

        <FormSelect
          label="District"
          icon={MapPin}
          error={errors.district?.message}
          register={register}
          name="district"
          required
          hasSubmittedOnce={hasSubmittedOnce}
          options={districts}
          disabled={!province}
        />

        <FormSelect
          label="Subdistrict"
          icon={MapPin}
          error={errors.subdistrict?.message}
          register={register}
          name="subdistrict"
          required
          hasSubmittedOnce={hasSubmittedOnce}
          options={subdistricts}
          disabled={!district}
        />

        <FormInput
          label="Zipcode"
          icon={MapPin}
          error={errors.zipcode?.message}
          placeholder="10330"
          register={register}
          name="zipcode"
          required
          hasSubmittedOnce={hasSubmittedOnce}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || (hasSubmittedOnce && !isFormValid)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting ? 'Saving...' : 'Save Customer'}
        </button>
      </div>
    </form>
  );
}
