import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface JournalSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  background?: "warm" | "calm" | "focus" | "default";
}

export function JournalSection({ 
  title, 
  children, 
  className, 
  background = "default" 
}: JournalSectionProps) {
  const backgroundStyles = {
    warm: "bg-journal-warm",
    calm: "bg-journal-calm", 
    focus: "bg-journal-focus",
    default: "bg-card"
  };

  return (
    <div 
      className={cn(
        "rounded-lg p-6 border border-border shadow-sm transition-all duration-300 hover:shadow-md",
        backgroundStyles[background],
        className
      )}
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      {children}
    </div>
  );
}