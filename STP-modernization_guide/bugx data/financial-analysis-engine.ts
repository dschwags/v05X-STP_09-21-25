/**
 * ===================================================================
 * FINANCIAL ANALYSIS ENGINE - EXTRACTED FROM BUGX SYSTEM  
 * ===================================================================
 * 
 * Business Intelligence Preservation - Following BugX Alpha Technical Guide v1.2
 * Source: lib/bugx/financial-validator.ts
 * 
 * CRITICAL ALGORITHMS PRESERVED:
 * 1. Budget Impact Analysis with Overspend Detection
 * 2. Cross-Category Dependency Validation  
 * 3. Real-time Financial Pattern Recognition
 * 4. Intelligent Financial Suggestion Engine
 * 5. Red Flag Detection for Financial Risk Assessment
 */

// ===================================================================
// CORE FINANCIAL INTELLIGENCE INTERFACES
// ===================================================================

export interface FinancialTransaction {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer' | 'investment';
  description: string;
  vendor?: string;
  date: Date;
  receiptUrl?: string;
  tags?: string[];
}

export interface FinancialCategory {
  id: string;
  name: string;
  type: 'income' | 'expense' | 'savings' | 'investment';
  validationRules?: {
    maxAmount?: number;
    requireReceipt?: boolean;
    allowedVendors?: string[];
    crossCategoryDependencies?: string[];
    alertThreshold?: number;
  };
  isActive: boolean;
}

export interface FinancialBudget {
  id: string;
  categoryId: string;
  name: string;
  budgetAmount: number;
  period: 'weekly' | 'monthly' | 'quarterly' | 'annual';
  alertThreshold: number; // percentage (0-100)
  allowOverspend: boolean;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
}

export interface BudgetImpactAnalysis {
  categoryBudgetUsed: number;
  categoryBudgetRemaining: number;
  overBudget: boolean;
  projectedOverspend?: number;
  usagePercentage: number;
  projectedMonthlySpend: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface CategoryValidation {
  isValidCategory: boolean;
  categoryRules: Record<string, any>;
  crossCategoryDependencies: string[];
  ruleViolations: string[];
  complianceScore: number; // 0-100
}

export interface FinancialValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
  warnings: string[];
  budgetImpact: BudgetImpactAnalysis;
  categoryValidation: CategoryValidation;
  crossFieldValidations: Record<string, boolean>;
  intelligentSuggestions: string[];
  redFlags: string[];
  riskAssessment: {
    level: 'low' | 'medium' | 'high' | 'critical';
    factors: string[];
    score: number; // 0-100
  };
}

export interface FinancialContext {
  operationType: 'category' | 'transaction' | 'budget' | 'goal';
  transactionType?: 'income' | 'expense' | 'transfer' | 'investment';
  formData: Record<string, any>;
  previousFormData?: Record<string, any>;
  userCategories: FinancialCategory[];
  userBudgets: FinancialBudget[];
  recentTransactions: FinancialTransaction[];
  validationStage: 'field_change' | 'operation_change' | 'form_submit' | 'budget_check' | 'category_change';
  userId: string;
}

// ===================================================================
// FINANCIAL ANALYSIS ENGINE CLASS
// ===================================================================

export class FinancialAnalysisEngine {
  private validationMetrics = {
    validationStartTime: 0,
    budgetChecksPerformed: 0,
    categoryValidationsCount: 0,
    crossFieldValidationsCount: 0,
    intelligentSuggestionsGenerated: 0,
    redFlagsDetected: 0
  };

  /**
   * ===================================================================
   * MAIN FINANCIAL VALIDATION ENGINE
   * ===================================================================
   * Comprehensive analysis following BugX Phase 0 Reality Check methodology
   */
  async validateFinancialOperation(context: FinancialContext): Promise<FinancialValidationResult> {
    this.validationMetrics.validationStartTime = Date.now();
    
    const result: FinancialValidationResult = {
      isValid: true,
      errors: {},
      warnings: [],
      budgetImpact: {
        categoryBudgetUsed: 0,
        categoryBudgetRemaining: 0,
        overBudget: false,
        usagePercentage: 0,
        projectedMonthlySpend: 0,
        riskLevel: 'low'
      },
      categoryValidation: {
        isValidCategory: true,
        categoryRules: {},
        crossCategoryDependencies: [],
        ruleViolations: [],
        complianceScore: 100
      },
      crossFieldValidations: {},
      intelligentSuggestions: [],
      redFlags: [],
      riskAssessment: {
        level: 'low',
        factors: [],
        score: 0
      }
    };

    // Execute validation phases following BugX methodology
    await this.validateBudgetImpact(context, result);
    await this.validateCategoryRules(context, result);
    await this.validateCrossFieldDependencies(context, result);
    await this.generateIntelligentSuggestions(context, result);
    await this.detectFinancialRedFlags(context, result);
    await this.assessOverallRisk(context, result);
    
    this.updateValidationMetrics();
    
    return result;
  }

  /**
   * ===================================================================
   * PRESERVED ALGORITHM: BUDGET IMPACT ANALYSIS WITH OVERSPEND DETECTION
   * ===================================================================
   * Critical business logic for real-time financial monitoring
   */
  private async validateBudgetImpact(
    context: FinancialContext,
    result: FinancialValidationResult
  ): Promise<void> {
    const { formData, userBudgets, recentTransactions } = context;
    this.validationMetrics.budgetChecksPerformed++;
    
    if (!formData.categoryId || !formData.amount) return;
    
    // Find active budgets for this category
    const categoryBudgets = userBudgets.filter(budget => 
      budget.categoryId === formData.categoryId && budget.isActive
    );
    
    if (categoryBudgets.length === 0) {
      result.warnings.push('No active budget found for this category');
      return;
    }
    
    // Calculate current spending in category (PRESERVED ALGORITHM)
    const currentSpending = this.calculateCategorySpending(
      formData.categoryId,
      recentTransactions,
      categoryBudgets[0].period
    );
    
    categoryBudgets.forEach(budget => {
      const proposedTransaction = parseFloat(formData.amount) || 0;
      const budgetUsed = currentSpending + proposedTransaction;
      const budgetRemaining = Math.max(0, budget.budgetAmount - budgetUsed);
      const usagePercentage = (budgetUsed / budget.budgetAmount) * 100;
      
      // PRESERVED BUSINESS LOGIC: Monthly projection algorithm
      const daysInPeriod = this.getDaysInBudgetPeriod(budget.period);
      const currentDate = new Date();
      const periodStart = new Date(budget.startDate);
      const daysPassed = Math.max(1, (currentDate.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24));
      const projectedMonthlySpend = (budgetUsed / daysPassed) * 30; // Project to monthly
      
      result.budgetImpact = {
        categoryBudgetUsed: budgetUsed,
        categoryBudgetRemaining: budgetRemaining,
        overBudget: budgetUsed > budget.budgetAmount,
        usagePercentage: Math.round(usagePercentage * 100) / 100,
        projectedMonthlySpend: Math.round(projectedMonthlySpend * 100) / 100,
        riskLevel: this.calculateBudgetRiskLevel(usagePercentage, projectedMonthlySpend, budget.budgetAmount)
      };
      
      // PRESERVED ALERT THRESHOLD LOGIC
      if (usagePercentage >= budget.alertThreshold) {
        result.warnings.push(
          `This transaction will use ${usagePercentage.toFixed(1)}% of your ${budget.name} budget (Alert threshold: ${budget.alertThreshold}%)`
        );
      }
      
      // PRESERVED OVERSPEND DETECTION ALGORITHM
      if (budgetUsed > budget.budgetAmount) {
        const overspendAmount = budgetUsed - budget.budgetAmount;
        result.budgetImpact.projectedOverspend = overspendAmount;
        
        if (!budget.allowOverspend) {
          result.errors.amount = result.errors.amount || [];
          result.errors.amount.push(
            `This transaction would exceed your ${budget.name} budget by $${overspendAmount.toFixed(2)}`
          );
          result.isValid = false;
        } else {
          result.warnings.push(
            `This transaction will exceed your ${budget.name} budget by $${overspendAmount.toFixed(2)}`
          );
        }
      }
      
      // PRESERVED PROJECTION WARNINGS
      if (projectedMonthlySpend > budget.budgetAmount * 1.2) {
        result.warnings.push(
          `Current spending pace suggests you'll exceed budget by ${((projectedMonthlySpend / budget.budgetAmount - 1) * 100).toFixed(1)}% this period`
        );
      }
    });
  }

  /**
   * ===================================================================
   * PRESERVED ALGORITHM: CATEGORY SPENDING CALCULATION
   * ===================================================================
   * Business intelligence for budget tracking accuracy
   */
  private calculateCategorySpending(
    categoryId: string,
    transactions: FinancialTransaction[],
    budgetPeriod: string
  ): number {
    const now = new Date();
    let periodStart: Date;
    
    // PRESERVED PERIOD CALCULATION LOGIC
    switch (budgetPeriod) {
      case 'weekly':
        periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'monthly':
        periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'quarterly':
        const quarter = Math.floor(now.getMonth() / 3);
        periodStart = new Date(now.getFullYear(), quarter * 3, 1);
        break;
      case 'annual':
        periodStart = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    
    return transactions
      .filter(transaction => 
        transaction.categoryId === categoryId &&
        transaction.type === 'expense' &&
        new Date(transaction.date) >= periodStart &&
        new Date(transaction.date) <= now
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  /**
   * ===================================================================
   * PRESERVED ALGORITHM: BUDGET RISK LEVEL CALCULATION
   * ===================================================================
   */
  private calculateBudgetRiskLevel(
    usagePercentage: number,
    projectedSpend: number,
    budgetAmount: number
  ): 'low' | 'medium' | 'high' | 'critical' {
    const projectionRatio = projectedSpend / budgetAmount;
    
    if (usagePercentage >= 100 || projectionRatio >= 1.3) return 'critical';
    if (usagePercentage >= 85 || projectionRatio >= 1.1) return 'high';
    if (usagePercentage >= 70 || projectionRatio >= 0.9) return 'medium';
    return 'low';
  }

  /**
   * ===================================================================
   * PRESERVED ALGORITHM: CATEGORY RULES VALIDATION
   * ===================================================================
   * Multi-layer business rule enforcement system
   */
  private async validateCategoryRules(
    context: FinancialContext,
    result: FinancialValidationResult
  ): Promise<void> {
    const { formData, userCategories } = context;
    this.validationMetrics.categoryValidationsCount++;
    
    if (!formData.categoryId) return;
    
    const category = userCategories.find(cat => cat.id === formData.categoryId);
    if (!category) {
      result.categoryValidation = {
        isValidCategory: false,
        categoryRules: {},
        crossCategoryDependencies: [],
        ruleViolations: ['Selected category not found'],
        complianceScore: 0
      };
      result.errors.categoryId = ['Selected category not found'];
      result.isValid = false;
      return;
    }
    
    const rules = category.validationRules || {};
    const violations: string[] = [];
    let complianceScore = 100;
    
    // PRESERVED RULE: Maximum amount validation
    if (rules.maxAmount && formData.amount > rules.maxAmount) {
      violations.push(`Amount exceeds maximum allowed for ${category.name} category ($${rules.maxAmount})`);
      result.errors.amount = result.errors.amount || [];
      result.errors.amount.push(violations[violations.length - 1]);
      result.isValid = false;
      complianceScore -= 30;
    }
    
    // PRESERVED RULE: Receipt requirement validation  
    if (rules.requireReceipt && !formData.receiptUrl) {
      violations.push('Receipt is required for this category');
      result.errors.receiptUrl = ['Receipt is required for this category'];
      result.isValid = false;
      complianceScore -= 25;
    }
    
    // PRESERVED RULE: Vendor restrictions validation
    if (rules.allowedVendors?.length && formData.vendor) {
      const isAllowedVendor = rules.allowedVendors.some(allowedVendor =>
        formData.vendor.toLowerCase().includes(allowedVendor.toLowerCase())
      );
      
      if (!isAllowedVendor) {
        violations.push(`Vendor "${formData.vendor}" is not in the approved list for ${category.name} category`);
        result.warnings.push(violations[violations.length - 1]);
        complianceScore -= 15;
      }
    }
    
    // PRESERVED RULE: Cross-category dependencies
    const dependencies = rules.crossCategoryDependencies || [];
    
    result.categoryValidation = {
      isValidCategory: true,
      categoryRules: rules,
      crossCategoryDependencies: dependencies,
      ruleViolations: violations,
      complianceScore: Math.max(0, complianceScore)
    };
    
    if (dependencies.length > 0) {
      result.warnings.push(
        `This category has dependencies on: ${dependencies.join(', ')}`
      );
    }
  }

  /**
   * ===================================================================
   * PRESERVED ALGORITHM: CROSS-FIELD DEPENDENCIES VALIDATION
   * ===================================================================
   */
  private async validateCrossFieldDependencies(
    context: FinancialContext,
    result: FinancialValidationResult
  ): Promise<void> {
    const { operationType, transactionType, formData } = context;
    this.validationMetrics.crossFieldValidationsCount++;
    
    // PRESERVED BUSINESS RULES: Transaction-specific validations
    if (operationType === 'transaction' && transactionType) {
      
      // Investment transactions require additional documentation
      if (transactionType === 'investment' && formData.amount > 1000 && !formData.documentationUrl) {
        result.crossFieldValidations.investmentDocumentation = false;
        result.warnings.push('Large investment transactions typically require additional documentation');
      }
      
      // Transfer transactions require both accounts
      if (transactionType === 'transfer' && (!formData.fromAccount || !formData.toAccount)) {
        result.crossFieldValidations.transferAccounts = false;
        result.errors.accounts = ['Transfer transactions require both source and destination accounts'];
        result.isValid = false;
      }
      
      // Income transactions above threshold require verification
      if (transactionType === 'income' && formData.amount > 5000 && !formData.verificationSource) {
        result.crossFieldValidations.incomeVerification = false;
        result.warnings.push('Large income entries should include verification source');
      }
    }
  }

  /**
   * ===================================================================
   * PRESERVED ALGORITHM: INTELLIGENT FINANCIAL SUGGESTIONS ENGINE  
   * ===================================================================
   * AI-driven recommendations based on spending patterns and financial health
   */
  private async generateIntelligentSuggestions(
    context: FinancialContext,
    result: FinancialValidationResult
  ): Promise<void> {
    const suggestions: string[] = [];
    this.validationMetrics.intelligentSuggestionsGenerated++;
    
    const { formData, recentTransactions, userBudgets } = context;
    
    // PRESERVED SUGGESTION: Budget optimization
    if (result.budgetImpact.usagePercentage > 80) {
      suggestions.push('Consider reviewing your budget allocation for this category - you\'re approaching your limit');
    }
    
    // PRESERVED SUGGESTION: Spending pattern analysis
    const categorySpending = this.analyzeCategorySpendingPatterns(
      formData.categoryId,
      recentTransactions
    );
    
    if (categorySpending.isIncreasingTrend) {
      suggestions.push('Your spending in this category has been increasing - consider setting alerts or reviewing your budget');
    }
    
    // PRESERVED SUGGESTION: Vendor optimization
    if (formData.vendor && categorySpending.frequentVendors.length > 0) {
      const topVendor = categorySpending.frequentVendors[0];
      if (topVendor.name !== formData.vendor && topVendor.averageAmount < formData.amount) {
        suggestions.push(`You typically spend less at ${topVendor.name} for similar transactions - consider comparing prices`);
      }
    }
    
    // PRESERVED SUGGESTION: Budget reallocation
    const underutilizedBudgets = userBudgets.filter(budget => {
      const usage = this.calculateCategorySpending(budget.categoryId, recentTransactions, budget.period);
      return (usage / budget.budgetAmount) < 0.5;
    });
    
    if (underutilizedBudgets.length > 0 && result.budgetImpact.overBudget) {
      suggestions.push('You have unused budget in other categories that could be reallocated here');
    }
    
    // PRESERVED SUGGESTION: Timing optimization
    const currentDate = new Date();
    const daysLeftInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() - currentDate.getDate();
    
    if (daysLeftInMonth < 7 && result.budgetImpact.usagePercentage > 90) {
      suggestions.push('Consider waiting until next month if this expense can be delayed');
    }
    
    result.intelligentSuggestions = suggestions;
  }

  /**
   * ===================================================================
   * PRESERVED ALGORITHM: FINANCIAL RED FLAG DETECTION
   * ===================================================================
   * Pattern recognition for financial risk assessment
   */
  private async detectFinancialRedFlags(
    context: FinancialContext,
    result: FinancialValidationResult
  ): Promise<void> {
    const redFlags: string[] = [];
    const { formData, recentTransactions } = context;
    this.validationMetrics.redFlagsDetected++;
    
    // PRESERVED RED FLAG: Unusual amount patterns
    if (formData.amount) {
      const recentAmounts = recentTransactions
        .filter(t => t.categoryId === formData.categoryId)
        .slice(0, 10)
        .map(t => t.amount);
        
      if (recentAmounts.length > 0) {
        const avgAmount = recentAmounts.reduce((sum, amt) => sum + amt, 0) / recentAmounts.length;
        const isUnusuallyHigh = formData.amount > avgAmount * 3;
        const isUnusuallyLow = formData.amount < avgAmount * 0.1 && formData.amount > 0;
        
        if (isUnusuallyHigh) {
          redFlags.push('Transaction amount is significantly higher than your typical spending in this category');
        }
        if (isUnusuallyLow) {
          redFlags.push('Transaction amount is unusually low for this category');
        }
      }
    }
    
    // PRESERVED RED FLAG: Rapid transaction frequency
    const recentSimilarTransactions = recentTransactions.filter(t => 
      t.categoryId === formData.categoryId &&
      Math.abs(new Date().getTime() - new Date(t.date).getTime()) < 24 * 60 * 60 * 1000 // Last 24 hours
    );
    
    if (recentSimilarTransactions.length > 5) {
      redFlags.push('High frequency of transactions in this category within 24 hours');
    }
    
    // PRESERVED RED FLAG: Missing required information
    if (formData.amount > 500 && !formData.description) {
      redFlags.push('Large transactions should include detailed descriptions');
    }
    
    // PRESERVED RED FLAG: Suspicious vendor patterns
    if (formData.vendor && formData.vendor.toLowerCase().includes('cash') && formData.amount > 200) {
      redFlags.push('Large cash transactions may require additional documentation');
    }
    
    result.redFlags = redFlags;
  }

  /**
   * ===================================================================
   * PRESERVED ALGORITHM: OVERALL RISK ASSESSMENT
   * ===================================================================
   */
  private async assessOverallRisk(
    context: FinancialContext,
    result: FinancialValidationResult
  ): Promise<void> {
    const riskFactors: string[] = [];
    let riskScore = 0;
    
    // Budget risk contribution
    switch (result.budgetImpact.riskLevel) {
      case 'critical': riskScore += 40; riskFactors.push('Critical budget risk'); break;
      case 'high': riskScore += 25; riskFactors.push('High budget risk'); break;  
      case 'medium': riskScore += 15; riskFactors.push('Medium budget risk'); break;
      case 'low': riskScore += 5; break;
    }
    
    // Category compliance contribution
    const complianceScore = result.categoryValidation.complianceScore;
    if (complianceScore < 50) {
      riskScore += 30;
      riskFactors.push('Low category compliance');
    } else if (complianceScore < 80) {
      riskScore += 15;
      riskFactors.push('Medium category compliance issues');
    }
    
    // Red flags contribution
    riskScore += result.redFlags.length * 10;
    if (result.redFlags.length > 0) {
      riskFactors.push(`${result.redFlags.length} red flag(s) detected`);
    }
    
    // Validation errors contribution
    const errorCount = Object.keys(result.errors).length;
    riskScore += errorCount * 15;
    if (errorCount > 0) {
      riskFactors.push(`${errorCount} validation error(s)`);
    }
    
    // Determine overall risk level
    let riskLevel: 'low' | 'medium' | 'high' | 'critical';
    if (riskScore >= 70) riskLevel = 'critical';
    else if (riskScore >= 45) riskLevel = 'high';  
    else if (riskScore >= 25) riskLevel = 'medium';
    else riskLevel = 'low';
    
    result.riskAssessment = {
      level: riskLevel,
      factors: riskFactors,
      score: Math.min(100, riskScore)
    };
  }

  /**
   * ===================================================================
   * HELPER METHODS - PRESERVED BUSINESS LOGIC
   * ===================================================================
   */
  private getDaysInBudgetPeriod(period: string): number {
    switch (period) {
      case 'weekly': return 7;
      case 'monthly': return 30;
      case 'quarterly': return 90;
      case 'annual': return 365;
      default: return 30;
    }
  }

  private analyzeCategorySpendingPatterns(
    categoryId: string,
    transactions: FinancialTransaction[]
  ) {
    const categoryTransactions = transactions
      .filter(t => t.categoryId === categoryId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Analyze trend
    const recentAmounts = categoryTransactions.slice(0, 5).map(t => t.amount);
    const olderAmounts = categoryTransactions.slice(5, 10).map(t => t.amount);
    
    const recentAvg = recentAmounts.length > 0 ? 
      recentAmounts.reduce((sum, amt) => sum + amt, 0) / recentAmounts.length : 0;
    const olderAvg = olderAmounts.length > 0 ?
      olderAmounts.reduce((sum, amt) => sum + amt, 0) / olderAmounts.length : 0;
    
    const isIncreasingTrend = recentAvg > olderAvg * 1.2;
    
    // Analyze frequent vendors
    const vendorCounts = new Map<string, { count: number; totalAmount: number }>();
    categoryTransactions.forEach(t => {
      if (t.vendor) {
        const existing = vendorCounts.get(t.vendor) || { count: 0, totalAmount: 0 };
        vendorCounts.set(t.vendor, {
          count: existing.count + 1,
          totalAmount: existing.totalAmount + t.amount
        });
      }
    });
    
    const frequentVendors = Array.from(vendorCounts.entries())
      .map(([vendor, data]) => ({
        name: vendor,
        count: data.count,
        averageAmount: data.totalAmount / data.count
      }))
      .sort((a, b) => b.count - a.count);
    
    return {
      isIncreasingTrend,
      frequentVendors,
      recentAverage: recentAvg,
      transactionCount: categoryTransactions.length
    };
  }

  private updateValidationMetrics(): void {
    // Update internal metrics for performance monitoring
    const validationTime = Date.now() - this.validationMetrics.validationStartTime;
    // Log metrics for business intelligence (preserved from original)
  }
}

/**
 * ===================================================================
 * USAGE EXAMPLE - FINANCIAL ANALYSIS DEMONSTRATION
 * ===================================================================
 */
export function demonstrateFinancialAnalysis() {
  const sampleContext: FinancialContext = {
    operationType: 'transaction',
    transactionType: 'expense',
    formData: {
      categoryId: 'grocery_category',
      amount: 150,
      vendor: 'Whole Foods',
      description: 'Weekly groceries'
    },
    userCategories: [{
      id: 'grocery_category',
      name: 'Groceries',
      type: 'expense',
      validationRules: {
        maxAmount: 200,
        requireReceipt: true,
        alertThreshold: 80
      },
      isActive: true
    }],
    userBudgets: [{
      id: 'grocery_budget',
      categoryId: 'grocery_category',
      name: 'Monthly Groceries',
      budgetAmount: 600,
      period: 'monthly',
      alertThreshold: 80,
      allowOverspend: false,
      isActive: true,
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 0, 31)
    }],
    recentTransactions: [
      {
        id: '1',
        userId: 'user123',
        categoryId: 'grocery_category',
        amount: 120,
        type: 'expense',
        description: 'Groceries',
        vendor: 'Safeway',
        date: new Date(2024, 0, 15),
      }
    ],
    validationStage: 'form_submit',
    userId: 'user123'
  };
  
  const engine = new FinancialAnalysisEngine();
  return engine.validateFinancialOperation(sampleContext);
}

export default FinancialAnalysisEngine;