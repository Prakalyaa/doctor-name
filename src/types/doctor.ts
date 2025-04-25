
export interface Doctor {
  name: string;
  specialities: Array<{ name: string }>;
  doctor_introduction?: string;
  fees: string;
  experience: string;
  languages: string[];
  clinic: {
    name: string;
    address: {
      locality: string;
      city: string;
    }
  };
  photo?: string;
  video_consult: boolean;
  in_clinic: boolean;
}
