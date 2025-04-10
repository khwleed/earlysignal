
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Sign up to get started"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;
