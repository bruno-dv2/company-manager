import React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import CloseIcon from '@mui/icons-material/Close';
import FormField from '../common/FormField';

import {
  StyledDialog,
  StyledDialogTitle,
  TitleText,
  CloseButton,
  StyledDialogContent,
  StyledDialogActions,
  SubmitButton,
  FieldContainer,
  RowContainer
} from '../../styles/components/FormModal.styles';


const CNPJMask = React.forwardRef(function CNPJMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00.000.000/0000-00"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

CNPJMask.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const EmpresaForm = ({
  open,
  title,
  formData,
  handleChange,
  onSubmit,
  onCancel,
  submitLabel = 'Adicionar',
  isLoading = false,
  errors = {},
  touched = {}
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={onCancel}
      aria-labelledby="empresa-form-title"
    >
      {/* Cabeçalho do modal */}
      <StyledDialogTitle id="empresa-form-title">
        <TitleText>{title}</TitleText>
        <CloseButton aria-label="fechar" onClick={onCancel}>
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>

      {/* Conteúdo do modal */}
      <StyledDialogContent>
        <FieldContainer>
          <FormField
            label="Nome"
            name="nome"
            placeholder="Nome da empresa"
            value={formData.nome}
            onChange={handleChange}
            required
            disabled={isLoading}
            error={touched.nome && Boolean(errors.nome)}
            helperText={touched.nome && errors.nome}
            inputProps={{
              style: { height: '20px' }
            }}
          />
        </FieldContainer>

        <RowContainer>
          <FieldContainer>
            <FormField
              label="Website"
              name="website"
              placeholder="https://www.exemplo.com.br"
              value={formData.website}
              onChange={handleChange}
              disabled={isLoading}
              error={touched.website && Boolean(errors.website)}
              helperText={touched.website && errors.website}
              inputProps={{
                style: { height: '20px' }
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <FormField
              label="CNPJ"
              name="cnpj"
              placeholder="00.000.000/0000-00"
              value={formData.cnpj}
              onChange={handleChange}
              required
              disabled={isLoading}
              error={touched.cnpj && Boolean(errors.cnpj)}
              helperText={touched.cnpj && errors.cnpj}
              InputProps={{
                inputComponent: CNPJMask,
                style: { height: '48px' }
              }}
            />
          </FieldContainer>
        </RowContainer>
      </StyledDialogContent>

      <StyledDialogActions>
        <SubmitButton 
          onClick={onSubmit} 
          disabled={isLoading}
          aria-label={submitLabel}
        >
          {submitLabel}
        </SubmitButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

EmpresaForm.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  isLoading: PropTypes.bool,
  errors: PropTypes.object,
  touched: PropTypes.object
};

export default React.memo(EmpresaForm);