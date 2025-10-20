import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import {
  Building2,
  Plus,
  Upload,
  Coins,
  Users,
  PieChart,
} from 'lucide-react';
import PropertyList from '@/components/PropertyList';

interface Property {
  id: string;
  registryNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  area: number;
  propertyType: string;
  status: string;
  tokenId?: number;
  isFractionalized: boolean;
  totalFractions?: number;
  createdAt: string;
  documents?: any[];
}

export default function RealEstateDashboard() {
  const { user } = useAuthStore();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    registryNumber: '',
    registryOffice: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    area: '',
    propertyType: 'Residencial',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await api.get('/properties', { withCredentials: true });
      setProperties(response.data.data.properties || []);
    } catch (error: any) {
      console.error('Error fetching properties:', error);
      toast.error('Erro ao carregar propriedades');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/properties', {
        ...formData,
        area: parseInt(formData.area) * 100, // Convert to m² * 100
      }, { withCredentials: true });

      toast.success('Propriedade criada com sucesso!');
      setShowCreateModal(false);
      fetchProperties();
      // Reset form
      setFormData({
        registryNumber: '',
        registryOffice: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        area: '',
        propertyType: 'Residencial',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao criar propriedade');
    }
  };

  const stats = {
    total: properties.length,
    tokenized: properties.filter(p => p.status === 'TOKENIZED' || p.status === 'FRACTIONALIZED').length,
    fractionalized: properties.filter(p => p.isFractionalized).length,
    pending: properties.filter(p => p.status === 'PENDING' || p.status === 'VALIDATING').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Painel de Tokenização</h1>
        <p className="text-base-content/70">
          Bem-vindo, <span className="font-semibold">{user?.name}</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-primary">
            <Building2 className="w-8 h-8" />
          </div>
          <div className="stat-title">Total de Propriedades</div>
          <div className="stat-value text-primary">{stats.total}</div>
        </div>

        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-success">
            <Coins className="w-8 h-8" />
          </div>
          <div className="stat-title">Tokenizadas</div>
          <div className="stat-value text-success">{stats.tokenized}</div>
        </div>

        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-secondary">
            <PieChart className="w-8 h-8" />
          </div>
          <div className="stat-title">Fracionadas</div>
          <div className="stat-value text-secondary">{stats.fractionalized}</div>
        </div>

        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-warning">
            <Upload className="w-8 h-8" />
          </div>
          <div className="stat-title">Pendentes</div>
          <div className="stat-value text-warning">{stats.pending}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Propriedade
        </button>
        <button className="btn btn-outline">
          <Users className="w-5 h-5 mr-2" />
          Gerenciar Convites
        </button>
      </div>

      {/* Properties List */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Minhas Propriedades</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <PropertyList properties={properties} />
        )}
      </div>

      {/* Create Property Modal */}
      {showCreateModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Cadastrar Nova Propriedade</h3>
            <form onSubmit={handleCreateProperty} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Número da Matrícula *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.registryNumber}
                    onChange={(e) => setFormData({ ...formData, registryNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Cartório</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.registryOffice}
                    onChange={(e) => setFormData({ ...formData, registryOffice: e.target.value })}
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text">Endereço *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Cidade *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Estado *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    maxLength={2}
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">CEP *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Área (m²) *</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text">Tipo de Imóvel *</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    required
                  >
                    <option>Residencial</option>
                    <option>Comercial</option>
                    <option>Industrial</option>
                    <option>Rural</option>
                    <option>Terreno</option>
                  </select>
                </div>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
