declare module '@lhelpers/StorageKeys' {
  export const TOKEN: string;
  export const REFRESH_TOKEN: string;
  export const EXPIRES_TOKEN: string;
  export const AVATAR: string;
  export const PERMISSIONS: string;
  export const PUSH: string;
  export const VERSION: string;
  export const INTRO: string;
  export const ACCEPT_TERMS: string;
  export const SHOW_PROMOTION: string;
}

declare module '@lcomponents/DatePicker' {
  import type { ComponentType } from 'react';
  import type { StyleProp, ViewStyle } from 'react-native';
  export interface DatePickerProps {
    date: string | Date | null;
    onDateChange: (date: Date) => void;
    title?: string;
    enabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    style?: StyleProp<ViewStyle>;
  }
  const Datepicker: ComponentType<DatePickerProps>;
  export default Datepicker;
}
