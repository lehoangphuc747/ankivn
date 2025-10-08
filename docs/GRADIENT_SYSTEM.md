# Custom Gradient System for Course Layouts

## Overview

The gradient system allows you to customize the visual appearance of course pages by defining custom gradients for different sections. This system provides flexibility while maintaining consistency across the site.

## How It Works

### 1. Basic Usage

```astro
---
import CourseLayout from '../../layouts/CourseLayout.astro';
import { getGradientTheme } from '../../utils/gradients';

// Use a predefined theme
const courseGradients = getGradientTheme('basic');

// Or define custom gradients
const customGradients = {
  hero: {
    direction: 'to-br',
    from: 'emerald-50',
    to: 'sky-50',
    via: 'green-50'  // Optional middle color
  },
  moduleHeader: {
    direction: 'to-r',
    from: 'emerald-600',
    to: 'sky-600'
  }
};
---

<CourseLayout 
  course={courseData}
  theme={themeData}
  gradients={courseGradients} // or customGradients
/>
```

### 2. Predefined Themes

The system includes predefined themes for common course types:

- **`basic`**: Green to blue gradients (perfect for beginner courses)
- **`advanced`**: Purple to pink gradients (for advanced courses)
- **`pro`**: Orange to red gradients (for professional/expert courses)

### 3. Theme Override

You can use a predefined theme as a base and override specific gradients:

```astro
const customGradients = getGradientTheme('basic', {
  hero: {
    direction: 'to-br',
    from: 'emerald-50',
    to: 'sky-50',
    via: 'green-50'
  }
  // moduleHeader will still use the 'basic' theme default
});
```

### 4. Fallback System

If no gradients are specified, the system will fall back to default gradients:
- Hero: `bg-gradient-to-br from-blue-50 to-purple-50`
- Module Header: `bg-gradient-to-r from-blue-600 to-purple-600`

## Gradient Configuration

### GradientConfig Interface

```typescript
interface GradientConfig {
  direction?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
  from: string;        // Starting color (e.g., 'blue-50')
  to: string;          // Ending color (e.g., 'purple-50')
  via?: string;        // Optional middle color (e.g., 'indigo-50')
}
```

### Available Sections

- **`hero`**: The main banner section at the top of the page
- **`moduleHeader`**: The header sections for each course module

## Examples

### Example 1: Basic Course with Custom Hero

```astro
const gradients = {
  hero: {
    direction: 'to-br',
    from: 'green-50',
    to: 'blue-50'
  }
  // moduleHeader will use default
};
```

### Example 2: Advanced Course with Custom Module Headers

```astro
const gradients = getGradientTheme('advanced', {
  moduleHeader: {
    direction: 'to-r',
    from: 'purple-700',
    to: 'pink-700'
  }
});
```

### Example 3: Completely Custom Theme

```astro
const gradients = {
  hero: {
    direction: 'to-bl',
    from: 'yellow-50',
    to: 'orange-50',
    via: 'amber-50'
  },
  moduleHeader: {
    direction: 'to-r',
    from: 'yellow-600',
    to: 'orange-600'
  }
};
```

## Extending the System

### Adding New Predefined Themes

Edit `src/utils/gradients.ts` and add new themes to the `gradientThemes` object:

```typescript
export const gradientThemes = {
  // ... existing themes
  expert: {
    hero: {
      direction: 'to-br' as const,
      from: 'slate-50',
      to: 'gray-50'
    },
    moduleHeader: {
      direction: 'to-r' as const,
      from: 'slate-600',
      to: 'gray-600'
    }
  }
} as const;
```

### Adding New Gradient Sections

1. Update the `CourseGradients` interface in `gradients.ts`
2. Add the new section to `defaultGradients`
3. Update `CourseLayout.astro` to use the new gradient section

## Best Practices

1. **Use semantic color names**: Prefer `emerald-50` over `green-50` for better specificity
2. **Maintain contrast**: Ensure text remains readable over gradient backgrounds
3. **Keep it subtle**: Light gradients (50-100) work best for hero sections
4. **Stay consistent**: Use the same color family across hero and module headers
5. **Test responsiveness**: Gradients should work well on all screen sizes

## Migration from Old System

If you have existing course pages, they will continue to work without changes. The old hardcoded gradients are now the default fallbacks.

To migrate:
1. Import the gradient utilities
2. Define your custom gradients
3. Pass them to the `CourseLayout` component
4. Test the visual appearance