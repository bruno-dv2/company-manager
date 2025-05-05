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

const CEPMask = React.forwardRef(function CEPMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00000-000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

CEPMask.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const LocalForm = ({
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
      aria-labelledby="local-form-title"
    >
      {/* Cabeçalho do modal */}
      <StyledDialogTitle id="local-form-title">
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
            placeholder="Nome do local"
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

        <FieldContainer>
          <FormField
            label="CEP"
            name="cep"
            placeholder="00000-000"
            value={formData.cep}
            onChange={handleChange}
            required
            disabled={isLoading}
            error={touched.cep && Boolean(errors.cep)}
            helperText={touched.cep && errors.cep}
            InputProps={{
              inputComponent: CEPMask,
              style: { height: '48px' }
            }}
          />
        </FieldContainer>

        <FieldContainer>
          <FormField
            label="Rua"
            name="rua"
            placeholder="Nome da rua"
            value={formData.rua}
            onChange={handleChange}
            required
            disabled={isLoading}
            error={touched.rua && Boolean(errors.rua)}
            helperText={touched.rua && errors.rua}
            inputProps={{
              style: { height: '20px' }
            }}
          />
        </FieldContainer>

        <RowContainer>
          <FieldContainer>
            <FormField
              label="Número"
              name="numero"
              placeholder="123"
              value={formData.numero}
              onChange={handleChange}
              required
              disabled={isLoading}
              error={touched.numero && Boolean(errors.numero)}
              helperText={touched.numero && errors.numero}
              inputProps={{
                style: { height: '20px' }
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <FormField
              label="Bairro"
              name="bairro"
              placeholder="Nome do bairro"
              value={formData.bairro}
              onChange={handleChange}
              required
              disabled={isLoading}
              error={touched.bairro && Boolean(errors.bairro)}
              helperText={touched.bairro && errors.bairro}
              inputProps={{
                style: { height: '20px' }
              }}
            />
          </FieldContainer>
        </RowContainer>

        <RowContainer>
          <FieldContainer>
            <FormField
              label="Cidade"
              name="cidade"
              placeholder="Nome da cidade"
              value={formData.cidade}
              onChange={handleChange}
              required
              disabled={isLoading}
              error={touched.cidade && Boolean(errors.cidade)}
              helperText={touched.cidade && errors.cidade}
              inputProps={{
                style: { height: '20px' }
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <FormField
              label="Estado"
              name="estado"
              placeholder="UF"
              value={formData.estado}
              onChange={handleChange}
              required
              disabled={isLoading}
              error={touched.estado && Boolean(errors.estado)}
              helperText={touched.estado && errors.estado}
              inputProps={{
                style: { height: '20px' },
                maxLength: 2
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

LocalForm.propTypes = {
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

export default React.memo(LocalForm);