
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { Filters } from "@/components/Filters";
import { DoctorCard } from "@/components/DoctorCard";
import { fetchDoctors } from "@/services/api";
import { Doctor } from "@/types/doctor";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const selectedSpecialties = searchParams.get("specialties")?.split(",").filter(Boolean) || [];
  const consultationType = searchParams.get("consultationType") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const loadDoctors = async () => {
      setIsLoading(true);
      try {
        const data = await fetchDoctors();
        setDoctors(data);
        
        // Extract unique specialties, ensuring no undefined values
        const allSpecialties = Array.from(
          new Set(data.flatMap(doctor => doctor.specialty || []).filter(Boolean))
        );
        setSpecialties(allSpecialties);
      } catch (error) {
        console.error("Error loading doctors:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDoctors();
  }, []);

  useEffect(() => {
    let filtered = [...doctors];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        (doctor.name || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply specialty filter
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(doctor =>
        (doctor.specialty || []).some(s => s && selectedSpecialties.includes(s))
      );
    }

    // Apply consultation type filter
    if (consultationType) {
      filtered = filtered.filter(
        doctor => doctor.consultationType === consultationType
      );
    }

    // Apply sorting
    if (sortBy === "fees") {
      filtered.sort((a, b) => (a.fee || 0) - (b.fee || 0));
    } else if (sortBy === "experience") {
      filtered.sort((a, b) => {
        const expA = parseInt(String(a.experience || "0").replace(/\D/g, "")) || 0;
        const expB = parseInt(String(b.experience || "0").replace(/\D/g, "")) || 0;
        return expB - expA;
      });
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchQuery, selectedSpecialties, consultationType, sortBy]);

  const handleSpecialtyChange = (specialty: string) => {
    const newSpecialties = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter(s => s !== specialty)
      : [...selectedSpecialties, specialty];
    
    setSearchParams(params => {
      if (newSpecialties.length > 0) {
        params.set("specialties", newSpecialties.join(","));
      } else {
        params.delete("specialties");
      }
      return params;
    });
  };

  const handleConsultationTypeChange = (type: string) => {
    setSearchParams(params => {
      if (type) {
        params.set("consultationType", type);
      } else {
        params.delete("consultationType");
      }
      return params;
    });
  };

  const handleSortChange = (sort: string) => {
    setSearchParams(params => {
      if (sort) {
        params.set("sortBy", sort);
      } else {
        params.delete("sortBy");
      }
      return params;
    });
  };

  const handleSearch = (query: string) => {
    setSearchParams(params => {
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      return params;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 py-4">
        <SearchBar doctors={doctors} onSearch={handleSearch} />
      </div>
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading doctors...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Filters
                specialties={specialties}
                selectedSpecialties={selectedSpecialties}
                consultationType={consultationType}
                sortBy={sortBy}
                onSpecialtyChange={handleSpecialtyChange}
                onConsultationTypeChange={handleConsultationTypeChange}
                onSortChange={handleSortChange}
              />
            </div>
            <div className="md:col-span-3">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor, index) => (
                  <DoctorCard key={index} doctor={doctor} />
                ))
              ) : (
                <div className="bg-white p-4 rounded shadow text-center">
                  <p className="text-gray-500">No doctors match your filters</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
