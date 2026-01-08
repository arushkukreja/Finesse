
import { GoogleGenAI, Type } from "@google/genai";
import { PlaidTransaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Use PlaidTransaction interface from types.ts as Transaction is not defined
export const analyzeTransactionRisk = async (transaction: PlaidTransaction) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Analyze this business transaction for potential fraud or middle-market risk:
        Merchant: ${transaction.merchant_name}
        Amount: $${transaction.transaction_amount}
        Time: ${transaction.transaction_date}
        Account: ${transaction.account_name}
        Category: ${transaction.category_primary}

        Identify risks like: 
        1. Invoice Fraud (unusual amount/merchant)
        2. Velocity issues
        3. Test charges
        4. Suspicious timing
        5. Subscription price hikes
        
        Provide a concise, high-signal explanation of why this might be a risk or why it is safe.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, description: "LOW, MEDIUM, HIGH, CRITICAL" },
            reasoning: { type: Type.STRING },
            suggestedAction: { type: Type.STRING }
          },
          required: ["riskLevel", "reasoning", "suggestedAction"]
        }
      }
    });

    // Use .text property directly as per @google/genai documentation
    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Gemini analysis failed", error);
    return null;
  }
};
