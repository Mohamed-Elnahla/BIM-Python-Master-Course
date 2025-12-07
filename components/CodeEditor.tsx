import React, { useState, useEffect } from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  language?: string;
  minHeight?: string;
  placeholder?: string;
}

export const CodeEditor: React.FC<Props> = ({ 
  value, 
  onChange, 
  language = 'python', 
  minHeight = '300px', // Increased default height
  placeholder 
}) => {
  const [highlighted, setHighlighted] = useState('');
  
  // Highlighting logic
  useEffect(() => {
    if (window.Prism) {
       const grammar = window.Prism.languages[language] || window.Prism.languages.python;
       // We add a trailing newline character to the highlight to prevent scroll sync glitch at the end
       const code = value.endsWith('\n') ? value + ' ' : value;
       setHighlighted(window.Prism.highlight(code, grammar, language));
    } else {
       setHighlighted(value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    }
  }, [value, language]);

  // Sync scrolling between textarea and pre
  const syncScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const pre = e.currentTarget.nextSibling as HTMLElement;
    if (pre) {
      pre.scrollTop = e.currentTarget.scrollTop;
      pre.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  return (
    <div className="relative font-mono text-sm group rounded-md overflow-hidden border border-slate-700 bg-[#0d1117]" style={{ height: minHeight }}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        spellCheck={false}
        placeholder={placeholder}
        className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white z-10 focus:outline-none resize-none font-inherit leading-relaxed code-editor"
        style={{ fontFamily: '"Fira Code", monospace' }}
      />
      <pre
        aria-hidden="true"
        className="absolute inset-0 w-full h-full p-4 m-0 bg-[#0d1117] text-slate-300 z-0 overflow-auto pointer-events-none leading-relaxed"
        style={{ fontFamily: '"Fira Code", monospace' }}
      >
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}