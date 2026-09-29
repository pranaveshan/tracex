export type UserRole = "ADMIN" | "INVESTIGATOR" | "ANALYST";

export interface User {
  id: string;
  email: string;
  full_name: string;
  badge_number: string;
  agency_name: string;
  role: UserRole;
  is_active: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface RiskFactor {
  factor: string;
  weight: number;
  score: number;
  description: string;
}

export interface RiskAssessment {
  overall_score: number;
  risk_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  confidence_score: number;
  factors: RiskFactor[];
  summary: string;
  recommended_actions: string[];
}

export interface WalletAnalysis {
  address: string;
  chain: string;
  balance_native: number;
  balance_usd: number;
  total_received: number;
  total_sent: number;
  tx_count: number;
  first_seen?: string;
  last_seen?: string;
  is_contract: boolean;
  known_label?: string;
  risk: RiskAssessment;
  probable_vasp?: {
    vasp_name: string;
    vasp_type: string;
    jurisdiction?: string;
    confidence: number;
    subpoena_recommended: boolean;
    evidence: string[];
  };
  detected_patterns: string[];
  tags: string[];
}

export interface GraphNode {
  id: string;
  label?: string;
  address?: string;
  chain?: string;
  risk_score?: number;
  risk_level?: string;
  node_type?: string;
  entity_type?: string;
  entity_label?: string;
  cluster_id?: string;
  [key: string]: any;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  chain: string;
  tx_hash: string;
  value_native: number;
  value_usd: number;
  timestamp?: string;
  pattern_flags?: string[];
  [key: string]: any;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  total_nodes?: number;
  total_edges?: number;
  vasp_exposure?: any;
  summary?: {
    total_nodes: number;
    total_edges: number;
    total_volume_usd: number;
    high_risk_nodes: number;
    detected_patterns: string[];
  };
  [key: string]: any;
}

export interface TimelineEvent {
  id: string;
  case_id: string;
  event_type?: string;
  action_type?: string;
  user_name?: string;
  title?: string;
  description: string;
  timestamp: string;
  [key: string]: any;
}

export interface EvidenceItem {
  id: string;
  case_id: string;
  evidence_type: string;
  title: string;
  description?: string;
  source_ref?: string;
  file_hash?: string;
  is_verified: boolean;
  created_at: string;
  [key: string]: any;
}

export interface Case {
  id: string;
  case_id?: string;
  case_number: string;
  title: string;
  description: string;
  fraud_type?: string;
  primary_wallet?: string;
  agency_case_ref?: string;
  status: "OPEN" | "IN_PROGRESS" | "UNDER_REVIEW" | "UNDER_ANALYSIS" | "PENDING_VALIDATION" | "VALIDATED_AND_SUBPOENA_ISSUED" | "CLOSED" | "ARCHIVED" | string;
  primary_chain: string;
  target_addresses: string[];
  created_at: string;
  updated_at: string;
  events?: TimelineEvent[];
  evidence?: EvidenceItem[];
  timeline?: TimelineEvent[];
  [key: string]: any;
}

export interface VASP {
  id: string;
  name: string;
  legal_name?: string;
  vasp_type: string;
  jurisdiction: string;
  compliance_email?: string;
  supports_le_requests: boolean;
  confidence_rating?: number;
  description?: string;
  notes?: string;
  [key: string]: any;
}

export interface WalletCluster {
  id: string;
  cluster_id?: string;
  cluster_name?: string;
  cluster_label?: string;
  chain: string;
  wallet_count: number;
  total_balance_usd?: number;
  total_volume_usd?: number;
  risk_score: number;
  dominant_vasp?: string;
  created_at?: string;
  [key: string]: any;
}

export interface Alert {
  id: string;
  alert_type: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  title: string;
  description: string;
  chain: string;
  related_address?: string;
  related_tx_hash?: string;
  risk_score: number;
  status: "NEW" | "INVESTIGATING" | "RESOLVED" | "DISMISSED";
  is_acknowledged?: boolean;
  detected_at: string;
  [key: string]: any;
}

export interface AIIntelligenceBrief {
  executive_summary: string;
  attribution_findings: string[];
  identified_entities: {
    entity_name: string;
    type: string;
    confidence: number;
    subpoena_recommended: boolean;
    evidence_ids: string[];
    [key: string]: any;
  }[];
  pattern_analysis: string[];
  recommended_actions: string[];
  legal_next_steps: string[];
  disclaimer: string;
  [key: string]: any;
}

export interface ReportRecord {
  id: string;
  case_id: string;
  report_number?: string;
  report_code?: string;
  title?: string;
  executive_summary?: string;
  format: "PDF" | "JSON" | "CSV" | string;
  generated_by: string;
  generated_at: string;
  download_url?: string;
  summary?: string;
  [key: string]: any;
}
