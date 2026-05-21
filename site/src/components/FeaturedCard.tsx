import type { FC } from 'react';

export interface FeaturedCardProps {
  brandColor: string;
  logoSrc?: string;
  fallbackLetter: string;
  companyName: string;
  date: string;
  label: string;
  score: number;
  description: string;
  href: string;
}

const meta: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 11,
  color: '#aaa',
  letterSpacing: '0.03em',
};

const FeaturedCard: FC<FeaturedCardProps> = ({
  brandColor,
  logoSrc,
  fallbackLetter,
  companyName,
  date,
  label,
  score,
  description,
  href,
}) => (
  <a href={href} className="rake-featured-card" style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="featured-card__inner" style={{
      background: '#faf9f6',
      border: '1px solid #e0dbd4',
      borderRadius: 5,
      display: 'flex',
      alignItems: 'stretch',
      overflow: 'hidden',
    }}>

      {/* Brand block */}
      <div className="featured-card__brand" style={{
        width: 160,
        minWidth: 160,
        background: brandColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ position: 'relative', width: 72, height: 72, borderRadius: 5, overflow: 'hidden' }}>
          {/* blurred fill — separate from logo so logo stays sharp */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.15)',
            filter: 'blur(20px)',
            transform: 'scale(1.2)',
          }} />
          {/* logo */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={companyName}
                style={{ width: 52, height: 52, objectFit: 'contain' }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 34,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.92)',
              }}>
                {fallbackLetter}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="featured-card__content" style={{
        flex: 1,
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 4,
      }}>

        {/* Row 1: date + label */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="fc-meta" style={meta}>{date}</span>
          <span className="fc-meta" style={meta}>{label}</span>
        </div>

        {/* Row 2: name + score */}
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span className="fc-name" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 52,
            fontWeight: 600,
            color: '#1a1a1a',
            lineHeight: 1,
            letterSpacing: '-1px',
            flex: 1,
          }}>
            {companyName}
          </span>
          <span className="fc-score" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 52,
            fontWeight: 700,
            color: '#1a1a1a',
            lineHeight: 1,
            letterSpacing: '-2px',
            flexShrink: 0,
            position: 'relative',
            top: '-4px',
          }}>
            {score}
          </span>
          <span className="fc-denom" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#ccc', flexShrink: 0 }}>
            /100
          </span>
        </div>

        {/* Row 3: description */}
        <div style={{ marginTop: 8 }}>
          <span className="fc-desc" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16,
            color: '#777',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {description}
          </span>
        </div>

      </div>
    </div>
  </a>
);

export default FeaturedCard;
