import type { ConversionResult, ExtractedContent, ExtractOptions } from '@/types/index';
import { convertToMarkdown } from '@/utils/converter';
import { useCallback, useEffect, useState } from 'react';

type ConversionState = 'loading' | 'success' | 'error' | 'unsupported';

const CONTENT_SCRIPT_FILE = 'content-scripts/content.js';

function canExtractFromTab(tab: Browser.tabs.Tab): boolean {
  return !!tab.url && /^(https?|file):\/\//.test(tab.url);
}

async function getActiveTab(): Promise<Browser.tabs.Tab | undefined> {
  const [lastFocusedTab] = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (lastFocusedTab) {
    return lastFocusedTab;
  }

  const [currentWindowTab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  return currentWindowTab;
}

function isMissingContentScriptError(error: unknown): boolean {
  return error instanceof Error && error.message.includes('Receiving end does not exist');
}

async function requestExtractContent(tabId: number, options: ExtractOptions) {
  try {
    return await browser.tabs.sendMessage(tabId, {
      action: 'extractContent',
      options,
    });
  } catch (error) {
    if (!isMissingContentScriptError(error)) {
      throw error;
    }

    await browser.scripting.executeScript({
      target: { tabId },
      files: [CONTENT_SCRIPT_FILE],
    });

    return await browser.tabs.sendMessage(tabId, {
      action: 'extractContent',
      options,
    });
  }
}

export function useMarkdownConverter(extractOptions?: ExtractOptions) {
  const [state, setState] = useState<ConversionState>('loading');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [extractedContent, setExtractedContent] = useState<ExtractedContent | null>(null);
  const [error, setError] = useState<string>('');

  const handleAutoConvert = useCallback(
    async (options?: ExtractOptions) => {
      setState('loading');
      setError('');

      try {
        // Get current active tab
        const tab = await getActiveTab();

        if (!tab?.id) {
          throw new Error('No active tab found');
        }

        if (!canExtractFromTab(tab)) {
          setError('Open a regular web page, then click Clipify again.');
          setState('unsupported');
          return;
        }

        // Use provided options or default to extractOptions or default behavior
        const extractionOptions = options || extractOptions || { useReadability: true };

        // Send message to content script to extract content, injecting it first if needed.
        const response = await requestExtractContent(tab.id, extractionOptions);

        if (!response.success) {
          throw new Error(response.error || 'Failed to extract content');
        }

        const extractedData = response.data as ExtractedContent;
        setExtractedContent(extractedData);

        // Convert HTML to Markdown
        const conversionResult = convertToMarkdown(extractedData);

        setResult(conversionResult);
        setState('success');
      } catch (err) {
        console.error('Conversion error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setState('error');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [extractOptions?.useReadability]
  );

  // Auto-convert on hook initialization or when extractOptions change
  useEffect(() => {
    handleAutoConvert();
  }, [handleAutoConvert]);

  return {
    state,
    result,
    extractedContent,
    error,
    handleAutoConvert,
  };
}
