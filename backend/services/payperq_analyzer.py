import os
import requests
from typing import Any, Dict

PAYPERQ_API_KEY = os.getenv("PAYPERQ_API_KEY")


def analyze_resume(resume_text: str) -> Dict[str, Any]:
    if not PAYPERQ_API_KEY:
        return get_mock_analysis(resume_text)

    try:
        url = "https://api.payperq.com/v1/analyze"

        headers = {
            "Authorization": f"Bearer {PAYPERQ_API_KEY}",
            "Content-Type": "application/json",
        }

        payload = {
            "input": resume_text,
            "model": "gpt-5",
            "prompt": """
            Analyze this resume and provide a comprehensive assessment including:
            1. Overall strength score (1-10)
            2. Key strengths
            3. Areas for improvement
            4. Skills analysis
            5. Experience assessment
            6. Recommendations for enhancement

            Format the response as a structured JSON object.
            """,
            "max_tokens": 1000,
            "temperature": 0.3,
        }

        response = requests.post(url, headers=headers, json=payload, timeout=30)

        if response.status_code == 200:
            result = response.json()
            return {
                "success": True,
                "analysis": result,
                "source": "payperq_api",
            }

        print(f"PayperQ API error: {response.status_code} - {response.text}")
        return get_mock_analysis(resume_text)

    except requests.exceptions.RequestException as exc:
        print(f"Request error: {exc}")
        return get_mock_analysis(resume_text)
    except Exception as exc:  # pylint: disable=broad-except
        print(f"Unexpected error: {exc}")
        return get_mock_analysis(resume_text)


def get_mock_analysis(resume_text: str) -> Dict[str, Any]:
    word_count = len(resume_text.split())

    strength_score = min(10, max(1, word_count // 50 + 5))

    lower_resume = resume_text.lower()
    has_education = any(word in lower_resume for word in ["education", "degree", "university", "college", "bachelor", "master", "phd"])
    has_experience = any(word in lower_resume for word in ["experience", "worked", "job", "position", "role", "employment"])
    has_skills = any(word in lower_resume for word in ["skills", "programming", "technical", "software", "tools"])

    return {
        "success": True,
        "source": "mock_analysis",
        "analysis": {
            "overall_score": strength_score,
            "strengths": [
                "Well-structured content" if word_count > 200 else "Concise presentation",
                "Professional formatting" if has_experience else "Clear organization",
                "Relevant experience" if has_experience else "Educational background" if has_education else "Basic qualifications",
            ],
            "areas_for_improvement": [
                "Add more specific achievements" if word_count < 300 else "Include quantifiable results",
                "Expand technical skills section" if not has_skills else "Add more soft skills",
                "Include relevant certifications" if not has_education else "Highlight leadership experience",
            ],
            "skills_analysis": {
                "technical_skills": ["Basic technical skills detected"] if has_skills else ["Consider adding technical skills section"],
                "soft_skills": ["Communication", "Teamwork", "Problem-solving"],
                "missing_skills": ["Industry-specific certifications", "Advanced technical skills"],
            },
            "experience_assessment": {
                "level": "Entry-level" if word_count < 400 else "Mid-level" if word_count < 800 else "Senior-level",
                "relevance": "Good" if has_experience else "Needs improvement",
                "achievements": "Basic achievements mentioned" if word_count > 200 else "Consider adding specific achievements",
            },
            "recommendations": [
                "Add quantifiable achievements and metrics",
                "Include relevant keywords for ATS optimization",
                "Expand on leadership and project management experience",
                "Consider adding a professional summary section",
            ],
            "ats_score": min(95, max(60, strength_score * 8 + 20)),
            "word_count": word_count,
            "sections_found": {
                "education": has_education,
                "experience": has_experience,
                "skills": has_skills,
            },
        },
    }


