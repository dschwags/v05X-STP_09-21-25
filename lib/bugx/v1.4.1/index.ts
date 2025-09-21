/**
 * BugX v1.4.1 - Credit Optimized Error Prevention System
 * 
 * ENHANCEMENTS OVER v1.4:
 * - Credit-efficient tool usage patterns
 * - Batch operation protocols 
 * - Minimal verification strategies
 * - Concise response formatting
 * - Smart tool selection algorithms
 * 
 * @version 1.4.1
 * @author David Schwager / BrewX
 * @date September 2025
 */

import { PatternTemplate } from '../v1.4/index';

// Re-export all v1.4 functionality
export * from '../v1.4/index';

// ===================================================================
// CREDIT EFFICIENCY PROTOCOLS - NEW IN v1.4.1
// ===================================================================

export interface CreditEfficiencyMetrics {
  targetCreditsPerTask: number;
  maxCreditsPerTask: number;
  toolCallsPerTask: number;
  batchOperationRatio: number;
  verificationSkipRate: number;
}

export const CREDIT_EFFICIENCY_TARGETS: CreditEfficiencyMetrics = {
  targetCreditsPerTask: 10,        // Aim for 5-15 credits per task
  maxCreditsPerTask: 25,           // Alert if exceeding 25 credits
  toolCallsPerTask: 3,             // Target max 3 tool calls per task
  batchOperationRatio: 0.8,        // 80% of operations should be batched
  verificationSkipRate: 0.7        // Skip verification 70% of the time
};

// ===================================================================
// SMART TOOL SELECTION - v1.4.1 ENHANCEMENT
// ===================================================================

export interface ToolSelectionStrategy {
  fileSize: number;
  changeComplexity: 'simple' | 'moderate' | 'complex';
  recommendedTool: 'write_file' | 'search_replace_batch' | 'manual_edit';
  shouldBatch: boolean;
  skipVerification: boolean;
}

export const selectOptimalTool = (
  fileLineCount: number, 
  numberOfChanges: number,
  changeType: 'styling' | 'logic' | 'structure'
): ToolSelectionStrategy => {
  
  // Small files or major restructuring = write_file
  if (fileLineCount <= 200 || changeType === 'structure') {
    return {
      fileSize: fileLineCount,
      changeComplexity: changeType === 'structure' ? 'complex' : 'simple',
      recommendedTool: 'write_file',
      shouldBatch: false,
      skipVerification: changeType === 'styling'
    };
  }
  
  // Multiple related changes = search_replace_batch
  if (numberOfChanges > 1) {
    return {
      fileSize: fileLineCount,
      changeComplexity: numberOfChanges > 5 ? 'complex' : 'moderate',
      recommendedTool: 'search_replace_batch',
      shouldBatch: true,
      skipVerification: changeType === 'styling'
    };
  }
  
  // Single change in large file = search_replace_batch
  return {
    fileSize: fileLineCount,
    changeComplexity: 'simple',
    recommendedTool: 'search_replace_batch',
    shouldBatch: false,
    skipVerification: true
  };
};

// ===================================================================
// BATCH OPERATION PATTERNS - v1.4.1 ENHANCEMENT  
// ===================================================================

export interface BatchOperationPlan {
  operations: Array<{
    type: 'create' | 'modify' | 'delete';
    target: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  estimatedCredits: number;
  toolSequence: string[];
  verificationPoints: string[];
}

export const planBatchOperations = (tasks: string[]): BatchOperationPlan => {
  const operations = tasks.map(task => ({
    type: task.includes('create') ? 'create' as const : 
          task.includes('delete') ? 'delete' as const : 'modify' as const,
    target: task,
    priority: task.includes('fix') || task.includes('error') ? 'high' as const :
             task.includes('enhance') ? 'medium' as const : 'low' as const
  }));
  
  // Group similar operations for batching
  const toolSequence = [];
  if (operations.some(op => op.type === 'create')) {
    toolSequence.push('write_file (batch creates)');
  }
  if (operations.some(op => op.type === 'modify')) {
    toolSequence.push('search_replace_batch (batch modifications)');
  }
  if (operations.some(op => op.type === 'delete')) {
    toolSequence.push('delete_file (batch deletions)');
  }
  
  return {
    operations,
    estimatedCredits: Math.min(operations.length * 3, 25), // Cap at 25 credits
    toolSequence,
    verificationPoints: operations
      .filter(op => op.priority === 'high')
      .map(op => op.target)
  };
};

// ===================================================================
// VERIFICATION SKIP LOGIC - v1.4.1 ENHANCEMENT
// ===================================================================

export interface VerificationDecision {
  shouldVerify: boolean;
  reason: string;
  skipMethods: string[];
  fallbackPlan?: string;
}

export const shouldSkipVerification = (
  changeType: 'styling' | 'content' | 'logic' | 'structure',
  riskLevel: 'low' | 'medium' | 'high',
  hasTests: boolean
): VerificationDecision => {
  
  // Always verify high-risk or structural changes
  if (riskLevel === 'high' || changeType === 'structure') {
    return {
      shouldVerify: true,
      reason: 'High risk or structural change requires verification',
      skipMethods: [],
      fallbackPlan: 'Full testing and validation required'
    };
  }
  
  // Skip verification for low-risk styling changes
  if (changeType === 'styling' && riskLevel === 'low') {
    return {
      shouldVerify: false,
      reason: 'Low-risk styling change, trust hot-reload',
      skipMethods: ['run_project', 'get_run_project_output'],
      fallbackPlan: 'User will report if styling issues occur'
    };
  }
  
  // Conditional verification for content changes
  if (changeType === 'content') {
    return {
      shouldVerify: !hasTests,
      reason: hasTests ? 'Tests will catch content issues' : 'Manual verification needed',
      skipMethods: hasTests ? ['manual_testing'] : [],
      fallbackPlan: 'Rely on automated test suite'
    };
  }
  
  // Default to minimal verification
  return {
    shouldVerify: true,
    reason: 'Standard verification for logic changes',
    skipMethods: ['extensive_testing'],
    fallbackPlan: 'Basic compilation check only'
  };
};

// ===================================================================
// RESPONSE OPTIMIZATION - v1.4.1 ENHANCEMENT
// ===================================================================

export interface ResponseOptimization {
  maxResponseLength: number;
  includeExplanations: boolean;
  useBulletPoints: boolean;
  skipCodeComments: boolean;
  focusOnEssentials: boolean;
}

export const getResponseOptimization = (
  taskComplexity: 'simple' | 'moderate' | 'complex',
  userExperience: 'novice' | 'intermediate' | 'expert'
): ResponseOptimization => {
  
  if (taskComplexity === 'simple' && userExperience !== 'novice') {
    return {
      maxResponseLength: 200,
      includeExplanations: false,
      useBulletPoints: true,
      skipCodeComments: true,
      focusOnEssentials: true
    };
  }
  
  if (taskComplexity === 'complex' || userExperience === 'novice') {
    return {
      maxResponseLength: 800,
      includeExplanations: true,
      useBulletPoints: true,
      skipCodeComments: false,
      focusOnEssentials: false
    };
  }
  
  // Default for moderate complexity
  return {
    maxResponseLength: 400,
    includeExplanations: true,
    useBulletPoints: true,
    skipCodeComments: true,
    focusOnEssentials: true
  };
};

// ===================================================================
// CREDIT MONITORING - v1.4.1 ENHANCEMENT
// ===================================================================

export class CreditMonitor {
  private creditHistory: number[] = [];
  private taskHistory: string[] = [];
  
  recordTask(taskDescription: string, estimatedCredits: number) {
    this.creditHistory.push(estimatedCredits);
    this.taskHistory.push(taskDescription);
    
    // Alert if exceeding targets
    if (estimatedCredits > CREDIT_EFFICIENCY_TARGETS.maxCreditsPerTask) {
      console.warn(`⚠️ BugX v1.4.1: Task exceeding credit target (${estimatedCredits} credits): ${taskDescription}`);
    }
  }
  
  getEfficiencyReport() {
    const avgCredits = this.creditHistory.reduce((a, b) => a + b, 0) / this.creditHistory.length;
    const tasksOverTarget = this.creditHistory.filter(c => c > CREDIT_EFFICIENCY_TARGETS.targetCreditsPerTask).length;
    
    return {
      averageCreditsPerTask: avgCredits,
      tasksOverTarget,
      totalTasks: this.creditHistory.length,
      efficiencyRating: tasksOverTarget / this.creditHistory.length < 0.3 ? 'Good' : 'Needs Improvement',
      recommendation: avgCredits > 20 ? 'Focus on batching operations' : 'Maintaining good efficiency'
    };
  }
}

// ===================================================================
// v1.4.1 WORKFLOW INTEGRATION
// ===================================================================

export const BugXv141Workflow = {
  
  // Step 1: Plan with credit efficiency in mind
  planTask: (description: string, complexity: 'simple' | 'moderate' | 'complex') => {
    const strategy = selectOptimalTool(100, 1, 'logic'); // Default estimates
    const verification = shouldSkipVerification('logic', 'medium', false);
    const response = getResponseOptimization(complexity, 'intermediate');
    
    return {
      strategy,
      verification,
      response,
      estimatedCredits: complexity === 'simple' ? 8 : complexity === 'moderate' ? 15 : 25
    };
  },
  
  // Step 2: Execute with minimal tool calls
  execute: (plan: any) => {
    console.log(`🚀 BugX v1.4.1: Executing with ${plan.estimatedCredits} estimated credits`);
    // Implementation would use the planned strategy
  },
  
  // Step 3: Verify only when necessary
  verify: (verification: VerificationDecision) => {
    if (!verification.shouldVerify) {
      console.log(`⚡ BugX v1.4.1: Skipping verification - ${verification.reason}`);
      return true;
    }
    // Perform minimal necessary verification
  }
};

export default {
  version: '1.4.1',
  enhancements: ['Credit Efficiency', 'Smart Tool Selection', 'Batch Operations', 'Selective Verification'],
  CreditMonitor,
  BugXv141Workflow,
  CREDIT_EFFICIENCY_TARGETS
};