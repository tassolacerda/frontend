import { api } from '@/lib/api';

export interface TokenizationRequest {
  propertyId: string;
  multipleOwners?: {
    address: string;
    sharePercent: number;
  }[];
}

export interface TokenizationResult {
  tokenId: number;
  txHash: string;
  contractAddress: string;
  blockNumber: number;
}

export interface FractionalizationRequest {
  propertyId: string;
  totalFractions: number;
  fractionName: string;
  fractionSymbol: string;
}

export const tokenizationService = {
  async tokenizeProperty(data: TokenizationRequest): Promise<TokenizationResult> {
    const response = await api.post('/tokenization/tokenize', data);
    return response.data.data;
  },

  async fractionalizeProperty(data: FractionalizationRequest) {
    const response = await api.post('/tokenization/fractionalize', data);
    return response.data.data;
  },
};
