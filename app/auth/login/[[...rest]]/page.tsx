import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn path="/auth/login" routing="path" signUpUrl="/auth/register" />
    </div>
  )
}
