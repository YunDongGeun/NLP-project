# Component Library Documentation

This component library is built using the theme system defined in `theme.json` at the project root. All components are designed to be reusable, centralized, and consistent with the design system.

## Setup

### 1. Wrap your app with ThemeProvider

```jsx
import { ThemeProvider } from './theme';

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### 2. Import components

```jsx
import { Button, Card, Input, Navbar, UploadArea } from './components';
```

## Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: 'primary' | 'secondary' | 'accent' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `fullWidth`: boolean (default: false)
- `disabled`: boolean (default: false)
- `onClick`: function
- `type`: 'button' | 'submit' | 'reset' (default: 'button')

**Example:**
```jsx
<Button variant="primary" size="md" onClick={() => alert('Clicked!')}>
  Click Me
</Button>

<Button variant="secondary" disabled>
  Disabled Button
</Button>

<Button variant="accent" size="lg" fullWidth>
  Full Width Button
</Button>
```

---

### Card

A flexible card component for displaying content with optional title, subtitle, and footer.

**Props:**
- `title`: string
- `subtitle`: string
- `footer`: React.ReactNode
- `hoverable`: boolean (default: false) - Adds hover animation
- `clickable`: boolean (default: false) - Makes card clickable
- `onClick`: function
- `padding`: 'none' | 'sm' | 'default' | 'lg' (default: 'default')

**Example:**
```jsx
<Card
  title="Card Title"
  subtitle="Card subtitle"
  hoverable
  footer={<Button variant="secondary" size="sm">Action</Button>}
>
  <p>Card content goes here</p>
</Card>

<Card clickable onClick={() => alert('Card clicked!')}>
  <p>This entire card is clickable</p>
</Card>
```

---

### Input

A comprehensive input component with label, icons, error states, and helper text.

**Props:**
- `label`: string
- `type`: string (default: 'text')
- `placeholder`: string
- `value`: string
- `onChange`: function
- `error`: string
- `helperText`: string
- `disabled`: boolean (default: false)
- `fullWidth`: boolean (default: false)
- `required`: boolean (default: false)
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode

**Example:**
```jsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  helperText="We'll never share your email"
  required
  fullWidth
  leftIcon={<span>📧</span>}
/>

<Input
  label="Password"
  type="password"
  error="Password is required"
  fullWidth
/>
```

---

### Navbar

A responsive navigation bar with logo, navigation items, and action buttons.

**Props:**
- `logo`: React.ReactNode
- `logoText`: string (default: 'Logo')
- `navItems`: Array<{label: string, href?: string, onClick?: function}>
- `actions`: React.ReactNode
- `sticky`: boolean (default: true)
- `onLogoClick`: function

**Example:**
```jsx
<Navbar
  logoText="My App"
  navItems={[
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Contact', onClick: () => alert('Contact!') }
  ]}
  actions={
    <>
      <Button variant="secondary" size="sm">Login</Button>
      <Button variant="primary" size="sm">Sign Up</Button>
    </>
  }
/>
```

---

### UploadArea

A drag-and-drop file upload area with validation.

**Props:**
- `onFileSelect`: function(files)
- `acceptedFileTypes`: string (default: '*')
- `maxFileSizeMB`: number (default: 10)
- `multiple`: boolean (default: false)
- `disabled`: boolean (default: false)
- `title`: string (default: 'Upload Files')
- `description`: string
- `icon`: React.ReactNode

**Example:**
```jsx
<UploadArea
  title="Upload Your Documents"
  description="Drag and drop files here or click to browse"
  icon={<span>📁</span>}
  onFileSelect={(files) => console.log(files)}
  multiple
  maxFileSizeMB={10}
  acceptedFileTypes=".pdf,.doc,.docx"
/>
```

---

## Using the Theme

You can access the theme directly in your components using the `useTheme` hook:

```jsx
import { useTheme } from './theme';

function MyComponent() {
  const theme = useTheme();

  return (
    <div style={{
      backgroundColor: theme.colors.primary.brand,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      boxShadow: theme.shadows.md
    }}>
      Content
    </div>
  );
}
```

## Theme Structure

The theme provides:
- **Colors**: primary, background, text, accent, border
- **Typography**: fontFamily, fontSize, fontWeight, lineHeight
- **Spacing**: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
- **Border Radius**: none, sm, md, lg, xl, 2xl, full
- **Shadows**: sm, md, lg, xl, 2xl
- **Animations**: transition times and easing functions
- **Layout**: container and max-width settings

## Running the Demo

```bash
cd nlp-project
npm install
npm run dev
```

Visit `http://localhost:5173` to see all components in action.

## Best Practices

1. **Always use ThemeProvider**: Wrap your app with ThemeProvider to ensure all components have access to the theme.

2. **Use theme values**: Instead of hardcoding colors, spacing, or other design tokens, use values from the theme for consistency.

3. **Component composition**: Combine components to create more complex UI patterns.

4. **Accessibility**: All components support standard HTML attributes and ARIA properties.

5. **Responsive design**: Components are built mobile-first and work across all screen sizes.

## Customization

To customize the theme, edit the `/theme.json` file at the project root and the changes will automatically propagate to all components.
