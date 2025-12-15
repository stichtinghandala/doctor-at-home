// src/components/Contact/utils.js
import { OPENING_HOURS } from "./config";

export const isServiceOpen = (serviceId) => {
  const now = new Date();
  const config = OPENING_HOURS[serviceId];
  if (!config) return true;
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  return (
    config.days.includes(currentDay) &&
    currentHour >= config.start &&
    currentHour < config.end
  );
};
