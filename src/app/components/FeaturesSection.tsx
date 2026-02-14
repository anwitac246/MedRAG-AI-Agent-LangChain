import { ClipboardList, Search, Stethoscope, BarChart3, FileText } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Multimodal Input",
    description: "Accept text descriptions, lab results, imaging reports, and structured clinical data for comprehensive analysis.",
    icon: ClipboardList,
  },
  {
    title: "Evidence-Based Retrieval",
    description: "Real-time PubMed and clinical literature search to ground every recommendation in peer-reviewed evidence.",
    icon: Search,
  },
  {
    title: "Structured Diagnosis",
    description: "Generate ranked differential diagnoses with ICD codes, likelihood scores, and clear clinical reasoning.",
    icon: Stethoscope,
  },
  {
    title: "Confidence Modeling",
    description: "Transparent confidence scores for evidence strength, differential clarity, and overall diagnostic certainty.",
    icon: BarChart3,
  },
  {
    title: "Automated Reports",
    description: "Generate structured clinical reports ready for documentation, review, and patient record integration.",
    icon: FileText,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          Capabilities
        </p>
        <h2 className="mb-4 max-w-lg text-3xl font-light tracking-tight text-foreground lg:text-4xl">
          Built for clinical precision
        </h2>
        <p className="mb-14 max-w-xl text-base text-muted-foreground">
          Every feature is designed around transparency, evidence, and structured reasoning.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
