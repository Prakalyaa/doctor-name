
export interface Doctor {
  name: string;
  specialty: string[];
  qualification: string;
  experience: string;
  clinic: string;
  location: string;
  fee: number;
  consultationType: "Video Consult" | "In Clinic";
}
