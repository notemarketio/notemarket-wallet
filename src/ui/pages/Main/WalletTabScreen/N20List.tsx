import { useEffect, useState } from 'react';

import { N20Balance } from '@/shared/types';
import { Column, Row } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { Empty } from '@/ui/components/Empty';
import { N20BalanceCard } from '@/ui/components/N20BalanceCard';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useWallet } from '@/ui/utils';
import { LoadingOutlined } from '@ant-design/icons';

import { useNavigate } from '../../MainRoute';

export function N20List() {
  const navigate = useNavigate();
  const wallet = useWallet();
  const currentAccount = useCurrentAccount();

  const [fetching, setFetching] = useState<boolean>(false);
  const [tokens, setTokens] = useState<N20Balance[]>([]);

  const tools = useTools();
  const fetchData = async () => {
    try {
      setFetching(true);
      const list = await wallet.getN20List(currentAccount);
      setTokens(list);
    } catch (e) {
      tools.toastError((e as Error).message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentAccount.address]);

  if (fetching) {
    return (
      <Column style={{ minHeight: 150 }} itemsCenter justifyCenter>
        <LoadingOutlined />
      </Column>
    );
  }

  if (tokens.length === 0) {
    return (
      <Column style={{ minHeight: 150 }} itemsCenter justifyCenter>
        <Empty text="Empty" />
      </Column>
    );
  }

  return (
    <Column>
      <Row style={{ flexWrap: 'wrap' }} gap="sm">
        {tokens.map((t, index) => (
          <N20BalanceCard balance={t} key={index} />
        ))}
      </Row>
    </Column>
  );
}
