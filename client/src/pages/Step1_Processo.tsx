import React from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { SelectionCard } from "@/components/SelectionCard";
import { useWizardStore } from "@/store/wizard";
import { ScrollText, Gavel, FileCheck } from "lucide-react";

export default function Step1_Processo() {
  const [_, setLocation] = useLocation();
  const { setProcesso, processo } = useWizardStore();

  const handleSelect = (value: string) => {
    setProcesso(value);
    setLocation("/fase");
  };

  return (
    <Layout step={1} title="Qual o tipo de procedimento?">
      <p className="text-slate-500 mb-8 text-lg">
        Selecione a natureza do procedimento em curso.
      </p>

      <div className="space-y-4">
        <SelectionCard
          title="Processo de Conhecimento"
          description="Rito comum ou especial, visando a obtenção de sentença de mérito."
          icon={<ScrollText className="w-6 h-6" />}
          selected={processo === 'conhecimento'}
          onClick={() => handleSelect('conhecimento')}
        />

        <SelectionCard
          title="Cumprimento de Sentença"
          description="Execução de título executivo judicial (fase executiva)."
          icon={<Gavel className="w-6 h-6" />}
          selected={processo === 'cumprimento_sentenca'}
          onClick={() => handleSelect('cumprimento_sentenca')}
        />

        <SelectionCard
          title="Execução de Título Extrajudicial"
          description="Execução direta baseada em cheque, nota promissória, contrato, etc."
          icon={<FileCheck className="w-6 h-6" />}
          selected={processo === 'execucao_titulo'}
          onClick={() => handleSelect('execucao_titulo')}
        />
      </div>
    </Layout>
  );
}
