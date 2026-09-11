"""
classifier.py -- NLP Grievance Classifier for AWAAZ SARPANCH

Priority order:
1. Google Gemini API via google-genai SDK (best accuracy, free)
2. Keyword-based fallback (works offline, no API key needed)

Supports: Kannada, Hindi, Telugu, Tamil, Marathi, English
"""

import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# Try new google-genai SDK first, fall back to old google.generativeai
GEMINI_AVAILABLE = False
GEMINI_CLIENT = None

if GEMINI_API_KEY and GEMINI_API_KEY != "your_gemini_api_key_here":
    try:
        from google import genai as google_genai
        GEMINI_CLIENT = google_genai.Client(api_key=GEMINI_API_KEY)
        GEMINI_AVAILABLE = True
        print("[OK] Using google-genai SDK for Gemini classification")
    except Exception:
        try:
            import google.generativeai as genai_legacy
            genai_legacy.configure(api_key=GEMINI_API_KEY)
            GEMINI_CLIENT = genai_legacy
            GEMINI_AVAILABLE = True
            print("[OK] Using google.generativeai (legacy) SDK")
        except Exception as e:
            print(f"[WARN] Gemini unavailable: {e}. Using keyword fallback.")
else:
    print("[INFO] No Gemini API key - using keyword classifier fallback")


CATEGORIES = {
    "Roads / Infrastructure": {
        "department": "Lok Nirman Vibhag / PWD (Roads)",
        "priority": "High Priority"
    },
    "Street Light": {
        "department": "Vidyut Vibhag / BESCOM / Electrical Dept",
        "priority": "High Priority"
    },
    "Water Supply": {
        "department": "Jal Vibhag / Water Department",
        "priority": "High Priority"
    },
    "Drainage & Sewerage": {
        "department": "Nali Vibhag / Drainage Department",
        "priority": "High Priority"
    },
    "Garbage / Sanitation": {
        "department": "Swachhata Vibhag / Sanitation Department",
        "priority": "Medium Priority"
    },
    "General": {
        "department": "Gram Panchayat Office",
        "priority": "Medium Priority"
    }
}

CLASSIFY_PROMPT = """You are an expert civic grievance classifier for Indian villages and towns.

Classify the following citizen complaint into EXACTLY ONE of these categories:
- Roads / Infrastructure (road damage, potholes, broken road, bridge damage)
- Street Light (street lights not working, dark roads, electricity pole)
- Water Supply (no water, water leakage, pipe burst, borewell problem)
- Drainage & Sewerage (blocked drain, sewage overflow, flooded street)
- Garbage / Sanitation (garbage not collected, dirty area, bad smell)
- General (anything else not fitting above)

The complaint may be in Kannada, Hindi, Telugu, Tamil, Marathi, or English.

Complaint: "{text}"

Respond ONLY with valid JSON in this exact format:
{{
  "category": "<category name from the list above>",
  "confidence": <number 70-99>,
  "reason": "<brief reason in English>"
}}"""


async def classify_with_gemini(text: str) -> dict:
    """Use Google Gemini to classify the grievance text."""
    if not GEMINI_AVAILABLE or not GEMINI_CLIENT:
        return None

    try:
        prompt = CLASSIFY_PROMPT.format(text=text)

        # Try new SDK first
        try:
            response = GEMINI_CLIENT.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt
            )
            raw = response.text.strip()
        except AttributeError:
            # Legacy SDK
            model = GEMINI_CLIENT.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(prompt)
            raw = response.text.strip()

        # Strip markdown code fences if present
        raw = re.sub(r"```json\s*|\s*```", "", raw).strip()
        result = json.loads(raw)

        category = result.get("category", "General")
        if category not in CATEGORIES:
            category = "General"

        info = CATEGORIES[category]
        return {
            "category": category,
            "department": info["department"],
            "priority": info["priority"],
            "confidence": result.get("confidence", 85),
            "reason": result.get("reason", ""),
            "source": "gemini"
        }

    except Exception as e:
        print(f"[WARN] Gemini classification error: {e}")
        return None


def classify_with_keywords(text: str) -> dict:
    """
    Keyword-based fallback classifier.
    Word-boundary-aware matching for Kannada, Hindi, English.
    """
    raw = text.strip()
    words = raw.split()
    words_lower = raw.lower().split()

    def score(keywords):
        total = 0
        for kw in keywords:
            kw_lower = kw.lower()
            if len(kw_lower) <= 3:
                if kw_lower in words_lower or kw in words:
                    total += 1
            else:
                if kw_lower in words_lower or kw in words:
                    total += 3
                elif len(kw) >= 4 and (kw in raw or kw_lower in raw.lower()):
                    total += 2
        return total

    road_kw = [
        # Kannada script
        'raste','rasthe','roadu','rodu','gundi','haalagide','kettuhogide','kettu',
        # Hindi
        'sadak','gaddha','kharab','rasta','pothole','potholes',
        # English
        'road','roads','highway','pavement','culvert','bridge','damaged road',
        # Telugu/Tamil/Marathi
        'rasta','khaddha',
    ]
    electric_kw = [
        'beedi deepa','beedideepa','belaku','vidyut','kattale','uriyuttilla',
        'bijli','batti','andhera','khamba',
        'street light','streetlight','electricity','power cut','dark','fuse','lamp',
    ]
    water_kw = [
        'neeru','neerina','sorike','borewell','neerilla',
        'paani','pani','jal','leak','leakage','tanki','handpump','nall',
        'water','pipeline','drinking water','tap water','water supply','pipe',
    ]
    drain_kw = [
        'charandi','gatara','kolache','hariyuttide',
        'nali','naali','nala','gutter','sewer','keechad',
        'drain','drainage','sewage','overflow','clogged','blocked drain',
    ]
    garbage_kw = [
        'kasa','tyajya','totti','vasane','galeeju',
        'kachra','kooda','safai','badboo','gandagi',
        'garbage','waste','trash','litter','smell','dump','sanitation',
    ]

    scores = {
        "Roads / Infrastructure": score(road_kw),
        "Street Light": score(electric_kw),
        "Water Supply": score(water_kw),
        "Drainage & Sewerage": score(drain_kw),
        "Garbage / Sanitation": score(garbage_kw),
    }

    max_score = max(scores.values())
    category = "General" if max_score == 0 else max(scores, key=scores.get)
    info = CATEGORIES[category]
    confidence = min(95, 70 + max_score * 4) if max_score > 0 else 65

    return {
        "category": category,
        "department": info["department"],
        "priority": info["priority"],
        "confidence": confidence,
        "reason": f"Keyword match score: {max_score}",
        "source": "keyword_fallback"
    }


async def classify_grievance(text: str) -> dict:
    """
    Main entry point. Tries Gemini first, falls back to keywords.
    """
    if not text or not text.strip():
        return {
            "category": "General",
            "department": CATEGORIES["General"]["department"],
            "priority": CATEGORIES["General"]["priority"],
            "confidence": 60,
            "reason": "No text provided",
            "source": "default"
        }

    # Try Gemini first
    gemini_result = await classify_with_gemini(text)
    if gemini_result:
        return gemini_result

    # Keyword fallback
    return classify_with_keywords(text)
