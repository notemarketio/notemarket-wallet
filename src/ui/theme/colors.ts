// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  white: '#ffffff',
  white_muted: 'rgba(255, 255, 255, 0.5)',
  black_muted: 'rgba(0, 0, 0, 0.5)',
  black_muted2: 'rgba(0, 0, 0, 0.)',

  dark: '#1E283C',
  grey: '#495361',
  light: '#A2A4AA',

  black: '#1f2937',
  black_dark: '#111827',

  green_dark2: '#2D7E24',
  green_dark: '#379a29',
  green: '#41B530',
  green_light: '#5ec04f',

  yellow_dark: '#d5ac00',
  yellow: '#e3bb5f',
  yellow_light: '#fcd226',

  red_dark: '#c92b40',
  red: '#ED334B',
  red_light: '#f05266',

  blue_dark: '#1461d1',
  blue: '#1872F6',
  blue_light: '#c6dcfd',

  orange_dark: '#d9691c',
  orange: '#FF7B21',
  orange_light: '#ff8f42',

  gold: '#5DACBD',
  primary: '#24527A',
  primary_dark: '#204a6e',

  success: '#064e3b',
  error: '#7f1d1d',
  warning: '#78350f'
};

export const colors = Object.assign({}, palette, {
  transparent: 'rgba(0, 0, 0, 0)',

  text: palette.white,

  textDim: palette.white_muted,

  background: '#D8E0EF',

  danger: palette.red,

  card: '#1f2937',
  primary: '#24527A',

  bg2: '#2a2a2a',
  bg3: '#434242',
  bg4: '#383535',

  border: 'rgba(255,255,255,0.1)',

  icon_yellow: '#FFBA33',

  brc20_deploy: '#233933',
  brc20_transfer: '#375e4d',
  brc20_transfer_selected: '#41B530',
  brc20_other: '#3e3e3e'
});

export type ColorTypes = keyof typeof colors;
