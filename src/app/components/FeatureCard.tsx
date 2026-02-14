import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <div className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <h3 className="mb-3 text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
