import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep('password');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="w-full max-w-md rounded-xl p-8" style={{ backgroundColor: '#FAFAFA' }}>
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src="/fonts/Logo.svg" alt="Prisma" className="h-6" />
        </div>

        {step === 'email' ? (
          <form onSubmit={handleContinue} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Continuar
            </button>

            <div className="text-center">
              <a href="#" className="text-sm text-gray-600 hover:text-black">
                Esqueci minha senha
              </a>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar na conta'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep('email')}
                className="text-sm text-gray-600 hover:text-black"
              >
                ← Voltar
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Não tem conta?{' '}
          <Link to="/register" className="text-black font-semibold hover:underline">
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
