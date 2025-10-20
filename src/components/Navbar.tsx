import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { useWalletStore } from '@/stores/useWalletStore';
import { Home, Building2, FileCheck, User, LogOut, Wallet } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { address, isConnected, connect } = useWalletStore();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">
                <Home className="w-4 h-4" />
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/dashboard">
                    <Building2 className="w-4 h-4" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/kyc">
                    <FileCheck className="w-4 h-4" />
                    KYC
                  </Link>
                </li>
                <li>
                  <Link to="/properties">
                    <Building2 className="w-4 h-4" />
                    Propriedades
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <span className="gradient-bg bg-clip-text text-transparent font-bold">
            Prisma
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link to="/" className="btn btn-ghost">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/dashboard" className="btn btn-ghost">
                  <Building2 className="w-4 h-4" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/kyc" className="btn btn-ghost">
                  <FileCheck className="w-4 h-4" />
                  KYC
                </Link>
              </li>
              <li>
                <Link to="/properties" className="btn btn-ghost">
                  <Building2 className="w-4 h-4" />
                  Propriedades
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {/* Wallet Connection */}
        {isAuthenticated && (
          <div className="dropdown dropdown-end">
            {isConnected && address ? (
              <button className="btn btn-outline btn-sm gap-2">
                <Wallet className="w-4 h-4" />
                {formatAddress(address)}
              </button>
            ) : (
              <button onClick={connect} className="btn btn bg-black text-white hover:bg-gray-800 border-black btn-sm gap-2">
                <Wallet className="w-4 h-4" />
                Conectar Wallet
              </button>
            )}
          </div>
        )}

        {/* User Menu */}
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-black text-black-content flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="menu-title">
                <span>{user?.name}</span>
                <span className="text-xs opacity-60">{user?.email}</span>
                <span className="badge badge-sm badge bg-gray-700 text-white mt-1">
                  {user?.userType === 'REAL_ESTATE' ? 'Tokenizador' : 'Comprador'}
                </span>
              </li>
              <li>
                <Link to="/profile">
                  <User className="w-4 h-4" />
                  Perfil
                </Link>
              </li>
              <li>
                <button onClick={logout} className="text-error">
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn bg-black text-white hover:bg-gray-800 border-black btn-sm">
              Criar Conta
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
