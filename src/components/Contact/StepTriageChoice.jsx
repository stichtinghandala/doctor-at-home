import React from "react";
import { motion } from "framer-motion";
import { Phone, Lock, ChevronLeft } from "lucide-react";

const StepTriageChoice = ({ onSelectOption, onBack }) => (
  <motion.div
    key="triage-choice"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.25 }}
    className="space-y-6 text-center"
  >
    <h4 className="text-lg font-semibold text-slate-800">How would you like to submit your request?</h4>
    <p className="text-sm text-slate-500 max-w-sm mx-auto">
      For the free triage, you can choose to <strong>record</strong> your request by phone (no doctor on the line),
      or <strong>type</strong> it securely using encryption.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
      <button
        onClick={() => onSelectOption("speak")}
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 transition text-slate-700 font-medium shadow-sm"
      >
        <Phone size={18} />
        Record by Phone
      </button>

      <button
        onClick={() => onSelectOption("form")}
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition font-medium shadow-sm"
      >
        <Lock size={18} />
        Type Securely
      </button>
    </div>

    <button
      onClick={onBack}
      className="flex items-center justify-center gap-1 text-sm text-slate-500 mt-4 hover:text-slate-800"
    >
      <ChevronLeft size={14} /> Back
    </button>
  </motion.div>
);

export default StepTriageChoice;
