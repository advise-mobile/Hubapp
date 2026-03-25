import React from 'react';
import RNModal from 'react-native-modal';

import {
  ModalContent,
  ModalTitle,
  Footer,
  Button,
  ButtonSecondary,
  ButtonText,
  ButtonTextSecondary,
} from './styles';

export interface AddTribunalFormData {
  [key: string]: string | number | boolean | null | undefined;
}

export interface AddTribunalModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: AddTribunalFormData) => void;
}

export function AddTribunalModal({
  visible,
  onClose,
  onSave,
}: AddTribunalModalProps) {
  const handleSave = () => {
    onSave({});
    onClose();
  };

  return (
    <RNModal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ justifyContent: 'center', margin: 24 }}
    >
      <ModalContent>
        <ModalTitle>Acesso ao tribunal</ModalTitle>
        {/* Formulário pode ser expandido depois */}
        <Footer>
          <ButtonSecondary onPress={onClose}>
            <ButtonTextSecondary>Cancelar</ButtonTextSecondary>
          </ButtonSecondary>
          <Button onPress={handleSave}>
            <ButtonText>Salvar</ButtonText>
          </Button>
        </Footer>
      </ModalContent>
    </RNModal>
  );
}
