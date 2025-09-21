-- ===================================================================
-- PORTFOLIO ANALYTICS DATABASE EXPORT - BUGX BUSINESS INTELLIGENCE
-- ===================================================================
-- Extracted following BugX Alpha Technical Guide v1.2 methodology
-- Business Logic Preservation Strategy implementation
-- Date: $(date)

-- Portfolio Analytics Table Structure
CREATE TABLE portfolio_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(36) NOT NULL,
  
  -- Portfolio Statistics (Core Metrics)
  total_applications INTEGER DEFAULT 0,
  active_applications INTEGER DEFAULT 0,
  submitted_applications INTEGER DEFAULT 0,
  awarded_applications INTEGER DEFAULT 0,
  rejected_applications INTEGER DEFAULT 0,
  
  -- SUCCESS METRICS (Critical Business Intelligence)
  success_rate DECIMAL(5,2) DEFAULT 0.00,
  total_award_amount DECIMAL(12,2) DEFAULT 0.00,
  average_award_amount DECIMAL(12,2) DEFAULT 0.00,
  
  -- Time & Effort Analytics
  total_hours_spent INTEGER DEFAULT 0,
  average_hours_per_application DECIMAL(5,2) DEFAULT 0.00,
  average_completion_time INTEGER DEFAULT 0, -- in days
  
  -- BUGX PORTFOLIO STRENGTH ALGORITHM (Preserve This Logic)
  portfolio_strength JSONB DEFAULT '{
    "overallScore": 0,
    "strengthAreas": [],
    "improvementAreas": [],
    "competitivenessRating": "unknown",
    "marketPositioning": {
      "percentile": 0,
      "comparison": "insufficient_data"
    }
  }'::jsonb,
  
  -- PREDICTION & RECOMMENDATIONS ENGINE (Critical AI Logic)
  predictions JSONB DEFAULT '{
    "expectedSuccessRate": 0,
    "recommendedApplications": [],
    "optimalStrategy": "balanced",
    "riskAssessment": {
      "level": "unknown",
      "factors": []
    }
  }'::jsonb,
  
  -- Reporting Context
  reporting_period VARCHAR(20) NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Business Intelligence Indexes for Performance
CREATE INDEX idx_portfolio_analytics_user_id ON portfolio_analytics(user_id);
CREATE INDEX idx_portfolio_analytics_period ON portfolio_analytics(reporting_period, period_start, period_end);
CREATE INDEX idx_portfolio_analytics_success_rate ON portfolio_analytics(success_rate);
CREATE INDEX idx_portfolio_analytics_overall_score ON portfolio_analytics USING GIN ((portfolio_strength->>'overallScore'));

-- ===================================================================
-- BUSINESS INTELLIGENCE QUERIES (Preserve These Algorithms)
-- ===================================================================

-- SUCCESS RATE CALCULATION ALGORITHM
-- Input: user_id, time_period
-- Output: Weighted success rate with trend analysis
SELECT 
  user_id,
  reporting_period,
  
  -- Core Success Rate Formula (Preserve This)
  CASE 
    WHEN submitted_applications > 0 
    THEN ROUND((awarded_applications::DECIMAL / submitted_applications::DECIMAL) * 100, 2)
    ELSE 0 
  END as calculated_success_rate,
  
  -- ROI Analysis (Critical Business Logic)
  CASE 
    WHEN total_hours_spent > 0 
    THEN ROUND(total_award_amount / total_hours_spent, 2)
    ELSE 0 
  END as roi_per_hour,
  
  -- Portfolio Strength Score Extraction
  (portfolio_strength->>'overallScore')::INTEGER as portfolio_score,
  
  -- Market Positioning Algorithm
  (portfolio_strength->'marketPositioning'->>'percentile')::INTEGER as market_percentile,
  
  -- Predictive Success Rate
  (predictions->>'expectedSuccessRate')::DECIMAL as predicted_success_rate,
  
  -- Risk Level Assessment
  predictions->'riskAssessment'->>'level' as risk_level
  
FROM portfolio_analytics 
WHERE user_id = $1 
  AND period_start >= $2 
  AND period_end <= $3
ORDER BY period_start DESC;

-- COMPETITIVE ANALYSIS ALGORITHM
-- Multi-user comparison with percentile ranking
WITH user_rankings AS (
  SELECT 
    user_id,
    success_rate,
    total_award_amount,
    (portfolio_strength->>'overallScore')::INTEGER as portfolio_score,
    -- Percentile Ranking Algorithm (Preserve This)
    PERCENT_RANK() OVER (ORDER BY success_rate) * 100 as success_percentile,
    PERCENT_RANK() OVER (ORDER BY total_award_amount) * 100 as award_percentile,
    PERCENT_RANK() OVER (ORDER BY (portfolio_strength->>'overallScore')::INTEGER) * 100 as portfolio_percentile
  FROM portfolio_analytics
  WHERE reporting_period = 'annual'
    AND period_end >= CURRENT_DATE - INTERVAL '1 year'
)
SELECT 
  user_id,
  success_rate,
  success_percentile,
  -- Competitive Positioning Formula
  CASE 
    WHEN success_percentile >= 90 THEN 'top_performer'
    WHEN success_percentile >= 75 THEN 'high_performer' 
    WHEN success_percentile >= 50 THEN 'average_performer'
    WHEN success_percentile >= 25 THEN 'developing_performer'
    ELSE 'needs_improvement'
  END as competitive_tier
FROM user_rankings
WHERE user_id = $1;

-- TREND ANALYSIS ALGORITHM (Preserve This Logic)
-- Identifies improvement/decline patterns
WITH monthly_trends AS (
  SELECT 
    user_id,
    reporting_period,
    success_rate,
    total_award_amount,
    created_at,
    -- Trend Calculation Formula
    success_rate - LAG(success_rate, 1) OVER (
      PARTITION BY user_id 
      ORDER BY period_start
    ) as success_rate_change,
    
    total_award_amount - LAG(total_award_amount, 1) OVER (
      PARTITION BY user_id 
      ORDER BY period_start  
    ) as award_amount_change
    
  FROM portfolio_analytics
  WHERE user_id = $1
    AND reporting_period = 'monthly'
  ORDER BY period_start DESC
)
SELECT 
  user_id,
  -- Trend Classification Algorithm
  CASE 
    WHEN AVG(success_rate_change) > 5 THEN 'improving'
    WHEN AVG(success_rate_change) BETWEEN -5 AND 5 THEN 'stable'
    ELSE 'declining' 
  END as success_trend,
  
  CASE 
    WHEN AVG(award_amount_change) > 100 THEN 'improving'
    WHEN AVG(award_amount_change) BETWEEN -100 AND 100 THEN 'stable'
    ELSE 'declining'
  END as financial_trend,
  
  COUNT(*) as periods_analyzed
FROM monthly_trends
WHERE success_rate_change IS NOT NULL
GROUP BY user_id;

-- ===================================================================
-- SAMPLE DATA EXPORT (Business Intelligence Patterns)
-- ===================================================================

-- Sample High-Performing User Profile
INSERT INTO portfolio_analytics (
  user_id, total_applications, submitted_applications, awarded_applications,
  success_rate, total_award_amount, total_hours_spent,
  portfolio_strength, predictions, reporting_period, period_start, period_end
) VALUES (
  'sample_user_001',
  15, 12, 8,
  66.67, 25000.00, 180,
  '{
    "overallScore": 85,
    "strengthAreas": ["strong_gpa", "diverse_activities", "compelling_essays"],
    "improvementAreas": ["interview_skills"],
    "competitivenessRating": "high_performer",
    "marketPositioning": {
      "percentile": 87,
      "comparison": "top_15_percent"
    }
  }',
  '{
    "expectedSuccessRate": 72.5,
    "recommendedApplications": ["stem_scholarship_2024", "leadership_award", "community_service_grant"],
    "optimalStrategy": "quality_over_quantity",
    "riskAssessment": {
      "level": "low",
      "factors": ["strong_profile", "good_fit_targeting"]
    }
  }',
  'annual', '2024-01-01', '2024-12-31'
);

-- Export complete. Preserve all algorithms and business logic above.