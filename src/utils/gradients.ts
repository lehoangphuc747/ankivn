// Gradient utility for course layouts
export interface GradientConfig {
  direction?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
  from: string;
  to: string;
  via?: string;
}

export interface CourseGradients {
  hero?: GradientConfig;
  moduleHeader?: GradientConfig;
}

// Default gradients that can be used as fallbacks
export const defaultGradients: CourseGradients = {
  hero: {
    direction: 'to-br',
    from: 'blue-50',
    to: 'purple-50'
  },
  moduleHeader: {
    direction: 'to-r',
    from: 'blue-600',
    to: 'purple-600'
  }
};

// Predefined gradient themes for different course types
export const gradientThemes = {
  basic: {
    hero: {
      direction: 'to-br' as const,
      from: 'green-50',
      to: 'blue-50'
    },
    moduleHeader: {
      direction: 'to-r' as const,
      from: 'emerald-500',
      to: 'sky-500'
    }
  },
  advanced: {
    hero: {
      direction: 'to-br' as const,
      from: 'purple-50',
      to: 'pink-50'
    },
    moduleHeader: {
      direction: 'to-r' as const,
      from: 'purple-600',
      to: 'pink-600'
    }
  },
  pro: {
    hero: {
      direction: 'to-br' as const,
      from: 'orange-50',
      to: 'red-50'
    },
    moduleHeader: {
      direction: 'to-r' as const,
      from: 'orange-600',
      to: 'red-600'
    }
  }
} as const;

// Helper function to generate Tailwind CSS gradient classes
export function buildGradientClass(config: GradientConfig): string {
  const direction = config.direction || 'to-br';
  
  // Handle custom hex colors
  if (config.from.startsWith('custom-')) {
    if (config.from === 'custom-blue' && config.to === 'custom-purple') {
      return `bg-gradient-${direction} custom-gradient-advanced`;
    }
    return `bg-gradient-${direction} custom-gradient`;
  }
  
  const parts = [`bg-gradient-${direction}`, `from-${config.from}`, `to-${config.to}`];
  
  if (config.via) {
    parts.splice(2, 0, `via-${config.via}`);
  }
  
  return parts.join(' ');
}

// Helper function to merge custom gradients with defaults
export function mergeGradients(custom?: Partial<CourseGradients>, fallback?: CourseGradients): CourseGradients {
  const base = fallback || defaultGradients;
  
  return {
    hero: custom?.hero || base.hero!,
    moduleHeader: custom?.moduleHeader || base.moduleHeader!
  };
}

// Get gradient theme by name with custom overrides
export function getGradientTheme(
  themeName: keyof typeof gradientThemes, 
  customOverrides?: Partial<CourseGradients>
): CourseGradients {
  const theme = gradientThemes[themeName];
  return mergeGradients(customOverrides, theme);
}