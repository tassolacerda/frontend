import DashboardLayout from '@/components/DashboardLayout';
import { GraduationCap, BookOpen, Video, FileText } from 'lucide-react';

export default function Education() {
  const courses = [
    {
      icon: BookOpen,
      title: 'Introdução aos RWAs',
      description: 'Entenda o que são Real World Assets e como funcionam',
      duration: '15 min',
      level: 'Iniciante'
    },
    {
      icon: Video,
      title: 'Como Investir em Imóveis Tokenizados',
      description: 'Passo a passo para fazer seu primeiro investimento',
      duration: '20 min',
      level: 'Iniciante'
    },
    {
      icon: FileText,
      title: 'Blockchain e Smart Contracts',
      description: 'Conceitos fundamentais de blockchain aplicados a RWAs',
      duration: '30 min',
      level: 'Intermediário'
    },
    {
      icon: BookOpen,
      title: 'Gestão de Portfólio',
      description: 'Estratégias para diversificar seus investimentos',
      duration: '25 min',
      level: 'Avançado'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Educacional</h1>
          <p className="text-gray-600 mt-1">
            Aprenda sobre investimentos em imóveis tokenizados
          </p>
        </div>

        {/* Featured Banner */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-10 h-10" />
            <div>
              <h2 className="text-2xl font-bold">Comece Sua Jornada</h2>
              <p className="text-gray-300">Aprenda os fundamentos dos investimentos tokenizados</p>
            </div>
          </div>
          <button className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
            Começar Agora
          </button>
        </div>

        {/* Courses Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Cursos Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <div
                  key={course.title}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded">{course.duration}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">{course.level}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recursos Adicionais</h2>
          <div className="space-y-3">
            <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <FileText className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Glossário de Termos</p>
                <p className="text-sm text-gray-500">Entenda a terminologia do mercado</p>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Guia do Investidor</p>
                <p className="text-sm text-gray-500">Boas práticas e dicas importantes</p>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <Video className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Webinars Gravados</p>
                <p className="text-sm text-gray-500">Assista palestras de especialistas</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
