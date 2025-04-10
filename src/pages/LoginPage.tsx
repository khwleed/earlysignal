
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to access your account"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
