"use client";

import React from 'react';
import FormField from '../FormField';

interface JoiningReasonSectionProps {
  // Props for controlled components can be added here if needed
  // value?: string;
  // onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

/**
 * Renders the "入驻理由" (Reason for Joining) section.
 * This is a common textarea field across many KYC forms.
 */
const JoiningReasonSection: React.FC<JoiningReasonSectionProps> = (props) => {
  // const { value, onChange } = props;
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">入驻理由</h2>
      <FormField 
        label="入驻理由" 
        id="joiningReason" 
        isTextarea 
        placeholder="请简述您希望入驻本平台的理由" 
        // value={value}
        // onChange={onChange}
      />
    </section>
  );
};

export default JoiningReasonSection; 