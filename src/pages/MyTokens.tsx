import DashboardLayout from '@/components/DashboardLayout';
import { Coins, TrendingUp, Building2 } from 'lucide-react';

export default function MyTokens() {

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Tokens</h1>
          <p className="text-gray-600 mt-1">
            Gerencie seus investimentos em imóveis tokenizados
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Investido</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">R$ 0,00</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Coins className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Rendimento</p>
                <p className="text-2xl font-bold text-green-600 mt-2">+R$ 0,00</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Imóveis</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Tokens List */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Seus Tokens</h2>
          <div className="text-center py-12">
            <Coins className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Você ainda não possui tokens</p>
            <p className="text-sm text-gray-400 mt-1">
              Explore os imóveis disponíveis e comece a investir
            </p>
            <button className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Explorar Imóveis
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
