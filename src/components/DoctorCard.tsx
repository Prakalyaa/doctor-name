
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card data-testid="doctor-card" className="p-4 mb-4">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <h3 data-testid="doctor-name" className="text-lg font-semibold text-blue-600">
            {doctor.name}
          </h3>
          <p data-testid="doctor-specialty" className="text-gray-600">
            {doctor.specialty.join(", ")}
          </p>
          <p className="text-sm text-gray-500">{doctor.qualification}</p>
          <p data-testid="doctor-experience" className="text-sm text-gray-500">
            {doctor.experience} experience
          </p>
          <div className="mt-2">
            <p className="text-sm">{doctor.clinic}</p>
            <p className="text-sm text-gray-500">{doctor.location}</p>
          </div>
        </div>
        <div className="text-right">
          <p data-testid="doctor-fee" className="font-semibold">₹{doctor.fee}</p>
          <Button className="mt-2">Book Appointment</Button>
        </div>
      </div>
    </Card>
  );
};
