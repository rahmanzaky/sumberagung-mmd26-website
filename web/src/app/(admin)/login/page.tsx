import LoginContainer from '@/feature/admin/login/container/LoginContainer';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  return <LoginContainer callbackUrl={callbackUrl} />;
}
