# Traffic Management Project

## Setup

1. **Database Options**:
   - **Option A (Easiest - SQLite)**: Set `DB_DIALECT=sqlite` in `.env`. Runs automatically without setup!
   - **Option B (MySQL)**: Set `DB_DIALECT=mysql` in `.env`. Ensure MySQL is running on port `3306` with database `traffic`.
   - **Option C (SQL Server / MSSQL)**: Set `DB_DIALECT=mssql` in `.env`. Ensure SQL Server is running, and install `tedious` driver: `npm install tedious`.

2. **Environment Variables**:
   - Check `.env` file and update configuration (`DB_DIALECT`, `DB_HOST`, etc.).

3. **Install Dependencies**:
   ```bash
   npm install
   ```

## Run

To start all services concurrently (gateway, auth, vehicles, traffic, incidents, notifications):
```bash
npm start
```

## Test

To run all unit tests:
```bash
npm test
```
