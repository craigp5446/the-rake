import type { FC } from 'react';

export interface ListCardProps {
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
  fontSize: 10,
  color: 'var(--text-faint)',
  letterSpacing: '0.03em',
};

const ListCard: FC<ListCardProps> = ({
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
  <a
    href={href}
    className="rake-list-card"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '16px 0',
      textDecoration: 'none',
      color: 'inherit',
      borderTop: '1px solid var(--border)',
    }}
  >
    {/* Icon */}
    <div style={{
      width: 38,
      height: 38,
      borderRadius: 9,
      background: brandColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      overflow: 'hidden',
    }}>
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={companyName}
          style={{ width: 28, height: 28, objectFit: 'contain' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      ) : (
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: 16,
          color: 'rgba(255,255,255,0.9)',
        }}>
          {fallbackLetter}
        </span>
      )}
    </div>

    {/* Content */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>

      {/* Row 1: date + label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={meta}>{date}</span>
        <span style={meta}>{label}</span>
      </div>

      {/* Row 2: name + score */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22,
          fontWeight: 600,
          color: 'var(--text)',
          lineHeight: 1.05,
          letterSpacing: '-0.3px',
        }}>
          {companyName}
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, flexShrink: 0 }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 1,
            letterSpacing: '-0.5px',
          }}>
            {score}
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-faint)' }}>
            /100
          </span>
        </div>
      </div>

      {/* Row 3: description */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 15,
        color: 'var(--text-muted)',
        lineHeight: 1.35,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginTop: 2,
        paddingRight: 56,
      }}>
        {description}
      </div>

    </div>
  </a>
);

export default ListCard;
