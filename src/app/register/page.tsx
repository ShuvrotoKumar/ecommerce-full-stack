import { RegisterForm } from '@/features/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-16rem)] px-4 py-12">
      <RegisterForm />
    </div>
  );
}
