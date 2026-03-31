import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

type StaticPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  metrics?: Array<{ label: string; value: string }>;
  children?: ReactNode;
  primaryAction?: string;
  secondaryAction?: string;
};

const StaticPageShell = ({
  eyebrow,
  title,
  description,
  metrics = [],
  children,
  primaryAction,
  secondaryAction,
}: StaticPageShellProps) => {
  return (
    <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-7xl space-y-6">
        <header className="rounded-3xl bg-[#101b3d] p-7 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-slate-200">{description}</p>
          {(primaryAction || secondaryAction) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {primaryAction ? (
                <Button className="bg-orange-500 text-white hover:bg-orange-400">
                  {primaryAction}
                </Button>
              ) : null}
              {secondaryAction ? (
                <Button
                  variant="outline"
                  className="border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800"
                >
                  {secondaryAction}
                </Button>
              ) : null}
            </div>
          )}
        </header>

        {metrics.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map(metric => (
              <article
                key={metric.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-slate-600">{metric.label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {metric.value}
                </p>
              </article>
            ))}
          </div>
        ) : null}

        {children ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {children}
          </section>
        ) : null}
      </section>
    </main>
  );
};

export default StaticPageShell;
