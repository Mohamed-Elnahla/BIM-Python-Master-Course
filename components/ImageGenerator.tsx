import React, { useState } from 'react';
import { generateExplanatoryFigure } from '../services/geminiService';

interface Props {
  prompt: string;
  title?: string;
}

export const ImageGenerator: React.FC<Props> = ({ prompt, title }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await generateExplanatoryFigure(prompt);
      if (url) {
        setImageUrl(url);
      } else {
        setError("Could not generate image. Please try again.");
      }
    } catch (e) {
      setError("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-6 p-1 border border-slate-700/50 rounded-xl bg-slate-900/50">
      {!imageUrl ? (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-800/30 rounded-lg border-2 border-dashed border-slate-700">
           <div className="text-center mb-4">
             <h4 className="text-slate-300 font-medium mb-1">Visual Explanation</h4>
             <p className="text-slate-500 text-sm max-w-md mx-auto">
               Generate an AI diagram to visualize: <span className="text-indigo-400 italic">"{title || 'Concept'}"</span>
             </p>
           </div>
           
           <button
             onClick={handleGenerate}
             disabled={loading}
             className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg ${
               loading 
               ? 'bg-slate-700 text-slate-400 cursor-wait' 
               : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/25'
             }`}
           >
             {loading ? (
               <span className="flex items-center gap-2">
                 <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 Generating Diagram...
               </span>
             ) : (
               <span className="flex items-center gap-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                 Generate Figure
               </span>
             )}
           </button>
           {error && <p className="mt-3 text-red-400 text-xs">{error}</p>}
        </div>
      ) : (
        <div className="relative group rounded-lg overflow-hidden bg-black">
          <img src={imageUrl} alt="Generated explanation" className="w-full h-auto object-contain max-h-[500px]" />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setImageUrl(null)}
              className="bg-black/70 text-white p-1 rounded-full hover:bg-black"
              title="Close/Regenerate"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-3 bg-slate-900 border-t border-slate-700">
             <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">AI Generated Figure: {title}</p>
          </div>
        </div>
      )}
    </div>
  );
};