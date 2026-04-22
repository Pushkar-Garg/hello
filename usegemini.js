import { useEffect, useState } from 'react'
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyACm7A55OXLOnRkuUC0JrpXfrcwmr7t-38" });
const main12 = async()=> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Generate Travel Plan for Location : kurukshetra,haryana , for 3 Days for 3 to 5 peoples with a luxury budget. Give me a hotel options list with Hotel Name, Hotel Address, Price, Hotel image url, geo coordinates, rating, descriptions and suggest itinerary with Place Name, Place Details, Place Image Url, Geo Coordinates, Ticket Pricing, Rating ,Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
  });
  console.log(response.text);
}
