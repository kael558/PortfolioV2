# Web Indexer

##  Background

Large language models (LLM) are advanced AI models made for processing text. They can comprehend the meaning behind text and generate output that resembles human text.

Text embeddings are numerical representations of the semantic content of text. For example, the text "I was walking my dog" can be represented as [0.3, ... , 0.5]. These vectors usually have dimensions ranging from 1000 to 4000.

[AI21 Labs](https://www.ai21.com/) is an organization offering LLMs as a service. They provide endpoints to embed, classify and generate text.

Web crawling is a process where a computer program automatically visits and collects data from multiple web pages on the internet.

##  Problem Statement

This project won first prize in an [AI21 Labs hackathon](https://lablab.ai/event/ai21-labs-hackathon) hosted by [LabLabAI](https://lablab.ai/), out of over 1900 participants.

The search bar found on most websites typically only performs keyword searches, which can be a slow and tedious process for users as they must sift through a large amount of information before finding the specific piece of information they were looking for.

My goal was to create a question answering tool that can be easily integrated into any website. It allows you to find specific information, provides answers in a clear, understandable way and includes sources and more information should the user need it.

##  Implementation

![Implementation](projects/web-indexer/diagram.jpg)

The blue represents the steps taken to index a website. The domain and URL for the target website are inputted and the web crawler collects all the text. This text is then indexed into the vector database via AI21's embed API.

The red shows the process for question answering, which involves retrieving relevant context from the vector database for the given question. The question and context are sent to AI21 Labs' generation API, and the final response is returned to the front-end.

##  Links

- [Video](https://lablab.ai/event/ai21-labs-hackathon/olympia/webindexer)
- [Demo](https://kael558-webindexer-app-do3nd1.streamlit.app/)
- [Repository](https://github.com/kael558/WebIndexer)
