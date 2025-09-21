/**
 * BugX v1.4.3 - React-Specific Pattern Library
 * 
 * Extracted React development patterns from general methodology
 * Based on actual failures and successful approaches
 * 
 * @version 1.4.3
 */

export interface ReactPattern {
  id: string;
  name: string;
  riskLevel: 1 | 2 | 3 | 4 | 5;
  triggers: string[];
  knownFailures: Array<{
    timestamp: string;
    description: string;
    errorCount: number;
    creditsCost: number;
  }>;
  safeApproach: {
    steps: string[];
    estimatedCredits: number;
    validationPoints: string[];
  };
  riskyApproach: {
    description: string;
    whyRisky: string;
    typicalProblems: string[];
  };
}

// ===================================================================
// REACT PATTERN DEFINITIONS
// ===================================================================

export const CONDITIONAL_RENDERING_WITH_STATE: ReactPattern = {
  id: 'conditional_rendering_state',
  name: 'Conditional Rendering with useState',
  riskLevel: 4,
  triggers: [
    'conditional logic',
    'role-based',
    'show/hide fields',
    'dropdown dependencies',
    'dynamic form fields'
  ],
  knownFailures: [
    {
      timestamp: '11:19',
      description: '400+ TypeScript errors from React state management implementation',
      errorCount: 400,
      creditsCost: 82
    }
  ],
  safeApproach: {
    steps: [
      '1. Add React imports (useState, event types)',
      '2. Define state variables and types',
      '3. Create event handlers',
      '4. Build basic static JSX structure', 
      '5. Add conditional rendering logic',
      '6. Test and validate'
    ],
    estimatedCredits: 12,
    validationPoints: [
      'After imports (compile check)',
      'After state setup (type check)', 
      'After conditional logic (integration test)'
    ]
  },
  riskyApproach: {
    description: 'Jump directly to complex conditional JSX without state planning',
    whyRisky: 'Creates syntax cascades when state variables are undefined',
    typicalProblems: [
      'useState not imported',
      'Event handlers missing',
      'State variable name mismatches',
      'TypeScript type errors',
      'Conditional syntax errors'
    ]
  }
};

export const FORM_STATE_MANAGEMENT: ReactPattern = {
  id: 'form_state_management',
  name: 'Form State Management',
  riskLevel: 3,
  triggers: [
    'form validation',
    'form state',
    'input handling',
    'form submission'
  ],
  knownFailures: [],
  safeApproach: {
    steps: [
      '1. Define form schema and validation rules',
      '2. Set up form state (useState or form library)',
      '3. Create input change handlers',
      '4. Build form JSX with proper name attributes',
      '5. Add submission handler',
      '6. Connect validation feedback'
    ],
    estimatedCredits: 8,
    validationPoints: [
      'After schema definition',
      'After handlers setup',
      'After form submission test'
    ]
  },
  riskyApproach: {
    description: 'Build form UI first, add state management after',
    whyRisky: 'Form inputs without proper state binding cause sync issues',
    typicalProblems: [
      'Uncontrolled inputs',
      'Missing name attributes',
      'Validation not connected',
      'Form submission errors'
    ]
  }
};

export const COMPONENT_PROP_DRILLING: ReactPattern = {
  id: 'component_prop_drilling',
  name: 'Component Prop Drilling',
  riskLevel: 2,
  triggers: [
    'nested components',
    'prop passing',
    'component hierarchy'
  ],
  knownFailures: [],
  safeApproach: {
    steps: [
      '1. Map component hierarchy and data flow',
      '2. Define prop interfaces',
      '3. Start with parent component',
      '4. Add child components one at a time',
      '5. Test prop flow at each level'
    ],
    estimatedCredits: 6,
    validationPoints: [
      'After each component addition',
      'After prop interface changes'
    ]
  },
  riskyApproach: {
    description: 'Build all components simultaneously without interface planning',
    whyRisky: 'Prop type mismatches and missing props cause cascading errors',
    typicalProblems: [
      'Prop type errors',
      'Missing required props',
      'Incorrect prop names',
      'Interface mismatches'
    ]
  }
};

// ===================================================================
// PATTERN DETECTION SYSTEM
// ===================================================================

export const detectReactPattern = (userRequest: string): ReactPattern | null => {
  const request = userRequest.toLowerCase();
  
  // Check conditional rendering pattern
  if (CONDITIONAL_RENDERING_WITH_STATE.triggers.some(trigger => 
    request.includes(trigger.toLowerCase())
  )) {
    return CONDITIONAL_RENDERING_WITH_STATE;
  }
  
  // Check form state pattern
  if (FORM_STATE_MANAGEMENT.triggers.some(trigger => 
    request.includes(trigger.toLowerCase())
  )) {
    return FORM_STATE_MANAGEMENT;
  }
  
  // Check prop drilling pattern
  if (COMPONENT_PROP_DRILLING.triggers.some(trigger => 
    request.includes(trigger.toLowerCase())
  )) {
    return COMPONENT_PROP_DRILLING;
  }
  
  return null;
};

// ===================================================================
// REACT-SPECIFIC GUIDANCE GENERATOR
// ===================================================================

export const generateReactGuidance = (pattern: ReactPattern) => {
  const hasKnownFailures = pattern.knownFailures.length > 0;
  const referenceFailure = hasKnownFailures ? pattern.knownFailures[0] : null;
  
  return {
    pattern: pattern.name,
    riskLevel: pattern.riskLevel,
    referenceFailure: referenceFailure ? 
      `${referenceFailure.timestamp} - ${referenceFailure.description}` : null,
    safeApproach: {
      description: `Follow ${pattern.safeApproach.steps.length}-step incremental approach`,
      steps: pattern.safeApproach.steps,
      estimatedCredits: pattern.safeApproach.estimatedCredits,
      validationPoints: pattern.safeApproach.validationPoints
    },
    riskyApproach: {
      description: pattern.riskyApproach.description,
      whyRisky: pattern.riskyApproach.whyRisky,
      typicalProblems: pattern.riskyApproach.typicalProblems
    }
  };
};

// ===================================================================
// SUCCESS PATTERN TRACKING
// ===================================================================

export interface ReactPatternOutcome {
  patternId: string;
  approach: 'safe' | 'risky';
  result: 'success' | 'failure';
  actualCredits: number;
  errorCount: number;
  timestamp: Date;
}

export class ReactPatternTracker {
  private outcomes: ReactPatternOutcome[] = [];
  
  recordOutcome(outcome: ReactPatternOutcome) {
    this.outcomes.push(outcome);
  }
  
  getPatternEffectiveness(patternId: string) {
    const patternOutcomes = this.outcomes.filter(o => o.patternId === patternId);
    const safeOutcomes = patternOutcomes.filter(o => o.approach === 'safe');
    const riskyOutcomes = patternOutcomes.filter(o => o.approach === 'risky');
    
    return {
      totalAttempts: patternOutcomes.length,
      safeSuccessRate: safeOutcomes.filter(o => o.result === 'success').length / safeOutcomes.length,
      riskySuccessRate: riskyOutcomes.filter(o => o.result === 'success').length / riskyOutcomes.length,
      avgCreditsSafe: safeOutcomes.reduce((sum, o) => sum + o.actualCredits, 0) / safeOutcomes.length,
      avgCreditsRisky: riskyOutcomes.reduce((sum, o) => sum + o.actualCredits, 0) / riskyOutcomes.length
    };
  }
  
  shouldAdjustRiskLevel(patternId: string): number | null {
    const effectiveness = this.getPatternEffectiveness(patternId);
    
    if (effectiveness.totalAttempts < 3) return null; // Need more data
    
    // If risky approach succeeds 80%+ of time, reduce risk level
    if (effectiveness.riskySuccessRate > 0.8) {
      return -1; // Reduce risk level by 1
    }
    
    // If safe approach fails 20%+ of time, increase risk level  
    if (effectiveness.safeSuccessRate < 0.8) {
      return +1; // Increase risk level by 1
    }
    
    return null; // No adjustment needed
  }
}

export const reactPatternTracker = new ReactPatternTracker();

// ===================================================================
// EXPORTS
// ===================================================================

export const REACT_PATTERNS = [
  CONDITIONAL_RENDERING_WITH_STATE,
  FORM_STATE_MANAGEMENT,
  COMPONENT_PROP_DRILLING
];

export default {
  detectReactPattern,
  generateReactGuidance,
  reactPatternTracker,
  REACT_PATTERNS
};