import { useCallback, useMemo, useState } from 'react';
import { Sparkles, FileCode2, Terminal, FileText } from 'lucide-react';
import { SiOpenai, SiClaude, SiVercel } from 'react-icons/si';
import { toast } from 'sonner';
import { generateCliCommands } from '../utils/cli';
import { useOptions } from '../components/context/OptionsContext/useOptions';
import { useInstallation } from './useInstallation';
import { copyText, openInAI, buildCompactPrompt, registryUrl } from '../utils/aiExport';

export function useAIExportActions({
  markdownDoc, // foxbits:markdown-item
  componentName,
  category,
  subcategory,
  fullPrompt,
  configuredUsage,
  componentSource,
  componentCss,
  dependencies
}) {
  const [done, setDone] = useState(null);
  const { languagePreset, stylePreset } = useOptions();
  const { cliTool, packageManager } = useInstallation();

  const installCommand = useMemo(() => {
    const commands = generateCliCommands(languagePreset, stylePreset, category, subcategory, dependencies);
    if (!commands) return '';
    const key = packageManager === 'npm' ? 'npx' : packageManager;
    return cliTool === 'jsrepo' ? commands.jsrepo[key] : commands.shadcn[key];
  }, [languagePreset, stylePreset, category, subcategory, dependencies, cliTool, packageManager]);

  const run = useCallback(async (key, text, message) => {
    if (!text) {
      toast.error('Nothing to copy for this component');
      return;
    }
    if (await copyText(text)) {
      setDone(key);
      toast.success(message);
      setTimeout(() => setDone(null), 2000);
    } else {
      toast.error('Could not copy to clipboard');
    }
  }, []);

  const copyItems = useMemo(() => {
    const sourceWithCss = componentCss
      ? `${componentSource}\n\n/* ---- ${componentName}.css ---- */\n${componentCss}`
      : componentSource;

    return [
      {
        key: 'prompt',
        label: 'Copy prompt',
        icon: Sparkles,
        run: () => run('prompt', fullPrompt, 'Prompt copied — paste into any AI assistant')
      },
      {
        key: 'usage',
        label: 'Copy configured code',
        icon: FileText,
        run: () => run('usage', configuredUsage, 'Configured usage copied')
      },
      {
        key: 'source',
        label: 'Copy component source',
        icon: FileCode2,
        run: () => run('source', sourceWithCss, 'Component source copied')
      },
      {
        key: 'install',
        label: 'Copy install command',
        icon: Terminal,
        run: () => run('install', installCommand, 'Install command copied')
      },
      ...(markdownDoc
        ? [{
            key: 'markdown',
            label: 'Copy as markdown',
            icon: FileText,
            run: () => run('markdown', markdownDoc, 'Markdown copied')
          }]
        : [])
    ];
  }, [componentName, componentCss, componentSource, fullPrompt, configuredUsage, installCommand, markdownDoc, run]);

  const openItems = useMemo(() => {
    const compactPrompt = buildCompactPrompt({
      componentName,
      category,
      subcategory,
      language: languagePreset,
      style: stylePreset,
      installCommand,
      usage: configuredUsage
    });

    const payload = {
      prompt: compactPrompt,
      registryUrl: registryUrl(componentName, languagePreset, stylePreset)
    };

    return []; // foxbits:no-open-ai — external AI handoff removed
  }, [componentName, category, subcategory, languagePreset, stylePreset, installCommand, configuredUsage]);

  return { copyItems, openItems, done };
}
