import { Check, Clock, X, AlertCircle } from 'lucide-react';

interface KYCStatusBadgeProps {
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
  size?: 'sm' | 'md' | 'lg';
}

export default function KYCStatusBadge({ status, size = 'md' }: KYCStatusBadgeProps) {
  const configs = {
    PENDING: {
      color: 'badge bg-gray-500 text-white',
      icon: Clock,
      text: 'Pendente',
    },
    IN_REVIEW: {
      color: 'badge bg-gray-400 text-white',
      icon: AlertCircle,
      text: 'Em Revisão',
    },
    APPROVED: {
      color: 'badge bg-gray-700 text-white',
      icon: Check,
      text: 'Aprovado',
    },
    REJECTED: {
      color: 'badge bg-gray-900 text-white',
      icon: X,
      text: 'Rejeitado',
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  const sizeClass = {
    sm: 'badge-sm',
    md: 'badge-md',
    lg: 'badge-lg',
  }[size];

  return (
    <div className={`badge ${config.color} ${sizeClass} gap-2`}>
      <Icon className="w-3 h-3" />
      {config.text}
    </div>
  );
}
