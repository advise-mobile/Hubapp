import React from 'react';

import { Content, Title } from './styles';

export interface SummonsUIProps {
  title: string;
}

export function SummonsUI({ title }: SummonsUIProps) {
  return (
    <Content>
      <Title>{title}</Title>
    </Content>
  );
}
