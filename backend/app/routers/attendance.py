from fastapi import APIRouter, HTTPException
from app.core.database import db
from app.schemas.attendance import AttendanceCreate
from datetime import datetime

router = APIRouter()

@router.post("/", status_code=201)
async def mark_attendance(data: AttendanceCreate):
    if not await db.employees.find_one({"employee_id": data.employee_id}):
        raise HTTPException(status_code=404, detail="Employee not found")

    record = data.dict()
    record["date"] = datetime.combine(record["date"], datetime.min.time())

    await db.attendance.insert_one(record)
    return {"message": "Attendance marked"}

@router.get("/{employee_id}")
async def get_attendance(employee_id: str):
    records = []
    async for r in db.attendance.find({"employee_id": employee_id}):
        r["_id"] = str(r["_id"])
        r["date"] = r["date"].date().isoformat()
        records.append(r)
    return records
