import React from 'react';
import { useLocation } from "wouter";
import { ArrowLeft, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  step: number; // 0 to 6
  title?: string;
  showBack?: boolean;
}

export function Layout({ children, step, title, showBack = true }: LayoutProps) {
  const [_, setLocation] = useLocation();

  const handleBack = () => {
    window.history.back();
  };

  const totalSteps = 7;
  // Step 0 doesn't show progress bar usually, but requirement says "step shows top progress indicator". 
  // Let's hide it for Home (0) but show for 1-6.
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container max-w-2xl mx-auto h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-lg tracking-tight">
            <div className="bg-slate-900 text-white p-1.5 rounded-md">
              <BookOpen className="w-4 h-4" />
            </div>
            CPC Navigator
          </div>
          
          {step > 0 && step <= 6 && (
            <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Etapa {step} de 7
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        {step > 0 && step < 7 && (
          <div className="w-full h-1 bg-slate-100">
            <div 
              className="h-full bg-slate-900 transition-all duration-500 ease-out"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        )}
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-8 pb-24">
        {step > 0 && showBack && (
          <button 
            onClick={handleBack}
            className="group flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar
          </button>
        )}

        {title && (
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2 tracking-tight">
            {title}
          </h1>
        )}

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
