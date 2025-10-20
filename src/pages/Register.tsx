import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, UserType } from '@/stores/useAuthStore';
import toast from 'react-hot-toast';
import { UserPlus, Building2, User, Mail, Lock, Phone, FileText } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();

  // Step 1: User type selection
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [userType, setUserType] = useState<UserType | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    cpf: '',
    cnpj: '',
    phone: '',
  });

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (userType === 'BUYER' && !formData.cpf) {
      toast.error('CPF é obrigatório para compradores');
      return;
    }

    if (userType === 'REAL_ESTATE' && !formData.cnpj) {
      toast.error('CNPJ é obrigatório para imobiliárias');
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        userType: userType!,
        cpf: userType === 'BUYER' ? formData.cpf : undefined,
        cnpj: userType === 'REAL_ESTATE' ? formData.cnpj : undefined,
        phone: formData.phone || undefined,
      });

      toast.success('Conta criada com sucesso!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao criar conta');
    }
  };

  if (step === 'select') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Criar Conta</h2>
            <p className="text-base-content/70">O que você deseja fazer?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Quero Tokenizar */}
            <button
              onClick={() => handleUserTypeSelect('REAL_ESTATE')}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer border-2 border-transparent hover:border-primary"
            >
              <div className="card-body items-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="w-10 h-10 text-black" />
                </div>
                <h3 className="card-title text-2xl">Quero Tokenizar</h3>
                <p className="opacity-70 mb-4">
                  Tokenize e fracionalize imóveis na blockchain
                </p>
                <ul className="text-left space-y-2 text-sm opacity-80">
                  <li>✓ Cadastrar propriedades</li>
                  <li>✓ Upload de documentos</li>
                  <li>✓ Tokenizar imóveis (NFT)</li>
                  <li>✓ Fracionar em tokens</li>
                  <li>✓ Convidar compradores</li>
                </ul>
                <button className="btn btn bg-black text-white hover:bg-gray-800 border-2 border-black btn-wide mt-4">
                  Continuar
                </button>
              </div>
            </button>

            {/* Quero Comprar */}
            <button
              onClick={() => handleUserTypeSelect('BUYER')}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer border-2 border-transparent hover:border-secondary"
            >
              <div className="card-body items-center text-center">
                <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <User className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="card-title text-2xl">Quero Comprar</h3>
                <p className="opacity-70 mb-4">
                  Adquira frações de imóveis tokenizados
                </p>
                <ul className="text-left space-y-2 text-sm opacity-80">
                  <li>✓ Ver imóveis disponíveis</li>
                  <li>✓ Depositar fundos</li>
                  <li>✓ Comprar frações</li>
                  <li>✓ Gerenciar compras</li>
                  <li>✓ Receber rendimentos</li>
                </ul>
                <button className="btn btn-secondary btn-wide mt-4">
                  Continuar
                </button>
              </div>
            </button>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm">
              Já tem uma conta?{' '}
              <Link to="/login" className="link link-primary font-semibold">
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <button
            onClick={() => setStep('select')}
            className="btn btn-ghost btn-sm self-start -ml-4"
          >
            ← Voltar
          </button>

          <div className="text-center mb-6">
            <div className={`w-16 h-16 rounded-full ${userType === 'REAL_ESTATE' ? 'bg-primary/10' : 'bg-secondary/10'} flex items-center justify-center mx-auto mb-4`}>
              {userType === 'REAL_ESTATE' ? (
                <Building2 className="w-8 h-8 text-black" />
              ) : (
                <User className="w-8 h-8 text-secondary" />
              )}
            </div>
            <h2 className="card-title text-2xl justify-center">
              {userType === 'REAL_ESTATE' ? 'Tokenizar Imóveis' : 'Comprar Frações'}
            </h2>
            <p className="opacity-70 text-sm">Preencha os dados abaixo para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 opacity-50" />
                </div>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="input input-bordered w-full pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Nome / Razão Social */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  {userType === 'REAL_ESTATE' ? 'Razão Social' : 'Nome Completo'}
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 opacity-50" />
                </div>
                <input
                  type="text"
                  placeholder={userType === 'REAL_ESTATE' ? 'Nome da Empresa' : 'Seu nome completo'}
                  className="input input-bordered w-full pl-10"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* CPF ou CNPJ */}
            {userType === 'BUYER' ? (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">CPF</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="w-5 h-5 opacity-50" />
                  </div>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    className="input input-bordered w-full pl-10"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">CNPJ</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="w-5 h-5 opacity-50" />
                  </div>
                  <input
                    type="text"
                    placeholder="00.000.000/0000-00"
                    className="input input-bordered w-full pl-10"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            {/* Telefone */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Telefone (opcional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5 opacity-50" />
                </div>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="input input-bordered w-full pl-10"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Senha */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Senha</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 opacity-50" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Confirmar Senha */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirmar Senha</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 opacity-50" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`btn ${userType === 'REAL_ESTATE' ? 'btn bg-black text-white hover:bg-gray-800 border-2 border-black' : 'btn-secondary'} w-full ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          <div className="divider text-sm">OU</div>

          <p className="text-center text-sm">
            Já tem uma conta?{' '}
            <Link to="/login" className="link link-primary font-semibold">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
