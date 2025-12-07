import React, { useEffect } from 'react';

interface Props {
  content: string;
}

export const MarkdownView: React.FC<Props> = ({ content }) => {
  const lines = content.split('\n');

  useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, [content]);
  
  return (
    <div className="text-slate-300 space-y-4 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        // Headers
        if (trimmed.startsWith('#### ')) {
          return <h4 key={idx} className="text-lg font-bold text-slate-200 mt-6 mb-2 border-l-4 border-slate-600 pl-3">{trimmed.replace('#### ', '')}</h4>;
        }
        if (trimmed.startsWith('### ')) {
          return <h3 key={idx} className="text-xl font-semibold text-blue-400 mt-8 mb-3">{trimmed.replace('### ', '')}</h3>;
        }
        if (trimmed.startsWith('## ')) {
          return <h2 key={idx} className="text-2xl font-bold text-white mt-10 mb-5 border-b border-slate-700 pb-2">{trimmed.replace('## ', '')}</h2>;
        }
        
        // Lists
        if (trimmed.startsWith('* ')) {
           const text = trimmed.replace('* ', '');
           // Simple bold parser
           const parts = text.split(/(\*\*.*?\*\*)/g);
           return (
             <li key={idx} className="ml-6 list-disc marker:text-blue-500 mb-1">
               {parts.map((part, i) => {
                   if (part.startsWith('**') && part.endsWith('**')) {
                       return <strong key={i} className="text-white font-medium">{part.slice(2, -2)}</strong>;
                   }
                   return part;
               })}
             </li>
           );
        }

        // Tables
        if (trimmed.startsWith('|')) {
           if (trimmed.includes('---')) return null;
           const cols = trimmed.split('|').filter(c => c.trim() !== '');
           return (
             <div key={idx} className="overflow-x-auto">
               <div className="grid grid-flow-col auto-cols-max gap-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-sm my-4">
                  {cols.map((c, i) => (
                      <div key={i} className={line.includes('Type') || line.includes('Mode') ? "font-bold text-blue-300 min-w-[100px]" : "text-slate-300 min-w-[100px]"}>
                          {c.replace(/`/g, '').replace(/\*\*/g, '')}
                      </div>
                  ))}
               </div>
             </div>
           );
        }

        if (trimmed === '') return <br key={idx} />;

        // Paragraphs with Bold and Inline Code support
        const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
        
        return (
          <p key={idx} className="text-base text-slate-300">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={i} className="bg-slate-800 text-yellow-300 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-700">{part.slice(1, -1)}</code>;
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
};