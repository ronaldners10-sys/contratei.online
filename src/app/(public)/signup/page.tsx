import { AuthForms } from "@/components/auth/auth-forms";

export default function SignupPage() {
  // The AuthForms component handles both login and signup via tabs.
  // We can default to the 'signup' tab if needed, but the component is self-contained.
  return <AuthForms />;
}
