import React, { useEffect } from 'react';
import { Linking } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Content,
  Description,
  Option,
  Infos,
  Subtitle,
  OptionText,
  OptionButton,
  Attendance,
  AttendanceTitle,
  AttendanceText,
} from './styles';

import { Container, Warp } from 'assets/styles/general';
import { colors } from 'assets/styles';

const Help = props => {

  useEffect(() => {
    if (!props.selected) return;

    props.setCustomActions(null);
  }, [props.selected]);


  return (
    <Container>
      <Warp>
        <Content>
          <Infos>
            <Description>Em caso de dúvida, entre em contato com a nossa equipe de suporte pelos canais abaixo.</Description>

            <Subtitle>Fale com a gente</Subtitle>
            <OptionButton onPress={() => props.navigation.navigate('Chat')}>
              <Option>
                <Icon name={"chat"} size={22} color={colors.advise} />
                <OptionText>Chat em tempo real</OptionText>
              </Option>
            </OptionButton>

            <Subtitle>Email</Subtitle>
            <OptionButton onPress={() => Linking.openURL('mailto:atendimento@advise.com.br')}>
              <Option>
                <Icon name={"email"} size={22} color={colors.advise} />
                <OptionText>atendimento@advise.com.br</OptionText>
              </Option>
            </OptionButton>

            <Subtitle>Capitais e regiões metropolitanas</Subtitle>
            <OptionButton onPress={() => Linking.openURL('tel:40033196')}>
              <Option>
                <Icon name={"phone"} size={22} color={colors.advise} />
                <OptionText>4003 3196</OptionText>
              </Option>
            </OptionButton>

            <Subtitle>Demais regiões</Subtitle>
            <OptionButton onPress={() => Linking.openURL('tel:08005009926')}>
              <Option>
                <Icon name={"phone"} size={22} color={colors.advise} />
                <OptionText>0800 500 9926</OptionText>
              </Option>
            </OptionButton>
          </Infos>
          <Attendance>
            <AttendanceTitle>Horário de atendimento</AttendanceTitle>
            <AttendanceText>Segunda a quinta: 8:00 às 18:00</AttendanceText>
            <AttendanceText>Sexta: 8:00 às 17:30, exceto feriados</AttendanceText>
          </Attendance>
        </Content>
      </Warp>
    </Container>
  );
}


export default Help;
