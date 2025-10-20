import { ReactNode, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import {
  LayoutDashboard,
  Coins,
  HelpCircle,
  GraduationCap,
  LogOut,
  Home,
  TrendingUp,
  User,
  Settings,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [currentTab, setCurrentTab] = useState('imoveis');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logout realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      toast.error('Erro ao fazer logout');
    }
  };

  const sidebarMenuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: LayoutDashboard, label: 'Atividade', path: '/dashboard/activity' },
    { icon: Coins, label: 'Meus Tokens', path: '/dashboard/tokens' },
    { icon: HelpCircle, label: 'Suporte', path: '/dashboard/support' },
    { icon: GraduationCap, label: 'Educacional', path: '/dashboard/education' },
  ];

  const topbarTabs = [
    { id: 'imoveis', label: 'Imóveis', icon: Home },
    { id: 'novidades', label: 'Novidades', icon: TrendingUp },
    { id: 'conta', label: 'Conta', icon: User },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Sidebar */}
      <aside
        className="border-r border-gray-200 w-64 flex flex-col fixed h-screen z-30"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Logo */}
        <div className="px-6 py-3 mt-3">
          <img src="/fonts/Logo.svg" alt="Prisma" className="h-5" />
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 pt-2 pb-6 space-y-1">
          {sidebarMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-gray-100"
                style={{ color: 'rgba(0, 0, 0, 0.5)' }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="pb-6">
          {/* App Promo */}
          <div className="bg-black rounded-lg overflow-hidden text-white mx-4 mb-4">
            <img src="/FrameMobile.png" alt="App Mobile" className="w-full" />
            <div className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <img src="/IconPrisma.png" alt="Prisma" className="w-10 h-10" />
                  <div className="flex flex-col">
                    <p className="text-xs text-white font-medium">Disponível em iOS</p>
                    <p className="text-xs text-gray-400">Tenha o aplicativo mobile ultrathink</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="px-4">
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <Link to="/dashboard/support" className="hover:text-black transition-colors">
                Suporte
              </Link>
              <span className="text-gray-400">•</span>
              <Link to="/terms" className="hover:text-black transition-colors">
                Termos
              </Link>
              <span className="text-gray-400">•</span>
              <Link to="/privacy" className="hover:text-black transition-colors">
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Topbar */}
        <header className="border-b border-gray-200 sticky top-0 z-20" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex-1"></div>

              {/* Tabs - Centered */}
              <div className="flex gap-8">
                {topbarTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setCurrentTab(tab.id)}
                      className={`flex items-center gap-2 py-1 border-b-2 transition-colors ${
                        currentTab === tab.id
                          ? 'border-black text-black font-semibold'
                          : 'border-transparent text-gray-600 hover:text-black'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* User Profile with Dropdown */}
              <div className="flex-1 flex justify-end">
                <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
                >
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">
                      {user?.userType === 'BUYER' ? 'Comprador' : 'Tokenizador'}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/dashboard/conta"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm">Minha Conta</span>
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">Configurações</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Sair</span>
                      </button>
                    </div>
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
