import React, { useState, useRef } from 'react';

import { WebView } from 'react-native-webview';

import Header from 'components/Header';

import { Container, Warp } from 'assets/styles/general';

export default function Blank(props) {
  const webRef = useRef();
  // const modalizeRef = useRef(null);

  // const onOpen = () => {
  //   modalizeRef.current?.open();
  // };

  const handleChange = ({ url }) => {
    if (!url) return;

    console.log(url);

    if (url.includes("Ticket") || url.includes("https://www.movidesk.com/?origin=chat"))
      webRef.current?.stopLoading();

    return;
  };


  return (
    <Container>
      <Warp>
        <Header title={'Fale com nossos atendentes'} back={() => props.navigation.goBack()} lower={true} />
        <WebView
          ref={webRef}
          thirdPartyCookiesEnabled={true}
          bounces={false}
          style={{ flex: 1 }}
          onNavigationStateChange={handleChange}
          source={{
            uri: `https://chat.movidesk.com/ChatWidget/Landing/3D19AFACA8374B6C95695470713BBAF9`,
          }}
          automaticallyAdjustContentInsets={false}
        />
      </Warp>
      {/* <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity> */}

      {/* <HTML source={{ html: htmlContent }} contentWidth={contentWidth} style={{ background: 'red', flex: 1 }} /> */}
      {/*
      <Modalize ref={modalizeRef}

        adjustToContentHeight={true}
      ><Text>...your content</Text></Modalize> */}
    </Container>
  );
}
