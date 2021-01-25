import 'styled-components';
import ThemeInterface from '../styles/interface/Theme';

declare module 'styled-components' {
  export default interface DefaultTheme extends ThemeInterface {}
}
