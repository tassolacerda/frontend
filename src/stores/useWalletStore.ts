import { create } from 'zustand';
import { ethers } from 'ethers';

interface WalletState {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;

  connect: () => Promise<void>;
  disconnect: () => void;
  switchChain: (chainId: number) => Promise<void>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  address: null,
  chainId: null,
  isConnected: false,
  provider: null,
  signer: null,

  connect: async () => {
    if (!window.ethereum) {
      throw new Error('MetaMask não instalado');
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();

      set({
        address: accounts[0],
        chainId: Number(network.chainId),
        isConnected: true,
        provider,
        signer,
      });

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          get().disconnect();
        } else {
          set({ address: accounts[0] });
        }
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  },

  disconnect: () => {
    set({
      address: null,
      chainId: null,
      isConnected: false,
      provider: null,
      signer: null,
    });
  },

  switchChain: async (chainId: number) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      // Chain not added
      if (error.code === 4902) {
        throw new Error('Please add this network to MetaMask');
      }
      throw error;
    }
  },
}));

// Type augmentation for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
