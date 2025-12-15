
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { X, Phone, Calendar, AlertCircle, Home } from "lucide-react";

import StepConsents from "./StepConsents";
import StepServices from "./StepServices";
import StepForm from "./StepForm";
import StepTriageChoice from "./StepTriageChoice";

import StepCallbackChoice from "./StepCallbackChoice"; // 🆕 add this line
import StepCallbackConfirm from "./StepCallbackConfirm";


import { isServiceOpen } from "./utils";
import { useTranslation } from "@/i18n/LanguageContext";

const Contact = ({ isOpen, onOpen, onClose }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [consents, setConsents] = useState({
    noMedicalInfo: false,
    notEmergency: false,
    consentContact: false,
  });

  // Re-define services inside component to access 't'
  const services = [
    {
      id: "triage",
      title: t('contact.serviceTypes.triage.title'),
      price: "Free",
      description: t('contact.serviceTypes.triage.desc'),
      extra: t('contact.serviceTypes.triage.extra'),
      icon: Phone,
      color: "text-slate-600",
      bgColor: "bg-slate-100",
    },
    {
      id: "consultation",
      title: t('contact.serviceTypes.consultation.title'),
      price: "€45",
      description: t('contact.serviceTypes.consultation.desc'),
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hasTimeSlot: true,
    },
    {
      id: "priority",
      title: t('contact.serviceTypes.priority.title'),
      price: "€80",
      description: t('contact.serviceTypes.priority.desc'),
      extra: t('contact.serviceTypes.priority.extra'),
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      id: "home_visit",
      title: t('contact.serviceTypes.home_visit.title'),
      price: "€250",
      description: t('contact.serviceTypes.home_visit.desc'),
      extra: t('contact.serviceTypes.home_visit.extra'),
      icon: Home,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setSelectedService(null);
        setSelectedTime(null);
        setConsents({ noMedicalInfo: false, notEmergency: false, consentContact: false });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const allConsentsGiven = Object.values(consents).every(Boolean);
  const handleConsentChange = (key) =>
    setConsents((prev) => ({ ...prev, [key]: !prev[key] }));
  const handleContinue = () => {
    if (step === 1 && allConsentsGiven) setStep(2);
    else if (step === 2 && selectedService) setStep(3);
  };
  const handleBack = () => setStep((prev) => Math.max(1, prev - 1));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById("my-form-status");
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = t('contact.sending');
    const data = new FormData(form);
    data.append("scheduled_time", selectedTime || "auto-assigned");

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        status.innerHTML = t('contact.success');
        status.className =
          "text-green-600 mt-4 text-center font-medium p-4 bg-green-50 rounded-md border border-green-100 text-sm";
        toast({ title: t('contact.success'), description: t('contact.successDesc') });
      } else throw new Error();
    } catch {
      status.innerHTML = t('contact.error');
      status.className =
        "text-red-600 mt-4 text-center font-medium p-4 bg-red-50 rounded-md border border-red-100 text-sm";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = originalText;
    }
  };

  const getButtonText = () => {
    if(!selectedService) return t('contact.buttons.default');
    return t(`contact.buttons.${selectedService}`) || t('contact.buttons.default');
  };

  return (
    <section id="contact" className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-2xl font-serif text-slate-800 mb-4">
          {t('contact.title')}
        </h2>
        <p className="text-slate-500 mb-8">
          {t('contact.subtitle')}
        </p>
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-slate-800 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:bg-slate-700"
        >
          {t('intro.requestBtn')}
        </motion.button>
      </div>

    <AnimatePresence>
    {isOpen && (
      <>
        {/* Dimmed background overlay */}
        <motion.div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal container */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-100 shrink-0 bg-white">
              <h3 className="font-serif text-lg text-slate-800">
                {t('contact.modalTitle')}
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal body */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              <AnimatePresence mode="wait">

                {/* STEP 1 — CONSENTS */}
                {step === 1 && (
                  <StepConsents
                    consents={consents}
                    handleConsentChange={handleConsentChange}
                    allConsentsGiven={allConsentsGiven}
                    handleContinue={handleContinue}
                  />
                )}

                {/* STEP 2 — SERVICE SELECTION */}
                {step === 2 && (
                  <StepServices
                    services={services}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    handleContinue={() => {
                      // 🧠 Detect if service is "Free Triage" and branch to step 2.5
                      if (selectedService === "triage") {
                        setStep(2.5);
                      } else {
                        setStep(3);
                      }
                    }}
                    onBack={handleBack}
                  />
                )}

                {/* STEP 2.5 — TRIAGE: Speak or Type */}
                {step === 2.5 && (
                  <StepTriageChoice
                    onSelectOption={(option) => {
                      if (option === "form") setStep(3);
                      if (option === "speak") {
  setSelectedService("triage-callback");
  setStep(3); // show form
}

                    }}
                    onBack={() => setStep(2)}
                  />
                )}

                {/* STEP 3 — FORM (Encrypted Secure Form) */}
                {step === 3 && (
                  <StepForm
                    selectedService={selectedService}
                    selectedTime={selectedTime}
                    allConsentsGiven={allConsentsGiven}
                    handleFormSubmit={handleFormSubmit}
                    getButtonText={getButtonText}
                    onBack={handleBack}
                  />
                )}

                {/* STEP 4 — Callback Confirmation (for "Speak" option) */}
                {step === "callback-confirmation" && (
                  <StepCallbackConfirm onClose={onClose} />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
</section>
);
};

export default Contact;
