import { ConfidenceScore } from "../types/diagnosis";

interface ConfidencePanelProps {
  confidence: ConfidenceScore | null;
}

const ConfidenceBar = ({ label, value }: { label: string; value: number }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="text-sm font-bold text-primary">{value}%</span>
    </div>
    <div className="h-3 w-full overflow-hidden rounded-full bg-accent">
      <div
        className="h-full rounded-full bg-primary transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const ConfidencePanel = ({ confidence }: ConfidencePanelProps) => {
  if (!confidence) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">
          Confidence metrics will appear here after analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <ConfidenceBar label="Overall Confidence" value={confidence.overall} />
      <ConfidenceBar label="Evidence Strength" value={confidence.evidenceStrength} />
      <ConfidenceBar label="Differential Clarity" value={confidence.differentialClarity} />
    </div>
  );
};

export default ConfidencePanel;
