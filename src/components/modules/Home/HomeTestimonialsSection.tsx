import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Raihan Kabir',
    role: 'Event Organizer',
    rating: 5,
    content:
      'Planora completely transformed how I run my tech workshops. The participant approval flow and integrated payment made managing 200+ attendees effortless.',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Community Manager',
    rating: 5,
    content:
      'I love how easy it is to create private events and invite specific people. The invitation status tracking saves me so much back-and-forth messaging.',
  },
  {
    name: 'Farhan Hossain',
    role: 'Conference Speaker',
    rating: 5,
    content:
      "The dashboard gives me a bird's-eye view of everything — upcoming events, reviews, payment history. It's exactly what I needed as both an organizer and participant.",
  },
  {
    name: 'Tasnim Ahmed',
    role: 'Startup Founder',
    rating: 5,
    content:
      'Setting up a paid event with SSLCommerz took less than 5 minutes. The review system after the event gave us incredibly useful feedback from attendees.',
  },
  {
    name: 'Sabbir Rahman',
    role: 'University Club Lead',
    rating: 5,
    content:
      'We use Planora for all our campus events now. The free public events require zero registration fee setup, and private invites keep our exclusive sessions secure.',
  },
  {
    name: 'Lamia Sultana',
    role: 'Workshop Facilitator',
    rating: 5,
    content:
      'The role-based access means my co-organizers can manage participants while I focus on the content. Planora respects how teams actually work together.',
  },
];

const HomeTestimonialsSection = () => {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            What Organizers Are Saying
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Event creators and participants across Bangladesh trust Planora to
            run their most important gatherings.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(testimonial => (
            <article
              key={testimonial.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="mb-3 size-6 text-orange-400/60" />
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {testimonial.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonialsSection;
