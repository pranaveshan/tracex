from sqlalchemy.orm import Session
from app.database.session import Base, engine, SessionLocal
from app.database.models import User, Case, Alert, InvestigationEvent, Evidence, VASP, VASPEntityWallet, WalletCluster
from app.auth.jwt import get_password_hash
import datetime

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        if not db.query(User).filter(User.email == "investigator@tracex.demo").first():
            inv = User(
                email="investigator@tracex.demo",
                hashed_password=get_password_hash("Investigator@123"),
                full_name="Special Agent Sarah Jenkins",
                role="INVESTIGATOR",
                badge_number="CYB-LE-4091",
                is_active=True
            )
            db.add(inv)

        if not db.query(User).filter(User.email == "admin@tracex.demo").first():
            adm = User(
                email="admin@tracex.demo",
                hashed_password=get_password_hash("Admin@123"),
                full_name="Chief Intelligence Officer Miller",
                role="ADMIN",
                badge_number="DIR-001",
                is_active=True
            )
            db.add(adm)

        if not db.query(User).filter(User.email == "analyst@tracex.demo").first():
            ana = User(
                email="analyst@tracex.demo",
                hashed_password=get_password_hash("Analyst@123"),
                full_name="Cyber Forensics Analyst Dave",
                role="ANALYST",
                badge_number="CFA-992",
                is_active=True
            )
            db.add(ana)

        db.commit()

        suspect_addr = "0x71c8491c39049a46399b009e51b14798380ad7f4"
        case = db.query(Case).filter(Case.case_id == "CYB-2026-00421").first()
        if not case:
            case = Case(
                case_id="CYB-2026-00421",
                complaint_id="COMP-2026-9041",
                title="Operation Quantum Shield - High-Yield Investment Scam Syndicate",
                description="Victim reported loss of 45.0 ETH (~$148,500 USD) through fraudulent high-yield staking dApp. Suspect address subsequently routed funds across peeling intermediaries and bridge endpoints.",
                fraud_type="Investment Scam",
                status="ACTIVE",
                priority="CRITICAL",
                primary_wallet=suspect_addr,
                network="Ethereum",
                amount_involved_usd=481305.00,
                victim_reference="Victim Statement Ref #VT-2026-012"
            )
            db.add(case)
            db.commit()
            db.refresh(case)

            events = [
                InvestigationEvent(
                    case_id=case.id,
                    user_name="Special Agent Sarah Jenkins",
                    action_type="CASE_INITIATED",
                    description="Case registered following complaint intake from Cyber Crime Helpline.",
                    timestamp=datetime.datetime.utcnow() - datetime.timedelta(days=3)
                ),
                InvestigationEvent(
                    case_id=case.id,
                    user_name="TRACE-X Engine",
                    action_type="WALLET_FLAGGED",
                    description="Suspect wallet 0x71c8... triggered CRITICAL Risk Alert (Score 92/100) due to mixer exposure.",
                    timestamp=datetime.datetime.utcnow() - datetime.timedelta(days=2)
                ),
                InvestigationEvent(
                    case_id=case.id,
                    user_name="TRACE-X Graph Tracer",
                    action_type="VASP_EXPOSURE_IDENTIFIED",
                    description="Terminal fund path resolved to Demo Global Exchange deposit cluster (0x28C6c062... with 91% confidence).",
                    timestamp=datetime.datetime.utcnow() - datetime.timedelta(days=1)
                )
            ]
            db.add_all(events)

            alerts = [
                Alert(
                    case_id=case.id,
                    wallet_address=suspect_addr,
                    alert_type="HIGH_RISK_CLUSTER",
                    severity="CRITICAL",
                    title="Critical Risk Wallet Active (Score 92/100)",
                    description="Suspect wallet linked to organized multi-hop laundering syndicate CL-1028.",
                    evidence_data={"cluster_id": "CL-1028", "risk_score": 92}
                ),
                Alert(
                    case_id=case.id,
                    wallet_address="0x28C6c06298d514Db089934071355E5743bf21d60",
                    alert_type="VASP_EXPOSURE",
                    severity="HIGH",
                    title="VASP Deposit Endpoint Exposure Detected",
                    description="Funds from suspect chain reached exchange deposit wallet with 91% attribution confidence.",
                    evidence_data={"vasp": "Demo Global Exchange", "confidence": 0.91}
                ),
                Alert(
                    case_id=case.id,
                    wallet_address="0x8589427373D6D84E98730D7795D8f6f8731FDA16",
                    alert_type="MIXER_EXPOSURE",
                    severity="CRITICAL",
                    title="Privacy Protocol Interaction (25.0 ETH)",
                    description="Intermediate address 0x8920... deposited 25 ETH into Tornado Cash anonymity pool.",
                    evidence_data={"mixer": "Tornado Cash (Demo)", "amount_eth": 25.0}
                ),
                Alert(
                    case_id=case.id,
                    wallet_address="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                    alert_type="CROSS_CHAIN_TRANSFER",
                    severity="HIGH",
                    title="Cross-Chain Bridge Hopping (ETH -> BSC)",
                    description="24.5 ETH transported via Stargate Finance bridge to BNB Chain.",
                    evidence_data={"bridge": "Stargate Finance", "target_chain": "BNB Chain"}
                )
            ]
            db.add_all(alerts)
            db.commit()

        case2 = db.query(Case).filter(Case.case_id == "CYB-2026-00109").first()
        if not case2:
            case2 = Case(
                case_id="CYB-2026-00109",
                complaint_id="COMP-2026-1049",
                title="BlackCat Ransomware Infrastructure Payment",
                description="Extortion payment of 12.5 BTC routed through multi-sig peel chain.",
                fraud_type="Ransomware",
                status="ACTIVE",
                priority="HIGH",
                primary_wallet="0x89205a3e3b2a69de6dbf7f01ed13b2108b2c43e7",
                network="Ethereum",
                amount_involved_usd=165000.00
            )
            db.add(case2)
            db.commit()

        print("Database seeded successfully with demo investigation CYB-2026-00421.")
    finally:
        db.close()
