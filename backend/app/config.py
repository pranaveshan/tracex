import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "TRACE-X"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "tracex-super-secret-investigation-key-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./tracex.db")
    
    BLOCKCHAIN_MODE: str = os.getenv("BLOCKCHAIN_MODE", "demo")
    ETH_RPC_URL: str = os.getenv("ETH_RPC_URL", "")
    BSC_RPC_URL: str = os.getenv("BSC_RPC_URL", "")
    POLYGON_RPC_URL: str = os.getenv("POLYGON_RPC_URL", "")
    BITCOIN_RPC_URL: str = os.getenv("BITCOIN_RPC_URL", "")
    
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    CORS_ORIGINS: list[str] = ["*"]

    class Config:
        case_sensitive = True

settings = Settings()
