import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { StyledTextField } from '../../styles/shared/FormComponets.styles';

const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  error = false,
  helperText = '',
  inputProps = {},
  InputProps = {},
  ...rest
}) => {
  return (
    <>
      {label && (
        <Typography
          variant="body1"
          fontWeight={500}
          sx={{ mb: 1 }}
          component="label"
          htmlFor={name}
        >
          {label}{required && <span style={{ color: 'red' }}> *</span>}
        </Typography>
      )}
      <StyledTextField
        id={name}
        name={name}
        type={type}
        variant="outlined"
        fullWidth
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        error={error}
        helperText={helperText}
        inputProps={{
          ...inputProps,
          'aria-label': label || name
        }}
        InputProps={InputProps}
        {...rest}
      />
    </>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  inputProps: PropTypes.object,
  InputProps: PropTypes.object
};

export default memo(FormField);