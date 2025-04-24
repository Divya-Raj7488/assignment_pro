from django.shortcuts import render
from django.http import HttpResponse
from google import genai
import os
from dotenv import load_dotenv
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=gemini_api_key)


def home(request):
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="Explain how AI works in a few words"
    )
    print("openai hellllooooo", response.text)
    return render(request, "input_form.html")


@api_view(["POST"])
def suggestions(request):
    if request.method == "POST":
        input_text = request.data.get("message")

        if input_text:
            try:
                response = client.models.generate_content(
                    model="gemini-2.0-flash",
                    contents=f"""Give me the tone and intent of the message {input_text} along with 5 suggested actions for the text.Return the output in JSON format with three keys: tone, intent, and actions.Each key should have a list of values.""",
                )
                candidates = response.candidates
                if not candidates:
                    return Response(
                        {
                            "status": "error",
                            "message": "No candidates found in the response",
                        },
                        status=500,
                    )
                json_string = response.text.strip("```json\n")
                parsed_response = json.loads(json_string)
                tone = parsed_response["tone"]
                intent = parsed_response["intent"]
                actions = parsed_response["actions"]
                response_data = {
                    "query": f"""Give me the tone and intent of the message {input_text} along with 5 suggested actions for the text.Return the output in JSON format with three keys: tone, intent, and actions.Each key should have a list of values.""",
                    "analysis": {"tone": tone, "intent": intent},
                    "suggested_actions": actions,
                }
                print(response_data)
                return Response(response_data)

            except Exception as e:
                return Response(
                    {
                        "status": "error",
                        "message": f"Error processing the request: {str(e)}",
                    },
                    status=500,
                )

        else:
            return Response(
                {"status": "error", "message": "No message provided"}, status=400
            )

    return Response(
        {"status": "error", "message": "Invalid request method"}, status=405
    )
