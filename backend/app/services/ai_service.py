from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def classify_incident(log):

    prompt = f"""
    Analyze the following system log and return:

    - Severity (Low, Medium, High)
    - Category (System, Security, Network, Database)
    - Short Summary

    Log: {log}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content