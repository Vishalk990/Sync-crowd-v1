import React from "react";

import { AiOutlineRobot } from "react-icons/ai";
import { SiCrowdsource } from "react-icons/si";

import { SiDatabricks } from "react-icons/si";
import { MdOutlineLabelImportant } from "react-icons/md";
import { Brain, HandCoins } from "lucide-react";

const categories = [
  {
    name: "Synthetic Data Generation",
    icon: <SiDatabricks />,
    description: "Generate realistic datasets that mimic real-world scenarios.",
  },
  {
    name: "Rewards in Data Labeling",
    icon: <HandCoins size={36} strokeWidth={1.7} />,
    description: "Incentivize community-driven engagement in data labeling",
  },
  {
    name: "Crowdsourced Dataset Creation",
    icon: <SiCrowdsource />,
    description: "Collaboratively create large and varied datasets.",
  },
  {
    name: "Data Cleaning Tools",
    icon: <MdOutlineLabelImportant />   ,
    description: "Ensure data quality and consistency with our cleaning tools.",
  },
  {
    name: "Model Testing/Evaluation",
    icon: <AiOutlineRobot />,
    description: "Benchmark and fine-tune your machine learning models.",
  },
  {
    name: "Dataset Analysis",
    icon: <Brain size={36} strokeWidth={1.7} />, 
    description: "Talk to your dataset using or Chat with Data AI",
  }
];

const Services = () => {
  return (
    <div className="lg:py-16 ">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#41A4FF] text-lg font-semibold mb-2 block">
            Our Services
          </span>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            What We Provide
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          AI-powered data solutions: seamless data collection, intelligent synthetic data generation, and advanced model evaluation for superior machine learning outcomes.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group bg-white rounded-2xl p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:bg-blue-50">
              <div className="text-[#41A4FF] text-4xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {category.icon}
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-[#41A4FF] transition-colors duration-300">
                {category.name}
              </h4>
              <p className="text-gray-600 mb-4 transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 overflow-hidden">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;