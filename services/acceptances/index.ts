import { API_CONFIG } from "../config";
import { mockAcceptances } from "../mocks/acceptances.mock";
import { Acceptance } from "./types";

export const acceptanceService = {
  /**
   * ১. নতুন একসেপ্টেন্স তৈরি করা (P-001)
   * এখানে ৩০টি ফিল্ডের ডেটা প্রসেস হবে।
   */
  createAcceptance: async (data: Partial<Acceptance>) => {
    if (API_CONFIG.useMock) {
      console.log("Mock API: Saving Acceptance...", data);
      
      // নতুন একটি আইডি এবং একসেপ্টেন্স নাম্বার জেনারেট করা (সিমুলেশন)
      const newRecord = {
        ...data,
        id: `rec-${Math.random().toString(36).substr(2, 9)}`,
        acceptance_number: `${Math.floor(10000 + Math.random() * 90000)}-2026`,
      };

      return new Promise((resolve) => 
        setTimeout(() => resolve({ success: true, data: newRecord }), 1000)
      );
    }

    // Real Backend API Call
    const response = await fetch(`${API_CONFIG.baseUrl}/acceptances`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to create acceptance");
    return response.json();
  },

  /**
   * ২. সব একসেপ্টেন্সের লিস্ট নিয়ে আসা (P-003)
   */
  getAcceptances: async () => {
    if (API_CONFIG.useMock) {
      return new Promise((resolve) => 
        setTimeout(() => resolve(mockAcceptances), 800)
      );
    }

    const response = await fetch(`${API_CONFIG.baseUrl}/acceptances`);
    if (!response.ok) throw new Error("Failed to fetch acceptances");
    return response.json();
  },

  /**
   * ৩. নির্দিষ্ট একটি আইডি দিয়ে ডেটা খোঁজা (Edit/View করার জন্য)
   */
  getAcceptanceById: async (id: string) => {
    if (API_CONFIG.useMock) {
      const record = mockAcceptances.find((item) => item.id === id);
      return new Promise((resolve) => 
        setTimeout(() => resolve(record || null), 500)
      );
    }

    const response = await fetch(`${API_CONFIG.baseUrl}/acceptances/${id}`);
    if (!response.ok) throw new Error("Failed to fetch acceptance details");
    return response.json();
  }
};