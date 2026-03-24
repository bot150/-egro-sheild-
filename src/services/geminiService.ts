import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface AadharData {
  aadharNumber: string;
  dob: string; // YYYY-MM-DD
  fullName: string;
}

export interface BankData {
  ifscCode: string;
  accountNumber: string;
}

export const extractAadharData = async (base64Image: string, mimeType: string): Promise<AadharData> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: mimeType,
            },
          },
          {
            text: "Extract the Aadhar Number (12 digits), Full Name, and Date of Birth (DOB) from this Aadhar card. Return as JSON.",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          aadharNumber: { type: Type.STRING },
          dob: { type: Type.STRING, description: "Format: YYYY-MM-DD" },
          fullName: { type: Type.STRING },
        },
        required: ["aadharNumber", "dob", "fullName"],
      },
    },
  });

  return JSON.parse(response.text);
};

export const extractBankData = async (base64Image: string, mimeType: string): Promise<BankData> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: mimeType,
            },
          },
          {
            text: "Extract the IFSC Code and Bank Account Number from this bank passbook. Return as JSON.",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          ifscCode: { type: Type.STRING },
          accountNumber: { type: Type.STRING },
        },
        required: ["ifscCode", "accountNumber"],
      },
    },
  });

  return JSON.parse(response.text);
};
