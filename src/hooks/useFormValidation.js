import { useState } from 'react';

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateName = (name) => {
    return typeof name === 'string' && name.length >= 2;
  };

  const validatePhone = (phone) => {
    if (typeof phone !== 'string') return false;
    const digitos = phone.replace(/\D/g, '');
    return digitos.length >= 8 && digitos.length <= 15;
  };

  const validateDateBirth = (date) => {
    if (!date) return false;
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return false;
    const today = new Date();
    let idade = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) idade--;
    return idade >= 13;
  };

  const validateForm = (formData) => {
    const newErrors = {};

    if ('name' in formData && !validateName(formData.name)) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if ('phone' in formData && !validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    if ('dateBirth' in formData && !validateDateBirth(formData.dateBirth)) {
      newErrors.dateBirth = 'Data de nascimento inválida ou idade inferior a 13 anos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const setError = (field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  return {
    errors,
    loading,
    setLoading,
    validateForm,
    clearErrors,
    setError,
    validateName,
    validatePhone,
    validateDateBirth
  };
};