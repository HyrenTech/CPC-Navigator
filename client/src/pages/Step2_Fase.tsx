import React from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { SelectionCard } from "@/components/SelectionCard";
import { useWizardStore } from "@/store/wizard";

export default function Step2_Fase() {
  const [_, setLocation] = useLocation();
  const { setFase, fase } = useWizardStore();

  const handleSelect = (value: string) => {
    setFase(value);
    setLocation("/ato");
  };

  const options = [
    { id: 'peticao_inicial', label: 'Petição Inicial / Liminar', desc: 'Fase postulatória, análise de admissibilidade.' },
    { id: 'citacao', label: 'Citação e Resposta', desc: 'Formação da relação processual, contestação.' },
    { id: 'saneamento', label: 'Saneamento e Organização', desc: 'Fixação de pontos controvertidos, deferimento de provas.' },
    { id: 'instrucao', label: 'Instrução Probatória', desc: 'Audiências, perícias e produção de provas.' },
    { id: 'apos_decisao', label: 'Decisória', desc: 'Após prolação de decisão interlocutória ou sentença.' },
    { id: 'recursal', label: 'Fase Recursal', desc: 'Processo já está no tribunal ou aguardando remessa.' },
  ];

  return (
    <Layout step={2} title="Em qual fase processual estamos?">
      <p className="text-slate-500 mb-8 text-lg">
        Identifique o momento atual do trâmite.
      </p>

      <div className="space-y-3">
        {options.map((opt) => (
          <SelectionCard
            key={opt.id}
            title={opt.label}
            description={opt.desc}
            selected={fase === opt.id}
            onClick={() => handleSelect(opt.id)}
          />
        ))}
      </div>
    </Layout>
  );
}
