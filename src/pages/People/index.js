import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PeopleActions from 'store/ducks/People';

import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CheckBox from '@react-native-community/checkbox';

import Header from 'components/Header';
import UserIcon from 'components/UserIcon';
import Spinner from 'components/Spinner';

import { colors } from 'assets/styles';

import { Container, Warp, Actions, ActionButton } from 'assets/styles/general';

import {
  ListItem,
  ListContainer,
  ListInfos,
  ContactHeader,
  ContactName,
  ContactActions,
  ContactText,
  Badges,
  Badge,
  BadgeText,
  Markers,
  MarkersButton,
  MarkersText,
  MarkersActive
} from './styles';

export default People = (props) => {
  const [filters, setFilters] = useState();
  const [currentMarker, setCurrentMarker] = useState(0);

  const listRef = useRef(null);

  const loading = useSelector((state) => state.people.loading);
  const people = useSelector((state) => state.people.data);
  const loadMarkers = useSelector((state) => state.people.loadMarkers);
  const markers = useSelector((state) => state.people.markers);

  const dispatch = useDispatch();

  useEffect(() => {
    loadPeople();
  }, [props, filters]);

  const loadPeople = useCallback(() => {
    dispatch(
      PeopleActions.peopleRequest({
        filters,
        typeRequest: 'PEOPLE',
        page: 1,
        perPage: 20,
        refreshing: false,
        loadMarkers
      })
    );
  });

  const renderItem = useCallback(data => {
    let image = data.item.fotoContato?.foto || false;

    return (
      <ListItem onPress={() => { }} underlayColor={colors.white} activeOpacity={1}>
        <ListContainer>
          <CheckBox
            value={data.item.checked}
            onValueChange={newValue => toggleCheck(data.item, newValue)}
            boxType={'square'}
            animationDuration={0.2}
            lineWidth={1.5}
            tintColor={colors.primary}
            onCheckColor={colors.white}
            onFillColor={colors.primary}
            onTintColor={colors.primary}
            style={{
              width: 18,
              height: 18,
              marginRight: 12
            }}
          />
          <UserIcon name={data.item.nomePessoaCliente} color={colors.grayLight} size='70' avatar={image} />
          <ListInfos>
            <ContactHeader>
              <ContactName>{data.item.nomePessoaCliente}</ContactName>
              <ContactActions onPress={() => openRow(data.item.idPessoaCliente)}>
                <MaterialIcons name="more-horiz" size={25} color={colors.fadedBlack} />
              </ContactActions>
            </ContactHeader>
            {(data.item.celular1 || data.item.celular2 || data.item.fone1) && (
              <ContactText>{renderPhone(data.item)}</ContactText>
            )}
            <Badges>
              <Badge ativo={data.item.contato[0].ativo}>
                <BadgeText>{data.item.contato[0].ativo ? 'Ativo' : 'Inativo'}</BadgeText>
              </Badge>
              {renderBadges(data.item)}
            </Badges>
          </ListInfos>
        </ListContainer>
      </ListItem>
    );
  });

  const renderPhone = useCallback(data => {
    let phones = [];

    const keys = ['celular1', 'celular2', 'fone1'];

    keys.map(key => data[key] && phones.push(data[key]));

    return phones.splice(0, 2).join(' | ');
  });

  const renderBadges = useCallback(data => {
    return data.contato[0].contatoXMarcadorContato.filter(marker => marker.ativo).map((activeMarker, index) => {
      return (
        <Badge key={index}>
          <BadgeText>{activeMarker.marcadorContato.nomeMarcadorContato}</BadgeText>
        </Badge>
      )
    })
  }, [people]);

  const renderHiddenItem = useCallback(data => (
    <Actions>
      <ActionButton onPress={() => console.log('clicked')}>
        <MaterialIcons name="edit" size={24} color={colors.fadedBlack} />
      </ActionButton>
      <ActionButton onPress={() => console.log('clicked')}>
        <MaterialIcons name="print" size={24} color={colors.fadedBlack} />
      </ActionButton>
      <ActionButton onPress={() => console.log('clicked')}>
        <MaterialIcons name="mail" size={24} color={colors.fadedBlack} />
      </ActionButton>
      <ActionButton onPress={() => console.log('clicked')}>
        <MaterialIcons name="share" size={24} color={colors.fadedBlack} />
      </ActionButton>
      <ActionButton onPress={() => console.log('clicked')}>
        <MaterialIcons name="block" size={24} color={data.item.contato[0].ativo ? colors.fadedBlack : colors.red} />
      </ActionButton>
    </Actions>
  ));

  const filterByMarker = useCallback(async marker => {
    if (marker.idMarcadorContato != 0) {
      setFilters({
        marcador: marker.idMarcadorContato
      });
    }

    await setCurrentMarker(marker.idMarcadorContato);
  }, []);

  const renderMarkers = useCallback(marker => (
    <MarkersButton onPress={() => filterByMarker(marker.item)}>
      <MarkersText active={currentMarker == marker.item.idMarcadorContato}>
        {marker.item.nomeMarcadorContato}
      </MarkersText>
      <MarkersActive active={currentMarker == marker.item.idMarcadorContato} />
    </MarkersButton>
  ), [currentMarker]);

  const teste = useCallback(() => {
    console.log('reached');
  });

  const toggleCheck = useCallback((item, checked) => {
    item.checked = checked;

    console.log(item);
  });

  const keyExtractor = (item, _) => item.idPessoaCliente.toString();

  const openRow = useCallback(key => listRef.current._rows[key].manuallySwipeRow(-260));

  return (
    <Container>
      <Warp>
        <Header title='Pessoas' filter={() => { }} add={() => { }} edit={() => { }} />
        {loading ? <Spinner /> : (
          <>
            <Markers
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
              }}
              showsHorizontalScrollIndicator={true}
              horizontal={true}
              data={markers}
              renderItem={renderMarkers}
              keyExtractor={(item, _) => item.idMarcadorContato.toString()}
            />
            <SwipeListView
              keyExtractor={keyExtractor}
              ref={listRef}
              data={people}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-260}
              previewRowKey={'0'}
              previewOpenValue={-150}
              previewOpenDelay={2000}
              closeOnRowOpen={false}
              onEndReached={() => teste}
            />
          </>
        )}
      </Warp>
    </Container>
  );
}
