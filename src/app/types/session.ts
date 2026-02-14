import { Message } from "./chat";
import { DiagnosisOutput } from "./diagnosis";

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  diagnosis: DiagnosisOutput | null;
  createdAt: Date;
}
