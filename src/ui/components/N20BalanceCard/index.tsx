import { Tooltip } from 'antd';

import { N20Balance } from '@/shared/types';
import { fromUnitInteger } from '@/shared/utils';
import { fontSizes } from '@/ui/theme/font';

import { Card } from '../Card';
import { Column } from '../Column';
import { Icon } from '../Icon';
import { N20Tick } from '../N20Tick';
import { Row } from '../Row';
import { Text } from '../Text';

export function N20BalanceCard({
  balance: { tick, decimals, confirmed, unconfirmed, needUpgrade },
  onClick
}: {
  balance: N20Balance;
  onClick?: () => void;
}) {
  const overallBalance = BigInt(confirmed) + BigInt(unconfirmed);

  return (
    <Card
      style={{
        backgroundColor: '#141414',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1
      }}
      fullX
      onClick={() => {
        onClick && onClick();
      }}>
      <Column full py="zero" gap="zero">
        <Row fullY justifyBetween justifyCenter>
          <Column fullY justifyCenter>
            <N20Tick tick={tick} />
          </Column>

          <Row itemsCenter fullY gap="xs">
            <Text text={fromUnitInteger(overallBalance.toString(), decimals)} size="xs" />
            {needUpgrade && (
              <Tooltip
                title="Need Upgrade"
                placement="top"
                overlayStyle={{
                  fontSize: fontSizes.xs
                }}>
                <div>
                  <Icon
                    icon="warning"
                    style={{
                      width: 16,
                      height: 16
                    }}
                  />
                </div>
              </Tooltip>
            )}
          </Row>
        </Row>
      </Column>
    </Card>
  );
}
