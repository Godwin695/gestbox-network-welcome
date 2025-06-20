
export const validateAdminPhone = (phone: string): boolean => {
  // Supprimer tous les espaces et caractères non numériques
  const cleanPhone = phone.replace(/\D/g, '');
  // Vérifier que le numéro fait exactement 10 chiffres
  return cleanPhone.length === 10;
};

export const validateAdminPassword = (password: string): boolean => {
  // Vérifier que le mot de passe commence par une majuscule
  const startsWithUppercase = /^[A-Z]/.test(password);
  // Vérifier que le mot de passe contient au moins un chiffre
  const hasNumber = /\d/.test(password);
  // Vérifier que le mot de passe fait au moins 6 caractères
  const hasMinLength = password.length >= 6;
  
  return startsWithUppercase && hasNumber && hasMinLength;
};

export const getPhoneValidationMessage = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    return `Numéro trop court (${cleanPhone.length}/10 chiffres)`;
  } else if (cleanPhone.length > 10) {
    return `Numéro trop long (${cleanPhone.length}/10 chiffres)`;
  }
  return '';
};

export const getPasswordValidationMessage = (password: string): string => {
  if (password.length === 0) return '';
  
  const errors: string[] = [];
  
  if (!/^[A-Z]/.test(password)) {
    errors.push('Doit commencer par une majuscule');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Doit contenir au moins un chiffre');
  }
  
  if (password.length < 6) {
    errors.push('Minimum 6 caractères');
  }
  
  return errors.join(', ');
};
