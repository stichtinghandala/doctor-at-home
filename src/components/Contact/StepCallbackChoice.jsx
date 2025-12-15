import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Lock } from "lucide-react";

const StepCallbackChoice = ({ onSelectOption }) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCallbackRequest = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/callback-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.ok) {
        setMessage("📞 You’ll receive a call shortly to record your message.");
      } else {
        setMessage("⚠️ Could not start callback, please try again.");
      }
    } catch {
      setMessage("⚠️ Connection issue, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="text-lg font-medium text-slate-800 mb-4 text-center">
        How would you like to submit your request?
      </h3>
      <div className="space-y-4">
        {/* Speak Option */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Phone className="text-slate-700" />
            <h4 className="font-semibold">Speak my request</h4>
          </div>
          <p className="text-sm text-slate-500 mb-3">
            You’ll get a short automated callback to record your message. No doctor answers live.
          </p>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-800/10 mb-3"
          />
          <button
            onClick={handleCallbackRequest}
            disabled={loading || !phone}
            className={`w-full py-2 font-semibold rounded-lg ${
              loading
                ? "bg-slate-400 text-white cursor-not-allowed"
                : "bg-slate-800 text-white hover:bg-slate-700"
            }`}
          >
            {loading ? "Starting..." : "Request Automated Callback"}
          </button>
          {message && <p className="text-sm mt-3 text-center">{message}</p>}
        </div>

        {/* Type Option */}
        <div
          className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm cursor-pointer hover:border-slate-400 transition"
          onClick={() => onSelectOption("form")}
        >
          <div className="flex items-center gap-3 mb-2">
            <Lock className="text-slate-700" />
            <h4 className="font-semibold">Type my request securely</h4>
          </div>
          <p className="text-sm text-slate-500">
            Write your request in our encrypted form. It’s secure and private.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StepCallbackChoice;
