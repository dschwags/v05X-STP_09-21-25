/**
 * BugX v1.4 Streamlined AI Implementation Guide
 * Date: September 17, 2025
 * Author: David Schwager
 * Contact: BugX@BrewX.com
 * 
 * PURPOSE: Rapid AI-friendly debugging methodology (4-5 minutes)
 * TARGET: 85% value retention with maximum efficiency
 */

// ===================================================================
// PHASE 0: RAPID REALITY CHECK
// ===================================================================

/**
 * AI PROMPT TRIGGER: Use this exact phrase to activate BugX v1.4
 * 
 * "Apply BugX v1.4 methodology to debug [ISSUE_DESCRIPTION]"
 */

interface BugXContext {
  errorType: 'business_logic' | 'integration' | 'pattern' | 'infrastructure';
  systematicValue: 'high' | 'medium' | 'low';
  timeTarget: '4-5 minutes';
  expectedValue: '85% BugX retention';
}

const PHASE_0_CLASSIFICATION = `
CLASSIFICATION DECISION TREE:
├── Business Logic: Domain calculations, state management, rules
├── Integration: Component communication, data flow, APIs  
├── Pattern: Forms, validation, rendering, auth (known issues)
└── Infrastructure: Build, config, deployment, environment

SYSTEMATIC VALUE ASSESSMENT:
├── HIGH: Business logic, new patterns, critical systems → Full BugX
├── MEDIUM: Integration issues, moderate complexity → BugX v1.4
└── LOW: Known patterns, simple fixes → Quick fix + documentation
`;

// ===================================================================
// PHASE 1: ENHANCED PATTERN DETECTION
// ===================================================================

interface PatternTemplate {
  name: string;
  trigger: string[];
  solution: string;
  implementation: string;
  prevention: string;
  timeEstimate: string;
}

const COMMON_PATTERNS: Record<string, PatternTemplate> = {
  hydration_error: {
    name: "React Hydration Mismatch",
    trigger: ["server rendered text didn't match", "hydration failed", "useEffect", "Math.random"],
    solution: "Static initial values + client-side state check",
    timeEstimate: "5-15 minutes",
    implementation: `
      const [isClient, setIsClient] = useState(false);
      const [data, setData] = useState(STATIC_INITIAL_VALUE);
      useEffect(() => setIsClient(true), []);
      if (!isClient) return <Loading />;
    `,
    prevention: "Always use static initial values for SSR components"
  },
  
  form_validation: {
    name: "Form Validation Failure", 
    trigger: ["validation error", "form submit", "required field", "invalid input"],
    solution: "Zod schema with comprehensive error handling",
    timeEstimate: "10-20 minutes",
    implementation: `
      const schema = z.object({
        [field]: z.string().min(1, "Field is required").email("Invalid email")
      });
      const result = schema.safeParse(formData);
      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
        return;
      }
    `,
    prevention: "Define validation schema before form implementation"
  },
  
  null_reference: {
    name: "Null/Undefined Reference",
    trigger: ["cannot read property", "undefined is not", "null reference", "TypeError"],
    solution: "Null checks with early returns or optional chaining",
    timeEstimate: "5-10 minutes",
    implementation: `
      // Option 1: Early return
      if (!data || !data.property) {
        return <ErrorState />;
      }
      
      // Option 2: Optional chaining
      const value = data?.property?.nestedValue ?? DEFAULT_VALUE;
    `,
    prevention: "Add null checks at data entry points and critical access points"
  },

  api_integration: {
    name: "API Integration Failure",
    trigger: ["fetch failed", "network error", "API response", "status 500", "status 404"],
    solution: "Comprehensive error handling with fallback states",
    timeEstimate: "15-25 minutes",
    implementation: `
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('API Error:', error);
        setError(error.message);
        return DEFAULT_DATA;
      }
    `,
    prevention: "Always handle both network and application errors with user feedback"
  }
};

// ===================================================================
// PHASE 2: CONTEXTUAL ANALYSIS
// ===================================================================

const CONTEXT_ANALYSIS_PROMPT = `
RAPID CONTEXT ASSESSMENT:

COMPONENT SCOPE:
- Primary affected component: [IDENTIFY]
- Related components (2 degrees): [LIST]
- Critical dependencies: [FLAG]

DATA FLOW IMPACT: 
- Input source: [WHERE DATA COMES FROM]
- Transformation point: [WHERE PROCESSING OCCURS]
- Error location: [WHERE FAILURE HAPPENS]
- Downstream effects: [WHAT BREAKS NEXT]

SYSTEM CRITICALITY:
- User impact: [NONE/LOW/MEDIUM/HIGH]
- Production risk: [SAFE/CAUTION/DANGER]
- Testing needs: [UNIT/INTEGRATION/E2E]
`;

// ===================================================================
// PHASE 3: SOLUTION IMPLEMENTATION
// ===================================================================

const IMPLEMENTATION_CHECKLIST = `
ROOT CAUSE ADDRESS:
✓ Fix addresses cause, not symptom
✓ Solution pattern applied from template
✓ Code follows established patterns
✓ Edge cases considered

QUICK VALIDATION:
✓ Specific error case resolved
✓ No obvious regressions introduced
✓ Basic functionality confirmed
`;

// ===================================================================
// PHASE 4: PREVENTION INTEGRATION
// ===================================================================

const PREVENTION_TEMPLATES = {
  architecture: {
    pattern: "Component design pattern that prevents error class",
    implementation: "Structural changes to prevent category of issues",
    documentation: "Architecture decision recorded for team"
  },
  
  validation: {
    pattern: "Input/output validation pattern for data integrity", 
    implementation: "Comprehensive validation with clear error messages",
    documentation: "Validation rules and error handling documented"
  },
  
  testing: {
    pattern: "Test pattern that catches regression scenarios",
    implementation: "Quick test cases for edge cases and failure modes", 
    documentation: "Test coverage for similar issues documented"
  }
};

// ===================================================================
// PHASE 5: DOCUMENTATION CAPTURE
// ===================================================================

const DOCUMENTATION_TEMPLATE = `
## [ERROR_TYPE] - [COMPONENT_NAME]
**Issue**: [Brief description of what went wrong]
**Root Cause**: [Underlying cause that created the issue]
**Solution**: [Applied fix - be specific]  
**Prevention**: [Pattern applied to prevent recurrence]
**Pattern**: [Reusable template for similar issues]

Template Category: [business_logic|integration|pattern|infrastructure]
Reusability: [high|medium|low]
`;

// ===================================================================
// AI EMBEDDING STRATEGIES
// ===================================================================

const AI_WORKFLOW_PROMPTS = {
  
  BUGX_ACTIVATION: `
Apply BugX v1.4 systematic debugging to: [ISSUE_DESCRIPTION]

Target: 4-5 minutes, 85% methodology value
Process:
1. CLASSIFY: [business_logic|integration|pattern|infrastructure] 
2. PATTERN MATCH: Check common patterns library
3. CONTEXT: Component scope + data flow + criticality
4. IMPLEMENT: Root cause fix + quick validation
5. PREVENT: Apply prevention template
6. DOCUMENT: 30-second structured capture

Expected output:
- Working solution
- Prevention pattern applied
- Documentation template filled
- Pattern added to library (if new)
`,

  PATTERN_MATCHING: `
Based on error description: "[ERROR_DESCRIPTION]"

Pattern matching process:
1. Check trigger keywords against known patterns
2. If match found: Apply template solution + implementation
3. If variant: Adapt closest template + note differences  
4. If new: Create new pattern template for library

Provide:
- Pattern identification
- Template-based solution
- Implementation code
- Prevention measures
- Documentation entry
`,

  CONTEXT_ANALYSIS: `
Analyze debugging context for: [COMPONENT/ISSUE]

Rapid assessment (60 seconds):
- Component relationships and dependencies
- Data flow from input to error point
- System criticality and risk assessment
- Testing requirements

Output format:
- Primary component: [NAME]
- Dependencies: [LIST]
- Data flow: [INPUT] -> [PROCESS] -> [ERROR]
- Risk level: [LOW/MEDIUM/HIGH]
- Testing needs: [UNIT/INTEGRATION/E2E]
`,

  PREVENTION_APPLICATION: `
Apply prevention measures for: [RESOLVED_ISSUE]

Prevention categories:
- Architecture: Structural changes preventing error class
- Validation: Data integrity patterns  
- Testing: Regression prevention patterns

Provide:
- Prevention pattern selection
- Implementation approach
- Documentation format
- Template library update
`
};

// ===================================================================
// SUCCESS METRICS
// ===================================================================

interface BugXMetrics {
  timeEfficiency: {
    averageDebugTime: number; // Target: 4-5 minutes
    templateUsageRate: number; // Target: >70%
    patternMatchAccuracy: number; // Target: >80%
  };
  
  qualityImpact: {
    bugRecurrenceRate: number; // Target: <10%
    preventionEffectiveness: number; // Target: >75% 
    teamKnowledgeSharing: number; // Target: measurable growth
  };
  
  libraryGrowth: {
    newPatternsPerMonth: number;
    patternMaturityDistribution: Record<string, number>;
    unusedPatternCleanup: number;
  };
}

export type { BugXContext, PatternTemplate, BugXMetrics };
export {
  COMMON_PATTERNS,
  CONTEXT_ANALYSIS_PROMPT,
  IMPLEMENTATION_CHECKLIST,
  PREVENTION_TEMPLATES,
  DOCUMENTATION_TEMPLATE,
  AI_WORKFLOW_PROMPTS
};