export const lightTheme = {
  mode: 'light', background: '#FAF7F2', surface: '#FFFFFF', text: '#302A36',
  muted: '#655D68', border: '#D8D1DB', brand: '#4B2995', soft: '#EBE5F9',
  action: '#4B2995', onAction: '#FFFFFF', focus: '#8047F8',
}
export type AppTheme = typeof lightTheme
export const darkTheme: AppTheme = {
  mode: 'dark', background: '#201A2B', surface: '#2D2539', text: '#FAF7F2',
  muted: '#CDC3D6', border: '#65576F', brand: '#D0B9FF', soft: '#3D3051',
  action: '#C9AFF8', onAction: '#201A2B', focus: '#DBAC2C',
}
