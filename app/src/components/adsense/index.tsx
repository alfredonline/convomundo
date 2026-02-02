import { useEffect, useRef } from 'react';

const AD_CLIENT = 'ca-pub-4516077713690144';

interface AdSenseProps {
  /** Ad unit slot ID from AdSense (optional – omit for auto ads). */
  adSlot?: string;
  /** e.g. "auto", "rectangle", "horizontal" */
  adFormat?: string;
  /** Set to true for responsive display. */
  fullWidthResponsive?: boolean;
  /** Optional className for the wrapper. */
  className?: string;
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
}: AdSenseProps) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !insRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense push error:', e);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        {...(adSlot && { 'data-ad-slot': adSlot } as Record<string, string>)}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}
