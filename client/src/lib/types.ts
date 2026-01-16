export interface WizardState {
  processo: string;
  fase: string;
  ato: string;
  tema: string;
}

export interface RuleResult {
  statusBadge: string;
  pode: string[];
  naoPode: string[];
  acaoRecomendada: string;
  prazo: string;
  fundamento: string;
  risco: string;
  riscoLevel: 'high' | 'medium' | 'low';
  ctaLabel: string;
  observacoes?: string;
}

export interface Rule {
  id: string;
  match: Partial<WizardState>;
  result: RuleResult;
}
