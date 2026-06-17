'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { brandVoiceBrain } from '../../lib/mock/integrations';
import { PageTransition } from '../../components/PageTransition';
import { Shimmer } from '../../components/Shimmer';
import { Brain, Sparkles, Check, AlertTriangle, Play, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function BrandVoicePage() {
  const { loading } = useDashboard();
  const [mounted, setMounted] = useState(false);
  
  // Interactive scanner state
  const [textInput, setTextInput] = useState(
    'Aura Hormone Balance is a miracle cure for cortisol weight gain. Experience instant weight loss and flat belly results with our skinny tea blend in just 2 days!'
  );
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [scanScore, setScanScore] = useState<number>(0);
  const [scanWarnings, setScanWarnings] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleScanText = () => {
    if (!textInput.trim()) {
      toast.error('Input Empty', { description: 'Please type or paste some text to scan.' });
      return;
    }

    setScanState('scanning');
    
    // Simulate scanner latency
    setTimeout(() => {
      const textLower = textInput.toLowerCase();
      const warnings: string[] = [];
      let score = 100;

      // Scan forbidden words
      if (textLower.includes('miracle') || textLower.includes('cure')) {
        warnings.push('Forbidden Word: "miracle cure". Swap to "bio-aligned support" or cycle regulation descriptors.');
        score -= 25;
      }
      if (textLower.includes('skinny') || textLower.includes('tea')) {
        warnings.push('Forbidden Word: "skinny tea". Swap to holistic digestion or debloating rituals.');
        score -= 20;
      }
      if (textLower.includes('instant') || textLower.includes('weight loss')) {
        warnings.push('Compliance Alert: "instant weight loss" claim is non-compliant with FDA guidelines. Promote gradual daily rituals.');
        score -= 25;
      }
      if (textLower.includes('guilt-free')) {
        warnings.push('Restricted Phrase: "guilt-free" triggers negative psychological food associations. Swap to clean ingredient profiles.');
        score -= 10;
      }

      // Safeguard score clamp
      setScanScore(Math.max(10, score));
      setScanWarnings(warnings);
      setScanState('done');
      
      if (warnings.length > 0) {
        toast.warning('Scan Complete: Out of Compliance', {
          description: `Found ${warnings.length} voice/safety issues. Review suggestions below.`,
        });
      } else {
        toast.success('Scan Complete: In Compliance', {
          description: 'Great job! Content fits brand parameters perfectly.',
        });
      }
    }, 1000);
  };

  return (
    <PageTransition>
      <div className="space-y-8 flex-1 flex flex-col">
        {/* Header section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Brand Voice Intelligence</h1>
          <p className="text-xs text-muted font-medium">Configure copy compliance, scan advertising drafts, and synchronize custom brand brains.</p>
        </div>

        {/* Brand Brain parameters layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Tone guidelines */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-6">
            <div className="pb-2 border-b border-border/30 flex items-center space-x-2.5">
              <Brain className="w-5 h-5 text-primary glow-primary" />
              <h3 className="text-lg font-medium text-foreground tracking-tight">Active Brand Brain</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              
              {/* Tone descriptors */}
              <div className="space-y-3">
                <span className="block text-[10px] uppercase font-bold text-muted tracking-wide">Brand Tone Descriptors</span>
                <div className="flex flex-wrap gap-2">
                  {brandVoiceBrain.toneDescriptors.map((desc) => (
                    <span key={desc} className="px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary-glow font-semibold rounded-lg">
                      {desc}
                    </span>
                  ))}
                </div>
                <p className="text-muted leading-relaxed pt-1">{brandVoiceBrain.audienceDemographics}</p>
              </div>

              {/* Keyword blocks */}
              <div className="space-y-4">
                {/* Words we use */}
                <div className="space-y-2">
                  <span className="block text-[10px] uppercase font-bold text-emerald-accent tracking-wide">Words We Use</span>
                  <div className="flex flex-wrap gap-2">
                    {brandVoiceBrain.wordsWeUse.map((word) => (
                      <span key={word} className="px-2 py-0.5 rounded border border-emerald-accent/25 bg-emerald-accent/5 text-emerald-accent font-medium flex items-center">
                        <Check className="w-3 h-3 mr-1" /> {word}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Words we never use */}
                <div className="space-y-2">
                  <span className="block text-[10px] uppercase font-bold text-rose-accent tracking-wide">Words We Never Use</span>
                  <div className="flex flex-wrap gap-2">
                    {brandVoiceBrain.wordsWeNeverUse.map((word) => (
                      <span key={word} className="px-2 py-0.5 rounded border border-rose-accent/25 bg-rose-accent/5 text-rose-accent/60 line-through font-medium flex items-center">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive analyzer scan results */}
          <div className="glass-card rounded-2xl p-6 space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="pb-2 border-b border-border/30">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Analysis Benchmarks</h3>
              </div>

              {scanState === 'idle' && (
                <div className="py-12 text-center text-xs text-muted flex flex-col items-center justify-center space-y-1.5">
                  <HelpCircle className="w-8 h-8 text-muted/30" />
                  <span>Click "Scan Draft" to run structural FDA audits.</span>
                </div>
              )}

              {scanState === 'scanning' && (
                <div className="py-12 text-center text-xs text-muted flex flex-col items-center justify-center space-y-3">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Scanning vocabulary blocks...</span>
                </div>
              )}

              {scanState === 'done' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-card/25 p-3 rounded-xl border border-border/10">
                    <span className="text-xs font-semibold text-foreground">Compliance Score</span>
                    <span className={`text-xl font-bold font-mono text-tabular ${
                      scanScore >= 90
                        ? 'text-emerald-accent'
                        : scanScore >= 70
                        ? 'text-amber-accent'
                        : 'text-rose-accent'
                    }`}>
                      {scanScore} / 100
                    </span>
                  </div>

                  {/* Warning stream list */}
                  <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                    {scanWarnings.length === 0 ? (
                      <div className="text-center py-4 text-[11px] text-emerald-accent font-semibold flex items-center justify-center">
                        <Check className="w-4 h-4 mr-1" /> Copy fully compliant with FDA guidelines.
                      </div>
                    ) : (
                      scanWarnings.map((warn, widx) => (
                        <div key={widx} className="p-2 border border-rose-accent/20 bg-rose-accent/5 rounded-lg text-[10px] text-muted flex items-start space-x-2 leading-relaxed">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-accent flex-shrink-0 mt-0.5" />
                          <span>{warn}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleScanText}
              disabled={scanState === 'scanning'}
              className="h-8 w-full mt-4 rounded-lg bg-primary hover:bg-primary-glow text-white text-xs font-bold transition-all glow-primary hover:scale-[1.01] cursor-pointer disabled:opacity-50"
            >
              Scan Draft
            </button>
          </div>

        </div>

        {/* Checker textarea block */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="pb-2 border-b border-border/30 space-y-1">
            <h3 className="text-lg font-medium text-foreground tracking-tight flex items-center">
              Aura Draft Analyzer <Sparkles className="w-4 h-4 ml-1.5 text-primary-glow" />
            </h3>
            <p className="text-xs text-muted">Paste advertising scripts, SMS drafts, or landing hero sentences to scan parameters</p>
          </div>

          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full h-32 p-4 rounded-xl border border-border/10 bg-card/25 text-xs text-foreground focus:outline-none focus:border-primary/50 placeholder:text-muted leading-relaxed font-medium"
            placeholder="Type or paste draft copy here..."
          />

          <div className="flex justify-between items-center text-[10px] text-muted">
            <span>Character count: {textInput.length}</span>
            <button
              onClick={() => setTextInput('')}
              className="hover:text-rose-accent hover:underline cursor-pointer"
            >
              Clear input
            </button>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
