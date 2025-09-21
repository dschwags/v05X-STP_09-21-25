/**
 * BugX v1.4.3 - Simplified Risk Assessment Framework
 * 
 * CORE IMPROVEMENTS:
 * 1. Single universal risk prompt (no decision fatigue)
 * 2. Framework-specific patterns (React vs Database vs API)
 * 3. Effectiveness measurement and auto-calibration
 * 4. Direct reference to actual failures (11:19 timestamp)
 * 
 * @version 1.4.3
 * @author David Schwager / BrewX
 * @date September 2025
 */

// Re-export base functionality
export * from './simplified-approach';
export * from './react-patterns';
export * from './measurement-system';
export * from './workflow-integration';

// ===================================================================
// MAIN BugX v1.4.3 INTERFACE
// ===================================================================

export interface BugXConfig {
  enablePrompts: boolean;
  trackEffectiveness: boolean;
  referenceFailures: boolean;
  autoCalibrate: boolean;
}

export interface RiskAssessmentResult {
  shouldPromptUser: boolean;
  riskLevel: 1 | 2 | 3 | 4 | 5;
  referenceFailure?: string;
  promptMessage?: string;
  safeOption: { description: string; creditCost: number };
  riskyOption: { description: string; creditCost: number };
}

export class BugXv143 {
  private config: BugXConfig;
  private effectivenessTracker: any;
  
  constructor(config: Partial<BugXConfig> = {}) {
    this.config = {
      enablePrompts: true,
      trackEffectiveness: true, 
      referenceFailures: true,
      autoCalibrate: true,
      ...config
    };
  }
  
  // Main risk assessment method
  assessRisk(userRequest: string, context: any = {}): RiskAssessmentResult {
    const riskLevel = this.calculateRiskLevel(userRequest, context);
    const referenceFailure = this.findReferenceFailure(userRequest);
    
    if (riskLevel >= 3) {
      return {
        shouldPromptUser: true,
        riskLevel,
        referenceFailure,
        promptMessage: this.generatePromptMessage(riskLevel, referenceFailure),
        safeOption: {
          description: "Plan first (safer, slightly more credits)",
          creditCost: Math.max(3, riskLevel + 2)
        },
        riskyOption: {
          description: "Implement directly (faster, riskier)", 
          creditCost: Math.max(1, riskLevel - 1)
        }
      };
    }
    
    return {
      shouldPromptUser: false,
      riskLevel,
      safeOption: { description: "Standard implementation", creditCost: 5 },
      riskyOption: { description: "Standard implementation", creditCost: 5 }
    };
  }
  
  private calculateRiskLevel(userRequest: string, context: any): 1 | 2 | 3 | 4 | 5 {
    const request = userRequest.toLowerCase();
    
    // High risk: Known failure patterns
    if (request.includes('conditional') && (request.includes('react') || request.includes('state'))) {
      return 4; // 11:19 timestamp pattern
    }
    
    if (request.includes('database') && request.includes('schema') && request.includes('feature')) {
      return 3; // Schema + feature simultaneous changes
    }
    
    // Medium risk: Complexity indicators
    if (request.includes('complex') || request.includes('multiple') || request.includes('integration')) {
      return 3;
    }
    
    // Low risk: Simple operations
    if (request.includes('simple') || request.includes('basic') || request.includes('text')) {
      return 1;
    }
    
    // Credit pressure increases risk
    if (context.creditBalance && context.creditBalance < 50) {
      return Math.min(5, this.calculateRiskLevel(userRequest, {}) + 1) as 1 | 2 | 3 | 4 | 5;
    }
    
    return 2; // Default moderate risk
  }
  
  private findReferenceFailure(userRequest: string): string | undefined {
    const request = userRequest.toLowerCase();
    
    if (request.includes('conditional') && request.includes('react')) {
      return "11:19 timestamp - 400+ TypeScript errors from React state management";
    }
    
    // Add more reference failures as they occur
    return undefined;
  }
  
  private generatePromptMessage(riskLevel: number, referenceFailure?: string): string {
    const riskMessages = {
      1: "This is straightforward but I can plan first if you prefer.",
      2: "This has moderate complexity. Planning might help.", 
      3: "This appears risky based on complexity patterns.",
      4: "This is similar to past failures. Strong recommend planning first.",
      5: "This is extremely similar to known failure patterns. Plan first strongly advised."
    };
    
    const baseMessage = riskMessages[riskLevel as keyof typeof riskMessages];
    const failureContext = referenceFailure ? `\n\n📚 Reference: ${referenceFailure}` : '';
    
    return `${baseMessage}${failureContext}\n\nHow should I proceed?`;
  }
  
  // Record outcome for effectiveness tracking
  recordOutcome(userChoice: 'safe' | 'risky', result: 'success' | 'failure', creditsCost: number) {
    if (this.config.trackEffectiveness && this.effectivenessTracker) {
      this.effectivenessTracker.recordOutcome({
        userChoice,
        actualResult: result,
        creditsCost,
        timestamp: new Date()
      });
    }
  }
}

// ===================================================================
// GLOBAL INSTANCE FOR EASY INTEGRATION
// ===================================================================

export const bugx = new BugXv143({
  enablePrompts: true,
  trackEffectiveness: true,
  referenceFailures: true,
  autoCalibrate: true
});

// ===================================================================
// INTEGRATION HELPERS
// ===================================================================

export const shouldPromptUser = (userRequest: string, context: any = {}) => {
  const assessment = bugx.assessRisk(userRequest, context);
  return assessment;
};

export const formatRiskPrompt = (assessment: RiskAssessmentResult) => {
  if (!assessment.shouldPromptUser) return null;
  
  return `
🚨 **RISK ASSESSMENT**

${assessment.promptMessage}

**Options:**
A) ${assessment.safeOption.description} (${assessment.safeOption.creditCost} credits)
B) ${assessment.riskyOption.description} (${assessment.riskyOption.creditCost} credits)

**Your choice?**
`;
};

// Export for backward compatibility
export default bugx;