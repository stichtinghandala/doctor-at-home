import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const StepCallbackConfirm = ({ onClose }) => (
  <motion.div
    key="callback-confirmation"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="text-center space-y-4 py-6"
  >
    <Phone className="mx-auto text-slate-700" size={40} />
    <h4 className="text-lg font-semibold text-slate-800">
      We’ll call you shortly
    </h4>
    <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
      You’ll receive an automated call within the next few minutes to record your request.
      Please note: no doctor will answer — just leave your message after the tone.
    </p>
    <button
      onClick={onClose}
      className="mt-6 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition shadow-sm"
    >
      Close
    </button>
  </motion.div>
);

export default StepCallbackConfirm;
