
import { Doctor } from "@/types/doctor";

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }
    
    const data = await response.json();
    
    // Sanitize the data to ensure no undefined values
    return data.map((doctor: any) => ({
      name: doctor.name || "",
      specialty: Array.isArray(doctor.specialty) ? doctor.specialty.filter(Boolean) : [],
      qualification: doctor.qualification || "",
      experience: doctor.experience || "0 years",
      clinic: doctor.clinic || "",
      location: doctor.location || "",
      fee: typeof doctor.fee === 'number' ? doctor.fee : 0,
      consultationType: doctor.consultationType || "In Clinic"
    }));
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};
