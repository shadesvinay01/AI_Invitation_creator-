"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Wand2, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CreateEventWizard() {
  const [mode, setMode] = useState<"ai" | "manual">("ai");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    try {
      const res = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      
      if (!res.ok) throw new Error("Failed to generate");
      
      const data = await res.json();
      
      // Store in localStorage for the preview page to consume
      localStorage.setItem('generatedEvent', JSON.stringify(data));
      
      // Navigate to preview
      router.push('/preview');
    } catch (err) {
      console.error(err);
      alert("Failed to connect to AI Studio. Is the backend running?");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06060c] text-[#f0ede4] flex flex-col relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4a843]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c0392b]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-[#222238]/60 bg-[#06060c]/80 backdrop-blur-xl">
        <Link href="/dashboard" className="flex items-center gap-2 text-[#a8a498] hover:text-[#f0ede4] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <div className="sdot act">1</div><div className="w-8 h-0.5 bg-[#222238]"></div>
          <div className="sdot">2</div><div className="w-8 h-0.5 bg-[#222238]"></div>
          <div className="sdot">3</div>
        </div>
      </header>

      {/* Main Wizard Area */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Let's create something beautiful</h1>
            <p className="text-[#a8a498] text-lg">Describe your event in plain language, or enter details manually.</p>
          </div>

          <div className="bg-[#12121f]/60 backdrop-blur-xl border border-[#222238] rounded-3xl p-2 mb-8 flex p-1">
            <button 
              className={`flex-1 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'ai' ? 'bg-[#222238] text-[#f0ede4]' : 'text-[#a8a498] hover:text-[#f0ede4]'}`}
              onClick={() => setMode('ai')}
            >
              <Wand2 className="w-4 h-4" /> AI Generation (Recommended)
            </button>
            <button 
              className={`flex-1 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'manual' ? 'bg-[#222238] text-[#f0ede4]' : 'text-[#a8a498] hover:text-[#f0ede4]'}`}
              onClick={() => setMode('manual')}
            >
              <AlignLeft className="w-4 h-4" /> Manual Entry
            </button>
          </div>

          <AnimatePresence mode="wait">
            {mode === 'ai' ? (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#12121f]/80 backdrop-blur-xl border border-[#222238] rounded-3xl p-8"
              >
                <Label htmlFor="prompt" className="text-xs uppercase tracking-wider text-[#d4a843] font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Event Prompt
                </Label>
                <Textarea 
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Create a royal wedding invitation for Sarah and James on 20 December 2026 in Delhi. Theme should be luxury gold. We need a printable PDF and a WhatsApp invite."
                  className="min-h-[200px] text-lg bg-[#0d0d18] border-[#222238] focus:border-[#d4a843] text-[#f0ede4] rounded-2xl p-6 resize-none"
                />
                <div className="mt-6 flex justify-end">
                  <Button 
                    size="lg" 
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                    className="bg-gradient-to-r from-[#d4a843] to-[#b0882a] text-[#06060c] font-bold rounded-2xl px-8 h-14 hover:opacity-90 transition-all shadow-xl shadow-[#d4a843]/20 w-full sm:w-auto"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 animate-spin" /> Generating Magic...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Generate Invitation <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="manual"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#12121f]/80 backdrop-blur-xl border border-[#222238] rounded-3xl p-8 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[#a8a498]">Event Type</Label>
                    <Input className="bg-[#0d0d18] border-[#222238] focus:border-[#d4a843]" placeholder="e.g. Wedding, Birthday" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#a8a498]">Event Name / Hosts</Label>
                    <Input className="bg-[#0d0d18] border-[#222238] focus:border-[#d4a843]" placeholder="e.g. Sarah & James" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#a8a498]">Date</Label>
                    <Input type="date" className="bg-[#0d0d18] border-[#222238] focus:border-[#d4a843]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#a8a498]">Venue</Label>
                    <Input className="bg-[#0d0d18] border-[#222238] focus:border-[#d4a843]" placeholder="e.g. The Grand Hotel" />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <Button 
                    size="lg" 
                    onClick={handleGenerate}
                    className="bg-[#d4a843] text-[#06060c] font-bold rounded-2xl px-8 h-12 w-full sm:w-auto"
                  >
                    Continue to Design <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Global styles for dots */}
      <style dangerouslySetInnerHTML={{__html: `
        .sdot { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; border: 2px solid #222238; color: #6a6a80; background: #12121f; }
        .sdot.act { border-color: #d4a843; color: #d4a843; background: rgba(212,168,67,.12); box-shadow: 0 0 20px rgba(212,168,67,.15); }
      `}} />
    </div>
  );
}
