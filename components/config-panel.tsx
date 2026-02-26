'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { type Config, type OS, type WebServer, type Language, type Database, FRAMEWORKS } from '@/lib/command-generator';
import { useLanguage } from '@/hooks/use-language';

interface ConfigPanelProps {
  config: Config;
  onConfigChange: (newConfig: Partial<Config>) => void;
}

export default function ConfigPanel({ config, onConfigChange }: ConfigPanelProps) {
  const { t } = useLanguage();
  const languages: Language[] = ['python', 'nodejs', 'go', 'cpp', 'rust'];
  const databases: Database[] = ['postgresql', 'mysql', 'redis'];

  const toggleLanguage = (lang: Language) => {
    const newLanguages = config.languages.includes(lang)
      ? config.languages.filter(l => l !== lang)
      : [...config.languages, lang];
    onConfigChange({ languages: newLanguages });
  };

  useEffect(() => {
    if (Object.keys(config.frameworks || {}).length > 0) {
      let frameworksChanged = false;
      const newFrameworks = { ...config.frameworks };
      for (const [lang, fw] of Object.entries(newFrameworks)) {
        if (!config.languages.includes(lang as Language)) {
          delete newFrameworks[lang];
          frameworksChanged = true;
        } else if (fw !== 'none' && !FRAMEWORKS[lang as Language]?.includes(fw)) {
          newFrameworks[lang] = 'none';
          frameworksChanged = true;
        }
      }
      if (frameworksChanged) {
        onConfigChange({ frameworks: newFrameworks });
      }
    }
  }, [config.languages, config.frameworks, onConfigChange]);

  const toggleDatabase = (db: Database) => {
    const newDatabases = config.databases.includes(db)
      ? config.databases.filter(d => d !== db)
      : [...config.databases, db];
    onConfigChange({ databases: newDatabases });
  };

  const getOSLabel = (os: OS): string => {
    const labels: Record<OS, string> = {
      ubuntu: t.common.ubuntuNative,
      wsl: t.common.wslWindows,
      virtualbox: t.common.virtualbox,
      macos: t.common.macos,
    };
    return labels[os];
  };

  const getWebServerLabel = (ws: WebServer): string => {
    const labels: Record<WebServer, string> = {
      nginx: t.common.nginx,
      apache: t.common.apache,
      none: t.common.none,
    };
    return labels[ws];
  };

  const getLanguageLabel = (lang: Language): string => {
    const labels: Record<Language, string> = {
      python: t.common.python,
      nodejs: t.common.nodejs,
      go: t.common.go,
      cpp: t.common.cpp,
      rust: t.common.rust,
    };
    return labels[lang];
  };

  const getDatabaseLabel = (db: Database): string => {
    const labels: Record<Database, string> = {
      postgresql: t.ui.postgresql,
      mysql: t.ui.mysql,
      redis: t.ui.redis,
    };
    return labels[db];
  };

  return (
    <Card className="h-full border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>{t.common.configuration}</CardTitle>
        <CardDescription>
          {t.common.selectYourEnvironment}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Base OS Selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold">{t.common.baseOS}</label>
          <Select value={config.baseOS} onValueChange={(value) =>
            onConfigChange({ baseOS: value as OS })
          }>
            <SelectTrigger className="border-border bg-secondary/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ubuntu">{t.common.ubuntuNative}</SelectItem>
              <SelectItem value="wsl">{t.common.wslWindows}</SelectItem>
              <SelectItem value="virtualbox">{t.common.virtualbox}</SelectItem>
              <SelectItem value="macos">{t.common.macos}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Docker Options */}
        <div className="space-y-4 rounded-lg border border-border bg-secondary/30 p-4">
          <h3 className="font-semibold">{t.common.containerTechnology}</h3>

          <div className="flex items-center justify-between">
            <label className="text-sm">{t.common.docker}</label>
            <Switch
              checked={config.docker}
              onCheckedChange={(checked) =>
                onConfigChange({ docker: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm">{t.common.dockerCompose}</label>
            <Switch
              checked={config.dockerCompose}
              onCheckedChange={(checked) =>
                onConfigChange({ dockerCompose: checked })
              }
            />
          </div>
        </div>

        {/* Web Server Selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold">{t.common.webServer}</label>
          <Select value={config.webServer} onValueChange={(value) =>
            onConfigChange({ webServer: value as WebServer })
          }>
            <SelectTrigger className="border-border bg-secondary/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">{t.common.none}</SelectItem>
              <SelectItem value="nginx">{t.common.nginx}</SelectItem>
              <SelectItem value="apache">{t.common.apache}</SelectItem>
            </SelectContent>
          </Select>

          {/* SSL/TLS Option (only when WebServer is selected) */}
          {config.webServer !== 'none' && (
            <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4 mt-2">
              <label className="text-sm font-semibold">{t.common.sslTls}</label>
              <Switch
                checked={config.ssl}
                onCheckedChange={(checked) =>
                  onConfigChange({ ssl: checked })
                }
              />
            </div>
          )}
        </div>

        {/* Programming Languages */}
        <div className="space-y-3">
          <label className="text-sm font-semibold">{t.common.programmingLanguages}</label>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Button
                key={lang}
                variant={config.languages.includes(lang) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleLanguage(lang)}
                className={config.languages.includes(lang) ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border-border bg-background text-muted-foreground hover:bg-secondary/50'}
              >
                {getLanguageLabel(lang)}
              </Button>
            ))}
          </div>

          {/* Framework Selection (appears only if some languages are selected) */}
          {config.languages.length > 0 && config.languages.map(lang => (
            FRAMEWORKS[lang]?.length > 1 && (
              <div key={lang} className="mt-4 p-4 rounded-lg border border-border bg-secondary/30 space-y-3">
                <label className="text-sm font-semibold">{t.common.framework} ({getLanguageLabel(lang)})</label>
                <Select value={config.frameworks?.[lang] || 'none'} onValueChange={(value) =>
                  onConfigChange({ frameworks: { ...config.frameworks, [lang]: value } })
                }>
                  <SelectTrigger className="border-border bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FRAMEWORKS[lang].map(fw => (
                      <SelectItem key={fw} value={fw}>{fw === 'none' ? t.common.none : fw}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )
          ))}
        </div>

        {/* Database Selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold">{t.ui.database}</label>
          <div className="flex flex-wrap gap-2">
            {databases.map((db) => (
              <Button
                key={db}
                variant={config.databases.includes(db) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleDatabase(db)}
                className={config.databases.includes(db) ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border-border bg-background text-muted-foreground hover:bg-secondary/50'}
              >
                {getDatabaseLabel(db)}
              </Button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2 rounded-lg border border-border bg-secondary/30 p-4">
          <h3 className="text-sm font-semibold">{t.common.configurationSummary}</h3>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>{t.labels.os}{getOSLabel(config.baseOS)}</p>
            {config.docker && <p>{t.labels.dockerEnabled}</p>}
            {config.dockerCompose && <p>{t.labels.dockerComposeEnabled}</p>}
            <p>{t.labels.webServerLabel}{getWebServerLabel(config.webServer)}</p>
            {config.ssl && <p>{t.labels.sslEnabled}</p>}
            {config.languages.length > 0 && (
              <p>{t.labels.languages}{config.languages.map(l => getLanguageLabel(l)).join(', ')}</p>
            )}
            {Object.keys(config.frameworks || {}).length > 0 && (
              <p>{t.labels.frameworkLabel}
                {Object.entries(config.frameworks)
                  .filter(([_, fw]) => fw !== 'none')
                  .map(([lang, fw]) => `${fw} (${getLanguageLabel(lang as Language)})`)
                  .join(', ') || t.common.none}
              </p>
            )}
            {config.databases.length > 0 && (
              <p>{t.labels.databases}{config.databases.map(d => getDatabaseLabel(d)).join(', ')}</p>
            )}
          </div>
        </div>

        {/* AI Reasoning (appears only if provided by AI) */}
        {config.reasoning && (
          <Alert className="bg-primary/10 border-primary/20 text-foreground">
            <Lightbulb className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-semibold text-primary">
              {t.common.aiReasoningTitle}
            </AlertTitle>
            <AlertDescription className="text-sm mt-2 whitespace-pre-wrap leading-relaxed opacity-90">
              {config.reasoning}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
