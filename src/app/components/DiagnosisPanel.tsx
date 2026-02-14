import { DifferentialDiagnosis } from "@/types/diagnosis";

interface DiagnosisPanelProps {
  differentials: DifferentialDiagnosis[];
  summary: string;
}

const DiagnosisPanel = ({ differentials, summary }: DiagnosisPanelProps) => {
  if (differentials.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">
          Differential diagnoses will appear here after analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-2 text-sm font-semibold text-foreground">Summary</h4>
        <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
      </div>
      {differentials.map((d, index) => (
        <div key={index} className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">{d.condition}</h4>
            <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
              {d.likelihood}%
            </span>
          </div>
          {d.icdCode && (
            <p className="mb-2 text-xs text-muted-foreground">ICD-10: {d.icdCode}</p>
          )}
          <p className="text-sm leading-relaxed text-muted-foreground">
            {d.reasoning}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DiagnosisPanel;
