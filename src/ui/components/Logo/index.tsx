import { fontSizes } from '@/ui/theme/font';

import { Image } from '../Image';
import { Row } from '../Row';
import { Text } from '../Text';

export function Logo(props: { preset?: 'large' | 'small' }) {
  const { preset } = props;
  if (preset === 'large') {
    return (
      <Row justifyCenter itemsCenter>
        <Image src="./images/logo/notemarket-wallet.png" size={fontSizes.xxxl} />

        <Text text="NOTE Market Wallet" preset="title-bold" size="xl" disableTranslate />
      </Row>
    );
  } else {
    return (
      <Row justifyCenter itemsCenter>
        <Image src="./images/logo/notemarket-wallet.png" size={fontSizes.xxl} />
        <Text text="NOTE Market Wallet" preset="title-bold" size="sm" disableTranslate />
      </Row>
    );
  }
}
