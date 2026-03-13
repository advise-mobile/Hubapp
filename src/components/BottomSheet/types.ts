import type { ReactNode } from 'react';

export interface BottomSheetProps {
  /** Controla visibilidade (modal sobe de baixo quando true). */
  visible: boolean;
  /** Chamado ao fechar (backdrop, botão voltar ou programático). */
  onClose: () => void;
  /** Título exibido abaixo do handle. */
  title: string;
  /** Conteúdo do meio do sheet. */
  children: ReactNode;
  /** Texto do botão principal no rodapé (ex.: "Ver Resultados"). Se não informado, não renderiza botão. */
  primaryButtonText?: string;
  /** Chamado ao tocar no botão principal. */
  onPrimaryPress?: () => void;
  /** Opcional: texto "Limpar (N)" e callback (ex.: filtros ativos). */
  clearFiltersLabel?: string;
  onClearFilters?: () => void;
  /** Altura máxima em % da tela (0–1). Padrão 0.6. */
  maxHeightRatio?: number;
  /** Margem inferior (ex.: altura da tab bar) para o sheet não esconder o menu. Padrão: 64 (Android) / 80 (iOS). */
  bottomInset?: number;
}
