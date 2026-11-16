declare module 'react-native-vector-icons/MaterialIcons' {
  import { ComponentType } from 'react';
  interface MaterialIconsProps {
    name: string;
    size?: number;
    color?: string;
    style?: object;
  }
  const MaterialIcons: ComponentType<MaterialIconsProps>;
  export default MaterialIcons;
}
