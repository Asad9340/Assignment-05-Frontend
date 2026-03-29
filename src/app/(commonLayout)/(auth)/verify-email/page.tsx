import VerifyEmailForm from '@/components/modules/Auth/VerifyEmailForm';
import { getDefaultDashboardRoute, UserRole } from '@/lib/authUtils';
import { getUserInfo } from '@/services/auth.services';
import { redirect } from 'next/navigation';

interface VerifyEmailParams {
  searchParams: Promise<{ email?: string }>;
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailParams) => {
  const params = await searchParams;
  const userInfo = await getUserInfo();

  if (
    userInfo &&
    'emailVerified' in userInfo &&
    Boolean(userInfo.emailVerified)
  ) {
    redirect(getDefaultDashboardRoute(userInfo.role as UserRole));
  }

  return <VerifyEmailForm initialEmail={params.email} />;
};

export default VerifyEmailPage;
