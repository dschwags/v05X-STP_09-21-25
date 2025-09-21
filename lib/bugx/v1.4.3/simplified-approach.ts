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

// REACT_PATTERNS moved to react-patterns.ts to avoid export conflict

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
// PROMPT EFFECTIVENESS MEASUREMENT - MOVED TO measurement-system.ts
// ===================================================================

// ===================================================================
// SIMPLIFIED WORKFLOW
// ===================================================================

export const BugXv143SimpleWorkflow = {
  
  // Single risk assessment instead of multiple prompt types
  assessRisk: (userRequest: string, context: any) => {
    // Check against known failure patterns - import REACT_PATTERNS from react-patterns.ts
    // const reactRisk = REACT_PATTERNS.find(p => 
    //   userRequest.includes('conditional') && userRequest.includes('react')
    // );
    
    // if (reactRisk && reactRisk.knownFailures.length > 0) {
    //   return createRiskPrompt(
    //     userRequest,
    //     reactRisk.riskLevel,
    //     reactRisk.knownFailures[0] // Reference actual failure
    //   );
    // }
    
    // Default risk assessment
    const complexity = analyzeComplexity(userRequest);
    return createRiskPrompt(userRequest, complexity);
  },
  
  // Framework-specific guidance
  getFrameworkGuidance: (framework: 'react' | 'database' | 'api', pattern: string) => {
    const patterns = framework === 'database' ? DATABASE_PATTERNS : [];
    
    return patterns.find(p => p.patternName === pattern);
  },
  
  // Track and learn from outcomes - use measurement-system.ts
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