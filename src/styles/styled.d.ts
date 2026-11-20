import 'styled-components'
import type { AppTheme } from './themes'
declare module 'styled-components' {
  // Declaration merging integra os tokens ao tipo público do styled-components.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme { }
}
