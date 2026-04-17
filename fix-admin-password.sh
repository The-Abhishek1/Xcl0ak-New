#!/bin/bash
# Run this on the ESO server to fix the admin password hash
# It uses the ESO venv which has bcrypt installed

cd /home/idiot/Projects/Enterprise-Security-Orchestrator

./venv/bin/python3 << 'PYEOF'
import asyncio, asyncpg, os

DSN = os.environ.get('POSTGRES_DSN', 'postgresql://eso:eso_secret@localhost:5432/orchestrator')

def hash_password(pw):
    try:
        import bcrypt
        return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()
    except ImportError:
        import hashlib
        return hashlib.sha256(pw.encode()).hexdigest()

async def main():
    conn = await asyncpg.connect(DSN)
    h = hash_password('dev_password')
    await conn.execute(
        "UPDATE users SET password_hash=$1 WHERE email='dev@example.com'", h
    )
    row = await conn.fetchrow("SELECT user_id, username, role, tier, password_hash FROM users WHERE email='dev@example.com'")
    print(f"User:  {row['username']} / {row['role']} / {row['tier']}")
    print(f"Hash:  {row['password_hash'][:30]}...")
    print(f"Type:  {'bcrypt' if row['password_hash'].startswith('$2') else 'sha256'}")
    await conn.close()
    print("✅ Password updated. Try logging in with dev@example.com / dev_password")

asyncio.run(main())
PYEOF
