// src/app/interfaces/trust-signal.interface.ts
import { LucideIconData } from 'lucide-angular';

export interface TrustSignal {
  id: string;
  icon: LucideIconData;
  title: string;
  description: string[];
  linkLabel: string;
}