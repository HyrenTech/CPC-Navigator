import React from 'react';
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface SelectionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  onClick: () => void;
  className?: string;
}

export function SelectionCard({ 
  title, 
  description, 
  icon, 
  selected, 
  onClick,
  className
}: SelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-6 rounded-xl border transition-all duration-200 group relative overflow-hidden",
        "hover:shadow-md hover:border-slate-400 active:scale-[0.99]",
        selected 
          ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary" 
          : "border-slate-200 bg-white shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {icon && (
            <div className={cn(
              "p-2.5 rounded-lg transition-colors",
              selected ? "bg-primary text-primary-foreground" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
            )}>
              {icon}
            </div>
          )}
          <div>
            <h3 className={cn(
              "font-medium text-lg leading-tight mb-1",
              selected ? "text-primary" : "text-slate-900"
            )}>
              {title}
            </h3>
            {description && (
              <p className="text-sm text-slate-500 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
        
        <ChevronRight className={cn(
          "h-5 w-5 transition-transform duration-300",
          selected ? "text-primary translate-x-1" : "text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1"
        )} />
      </div>
    </button>
  );
}
