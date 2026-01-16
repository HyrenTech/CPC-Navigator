import React from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { useWizardStore } from "@/store/wizard";
import { ArrowRight, Scale, ShieldCheck, FileText } from "lucide-react";

export default function Home() {
  const [_, setLocation] = useLocation();
  const reset = useWizardStore((state) => state.reset);

  const startAnalysis = () => {
    reset();
    setLocation("/processo");
  };

  return (
    <Layout step={0} showBack={false}>
      <div className="flex flex-col items-center text-center pt-8 md:pt-16">
        <div className="bg-slate-900 text-white p-4 rounded-2xl mb-8 shadow-xl shadow-slate-200">
          <Scale className="w-12 h-12" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 tracking-tight leading-tight">
          Navegador do <br className="hidden md:block"/> Processo Civil
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-lg mb-12 leading-relaxed">
          Identifique o recurso cabível, prazos e estratégias processuais com segurança em apenas 7 passos.
        </p>

        <button 
          onClick={startAnalysis}
          className="group relative inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-200 hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-slate-200 hover:shadow-xl hover:shadow-slate-300"
        >
          Iniciar Análise
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-slate-900 mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">Segurança Jurídica</h3>
            <p className="text-sm text-slate-500">Baseado estritamente no CPC/2015 e jurisprudência atualizada.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <FileText className="w-6 h-6 text-slate-900 mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">Checklists Práticos</h3>
            <p className="text-sm text-slate-500">Passo a passo do que fazer após identificar o ato.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <Scale className="w-6 h-6 text-slate-900 mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">Análise de Risco</h3>
            <p className="text-sm text-slate-500">Avaliação clara sobre preclusão e cabimento recursal.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
