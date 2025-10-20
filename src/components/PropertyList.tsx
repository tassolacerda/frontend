import { Building, MapPin, Calendar } from 'lucide-react';

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
  createdAt: string;
}

interface PropertyListProps {
  properties: Property[];
  onSelectProperty?: (property: Property) => void;
}

export default function PropertyList({ properties, onSelectProperty }: PropertyListProps) {
  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      PENDING: 'badge-warning',
      VALIDATING: 'badge-info',
      APPROVED: 'badge-success',
      TOKENIZING: 'badge-info',
      TOKENIZED: 'badge-success',
      REJECTED: 'badge-error',
      FRACTIONALIZED: 'badge-primary',
    };
    return badges[status] || 'badge-ghost';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      PENDING: 'Pendente',
      VALIDATING: 'Validando',
      APPROVED: 'Aprovado',
      TOKENIZING: 'Tokenizando',
      TOKENIZED: 'Tokenizado',
      REJECTED: 'Rejeitado',
      FRACTIONALIZED: 'Fracionado',
    };
    return texts[status] || status;
  };

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <Building className="w-16 h-16 mx-auto opacity-30 mb-4" />
        <p className="text-base-content/60">Nenhuma propriedade cadastrada</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => onSelectProperty?.(property)}
        >
          <div className="card-body">
            <div className="flex justify-between items-start mb-2">
              <h3 className="card-title text-lg">{property.propertyType}</h3>
              <span className={`badge ${getStatusBadge(property.status)}`}>
                {getStatusText(property.status)}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 opacity-60" />
                <span className="opacity-80">{property.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 opacity-60" />
                <span className="opacity-80">
                  {property.city}, {property.state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 opacity-60" />
                <span className="opacity-80">
                  Matrícula: {property.registryNumber}
                </span>
              </div>
            </div>

            <div className="divider my-2"></div>

            <div className="flex justify-between items-center text-xs">
              <div>
                <span className="opacity-60">Área:</span>{' '}
                <span className="font-semibold">{property.area / 100} m²</span>
              </div>
              {property.tokenId && (
                <div>
                  <span className="opacity-60">Token ID:</span>{' '}
                  <span className="font-semibold">#{property.tokenId}</span>
                </div>
              )}
            </div>

            {property.isFractionalized && (
              <div className="badge badge-primary badge-sm mt-2">Fracionado</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
