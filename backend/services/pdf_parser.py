import io
from typing import Optional, Tuple
import PyPDF2


def extract_text_from_pdf(pdf_file_content: bytes) -> Optional[str]:
    try:
        pdf_io = io.BytesIO(pdf_file_content)
        pdf_reader = PyPDF2.PdfReader(pdf_io)

        text_content = ""
        for page in pdf_reader.pages:
            text_content += page.extract_text() + "\n"

        text_content = text_content.strip()
        return text_content or None
    except Exception as exc:  # pylint: disable=broad-except
        print(f"Error extracting text from PDF: {exc}")
        return None


def validate_pdf_file(file_content: bytes, filename: str) -> Tuple[bool, str]:
    if not filename.lower().endswith(".pdf"):
        return False, "File must be a PDF"

    max_size = 10 * 1024 * 1024  # 10MB
    if len(file_content) > max_size:
        return False, "File size must be less than 10MB"

    if len(file_content) == 0:
        return False, "File is empty"

    try:
        pdf_io = io.BytesIO(file_content)
        pdf_reader = PyPDF2.PdfReader(pdf_io)

        if len(pdf_reader.pages) == 0:
            return False, "PDF file has no pages"

        return True, ""
    except Exception as exc:  # pylint: disable=broad-except
        return False, f"Invalid PDF file: {exc}"


