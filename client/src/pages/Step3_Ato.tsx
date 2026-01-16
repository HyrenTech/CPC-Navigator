import React from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { SelectionCard } from "@/components/SelectionCard";
import { useWizardStore } from "@/store/wizard";

export default function Step3_Ato() {
  const [_, setLocation] = useLocation();
  const { setAto, ato } = useWizardStore();

  const handleSelect = (value: string) => {
    setAto(value);
    setLocation("/tema");
  };

  const options = [
    { id: 'despacho', label: 'Despacho', desc: 'Ato de mero impulsionamento, sem conteúdo decisório.' },
    { id: 'decisao_interlocutoria', label: 'Decisão Interlocutória', desc: 'Decide questão incidente sem encerrar o processo.' },
    { id: 'sentenca', label: 'Sentença', desc: 'Põe fim à fase cognitiva ou executa, com ou sem mérito.' },
    { id: 'acordao', label: 'Acórdão', desc: 'Decisão colegiada de tribunal.' },
    { id: 'ato_ordinatorio', label: 'Ato Ordinatório', desc: 'Praticado por serventuário (vista, juntada, etc).' },
  ];

  return (
    <Layout step={3} title="Qual ato foi publicado?">
      <p className="text-slate-500 mb-8 text-lg">
        Classifique o pronunciamento judicial que gerou a dúvida.
      </p>

      <div className="space-y-3">
        {options.map((opt) => (
          <SelectionCard
            key={opt.id}
            title={opt.label}
            description={opt.desc}
            selected={ato === opt.id}
            onClick={() => handleSelect(opt.id)}
          />
        ))}
      </div>
    </Layout>
  );
}
