'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import StepCard from './step-card';
import type { Step } from '@/lib/command-generator';

interface TerminalDisplayProps {
  steps: Step[];
  cleanupSteps: Step[];
  activeTab: 'setup' | 'cleanup';
  onTabChange: (tab: 'setup' | 'cleanup') => void;
}

export default function TerminalDisplay({ steps, cleanupSteps, activeTab, onTabChange }: TerminalDisplayProps) {
  const { t } = useLanguage();
  const displaySteps = activeTab === 'setup' ? steps : cleanupSteps;

  return (
    <Card className="h-full border-border bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-4">
        <div>
          <CardTitle>{t.common.generatedCommand}</CardTitle>
          <CardDescription>
            {t.common.selectYourEnvironment}
          </CardDescription>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => onTabChange('setup')}
            className={`px-4 py-2 text-sm transition-colors ${activeTab === 'setup'
                ? 'border-b-2 border-primary text-primary font-bold'
                : 'text-muted-foreground font-medium hover:text-foreground hover:bg-secondary/20'
              }`}
          >
            {t.ui.setupTab}
          </button>
          <button
            onClick={() => onTabChange('cleanup')}
            className={`px-4 py-2 text-sm transition-colors ${activeTab === 'cleanup'
                ? 'border-b-2 border-primary text-primary font-bold'
                : 'text-muted-foreground font-medium hover:text-foreground hover:bg-secondary/20'
              }`}
          >
            {t.ui.cleanupTab}
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {displaySteps.map((step, idx) => (
          <StepCard
            key={idx}
            title={step.title}
            description={step.description}
            code={step.code}
            stepNumber={idx + 1}
          />
        ))}
      </CardContent>
    </Card>
  );
}
