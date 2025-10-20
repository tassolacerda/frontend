import { ReactNode } from "react";

import { cn } from "@/lib/utils";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-2 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  description,
  illustration,
  imagePosition = "bottom",
  backgroundIllustration,
  backgroundOpacity = 0.2,
  backgroundText,
  backgroundTextOpacity = 0.12,
  backgroundTextStyle,
  backgroundTextSecondary,
  backgroundTextSecondaryStyle,
  imageSize,
  customPadding,
  textMarginTop,
  imageMarginTop,
  customContent,
}: {
  name: string;
  className?: string;
  background?: ReactNode;
  description: string;
  illustration?: string;
  imagePosition?: "top" | "bottom";
  backgroundIllustration?: string;
  backgroundOpacity?: number;
  backgroundText?: string;
  backgroundTextOpacity?: number;
  backgroundTextStyle?: React.CSSProperties;
  backgroundTextSecondary?: string;
  backgroundTextSecondaryStyle?: React.CSSProperties;
  imageSize?: { width: number; height: number };
  customPadding?: string;
  textMarginTop?: string;
  imageMarginTop?: string;
  customContent?: ReactNode;
}) => (
  <div
    key={name}
    className={cn(
      "@container group relative flex flex-col overflow-hidden rounded-2xl bg-white",
      customPadding ? customPadding : "p-4 md:p-6 lg:p-8",
      "shadow-[inset_0px_1px_0px_rgba(255,255,255,0.024),inset_0px_0px_0px_1px_rgba(255,255,255,0.024)]",
      className,
    )}
    style={{
      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}
  >
    {backgroundIllustration && (
      <div className="pointer-events-none select-none absolute inset-0 z-0" aria-hidden="true">
        <img
          src={backgroundIllustration}
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
          style={{ opacity: backgroundOpacity }}
        />
      </div>
    )}

    {backgroundText && (
      <div
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-0"
        aria-hidden="true"
        style={{
          WebkitMaskImage:
            'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 65%, transparent 95%)',
          maskImage:
            'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 65%, transparent 95%)',
        }}
      >
        <p
          className="break-words text-black text-center"
          style={{
            opacity: backgroundTextOpacity,
            whiteSpace: 'pre-wrap',
            lineHeight: 1.4,
            fontSize: '10px',
            ...(backgroundTextStyle || {}),
          }}
        >
          {backgroundText}
        </p>
        {backgroundTextSecondary && (
          <p
            className="break-words text-black text-center"
            style={{
              opacity: backgroundTextOpacity,
              whiteSpace: 'pre-wrap',
              lineHeight: 1.4,
              fontSize: '10px',
              ...(backgroundTextSecondaryStyle || {}),
            }}
          >
            {backgroundTextSecondary}
          </p>
        )}
        {/* Fallback overlay to simulate radial fade on browsers without CSS mask support */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255,255,255,0) 30%, rgba(255,255,255,0.75) 75%, rgba(255,255,255,1) 95%)',
            zIndex: 5,
          }}
        />
      </div>
    )}
    {background && <div className="mb-4 md:mb-6">{background}</div>}

    {/* Imagem no topo */}
    {illustration && imagePosition === "top" && (
      <>
        <div className={cn("relative z-0 flex justify-center", imageMarginTop || "")}>
          <img
            src={illustration}
            alt={name}
            className="h-auto object-contain"
            style={imageSize ? { width: `${imageSize.width}px`, height: `${imageSize.height}px` } : {}}
          />
        </div>
        <div className={cn(
          "flex flex-col gap-3 md:gap-4 flex-grow relative z-10 px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8",
          textMarginTop || "-mt-16"
        )}>
          <h3
            className="text-xl md:text-2xl text-black leading-tight"
            style={{
              fontWeight: 510,
              lineHeight: '1.2',
            }}
          >
            {name}
          </h3>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{
              color: 'rgba(0, 0, 0, 0.5)',
              fontWeight: 400,
              lineHeight: '1.6',
            }}
          >
            {description}
          </p>
        </div>
      </>
    )}

    {/* Texto quando imagem não está no topo */}
    {(!illustration || imagePosition !== "top") && (
      <div className="flex flex-col gap-3 md:gap-4 flex-grow relative z-10">
        <h3
          className="text-xl md:text-2xl text-black leading-tight"
          style={{
            fontWeight: 510,
            lineHeight: '1.2',
          }}
        >
          {name}
        </h3>
        <p
          className="text-sm md:text-base leading-relaxed"
          style={{
            color: 'rgba(0, 0, 0, 0.5)',
            fontWeight: 400,
            lineHeight: '1.6',
          }}
        >
          {description}
        </p>
      </div>
    )}

    {/* Imagem no final (comportamento padrão) */}
    {illustration && imagePosition === "bottom" && !customContent && (
      <div className="mt-auto pt-4 md:pt-6 relative z-10 flex justify-center">
        <img
          src={illustration}
          alt={name}
          className="h-auto object-contain"
          style={imageSize ? { width: `${imageSize.width}px`, height: `${imageSize.height}px` } : {}}
        />
      </div>
    )}

    {/* Custom content */}
    {customContent && customContent}
  </div>
);

export { BentoCard, BentoGrid };
