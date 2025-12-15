
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const StepConsents = ({ consents, handleConsentChange, allConsentsGiven, handleContinue }) => {
  const { t } = useTranslation();

  return (
    <motion.div key="consents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h4 className="text-lg font-medium text-slate-800">{t('contact.safetyPrivacy')}</h4>

      {Object.keys(consents).map((key) => {
        // Map consent keys to translation keys
        const translationKeyMap = {
           noMedicalInfo: 'noMedical',
           notEmergency: 'notEmergency',
           consentContact: 'contact'
        };
        const tKey = translationKeyMap[key];

        return (
          <label
            key={key}
            className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-slate-300"
          >
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${consents[key] ? "bg-slate-800 border-slate-800" : "border-slate-300"
                }`}
            >
              {consents[key] && <Check size={14} className="text-white" />}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={consents[key]}
              onChange={() => handleConsentChange(key)}
            />
            <span className="text-sm text-slate-700">
              {t(`contact.consents.${tKey}`)}
            </span>
          </label>
        );
      })}

      <button
        onClick={handleContinue}
        disabled={!allConsentsGiven}
        className={`w-full py-3 mt-2 font-semibold rounded-lg ${allConsentsGiven
            ? "bg-slate-800 text-white hover:bg-slate-700"
            : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
      >
        {t('contact.continue')}
      </button>
    </motion.div>
  );
};

export default StepConsents;
