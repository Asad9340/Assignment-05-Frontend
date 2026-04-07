import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HomeNewsletterSection = () => {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
          Get Event Strategy Updates
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/80 dark:text-muted-foreground">
          Receive product updates, event playbooks, and practical growth ideas
          in your inbox.
        </p>

        <form className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-11 border-0 bg-card text-foreground"
          />
          <Button
            type="button"
            className="h-11 bg-orange-500 text-white hover:bg-orange-400"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default HomeNewsletterSection;
