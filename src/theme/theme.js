const theme = {
  colors: {
    primary: {
      brand: '#FF6154',
      brandDark: '#E54D42',
      brandLight: '#FF7D6F'
    },
    background: {
      main: '#FFFFFF',
      secondary: '#F8F9FA',
      tertiary: '#F3F4F6'
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
      white: '#FFFFFF'
    },
    accent: {
      purple: '#8B5CF6',
      blue: '#3B82F6',
      green: '#10B981',
      yellow: '#F59E0B'
    },
    border: {
      light: '#E5E7EB',
      medium: '#D1D5DB',
      dark: '#9CA3AF'
    }
  },
  typography: {
    fontFamily: {
      primary: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      heading: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  components: {
    button: {
      primary: {
        backgroundColor: '#FF6154',
        color: '#FFFFFF',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'all 0.2s ease-in-out',
        hover: {
          backgroundColor: '#E54D42',
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 15px -3px rgba(255, 97, 84, 0.3)'
        }
      },
      secondary: {
        backgroundColor: 'transparent',
        color: '#1F2937',
        border: '1px solid #E5E7EB',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        fontWeight: '600',
        hover: {
          backgroundColor: '#F9FAFB',
          borderColor: '#D1D5DB'
        }
      }
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #E5E7EB',
      hover: {
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        transform: 'translateY(-4px)'
      }
    },
    input: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #E5E7EB',
      borderRadius: '0.75rem',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      color: '#1F2937',
      focus: {
        borderColor: '#FF6154',
        boxShadow: '0 0 0 3px rgba(255, 97, 84, 0.1)',
        outline: 'none'
      }
    },
    navbar: {
      backgroundColor: '#FFFFFF',
      height: '4rem',
      borderBottom: '1px solid #E5E7EB',
      padding: '0 2rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    },
    uploadArea: {
      backgroundColor: '#F9FAFB',
      border: '2px dashed #D1D5DB',
      borderRadius: '1rem',
      padding: '3rem',
      textAlign: 'center',
      hover: {
        backgroundColor: '#F3F4F6',
        borderColor: '#FF6154'
      }
    }
  },
  layout: {
    maxWidth: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    container: {
      padding: '0 1rem'
    }
  },
  animations: {
    transition: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms'
    },
    easing: {
      default: 'ease-in-out',
      in: 'ease-in',
      out: 'ease-out'
    }
  }
};

export default theme;
