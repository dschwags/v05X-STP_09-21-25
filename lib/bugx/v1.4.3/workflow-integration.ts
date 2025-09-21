/**
 * BugX v1.4.3 - AI Workflow Integration
 * 
 * Integrates simplified risk assessment into actual AI decision-making
 * Makes the prompts actionable rather than just theoretical
 * 
 * @version 1.4.3
 */

import { bugx, formatRiskPrompt } from './index';
import { detectReactPattern, generateReactGuidance } from './react-patterns';
import { recordPromptOutcome } from './measurement-system';

export interface WorkflowContext {
  userRequest: string;
  creditBalance?: number;
  currentErrors?: number;
  codebaseComplexity?: 'simple' | 'moderate' | 'complex';
  frameworkType?: 'react' | 'database' | 'api' | 'general';
}

export interface WorkflowDecision {
  shouldPromptUser: boolean;
  promptMessage?: string;
  recommendedApproach: 'safe' | 'risky';
  estimatedCredits: {
    safe: number;
    risky: number;
  };
  specificGuidance?: {
    framework: string;
    pattern: string;
    steps: string[];
    validationPoints: string[];
  };
}

// ===================================================================
// MAIN WORKFLOW INTEGRATION
// ===================================================================

export class BugXWorkflow {
  
  // Main decision point - call this before any complex implementation
  analyzeImplementationRisk(context: WorkflowContext): WorkflowDecision {
    // Step 1: Basic risk assessment
    const riskAssessment = bugx.assessRisk(context.userRequest, {
      creditBalance: context.creditBalance,
      errorCount: context.currentErrors
    });
    
    // Step 2: Framework-specific analysis
    const frameworkGuidance = this.getFrameworkGuidance(context);
    
    // Step 3: Generate decision
    return {
      shouldPromptUser: riskAssessment.shouldPromptUser,
      promptMessage: riskAssessment.shouldPromptUser ? 
        formatRiskPrompt(riskAssessment) : undefined,
      recommendedApproach: riskAssessment.riskLevel >= 4 ? 'safe' : 'risky',
      estimatedCredits: {
        safe: riskAssessment.safeOption.creditCost,
        risky: riskAssessment.riskyOption.creditCost
      },
      specificGuidance: frameworkGuidance
    };
  }
  
  // Get framework-specific guidance
  private getFrameworkGuidance(context: WorkflowContext) {
    if (context.frameworkType === 'react') {
      const pattern = detectReactPattern(context.userRequest);
      if (pattern) {
        const guidance = generateReactGuidance(pattern);
        return {
          framework: 'React',
          pattern: guidance.pattern,
          steps: guidance.safeApproach.steps,
          validationPoints: guidance.safeApproach.validationPoints
        };
      }
    }
    
    return undefined;
  }
  
  // Record the outcome after implementation
  recordImplementationOutcome(
    context: WorkflowContext,
    userChoice: 'safe' | 'risky' | 'ignored',
    actualResult: 'success' | 'failure' | 'partial',
    actualCredits: number,
    errorCount: number = 0
  ) {
    const assessment = bugx.assessRisk(context.userRequest, {
      creditBalance: context.creditBalance,
      errorCount: context.currentErrors
    });
    
    recordPromptOutcome({
      userRequest: context.userRequest,
      riskLevel: assessment.riskLevel,
      userChoice,
      actualResult,
      actualCredits,
      estimatedCredits: userChoice === 'safe' ? 
        assessment.safeOption.creditCost : 
        assessment.riskyOption.creditCost,
      errorCount,
      referenceFailure: assessment.referenceFailure
    });
  }
}

// ===================================================================
// INTEGRATION HELPERS FOR AI WORKFLOW
// ===================================================================

export const bugxWorkflow = new BugXWorkflow();

// Helper: Check if we should prompt before implementation
export const shouldPromptBeforeImplementation = (
  userRequest: string,
  creditBalance: number = 100,
  currentErrors: number = 0
): WorkflowDecision => {
  return bugxWorkflow.analyzeImplementationRisk({
    userRequest,
    creditBalance,
    currentErrors,
    frameworkType: detectFrameworkType(userRequest)
  });
};

// Helper: Detect framework type from user request
export const detectFrameworkType = (userRequest: string): 'react' | 'database' | 'api' | 'general' => {
  const request = userRequest.toLowerCase();
  
  if (request.includes('react') || request.includes('component') || request.includes('jsx')) {
    return 'react';
  }
  
  if (request.includes('database') || request.includes('schema') || request.includes('sql')) {
    return 'database';
  }
  
  if (request.includes('api') || request.includes('endpoint') || request.includes('external')) {
    return 'api';
  }
  
  return 'general';
};

// Helper: Generate user prompt message
export const generateUserPromptMessage = (decision: WorkflowDecision): string | null => {
  if (!decision.shouldPromptUser) return null;
  
  let message = decision.promptMessage || '';
  
  // Add framework-specific guidance if available
  if (decision.specificGuidance) {
    message += `\n\n**${decision.specificGuidance.framework} Guidance:**\n`;
    message += `Pattern: ${decision.specificGuidance.pattern}\n`;
    message += `Steps: ${decision.specificGuidance.steps.slice(0, 3).join(', ')}...\n`;
  }
  
  return message;
};

// ===================================================================
// ACTUAL AI INTEGRATION POINTS
// ===================================================================

export const BugXIntegration = {
  
  // Call this BEFORE starting any complex implementation
  beforeImplementation: (userRequest: string, context: Partial<WorkflowContext> = {}) => {
    const fullContext: WorkflowContext = {
      userRequest,
      creditBalance: 100, // Default - should be replaced with actual
      currentErrors: 0,
      ...context
    };
    
    const decision = bugxWorkflow.analyzeImplementationRisk(fullContext);
    
    // If should prompt, return the prompt message
    if (decision.shouldPromptUser) {
      const promptMessage = generateUserPromptMessage(decision);
      console.log('🚨 BugX v1.4.3: Risk Assessment Required');
      return {
        requiresPrompt: true,
        promptMessage,
        decision
      };
    }
    
    return {
      requiresPrompt: false,
      recommendedApproach: decision.recommendedApproach,
      estimatedCredits: decision.estimatedCredits,
      specificGuidance: decision.specificGuidance
    };
  },
  
  // Call this AFTER implementation completes
  afterImplementation: (
    userRequest: string,
    userChoice: 'safe' | 'risky' | 'ignored',
    success: boolean,
    actualCredits: number,
    errorCount: number = 0
  ) => {
    bugxWorkflow.recordImplementationOutcome(
      { userRequest },
      userChoice,
      success ? 'success' : 'failure',
      actualCredits,
      errorCount
    );
    
    console.log(`📊 BugX v1.4.3: Recorded outcome - ${userChoice} approach, ${success ? 'success' : 'failure'}, ${actualCredits} credits`);
  }
};

export default BugXIntegration;