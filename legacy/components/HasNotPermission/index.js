import React from 'react';
import { Content, TextBody, TextTitle, Tag, TagText, Image } from './styles';

const HasNotPermission = props => {
  const { title, body, hasPermission, image } = props;

  return (
    <>
      {!hasPermission && (
        <Content>
          {image && <Image source={image} />}
          <Tag>
            <TagText>Não disponível no seu contrato</TagText>
          </Tag>
          <TextTitle>{title}</TextTitle>
          <TextBody>{body}</TextBody>
        </Content>
      )}
    </>
  );
};

export default HasNotPermission;
