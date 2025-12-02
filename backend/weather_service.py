import os
import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

class WeatherData(BaseModel):
    temp: float
    condition: str
    humidity: int
    description: str
    location: str

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

@router.get("/", response_model=WeatherData)
async def get_weather(lat: Optional[float] = None, lon: Optional[float] = None, city: Optional[str] = None):
    if OPENWEATHER_API_KEY:
        try:
            params = {"appid": OPENWEATHER_API_KEY, "units": "imperial"}
            if lat and lon:
                params["lat"] = lat
                params["lon"] = lon
            elif city:
                params["q"] = city
            else:
                # Default to New York if nothing provided
                params["q"] = "New York"

            response = requests.get(BASE_URL, params=params)
            response.raise_for_status()
            data = response.json()

            weather_condition = data["weather"][0]["main"].lower()
            # Map API condition to our app's expected conditions
            condition_map = {
                "clear": "sunny",
                "clouds": "cloudy",
                "rain": "rainy",
                "drizzle": "rainy",
                "thunderstorm": "rainy",
                "snow": "snowy",
                "mist": "cloudy",
                "smoke": "cloudy",
                "haze": "cloudy",
                "dust": "cloudy",
                "fog": "cloudy",
                "sand": "cloudy",
                "ash": "cloudy",
                "squall": "windy",
                "tornado": "windy"
            }
            mapped_condition = condition_map.get(weather_condition, "sunny")

            return WeatherData(
                temp=data["main"]["temp"],
                condition=mapped_condition,
                humidity=data["main"]["humidity"],
                description=data["weather"][0]["description"].capitalize(),
                location=data["name"]
            )
        except Exception as e:
            print(f"Error fetching weather: {e}")
            # Fallback to mock data if API fails
            pass

    # Mock Data Fallback
    import random
    conditions = ['sunny', 'cloudy', 'rainy', 'windy']
    random_condition = random.choice(conditions)
    base_temp = 70
    temp_variation = random.randint(-10, 10)
    
    descriptions = {
        'sunny': 'Clear skies and sunny',
        'cloudy': 'Overcast clouds',
        'rainy': 'Light rain showers',
        'windy': 'Strong breeze',
        'snowy': 'Light snow'
    }

    return WeatherData(
        temp=base_temp + temp_variation,
        condition=random_condition,
        humidity=random.randint(30, 70),
        description=descriptions.get(random_condition, "Nice weather"),
        location="Demo City"
    )
