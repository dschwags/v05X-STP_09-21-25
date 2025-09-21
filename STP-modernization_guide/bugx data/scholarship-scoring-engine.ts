/**
 * ===================================================================
 * SCHOLARSHIP SCORING ENGINE - EXTRACTED FROM BUGX SYSTEM
 * ===================================================================
 * 
 * Business Intelligence Preservation - Following BugX Alpha Technical Guide v1.2
 * Source: lib/bugx/scholarship-validator.ts
 * 
 * CRITICAL ALGORITHMS PRESERVED:
 * 1. Weighted Eligibility Scoring (6-factor model)
 * 2. GPA Calculation with Bonus/Penalty System
 * 3. ROI Analysis (Award Amount vs Time Investment)
 * 4. Intelligent Matching Recommendations
 * 5. Success Probability Predictions
 */

// ===================================================================
// CORE BUSINESS INTELLIGENCE INTERFACES
// ===================================================================

export interface StudentProfile {
  // Academic Information
  gpa: number;
  educationLevel: 'high_school' | 'undergraduate' | 'graduate' | 'postgraduate';
  major?: string;
  
  // Demographics
  age: number;
  citizenship: string[];
  residency: string[];
  ethnicity?: string[];
  gender?: string;
  
  // Financial
  familyIncome?: number;
  financialNeed: 'low' | 'medium' | 'high' | 'critical';
  
  // Activities & Skills
  activities: string[];
  leadership: string[];
  communityService: string[];
  workExperience: string[];
  awards: string[];
  
  // Application Capabilities
  writingSkills: 'basic' | 'good' | 'strong' | 'excellent';
  timeAvailable: number; // hours per week
  applicationExperience: 'none' | 'some' | 'experienced' | 'expert';
}

export interface ScholarshipOpportunity {
  id: string;
  title: string;
  provider: string;
  
  // Financial Details  
  awardAmount: number;
  numberOfAwards: number;
  
  // Requirements
  gpaMinimum?: number;
  educationLevel: string[];
  allowedMajors?: string[];
  citizenship?: string[];
  residency?: string[];
  demographics?: string[];
  maxIncome?: number;
  
  // Application Requirements
  essayCount: number;
  essayWordLimit?: number;
  recommendationLetters: number;
  
  // Metadata
  estimatedHours: number;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'very_difficult';
  competitiveness: 'low' | 'moderate' | 'high' | 'very_high';
  category: string;
  deadline: Date;
}

/**
 * PRESERVED BUSINESS INTELLIGENCE: Eligibility Scoring System
 * Original weights and algorithms from BugX validator
 */
export interface EligibilityScore {
  overall: number; // 0-100 weighted score
  breakdown: {
    gpa: number;        // 25% weight
    education: number;  // 20% weight  
    demographics: number; // 15% weight
    financial: number;   // 15% weight
    activities: number;  // 15% weight
    essays: number;     // 10% weight
  };
  concerns: string[];
  recommendations: string[];
  autoMatch: boolean; // True if score >= 70 AND no concerns
}

/**
 * PRESERVED BUSINESS INTELLIGENCE: ROI & Strategy Analysis
 */
export interface ScholarshipRecommendation {
  scholarshipId: string;
  matchScore: number; // 0-100
  effort: 'low' | 'medium' | 'high' | 'very_high';
  successProbability: number; // 0-100
  estimatedROI: number; // award amount / hours invested
  competitionLevel: number; // 0-100  
  reasons: string[];
  concerns: string[];
  strategicValue: 'high' | 'medium' | 'low';
  timeInvestment: number; // estimated hours
}

// ===================================================================
// SCHOLARSHIP SCORING ENGINE CLASS
// ===================================================================

export class ScholarshipScoringEngine {
  
  /**
   * ===================================================================
   * CRITICAL BUSINESS ALGORITHM: WEIGHTED ELIGIBILITY SCORING
   * ===================================================================
   * Preserves exact BugX weighting system and calculation logic
   */
  static calculateEligibilityScore(
    profile: StudentProfile, 
    scholarship: ScholarshipOpportunity
  ): EligibilityScore {
    
    // Calculate individual factor scores using preserved algorithms
    const breakdown = {
      gpa: this.calculateGPAScore(profile.gpa, scholarship.gpaMinimum),
      education: this.calculateEducationScore(profile.educationLevel, scholarship.educationLevel),
      demographics: this.calculateDemographicsScore(profile, scholarship),
      financial: this.calculateFinancialScore(profile.familyIncome, scholarship.maxIncome),
      activities: this.calculateActivitiesScore(profile.activities, scholarship.category),
      essays: this.calculateEssayReadinessScore(profile.writingSkills, scholarship.estimatedHours)
    };
    
    // PRESERVED WEIGHTING ALGORITHM - Do NOT modify these weights
    const weights = {
      gpa: 0.25,        // 25% - Most important factor
      education: 0.20,   // 20% - Education level match
      demographics: 0.15, // 15% - Demographic fit
      financial: 0.15,   // 15% - Financial need alignment
      activities: 0.15,  // 15% - Activities and experience
      essays: 0.10       // 10% - Essay capability
    };
    
    // Calculate weighted overall score
    const overall = Object.entries(breakdown).reduce((sum, [key, score]) => {
      return sum + (score * weights[key as keyof typeof weights]);
    }, 0);
    
    // Generate intelligent analysis
    const { concerns, recommendations } = this.generateIntelligentAnalysis(breakdown, scholarship);
    
    // Auto-match criteria (preserved from original)
    const autoMatch = overall >= 70 && concerns.length === 0;
    
    return {
      overall: Math.round(overall),
      breakdown,
      concerns,
      recommendations,
      autoMatch
    };
  }
  
  /**
   * ===================================================================
   * PRESERVED ALGORITHM: GPA SCORING WITH BONUS/PENALTY SYSTEM
   * ===================================================================
   */
  private static calculateGPAScore(studentGPA: number, requiredGPA?: number): number {
    if (!requiredGPA) return 100; // No GPA requirement = perfect score
    if (!studentGPA || studentGPA < 0) return 0;
    
    if (studentGPA >= requiredGPA) {
      // BONUS SYSTEM: Extra points for exceeding requirements
      const excess = Math.min((studentGPA - requiredGPA) * 25, 20);
      return Math.min(100, 80 + excess);
    } else {
      // PENALTY SYSTEM: Graduated penalty for falling short
      const deficit = (requiredGPA - studentGPA) / requiredGPA;
      return Math.max(0, 100 - (deficit * 100));
    }
  }
  
  /**
   * ===================================================================
   * PRESERVED ALGORITHM: EDUCATION LEVEL MATCHING
   * ===================================================================
   */
  private static calculateEducationScore(
    studentLevel: string, 
    allowedLevels: string[]
  ): number {
    if (allowedLevels.includes(studentLevel)) {
      return 100; // Perfect match
    }
    
    // Education level hierarchy scoring
    const levelHierarchy = {
      'high_school': 1,
      'undergraduate': 2, 
      'graduate': 3,
      'postgraduate': 4
    };
    
    const studentLevelNum = levelHierarchy[studentLevel as keyof typeof levelHierarchy] || 0;
    const allowedLevelNums = allowedLevels.map(level => 
      levelHierarchy[level as keyof typeof levelHierarchy] || 0
    );
    
    const closestMatch = allowedLevelNums.reduce((closest, current) => 
      Math.abs(current - studentLevelNum) < Math.abs(closest - studentLevelNum) ? current : closest
    );
    
    const difference = Math.abs(studentLevelNum - closestMatch);
    
    // Scoring based on proximity
    switch (difference) {
      case 0: return 100;
      case 1: return 75;
      case 2: return 50;
      case 3: return 25;
      default: return 0;
    }
  }
  
  /**
   * ===================================================================
   * PRESERVED ALGORITHM: DEMOGRAPHICS MATCHING
   * ===================================================================
   */
  private static calculateDemographicsScore(
    profile: StudentProfile,
    scholarship: ScholarshipOpportunity
  ): number {
    let score = 100; // Start with perfect score
    let matches = 0;
    let total = 0;
    
    // Citizenship check
    if (scholarship.citizenship?.length) {
      total++;
      const hasMatch = scholarship.citizenship.some(required => 
        profile.citizenship.includes(required)
      );
      if (hasMatch) matches++;
    }
    
    // Residency check
    if (scholarship.residency?.length) {
      total++;
      const hasMatch = scholarship.residency.some(required =>
        profile.residency.includes(required)
      );
      if (hasMatch) matches++;
    }
    
    // Demographics check
    if (scholarship.demographics?.length && profile.ethnicity?.length) {
      total++;
      const hasMatch = scholarship.demographics.some(required =>
        profile.ethnicity?.includes(required)
      );
      if (hasMatch) matches++;
    }
    
    // Calculate match percentage
    if (total === 0) return 100; // No demographic requirements
    const matchPercentage = (matches / total);
    
    return Math.round(matchPercentage * 100);
  }
  
  /**
   * ===================================================================
   * PRESERVED ALGORITHM: FINANCIAL NEED ASSESSMENT
   * ===================================================================
   */
  private static calculateFinancialScore(
    familyIncome?: number, 
    maxIncome?: number
  ): number {
    if (!maxIncome) return 100; // No income restriction
    if (!familyIncome) return 50; // Unknown income = neutral score
    
    if (familyIncome <= maxIncome) {
      // Score based on how much under the limit
      const ratio = familyIncome / maxIncome;
      if (ratio <= 0.5) return 100; // Very low income = perfect score
      if (ratio <= 0.75) return 85;  // Low income = high score
      return 70; // Qualifies but higher income = good score
    } else {
      // Over income limit - calculate how much over
      const excess = (familyIncome - maxIncome) / maxIncome;
      if (excess <= 0.1) return 30; // Slightly over = low score
      return 0; // Significantly over = no score
    }
  }
  
  /**
   * ===================================================================
   * PRESERVED ALGORITHM: ACTIVITIES AND EXPERIENCE SCORING
   * ===================================================================
   */
  private static calculateActivitiesScore(
    activities: string[],
    scholarshipCategory: string
  ): number {
    let baseScore = Math.min(activities.length * 10, 60); // Base score from quantity
    
    // Category-specific bonuses
    const categoryBonus = this.calculateCategoryBonus(activities, scholarshipCategory);
    
    // Leadership bonus
    const leadershipKeywords = ['president', 'captain', 'leader', 'founder', 'coordinator'];
    const hasLeadership = activities.some(activity => 
      leadershipKeywords.some(keyword => 
        activity.toLowerCase().includes(keyword)
      )
    );
    const leadershipBonus = hasLeadership ? 15 : 0;
    
    // Community service bonus
    const serviceKeywords = ['volunteer', 'community', 'service', 'charity', 'nonprofit'];
    const hasCommunityService = activities.some(activity =>
      serviceKeywords.some(keyword =>
        activity.toLowerCase().includes(keyword)
      )
    );
    const serviceBonus = hasCommunityService ? 10 : 0;
    
    return Math.min(100, baseScore + categoryBonus + leadershipBonus + serviceBonus);
  }
  
  /**
   * ===================================================================
   * PRESERVED ALGORITHM: CATEGORY-SPECIFIC BONUS CALCULATION
   * ===================================================================
   */
  private static calculateCategoryBonus(activities: string[], category: string): number {
    const categoryKeywords: Record<string, string[]> = {
      'stem': ['science', 'technology', 'engineering', 'mathematics', 'coding', 'research'],
      'arts': ['art', 'music', 'theater', 'creative', 'design', 'performance'],
      'athletics': ['sports', 'athletic', 'team', 'competition', 'fitness', 'coach'],
      'academic': ['academic', 'honor', 'debate', 'quiz', 'scholarship', 'study'],
      'community': ['volunteer', 'community', 'service', 'outreach', 'charity', 'nonprofit'],
      'leadership': ['leadership', 'president', 'officer', 'coordinator', 'manager', 'founder']
    };
    
    const keywords = categoryKeywords[category.toLowerCase()] || [];
    const matches = activities.filter(activity =>
      keywords.some(keyword =>
        activity.toLowerCase().includes(keyword)
      )
    ).length;
    
    return Math.min(25, matches * 8); // Up to 25 bonus points
  }
  
  /**
   * ===================================================================
   * PRESERVED ALGORITHM: ESSAY READINESS ASSESSMENT
   * ===================================================================
   */
  private static calculateEssayReadinessScore(
    writingSkills: string,
    estimatedHours: number
  ): number {
    // Base score from writing skills
    const skillScores = {
      'excellent': 100,
      'strong': 85,
      'good': 70,
      'basic': 50
    };
    
    let baseScore = skillScores[writingSkills as keyof typeof skillScores] || 30;
    
    // Adjustment based on time requirement
    if (estimatedHours > 20) {
      baseScore -= 15; // Penalty for very time-intensive applications
    } else if (estimatedHours > 10) {
      baseScore -= 5;  // Small penalty for time-intensive applications
    }
    
    return Math.max(0, Math.min(100, baseScore));
  }
  
  /**
   * ===================================================================
   * PRESERVED ALGORITHM: INTELLIGENT ANALYSIS GENERATION
   * ===================================================================
   */
  private static generateIntelligentAnalysis(
    breakdown: EligibilityScore['breakdown'],
    scholarship: ScholarshipOpportunity
  ): { concerns: string[]; recommendations: string[] } {
    const concerns: string[] = [];
    const recommendations: string[] = [];
    
    // GPA Analysis
    if (breakdown.gpa < 60) {
      concerns.push('GPA below scholarship requirements');
      recommendations.push('Focus on improving academic performance before applying');
    } else if (breakdown.gpa >= 90) {
      recommendations.push('Excellent academic match - highlight GPA prominently in application');
    }
    
    // Education Level Analysis
    if (breakdown.education < 80) {
      concerns.push('Education level may not match scholarship requirements');
      recommendations.push('Verify education level requirements carefully');
    }
    
    // Demographics Analysis  
    if (breakdown.demographics < 50) {
      concerns.push('Limited demographic alignment with scholarship criteria');
    }
    
    // Financial Analysis
    if (breakdown.financial < 60) {
      concerns.push('Income level may exceed scholarship limits');
      recommendations.push('Consider scholarships with higher income thresholds');
    }
    
    // Activities Analysis
    if (breakdown.activities < 60) {
      recommendations.push('Strengthen extracurricular profile before applying');
    } else if (breakdown.activities >= 80) {
      recommendations.push('Strong activity profile - emphasize leadership and impact');
    }
    
    // Essays Analysis
    if (breakdown.essays < 70) {
      recommendations.push('Allocate extra time for essay writing and editing');
      if (scholarship.estimatedHours > 15) {
        recommendations.push('Consider getting professional essay review for this high-effort application');
      }
    }
    
    // Overall Strategy Recommendations
    const overall = Object.values(breakdown).reduce((sum, score) => sum + score, 0) / Object.keys(breakdown).length;
    
    if (overall >= 85) {
      recommendations.push('Excellent match - prioritize this application');
    } else if (overall >= 70) {
      recommendations.push('Good match - worth applying with focused preparation');
    } else if (overall >= 50) {
      recommendations.push('Moderate match - consider if you have time and meet basic requirements');
    } else {
      recommendations.push('Low match - focus on better-fitting opportunities first');
    }
    
    return { concerns, recommendations };
  }
  
  /**
   * ===================================================================
   * PRESERVED ALGORITHM: ROI ANALYSIS AND SUCCESS PREDICTION
   * ===================================================================
   */
  static calculateROIAndSuccess(
    eligibilityScore: EligibilityScore,
    scholarship: ScholarshipOpportunity,
    profile: StudentProfile
  ): ScholarshipRecommendation {
    
    // Success probability calculation based on eligibility score
    let successProbability = eligibilityScore.overall * 0.8; // Base from eligibility
    
    // Adjust for competition level
    const competitionAdjustments = {
      'low': 1.2,
      'moderate': 1.0,
      'high': 0.8,
      'very_high': 0.6
    };
    successProbability *= competitionAdjustments[scholarship.competitiveness];
    
    // Adjust for difficulty
    const difficultyAdjustments = {
      'easy': 1.1,
      'moderate': 1.0,
      'challenging': 0.9,
      'very_difficult': 0.7
    };
    successProbability *= difficultyAdjustments[scholarship.difficulty];
    
    successProbability = Math.min(95, Math.max(5, successProbability)); // Cap between 5-95%
    
    // ROI Calculation
    const timeInvestment = scholarship.estimatedHours;
    const estimatedROI = scholarship.awardAmount / timeInvestment;
    
    // Competition level scoring
    const competitionScores = {
      'low': 25,
      'moderate': 50,
      'high': 75,
      'very_high': 90
    };
    const competitionLevel = competitionScores[scholarship.competitiveness];
    
    // Effort classification
    let effort: ScholarshipRecommendation['effort'];
    if (timeInvestment <= 5) effort = 'low';
    else if (timeInvestment <= 15) effort = 'medium';
    else if (timeInvestment <= 30) effort = 'high';
    else effort = 'very_high';
    
    // Strategic value assessment
    let strategicValue: ScholarshipRecommendation['strategicValue'];
    if (estimatedROI >= 500 && successProbability >= 60) strategicValue = 'high';
    else if (estimatedROI >= 200 && successProbability >= 40) strategicValue = 'medium';
    else strategicValue = 'low';
    
    // Generate reasons and concerns
    const reasons: string[] = [];
    const concerns: string[] = [];
    
    if (eligibilityScore.overall >= 80) {
      reasons.push('Excellent eligibility match');
    }
    if (estimatedROI >= 500) {
      reasons.push('High return on investment');
    }
    if (successProbability >= 70) {
      reasons.push('High probability of success');
    }
    
    if (successProbability < 30) {
      concerns.push('Low probability of success');
    }
    if (timeInvestment > 25) {
      concerns.push('Very high time investment required');
    }
    if (eligibilityScore.concerns.length > 0) {
      concerns.push(...eligibilityScore.concerns);
    }
    
    return {
      scholarshipId: scholarship.id,
      matchScore: eligibilityScore.overall,
      effort,
      successProbability: Math.round(successProbability),
      estimatedROI: Math.round(estimatedROI),
      competitionLevel,
      reasons,
      concerns,
      strategicValue,
      timeInvestment
    };
  }
}

/**
 * ===================================================================
 * USAGE EXAMPLE - PRESERVED BUSINESS LOGIC DEMONSTRATION
 * ===================================================================
 */
export function demonstrateScholarshipScoring() {
  const sampleProfile: StudentProfile = {
    gpa: 3.7,
    educationLevel: 'undergraduate',
    major: 'Computer Science',
    age: 20,
    citizenship: ['US'],
    residency: ['California'],
    familyIncome: 45000,
    financialNeed: 'high',
    activities: ['coding club president', 'volunteer tutor', 'research assistant'],
    leadership: ['president'],
    communityService: ['tutor'],
    workExperience: ['internship'],
    awards: ['honor roll'],
    writingSkills: 'strong',
    timeAvailable: 15,
    applicationExperience: 'some'
  };
  
  const sampleScholarship: ScholarshipOpportunity = {
    id: 'tech_scholarship_2024',
    title: 'Technology Excellence Scholarship',
    provider: 'Tech Foundation',
    awardAmount: 5000,
    numberOfAwards: 10,
    gpaMinimum: 3.5,
    educationLevel: ['undergraduate'],
    citizenship: ['US'],
    essayCount: 2,
    essayWordLimit: 500,
    recommendationLetters: 2,
    estimatedHours: 12,
    difficulty: 'moderate',
    competitiveness: 'high',
    category: 'stem',
    deadline: new Date('2024-12-01')
  };
  
  // Calculate eligibility using preserved algorithms
  const eligibilityScore = ScholarshipScoringEngine.calculateEligibilityScore(
    sampleProfile, 
    sampleScholarship
  );
  
  // Calculate ROI and success metrics
  const recommendation = ScholarshipScoringEngine.calculateROIAndSuccess(
    eligibilityScore,
    sampleScholarship, 
    sampleProfile
  );
  
  return {
    eligibilityScore,
    recommendation
  };
}

export default ScholarshipScoringEngine;