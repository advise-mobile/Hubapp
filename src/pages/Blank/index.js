import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Modalize } from 'react-native-modalize';



export default function Blank() {
  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Modalize ref={modalizeRef}

        adjustToContentHeight={true}
      ><Text>...your content</Text></Modalize>
    </>
  );
}
