import { useState } from 'react';
import { useTheme } from '../../theme';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = {
    fontFamily: theme.typography.fontFamily.primary,
    transition: `all ${theme.animations.transition.normal} ${theme.animations.easing.default}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const variantStyles = {
    primary: {
      backgroundColor: isHovered && !disabled ? theme.components.button.primary.hover.backgroundColor : theme.components.button.primary.backgroundColor,
      color: theme.components.button.primary.color,
      padding: theme.components.button.primary.padding,
      borderRadius: theme.components.button.primary.borderRadius,
      fontSize: theme.components.button.primary.fontSize,
      fontWeight: theme.components.button.primary.fontWeight,
      boxShadow: isHovered && !disabled ? theme.components.button.primary.hover.boxShadow : 'none',
      transform: isHovered && !disabled ? theme.components.button.primary.hover.transform : 'translateY(0)',
    },
    secondary: {
      backgroundColor: isHovered && !disabled ? theme.components.button.secondary.hover.backgroundColor : theme.components.button.secondary.backgroundColor,
      color: theme.components.button.secondary.color,
      border: theme.components.button.secondary.border,
      borderColor: isHovered && !disabled ? theme.components.button.secondary.hover.borderColor : theme.colors.border.light,
      padding: theme.components.button.secondary.padding,
      borderRadius: theme.components.button.secondary.borderRadius,
      fontSize: theme.components.button.secondary.fontSize,
      fontWeight: theme.components.button.secondary.fontWeight,
    },
    accent: {
      backgroundColor: isHovered && !disabled ? theme.colors.accent.purple : theme.colors.accent.blue,
      color: theme.colors.text.white,
      padding: theme.components.button.primary.padding,
      borderRadius: theme.components.button.primary.borderRadius,
      fontSize: theme.components.button.primary.fontSize,
      fontWeight: theme.components.button.primary.fontWeight,
      boxShadow: isHovered && !disabled ? theme.shadows.lg : 'none',
      transform: isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
    }
  };

  const sizeStyles = {
    sm: {
      padding: '0.5rem 1rem',
      fontSize: theme.typography.fontSize.sm,
    },
    md: {
      padding: '0.75rem 1.5rem',
      fontSize: theme.typography.fontSize.base,
    },
    lg: {
      padding: '1rem 2rem',
      fontSize: theme.typography.fontSize.lg,
    }
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <button
      type={type}
      className={`button button-${variant} ${className}`}
      style={combinedStyles}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
