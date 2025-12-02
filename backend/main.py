from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from weather_service import router as weather_router
from fashion_service import router as fashion_router

app = FastAPI(title="Closet Muse API", description="Backend for Closet Muse Mobile App")

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:3002", # Added current port
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
