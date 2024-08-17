# Automating Annotations with a Zero-Shot Model

##  Background

Zero-shot models are machine learning models that can classify new objects or concepts that it has never seen before, based on prior knowledge of other objects or concepts.

[Label Studio](https://labelstud.io/) is a popular data annotation tool for labeling and exploring data.

[ZenML](https://zenml.io/) is a MLOps tool to automate the process of building, testing, and deploying models. It separates the technical stack and the pipelines to reduce the complexity of managing the dependencies between them. The stack refers to the integrations of various technologies to support the ML lifecycle. The pipeline refers to a set of steps or stages that are executed in a defined order to build, test, and deploy machine learning models.

##  Problem Statement

Annotating images can be a difficult and time-consuming task as it requires manual labor to accurately label and classify objects within the image. Many data annotation pipelines incorporate the model with predicted annotations to accelerate the data annotation process. Setting up this process is difficult to do and requires understanding of code and machine learning. However, there are cases where the data annotation process is beneficial as a separate step from model training.

This workflow can be applied if there is a pre-trained "supervised" model that fits your categories but needs fine-tuning for your own use case. This is because zero-shot models may mistake if:

- The quality of image is not good.
- The object is too small.
- The objects are overlapping.

My goal for this project is to develop a tool to partially automate the data annotation process by allowing users to retrieve images, annotate them according to specified labels and verify the annotations.

##  Implementation

![Implementation](images/anno_zenml/stack.jpg)

I created the stack with Amazon S3 as storage and Label Studio as the annotator. Access to the integrations is managed by a secrets manager with Amazon. The output from each step of the pipeline will be saved in an S3 bucket.

![Implementation](images/anno_zenml/pipeline.jpg)

The pipeline is created to handle the dataset, to load the images, predict the annotations and finally save everything to the cloud. For more details on each step, the notebook is available with documentation.

![Implementation](images/anno_zenml/interface.jpg)

These are the predicted annotations in Label Studio after running the pipeline with a caption of “fruit baskets” and labels of “pineapple, banana and apple”. Label Studio allows verification of the labels and addition of new labels.

##  Links

- [Notebook](https://colab.research.google.com/drive/1bs9vufHWOIy84wIpP_155jUk61S6TvD4#scrollTo=U5a7CJMDxfN1)
