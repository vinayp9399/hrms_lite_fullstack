
from pydantic import BaseModel
from datetime import date

class AttendanceCreate(BaseModel):
    employee_id: str
    name:str
    date: date
    status: str
