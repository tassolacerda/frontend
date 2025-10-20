import { api } from '@/lib/api';

export interface KYCDocument {
  id: string;
  type: string;
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

export interface KYCStatus {
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
  kycHash?: string;
  verifiedAt?: string;
  documents: KYCDocument[];
}

export const kycService = {
  async submitDocument(documentType: string, documentHash: string) {
    const response = await api.post('/kyc/submit', {
      documentType,
      documentHash,
    });
    return response.data;
  },

  async getStatus(): Promise<KYCStatus> {
    const response = await api.get('/kyc/status');
    return response.data.data;
  },

  async getPendingDocuments() {
    const response = await api.get('/kyc/pending');
    return response.data.data;
  },

  async reviewDocument(
    documentId: string,
    approved: boolean,
    rejectionReason?: string
  ) {
    const response = await api.post(`/kyc/review/${documentId}`, {
      approved,
      rejectionReason,
    });
    return response.data;
  },
};
