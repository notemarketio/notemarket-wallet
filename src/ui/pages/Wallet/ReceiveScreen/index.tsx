import { Tabs } from 'antd';
import QRCode from 'qrcode.react';

import { AddressBar, Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { sizes } from '@/ui/theme/spacing';

import './index.less';

const AddressQRCode = ({ noteAddress }: { noteAddress?: boolean }) => {
  const currentAccount = useCurrentAccount();

  const address = noteAddress ? currentAccount.noteInfo.address : currentAccount.address;
  const alianName = currentAccount.alianName;

  return (
    <Column gap="xl" mt="lg">
      <Column
        justifyCenter
        rounded
        style={{ backgroundColor: 'white', alignSelf: 'center', alignItems: 'center', padding: 10 }}>
        <QRCode value={address || ''} renderAs="svg" size={sizes.qrcode}></QRCode>
      </Column>

      <Row justifyCenter>
        <Icon icon="user" />
        <Text preset="regular-bold" text={alianName} />
      </Row>
      <AddressBar noteAddress={noteAddress} />
    </Column>
  );
};

export default function ReceiveScreen() {
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Receive"
      />
      <Content>
        <Tabs
          size={'small'}
          defaultActiveKey="btc"
          centered
          items={[
            {
              label: 'Receive BTC',
              key: 'btc',
              children: <AddressQRCode />
            },
            {
              label: 'Receive Token',
              key: 'note',
              children: <AddressQRCode noteAddress />
            }
          ]}
        />
      </Content>
    </Layout>
  );
}
