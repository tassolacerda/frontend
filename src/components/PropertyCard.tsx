import { Property } from '@/services/propertyService';
import { MapPin, Home, Check, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; text: string }> = {
      PENDING: { color: 'badge-warning', text: 'Pendente' },
      VALIDATING: { color: 'badge-info', text: 'Em Validação' },
      APPROVED: { color: 'badge-success', text: 'Aprovado' },
      TOKENIZED: { color: 'badge-primary', text: 'Tokenizado' },
      FRACTIONALIZED: { color: 'badge-secondary', text: 'Fracionado' },
    };

    const badge = badges[status] || badges.PENDING;
    return (
      <div className={`badge ${badge.color} gap-2`}>
        {status === 'TOKENIZED' || status === 'FRACTIONALIZED' ? (
          <Check className="w-3 h-3" />
        ) : (
          <Clock className="w-3 h-3" />
        )}
        {badge.text}
      </div>
    );
  };

  return (
    <div className="card bg-base-100 shadow-xl card-hover">
      <figure className="h-32 md:h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <Home className="w-24 h-24 text-primary opacity-70" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {property.propertyType}
          {getStatusBadge(property.status)}
        </h2>

        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
            <span>
              {property.address}, {property.city} - {property.state}
            </span>
          </div>

          <div className="flex gap-4">
            <div>
              <span className="font-semibold">Área:</span> {property.area / 100}m²
            </div>
            <div>
              <span className="font-semibold">Matrícula:</span> {property.registryNumber}
            </div>
          </div>

          {property.tokenId !== undefined && (
            <div className="bg-primary/10 rounded-lg p-3 space-y-1">
              <div className="font-mono text-xs">
                <span className="font-semibold">Token ID:</span> #{property.tokenId}
              </div>
              {property.contractAddress && (
                <div className="font-mono text-xs truncate">
                  <span className="font-semibold">Contrato:</span> {property.contractAddress}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="card-actions justify-end mt-4">
          {property.txHash && (
            <a
              href={`https://sepolia.etherscan.io/tx/${property.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-ghost gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Etherscan
            </a>
          )}
          <Link to={`/properties/${property.id}`} className="btn btn-sm btn-primary">
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
