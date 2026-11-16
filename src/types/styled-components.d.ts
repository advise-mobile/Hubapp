import 'styled-components';
import 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Record<string, string>;
    name?: string;
  }
}

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: Record<string, string>;
    name?: string;
  }
}
