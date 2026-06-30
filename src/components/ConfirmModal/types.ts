export type ConfirmModalSubmitTone = 'primary' | 'danger';

export interface ConfirmModalProps {
  title: string;
  description: string;
  submitText: string;
  cancelText: string;
  onCancel: () => void;
  onSubmit: () => void;
  loading: boolean;
  maxHeight?: number;
  submitTone?: ConfirmModalSubmitTone;
}
