import { SignUp } from '@clerk/nextjs'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp 
        path="/auth/register" 
        routing="path" 
        signInUrl="/auth/login"
        afterSignUpUrl="/onboarding"
      />
    </div>
  )
} 