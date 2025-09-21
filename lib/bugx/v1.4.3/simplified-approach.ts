/**
 * BugX v1.4.3 - Simplified Risk Assessment
 * 
 * BASED ON USER FEEDBACK:
 * 1. Simplify prompt system to one universal risk trigger
 * 2. Extract React-specific patterns from general methodology  
 * 3. Add prompt effectiveness measurement
 * 
 * @version 1.4.3
 * @author David Schwager / BrewX
 * @date September 2025
 */

// ===================================================================
// SIMPLIFIED UNIVERSAL RISK PROMPT
// ===================================================================

export interface UniversalRiskPrompt {
  trigger: string;
  riskLevel: 1 | 2 | 3 | 4 | 5; // 1=low, 5=critical
  referenceFailure?: string; // Actual past failure for context
  message: string;
  options: {
    safe: { description: string; creditCost: number; };
    risky: { description: string; creditCost: number; };
  };
}

export const createRiskPrompt = (
  context: string, 
  riskLevel: 1 | 2 | 3 | 4 | 5,
  referenceFailure?: string
): UniversalRiskPrompt => {
  
  const riskMessages = {
    1: "This is straightforward but I can plan first if you prefer.",
    2: "This has moderate complexity. Planning might help.",
    3: "This appears risky based on complexity patterns.",
    4: "This is similar to past failures. Strong recommend planning first.",
    5: "This is extremely similar to known failure patterns. Plan first strongly advised."
  };
  
  const baseMessage = riskMessages[riskLevel];
  const failureContext = referenceFailure ? `\n\n📚 Reference: ${referenceFailure}` : '';
  
  return {
    trigger: context,
    riskLevel,
    referenceFailure,
    message: `${baseMessage}${failureContext}\n\nHow should I proceed?`,
    options: {
      safe: {
        description: "Plan first (safer, slightly more credits)",
        creditCost: Math.max(3, riskLevel + 2)
      },
      risky: {
        description: "Implement directly (faster, riskier)",
        creditCost: Math.max(1, riskLevel - 1)
      }
    }
  };
};

// ===================================================================
// FRAMEWORK-SPECIFIC PATTERN EXTRACTION
// ===================================================================

export interface FrameworkPattern {
  framework: 'react' | 'database' | 'api' | 'general';
  patternName: string;
  riskLevel: 1 | 2 | 3 | 4 | 5;
  knownFailures: string[];
  safeApproach: string;
  riskyApproach: string;
}

export const REACT_PATTERNS: FrameworkPattern[] = [
  {
    framework: 'react',
    patternName: 'conditional_rendering_with_state',
    riskLevel: 4,
    knownFailures: ['11:19 timestamp - 400+ TypeScript errors from state management'],
    safeApproach: 'Plan useState variables → Add imports → Basic structure → Conditional logic',
    riskyApproach: 'Jump straight to complex conditional JSX'
  },
  {
    framework: 'react', 
    patternName: 'form_state_management',
    riskLevel: 3,
    knownFailures: [],
    safeApproach: 'Define form schema → Add validation → Implement handlers → Connect UI',
    riskyApproach: 'Build form UI first, add state management after'
  }
];

export const DATABASE_PATTERNS: FrameworkPattern[] = [
  {
    framework: 'database',
    patternName: 'schema_changes_with_features',
    riskLevel: 3,
    knownFailures: [],
    safeApproach: 'Update schema → Test migrations → Implement features → Integration test',
    riskyApproach: 'Implement features and schema changes simultaneously'
  }
];

// ===================================================================
// PROMPT EFFECTIVENESS MEASUREMENT
// ===================================================================

export interface PromptOutcome {
  promptId: string;
  userChoice: 'safe' | 'risky';
  actualResult: 'success' | 'failure';
  creditsCost: number;
  errorCount: number;
  timestamp: Date;
  context: string;
}

export class PromptEffectivenessTracker {
  private outcomes: PromptOutcome[] = [];
  
  recordOutcome(outcome: PromptOutcome) {
    this.outcomes.push(outcome);
  }
  
  getEffectivenessReport() {
    const safeChoices = this.outcomes.filter(o => o.userChoice === 'safe');
    const riskyChoices = this.outcomes.filter(o => o.userChoice === 'risky');
    
    const safeSuccessRate = safeChoices.filter(o => o.actualResult === 'success').length / safeChoices.length;
    const riskySuccessRate = riskyChoices.filter(o => o.actualResult === 'success').length / riskyChoices.length;
    
    const avgCreditsSafe = safeChoices.reduce((sum, o) => sum + o.creditsCost, 0) / safeChoices.length;
    const avgCreditsRisky = riskyChoices.reduce((sum, o) => sum + o.creditsCost, 0) / riskyChoices.length;
    
    return {
      totalPrompts: this.outcomes.length,
      userOverrideRate: riskyChoices.length / this.outcomes.length,
      safeChoiceStats: {
        count: safeChoices.length,
        successRate: safeSuccessRate,
        avgCredits: avgCreditsSafe
      },
      riskyChoiceStats: {
        count: riskyChoices.length, 
        successRate: riskySuccessRate,
        avgCredits: avgCreditsRisky
      },
      promptCalibration: this.evaluatePromptCalibration(),
      recommendations: this.generateRecommendations()
    };
  }
  
  private evaluatePromptCalibration() {
    const riskyChoices = this.outcomes.filter(o => o.userChoice === 'risky');
    const riskyFailures = riskyChoices.filter(o => o.actualResult === 'failure');
    
    if (riskyChoices.length === 0) return 'insufficient_data';
    
    const riskyFailureRate = riskyFailures.length / riskyChoices.length;
    
    if (riskyFailureRate > 0.7) return 'well_calibrated'; // High risk warnings are accurate
    if (riskyFailureRate > 0.3) return 'moderately_calibrated';
    if (riskyFailureRate < 0.1) return 'too_conservative'; // Warnings too frequent for actual risk
    
    return 'needs_adjustment';
  }
  
  private generateRecommendations() {
    const report = this.getEffectivenessReport();
    const recommendations: string[] = [];
    
    if (report.userOverrideRate > 0.8) {
      recommendations.push('Users ignore warnings 80%+ of time. Prompts may be too conservative or not valuable.');
    }
    
    if (report.riskyChoiceStats.successRate > 0.8) {
      recommendations.push('Risky choices succeed 80%+ of time. Consider reducing prompt sensitivity.');
    }
    
    if (report.safeChoiceStats.successRate < 0.9) {
      recommendations.push('Safe choices failing too often. Review what constitutes "safe" approach.');
    }
    
    return recommendations;
  }
}

// ===================================================================
// SIMPLIFIED WORKFLOW
// ===================================================================

export const BugXv143SimpleWorkflow = {
  
  // Single risk assessment instead of multiple prompt types
  assessRisk: (userRequest: string, context: any) => {
    // Check against known failure patterns
    const reactRisk = REACT_PATTERNS.find(p => 
      userRequest.includes('conditional') && userRequest.includes('react')
    );
    
    if (reactRisk && reactRisk.knownFailures.length > 0) {
      return createRiskPrompt(
        userRequest,
        reactRisk.riskLevel,
        reactRisk.knownFailures[0] // Reference actual failure
      );
    }
    
    // Default risk assessment
    const complexity = analyzeComplexity(userRequest);
    return createRiskPrompt(userRequest, complexity);
  },
  
  // Framework-specific guidance
  getFrameworkGuidance: (framework: 'react' | 'database' | 'api', pattern: string) => {
    const patterns = framework === 'react' ? REACT_PATTERNS : 
                    framework === 'database' ? DATABASE_PATTERNS : [];
    
    return patterns.find(p => p.patternName === pattern);
  },
  
  // Track and learn from outcomes
  trackOutcome: (tracker: PromptEffectivenessTracker, outcome: PromptOutcome) => {
    tracker.recordOutcome(outcome);
    
    // Auto-adjust sensitivity based on effectiveness
    const report = tracker.getEffectivenessReport();
    if (report.recommendations.length > 0) {
      console.log('🔄 BugX v1.4.3: Prompt system recommendations:', report.recommendations);
    }
  }
};

function analyzeComplexity(userRequest: string): 1 | 2 | 3 | 4 | 5 {
  const request = userRequest.toLowerCase();
  
  if (request.includes('conditional') && request.includes('state')) return 4;
  if (request.includes('database') && request.includes('schema')) return 3;
  if (request.includes('complex') || request.includes('multiple')) return 3;
  if (request.includes('simple') || request.includes('basic')) return 1;
  
  return 2; // Default moderate complexity
}

export default BugXv143SimpleWorkflow;