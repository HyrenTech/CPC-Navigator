import React from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { SelectionCard } from "@/components/SelectionCard";
import { useWizardStore } from "@/store/wizard";

export default function Step4_Tema() {
  const [_, setLocation] = useLocation();
  const { setTema, tema } = useWizardStore();

  const handleSelect = (value: string) => {
    setTema(value);
    setLocation("/resultado");
  };

  const options = [
    { id: 'prova', label: 'Provas', desc: 'Indeferimento, inversão do ônus, produção antecipada.' },
    { id: 'tutela', label: 'Tutela Provisória', desc: 'Urgência ou evidência (concessão, revogação ou negativa).' },
    { id: 'merito', label: 'Mérito da Causa', desc: 'Procedência ou improcedência dos pedidos principais.' },
    { id: 'competencia', label: 'Competência', desc: 'Declinação de foro, arguição de incompetência.' },
    { id: 'gratuidade', label: 'Gratuidade de Justiça', desc: 'Indeferimento ou revogação do benefício.' },
    { id: 'prescricao', label: 'Prescrição / Decadência', desc: 'Análise de perda do direito pelo tempo.' },
  ];

  return (
    <Layout step={4} title="Sobre qual tema versa o ato?">
      <p className="text-slate-500 mb-8 text-lg">
        Selecione o conteúdo principal da decisão.
      </p>

      <div className="space-y-3">
        {options.map((opt) => (
          <SelectionCard
            key={opt.id}
            title={opt.label}
            description={opt.desc}
            selected={tema === opt.id}
            onClick={() => handleSelect(opt.id)}
          />
        ))}
      </div>
    </Layout>
  );
}
