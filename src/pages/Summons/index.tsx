import React, { useCallback } from 'react';

import { Container, Warp } from '@lassets/styles/global';
import { Header } from '@components/Header';

import {
  useSummonsHeader,
  type SummonsFilters,
} from './hooks/useSummonsHeader';
import { SummonsFilterModal } from './Modal/Filter';
import { AddTribunalModal } from './Modal/AddTribunal';
import { SummonsUI } from './ui';

export default function Summons() {
  const {
    headerProps,
    filterModalVisible,
    setFilterModalVisible,
    addModalVisible,
    setAddModalVisible,
    filters,
    setFilters,
  } = useSummonsHeader();

  const handleCloseFilter = useCallback(
    () => setFilterModalVisible(false),
    [setFilterModalVisible],
  );
  const handleApplyFilter = useCallback(
    (newFilters: SummonsFilters) => {
      setFilters(newFilters);
      setFilterModalVisible(false);
    },
    [setFilters, setFilterModalVisible],
  );

  const handleCloseAdd = useCallback(
    () => setAddModalVisible(false),
    [setAddModalVisible],
  );
  const handleSaveTribunal = useCallback(
    (_data: Record<string, unknown>) => {
      // TODO: integrar com API / estado da lista
      setAddModalVisible(false);
    },
    [setAddModalVisible],
  );

  return (
    <Container>
      <Warp>
        <Header
          title={headerProps.title}
          leftActions={headerProps.leftActions}
          rightActions={headerProps.rightActions}
        />
        <SummonsUI title="Intimações" />
        <SummonsFilterModal
          visible={filterModalVisible}
          onClose={handleCloseFilter}
          onApply={handleApplyFilter}
          initialFilters={filters}
        />
        <AddTribunalModal
          visible={addModalVisible}
          onClose={handleCloseAdd}
          onSave={handleSaveTribunal}
        />
      </Warp>
    </Container>
  );
}
