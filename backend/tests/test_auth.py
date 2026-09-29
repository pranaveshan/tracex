import pytest
from app.auth.jwt import verify_password, get_password_hash, create_access_token, decode_access_token

def test_password_hashing():
    pwd = "Investigator@123"
    hashed = get_password_hash(pwd)
    assert verify_password(pwd, hashed)
    assert not verify_password("WrongPassword", hashed)

def test_jwt_generation_and_decoding():
    token = create_access_token({"sub": "test@tracex.demo", "role": "INVESTIGATOR"})
    payload = decode_access_token(token)
    assert payload is not None
    assert payload.get("sub") == "test@tracex.demo"
    assert payload.get("role") == "INVESTIGATOR"
