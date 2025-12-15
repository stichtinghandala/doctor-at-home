
export const en = {
  // Brand
  brandName: "Doctor at Home",
  brandSubtitle: "Private Medical Service",
  
  // Navbar
  nav: {
    care: "Care",
    services: "Services",
    process: "Process",
    intake: "Intake",
    bookConsultation: "Book Consultation"
  },

  // Intro
  intro: {
    headline: "Personalized medical care,",
    headlineItalic: "on your terms.",
    description: "Experience the reassurance of having a doctor visit you at home, or consult via phone. Discrete, professional, and responsive care for Amsterdam residents and visitors.",
    nonEmergencyTitle: "Non-Emergency Service",
    nonEmergencyText: "We provide care for non-urgent medical issues. For life-threatening situations, please dial 112 immediately.",
    requestBtn: "Request Consultation",
    viewServicesBtn: "View Services",
    responseTime: "Typical response time: 15-30 minutes",
    imageQuote: "\"Health is clarity.\""
  },

  // About
  about: {
    sectionLabel: "Our Philosophy",
    headline: "Restoring the human connection in medicine.",
    description: "In a complex healthcare system, we offer a simple alternative: direct access to a doctor who knows you. No waiting rooms, no barriers—just professional medical guidance when you need it.",
    values: {
      excellence: {
        title: "Certified Excellence",
        text: "All consultations are performed by fully licensed, experienced physicians registered in the Netherlands (BIG-registered)."
      },
      time: {
        title: "Time & Attention",
        text: "We believe in listening. Our appointments are not rushed, ensuring we understand the full context of your health."
      },
      privacy: {
        title: "Discrete Care",
        text: "Your privacy is paramount. We provide confidential care in the comfort of your own environment."
      }
    }
  },

  // Services
  services: {
    sectionLabel: "Services",
    headline: "Comprehensive care at your location.",
    description: "We treat common acute illnesses, provide prescriptions, perform physical examinations, and offer medical advice for travelers and residents alike.",
    items: {
      telephonic: {
        title: "Telephonic Consultation",
        description: "Perfect for medical advice, prescription renewals, or determining if a physical visit is necessary."
      },
      houseCalls: {
        title: "House Calls (Visitations)",
        description: "A doctor visits your home, hotel, or office. Includes a full physical assessment and immediate treatment plan."
      },
      assessment: {
        title: "Medical Assessment",
        description: "Second opinions, navigating the Dutch healthcare system, and specialist referrals."
      }
    }
  },

  // Method
  method: {
    sectionLabel: "The Process",
    headline: "Seamless access to care.",
    steps: {
      1: {
        title: "Contact",
        desc: "Use our secure messaging form or call to initiate a request."
      },
      2: {
        title: "Triage",
        desc: "We assess your situation within 30 minutes to ensure we can help."
      },
      3: {
        title: "Care",
        desc: "Consultation takes place via phone or at your location."
      }
    }
  },

  // Contact / Form
  contact: {
    title: "Request Medical Contact — Safely and Clearly",
    subtitle: "Use our secure form to request contact with a doctor. Not for emergencies.",
    modalTitle: "Request Consultation",
    safetyPrivacy: "Safety & Privacy",
    yourDetails: "Your Details",
    selectService: "Select Service",
    continue: "Continue",
    back: "Back",
    sending: "Sending...",
    success: "Request Sent",
    successDesc: "We will contact you shortly.",
    error: "There was a problem submitting your form",
    
    // Consents
    consents: {
      noMedical: "This form is for contact requests only, not medical information.",
      notEmergency: "This is not an emergency service. Call 112 for urgent issues.",
      contact: "I consent to being contacted by phone."
    },

    // Service Types (mapped from IDs)
    serviceTypes: {
      triage: {
        title: "Free Call-back Request",
        desc: "A doctor will review and prioritize based on urgency. No medical info submitted.",
        extra: "A doctor will review your request and respond within 30–60 minutes. This automatically schedules a flexible 5-minute review slot.",
        closed: "Currently closed"
      },
      consultation: {
        title: "Telephone Consultation",
        desc: "15 min consultation. Schedule a future time slot for a detailed discussion.",
        availableTimes: "Available Times"
      },
      priority: {
        title: "Priority Consultation",
        desc: "Urgent but non-emergency. Speak with a doctor within 1 hour.",
        extra: "You will be called within the next hour. A 15-minute slot will be temporarily reserved."
      },
      home_visit: {
        title: "Home Visit",
        desc: "Doctor visits you at your location (Amsterdam area).",
        extra: "We will call you within the next hour to determine if a visit is indicated. This reserves a 15-minute phone slot."
      }
    },

    buttons: {
      triage: "Request Call-back",
      consultation: "Book Consultation",
      priority: "Request Priority Consultation",
      home_visit: "Request Home Visit",
      default: "Submit Request"
    },

    form: {
      name: "Name",
      namePlaceholder: "Your name",
      phone: "Phone",
      phonePlaceholder: "Contact number",
      reason: "Reason",
      reasonPlaceholder: "Select a reason...",
      reasons: {
        callback: "Request for call-back",
        appointment: "Question about appointment",
        administrative: "Administrative question",
        medical: "General medical inquiry"
      }
    }
  },

  // Footer
  footer: {
    desc: "Private healthcare services in Amsterdam.",
    brandTag: "an Ataraxia Health brand",
    privacy: "Privacy",
    terms: "Terms",
    bigRegister: "BIG-Register",
    copyright: "Doctor at Home"
  }
};
