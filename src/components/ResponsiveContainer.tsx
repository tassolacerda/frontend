import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'container' | 'content-sm' | 'content-md' | 'content-lg' | 'full';
  noPadding?: boolean;
}

export default function ResponsiveContainer({
  children,
  className,
  maxWidth = 'container',
  noPadding = false,
}: ResponsiveContainerProps) {
  const maxWidthClass = maxWidth === 'full' ? 'max-w-full' : `max-w-${maxWidth}`;
  const paddingClass = noPadding ? 'px-0' : 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24';

  return (
    <div className={cn(maxWidthClass, paddingClass, 'mx-auto', className)}>
      {children}
    </div>
  );
}
