/**
 * BugX v1.4.2 - AI-to-User Proactive Warning System
 * 
 * Prevents implementation disasters by prompting user for decisions
 * BEFORE starting risky implementations
 * 
 * @version 1.4.2
 * @author David Schwager / BrewX  
 * @date September 2025
 */

export interface AIUserPrompt {
  id: string;
  trigger: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  promptMessage: string;
  options: Array<{
    choice: string;
    description: string;
    creditCost: number;
    riskLevel: 'low' | 'medium' | 'high';
  }>;
  defaultChoice?: string;
  skipCondition?: string;
}

// ===================================================================
// STATE MANAGEMENT COMPLEXITY PROMPT
// ===================================================================

export const STATE_MANAGEMENT_PROMPT: AIUserPrompt = {
  id: 'state_management_complexity',
  trigger: 'Conditional logic + React components detected',
  riskLevel: 'high',
  promptMessage: `
🚨 **STATE MANAGEMENT COMPLEXITY DETECTED**

I'm about to implement conditional logic that requires:
• React useState for tracking selections
• Multiple event handlers  
• Conditional JSX rendering
• Form state synchronization

**This is where we got 400+ syntax errors last time.**

How would you like me to proceed?`,
  
  options: [
    {
      choice: 'Full Planning First',
      description: 'Plan state structure, validate incrementally (+8 credits, high success rate)',
      creditCost: 8,
      riskLevel: 'low'
    },
    {
      choice: 'Basic Implementation',  
      description: 'Simple static form first, add logic after (+5 credits, medium risk)',
      creditCost: 5,
      riskLevel: 'medium'
    },
    {
      choice: 'Rush Implementation',
      description: 'Jump straight to complex conditional logic (-2 credits, HIGH RISK of cascade)',
      creditCost: -2,
      riskLevel: 'high'
    }
  ],
  defaultChoice: 'Full Planning First'
};

// ===================================================================
// CREDIT BUDGET WARNING PROMPT  
// ===================================================================

export const CREDIT_BUDGET_PROMPT: AIUserPrompt = {
  id: 'credit_budget_warning',
  trigger: 'Credits below 50 + complex task detected',
  riskLevel: 'high',
  promptMessage: `
⚠️ **CREDIT BUDGET WARNING** 

You're at a critical credit level and I'm about to attempt a complex implementation.

**Risk Analysis:**
• Current credits: LOW
• Task complexity: HIGH  
• Error recovery cost: 20-50+ credits
• Success without errors: 15-25 credits

**Recommendation:** Defer complex features to next session OR implement simplified version now.

How would you like me to proceed?`,
  
  options: [
    {
      choice: 'Defer Complex Features',
      description: 'Basic implementation now, complex features when you have more credits',
      creditCost: 8,
      riskLevel: 'low'
    },
    {
      choice: 'Simplified Version',
      description: 'Core functionality only, no advanced features',
      creditCost: 12,
      riskLevel: 'low'  
    },
    {
      choice: 'Full Implementation',
      description: 'Proceed with full feature set (HIGH RISK at low credits)',
      creditCost: 25,
      riskLevel: 'high'
    }
  ],
  defaultChoice: 'Defer Complex Features'
};

// ===================================================================
// SYNTAX CASCADE RISK PROMPT
// ===================================================================

export const SYNTAX_CASCADE_PROMPT: AIUserPrompt = {
  id: 'syntax_cascade_risk',
  trigger: '20+ TypeScript errors detected',
  riskLevel: 'high', 
  promptMessage: `
🛑 **SYNTAX CASCADE DETECTED**

Current errors: 20+ TypeScript compilation errors
**This is exactly what happened at 11:19 timestamp that led to 400+ errors.**

I can:
1. **STOP and rollback** to last working state (recommended)
2. **Continue fixing** incrementally (medium risk)  
3. **Push through** with full implementation (HIGH RISK)

**History shows option 3 led to 82+ wasted credits last time.**

What's your preference?`,
  
  options: [
    {
      choice: 'Stop and Rollback',
      description: 'Revert to working state, implement in smaller steps (+3 credits)',
      creditCost: 3,
      riskLevel: 'low'
    },
    {
      choice: 'Fix Incrementally', 
      description: 'Address current errors before adding new features (+8 credits)',
      creditCost: 8,
      riskLevel: 'medium'
    },
    {
      choice: 'Push Through',
      description: 'Continue with full implementation despite errors (VERY HIGH RISK)',
      creditCost: 15,
      riskLevel: 'high'
    }
  ],
  defaultChoice: 'Stop and Rollback'
};

// ===================================================================
// DATABASE/MIDDLEWARE COMPLEXITY PROMPT
// ===================================================================

export const DATABASE_SETUP_PROMPT: AIUserPrompt = {
  id: 'database_complexity',
  trigger: 'Database schema changes + user registration detected',
  riskLevel: 'medium',
  promptMessage: `
🗄️ **DATABASE COMPLEXITY DETECTED**

I'm about to modify database schemas AND implement user registration logic.

**Complexity factors:**
• Drizzle ORM schema updates
• New table relationships  
• Migration requirements
• User data validation
• Integration with existing auth

This could affect existing functionality. How should I proceed?`,
  
  options: [
    {
      choice: 'Schema First',
      description: 'Update database schema first, test, then add registration (+10 credits)',
      creditCost: 10,
      riskLevel: 'low'
    },
    {
      choice: 'Parallel Development',
      description: 'Schema + registration simultaneously (+7 credits, medium risk)',
      creditCost: 7,
      riskLevel: 'medium'
    },
    {
      choice: 'Registration First',
      description: 'Build registration with existing schema, update DB later (+5 credits)',
      creditCost: 5,
      riskLevel: 'medium'
    }
  ],
  defaultChoice: 'Schema First'
};

// ===================================================================
// THIRD-PARTY INTEGRATION PROMPT
// ===================================================================

export const INTEGRATION_COMPLEXITY_PROMPT: AIUserPrompt = {
  id: 'integration_complexity',
  trigger: 'External API/service integration detected',
  riskLevel: 'medium',
  promptMessage: `
🔌 **THIRD-PARTY INTEGRATION DETECTED**

I'm about to integrate with external services/APIs.

**Risk factors:**
• Network dependencies
• Authentication complexity
• Error handling requirements
• Potential service unavailability
• Integration testing needs

Would you like me to build with fallback strategies?`,
  
  options: [
    {
      choice: 'Full Fallback Strategy',
      description: 'Build with offline modes, error handling, retry logic (+12 credits)',
      creditCost: 12,
      riskLevel: 'low'
    },
    {
      choice: 'Basic Integration',
      description: 'Core integration with minimal error handling (+7 credits)',
      creditCost: 7,
      riskLevel: 'medium'
    },
    {
      choice: 'Simple Connection',
      description: 'Direct integration, assume services work (+4 credits, higher risk)',
      creditCost: 4,
      riskLevel: 'high'
    }
  ],
  defaultChoice: 'Basic Integration'
};

// ===================================================================
// TECHNICAL DEBT ACCUMULATION PROMPT
// ===================================================================

export const TECHNICAL_DEBT_PROMPT: AIUserPrompt = {
  id: 'technical_debt_warning',
  trigger: 'Multiple TODO comments or temporary fixes detected',
  riskLevel: 'medium',
  promptMessage: `
⚠️ **TECHNICAL DEBT ACCUMULATION WARNING**

I've detected multiple temporary fixes and TODO comments in the codebase.

**Current debt indicators:**
• Temporary workarounds
• Commented-out code
• TODO/FIXME comments
• Quick fixes without proper testing

Should I address these before adding new features?`,
  
  options: [
    {
      choice: 'Clean Up First',
      description: 'Address technical debt before new features (+8 credits)',
      creditCost: 8,
      riskLevel: 'low'
    },
    {
      choice: 'Parallel Cleanup',
      description: 'Fix debt items as I encounter them (+3 credits)',
      creditCost: 3,
      riskLevel: 'medium'
    },
    {
      choice: 'Ignore For Now',
      description: 'Add new features, defer cleanup (0 credits, increasing debt)',
      creditCost: 0,
      riskLevel: 'high'
    }
  ],
  defaultChoice: 'Parallel Cleanup'
};

// ===================================================================
// PROMPT TRIGGER SYSTEM
// ===================================================================

export interface PromptTriggerContext {
  taskType: string;
  complexity: 'simple' | 'moderate' | 'complex';
  creditBalance: number;
  errorCount: number;
  codebaseSize: number;
  hasExistingDebt: boolean;
}

export const evaluatePromptTriggers = (context: PromptTriggerContext): AIUserPrompt[] => {
  const triggeredPrompts: AIUserPrompt[] = [];
  
  // State management complexity
  if (context.taskType.includes('conditional') || context.taskType.includes('role-based')) {
    triggeredPrompts.push(STATE_MANAGEMENT_PROMPT);
  }
  
  // Credit budget warning
  if (context.creditBalance < 50 && context.complexity === 'complex') {
    triggeredPrompts.push(CREDIT_BUDGET_PROMPT);
  }
  
  // Syntax cascade risk  
  if (context.errorCount > 20) {
    triggeredPrompts.push(SYNTAX_CASCADE_PROMPT);
  }
  
  // Database complexity
  if (context.taskType.includes('database') || context.taskType.includes('schema')) {
    triggeredPrompts.push(DATABASE_SETUP_PROMPT);
  }
  
  // Integration complexity
  if (context.taskType.includes('api') || context.taskType.includes('external')) {
    triggeredPrompts.push(INTEGRATION_COMPLEXITY_PROMPT);
  }
  
  // Technical debt
  if (context.hasExistingDebt) {
    triggeredPrompts.push(TECHNICAL_DEBT_PROMPT);
  }
  
  return triggeredPrompts;
};

// ===================================================================
// USAGE EXAMPLES FOR FINANCIAL GOALS PHASE
// ===================================================================

export const FinancialGoalsPromptExamples = {
  
  // Before implementing financial goals conditional logic:
  stateManagementExample: `
  🚨 **STATE MANAGEMENT COMPLEXITY DETECTED**
  
  I'm about to implement financial goals with conditional logic that requires:
  • React useState for role-based questions
  • Different form fields per role (Student/Parent/Counselor)  
  • Dynamic validation rules
  • Multi-step form state management
  
  **This is similar to what caused 400+ syntax errors in registration.**
  
  How would you like me to proceed?
  A) Full Planning First (+8 credits, high success rate)
  B) Basic Implementation (+5 credits, medium risk)  
  C) Rush Implementation (-2 credits, HIGH RISK)
  `,
  
  // If credit balance gets low during financial goals:
  creditWarningExample: `
  ⚠️ **CREDIT BUDGET WARNING**
  
  You're at 35 credits and I'm about to implement:
  • Role-based financial goal questions
  • Dynamic form validation
  • Integration with user profiles
  • Data persistence logic
  
  **Estimated cost: 25-40 credits**
  **Recovery if errors: 20-50+ credits**
  
  Recommendation: Implement basic version now (10 credits), 
  add advanced features in next session?
  `
};

export default {
  STATE_MANAGEMENT_PROMPT,
  CREDIT_BUDGET_PROMPT, 
  SYNTAX_CASCADE_PROMPT,
  DATABASE_SETUP_PROMPT,
  INTEGRATION_COMPLEXITY_PROMPT,
  TECHNICAL_DEBT_PROMPT,
  evaluatePromptTriggers,
  FinancialGoalsPromptExamples
};