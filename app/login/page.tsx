import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-neutral-800 dark:to-neutral-900 p-4">
   
        <AuthForm type="login" />

    </div>
  );
}

// import AuthForm from '@/components/AuthForm';

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center  dark:from-neutral-800 dark:to-neutral-900 p-4">
//       <AuthForm type="login" />
//     </div>
//   );
// }
