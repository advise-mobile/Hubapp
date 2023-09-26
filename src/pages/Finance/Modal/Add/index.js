import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';

import { FormatFullDateEN } from 'helpers/DateFunctions';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';
import Datepicker from 'components/DatePicker';

import { useForm, Controller, reset } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';

import DeadlinesActions from 'store/ducks/Deadlines';

import {
  Footer,
  Cancel,
  CancelText,
  Content,
  Row,
  Label,
  
} from './styles';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

export default Add = forwardRef((props, ref) => {

  // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;


  const closeModal = useCallback(() => ref.current?.close(), []);


  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
    </Footer>
  );

  return (
    <Modal maxHeight={200} ref={ref} title="Cadastrar prazo" footer={footer()} >
      <Content>
        <Row >
          <Label>Despesa</Label>
          
        </Row>
      </Content>
    </Modal >
  );
});
