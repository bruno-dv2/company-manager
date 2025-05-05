import { useState, useCallback } from 'react';

/**
 * Hook personalizado para gerenciar formulários
 */
const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: '',
      }));
    }
    
    if (!touched[name]) {
      setTouched(prevTouched => ({
        ...prevTouched,
        [name]: true,
      }));
    }
  }, [errors, touched]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true,
    }));
  }, []);

  const resetForm = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const validateField = useCallback((name, value, rules) => {
    if (!rules) return '';
    
    if (rules.required && (value === undefined || value === null || value === '')) {
      return 'Este campo é obrigatório';
    }
    
    if (rules.minLength && value && value.length < rules.minLength) {
      return `Este campo deve ter pelo menos ${rules.minLength} caracteres`;
    }
    
    if (rules.pattern && value && !rules.pattern.test(value)) {
      return rules.message || 'Formato inválido';
    }
    
    if (rules.validate && typeof rules.validate === 'function') {
      return rules.validate(value, values);
    }
    
    return '';
  }, [values]);

  const validateForm = useCallback((validationRules) => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach((fieldName) => {
      const value = values[fieldName];
      const error = validateField(fieldName, value, validationRules[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    
    setTouched(
      Object.keys(validationRules).reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {})
    );
    
    return isValid;
  }, [validateField, values]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    setValues,
    validateForm,
  };
};

export default useForm;