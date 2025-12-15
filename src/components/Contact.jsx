
// This component has been moved to src/components/Contact/Contact.jsx
// and refactored into smaller sub-components.
// Please use the new import path: '@/components/Contact/Contact'

import React from 'react';
import ContactNew from './Contact/Contact';

const ContactDeprecated = (props) => {
  return <ContactNew {...props} />;
};

export default ContactDeprecated;
