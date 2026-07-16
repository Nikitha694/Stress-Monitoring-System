import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function SubPage({ title, desc, children }: { title: string; desc?: string; children: ReactNode }) {
  return (
    <div className="space-y-6 animate-fade-up">
      <Link to="/hub" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Hub
      </Link>
      <header>
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        {desc && <p className="mt-2 text-muted-foreground">{desc}</p>}
      </header>
      {children}
    </div>
  );
}
