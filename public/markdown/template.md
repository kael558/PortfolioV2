# Research Paper Semantic Search and Clustering

##  Collaborators

- [Sacha Gunaratne](https://www.linkedin.com/in/sachagunaratne/)

##  Problem Statement

This project was created for a AI Transformers hackathon hosted by LabLabAI.

Researchers generally find new papers by looking at the related research sections and references. The problem is that this could easily lead to getting stuck in a local cluster of research. Also in the case where a researcher might be trying to solve a difficult problem with novel research it might be hard to find applicable concepts.

Our goal was to help researchers and students find relevant research using a semantic search and clustering approach. This could potentially help with finding research concepts that are used in other fields.

##  Implementation

We collected around 500 abstracts from various subjects on Arxiv and used Cohere's transformer to convert the summary of each paper into a n-dimensional vector.

![Implementation](images/rp_ss/semantic_search.png)

We then reduced these vectors to 2D using UMAP and plotted them.

We performed hierarchical clustering on the plotted points and analyzed the frequency of words within each cluster to identify the concepts present.

##  Skills

Python, Cohere’s Transformers, Hierarchical Clustering, Streamlit, Annoy

##  Links

- [Demo](https://kael558-redesigned-spoon-ui-em33xz.streamlit.app/)
- [Repository](https://github.com/kael558/redesigned-spoon)
