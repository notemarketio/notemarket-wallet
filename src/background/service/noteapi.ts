import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

import { NOTEAddressType, NetworkType } from '@/shared/types';

import { preferenceService } from '.';
import { createPersistStore } from '../utils';

const API_ENDPOINT = 'https://btc.urchain.com/api';
const TESTNET_API_ENDPOINT = 'https://btc-testnet4.urchain.com/api';
const URCHAIN_KEY = '1234567890';

export class NoteApiService {
  store!: {
    endpoint: string;
    apiKey: string;
  };

  init = async () => {
    this.store = await createPersistStore({
      name: 'noteapi',
      template: {
        endpoint: API_ENDPOINT,
        apiKey: URCHAIN_KEY
      }
    });

    const networkType = preferenceService.getNetworkType();
    this.switchNetwork(networkType);
  };

  switchNetwork = (networkType: NetworkType) => {
    if (networkType === NetworkType.MAINNET) {
      this.store.endpoint = API_ENDPOINT;
    } else {
      this.store.endpoint = TESTNET_API_ENDPOINT;
    }
  };

  async balance(scriptHash: string) {
    const data = await this.request<{
      confirmed: string;
      unconfirmed: string;
    }>('POST', '/balance', {
      data: {
        scriptHash
      }
    });
    return data;
  }

  async utxos(scriptHash: string) {
    const data = await this.request<
      {
        address: string;
        txId: string;
        outputIndex: number;
        height: number;
        satoshis: number;
        script: string;
        scriptHash: string;
        type: NOTEAddressType;
        time: number;
      }[]
    >('POST', '/utxos', {
      data: {
        scriptHashs: [scriptHash]
      }
    });

    return data;
  }

  async tokenList(scriptHash: string) {
    const data = await this.request<
      {
        tick: string;
        confirmed: string;
        unconfirmed: string;
        scriptHash: string;
        dec: number;
        p: string;
        needUpgrade?: boolean;
      }[]
    >('POST', '/token-list', {
      data: {
        scriptHash
      }
    });

    return data;
  }

  async tokenInfo(tick: string) {
    const data = await this.request<{
      inpoint: string;
      blockchain: string;
      txId: string;
      inputIndex: number;
      height: number;
      accountId: string;
      address: string;
      p: string;
      tick: string;
      max: number;
      lim: number;
      dec: number;
      sch: string;
    }>('POST', '/token-info', {
      data: {
        tick
      }
    });

    return data;
  }

  async tokenUTXOs(tick: string, scriptHash: string | string[]) {
    const data = await this.request<
      {
        txId: string;
        outputIndex: number;
        satoshis: number;
        script: string;
        holder: string;
        amount: string;
        height: number;
        tick: string;
        time: number;
      }[]
    >('POST', '/token-utxos', {
      data: {
        scriptHashs: Array.isArray(scriptHash) ? scriptHash : [scriptHash],
        tick
      }
    });

    return data;
  }

  async pushTx(rawHex: string) {
    const data = await this.request<
      | {
          success: true;
          txId: string;
        }
      | {
          success: false;
          error:
            | {
                code: number;
                message: string;
              }
            | string;
        }
    >('POST', '/broadcast', {
      data: {
        rawHex
      }
    });

    if (!data.success) {
      throw new Error(typeof data.error === 'string' ? data.error : data.error?.message || 'Unknown error');
    }

    return data;
  }

  async request<T>(method: string, path: string, config?: AxiosRequestConfig) {
    try {
      const resp = await axios.request<T>({
        ...config,
        url: `${this.store.endpoint}${path}`,
        method,
        timeout: 10000,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${this.store.apiKey}`
        }
      });

      return resp.data;
    } catch (e) {
      if (isAxiosError(e)) {
        const data: {
          message: string;
          code: string;
          issues: {
            message: string;
          }[];
        } = e.response?.data;
        throw new Error(data ? data.message : e.message);
      }
      throw e;
    }
  }
}

export const noteApiService = new NoteApiService();
