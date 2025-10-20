import { api } from '@/lib/api';

export interface Property {
  id: string;
  registryNumber: string;
  address: string;
  city: string;
  state: string;
  area: number;
  propertyType: string;
  status: 'PENDING' | 'VALIDATING' | 'APPROVED' | 'TOKENIZED' | 'FRACTIONALIZED';
  tokenId?: number;
  contractAddress?: string;
  txHash?: string;
  isFractionalized: boolean;
  tokenizedAt?: string;
}

export const propertyService = {
  async registerProperty(data: Partial<Property>) {
    const response = await api.post('/properties/register', data);
    return response.data;
  },

  async getMyProperties(): Promise<Property[]> {
    const response = await api.get('/properties/my-properties');
    return response.data.data;
  },

  async getPropertyById(id: string): Promise<Property> {
    const response = await api.get(`/properties/${id}`);
    return response.data.data;
  },

  async uploadDocument(propertyId: string, documentType: string, ipfsHash: string) {
    const response = await api.post(`/properties/${propertyId}/upload-document`, {
      documentType,
      ipfsHash,
    });
    return response.data;
  },
};
