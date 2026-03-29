import Link from 'next/link';

const footerSections = [
  {
    title: 'Platform',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Events', href: '/events' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about-us' },
      { label: 'Contact', href: '/contact-us' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Login', href: '/login' },
      { label: 'Register', href: '/register' },
    ],
  },
];

const CommonFooter = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold text-slate-900">Planora</h2>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
              A secure event management platform where users can create, manage,
              join, review, and pay for public or private events with ease.
            </p>

            <div className="mt-5">
              <p className="text-sm font-medium text-slate-800">
                Create events. Join communities. Manage smarter.
              </p>
            </div>
          </div>

          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition hover:text-slate-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Planora. All rights reserved.
            </p>
            <p className="text-sm text-slate-500">
              Secure event experiences for modern communities.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CommonFooter;
