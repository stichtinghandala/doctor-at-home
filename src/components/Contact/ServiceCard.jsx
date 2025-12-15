import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { OPENING_HOURS } from "./config";
import { AlertTriangle } from "lucide-react";
import TimePicker from "./TimePicker";

const ServiceCard = ({
  service,
  selectedService,
  setSelectedService,
  selectedTime,
  setSelectedTime,
}) => {
  const { t } = useTranslation();

  // Prevent rendering objects instead of strings (fixes "Objects are not valid as React child")
  const safeText = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return "";
  };

  const now = new Date();
  const open = OPENING_HOURS[service.id];
  const day = now.getDay();
  const hour = now.getHours();

  // Check if within active service hours
  const isWithinHours =
    open && Array.isArray(open.days)
      ? open.days.includes(day) && hour >= open.start && hour < open.end
      : true;

  // Logic for available/unavailable services
  const isClosed = service.id === "priority" && !isWithinHours;
  const showOutsideHours =
    (service.id === "consultation" || service.id === "home_visit") &&
    !isWithinHours;

  const isSelected = selectedService === service.id;

  return (
    <motion.div
      layout
      onClick={() => !isClosed && setSelectedService(service.id)}
      className={`relative p-4 border rounded-lg bg-white transition-all cursor-pointer ${
        isSelected
          ? "border-slate-800 ring-1 ring-slate-800"
          : "border-slate-200 hover:border-slate-300"
      } ${isClosed ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-3">
          <div className={`${service.bgColor} p-2 rounded-md shrink-0`}>
            <service.icon size={18} className={service.color} />
          </div>

          <div>
            <h4 className="font-semibold text-sm text-slate-800">
              {safeText(service.title)}
            </h4>
            <p className="text-xs text-slate-500">
              {safeText(service.description)}
            </p>

            {/* 🟡 Booking note for outside hours */}
            {showOutsideHours && (
              <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                <AlertTriangle size={12} />
                {safeText(
                  t("contact.serviceTypes.outsideHours") ||
                    "Currently no doctor available — you can still book an appointment in advance."
                )}
              </p>
            )}

            {/* 🔴 Closed for Priority Consultations */}
            {isClosed && (
              <p className="text-xs text-rose-600 mt-1">
                {safeText(
                  t("contact.serviceTypes.closed") || "Currently closed"
                )}
              </p>
            )}
          </div>
        </div>

        <span className="text-xs font-bold bg-slate-50 text-slate-600 px-2 py-1 rounded-full whitespace-nowrap">
          {safeText(service.price)}
        </span>
      </div>

      {/* ✅ Only new iPhone-style TimePicker remains */}
      {(service.id === "consultation" || service.id === "home_visit") &&
        isSelected && (
          <TimePicker
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        )}

      {/* Optional extra information */}
      {isSelected && service.extra && (
        <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded border border-slate-100">
          {safeText(service.extra)}
        </p>
      )}
    </motion.div>
  );
};

export default ServiceCard;
