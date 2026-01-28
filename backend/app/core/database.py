
from motor.motor_asyncio import AsyncIOMotorClient

# MONGO_URL = "mongodb://localhost:27017"
MONGO_URL = "mongodb+srv://vinayp9399:mechanic%4093@vinaycluster.03uocxi.mongodb.net/hrms_lite?retryWrites=true&w=majority&appName=VinayCluster"

client = AsyncIOMotorClient(MONGO_URL)
db = client.hrms_lite
