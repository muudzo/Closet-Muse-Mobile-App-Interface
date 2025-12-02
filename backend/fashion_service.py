from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class TrendItem(BaseModel):
    id: str
    title: str
    image_url: str
    description: str
    tags: List[str]

@router.get("/trends", response_model=List[TrendItem])
async def get_fashion_trends(category: Optional[str] = None):
    # In a real app, this would scrape Pinterest or use a Fashion API.
    # For now, we return a curated list of high-quality trend "pins".
    
    trends = [
        TrendItem(
            id="1",
            title="Minimalist Beige Layering",
            image_url="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
            description="Neutral tones and soft layers for a chic, effortless look.",
            tags=["minimalist", "beige", "layering", "fall"]
        ),
        TrendItem(
            id="2",
            title="Streetwear Essentials",
            image_url="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80",
            description="Bold accessories and oversized fits defining modern street style.",
            tags=["streetwear", "urban", "casual"]
        ),
        TrendItem(
            id="3",
            title="Classic Denim",
            image_url="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
            description="Timeless denim jackets paired with white tees.",
            tags=["denim", "classic", "casual"]
        ),
        TrendItem(
            id="4",
            title="Elegant Evening Wear",
            image_url="https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
            description="Sophisticated dresses for special occasions.",
            tags=["elegant", "evening", "formal"]
        ),
        TrendItem(
            id="5",
            title="Summer Vibes",
            image_url="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
            description="Light fabrics and bright colors for the perfect summer outfit.",
            tags=["summer", "bright", "casual"]
        )
    ]
    
    if category:
        return [t for t in trends if category.lower() in t.tags]
        
    return trends
