import { useTheme } from '../../theme';
import './Navbar.css';

const Navbar = ({
  logo,
  logoText = 'Logo',
  navItems = [],
  actions,
  sticky = true,
  className = '',
  onLogoClick,
  ...props
}) => {
  const theme = useTheme();

  const navbarStyles = {
    backgroundColor: theme.components.navbar.backgroundColor,
    height: theme.components.navbar.height,
    borderBottom: theme.components.navbar.borderBottom,
    padding: theme.components.navbar.padding,
    boxShadow: theme.components.navbar.boxShadow,
    position: sticky ? 'sticky' : 'static',
    top: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: theme.typography.fontFamily.primary,
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    cursor: onLogoClick ? 'pointer' : 'default',
    textDecoration: 'none',
  };

  const logoTextStyles = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.brand,
    margin: 0,
  };

  const navItemsContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const navItemStyles = {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
    textDecoration: 'none',
    transition: `color ${theme.animations.transition.fast} ${theme.animations.easing.default}`,
    cursor: 'pointer',
  };

  const actionsContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
  };

  return (
    <nav className={`navbar ${className}`} style={navbarStyles} {...props}>
      <div style={logoStyles} onClick={onLogoClick}>
        {logo && <span className="navbar-logo">{logo}</span>}
        <h1 style={logoTextStyles}>{logoText}</h1>
      </div>

      {navItems.length > 0 && (
        <ul style={navItemsContainerStyles}>
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href || '#'}
                onClick={item.onClick}
                style={navItemStyles}
                className="navbar-item"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {actions && (
        <div style={actionsContainerStyles}>
          {actions}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
