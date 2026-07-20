import LoginContainer from '@/feature/admin/login/container/LoginContainer';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const { callbackUrl, error } = await searchParams;
  return <LoginContainer callbackUrl={callbackUrl} error={error} />;
}
