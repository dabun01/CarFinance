// src/hooks/useCarQuiz.js
import { useState } from 'react';
// For prototyping:
import { GoogleGenAI } from '@google/genai'; 

// 1. Initialize the client (Use a server for this in production!)
const ai = new GoogleGenAI({apiKey: import.meta.env.GEMINI_API_KEY});
const model = "gemini-2.5-flash";

// Helper function to format answers into a clear prompt
const formatAnswersForPrompt = (answers) => {
    // Convert the 'answers' object into a readable string for the model
    return `The user has answered the car finder quiz with the following preferences: 
            Budget: ${answers.budget}, 
            Lifestyle: ${answers.lifestyle}, 
            Environmental priority: ${answers.environment}, 
            Size needed: ${answers.size}.
            Based *only* on these preferences, recommend a specific car type (e.g., 'Luxury Sedan' or 'Crossover SUV') and write a 4-sentence justification.`;
};


export const useCarQuiz = () => {
    // ... existing state and logic ...
    const [isLoading, setIsLoading] = useState(false);
    const [aiRecommendation, setAiRecommendation] = useState(null);

    const handleNext = async () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        } else if (currentStep === totalSteps - 1) {
            setShowResults(true);
            
            // 2. Trigger AI Call when quiz is complete
            setIsLoading(true);
            try {
                const prompt = formatAnswersForPrompt(answers);
                
                const response = await ai.models.generateContent({
                    model,
                    contents: prompt
                });
                
                // Set the AI-generated text directly as the recommendation
                setAiRecommendation(response.text); 

            } catch (error) {
                console.error("Gemini API Error:", error);
                setAiRecommendation("Sorry, the recommendation service is currently unavailable.");
            } finally {
                setIsLoading(false);
            }
        }
    };
    
    // ... return the new state variables ...
    return {
        // ... existing returns ...
        isLoading,
        recommendation: aiRecommendation, // Use the AI-generated recommendation
    };
};

// In useCarQuiz.js, for the generateContent call
const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: "object",
            properties: {
                title: { type: "string", description: "A catchy title for the recommended car type." },
                car_type: { type: "string", description: "The specific category of car recommended (e.g., Compact EV, Full-Size Truck, Luxury Crossover)." },
                justification: { type: "string", description: "A 3-4 sentence explanation of why this car fits the user's answers." }
            },
            required: ["title", "car_type", "justification"]
        }
    }
});

// The response.text will now be a JSON string, which you can parse:
const resultObject = JSON.parse(response.text);
setAiRecommendation(resultObject);