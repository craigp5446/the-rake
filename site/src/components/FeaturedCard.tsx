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
    <div style={{
      background: '#faf9f6',
      border: '1px solid #e0dbd4',
      borderRadius: 5,
      display: 'flex',
      alignItems: 'stretch',
      overflow: 'hidden',
    }}>

      {/* Brand block */}
      <div style={{
        width: 160,
        minWidth: 160,
        background: brandColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 72,
          height: 72,
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
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

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 4,
      }}>

        {/* Row 1: date + label */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={meta}>{date}</span>
          <span style={meta}>{label}</span>
        </div>

        {/* Row 2: name + score */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 52,
            fontWeight: 600,
            color: '#1a1a1a',
            lineHeight: 1,
            letterSpacing: '-1px',
          }}>
            {companyName}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, flexShrink: 0 }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 52,
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1,
              letterSpacing: '-2px',
            }}>
              {score}
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#ccc' }}>
              /100
            </span>
          </div>
        </div>

        {/* Row 3: description */}
        <div style={{ marginTop: 8 }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 16,
            color: '#777',
            lineHeight: 1.5,
          }}>
            {description}
          </span>
        </div>

      </div>
    </div>
  </a>
);

export default FeaturedCard;
