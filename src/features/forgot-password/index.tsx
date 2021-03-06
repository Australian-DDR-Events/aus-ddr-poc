import React, { useState } from 'react';

import EmailForm from './email-form';
import EmailSent from './email-sent';
import { ForgotPasswordState } from './types';

const ForgotPassword = () => {
  const [step, setStep] = useState(ForgotPasswordState.REQUEST_EMAIL);

  const handleEmailSubmitted = () => {
    setStep(ForgotPasswordState.EMAIL_SENT);
  };
  return (
    <>
      {step === ForgotPasswordState.REQUEST_EMAIL && (
        <EmailForm onSubmitCallback={handleEmailSubmitted} />
      )}
      {step === ForgotPasswordState.EMAIL_SENT && <EmailSent />}
    </>
  );
};

export default ForgotPassword;
