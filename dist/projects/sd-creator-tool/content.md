# Stable Diffusion Video Creator Tool

##  Collaborators

- [Farid Hassainia](https://www.linkedin.com/in/farid-hassainia-ca/)

##  Background

Stable Diffusion is a text-to-image deep learning model. Its main purpose is to produce intricate images based on text descriptions. Additionally, it can be utilized for other tasks such as inpainting, outpainting, and transforming images with text guidance.

Google Colab is a free, cloud-based tool for writing and executing Python code with access to popular libraries. It provides access to a GPU, which is essential for Stable Diffusion.

[Gradio](https://gradio.app/) is a user-friendly, open-source tool that makes it easy to build and share interactive machine learning models. In simple terms, it allows you to turn a machine learning model into a web application with a few lines of code.

[HuggingFace Spaces](http://huggingface.co/) is a cloud platform for development and deployment of many types of deep learning models. It is useful for hosting models with access to API.

##  Problem Statement

This project won first prize in an [Stable Diffusion hackathon](https://lablab.ai/event/stable-diffusion-hackathon) hosted by [LabLabAI](https://lablab.ai/), out of over 700 participants.

Stable Diffusion is a technique for creating new images using prompts or initial images. While it is possible to use Stable Diffusion for video creation, existing methods are difficult to use and lack key features.

There is no tool that addresses the issue of limited options in video creation by allowing the selection of specific images for interpolation using Stable Diffusion. Other methods require rendering an entire video even if only certain images are desired, leading to a waste of time and resources. Our tool only generates, and re-renders changed frames, saving time, and making the process more efficient. This can be visually seen in the user interface.

The existing tools are complex to navigate and there is a need for a user-friendly interface for creating videos and timelines.

Finally, the tool needs to be able to connect to various models via API for different use cases. This allows for the flexibility to use different models and adapt to different projects.

Our goal was to create a tool to simplify and optimize the Stable Diffusion process, making it accessible to any user regardless of their experience level. It should be able to generate images based on styles, organize them frame-by-frame, and create videos by interpolating between keyframe images selected by the user.

##  Implementation

![Implementation](implementation.png)

The back-end was developed on Google Colab, integrated with Gradio and hosted on HuggingFace Spaces accessible by API endpoints.

The front-end, created using Flask and D3, queries this API whenever a user requests it.

The API has two endpoints, one for generating an image and a conditioning tensor from a prompt, and another for receiving the conditioning tensors of both images to be interpolated and returning a list of interpolated images.
We then used FFMPEG to generate the video from the frames.

![Implementation](menu.png)

The user may select what model to use in the basic options.

![Implementation](interface.png)

The user may input prompts and generate images to be placed on the timeline as key frames. The user may generate the in-between frames by clicking the “Interpolate” button. They may convert the frames into a video by clicking the “Create Video” button which they may download.

If any of the key frames are changed after rendering, then only the changed frames will be re-generated. The status of each frame is represented by the hue on the timeline. Grey represents no frame and green represents a generated frame.

##  Links

- [Video](https://lablab.ai/event/stable-diffusion-hackathon/Fast%2520Path/Stable%2520Diffusion%2520Creator%2520Tool)
- [Demo](https://kael558.github.io/supreme-octo-tribble/)
- [Repository](https://github.com/kael558/supreme-octo-tribble)
