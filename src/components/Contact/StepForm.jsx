import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { encryptFormData } from "./encrypt";
import { CONFIG } from "./config";

const StepForm = ({
  selectedService,
  selectedTime,
  allConsentsGiven,
  getButtonText,
  onBack,
}) => {
  const { t } = useTranslation();
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================================
  // 🧩 Handles Secure Form Submission
  // ============================================================
  const handleSecureSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    const form = e.target;
    const formData = Object.fromEntries(new FormData(form));

    try {
      // Encrypt client-side
      const encrypted = encryptFormData(formData);

      // ✅ Check if encryption worked
      if (!encrypted) {
        throw new Error("Encryption failed — check RSA key or config.");
      }

      // Send encrypted payload to backend (local dev URL)
      const response = await fetch("http://localhost:3001/api/secure-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encrypted }),
      });

      const result = await response.json();

      if (result.ok) {
        setStatusMessage(
          t("contact.form.success") ||
            "✅ Thanks! Your secure request was sent successfully."
        );
        form.reset();
      } else {
        throw new Error("Server responded with an error");
      }
    } catch (err) {
      console.error("❌ Secure form submission failed:", err);
      setStatusMessage(
        t("contact.form.error") ||
          "⚠️ There was a problem sending your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // 🧩 Render Form
  // ============================================================
  return (
    <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium text-slate-800">
          {t("contact.yourDetails")}
        </h4>
        <button
          onClick={onBack}
          type="button"
          className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <ChevronLeft size={16} /> {t("contact.back")}
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSecureSubmit} className="space-y-4">
        {/* Hidden fields */}
        <input type="hidden" name="service_type" value={selectedService} />
        <input
          type="hidden"
          name="consents_given"
          value={allConsentsGiven ? "Yes" : "No"}
        />
        <input type="hidden" name="selected_time" value={selectedTime || "auto"} />

        {/* Name */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">
            {t("contact.form.name")}
          </label>
          <input
            name="name"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-800/10"
            placeholder={t("contact.form.namePlaceholder") || "Your full name"}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">
            {t("contact.form.phone")}
          </label>
          <input
            name="phone"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-800/10"
            placeholder={t("contact.form.phonePlaceholder") || "+31 6 12345678"}
            style={{ direction: "ltr" }} // Always left-to-right for phone numbers
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-800/10"
            placeholder="you@example.com"
          />
        </div>

        {/* Conditional input for message or reason */}
        {selectedService === "triage" ? (
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">
              Your Message
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Please describe your request..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-800/10 bg-white resize-y"
            />
          </div>
        ) : (
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">
              Reason
            </label>
            <select
              name="reason"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-800/10 bg-white"
            >
              <option value="">Select a reason...</option>
              <option value="appointment">Question about appointment</option>
              <option value="administrative">Administrative question</option>
              <option value="medical">General medical inquiry</option>
            </select>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 font-semibold rounded-lg transition-colors ${
            isSubmitting
              ? "bg-slate-400 text-white cursor-not-allowed"
              : "bg-slate-800 text-white hover:bg-slate-700"
          }`}
        >
          {isSubmitting
            ? t("contact.form.sending") || "Sending..."
            : getButtonText()}
        </button>

        {/* Status Message */}
        {statusMessage && (
          <p
            id="my-form-status"
            className="text-center text-sm mt-3 text-slate-600 bg-slate-50 border border-slate-200 p-2 rounded"
          >
            {statusMessage}
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default StepForm;
