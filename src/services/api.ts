
import { Doctor } from "@/types/doctor";

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }
    
    const data = await response.json();
    
    // Return the data as is since it already matches our Doctor type
    return data as Doctor[];
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};
