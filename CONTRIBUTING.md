# Contributing to Closet Muse

Thank you for your interest in contributing to Closet Muse! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/Closet-Muse-Mobile-App-Interface.git
cd Closet-Muse-Mobile-App-Interface
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

## Development Workflow

### 1. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed

### 2. Test Your Changes

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests
npm run test

# Run all checks
npm run validate
```

### 3. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>(<scope>): <subject>

git commit -m "feat: add new outfit filter"
git commit -m "fix: resolve calendar date bug"
git commit -m "docs: update README installation steps"
git commit -m "style: format code with prettier"
git commit -m "refactor: simplify wardrobe logic"
git commit -m "test: add tests for outfit builder"
git commit -m "chore: update dependencies"
```

**Commit Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 4. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Code Style Guidelines

### TypeScript

```typescript
// ✅ Good
interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
}

function addItem(item: ClothingItem): void {
  // Implementation
}

// ❌ Bad
function addItem(item: any) {
  // Implementation
}
```

### React Components

```typescript
// ✅ Good - Functional component with TypeScript
interface Props {
  title: string;
  onClose: () => void;
}

export function Modal({ title, onClose }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

// ❌ Bad - No types, unclear props
export function Modal(props) {
  return <div>{props.title}</div>;
}
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `WardrobeManager.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `index.ts` in types folder
- Constants: `index.ts` in constants folder

### Import Order

```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Third-party imports
import { toast } from 'sonner';

// 3. Internal imports - absolute paths
import { useAppContext } from '@/contexts/AppContext';
import { ClothingItem } from '@/shared/types';

// 4. Relative imports
import { Button } from './Button';

// 5. Styles
import './styles.css';
```

## Testing Guidelines

### Unit Tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/shared/utils/test-utils';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(onClick).toHaveBeenCalledOnce();
  });
});
```

### Test Coverage

- Aim for 80%+ coverage on new code
- Test critical paths thoroughly
- Include edge cases
- Test error handling

## Pull Request Guidelines

### PR Title

Follow the same format as commit messages:

```
feat: add outfit sharing feature
fix: resolve calendar rendering issue
```

### PR Description

Include:

1. **What**: What changes were made
2. **Why**: Why these changes were needed
3. **How**: How the changes were implemented
4. **Testing**: How to test the changes
5. **Screenshots**: For UI changes

Example:

```markdown
## What

Added ability to share outfits via link

## Why

Users requested the ability to share their favorite outfits with friends

## How

- Created ShareButton component
- Implemented URL generation with outfit data
- Added copy-to-clipboard functionality

## Testing

1. Create an outfit
2. Click the share button
3. Verify link is copied
4. Open link in new tab
5. Verify outfit displays correctly

## Screenshots

[Add screenshots here]
```

### PR Checklist

Before submitting, ensure:

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Commits follow conventional format
- [ ] PR description is complete

## Review Process

1. **Automated Checks**: CI must pass
2. **Code Review**: At least one approval required
3. **Testing**: Reviewer tests the changes
4. **Merge**: Squash and merge to main

## Project Structure

When adding new features, follow this structure:

```
src/
├── components/
│   ├── YourFeature.tsx      # Main component
│   └── __tests__/
│       └── YourFeature.test.tsx
├── shared/
│   ├── types/
│   │   └── index.ts         # Add types here
│   ├── constants/
│   │   └── index.ts         # Add constants here
│   └── utils/
│       └── yourUtil.ts      # Add utilities here
```

## Common Tasks

### Adding a New Component

```bash
# 1. Create component file
touch src/components/NewComponent.tsx

# 2. Create test file
touch src/components/__tests__/NewComponent.test.tsx

# 3. Add types if needed
# Edit src/shared/types/index.ts

# 4. Export component
# Add to src/components/index.ts
```

### Adding a New Utility

```bash
# 1. Create utility file
touch src/shared/utils/newUtil.ts

# 2. Create test file
touch src/shared/utils/__tests__/newUtil.test.ts

# 3. Export utility
# Add to src/shared/utils/index.ts
```

## Getting Help

- **Issues**: Check existing issues or create a new one
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Read the docs in `/docs` folder

## Recognition

Contributors will be:

- Listed in the README
- Mentioned in release notes
- Credited in the project

Thank you for contributing to Closet Muse! 🎉
