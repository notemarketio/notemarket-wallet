import { fromUnitInteger } from '@/shared/utils';
import { colors } from '@/ui/theme/colors';
import { shortUtxo } from '@/ui/utils';

import { Column } from '../Column';
import { N20Tick } from '../N20Tick';
import { Row } from '../Row';
import { Text } from '../Text';

export interface N20UTXOPreviewProps {
  tick: string;
  decimals: number;
  amount: string;
  txid: string;
  vout: number;
  value: number;
  selected?: boolean;
  selectable?: boolean;
  onClick?: () => void;
  preset?: 'small' | 'medium' | 'large';
}

export default function N20UTXOPreview({
  tick,
  decimals,
  amount,
  txid,
  vout,
  selected,
  onClick,
  preset
}: N20UTXOPreviewProps) {
  let balanceSize = 'xxl';
  if (amount.length < 7) {
    balanceSize = 'md';
  } else if (amount.length < 14) {
    balanceSize = 'md';
  } else if (amount.length < 21) {
    balanceSize = 'md';
  } else {
    balanceSize = 'sm';
  }

  let width = 100;
  let height = 130;
  let bodyHeight = 90;
  let numberSize: any = 'xs';
  let tickerPreset: any = 'md';
  if (preset === 'small') {
    width = 80;
    height = 90;
    bodyHeight = 60;
    numberSize = 'xxs';
    balanceSize = 'sm';
    tickerPreset = 'sm';
  }

  const bg = 'n20_utxo';

  return (
    <Column
      style={{
        backgroundColor: colors.bg4,
        width,
        height,
        minWidth: width,
        minHeight: height,
        borderRadius: 5,
        borderWidth: selected ? 1 : 0,
        borderColor: colors.primary
      }}
      gap="zero"
      onClick={onClick}>
      <Row
        bg={bg}
        style={{
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5
        }}>
        <Row
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderBottomRightRadius: 5, borderTopLeftRadius: 5 }}
          px="sm">
          <N20Tick tick={tick} preset={tickerPreset} />
        </Row>
      </Row>
      <Column
        style={{
          height: bodyHeight
        }}
        justifyCenter
        bg={bg}>
        <Text text={fromUnitInteger(amount, decimals)} size={balanceSize as any} textCenter wrap />
      </Column>

      <Column px="sm" pb="sm" gap="sm" py="sm">
        <Row itemsCenter justifyCenter>
          <Text text={`${shortUtxo(txid, vout)}`} color="primary" size={numberSize} />
        </Row>
      </Column>
    </Column>
  );
}
