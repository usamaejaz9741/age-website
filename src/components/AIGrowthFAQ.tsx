import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const AIGrowthFAQ = () => {
  const faqItems = [
    {
      question: "How accurate is the AI Growth Score?",
      answer: "The assessment is based on industry frameworks and has been validated with 500+ organizations. It provides a reliable benchmark for your AI maturity across four key dimensions."
    },
    {
      question: "What happens to my data and email?",
      answer: "Your responses are confidential and used solely to generate your personalized results. We follow GDPR compliance and never share individual data with third parties."
    },
    {
      question: "How long does the assessment take?",
      answer: "The full assessment takes 3-4 minutes. It's designed for busy executives who need quick, actionable insights without lengthy questionnaires."
    },
    {
      question: "Can I retake the assessment?",
      answer: "Yes, we recommend retaking quarterly to track your AI maturity progress. Each assessment captures your current state and shows improvement over time."
    },
    {
      question: "Is the strategy session really free?",
      answer: "Yes, the 30-minute strategy session is complimentary for assessment participants. There's no obligation - it's our way of supporting AI growth in emerging markets."
    },
    {
      question: "What makes Alvi Global Enterprises different from other AI consultants?",
      answer: "We engineer revenue-generating business ecosystems, not just AI tools. Our performance-driven approach combines AI automation, product engineering, and go-to-market strategy under one roof."
    }
  ];

  return (
    <section className="py-20 bg-muted/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about the AI Growth Score
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card rounded-lg shadow-soft border px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Have more questions?
          </p>
          <a 
            href="mailto:hello@alviglobal.com?subject=AI Growth Score Questions"
            className="text-primary hover:text-primary/80 font-medium"
          >
            Contact us at hello@alviglobal.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default AIGrowthFAQ;