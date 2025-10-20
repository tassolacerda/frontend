import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import {
  Wallet,
  Building2,
  TrendingUp,
  DollarSign,
  Plus,
} from 'lucide-react';
import PropertyList from '@/components/PropertyList';

interface Property {
  id: string;
  registryNumber: string;
  address: string;
  city: string;
  state: string;
  area: number;
  propertyType: string;
  status: string;
  tokenId?: number;
  isFractionalized: boolean;
  totalFractions?: number;
  createdAt: string;
  owner?: {
    name: string;
    email: string;
  };
}

interface Deposit {
  id: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export default function BuyerDashboard() {
  const { user } = useAuthStore();
  const [properties, setProperties] = useState<Property[]>([]);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [balanceBRL, setBalanceBRL] = useState('0');
  const [loading, setLoading] = useState(true);
  const [showDepositModal, setShowDepositModal] = useState(false);

  // Deposit form
  const [depositForm, setDepositForm] = useState({
    amount: '',
    paymentMethod: 'PIX',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [propsRes, depositsRes, balanceRes] = await Promise.all([
        api.get('/properties', { withCredentials: true }),
        api.get('/deposits', { withCredentials: true }),
        api.get('/deposits/balance', { withCredentials: true }),
      ]);

      setProperties(propsRes.data.data.properties || []);
      setDeposits(depositsRes.data.data.deposits || []);
      setBalanceBRL(balanceRes.data.data.balanceBRL || '0');
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/deposits', depositForm, { withCredentials: true });
      toast.success('Depósito criado! Aguardando confirmação.');
      setShowDepositModal(false);
      fetchData();
      setDepositForm({ amount: '', paymentMethod: 'PIX' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao criar depósito');
    }
  };

  const getDepositStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      PENDING: 'badge-warning',
      CONFIRMED: 'badge-success',
      FAILED: 'badge-error',
      CANCELLED: 'badge-ghost',
    };
    return badges[status] || 'badge-ghost';
  };

  const stats = {
    balance: parseFloat(balanceBRL),
    properties: properties.length,
    pendingDeposits: deposits.filter(d => d.status === 'PENDING').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Painel de Compras</h1>
        <p className="text-base-content/70">
          Bem-vindo, <span className="font-semibold">{user?.name}</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg shadow-lg">
          <div className="stat-figure text-primary">
            <Wallet className="w-8 h-8" />
          </div>
          <div className="stat-title">Saldo Disponível</div>
          <div className="stat-value text-primary">
            R$ {stats.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="stat-desc">Para investir em imóveis</div>
        </div>

        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-success">
            <Building2 className="w-8 h-8" />
          </div>
          <div className="stat-title">Propriedades Disponíveis</div>
          <div className="stat-value text-success">{stats.properties}</div>
          <div className="stat-desc">Para você investir</div>
        </div>

        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-figure text-warning">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="stat-title">Depósitos Pendentes</div>
          <div className="stat-value text-warning">{stats.pendingDeposits}</div>
          <div className="stat-desc">Aguardando confirmação</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowDepositModal(true)}
          className="btn btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Depositar
        </button>
      </div>

      {/* Available Properties */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Propriedades Disponíveis</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : properties.length === 0 ? (
          <div className="alert alert-info">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Você ainda não foi convidado para nenhuma propriedade. Entre em contato com uma imobiliária para receber convites.</span>
            </div>
          </div>
        ) : (
          <PropertyList properties={properties} />
        )}
      </div>

      {/* Recent Deposits */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Histórico de Depósitos</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Data</th>
                <th>Valor</th>
                <th>Método</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {deposits.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center opacity-60">
                    Nenhum depósito realizado
                  </td>
                </tr>
              ) : (
                deposits.map((deposit) => (
                  <tr key={deposit.id}>
                    <td>{new Date(deposit.createdAt).toLocaleDateString('pt-BR')}</td>
                    <td>R$ {(parseFloat(deposit.amount) / 1e18).toFixed(2)}</td>
                    <td>{deposit.paymentMethod}</td>
                    <td>
                      <span className={`badge ${getDepositStatusBadge(deposit.status)}`}>
                        {deposit.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Depositar Fundos</h3>
            <form onSubmit={handleDeposit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Valor (R$)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="w-5 h-5 opacity-50" />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    className="input input-bordered w-full pl-10"
                    placeholder="1000.00"
                    value={depositForm.amount}
                    onChange={(e) => setDepositForm({ ...depositForm, amount: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Método de Pagamento</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={depositForm.paymentMethod}
                  onChange={(e) => setDepositForm({ ...depositForm, paymentMethod: e.target.value })}
                >
                  <option value="PIX">PIX</option>
                  <option value="TED">TED</option>
                  <option value="CREDIT_CARD">Cartão de Crédito</option>
                </select>
              </div>

              <div className="alert alert-warning">
                <div className="text-sm">
                  <p className="font-semibold mb-1">⚠️ Demonstração</p>
                  <p>Este é um depósito de demonstração. Em produção, você receberá instruções de pagamento (QR code PIX, dados bancários, etc).</p>
                </div>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowDepositModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Criar Depósito
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
