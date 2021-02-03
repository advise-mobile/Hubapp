import React, { createRef, useCallback } from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTML from "react-native-render-html";

import { FormatDateBR } from 'helpers/DateFunctions';

import Header from 'components/Header';

import Options from './Options';
import Email from './Email';

import { colors } from 'assets/styles';
import { Container, Warp, HeaderAction } from 'assets/styles/general';
import {
  Content,
  Tags,
  Tag,
  TagText,
  Description,
  Mark
} from './styles';

export default function jurisprudenceDetails(props) {
  const optionsRef = createRef();
  const emailRef = createRef();
  const jurisprudence = props.navigation.getParam("jurisprudence");
  const term = props.navigation.getParam("term");
  const renderers = {
    mark: (htmlAttribs, children, convertedCSSStyles, passProps) => (
      <Mark key={Math.random()}>{children}</Mark>
    ),
    description: (htmlAttribs, children, convertedCSSStyles, passProps) => (
      <Description key={Math.random()}>{children}</Description>
    ),
  };

  const openModal = () => optionsRef.current?.open();

  const openEmail = () => emailRef.current?.open();

  const customActions = useCallback(() => (
    <HeaderAction key={1}>
      <MaterialIcons name="more-vert" size={20} color={colors.fadedBlack} onPress={() => openModal()} />
    </HeaderAction>
  ));

  return (
    <Container>
      <Warp>
        <Header title={jurisprudence.nomeTribunal} back={() => props.navigation.goBack()} customActions={customActions()} />
        <Tags>
          {jurisprudence.dataPublicacao ?
            <Tag key={1}>
              <TagText>Data de publicação: {FormatDateBR(jurisprudence.dataPublicacao)}</TagText>
            </Tag> : null}
          {jurisprudence.descricaoArea ?
            <Tag key={2}>
              <TagText>{jurisprudence.descricaoArea}</TagText>
            </Tag> : null}
          {jurisprudence.nomeRelator ?
            <Tag key={3}>
              <TagText>{jurisprudence.nomeRelator}</TagText>
            </Tag> : null}
          {jurisprudence.numeroRecurso ?
            <Tag key={4}>
              <TagText>Recurso {jurisprudence.numeroRecurso}</TagText>
            </Tag> : null}
          {jurisprudence.orgaoJulgador ?
            <Tag key={5}>
              <TagText>{jurisprudence.orgaoJulgador}</TagText>
            </Tag> : null}

          {jurisprudence.grupo ? jurisprudence.grupo.map((group, i) =>
            <Tag key={6 + i}>
              <TagText>{group}</TagText>
            </Tag>
          ) : null}
        </Tags>
        <Content>
          <HTML source={{ html: `<title>${jurisprudence.tituloMarcado || jurisprudence.titulo}</title><description>${jurisprudence.ementaMarcada}</description>` }} renderers={renderers} ignoredTags={['strong']} />
        </Content>
        <Options ref={optionsRef} jurisprudence={jurisprudence} openEmail={openEmail} />
        <Email ref={emailRef} jurisprudence={jurisprudence} term={term} />
      </Warp>
    </Container>
  );
}
