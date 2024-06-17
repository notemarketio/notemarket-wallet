import axios, { AxiosRequestConfig } from 'axios';

import { NetworkType } from '@/shared/types';

export class MempoolApi {
  endpoint: string;

  constructor(networkType: NetworkType) {
    this.endpoint =
      networkType === NetworkType.MAINNET ? 'https://mempool.space/api' : 'https://mempool.space/testnet4/api';
  }

  async pushTx(txHex: string) {
    const txid = await this.request<string>('POST', '/tx', {
      data: txHex
    });

    return txid;
  }

  async getRecommendedFees() {
    const fees = await this.request<{
      fastestFee: number;
      halfHourFee: number;
      hourFee: number;
      economyFee: number;
      minimumFee: number;
    }>('GET', '/v1/fees/recommended');

    return fees;
  }

  async request<T>(method: string, path: string, config?: AxiosRequestConfig) {
    const resp = await axios.request<T>({
      ...config,
      url: `${this.endpoint}${path}`,
      method,
      timeout: 5000
    });

    const result = resp.data;
    return result;
  }
}
