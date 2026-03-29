import Link from 'next/link';

const footerLinks = [
  { label: 'About', href: '/about-us' },
  { label: 'Contact', href: '/contact-us' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Events', href: '/events' },
];

const CommonFooter = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <p className="text-sm text-slate-600">
          Planora - Secure event management for modern communities.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm sm:justify-end">
          {footerLinks.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-600 transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default CommonFooter;
