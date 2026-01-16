import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Step1_Processo from "@/pages/Step1_Processo";
import Step2_Fase from "@/pages/Step2_Fase";
import Step3_Ato from "@/pages/Step3_Ato";
import Step4_Tema from "@/pages/Step4_Tema";
import Resultado from "@/pages/Resultado";
import Checklist from "@/pages/Checklist";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/processo" component={Step1_Processo} />
      <Route path="/fase" component={Step2_Fase} />
      <Route path="/ato" component={Step3_Ato} />
      <Route path="/tema" component={Step4_Tema} />
      <Route path="/resultado" component={Resultado} />
      <Route path="/checklist" component={Checklist} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
