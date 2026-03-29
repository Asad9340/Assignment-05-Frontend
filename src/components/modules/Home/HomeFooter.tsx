import Link from 'next/link';

const footerLinks = [
  { label: 'About', href: '/about-us' },
  { label: 'Contact', href: '/contact-us' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

const HomeFooter = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#090f20] py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-slate-400">
          Planora - Secure event management for modern communities.
        </p>
        <div className="flex items-center gap-5 text-sm">
          {footerLinks.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
