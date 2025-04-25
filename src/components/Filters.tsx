
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface FiltersProps {
  specialties: string[];
  selectedSpecialties: string[];
  consultationType: string;
  sortBy: string;
  onSpecialtyChange: (specialty: string) => void;
  onConsultationTypeChange: (type: string) => void;
  onSortChange: (sort: string) => void;
}

export const Filters = ({
  specialties,
  selectedSpecialties,
  consultationType,
  sortBy,
  onSpecialtyChange,
  onConsultationTypeChange,
  onSortChange,
}: FiltersProps) => {
  return (
    <Card className="p-4 space-y-6">
      <div>
        <h3 data-testid="filter-header-sort" className="font-semibold mb-4">Sort by</h3>
        <RadioGroup value={sortBy} onValueChange={onSortChange}>
          <div className="space-y-2">
            <div className="flex items-center">
              <RadioGroupItem
                data-testid="sort-fees"
                value="fees"
                id="fees"
              />
              <Label htmlFor="fees" className="ml-2">Price: Low-High</Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem
                data-testid="sort-experience"
                value="experience"
                id="experience"
              />
              <Label htmlFor="experience" className="ml-2">Experience: Most Experience first</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 data-testid="filter-header-moc" className="font-semibold mb-4">Mode of consultation</h3>
        <RadioGroup value={consultationType} onValueChange={onConsultationTypeChange}>
          <div className="space-y-2">
            <div className="flex items-center">
              <RadioGroupItem
                data-testid="filter-video-consult"
                value="Video Consult"
                id="video"
              />
              <Label htmlFor="video" className="ml-2">Video Consultation</Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem
                data-testid="filter-in-clinic"
                value="In Clinic"
                id="clinic"
              />
              <Label htmlFor="clinic" className="ml-2">In-clinic Consultation</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 data-testid="filter-header-speciality" className="font-semibold mb-4">Specialties</h3>
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center">
              <Checkbox
                data-testid={`filter-specialty-${specialty.replace("/", "-")}`}
                id={specialty}
                checked={selectedSpecialties.includes(specialty)}
                onCheckedChange={() => onSpecialtyChange(specialty)}
              />
              <Label htmlFor={specialty} className="ml-2">{specialty}</Label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
