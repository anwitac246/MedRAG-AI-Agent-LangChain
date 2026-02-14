import { ArrowRight } from "lucide-react";

const steps = [
  { number: "01", title: "Input", description: "Describe symptoms, upload labs, or enter clinical data" },
  { number: "02", title: "Retrieve", description: "Search PubMed and clinical databases for relevant evidence" },
  { number: "03", title: "Evaluate", description: "Analyze findings against differential diagnosis criteria" },
  { number: "04", title: "Diagnose", description: "Generate ranked differentials with confidence scores" },
];

const HowItWorks = () => {
  return (
    <section className="border-t border-border px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          Process
        </p>
        <h2 className="mb-14 max-w-lg text-3xl font-light tracking-tight text-foreground lg:text-4xl">
          From input to diagnosis
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-3xl font-extralight text-primary/40">
                  {step.number}
                </span>
                {index < steps.length - 1 && (
                  <ArrowRight size={14} className="hidden text-muted-foreground/40 lg:block" />
                )}
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
