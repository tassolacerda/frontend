import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { propertyService, Property } from '@/services/propertyService';
import { kycService, KYCStatus } from '@/services/kycService';
import PropertyCard from '@/components/PropertyCard';
import KYCStatusBadge from '@/components/KYCStatusBadge';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Link } from 'react-router-dom';
import {
  Building2,
  Wallet,
  FileCheck,
  TrendingUp,
  PlusCircle,
  AlertCircle,
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [properties, setProperties] = useState<Property[]>([]);
  const [kycStatus, setKycStatus] = useState<KYCStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [propertiesData, kycData] = await Promise.all([
        propertyService.getMyProperties(),
        kycService.getStatus(),
      ]);

      setProperties(propertiesData);
      setKycStatus(kycData);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const tokenizedProperties = properties.filter((p) => p.status === 'TOKENIZED');
  const fractionalizedProperties = properties.filter((p) => p.isFractionalized);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Bem-vindo, {user?.fullName?.split(' ')[0]}! 👋
        </h1>
        <p className="text-lg opacity-70">Gerencie seus imóveis tokenizados</p>
      </div>

      {/* KYC Alert */}
      {kycStatus && kycStatus.status !== 'APPROVED' && (
        <div className="alert alert-warning shadow-lg mb-8">
          <AlertCircle className="w-6 h-6" />
          <div>
            <h3 className="font-bold">KYC Pendente</h3>
            <div className="text-sm">
              Você precisa completar o KYC para tokenizar imóveis.
            </div>
          </div>
          <Link to="/kyc" className="btn btn-sm">
            Completar KYC
          </Link>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat bg-base-100 shadow-xl rounded-lg">
          <div className="stat-figure text-primary">
            <Building2 className="w-8 h-8" />
          </div>
          <div className="stat-title">Total de Imóveis</div>
          <div className="stat-value text-primary">{properties.length}</div>
          <div className="stat-desc">Cadastrados na plataforma</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-lg">
          <div className="stat-figure text-secondary">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="stat-title">Tokenizados</div>
          <div className="stat-value text-secondary">{tokenizedProperties.length}</div>
          <div className="stat-desc">NFTs na blockchain</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-lg">
          <div className="stat-figure text-accent">
            <Wallet className="w-8 h-8" />
          </div>
          <div className="stat-title">Fracionados</div>
          <div className="stat-value text-accent">{fractionalizedProperties.length}</div>
          <div className="stat-desc">Em tokens ERC-20</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-lg">
          <div className="stat-figure">
            <FileCheck className="w-8 h-8" />
          </div>
          <div className="stat-title">Status KYC</div>
          <div className="stat-value text-sm">
            {kycStatus && <KYCStatusBadge status={kycStatus.status} size="lg" />}
          </div>
          <div className="stat-desc">
            {kycStatus?.verifiedAt
              ? `Verificado em ${new Date(kycStatus.verifiedAt).toLocaleDateString()}`
              : 'Aguardando verificação'}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-8">
        <Link to="/properties/new" className="btn btn-primary gap-2">
          <PlusCircle className="w-5 h-5" />
          Cadastrar Imóvel
        </Link>
        {kycStatus?.status === 'APPROVED' && properties.some((p) => p.status === 'APPROVED') && (
          <Link to="/tokenize" className="btn btn-secondary gap-2">
            <Wallet className="w-5 h-5" />
            Tokenizar Imóvel
          </Link>
        )}
      </div>

      {/* Properties List */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Meus Imóveis</h2>

        {properties.length === 0 ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center py-12">
              <Building2 className="w-16 h-16 text-primary opacity-50 mb-4" />
              <h3 className="card-title">Nenhum imóvel cadastrado</h3>
              <p className="opacity-70 mb-4">
                Comece cadastrando seu primeiro imóvel para tokenização
              </p>
              <Link to="/properties/new" className="btn btn-primary">
                Cadastrar Imóvel
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      {/* Wallet Info */}
      {user?.walletAddress && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <Wallet className="w-6 h-6" />
              Sua Wallet MPC
            </h2>
            <div className="bg-base-200 rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center justify-between">
                <span className="opacity-70">Endereço:</span>
                <span className="font-semibold">{user.walletAddress}</span>
              </div>
            </div>
            <p className="text-sm opacity-70 mt-2">
              Sua wallet é gerenciada com custódia MPC (Multi-Party Computation) para
              máxima segurança. As chaves são divididas em 3 shares com threshold 2-of-3.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
