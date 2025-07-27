import AuthForm from '@/components/AuthForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center dark:from-neutral-800 dark:to-neutral-900 p-4">
      <AuthForm type="signup" />
    </div>
  );
}
