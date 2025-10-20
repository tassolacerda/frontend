import { useEffect, useState } from 'react';
import { kycService, KYCStatus } from '@/services/kycService';
import KYCStatusBadge from '@/components/KYCStatusBadge';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Upload, FileCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function KYC() {
  const [kycStatus, setKycStatus] = useState<KYCStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('RG');

  useEffect(() => {
    loadKYCStatus();
  }, []);

  const loadKYCStatus = async () => {
    try {
      const data = await kycService.getStatus();
      setKycStatus(data);
    } catch (error) {
      console.error('Failed to load KYC status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Selecione um arquivo');
      return;
    }

    setUploading(true);

    try {
      // Em produção: fazer upload para IPFS
      // Simulação de hash IPFS
      const mockIpfsHash = 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco';

      await kycService.submitDocument(documentType, mockIpfsHash);

      toast.success('Documento enviado com sucesso!');
      setSelectedFile(null);
      loadKYCStatus();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao enviar documento');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2">KYC - Verificação de Identidade</h1>
      <p className="text-lg opacity-70 mb-8">
        Complete sua verificação para poder tokenizar imóveis
      </p>

      {/* Status Card */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title">Status da Verificação</h2>
            {kycStatus && <KYCStatusBadge status={kycStatus.status} size="lg" />}
          </div>

          {kycStatus?.status === 'APPROVED' && (
            <div className="alert alert-success">
              <CheckCircle2 className="w-6 h-6" />
              <div>
                <h3 className="font-bold">KYC Aprovado!</h3>
                <div className="text-sm">
                  Verificado em {new Date(kycStatus.verifiedAt!).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}

          {kycStatus?.status === 'REJECTED' && (
            <div className="alert alert-error">
              <AlertCircle className="w-6 h-6" />
              <div>
                <h3 className="font-bold">KYC Rejeitado</h3>
                <div className="text-sm">
                  Entre em contato com o suporte para mais informações
                </div>
              </div>
            </div>
          )}

          {kycStatus?.status === 'IN_REVIEW' && (
            <div className="alert alert-info">
              <FileCheck className="w-6 h-6" />
              <div>
                <h3 className="font-bold">Em Análise</h3>
                <div className="text-sm">
                  Seu documento está sendo revisado. Aguarde até 48h úteis.
                </div>
              </div>
            </div>
          )}

          {/* Documents List */}
          {kycStatus && kycStatus.documents.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold mb-3">Documentos Enviados</h3>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Status</th>
                      <th>Enviado em</th>
                      <th>Revisado em</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kycStatus.documents.map((doc) => (
                      <tr key={doc.id}>
                        <td>{doc.type}</td>
                        <td>
                          <KYCStatusBadge status={doc.status} size="sm" />
                        </td>
                        <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                        <td>
                          {doc.reviewedAt
                            ? new Date(doc.reviewedAt).toLocaleDateString()
                            : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Form */}
      {kycStatus?.status !== 'APPROVED' && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <Upload className="w-6 h-6" />
              Enviar Documento
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tipo de Documento</span>
                </label>
                <select
                  className="select select-bordered"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                >
                  <option value="RG">RG</option>
                  <option value="CNH">CNH</option>
                  <option value="Passaporte">Passaporte</option>
                  <option value="Comprovante Residencia">
                    Comprovante de Residência
                  </option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Arquivo</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
                <label className="label">
                  <span className="label-text-alt">
                    Formatos aceitos: JPG, PNG, PDF (máx. 5MB)
                  </span>
                </label>
              </div>

              {selectedFile && (
                <div className="alert">
                  <FileCheck className="w-5 h-5" />
                  <span>
                    Arquivo selecionado: {selectedFile.name} (
                    {(selectedFile.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
              )}

              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className={`btn btn-primary ${uploading ? 'loading' : ''}`}
                  disabled={!selectedFile || uploading}
                >
                  {uploading ? 'Enviando...' : 'Enviar Documento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="alert alert-info mt-8">
        <AlertCircle className="w-6 h-6" />
        <div className="text-sm">
          <p className="font-bold">Informação de Privacidade</p>
          <p>
            Seus documentos são armazenados de forma segura em IPFS. Apenas um hash
            criptográfico é registrado na blockchain, preservando sua privacidade.
          </p>
        </div>
      </div>
    </div>
  );
}
