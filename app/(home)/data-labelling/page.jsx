"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CrowdSource = () => {
  const tasks = [
    {
      title: "Image Tagging",
      description: "Label images with relevant tags (e.g., 'cat,' 'car,' 'tree').",
      icon: "🏷️",
      buttonText : "Comming Soon...",
    },
    {
      title: "Object Detection",
      description: "Draw bounding boxes around objects in images and label them (e.g., 'dog,' 'bicycle').",
      icon: "📦",
      buttonText : "Comming Soon...",
    },
    {
      title: "Text Classification",
      description: "Classify text snippets into predefined categories (e.g., 'positive,' 'negative,' 'neutral').",
      icon: "📝",
      buttonText : "Start Task",
    },
    {
      title: "Sentiment Analysis",
      description: "Determine the sentiment of a given text (e.g., 'happy,' 'sad,' 'angry').",
      icon: "😊",
      buttonText : "Comming Soon...",
    },
    {
      title: "Named Entity Recognition (NER)",
      description: "Identify and label entities in text (e.g., 'John' as a person, 'Paris' as a location).",
      icon: "👤",
      buttonText : "Comming Soon...",
    },
    {
      title: "Image Segmentation",
      description: "Segment an image by drawing boundaries around different regions and labeling them.",
      icon: "🖼️",
      buttonText : "Comming Soon...",
    },
  ];

  return (
    <div className="container mx-auto p-8 h-[90vh]">
      <h1 className="text-3xl font-bold mb-8 text-center uppercase">Choose an Annotation Task</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-2">{task.icon}</span>
                {task.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="mb-4 h-15 p-3 text-sm flex-grow">{task.description}</p>
              <Button className="w-full mt-4">{task.buttonText}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CrowdSource;
