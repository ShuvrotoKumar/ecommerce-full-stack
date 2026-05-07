import { LoginForm } from '@/features/auth/login-form';

export default function LoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-16rem)] px-4 py-12">
      <LoginForm />
    </div>
  );
}
