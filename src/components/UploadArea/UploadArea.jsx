import { useState, useRef } from 'react';
import { useTheme } from '../../theme';
import './UploadArea.css';

const UploadArea = ({
  onFileSelect,
  acceptedFileTypes = '*',
  maxFileSizeMB = 10,
  multiple = false,
  disabled = false,
  title = 'Upload Files',
  description = 'Drag and drop files here or click to browse',
  icon,
  className = '',
  ...props
}) => {
  const theme = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const uploadAreaStyles = {
    backgroundColor: isDragging
      ? theme.components.uploadArea.hover.backgroundColor
      : theme.components.uploadArea.backgroundColor,
    border: isDragging
      ? `2px dashed ${theme.components.uploadArea.hover.borderColor}`
      : theme.components.uploadArea.border,
    borderRadius: theme.components.uploadArea.borderRadius,
    padding: theme.components.uploadArea.padding,
    textAlign: theme.components.uploadArea.textAlign,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `all ${theme.animations.transition.normal} ${theme.animations.easing.default}`,
    opacity: disabled ? 0.6 : 1,
    fontFamily: theme.typography.fontFamily.primary,
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  };

  const descriptionStyles = {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  };

  const iconStyles = {
    fontSize: theme.typography.fontSize['4xl'],
    color: isDragging ? theme.colors.primary.brand : theme.colors.text.tertiary,
    marginBottom: theme.spacing.md,
    transition: `color ${theme.animations.transition.normal}`,
  };

  const errorStyles = {
    color: theme.colors.accent.yellow,
    fontSize: theme.typography.fontSize.sm,
    marginTop: theme.spacing.sm,
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFile = (file) => {
    const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;
    if (file.size > maxFileSizeBytes) {
      return `File size exceeds ${maxFileSizeMB}MB limit`;
    }
    return null;
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = [];
    let errorMessage = '';

    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        errorMessage = error;
        break;
      }
      validFiles.push(file);
    }

    if (errorMessage) {
      setError(errorMessage);
      setTimeout(() => setError(''), 3000);
      return;
    }

    setError('');
    if (onFileSelect) {
      onFileSelect(multiple ? validFiles : validFiles[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  return (
    <div
      className={`upload-area ${isDragging ? 'dragging' : ''} ${className}`}
      style={uploadAreaStyles}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      {...props}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes}
        multiple={multiple}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      {icon && <div style={iconStyles}>{icon}</div>}

      <h3 style={titleStyles}>{title}</h3>
      <p style={descriptionStyles}>{description}</p>

      {error && <p style={errorStyles}>{error}</p>}
    </div>
  );
};

export default UploadArea;
