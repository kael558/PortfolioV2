# HackerHouse Discord Bot: A Doorbell, a Music Queue, and Steve Martin on a Raspberry Pi

## The Setup

In January 2026, I was living at a Hacker House—a shared space for builders and founders. We had a Discord server for the house. We had a physical doorbell. And we had a problem: when someone rang the doorbell, only the people near the front door could hear it. If you were in your room with headphones on, you'd miss visitors entirely.

The obvious fix? Connect the doorbell to Discord. When someone rings, play a sound in the server so everyone hears it. Simple idea. The execution got interesting.

## The Steve Martin Twist

We could have used a boring doorbell chime. Instead, we used a clip of Steve Martin—*"Could somebody let me in? Please?"*—from *The Jerk*. It fit the vibe. It was memorable. And it made people actually want to answer the door.

So the bot's job: when the doorbell triggers, play that clip in the Discord voice channel. Everyone in the house, whether they're in the channel or not, gets a notification. Problem solved.

Except we also had a music queue.

## The Ducking Problem

The Discord bot wasn't just a doorbell. We used it for shared music—someone would queue up a playlist, and we'd listen together while working. That meant the bot was often playing music. When the doorbell rang, we needed the Steve Martin clip to play *over* the music—and be audible.

That's where **audio ducking** came in. Ducking means temporarily lowering the volume of one audio source when another plays. So when Steve Martin asks to be let in, the music dips. You hear him clearly. Then the music comes back up.

Implementing ducking in a Discord audio bot is non-trivial. Discord's audio pipeline doesn't natively support it. You have to mix the streams yourself—lower the music gain when the doorbell audio is active, then restore it. I had to dig into the discord-audio library and the underlying audio stack to get it right.

## Tech Stack & Architecture

- **Python** for the bot logic
- **discord-audio** (Discord.py audio extensions) for voice channel integration
- **Raspberry Pi** as the host—low power, always on, sitting in the house
- **GPIO or HTTP trigger** from the physical doorbell to the Pi (exact setup depended on the doorbell hardware)

The Pi ran 24/7. It joined the Discord voice channel on startup. It listened for doorbell events (via a local HTTP endpoint or GPIO, depending on how we wired it). When triggered, it would:
1. Duck the current music (if any)
2. Play the Steve Martin clip
3. Unduck the music

The music queue was a separate feature—standard queue logic (add, skip, clear) with the ducking layer on top.

## Challenges

- **Latency**: The doorbell-to-Discord delay had to feel instant. Any lag made it feel broken. Optimizing the trigger path and audio buffering took some iteration.
- **Raspberry Pi audio**: Pis aren't built for real-time audio. Getting clean playback without glitches required tuning buffer sizes and process priorities.
- **Discord API quirks**: The bot had to stay connected through network hiccups and Discord reconnects. Robust reconnection logic was essential.

## What I Learned

- **Hardware + software is fun**: Bridging the physical doorbell to a digital notification system felt like a small IoT project. Satisfying to see it work end-to-end.
- **Audio is hard**: Ducking, mixing, latency—audio programming has a lot of edge cases. Worth the effort for a polished experience.
- **Community tools matter**: The [HackerHouseDBot repo](https://github.com/kael558/HackerHouseDBot) is open source. Others can fork it for their own houses or events.

## Timeline

<Timeline>
- 2026-01-01: Moved into Hacker House; identified doorbell problem
- 2026-01-05: Basic Discord bot + doorbell trigger working
- 2026-01-08: Added music queue feature
- 2026-01-12: Implemented audio ducking for doorbell overlay
- 2026-01-15: Deployed to Raspberry Pi; 24/7 operation
</Timeline>

## Links

- [GitHub Repository](https://github.com/kael558/HackerHouseDBot)
- [Deployment Guide](https://github.com/kael558/HackerHouseDBot/blob/main/DEPLOYMENT_GUIDE.md) (in repo)

## Takeaways

Sometimes the best projects are the ones that solve a tiny, specific problem for a small group of people. A doorbell that plays Steve Martin in Discord might seem silly—but it made the house feel more connected. And building it taught me more about real-time audio than I expected.
