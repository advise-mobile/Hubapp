import React, { useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

import { Container, Warp } from 'assets/styles/general';

export default function Blank(props) {
  const listRef = useRef();

  const [listData, setListData] = useState(
    Array(150)
      .fill('')
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
  );

  const [listView, setListView] = useState(listData.slice(0, 50));
  const [endReached, setEndReached] = useState(false);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(50);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListView(newData);
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const renderItem = data => (
    <TouchableHighlight
      onPress={() => console.log('You touched me')}
      style={styles.rowFront}
      underlayColor={'#AAA'}
    >
      <View>
        <Text>I am {data.item.text} in a SwipeListView</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text>Left</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const buildList = useCallback(() => {
    const max = (lastIndex > listData.length) ? null : lastIndex;

    setListView(listData.slice(firstIndex, max));
  }, [listData, firstIndex, lastIndex])

  const loadMore = useCallback(() => {
    console.log('endReached');

    if (endReached) return;

    setFirstIndex(firstIndex + 20);
    setLastIndex(lastIndex + 20);

    buildList();

    setEndReached(lastIndex + 20 >= listData.length);
  }, [listData, firstIndex, lastIndex, endReached]);

  // const scroll = ({ nativeEvent }) => {
  // console.log(nativeEvent);
  // }

  const checkScroll = useCallback(({ yScrollOffset }) => {
    if (yScrollOffset > 10 || firstIndex == 0) return;

    setFirstIndex(firstIndex - 20);
    setLastIndex(lastIndex - 20);

    buildList();

    setEndReached(lastIndex + 20 >= listData.length);
  }, [firstIndex, lastIndex]);

  return (
    <Container>
      <Warp>
        <SwipeListView
          ref={listRef}
          scrollEventThrottle={0}
          data={listView}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.1}
          onMomentumScrollEnd={() => checkScroll(listRef.current)}
        />
      </Warp>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
