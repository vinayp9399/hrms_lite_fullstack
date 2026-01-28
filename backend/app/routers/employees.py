
from fastapi import APIRouter, HTTPException
from app.core.database import db
from app.schemas.employee import EmployeeCreate

router = APIRouter()

@router.post("/", status_code=201)
async def create_employee(emp: EmployeeCreate):
    if await db.employees.find_one({"$or":[{"email":emp.email},{"employee_id":emp.employee_id}]}):
        raise HTTPException(status_code=409, detail="Employee already exists")
    await db.employees.insert_one(emp.dict())
    return {"message":"Employee created"}

@router.get("/")
async def list_employees():
    employees = []
    async for e in db.employees.find():
        e["_id"] = str(e["_id"])
        employees.append(e)
    return employees

@router.delete("/{employee_id}")
async def delete_employee(employee_id: str):
    result = await db.employees.delete_one({"employee_id":employee_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message":"Employee deleted"}
