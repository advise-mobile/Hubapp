import React, {useEffect, useRef } from 'react';

import {Linking} from 'react-native'

import Modal from '@components/Modal';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { SHOW_PROMOTION } from 'helpers/StorageKeys';

import {
  Image,
  Container,
  Footer,
  WhatsAppCallText,
  WhatsAppCall,
  CancelText,
  Cancel
} from "./styles";

export default Promotion = () => {


const promotionModalsRef = useRef(null);

const openPromotion  = () => promotionModalsRef.current?.open();
const closePromotion = () => promotionModalsRef.current?.close();

useEffect(() => {
	openPromotion();
},[]);

const OpenWhatsApp = (phone:string, text:string) => {
	Linking.openURL(`whatsapp://send?text=${text}&phone=${phone}`);
	closeModal();
};

const closeModal = async () => {
	await AsyncStorage.setItem(SHOW_PROMOTION, JSON.stringify(false));
	closePromotion();
}

  const footer = () => (
	<Footer>
		<Cancel onPress={() => closeModal()}>
			<CancelText>Cancelar</CancelText>
		</Cancel>

		<WhatsAppCall onPress={() => OpenWhatsApp('5543999522101','Olá, gostária de saber mais sobre a black november!')}>
			<WhatsAppCallText>Contratar</WhatsAppCallText>
		</WhatsAppCall>
	</Footer>
);

  return (
	
    <Modal footer={footer()}  ref={promotionModalsRef} maxHeight={600} title="Promoção" >
		
		<Container>
     		<Image 
				source={{
					uri: 'https://cdn.advise.com.br/novemberblack/anuncio-black-upsell.jpg',
				}}/>
		</Container>
    
    </Modal>
	
  );
};


