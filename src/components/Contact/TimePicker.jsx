import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";

const TimePicker = ({ selectedTime, setSelectedTime }) => {
  const [selectedDay, setSelectedDay] = useState("Saturday");
  const [selectedHour, setSelectedHour] = useState(10);
  const [selectedMinute, setSelectedMinute] = useState("00");

  // Generate hour and minute options
  const hours = useMemo(() => {
    const list = [];
    for (let h = 10; h <= 22; h++) list.push(h);
    return list;
  }, []);

  const minutes = ["00", "15", "30", "45"];

  // When user changes selection, update the combined formatted time
  useEffect(() => {
    const formatted =
      `${selectedDay} ${String(selectedHour).padStart(2, "0")}:${selectedMinute}`;
    setSelectedTime(formatted);
  }, [selectedDay, selectedHour, selectedMinute, setSelectedTime]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-slate-50 border rounded-lg mt-3"
    >
      <p className="text-[11px] uppercase text-slate-500 mb-2">
        Select Day & Time
      </p>

      {/* Day Selector */}
      <div className="flex gap-2 mb-4 justify-center">
        {["Saturday", "Sunday"].map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3 py-1.5 text-xs border rounded-full transition ${
              selectedDay === day
                ? "bg-slate-800 text-white border-slate-800"
                : "border-slate-300 bg-white hover:border-slate-400"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Scroll Wheels */}
      <div className="flex justify-center items-center gap-6 relative">
        {/* Center highlight */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-8 border-y border-slate-300 pointer-events-none"></div>

        {/* Hour Wheel */}
        <div className="h-40 w-16 overflow-y-scroll snap-y snap-mandatory text-center scrollbar-hide border rounded-lg bg-white">
          {hours.map((hour) => (
            <div
              key={hour}
              onClick={() => setSelectedHour(hour)}
              className={`snap-start py-2 text-sm transition cursor-pointer ${
                selectedHour === hour
                  ? "text-slate-900 font-semibold scale-110"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {hour <= 12 ? `${hour} AM` : `${hour - 12} PM`}
            </div>
          ))}
        </div>

        <span className="text-lg font-semibold text-slate-600">:</span>

        {/* Minute Wheel */}
        <div className="h-40 w-16 overflow-y-scroll snap-y snap-mandatory text-center scrollbar-hide border rounded-lg bg-white">
          {minutes.map((m) => (
            <div
              key={m}
              onClick={() => setSelectedMinute(m)}
              className={`snap-start py-2 text-sm transition cursor-pointer ${
                selectedMinute === m
                  ? "text-slate-900 font-semibold scale-110"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {m}
            </div>
          ))}
        </div>
      </div>

      {/* Display selected result */}
      <div className="mt-3 text-center text-sm text-slate-600">
        <p>
          Selected:{" "}
          <strong className="text-slate-800">
            {selectedDay} {String(selectedHour).padStart(2, "0")}:{selectedMinute}
          </strong>
        </p>
      </div>
    </motion.div>
  );
};

export default TimePicker;
