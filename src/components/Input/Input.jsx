import { useState } from 'react';
import { useTheme } from '../../theme';
import './Input.css';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  fullWidth = false,
  required = false,
  className = '',
  leftIcon,
  rightIcon,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const containerStyles = {
    width: fullWidth ? '100%' : 'auto',
    marginBottom: theme.spacing.md,
  };

  const labelStyles = {
    display: 'block',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    fontFamily: theme.typography.fontFamily.primary,
  };

  const inputWrapperStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyles = {
    width: '100%',
    backgroundColor: theme.components.input.backgroundColor,
    border: error
      ? `2px solid ${theme.colors.accent.yellow}`
      : isFocused
        ? `2px solid ${theme.components.input.focus.borderColor}`
        : theme.components.input.border,
    borderRadius: theme.components.input.borderRadius,
    padding: theme.components.input.padding,
    fontSize: theme.components.input.fontSize,
    color: theme.components.input.color,
    fontFamily: theme.typography.fontFamily.primary,
    transition: `all ${theme.animations.transition.normal} ${theme.animations.easing.default}`,
    outline: 'none',
    boxShadow: isFocused && !error ? theme.components.input.focus.boxShadow : 'none',
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    paddingLeft: leftIcon ? '2.5rem' : theme.components.input.padding.split(' ')[1],
    paddingRight: rightIcon ? '2.5rem' : theme.components.input.padding.split(' ')[1],
  };

  const iconStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.colors.text.tertiary,
    pointerEvents: 'none',
  };

  const leftIconStyles = {
    ...iconStyles,
    left: theme.spacing.md,
  };

  const rightIconStyles = {
    ...iconStyles,
    right: theme.spacing.md,
  };

  const helperTextStyles = {
    fontSize: theme.typography.fontSize.sm,
    color: error ? theme.colors.accent.yellow : theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
    fontFamily: theme.typography.fontFamily.primary,
  };

  return (
    <div className={`input-container ${className}`} style={containerStyles}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={{ color: theme.colors.primary.brand }}> *</span>}
        </label>
      )}

      <div style={inputWrapperStyles}>
        {leftIcon && <span style={leftIconStyles}>{leftIcon}</span>}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          style={inputStyles}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="input-field"
          {...props}
        />

        {rightIcon && <span style={rightIconStyles}>{rightIcon}</span>}
      </div>

      {(helperText || error) && (
        <p style={helperTextStyles}>{error || helperText}</p>
      )}
    </div>
  );
};

export default Input;
