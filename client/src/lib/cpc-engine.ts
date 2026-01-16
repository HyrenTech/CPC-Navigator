import ruleset from './ruleset.json';
import { Rule, RuleResult, WizardState } from './types';

// Helper to check if a rule matches the current state
const isMatch = (ruleMatch: Partial<WizardState>, state: WizardState): boolean => {
  const keys = Object.keys(ruleMatch) as (keyof WizardState)[];
  if (keys.length === 0) return false; // Empty match object is for fallback only
  
  return keys.every(key => ruleMatch[key] === state[key]);
};

export const evaluateRules = (state: WizardState): RuleResult => {
  const rules = ruleset as Rule[];
  
  // 1. Exact Match (All 4 fields match)
  const exactMatch = rules.find(r => 
    r.match.processo === state.processo &&
    r.match.fase === state.fase &&
    r.match.ato === state.ato &&
    r.match.tema === state.tema
  );
  if (exactMatch) return exactMatch.result;

  // 2. Partial Match (Processo + Ato + Tema) - Ignoring Fase
  const partialMatch = rules.find(r => 
    r.match.processo === state.processo &&
    r.match.ato === state.ato &&
    r.match.tema === state.tema &&
    !r.match.fase 
  );
  if (partialMatch) return partialMatch.result;

  // 3. Generic Match (Processo + Ato) - Ignoring Fase and Tema
  const genericMatch = rules.find(r => 
    r.match.processo === state.processo &&
    r.match.ato === state.ato &&
    !r.match.fase &&
    !r.match.tema
  );
  if (genericMatch) return genericMatch.result;

  // 3b. Just Ato (Very generic)
  const atoMatch = rules.find(r => 
    r.match.ato === state.ato &&
    !r.match.processo &&
    !r.match.fase &&
    !r.match.tema
  );
  if (atoMatch) return atoMatch.result;

  // 4. Universal Fallback
  const fallback = rules.find(r => Object.keys(r.match).length === 0);
  if (fallback) return fallback.result;

  // Absolute fallback if JSON is broken
  return {
    statusBadge: "Erro desconhecido",
    pode: [],
    naoPode: [],
    acaoRecomendada: "Contatar suporte",
    prazo: "-",
    fundamento: "-",
    risco: "-",
    riscoLevel: "medium",
    ctaLabel: "Reiniciar"
  };
};
