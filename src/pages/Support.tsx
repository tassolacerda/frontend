import DashboardLayout from '@/components/DashboardLayout';
import { HelpCircle, MessageCircle, Mail, FileText } from 'lucide-react';

export default function Support() {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Chat ao Vivo',
      description: 'Fale com nossa equipe em tempo real',
      action: 'Iniciar Chat',
      available: true
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Envie sua dúvida por email',
      action: 'Enviar Email',
      available: true
    },
    {
      icon: FileText,
      title: 'Central de Ajuda',
      description: 'Encontre respostas nas nossas FAQs',
      action: 'Acessar Central',
      available: true
    },
    {
      icon: HelpCircle,
      title: 'Atendimento Telefônico',
      description: 'Ligue para (11) 3000-0000',
      action: 'Ver Horários',
      available: false
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Suporte</h1>
          <p className="text-gray-600 mt-1">
            Estamos aqui para ajudar você
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.title}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                    <button
                      className={`text-sm px-4 py-2 rounded-lg transition-colors ${
                        option.available
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!option.available}
                    >
                      {option.action}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Enviar Mensagem</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assunto
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Digite o assunto"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensagem
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Descreva sua dúvida ou problema"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
