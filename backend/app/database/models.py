import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, JSON, Enum
)
from sqlalchemy.orm import relationship
from app.database.session import Base
import enum

class UserRole(str, enum.Enum):
    ADMIN = "ADMIN"
    INVESTIGATOR = "INVESTIGATOR"
    ANALYST = "ANALYST"

class CaseStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    UNDER_REVIEW = "UNDER_REVIEW"
    CLOSED = "CLOSED"

class CasePriority(str, enum.Enum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"

class RiskLevel(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class VASPType(str, enum.Enum):
    CENTRALIZED_EXCHANGE = "Centralized Exchange"
    BROKER = "Broker"
    PAYMENT_PROCESSOR = "Payment Processor"
    OTC_DESK = "OTC Desk"
    GAMBLING_SERVICE = "Gambling Service"
    MIXER = "Mixer"
    BRIDGE = "Bridge"
    DEFI_PROTOCOL = "DeFi Protocol"
    UNKNOWN = "Unknown Service"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default=UserRole.INVESTIGATOR.value, nullable=False)
    badge_number = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    cases_assigned = relationship("Case", back_populates="assigned_investigator")
    audit_logs = relationship("AuditLog", back_populates="user")

class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(String(100), unique=True, index=True, nullable=False) # e.g. CYB-2026-00421
    complaint_id = Column(String(100), nullable=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    fraud_type = Column(String(100), nullable=False) # Investment Scam, Ransomware, Phishing, etc.
    status = Column(String(50), default=CaseStatus.ACTIVE.value)
    priority = Column(String(50), default=CasePriority.HIGH.value)
    primary_wallet = Column(String(255), index=True, nullable=False)
    network = Column(String(50), default="Ethereum")
    amount_involved_usd = Column(Float, default=0.0)
    victim_reference = Column(String(255), nullable=True)
    assigned_to_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    assigned_investigator = relationship("User", back_populates="cases_assigned")
    evidence_items = relationship("Evidence", back_populates="case", cascade="all, delete-orphan")
    alerts = relationship("Alert", back_populates="case", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="case", cascade="all, delete-orphan")
    events = relationship("InvestigationEvent", back_populates="case", cascade="all, delete-orphan")

class Wallet(Base):
    __tablename__ = "wallets"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(255), index=True, nullable=False)
    network = Column(String(50), default="Ethereum", index=True)
    entity_type = Column(String(100), default="Unknown") # Suspect, Intermediary, Mixer, Bridge, VASP Deposit
    label = Column(String(255), nullable=True)
    first_seen = Column(DateTime, nullable=True)
    last_active = Column(DateTime, nullable=True)
    total_transactions = Column(Integer, default=0)
    incoming_tx_count = Column(Integer, default=0)
    outgoing_tx_count = Column(Integer, default=0)
    total_received_native = Column(Float, default=0.0)
    total_sent_native = Column(Float, default=0.0)
    total_received_usd = Column(Float, default=0.0)
    total_sent_usd = Column(Float, default=0.0)
    current_balance_native = Column(Float, default=0.0)
    counterparty_count = Column(Integer, default=0)
    risk_score = Column(Integer, default=0) # 0 - 100
    risk_level = Column(String(50), default="LOW")
    cluster_id = Column(String(100), nullable=True, index=True)
    is_flagged = Column(Boolean, default=False)
    tags = Column(JSON, default=list) # e.g. ["Mixer Interacted", "Rapid Movement"]
    extra_data = Column(JSON, default=dict)

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    tx_hash = Column(String(255), index=True, nullable=False)
    network = Column(String(50), default="Ethereum", index=True)
    from_address = Column(String(255), index=True, nullable=False)
    to_address = Column(String(255), index=True, nullable=False)
    asset_symbol = Column(String(20), default="ETH")
    amount_native = Column(Float, default=0.0)
    amount_usd = Column(Float, default=0.0)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    block_number = Column(Integer, nullable=True)
    fee_usd = Column(Float, default=0.0)
    is_cross_chain = Column(Boolean, default=False)
    bridge_name = Column(String(100), nullable=True)
    dest_chain = Column(String(50), nullable=True)
    dest_tx_hash = Column(String(255), nullable=True)
    patterns = Column(JSON, default=list)

class VASP(Base):
    __tablename__ = "vasps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True, nullable=False)
    vasp_type = Column(String(100), default=VASPType.CENTRALIZED_EXCHANGE.value)
    jurisdiction = Column(String(100), default="Global / Multi-jurisdictional")
    compliance_email = Column(String(255), nullable=True)
    subpoena_portal_url = Column(String(255), nullable=True)
    confidence_rating = Column(Float, default=0.90)
    supported_chains = Column(JSON, default=lambda: ["Ethereum", "BNB Chain", "Polygon", "Bitcoin"])
    source = Column(String(100), default="DEMO_INTELLIGENCE")
    status = Column(String(50), default="Active")
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    wallets = relationship("VASPEntityWallet", back_populates="vasp", cascade="all, delete-orphan")

class VASPEntityWallet(Base):
    __tablename__ = "vasp_entity_wallets"

    id = Column(Integer, primary_key=True, index=True)
    vasp_id = Column(Integer, ForeignKey("vasps.id"), nullable=False)
    wallet_address = Column(String(255), index=True, nullable=False)
    network = Column(String(50), default="Ethereum")
    cluster_tag = Column(String(100), nullable=True)
    attribution_confidence = Column(Float, default=0.90)
    evidence_notes = Column(Text, nullable=True)

    vasp = relationship("VASP", back_populates="wallets")

class WalletCluster(Base):
    __tablename__ = "wallet_clusters"

    id = Column(Integer, primary_key=True, index=True)
    cluster_code = Column(String(100), unique=True, index=True, nullable=False) # e.g. CL-1028
    name = Column(String(255), nullable=True)
    probable_vasp_name = Column(String(255), nullable=True)
    confidence_score = Column(Float, default=0.85)
    wallet_count = Column(Integer, default=1)
    network = Column(String(50), default="Ethereum")
    evidence_summary = Column(Text, nullable=True)
    member_addresses = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("cases.id"), nullable=True)
    wallet_address = Column(String(255), index=True, nullable=False)
    alert_type = Column(String(100), nullable=False) # HIGH_RISK_CLUSTER, VASP_EXPOSURE, RAPID_MOVEMENT, etc.
    severity = Column(String(50), default="HIGH") # CRITICAL, HIGH, MEDIUM, LOW
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    evidence_data = Column(JSON, default=dict)
    is_acknowledged = Column(Boolean, default=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, index=True)

    case = relationship("Case", back_populates="alerts")

class InvestigationEvent(Base):
    __tablename__ = "investigation_events"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("cases.id"), nullable=False)
    user_name = Column(String(255), default="System")
    action_type = Column(String(100), nullable=False) # WALLET_ANALYZED, TRACE_PERFORMED, REPORT_GENERATED, etc.
    description = Column(Text, nullable=False)
    evidence_ref = Column(String(255), nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    case = relationship("Case", back_populates="events")

class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("cases.id"), nullable=False)
    evidence_type = Column(String(100), nullable=False) # WALLET_ANALYSIS, GRAPH_SNAPSHOT, VASP_ATTRIBUTION, NOTE
    title = Column(String(255), nullable=False)
    content = Column(JSON, default=dict)
    notes = Column(Text, nullable=True)
    created_by = Column(String(255), default="Investigator")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    case = relationship("Case", back_populates="evidence_items")

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("cases.id"), nullable=False)
    report_code = Column(String(100), unique=True, index=True, nullable=False) # REP-2026-00421-A
    title = Column(String(255), nullable=False)
    executive_summary = Column(Text, nullable=False)
    risk_assessment = Column(JSON, default=dict)
    fund_flow = Column(JSON, default=dict)
    vasp_findings = Column(JSON, default=dict)
    ai_narrative = Column(Text, nullable=True)
    investigator_notes = Column(Text, nullable=True)
    evidence_refs = Column(JSON, default=list)
    exported_by = Column(String(255), default="Investigator")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    case = relationship("Case", back_populates="reports")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user_email = Column(String(255), nullable=True)
    action = Column(String(100), nullable=False) # VIEW_VASP, ANALYZE_WALLET, EXPORT_REPORT, CREATE_CASE
    resource_type = Column(String(100), nullable=True)
    resource_id = Column(String(255), nullable=True)
    ip_address = Column(String(50), default="127.0.0.1")
    details = Column(JSON, default=dict)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, index=True)

    user = relationship("User", back_populates="audit_logs")
