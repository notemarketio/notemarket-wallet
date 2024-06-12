import { bitcoin } from '@notemarket/wallet-sdk/lib/bitcoin-core';
import { toPsbtNetwork } from '@notemarket/wallet-sdk/lib/network';
import { toXOnly } from '@notemarket/wallet-sdk/lib/utils';

import { NetworkType } from '../types';

const NOTE_PROTOCOL_ENVELOPE_ID = 'NOTE';

const buildNoteScript = (pubkey: Buffer) => {
  const scriptASM = `${Buffer.from(NOTE_PROTOCOL_ENVELOPE_ID, 'utf8').toString(
    'hex'
  )} OP_2DROP OP_2DROP OP_2DROP ${pubkey.toString('hex')} OP_CHECKSIG`;
  return scriptASM;
};

export const generateP2TRNoteInfo = (pubkey: Buffer, networkType: NetworkType) => {
  const xOnlyPubkey = toXOnly(pubkey);

  const network = toPsbtNetwork(networkType);

  //note
  const noteScript = bitcoin.script.fromASM(buildNoteScript(xOnlyPubkey));

  // deprecated
  const deprecatedP2PKScript = bitcoin.script.fromASM(`${pubkey.toString('hex')} OP_CHECKSIG`);

  //burn
  const p2pkScript = bitcoin.script.fromASM(`${xOnlyPubkey.toString('hex')} OP_CHECKSIG`);

  const deprecatedScriptTree: [{ output: Buffer }, { output: Buffer }] = [
    {
      output: noteScript
    },
    {
      output: deprecatedP2PKScript
    }
  ];
  const deprecatedScriptP2TR = bitcoin.payments.p2tr({
    internalPubkey: xOnlyPubkey,
    scriptTree: deprecatedScriptTree,
    network
  });

  const scriptTree: [{ output: Buffer }, { output: Buffer }] = [
    {
      output: noteScript
    },
    {
      output: p2pkScript
    }
  ];
  const scriptP2TR = bitcoin.payments.p2tr({
    internalPubkey: xOnlyPubkey,
    scriptTree,
    network
  });

  const noteRedeem = {
    output: noteScript,
    redeemVersion: 192
  };
  const p2pkRedeem = {
    output: p2pkScript,
    redeemVersion: 192
  };
  const deprecatedP2PKRedeem = {
    output: deprecatedP2PKScript,
    redeemVersion: 192
  };

  const p2pkP2TR = bitcoin.payments.p2tr({
    internalPubkey: xOnlyPubkey,
    scriptTree,
    redeem: p2pkRedeem,
    network
  });
  const deprecatedP2PKP2TR = bitcoin.payments.p2tr({
    internalPubkey: xOnlyPubkey,
    scriptTree: deprecatedScriptTree,
    redeem: deprecatedP2PKRedeem,
    network
  });

  const noteP2TR = bitcoin.payments.p2tr({
    internalPubkey: xOnlyPubkey,
    scriptTree,
    redeem: noteRedeem,
    network
  });

  const deprecatedNoteP2TR = bitcoin.payments.p2tr({
    internalPubkey: xOnlyPubkey,
    scriptTree: deprecatedScriptTree,
    redeem: noteRedeem,
    network
  });

  // with SHA256 hash
  const scriptHash = bitcoin.crypto.sha256(scriptP2TR.output!).reverse().toString('hex');
  const deprecatedScriptHash = bitcoin.crypto.sha256(deprecatedP2PKP2TR.output!).reverse().toString('hex');

  return {
    address: scriptP2TR.address!,
    script: scriptP2TR.output!.toString('hex'),
    scriptHash,
    scriptP2TR: scriptP2TR,
    noteP2TR: noteP2TR,
    p2pkP2TR: p2pkP2TR,
    noteRedeem: noteRedeem,
    p2pkRedeem: p2pkRedeem,

    // deprecated
    deprecatedAddress: deprecatedP2PKP2TR.address!,
    deprecatedScript: deprecatedP2PKP2TR.output!.toString('hex'),
    deprecatedScriptHash,
    deprecatedNoteP2TR,
    deprecatedP2PKP2TR
  };
};
