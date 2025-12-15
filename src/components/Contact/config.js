// src/components/Contact/config.js
import { Phone, Calendar, AlertCircle, Home } from 'lucide-react';

export const services = [
  {
    id: 'triage',
    title: 'Free Call-back Request',
    price: 'Free',
    description:
      'You can request a free triage callback. No doctor will be on the line — our team will collect your details and prioritize your case.',
    icon: Phone,
    color: 'text-slate-600',
    bgColor: 'bg-slate-100',
  },
  {
    id: 'consultation',
    title: 'Telephone Consultation',
    price: '€45',
    description:
      '15-minute phone consultation. You can book anytime, even outside hours — we’ll confirm and schedule for the next available weekend slot.',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    hasTimeSlot: true,
  },
  {
    id: 'priority',
    title: 'Priority Telephone Consultation',
    price: '€80',
    description:
      'Urgent but non-emergency. Speak with a doctor within 1 hour (available weekends 10:00–23:00).',
    icon: AlertCircle,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    id: 'home_visit',
    title: 'Home Visit',
    price: '€250',
    description:
      'Book anytime for a weekend visit (10:00–23:00). We’ll call you the same day to confirm if a home visit is necessary.',
    icon: Home,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
];

// Actual performance hours
export const OPENING_HOURS = {
  triage: { days: [0, 1, 2, 3, 4, 5, 6], start: 0, end: 24 },
  consultation: { days: [6, 0], start: 10, end: 23 },
  priority: { days: [6, 0], start: 10, end: 23 },
  home_visit: { days: [6, 0], start: 10, end: 23 },
};

export const SLOT_CONFIG = {
  triage: { duration: 5, flexible: true, type: 'daily' },
  consultation: {
    duration: 15,
    flexible: false,
    type: 'hourly',
    minLeadHours: 4,
    requireWeekend: false, // allow booking anytime
  },
  priority: {
    duration: 15,
    flexible: true,
    type: 'hourly',
    autoScheduleWithin: 60,
    requireWeekend: true, // only open during hours
  },
  home_visit: {
    duration: 15,
    flexible: true,
    type: 'hourly',
    followUp: 60,
    requireWeekend: false, // allow booking anytime
  },
  maxHourlyMinutes: 60,
  maxDailyMinutes: 720,
};



export const CONFIG = {
  PMS_WEBHOOK: "https://ataraxis.health/api/webhook/new-request",
  FREEFORM_FALLBACK: "https://formspree.io/f/movgbrdk",
  PUBLIC_RSA_KEY: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjB/DRv9UaYduZ1vO6Ogi
KZNHQAkPVntR4dTYC4mlfJ4+xSxS3CvzHShi7y7JbK1WN9sbnfi/wkVxpowRGyac
qU0hUQyzRiik+Whvh+nA7/P+mOY+JIMkzIZx7L/A6Dhi1P8SReWraMdor5NCZGwq
qCogcNrYOs4NoUp5rSnAZvSFfrJVGv287J5zQ4ehdzSra1LWL/hkIGw9pJ4Hd0zR
F1Pew7mP35ohwrGU3+DmOLR/m0wKQK770dTC4j8TtD0lgqIff/cA/DhzqEzdXvbQ
/7FvrKynlu/YfNp4tewg1DVf2Jpzd9G0LGul2fgkVDfpk1GN2Vxy62wsKNRbeY4T
PQIDAQAB
-----END PUBLIC KEY-----
`,
};

