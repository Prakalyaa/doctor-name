
import { Doctor } from "@/types/doctor";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Building } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const {
    name,
    specialities,
    experience,
    clinic,
    fees,
    photo
  } = doctor;

  return (
    <div data-testid="doctor-card" className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={photo} alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h3 data-testid="doctor-name" className="text-lg font-semibold text-blue-600">
            {name}
          </h3>
          <p data-testid="doctor-specialty" className="text-gray-600">
            {specialities?.map(s => s.name).join(", ")}
          </p>
          <p data-testid="doctor-experience" className="text-sm text-gray-500 mt-1">
            {experience}
          </p>
          
          <div className="mt-3 space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building className="h-4 w-4" />
              <span>{clinic.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{clinic.address.locality}, {clinic.address.city}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p data-testid="doctor-fee" className="font-semibold">₹{fees.replace('₹', '').trim()}</p>
          <Button className="mt-3">Book Appointment</Button>
        </div>
      </div>
    </div>
  );
};
