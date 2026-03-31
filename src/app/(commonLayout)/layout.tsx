import CommonFooter from '@/components/shared/CommonFooter';
import CommonNavbar from '@/components/shared/CommonNavbar';

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#f8fafc]">
      <CommonNavbar />
      <div className="flex-1">{children}</div>
      <CommonFooter />
    </div>
  );
}
