export interface DifferentialDiagnosis {
  condition: string;
  likelihood: number;
  reasoning: string;
  icdCode?: string;
}

export interface ConfidenceScore {
  overall: number;
  evidenceStrength: number;
  differentialClarity: number;
}

export interface EvidenceItem {
  title: string;
  source: string;
  year: number;
  relevance: number;
  summary: string;
}

export interface DiagnosisOutput {
  differentials: DifferentialDiagnosis[];
  confidence: ConfidenceScore;
  evidence: EvidenceItem[];
  summary: string;
}
