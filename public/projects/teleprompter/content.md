# Teleprompter: Growing TikTok & Instagram to 1.5K Followers with Manim

## The Idea

Short-form video platforms reward consistency. Post daily, or at least several times a week. The catch? Creating that much video content is time-consuming. Talking-head videos require setup. Editing takes hours. I wanted a way to produce engaging, text-focused videos at scale—something that looked polished but didn't require a full production pipeline.

Enter **Manim**—the Mathematical Animation Engine from 3Blue1Brown. It's famous for math explainers, but it's really a general-purpose animation library. You write Python code; it renders beautiful, programmatic animations. What if I used it to generate teleprompt-style videos? Scrolling text, clean typography, no face required.

## What I Built

A tool that takes a script (or a list of quotes, tips, or facts) and outputs video files. Each "slide" or segment gets animated—text appears, scrolls, or transitions. The output is sized for TikTok and Instagram Reels: vertical, 9:16, under 60 seconds.

### Features

- **Script-to-video pipeline**: Paste text, get a video. No manual keyframing.
- **Manim-powered rendering**: High-quality vector graphics and smooth animations.
- **Template system**: Different styles—minimalist, bold, educational—selectable per run.
- **Batch processing**: Generate multiple videos from a list of scripts in one go.

### Why Manim?

- **Programmatic**: Animations are code. Easy to parameterize, version control, and automate.
- **Quality**: Renders to vector/SVG-like output. Looks sharp at any resolution.
- **Flexibility**: Not locked into a GUI. I could build custom layouts and transitions.

The downside: Manim has a learning curve. It's designed for math, so the default primitives (circles, graphs, equations) don't map directly to "scrolling text." I had to build abstractions on top—text scenes, transition effects, timing controls.

## The Content Strategy

I focused on **educational and motivational content**—tips, quotes, and short explainers. The format worked because:
- No need to show my face (lower barrier, faster production)
- Text-heavy content performs well when it's visually clean
- Manim's aesthetic—clean, modern, a bit "mathy"—stood out from typical phone-recorded TikToks

## Results

- **1,500 followers** on TikTok and Instagram combined
- **Hundreds of videos** produced over several months
- **~5–10 minutes per video** in production time (after the pipeline was built)

The growth wasn't viral—it was steady. Consistent posting + a distinctive visual style built an audience that liked the format.

## Technical Challenges

- **Render time**: Manim can be slow. A 30-second video might take 2–5 minutes to render. Batch processing and overnight runs became the norm.
- **Font and layout**: Getting text to look good at 9:16, with proper line breaks and pacing, required a lot of tuning.
- **Audio**: I experimented with adding background music or TTS. Manim doesn't handle audio natively—you have to composite it in post. I built a small FFmpeg wrapper to merge video + audio.

## What I'd Do Differently

- **Template library**: I'd create more preset styles and share them. Other creators could remix without touching Manim directly.
- **Cloud rendering**: Offload rendering to a server or Lambda. Local rendering blocked my machine.
- **Analytics loop**: Connect which styles/lengths/topics performed best back into the generation pipeline.

## Timeline

<Timeline>
- 2024-09: Discovered Manim; built first text-to-video prototype
- 2024-10: Refined templates; started posting to TikTok
- 2024-11: Added Instagram; hit 500 followers
- 2025-01: Batch processing pipeline; 1k followers
- 2025-03: 1.5k followers; project wrapped
</Timeline>

## Takeaways

Manim is a powerful tool for creators who think in code. It's not for everyone—but if you're comfortable with Python, it unlocks a kind of video production that's hard to replicate with traditional tools. The teleprompter project proved that programmatic video can scale, and that a niche aesthetic can still find an audience.
