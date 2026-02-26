'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/hooks/use-language';
import type { Config, OS, WebServer, Language, Database } from '@/lib/command-generator';

interface AiSuggestPanelProps {
  onSuggest: (newConfig: Partial<Config>) => void;
}

export default function AiSuggestPanel({ onSuggest }: AiSuggestPanelProps) {
  const { t, language } = useLanguage();
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggest = async () => {
    if (!apiKey.trim()) {
      toast.error(t.ai.requireApiKey);
      return;
    }
    if (!prompt.trim()) {
      toast.error(t.ai.requirePrompt);
      return;
    }

    setIsLoading(true);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const langInstruction = language === 'en' ? 'English' : '日本語';
      const systemInstruction = `あなたは優秀なインフラエンジニアです。ユーザーの作りたいアプリの要件を聞き、以下の指定された選択肢の中から最適な環境構成を **JSONフォーマットのみ** で返答してください。マークダウンのコードブロック(\`\`\`json ... \`\`\`)は付けず、純粋なJSON文字列だけを返してください。
選択可能な値：
- os: "WSL (Windows)", "macOS", "Ubuntu", "VirtualBox" のいずれか1つ
- docker: true または false
- webServers: "Nginx", "Apache" の配列（複数可、不要なら空配列）
- languages: "Python", "Node.js", "Go", "C/C++", "Rust" の配列（複数可、不要なら空配列）
- databases: "PostgreSQL", "MySQL", "Redis" の配列（複数可、不要なら空配列）
- ssl: true または false（セキュアな通信が要件に含まれるかどうかで判定）
- frameworks: 選択可能な言語別に、使用が要請されたフレームワークを記載した辞書(Object)形式。該当無しや不要なら "none"。
   Pythonなら(FastAPI, Django, Flask) / Node.jsなら(Express, NestJS, Next.js) / Goなら(Gin, Echo) / Rustなら(Actix, Axum) / C/C++なら(none)
- reasoning: ユーザーの要件に対して、なぜそのOS、Webサーバー、言語、フレームワーク、データベースを選定したのか、インフラ設計の観点からプロのエンジニアとして理由を解説した文字列。必ず「${langInstruction}」で出力してください。

出力JSON例:
{"os": "Ubuntu", "docker": true, "webServers": ["Nginx"], "languages": ["Node.js"], "databases": ["Redis", "PostgreSQL"], "ssl": true, "frameworks": {"nodejs": "Next.js"}, "reasoning": "今回はスピードを重視したNext.jsによるフルスタック開発が適していると判断しました。また...（解説文）"}
`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `${systemInstruction}\n\n要件: ${prompt}` }]
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`API通信エラー: ${response.status}`);
      }

      const data = await response.json();
      let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error('APIから想定するデータが返却されませんでした');
      }

      // markdownのコードブロックがついてしまった場合のためのクリーニング処理
      rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

      const parsed = JSON.parse(rawText);

      // Construct partial Config from AI suggestions
      const newConfig: Partial<Config> = {};

      if (parsed.os === 'WSL (Windows)') newConfig.baseOS = 'wsl';
      else if (parsed.os === 'macOS') newConfig.baseOS = 'macos';
      else if (parsed.os === 'Ubuntu') newConfig.baseOS = 'ubuntu';
      else if (parsed.os === 'VirtualBox') newConfig.baseOS = 'virtualbox';

      if (typeof parsed.docker === 'boolean') {
        newConfig.docker = parsed.docker;
      }

      if (Array.isArray(parsed.webServers) && parsed.webServers.length > 0) {
        if (parsed.webServers.includes('Nginx')) newConfig.webServer = 'nginx';
        else if (parsed.webServers.includes('Apache')) newConfig.webServer = 'apache';
      } else {
        newConfig.webServer = 'none';
      }

      if (Array.isArray(parsed.languages)) {
        const mappedLanguages: Language[] = [];
        if (parsed.languages.includes('Python')) mappedLanguages.push('python');
        if (parsed.languages.includes('Node.js')) mappedLanguages.push('nodejs');
        if (parsed.languages.includes('Go')) mappedLanguages.push('go');
        if (parsed.languages.includes('C/C++')) mappedLanguages.push('cpp');
        if (parsed.languages.includes('Rust')) mappedLanguages.push('rust');
        newConfig.languages = mappedLanguages;
      }

      if (Array.isArray(parsed.databases)) {
        const mappedDatabases: Database[] = [];
        if (parsed.databases.includes('PostgreSQL')) mappedDatabases.push('postgresql');
        if (parsed.databases.includes('MySQL')) mappedDatabases.push('mysql');
        if (parsed.databases.includes('Redis')) mappedDatabases.push('redis');
        newConfig.databases = mappedDatabases;
      }

      if (typeof parsed.ssl === 'boolean') {
        newConfig.ssl = parsed.ssl;
      }

      if (parsed.frameworks && typeof parsed.frameworks === 'object') {
        newConfig.frameworks = {};
        for (const [lang, fw] of Object.entries(parsed.frameworks)) {
          if (typeof lang === 'string' && typeof fw === 'string') {
            newConfig.frameworks[lang] = fw;
          }
        }
      }

      if (typeof parsed.reasoning === 'string') {
        newConfig.reasoning = parsed.reasoning;
      }

      onSuggest(newConfig);
      toast.success(t.ai.successToast);

    } catch (error: any) {
      console.error(error);
      toast.error(t.ai.errorToastTitle, {
        description: error.message || t.ai.errorToastDesc,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-primary/50 bg-primary/5 backdrop-blur-sm shadow-md mb-6">
      <CardHeader className="pb-4 border-b border-border/50">
        <CardTitle className="text-lg flex items-center gap-2 text-primary">
          <Sparkles className="w-5 h-5" />
          {t.ai.title}
        </CardTitle>
        <CardDescription>
          {t.ai.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <Input
            type="password"
            placeholder={t.ai.apiKeyPlaceholder}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="bg-background/50 border-input"
          />
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-primary hover:underline mt-1 ml-1"
          >
            {t.ai.getKeyLink}
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
        <div className="space-y-2">
          <Textarea
            placeholder={t.ai.promptPlaceholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="resize-none h-24 bg-background/50 border-input"
          />
        </div>
        <Button
          onClick={handleSuggest}
          disabled={isLoading}
          className="w-full font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t.ai.buttonLoading}
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              {t.ai.button}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
