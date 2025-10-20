import { LucideIcon } from 'lucide-react';

interface EcosystemCardProps {
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  image: string;
  iconImage?: string; // optional override to use an image instead of Lucide icon
}

export default function EcosystemCard({ icon: Icon, category, title, description, image, iconImage }: EcosystemCardProps) {
  return (
    <div className="@container bg-white rounded-2xl p-6 md:p-8 w-full flex flex-col h-full">
      {/* Icon and Category */}
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        {iconImage ? (
          <img src={iconImage} alt="icon" className="w-5 h-5 flex-shrink-0" />
        ) : (
          <Icon className="w-5 h-5 flex-shrink-0" style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
        )}
        <span className="text-sm font-semibold" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{category}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-black mb-3 leading-tight min-h-[60px] md:min-h-[70px]">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed flex-grow min-h-[80px] md:min-h-[90px]">
        {description}
      </p>

      {/* Image */}
      <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
