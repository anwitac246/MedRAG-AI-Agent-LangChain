import { Message } from "../types/chat";
import { DiagnosisOutput } from "../types/diagnosis";

interface ChatResponse {
  message: Message;
  diagnosis: DiagnosisOutput;
}

export async function sendMessage(content: string): Promise<ChatResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    message: {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Based on the symptoms you've described, I've identified several potential conditions. The presentation of persistent cough with low-grade fever and fatigue is consistent with several respiratory conditions. I've retrieved relevant literature from PubMed to support the differential diagnosis.",
      timestamp: new Date(),
    },
    diagnosis: {
      summary:
        "The clinical presentation suggests an upper respiratory tract infection, with community-acquired pneumonia as a secondary consideration.",
      differentials: [
        {
          condition: "Upper Respiratory Tract Infection",
          likelihood: 72,
          reasoning:
            "Consistent with reported symptoms of cough, mild fever, and fatigue. Most common presentation in outpatient settings.",
          icdCode: "J06.9",
        },
        {
          condition: "Community-Acquired Pneumonia",
          likelihood: 18,
          reasoning:
            "Cannot be excluded without chest imaging. Fever pattern and cough duration warrant consideration.",
          icdCode: "J18.9",
        },
        {
          condition: "Acute Bronchitis",
          likelihood: 10,
          reasoning:
            "Persistent cough may indicate bronchial involvement. Usually self-limiting.",
          icdCode: "J20.9",
        },
      ],
      confidence: {
        overall: 74,
        evidenceStrength: 68,
        differentialClarity: 80,
      },
      evidence: [
        {
          title: "Diagnosis and Management of Upper Respiratory Tract Infections",
          source: "JAMA Internal Medicine",
          year: 2023,
          relevance: 92,
          summary:
            "Comprehensive review of URTI diagnosis criteria and evidence-based management strategies in primary care settings.",
        },
        {
          title: "Community-Acquired Pneumonia: Diagnostic Accuracy of Clinical Features",
          source: "The Lancet Respiratory Medicine",
          year: 2022,
          relevance: 78,
          summary:
            "Meta-analysis evaluating the sensitivity and specificity of clinical signs for pneumonia diagnosis.",
        },
        {
          title: "Acute Cough in Adults: Differential Diagnosis and Management",
          source: "BMJ Evidence-Based Medicine",
          year: 2023,
          relevance: 85,
          summary:
            "Systematic approach to evaluating acute cough presentations with focus on distinguishing viral from bacterial etiology.",
        },
      ],
    },
  };
}
