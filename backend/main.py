from fastapi import FastAPI, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List
import shutil
import os
import uuid

from weather_service import router as weather_router
from fashion_service import router as fashion_router
from database import engine, get_db
import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Closet Muse API", description="Backend for Closet Muse Mobile App")

# Mount static directory for images
os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:3002",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(weather_router, prefix="/api/weather", tags=["weather"])
app.include_router(fashion_router, prefix="/api/fashion", tags=["fashion"])

@app.get("/")
async def root():
    return {"message": "Welcome to Closet Muse API"}

@app.post("/items/")
async def create_item(
    name: str = Form(...),
    category: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    filename = f"{uuid.uuid4()}{file_extension}"
    file_path = f"static/{filename}"
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Create DB record
    # Construct full URL for the image (assuming localhost for now, can be updated)
    image_url = f"http://localhost:8000/static/{filename}"
    
    db_item = models.ClothingItem(
        name=name,
        category=category,
        image_url=image_url
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/items/")
async def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = db.query(models.ClothingItem).offset(skip).limit(limit).all()
    return items
