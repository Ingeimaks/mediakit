"use client";

import * as React from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function DownloadPdfButton({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const [filename, setFilename] = React.useState("MediaKit_Ingeimaks");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    
    // Simula un breve caricamento per feedback utente
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Salva il titolo originale
    const originalTitle = document.title;
    
    // Imposta il titolo temporaneo per il nome del file
    document.title = filename;

    // Chiudiamo il dialog PRIMA di avviare la stampa
    // Questo risolve il problema del dialog visibile nell'anteprima
    // e previene il blocco percepito dell'interfaccia
    setOpen(false);

    // Usiamo un timeout per dare tempo a React di smontare il dialog
    // e al browser di aggiornare il DOM prima di catturare la schermata
    setTimeout(() => {
      window.print();
      
      // Ripristina il titolo e lo stato dopo la stampa
      // Nota: in molti browser window.print() blocca l'esecuzione, 
      // quindi questo codice verrà eseguito dopo la chiusura della finestra di stampa
      document.title = originalTitle;
      setIsLoading(false);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className={cn(
            "gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all",
            className
          )}
        >
          <Download className="h-4 w-4" />
          <span>PDF</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] no-print">
        <DialogHeader>
          <DialogTitle>Scarica Media Kit</DialogTitle>
          <DialogDescription>
            Scegli il nome del file e scarica il Media Kit in formato PDF.
            La qualità originale verrà mantenuta.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="filename" className="text-right">
              Nome File
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="col-span-3"
              />
              <span className="text-sm text-muted-foreground">.pdf</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleDownload} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Preparazione...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Scarica PDF
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
