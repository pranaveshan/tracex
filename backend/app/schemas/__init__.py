from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str
    user: Dict[str, Any]

class LoginRequest(BaseModel):
    email: str
    password: str

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str
    role: str = "INVESTIGATOR"
    badge_number: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    badge_number: Optional[str] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class CaseCreate(BaseModel):
    case_id: str
    complaint_id: Optional[str] = None
    title: str
    description: Optional[str] = None
    fraud_type: str
    priority: str = "HIGH"
    primary_wallet: str
    network: str = "Ethereum"
    amount_involved_usd: float = 0.0
    victim_reference: Optional[str] = None

class CaseResponse(BaseModel):
    id: int
    case_id: str
    complaint_id: Optional[str]
    title: str
    description: Optional[str]
    fraud_type: str
    status: str
    priority: str
    primary_wallet: str
    network: str
    amount_involved_usd: float
    victim_reference: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class WalletAnalysisRequest(BaseModel):
    address: str
    network: str = "Ethereum"
    case_id: Optional[str] = None

class TraceRequest(BaseModel):
    address: str
    network: str = "Ethereum"
    direction: str = "forward" # forward | backward
    max_hops: int = 5
    min_amount: float = 0.0
    time_range_days: Optional[int] = 30

class RiskFactorItem(BaseModel):
    name: str
    score_impact: int
    severity: str
    description: str
    evidence_ref: Optional[str] = None

class RiskAnalysisResponse(BaseModel):
    address: str
    network: str
    risk_score: int
    risk_level: str
    confidence: float
    factors: List[RiskFactorItem]
    explanation: str
    calculated_at: datetime = Field(default_factory=datetime.utcnow)

class VASPAttribution(BaseModel):
    vasp_name: str
    vasp_type: str
    jurisdiction: str
    wallet_address: str
    hop_count: int
    amount_transferred: float
    timestamp: datetime
    tx_hash: str
    confidence_score: float
    reasons: List[str]
    compliance_contact: Optional[str] = None

class AIIntelligenceRequest(BaseModel):
    address: str
    case_id: Optional[str] = None
    analysis_data: Optional[Dict[str, Any]] = None

class ReportCreate(BaseModel):
    case_id: int
    title: str
    executive_summary: Optional[str] = None
    investigator_notes: Optional[str] = None
