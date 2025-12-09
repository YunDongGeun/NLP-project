import { useState } from 'react';
import { useTheme } from '../../theme';
import './Accordion.css';

const AccordionItem = ({ title, children, isOpen, onClick }) => {
  const theme = useTheme();

  const itemStyles = {
    backgroundColor: theme.colors.background.main,
    border: `1px solid ${theme.colors.border.light}`,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    transition: `all ${theme.animations.transition.normal} ${theme.animations.easing.default}`,
  };

  const headerStyles = {
    padding: theme.spacing.lg,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: isOpen ? theme.colors.background.secondary : theme.colors.background.main,
    transition: `background-color ${theme.animations.transition.fast}`,
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    margin: 0,
  };

  const iconStyles = {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.primary.brand,
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: `transform ${theme.animations.transition.normal}`,
  };

  const contentStyles = {
    maxHeight: isOpen ? '500px' : '0',
    overflow: 'hidden',
    transition: `max-height ${theme.animations.transition.slow} ${theme.animations.easing.default}`,
  };

  const innerContentStyles = {
    padding: isOpen ? theme.spacing.lg : '0 ' + theme.spacing.lg,
    paddingTop: 0,
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.base,
    lineHeight: theme.typography.lineHeight.relaxed,
  };

  return (
    <div className="accordion-item" style={itemStyles}>
      <div
        className="accordion-header"
        style={headerStyles}
        onClick={onClick}
      >
        <h3 style={titleStyles}>{title}</h3>
        <span style={iconStyles}>▼</span>
      </div>
      <div className="accordion-content" style={contentStyles}>
        <div style={innerContentStyles}>
          {children}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ items, allowMultiple = false, defaultOpenIndex = null }) => {
  const [openIndexes, setOpenIndexes] = useState(
    defaultOpenIndex !== null ? [defaultOpenIndex] : []
  );

  const handleToggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes(prev =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndexes.includes(index)}
          onClick={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
