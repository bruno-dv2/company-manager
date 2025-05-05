import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledDialog,
  StyledDialogTitle,
  TitleText,
  CloseButton,
  StyledDialogContent,
  MessageText,
  StyledDialogActions,
  DeleteButton
} from '../../styles/components/DeleteConfirmDialog.styles';
import CloseIcon from '@mui/icons-material/Close';

const DeleteConfirmDialog = ({ 
  open, 
  title, 
  itemName, 
  itemType, 
  onConfirm, 
  onCancel 
}) => {
  return (
    <StyledDialog 
      open={open} 
      onClose={onCancel}
      aria-labelledby="delete-dialog-title"
    >
      <StyledDialogTitle id="delete-dialog-title">
        <TitleText>{title}</TitleText>
        <CloseButton 
          onClick={onCancel}
          aria-label="fechar"
        >
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <MessageText>
          {itemType === 'empresa' 
            ? <>A empresa <strong>{itemName}</strong> será excluída.</>
            : <>O local <strong>{itemName}</strong> será excluído.</>}
          &nbsp;Tem certeza dessa ação?
        </MessageText>
      </StyledDialogContent>
      <StyledDialogActions>
        <DeleteButton
          onClick={onConfirm}
          variant="contained"
          aria-label={`Excluir ${itemType}`}
        >
          Excluir
        </DeleteButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

DeleteConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemType: PropTypes.oneOf(['empresa', 'local']).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default DeleteConfirmDialog;