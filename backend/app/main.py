from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database.seeder import seed_database
from app.api import (
    auth, cases, wallets, trace, graph, vasps, clusters,
    alerts, cross_chain, intelligence, reports, search, admin
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="TRACE-X: Real-Time Cryptocurrency Fraud Attribution & Blockchain Intelligence Platform (SIH 2026)"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    seed_database()

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "blockchain_mode": settings.BLOCKCHAIN_MODE,
        "database": "connected"
    }

app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(cases.router, prefix=settings.API_V1_STR)
app.include_router(wallets.router, prefix=settings.API_V1_STR)
app.include_router(trace.router, prefix=settings.API_V1_STR)
app.include_router(graph.router, prefix=settings.API_V1_STR)
app.include_router(vasps.router, prefix=settings.API_V1_STR)
app.include_router(clusters.router, prefix=settings.API_V1_STR)
app.include_router(alerts.router, prefix=settings.API_V1_STR)
app.include_router(cross_chain.router, prefix=settings.API_V1_STR)
app.include_router(intelligence.router, prefix=settings.API_V1_STR)
app.include_router(reports.router, prefix=settings.API_V1_STR)
app.include_router(search.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)
