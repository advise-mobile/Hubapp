import React, { createRef, useCallback, useMemo } from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTML from "react-native-render-html";

import moment from 'moment';

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
  Title,
  Description,
  Mark,
  Div
} from './styles';

export default function jurisprudenceDetails(props) {
  const optionsRef = createRef();
  const emailRef = createRef();
  const jurisprudence = props.route.params.jurisprudence;

  const term = props.route.params.term;
  const renderers = {
    mark: (htmlAttribs, children, convertedCSSStyles, passProps) => <Mark key={Math.random()}>{children}</Mark>,
    description: (htmlAttribs, children, convertedCSSStyles, passProps) => <Description key={Math.random()}>{children}</Description>,
    title: (htmlAttribs, children, convertedCSSStyles, passProps) => <Title key={Math.random()}>{children}</Title>,
    div: (htmlAttribs, children, convertedCSSStyles, passProps) => <Div key={Math.random()}>{children}</Div>,
  };

  const capitalize = useCallback(s => s.replace(/(?:^|\s|["'([{])+\S/g, l => l.toUpperCase()), []);

  const openModal = () => optionsRef.current?.open();

  const openEmail = () => emailRef.current?.open();

  const customActions = useCallback(() => (
    <HeaderAction key={1}>
      <MaterialIcons name="more-vert" size={20} color={colors.fadedBlack} onPress={() => openModal()} />
    </HeaderAction>
  ));

  const renderJurisprudence = useMemo(() =>
    <HTML source={{ html: `<title>${jurisprudence.tituloMarcado || jurisprudence.titulo}</title><description>${jurisprudence.ementaMarcada.join("").split('\u0000').join('') || jurisprudence.ementa}</description>` }} renderers={renderers} ignoredTags={['strong']} />
    , [jurisprudence]);

  return (
    <Container>
      <Warp>
        <Header title={jurisprudence.nomeTribunal} back={() => props.navigation.goBack()} customActions={customActions()} />
        <Content>
          <Tags>
            {jurisprudence.dataPublicacao ?
              <Tag key={1}>
                <TagText>Data de publicação: {moment(jurisprudence.dataPublicacao, 'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY')}</TagText>
              </Tag> 
              :
              jurisprudence.dataJulgamento ?
                <Tag key={1}>
                  <TagText>Data de julgamento: {moment(jurisprudence.dataJulgamento, 'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY')}</TagText>
                </Tag> 
                : 
                <Tag key={1}>
                  <TagText>Data de publicação: Não informado</TagText>
                </Tag> 
            }
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
                <TagText>{group === 'undefined' ? 'Outros' : capitalize(group)}</TagText>
              </Tag>
            ) : null}
          </Tags>
          {renderJurisprudence}
        </Content>
        <Options ref={optionsRef} jurisprudence={jurisprudence} term={term} openEmail={openEmail} />
        <Email ref={emailRef} jurisprudence={jurisprudence} term={term} />
      </Warp>
    </Container>
  );
}
