"""
bhashini.py — Bhashini ULCA ASR (Speech-to-Text) integration
Government of India free API supporting 12 Indian languages
Docs: https://bhashini.gov.in/ulca

Supported language codes:
  kn  = Kannada (ಕನ್ನಡ)
  hi  = Hindi (हिंदी)
  te  = Telugu (తెలుగు)
  ta  = Tamil (தமிழ்)
  mr  = Marathi (मराठी)
  en  = English
"""

import os
import base64
import httpx
import json
from dotenv import load_dotenv

load_dotenv()

BHASHINI_USER_ID = os.getenv("BHASHINI_USER_ID", "")
BHASHINI_API_KEY = os.getenv("BHASHINI_API_KEY", "")

# Bhashini API endpoints
PIPELINE_ENDPOINT = "https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline"
INFERENCE_ENDPOINT = "https://dhruva-api.bhashini.gov.in/services/inference/pipeline"


LANGUAGE_TO_CODE = {
    "kn-IN": "kn",
    "hi-IN": "hi",
    "te-IN": "te",
    "ta-IN": "ta",
    "mr-IN": "mr",
    "en-IN": "en",
    "kn": "kn",
    "hi": "hi",
    "te": "te",
    "ta": "ta",
    "mr": "mr",
    "en": "en",
}


async def transcribe_audio_bhashini(audio_bytes: bytes, language_code: str = "kn-IN") -> dict:
    """
    Transcribe audio using Bhashini ULCA ASR API.
    
    Args:
        audio_bytes: Raw audio bytes (WAV or WebM format)
        language_code: BCP-47 code like "kn-IN" or short code "kn"
    
    Returns:
        dict with keys: text, language, success, error
    """
    # Normalize language code
    lang = LANGUAGE_TO_CODE.get(language_code, "kn")
    
    if not BHASHINI_API_KEY or BHASHINI_API_KEY == "your_bhashini_api_key_here":
        return {
            "success": False,
            "text": "",
            "language": lang,
            "error": "Bhashini API key not configured. Using browser speech recognition."
        }
    
    try:
        # Step 1: Get the pipeline config for ASR
        pipeline_payload = {
            "pipelineTasks": [
                {
                    "taskType": "asr",
                    "config": {
                        "language": {
                            "sourceLanguage": lang
                        }
                    }
                }
            ],
            "pipelineRequestConfig": {
                "pipelineId": "64392f96daac500b55c543cd"
            }
        }
        
        headers = {
            "userID": BHASHINI_USER_ID,
            "ulcaApiKey": BHASHINI_API_KEY,
            "Content-Type": "application/json"
        }
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            # Get pipeline config
            pipeline_resp = await client.post(
                PIPELINE_ENDPOINT,
                json=pipeline_payload,
                headers=headers
            )
            pipeline_data = pipeline_resp.json()
            
            # Extract service URL and auth key
            config = pipeline_data.get("pipelineResponseConfig", [{}])[0]
            config_data = config.get("config", [{}])[0]
            service_url = config_data.get("serviceLocation", INFERENCE_ENDPOINT)
            auth_key = pipeline_data.get("pipelineInferenceAPIEndPoint", {}).get(
                "inferenceApiKey", {}
            ).get("value", BHASHINI_API_KEY)
            
            # Step 2: Encode audio as base64
            audio_base64 = base64.b64encode(audio_bytes).decode("utf-8")
            
            # Step 3: Send ASR request
            asr_payload = {
                "pipelineTasks": [
                    {
                        "taskType": "asr",
                        "config": {
                            "language": {"sourceLanguage": lang},
                            "serviceId": config_data.get("serviceId", ""),
                            "audioFormat": "wav",
                            "samplingRate": 16000,
                            "preProcessors": ["vad"],
                            "postProcessors": ["itn", "punctuation"]
                        }
                    }
                ],
                "inputData": {
                    "audio": [
                        {
                            "audioContent": audio_base64
                        }
                    ]
                }
            }
            
            asr_resp = await client.post(
                service_url,
                json=asr_payload,
                headers={
                    "Authorization": auth_key,
                    "Content-Type": "application/json"
                }
            )
            
            asr_data = asr_resp.json()
            
            # Extract transcribed text
            output = asr_data.get("pipelineResponse", [{}])[0]
            output_data = output.get("output", [{}])[0]
            transcript = output_data.get("source", "")
            
            if transcript:
                return {
                    "success": True,
                    "text": transcript.strip(),
                    "language": lang,
                    "error": None
                }
            else:
                return {
                    "success": False,
                    "text": "",
                    "language": lang,
                    "error": "No transcript returned from Bhashini"
                }
    
    except Exception as e:
        print(f"Bhashini API error: {e}")
        return {
            "success": False,
            "text": "",
            "language": lang,
            "error": str(e)
        }


async def transcribe_with_fallback(audio_bytes: bytes, language_code: str = "kn-IN", browser_text: str = "") -> dict:
    """
    Try Bhashini first, fall back to browser transcript if provided.
    """
    result = await transcribe_audio_bhashini(audio_bytes, language_code)
    
    if not result["success"] and browser_text:
        # Use the browser's Web Speech API transcript as fallback
        return {
            "success": True,
            "text": browser_text,
            "language": language_code,
            "source": "browser_speech_api",
            "error": result.get("error")
        }
    
    result["source"] = "bhashini" if result["success"] else "failed"
    return result
