import React from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { useWizardStore } from "@/store/wizard";
import { CheckSquare, Home, RotateCcw, ArrowLeft } from "lucide-react";

export default function Checklist() {
  const [_, setLocation] = useLocation();
  const { ato, reset } = useWizardStore();

  const handleRestart = () => {
    reset();
    setLocation("/");
  };

  const handleBack = () => {
    setLocation("/resultado");
  };

  const getChecklistItems = () => {
    // Conditional logic based on Ato
    switch (ato) {
      case 'decisao_interlocutoria':
        return [
          "Verificar a data exata da publicação (DJE)",
          "Contar prazo de 15 dias úteis (excluir dia do começo, incluir vencimento)",
          "Conferir se houve feriado local ou suspensão de prazo",
          "Preparar a peça do Agravo de Instrumento",
          "Recolher custas de preparo recursal (se não for beneficiário JG)",
          "Juntar cópias obrigatórias (procurações, decisão agravada, certidão de intimação)",
          "Protocolar diretamente no Tribunal (2ª Instância)"
        ];
      case 'sentenca':
        return [
          "Ler dispositivo da sentença com atenção",
          "Verificar se há omissão, contradição ou obscuridade (Embargos em 5 dias)",
          "Calcular prazo de 15 dias para Apelação",
          "Verificar valor do preparo (custas de apelação)",
          "Atacar especificamente os fundamentos da sentença (dialeticidade)",
          "Protocolar no juízo de 1º grau"
        ];
      case 'despacho':
        return [
          "Ler atentamente o comando judicial",
          "Identificar prazo fixado pelo juiz (se houver)",
          "Se não houver prazo, considerar 5 dias (art. 218 §3º CPC)",
          "Cumprir a determinação ou justificar impossibilidade",
          "Não interpor recurso (salvo se tiver conteúdo decisório disfarçado)"
        ];
      default:
        return [
          "Ler a íntegra da publicação",
          "Conferir nome das partes e advogados na intimação",
          "Contar o prazo processual com margem de segurança",
          "Consultar jurisprudência sobre o tema",
          "Protocolar manifestação tempestiva"
        ];
    }
  };

  const items = getChecklistItems();

  return (
    <Layout step={6} title="Checklist Final" showBack={false}>
      <p className="text-slate-500 mb-8 text-lg">
        Siga estes passos antes de finalizar sua peça.
      </p>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-6 bg-slate-50 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-slate-500" />
            Tarefas Pendentes
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {items.map((item, idx) => (
            <label 
              key={idx} 
              className="flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <input 
                type="checkbox" 
                className="mt-1 w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer" 
              />
              <span className="text-slate-700 group-hover:text-slate-900 leading-relaxed">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
        >
          <Home className="w-5 h-5" />
          Encerrar Análise
        </button>

        <button 
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Analisar Outro
        </button>

        <button 
          onClick={handleBack}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar ao Resultado
        </button>
      </div>
    </Layout>
  );
}
