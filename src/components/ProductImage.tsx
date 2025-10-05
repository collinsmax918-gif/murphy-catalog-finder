import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const getProxiedUrl = (url: string) => `/functions/v1/image-proxy?url=${encodeURIComponent(url)}`;

export default function ProductImage({ src, alt, className, ...props }: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [triedProxy, setTriedProxy] = useState(false);

  // If the src changes (different product), reset state
  React.useEffect(() => {
    setCurrentSrc(src);
    setTriedProxy(false);
  }, [src]);

  const handleError = () => {
    if (!triedProxy && src && /^https?:\/\//i.test(src)) {
      setTriedProxy(true);
      setCurrentSrc(getProxiedUrl(src));
    } else {
      setCurrentSrc("/placeholder.svg");
    }
  };

  const finalAlt = useMemo(() => alt?.trim() || "Product image", [alt]);

  return (
    <img
      src={currentSrc}
      alt={finalAlt}
      className={cn("object-contain", className)}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleError}
      {...props}
    />
  );
}
