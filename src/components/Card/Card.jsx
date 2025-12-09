import { useState } from 'react';
import { useTheme } from '../../theme';
import './Card.css';

const Card = ({
  children,
  title,
  subtitle,
  footer,
  hoverable = false,
  clickable = false,
  onClick,
  padding = 'default',
  className = '',
  ...props
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const paddingValues = {
    none: '0',
    sm: theme.spacing.md,
    default: theme.components.card.padding,
    lg: theme.spacing.xl,
  };

  const cardStyles = {
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: theme.components.card.borderRadius,
    padding: paddingValues[padding],
    boxShadow: isHovered && hoverable ? theme.components.card.hover.boxShadow : theme.components.card.boxShadow,
    border: theme.components.card.border,
    transform: isHovered && hoverable ? theme.components.card.hover.transform : 'translateY(0)',
    transition: `all ${theme.animations.transition.normal} ${theme.animations.easing.default}`,
    cursor: clickable ? 'pointer' : 'default',
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: subtitle ? theme.spacing.xs : theme.spacing.md,
    lineHeight: theme.typography.lineHeight.tight,
  };

  const subtitleStyles = {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    lineHeight: theme.typography.lineHeight.normal,
  };

  const footerStyles = {
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    borderTop: `1px solid ${theme.colors.border.light}`,
  };

  return (
    <div
      className={`card ${hoverable ? 'card-hoverable' : ''} ${clickable ? 'card-clickable' : ''} ${className}`}
      style={cardStyles}
      onClick={clickable ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {title && (
        <div className="card-header">
          <h3 style={titleStyles}>{title}</h3>
          {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        </div>
      )}

      <div className="card-body">
        {children}
      </div>

      {footer && (
        <div className="card-footer" style={footerStyles}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
