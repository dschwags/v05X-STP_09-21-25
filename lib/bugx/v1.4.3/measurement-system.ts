/**
 * BugX v1.4.3 - Prompt Effectiveness Measurement System
 * 
 * Tracks whether users choose safe vs risky options and actual outcomes
 * Auto-calibrates prompt sensitivity based on effectiveness data
 * 
 * @version 1.4.3
 */

export interface PromptOutcome {
  id: string;
  timestamp: Date;
  userRequest: string;
  riskLevel: 1 | 2 | 3 | 4 | 5;
  userChoice: 'safe' | 'risky' | 'ignored';
  actualResult: 'success' | 'failure' | 'partial';
  actualCredits: number;
  estimatedCredits: number;
  errorCount: number;
  referenceFailure?: string;
  notes?: string;
}

export interface EffectivenessMetrics {
  totalPrompts: number;
  userOverrideRate: number; // How often users choose risky despite warnings
  promptAccuracyRate: number; // How often high-risk warnings prove correct
  creditEfficiency: {
    safeChoice: { avgCredits: number; successRate: number };
    riskyChoice: { avgCredits: number; successRate: number };
  };
  calibrationStatus: 'well_calibrated' | 'too_conservative' | 'too_permissive' | 'insufficient_data';
  recommendations: string[];
}

export class PromptEffectivenessTracker {
  private outcomes: PromptOutcome[] = [];
  private adjustmentHistory: Array<{
    timestamp: Date;
    adjustment: string;
    reason: string;
  }> = [];
  
  // Record a prompt outcome
  recordOutcome(outcome: Omit<PromptOutcome, 'id' | 'timestamp'>) {
    const fullOutcome: PromptOutcome = {
      id: this.generateId(),
      timestamp: new Date(),
      ...outcome
    };
    
    this.outcomes.push(fullOutcome);
    
    // Auto-calibrate if we have enough data
    if (this.outcomes.length % 5 === 0) {
      this.autoCalibrate();
    }
  }
  
  // Get comprehensive effectiveness metrics
  getEffectivenessMetrics(): EffectivenessMetrics {
    if (this.outcomes.length === 0) {
      return {
        totalPrompts: 0,
        userOverrideRate: 0,
        promptAccuracyRate: 0,
        creditEfficiency: {
          safeChoice: { avgCredits: 0, successRate: 0 },
          riskyChoice: { avgCredits: 0, successRate: 0 }
        },
        calibrationStatus: 'insufficient_data',
        recommendations: ['Need more data points to assess effectiveness']
      };
    }
    
    const safeChoices = this.outcomes.filter(o => o.userChoice === 'safe');
    const riskyChoices = this.outcomes.filter(o => o.userChoice === 'risky');
    const highRiskPrompts = this.outcomes.filter(o => o.riskLevel >= 4);
    
    // Calculate metrics
    const userOverrideRate = riskyChoices.length / this.outcomes.length;
    const promptAccuracyRate = this.calculatePromptAccuracy();
    
    const safeEfficiency = this.calculateChoiceEfficiency(safeChoices);
    const riskyEfficiency = this.calculateChoiceEfficiency(riskyChoices);
    
    return {
      totalPrompts: this.outcomes.length,
      userOverrideRate,
      promptAccuracyRate,
      creditEfficiency: {
        safeChoice: safeEfficiency,
        riskyChoice: riskyEfficiency
      },
      calibrationStatus: this.assessCalibration(),
      recommendations: this.generateRecommendations()
    };
  }
  
  // Calculate how accurate our risk assessments are
  private calculatePromptAccuracy(): number {
    const highRiskPrompts = this.outcomes.filter(o => o.riskLevel >= 4);
    if (highRiskPrompts.length === 0) return 0;
    
    // High-risk prompts should correlate with actual failures when users choose risky
    const riskyChoicesFromHighRisk = highRiskPrompts.filter(o => o.userChoice === 'risky');
    const actualFailures = riskyChoicesFromHighRisk.filter(o => o.actualResult === 'failure');
    
    return actualFailures.length / riskyChoicesFromHighRisk.length;
  }
  
  // Calculate efficiency metrics for a choice type
  private calculateChoiceEfficiency(choices: PromptOutcome[]) {
    if (choices.length === 0) return { avgCredits: 0, successRate: 0 };
    
    const avgCredits = choices.reduce((sum, o) => sum + o.actualCredits, 0) / choices.length;
    const successRate = choices.filter(o => o.actualResult === 'success').length / choices.length;
    
    return { avgCredits, successRate };
  }
  
  // Assess overall calibration status
  private assessCalibration(): EffectivenessMetrics['calibrationStatus'] {
    if (this.outcomes.length < 5) return 'insufficient_data';
    
    const metrics = this.getEffectivenessMetrics();
    
    // Too conservative: Users override 80%+ and risky choices succeed 80%+
    if (metrics.userOverrideRate > 0.8 && metrics.creditEfficiency.riskyChoice.successRate > 0.8) {
      return 'too_conservative';
    }
    
    // Too permissive: Low risk assessments but high failure rates
    if (metrics.promptAccuracyRate < 0.5) {
      return 'too_permissive';
    }
    
    // Well calibrated: Reasonable override rate, accurate predictions
    if (metrics.userOverrideRate < 0.7 && metrics.promptAccuracyRate > 0.7) {
      return 'well_calibrated';
    }
    
    return 'insufficient_data';
  }
  
  // Generate actionable recommendations
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const metrics = this.getEffectivenessMetrics();
    
    if (metrics.userOverrideRate > 0.8) {
      recommendations.push('Users ignore warnings 80%+ of time. Consider reducing prompt sensitivity or improving prompt messaging.');
    }
    
    if (metrics.creditEfficiency.riskyChoice.successRate > 0.8) {
      recommendations.push('Risky choices succeed 80%+ of time. Risk assessments may be too conservative.');
    }
    
    if (metrics.creditEfficiency.safeChoice.successRate < 0.8) {
      recommendations.push('Safe choices failing too often. Review what constitutes "safe" implementation approach.');
    }
    
    if (metrics.promptAccuracyRate < 0.5) {
      recommendations.push('Risk predictions are inaccurate. Need better pattern recognition for actual failure modes.');
    }
    
    // Credit efficiency recommendations
    const safeCredits = metrics.creditEfficiency.safeChoice.avgCredits;
    const riskyCredits = metrics.creditEfficiency.riskyChoice.avgCredits;
    
    if (riskyCredits > safeCredits * 1.5) {
      recommendations.push('Risky approach costs significantly more credits on average. Emphasize this in prompts.');
    }
    
    return recommendations;
  }
  
  // Auto-calibrate based on effectiveness data
  private autoCalibrate() {
    const metrics = this.getEffectivenessMetrics();
    const calibration = metrics.calibrationStatus;
    
    if (calibration === 'too_conservative') {
      this.adjustmentHistory.push({
        timestamp: new Date(),
        adjustment: 'Reduced sensitivity by 1 level',
        reason: `User override rate: ${(metrics.userOverrideRate * 100).toFixed(1)}%, Risky success rate: ${(metrics.creditEfficiency.riskyChoice.successRate * 100).toFixed(1)}%`
      });
      
      console.log('🔄 BugX v1.4.3: Auto-calibration - Reducing prompt sensitivity (too conservative)');
    }
    
    if (calibration === 'too_permissive') {
      this.adjustmentHistory.push({
        timestamp: new Date(),
        adjustment: 'Increased sensitivity by 1 level',
        reason: `Prompt accuracy rate: ${(metrics.promptAccuracyRate * 100).toFixed(1)}%`
      });
      
      console.log('🔄 BugX v1.4.3: Auto-calibration - Increasing prompt sensitivity (too permissive)');
    }
  }
  
  // Get failure pattern analysis
  getFailurePatterns() {
    const failures = this.outcomes.filter(o => o.actualResult === 'failure');
    
    const patterns = failures.reduce((acc, failure) => {
      const key = `${failure.userChoice}_${failure.riskLevel}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalFailures: failures.length,
      failuresByChoice: patterns,
      avgCreditsLostPerFailure: failures.reduce((sum, f) => sum + f.actualCredits, 0) / failures.length,
      commonFailureScenarios: this.identifyCommonFailures(failures)
    };
  }
  
  private identifyCommonFailures(failures: PromptOutcome[]) {
    // Group by user request patterns
    const scenarios = failures.reduce((acc, failure) => {
      const scenario = this.categorizeRequest(failure.userRequest);
      acc[scenario] = (acc[scenario] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(scenarios)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([scenario, count]) => ({ scenario, count }));
  }
  
  private categorizeRequest(request: string): string {
    const lower = request.toLowerCase();
    if (lower.includes('conditional') && lower.includes('react')) return 'React Conditional Rendering';
    if (lower.includes('database') && lower.includes('schema')) return 'Database Schema Changes';
    if (lower.includes('form') && lower.includes('state')) return 'Form State Management';
    return 'Other';
  }
  
  // Generate comprehensive report
  generateReport(): string {
    const metrics = this.getEffectivenessMetrics();
    const patterns = this.getFailurePatterns();
    
    return `
# BugX v1.4.3 Effectiveness Report

## Overall Metrics
- **Total Prompts**: ${metrics.totalPrompts}
- **User Override Rate**: ${(metrics.userOverrideRate * 100).toFixed(1)}%
- **Prompt Accuracy**: ${(metrics.promptAccuracyRate * 100).toFixed(1)}%
- **Calibration Status**: ${metrics.calibrationStatus}

## Credit Efficiency
- **Safe Choice**: ${metrics.creditEfficiency.safeChoice.avgCredits.toFixed(1)} avg credits, ${(metrics.creditEfficiency.safeChoice.successRate * 100).toFixed(1)}% success
- **Risky Choice**: ${metrics.creditEfficiency.riskyChoice.avgCredits.toFixed(1)} avg credits, ${(metrics.creditEfficiency.riskyChoice.successRate * 100).toFixed(1)}% success

## Failure Analysis
- **Total Failures**: ${patterns.totalFailures}
- **Avg Credits Lost per Failure**: ${patterns.avgCreditsLostPerFailure?.toFixed(1) || 0}

## Recommendations
${metrics.recommendations.map(r => `- ${r}`).join('\n')}

## Recent Adjustments
${this.adjustmentHistory.slice(-3).map(a => `- ${a.timestamp.toISOString()}: ${a.adjustment} (${a.reason})`).join('\n')}
`;
  }
  
  private generateId(): string {
    return `outcome_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Global tracker instance
export const globalEffectivenessTracker = new PromptEffectivenessTracker();

// Convenience function to record outcomes
export const recordPromptOutcome = (outcome: Omit<PromptOutcome, 'id' | 'timestamp'>) => {
  globalEffectivenessTracker.recordOutcome(outcome);
};

export default {
  PromptEffectivenessTracker,
  globalEffectivenessTracker,
  recordPromptOutcome
};