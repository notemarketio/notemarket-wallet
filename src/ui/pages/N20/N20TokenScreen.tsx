import { useEffect, useMemo, useState } from 'react';

import { N20Balance, N20UTXO } from '@/shared/types';
import { fromUnitInteger } from '@/shared/utils';
import { Button, Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { Empty } from '@/ui/components/Empty';
import { N20Tick } from '@/ui/components/N20Tick';
import N20UTXOPreview from '@/ui/components/N20UTXOPreview';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useNOTEExplorerUrl, useNOTEMarketUrl } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { useLocationState, useWallet } from '@/ui/utils';
import { LoadingOutlined } from '@ant-design/icons';

interface LocationState {
  tick: string;
  balance: N20Balance;
}

export default function N20TokenScreen() {
  const { tick, balance } = useLocationState<LocationState>();

  const [utxos, setUTXOs] = useState<N20UTXO[]>([]);

  const wallet = useWallet();

  const account = useCurrentAccount();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUTXOs();
  }, []);

  const fetchUTXOs = async () => {
    try {
      setLoading(true);
      const utxos = await wallet.getN20UTXOs(account, tick);
      setUTXOs(utxos);
    } catch (e) {
      // TODO something
    } finally {
      setLoading(false);
    }
  };

  const enableMint = useMemo(() => {
    return false;
  }, []);

  const enableTransfer = useMemo(() => {
    let enable = false;
    if (BigInt(balance.confirmed) > BigInt(0)) {
      enable = true;
    }
    return enable;
  }, [balance]);

  const overallBalance = BigInt(balance.confirmed) + BigInt(balance.unconfirmed);

  const explorerUrl = useNOTEExplorerUrl();
  const notemarketUrl = useNOTEMarketUrl();

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
      />
      <Content>
        <Column py="xl" style={{ borderBottomWidth: 1, borderColor: colors.white_muted }}>
          <Row itemsCenter fullX justifyCenter>
            <Text
              text={fromUnitInteger(overallBalance.toString(), balance.decimals)}
              preset="bold"
              textCenter
              size="xxl"
              wrap
            />
            <N20Tick tick={tick} preset="lg" />
          </Row>

          <Row justifyBetween mt="lg">
            <Button
              text="MINT"
              preset="primary"
              style={!enableMint ? { backgroundColor: 'grey' } : {}}
              disabled={!enableMint}
              icon="pencil"
              full
            />

            <Button
              text="TRANSFER"
              preset="primary"
              icon="send"
              style={!enableTransfer ? { backgroundColor: 'grey' } : {}}
              disabled={!enableTransfer}
              onClick={() => {
                window.open(`${notemarketUrl}/wallet?tick=${tick}&action=send`, '_blank');
              }}
              full
            />
          </Row>
        </Column>
        <Column>
          <Row justifyBetween>
            <Text text="UTXOs" preset="bold" size="md" />
          </Row>
          {utxos.length == 0 && (
            <Column style={{ minHeight: 130 }} itemsCenter justifyCenter>
              {loading ? (
                <Icon>
                  <LoadingOutlined />
                </Icon>
              ) : (
                <Empty text="Empty" />
              )}
            </Column>
          )}

          <Row overflowX>
            {utxos.map((u) => (
              <N20UTXOPreview
                key={`${u.txid}:${u.vout}`}
                tick={tick}
                decimals={balance.decimals}
                amount={u.amount}
                txid={u.txid}
                vout={u.vout}
                value={u.value}
                onClick={async () => {
                  window.open(`${explorerUrl}/transaction?txId=${u.txid}`, '_blank');
                }}
              />
            ))}
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
