import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Can I host both free and paid events?',
    a: 'Yes. Planora supports free and paid event setups with clear fee and visibility controls.',
  },
  {
    q: 'How do private invitations work?',
    a: 'Hosts can send direct invitations. Invitees can accept or decline, and hosts can monitor statuses from dashboard.',
  },
  {
    q: 'Can organizers review participant requests?',
    a: 'Yes. For controlled events, organizers can approve or reject join requests before participation is confirmed.',
  },
  {
    q: 'When can participants leave a review?',
    a: 'Reviews become available after event completion and valid participation status.',
  },
];

const HomeFaqSection = () => {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
          Quick answers to common questions from organizers and attendees.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, index) => (
              <AccordionItem key={item.q} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-foreground">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default HomeFaqSection;
