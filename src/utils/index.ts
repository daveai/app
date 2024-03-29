import { getAddress, isAddress } from '@ethersproject/address';
import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import { JsonRpcSigner, Web3Provider, JsonRpcProvider } from '@ethersproject/providers';
export * from './explorer';

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, charsBefore = 4, charsAfter = 4): string {
  const parsed = getAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, charsBefore + 2)}...${parsed.substring(42 - charsAfter)}`;
}

// account is not optional
export function getSigner(library: Web3Provider | JsonRpcProvider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  provider: Web3Provider | JsonRpcProvider,
  account?: string
): Web3Provider | JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(provider, account) : provider;
}

/**
 * Creates and returns a contract instance
 * @param address The address of the contract to use
 * @param ABI The ABI of the contract to use
 * @param provider The provider to use
 * @param account The account to use
 * @returns
 */
export function getContract<T = Contract>(address: string, ABI: any, provider: Web3Provider, account?: string): T {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  const contract = new Contract(address, ABI, getProviderOrSigner(provider, account)) as unknown;

  return contract as T;
}
