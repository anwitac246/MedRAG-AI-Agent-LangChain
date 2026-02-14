import { EvidenceItem } from "../types/diagnosis";

interface EvidencePanelProps {
  evidence: EvidenceItem[];
}

const EvidencePanel = ({ evidence }: EvidencePanelProps) => {
  if (evidence.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">
          Evidence will appear here after you describe symptoms.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {evidence.map((item, index) => (
        <div key={index} className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
            <span className="shrink-0 rounded bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
              {item.relevance}%
            </span>
          </div>
          <p className="mb-2 text-xs text-muted-foreground">
            {item.source} · {item.year}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.summary}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EvidencePanel;
