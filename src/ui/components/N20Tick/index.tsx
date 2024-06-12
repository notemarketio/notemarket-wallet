import { useMemo } from 'react';

import { Text } from '../Text';

const $tickerPresets: { sm: { textSize: any }; md: { textSize: any }; lg: { textSize: any } } = {
  sm: {
    textSize: 'xs'
  },
  md: {
    textSize: 'sm'
  },
  lg: {
    textSize: 'md'
  }
};

type Presets = keyof typeof $tickerPresets;

export function N20Tick({ tick, preset }: { tick: string | undefined; preset?: Presets }) {
  const style = $tickerPresets[preset || 'md'];
  return useMemo(() => {
    if (!tick) return <></>;
    return <Text text={tick} size={style.textSize} color="gold" />;
  }, [tick]);
}
