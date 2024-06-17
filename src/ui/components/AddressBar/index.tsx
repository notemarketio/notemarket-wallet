import { Tooltip } from 'antd';

import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { fontSizes } from '@/ui/theme/font';
import { copyToClipboard, shortAddress } from '@/ui/utils';
import { CopyOutlined } from '@ant-design/icons';

import { useTools } from '../ActionComponent';
import { Row } from '../Row';
import { Text } from '../Text';

export function AddressBar({ noteAddress }: { noteAddress?: boolean }) {
  const tools = useTools();
  const currentAccount = useCurrentAccount();

  const label = noteAddress
    ? {
        icon: './images/icons/noteprotocol.jpeg',
        tip: 'Token Address'
      }
    : {
        icon: './images/icons/bitcoin-colorful.svg',
        tip: 'Main Address'
      };
  const address = noteAddress ? currentAccount.noteInfo.address : currentAccount.address;

  return (
    <Row
      selfItemsCenter
      itemsCenter
      onClick={(e) => {
        copyToClipboard(address).then(() => {
          tools.toastSuccess('Copied');
        });
      }}>
      <Tooltip
        title={label.tip}
        placement="bottom"
        overlayStyle={{
          fontSize: fontSizes.xs
        }}>
        <div>
          <Row itemsCenter gap="xs">
            <img
              src={label.icon}
              style={{
                width: 16,
                height: 16,
                borderRadius: 9999
              }}
              alt=""
            />
            <Text text={shortAddress(address)} color="textDim" />
          </Row>
        </div>
      </Tooltip>

      <CopyOutlined style={{ color: '#888', fontSize: 14 }} />
    </Row>
  );
}
