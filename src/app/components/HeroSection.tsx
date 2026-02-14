import Link from "next/link";
import AnimatedBackground from "./AnimatedBackground";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-hero">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-end px-6 pb-20 lg:px-12">
        <h1 className="hero-text-massive text-hero-foreground opacity-0 animate-fade-in">
          Evidence-grounded
          <br />
          clinical intelligence
        </h1>
        <p className="mt-8 max-w-xl text-hero-muted hero-text-lg opacity-0 animate-fade-in-delay">
          Multimodal diagnosis powered by real-time PubMed retrieval,
          structured differentials, and transparent confidence modeling.
        </p>
        <div className="mt-10 flex items-center gap-4 opacity-0 animate-fade-in-delay-2">
          <Link
            href="/chat"
            className="inline-flex h-12 items-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Start Diagnosis
          </Link>
          <a
            href="#features"
            className="inline-flex h-12 items-center rounded-full border border-hero-muted/30 px-8 text-sm font-medium text-hero-foreground transition-colors hover:border-hero-muted/60"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
