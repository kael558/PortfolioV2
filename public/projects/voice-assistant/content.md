# Personal AI Assistant: Call, Text, and Get Things Done

## The Idea

What if you could get help from an AI assistant the same way you'd text a friend? No app to open. No wake word. Just call a number or send a text. Ask a question. Get an answer. Or ask it to do something—book a ride, check the bus, find a restaurant nearby—and it happens.

That's the Personal AI Assistant. It lives on a Raspberry Pi. It's always on. And you reach it through the most universal interfaces we have: phone and SMS.

## The Original Vision

The project started in July 2024 with two core needs:

1. **Quick Information Access**: The ability to get answers by calling or texting. "What's the weather?" "Who won the game?" "What's 15% of 80?" No need to open a browser or an app.

2. **Smart Home Control**: Manage smart home devices via voice. "Turn off the lights." "Set the thermostat to 72." The assistant would bridge natural language to your home automation setup.

Both worked. But the real magic came when we added **real-world actions**—things that go beyond information retrieval and into the physical world.

## The Evolution: Real-World Actions

### Call Ubers

Text: "I need a ride to the airport in an hour."

The assistant parses your intent, extracts location and time, and triggers the Uber API. You get a confirmation. No opening the Uber app. No typing addresses. Just text and go.

The integration required:
- **Uber API** for ride requests
- **Location handling** (your current location vs. destination)
- **Natural language parsing** for time, destination, ride type

### Check Bus Routes

Text: "When's the next bus to downtown?"

The assistant queries your local transit API (e.g., OC Transpo for Ottawa), gets real-time schedules, and replies with the next few departures. "Bus 95 in 7 minutes, Bus 97 in 12 minutes."

For cities with open transit APIs, this is a game-changer. No more opening a transit app or guessing at the schedule.

### Search Nearby with Images

Text: "What coffee shops are near me?"

The assistant uses your location (from the phone or a previous message), searches for nearby places, and can return results **with images**. So you don't just get names and addresses—you get a visual preview. "Here are 3 options: [image] [image] [image]."

The image support was a deliberate choice. Text-only results are fine for some queries. But "what does this place look like?" is answered better with a photo. We integrated with place APIs that return images (Google Places, etc.) and formatted the response for MMS when the carrier supports it.

## Technical Architecture

### Core Stack

- **Python**: The main language. Fast to iterate, good library support.
- **Twilio**: Handles phone calls and SMS. Incoming/outgoing, both supported.
- **Pipecat.ai**: Framework for orchestrating AI services—STT, LLM, TTS—in a pipeline.
- **Deepgram**: Speech-to-text. Fast, accurate, good for real-time.
- **Groq**: LLM for understanding and generation. Low latency.
- **Microsoft Cognitive Services**: Text-to-speech for the voice interface.
- **Bing Search API**: Web search for general queries.

### The Flow

1. **Incoming**: Call or text hits Twilio → routed to our server
2. **Input processing**: If voice, Deepgram transcribes. If text, use as-is.
3. **Intent + action**: Groq parses the request. Is it a question? A command? A ride request? The right handler is invoked.
4. **Execution**: Handler calls Uber API, transit API, search API, or smart home backend.
5. **Response**: LLM formats the reply. If voice, TTS. If SMS, text (and images if applicable). Twilio sends it back.

### Hosting: Raspberry Pi

The whole thing runs on a Raspberry Pi. Low power. Always on. Sits in your home, connected to your network. Cost-effective and compact. No cloud bill for the core server—just the API costs (Twilio, Groq, etc.).

## Challenges

- **Carrier limitations**: MMS (image messaging) isn't universal. Some carriers, some plans, some regions—images might not go through. We had fallbacks: text-only when images fail.
- **Location**: Getting the user's location via SMS is tricky. We used opt-in location sharing (user texts "use my location" or shares it once) and cached it for the session.
- **Rate limits**: Uber, transit APIs, place APIs—all have limits. We had to cache aggressively and handle throttling gracefully.
- **Voice vs. text**: Voice adds latency (STT + TTS). For quick actions, text was often faster. We optimized both paths.

## What I Use It For

- **Quick facts**: "What's the capital of Mongolia?" → "Ulaanbaatar."
- **Rides**: "Get me an Uber to 123 Main St" → Confirmation and ETA.
- **Transit**: "Next bus to work?" → Schedule.
- **Discovery**: "Good ramen near me?" → List with images.
- **Smart home**: "Lights off" → Done.

It's become a utility. Not a demo. Something I actually use.

## Timeline

<Timeline>
- 2024-07-15: Exploratory phase, research on technologies
- 2024-07-22: Development of base voice assistant
- 2024-07-30: Integration with extra functionality (search, Q&A)
- 2024-08-10 to 2024-08-25: Setting up Raspberry Pi server
- 2024-08-25 to 2024-08-30: Testing and debugging
- 2024-09-31: Launched (voice + search + smart home)
- 2024-10: Added Uber integration
- 2024-11: Added transit (bus) route checking
- 2024-12: Added nearby search with image support
</Timeline>

## Takeaways

The best interfaces are the ones you already use. Everyone has a phone. Everyone can text. Building an assistant that lives at a phone number—no app install, no new habit—meant it could actually fit into daily life. Adding real-world actions (Uber, transit, nearby search with images) turned it from a curiosity into something useful. The Raspberry Pi keeps it cheap and local. The rest is just APIs and glue.
