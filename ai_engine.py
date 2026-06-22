from groq import Groq
from config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def categorize_prompt(prompt):

    prompt = prompt.lower()

    if any(word in prompt for word in
           ["python", "java", "javascript", "code",
            "programming", "bug", "error"]):
        return "Code Help"

    elif any(word in prompt for word in
             ["business", "startup", "company",
              "market", "entrepreneur"]):
        return "Business Idea"

    elif any(word in prompt for word in
             ["story", "fiction", "novel",
              "character", "adventure"]):
        return "Story Generator"

    elif any(word in prompt for word in
             ["grammar", "rewrite", "correct sentence"]):
        return "Grammar Check"

    elif any(word in prompt for word in
             ["summarize", "summary", "shorten"]):
        return "Summarization"

    return "General Query"


def generate_ai_response(prompt, category):

    system_prompts = {

        "Code Help": """
You are a senior Python instructor.

Always follow this response format:

# Concept

Brief explanation.

# Syntax

Show syntax if relevant.

# Example

Provide a simple example.

# Output

Show expected output.

# Key Points

- Point 1
- Point 2
- Point 3

# Conclusion

One-line summary.

Do not write everything in one paragraph.
Use headings, spacing and bullet points.
""",

        "Business Idea": """
        You are a startup consultant.

        Rules:
        - Give realistic ideas.
        - Mention target audience.
        - Mention revenue model.
        - Mention implementation steps.
        """,

        "Story Generator": """
        You are a professional storyteller.

        Rules:
        - Write in paragraph format.
        - Do not use bullet points unless requested.
        - Make stories engaging.
        """,

        "Grammar Check": """
        You are an English grammar expert.

        Rules:
        - Correct mistakes.
        - Explain corrections.
        - Improve readability.
        """,

        "Summarization": """
        You are an expert summarizer.

        Rules:
        - Keep important points.
        - Make summaries concise.
        """,

        "General Query": """
You are a professional AI assistant.

Always structure responses as:

# Overview

# Main Explanation

# Examples (if needed)

# Key Takeaways

# Conclusion

Avoid large unformatted paragraphs.
Use bullet points and headings.
"""
    }

    try:

        completion = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "system",
                    "content": system_prompts.get(
                        category,
                        system_prompts["General Query"]
                    )
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.7,
            max_tokens=1500
        )

        return completion.choices[0].message.content

    except Exception as e:

        return f"Groq Error: {str(e)}"