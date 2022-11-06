import emailjs from '@emailjs/browser';

export const UseSendEmail = (
  contactData,
  showToast,
  setButonLoading,
  customMessage
) => {
  emailjs
    .send(
      'service_f4ozdop',
      'template_nkznoik',
      contactData,
      'vOwwQu1LRNV_WjRgI'
    )
    .then(
      (result) => {
        showToast(
          'success',
          customMessage ? customMessage : 'Se ha enviado su consulta'
        );
        setButonLoading(false);
      },
      (error) => {
        showToast('error', 'Error al enviar su consulta');
        setButonLoading(false);
      }
    );
};
