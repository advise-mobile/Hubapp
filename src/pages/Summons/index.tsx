import React from 'react';

import { Container, Warp } from '@lassets/styles/global';
import Header from '@lcomponents/Header';

import { SummonsUI } from './ui';

export default function Summons() {
  return (
    <Container>
      <Warp>
        <Header title="Intimações" />
        <SummonsUI title="Intimações" />
      </Warp>
    </Container>
  );
}
