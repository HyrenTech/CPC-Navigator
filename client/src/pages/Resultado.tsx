import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { useWizardStore } from "@/store/wizard";
import { evaluateRules } from "@/lib/cpc-engine";
import { RuleResult } from "@/lib/types";
import { 
  CheckCircle2, AlertTriangle, XCircle, Clock, BookOpen, 
  ArrowRight, Copy, RotateCcw, AlertOctagon 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Resultado() {
  const [_, setLocation] = useLocation();
  const state = useWizardStore();
  const [result, setResult] = useState<RuleResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const computedResult = evaluateRules(state);
    setResult(computedResult);
  }, [state]);

  const handleCopy = () => {
    if (!result) return;
    const text = `
Resumo CPC Navigator:
Ato: ${state.ato} (${state.processo})
Tema: ${state.tema}
Resultado: ${result.statusBadge}
Ação Recomendada: ${result.acaoRecomendada}
Prazo: ${result.prazo}
Fundamento: ${result.fundamento}
Risco: ${result.risco}
    `.trim();
    
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Resumo copiado para a área de transferência.",
    });
  };

  const handleRestart = () => {
    state.reset();
    setLocation("/");
  };

  const handleNext = () => {
    setLocation("/checklist");
  };

  if (!result) return null;

  const isHighRisk = result.riscoLevel === 'high';

  return (
    <Layout step={5} title="Análise Concluída">
      <div className="space-y-8">
        {/* Status Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl shadow-slate-200">
          <div className="flex items-start gap-4">
            <div className={cn(
              "p-3 rounded-xl",
              isHighRisk ? "bg-red-500/20 text-red-200" : "bg-white/10 text-slate-200"
            )}>
              {isHighRisk ? <AlertOctagon className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
            </div>
            <div>
              <p className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Classificação do Ato</p>
              <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight">
                {result.statusBadge}
              </h2>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/5">
              <div className="flex items-center gap-2 text-slate-300 mb-1 text-sm">
                <Clock className="w-4 h-4" />
                Prazo Fatal
              </div>
              <p className="text-xl font-bold">{result.prazo}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/5">
              <div className="flex items-center gap-2 text-slate-300 mb-1 text-sm">
                <BookOpen className="w-4 h-4" />
                Fundamento Legal
              </div>
              <p className="text-xl font-bold font-serif">{result.fundamento}</p>
            </div>
          </div>
        </div>

        {/* Action Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-green-200 bg-green-50/50 rounded-xl p-6">
            <h3 className="flex items-center gap-2 text-green-800 font-bold mb-4">
              <CheckCircle2 className="w-5 h-5" />
              Você PODE fazer
            </h3>
            <ul className="space-y-3">
              {result.pode.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-green-900 text-sm">
                  <span className="block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-red-200 bg-red-50/50 rounded-xl p-6">
            <h3 className="flex items-center gap-2 text-red-800 font-bold mb-4">
              <XCircle className="w-5 h-5" />
              Você NÃO DEVE fazer
            </h3>
            <ul className="space-y-3">
              {result.naoPode.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-red-900 text-sm">
                  <span className="block w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommendation Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">Estratégia Recomendada</h3>
              <p className="text-lg text-slate-900 font-medium">
                {result.acaoRecomendada}
              </p>
              <div className="flex items-center gap-2 mt-2 text-amber-600 bg-amber-50 inline-flex px-3 py-1 rounded-full text-xs font-medium border border-amber-100">
                <AlertTriangle className="w-3 h-3" />
                Risco: {result.risco}
              </div>
            </div>
            
            <button 
              onClick={handleNext}
              className="shrink-0 bg-slate-900 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
            >
              {result.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="border-t border-slate-200 pt-8">
          <h4 className="font-bold text-slate-900 mb-4">Resumo das suas escolhas</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-500 bg-slate-50 p-4 rounded-xl">
            <div>
              <span className="block text-xs uppercase tracking-wider mb-1">Processo</span>
              <span className="font-medium text-slate-900">{state.processo}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider mb-1">Fase</span>
              <span className="font-medium text-slate-900">{state.fase}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider mb-1">Ato</span>
              <span className="font-medium text-slate-900">{state.ato}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider mb-1">Tema</span>
              <span className="font-medium text-slate-900">{state.tema}</span>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button 
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors font-medium text-sm"
            >
              <Copy className="w-4 h-4" />
              Copiar Resultado
            </button>
            <button 
              onClick={handleRestart}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors font-medium text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar Análise
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
