// src/components/Contact/StepServices.jsx
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { useTranslation } from "@/i18n/LanguageContext";
import { OPENING_HOURS } from "./config";

const StepServices = ({
  services,
  selectedService,
  setSelectedService,
  selectedTime,
  setSelectedTime,
  handleContinue,
  onBack,
}) => {
  const { t } = useTranslation();
  const now = new Date();

  // 🕒 Check if currently within active hours for given service
  const isWithinDoctorHours = (serviceId) => {
    const open = OPENING_HOURS[serviceId];
    const day = now.getDay();
    const hour = now.getHours();
    return open.days.includes(day) && hour >= open.start && hour < open.end;
  };

  // 🟡 Show notice when outside doctor hours
  const showOutsideHoursWarning =
    selectedService &&
    ["consultation", "home_visit"].includes(selectedService) &&
    !isWithinDoctorHours(selectedService);

  return (
    <motion.div
      key="services"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-medium text-slate-800">
          {t("contact.selectService") || "Select Service"}
        </h4>
        <button
          onClick={onBack}
          className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <ChevronLeft size={16} /> {t("contact.back") || "Back"}
        </button>
      </div>

      {/* Service list */}
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      ))}

      {/* 🟡 Outside hours warning */}
      {showOutsideHoursWarning && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-300 rounded-md p-3 text-amber-800 mt-2 text-sm">
          <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
          <span>
            Currently no doctor is available. You can still book an appointment
            in advance for the next available weekend slot.
          </span>
        </div>
      )}

      {/* 🚫 Removed old horizontal “Select Day & Time” section */}

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={!selectedService}
        className={`w-full py-3 mt-2 font-semibold rounded-lg ${
          selectedService
            ? "bg-slate-800 text-white hover:bg-slate-700"
            : "bg-slate-200 text-slate-400 cursor-not-allowed"
        }`}
      >
        {t("contact.continue") || "Continue"}
      </button>
    </motion.div>
  );
};

export default StepServices;
