import type { BusinessRole, BusinessState, BusinessPhase, Rating } from "./enums";
import type { AddressInfo } from "@/types/contact.ts";
import type { Owner } from "@/types/owner.ts";

export interface PaymentTerm {
  id: number;
  value: string;
}

export interface SecurityLevel {
  id: number;
  name: string;
}

export interface RowInfo {
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  rowAccess: string | null;
  rowState: string | null;
}

export interface Classification {
  companyClassification1: string | null;
  companyClassification2: string | null;
  companyClassification3: string | null;
}

export interface BusinessCase {
  id: number;
  name: string;
  person: boolean;
  role: BusinessRole;
  state: BusinessState;
  phase: BusinessPhase;
  rating: Rating;
  owner: Owner;
  regNumber: string | null;
  taxNumber: string | null;
  taxNumber2: string | null;
  taxPayer: boolean | null;
  bankAccount: string | null;
  databox: string | null;
  court: string | null;
  primaryAddress: AddressInfo;
  contactAddress: AddressInfo;
  category: string | null;
  turnover: number | null;
  economyActivity: string | null;
  classification: Classification;
  paymentTerm: PaymentTerm | null;
  contactSource: string | null;
  birthday: string | null;
  notice: string | null;
  tags: string[];
  customFields: Record<string, unknown>;
  attachments: unknown[] | null;
  rowInfo: RowInfo;
  securityLevel: SecurityLevel;
  inlineGdpr: unknown[];
  _version: number;
}
