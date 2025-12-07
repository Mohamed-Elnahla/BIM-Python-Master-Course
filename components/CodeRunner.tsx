import React, { useState } from 'react';
import { runPythonCode } from '../services/pyodideService';
import { checkExerciseWithAI } from '../services/geminiService';
import { CodeEditor } from './CodeEditor';

interface Props {
  initialCode: string;
  isExercise?: boolean;
  exerciseId?: string;
  instruction?: string;
}

export const CodeRunner: React.FC<Props> = ({ initialCode, isExercise, instruction }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [isRunning, setIsRunning] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setAiFeedback(null);
    setOutput('');
    setError(undefined);

    const result = await runPythonCode(code);
    
    setOutput(result.output);
    setError(result.error);
    setIsRunning(false);
  };

  const handleAICheck = async () => {
    if (!instruction) return;
    setIsChecking(true);
    const feedback = await checkExerciseWithAI(instruction, code, output, error);
    setAiFeedback(feedback);
    setIsChecking(false);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2 border-b border-slate-700">
        <div className="flex items-center space-x-2">
           <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
           <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
           <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
           <span className="ml-3 text-xs font-mono text-slate-400">script.py</span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-md ${
              isRunning ? 'bg-slate-600 cursor-not-allowed text-slate-400' : 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20'
            }`}
          >
            {isRunning ? (
                <span className="flex items-center"><svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing</span>
            ) : '▶ Run'}
          </button>
          
          {isExercise && (
             <button
             onClick={handleAICheck}
             disabled={isChecking || !output} // Only check if run at least once or output exists? Maybe allow anytime
             className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-md ${
               isChecking ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20'
             }`}
           >
             {isChecking ? 'AI Analyzing...' : 'Check Solution'}
           </button>
          )}
        </div>
      </div>

      <CodeEditor 
        value={code} 
        onChange={setCode} 
        minHeight="350px" 
        placeholder="Write your Python code here..."
      />

      {(output || error) && (
        <div className={`p-4 font-mono text-sm border-t border-slate-700 transition-colors duration-300 ${error ? 'bg-red-950/30' : 'bg-slate-950'}`}>
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs uppercase text-slate-500 font-bold tracking-widest">Console Output</div>
            {error && <span className="text-xs text-red-400 font-bold bg-red-900/30 px-2 py-0.5 rounded">ERROR</span>}
          </div>
          <pre className={`whitespace-pre-wrap break-words p-2 rounded ${error ? 'text-red-300' : 'text-emerald-400'}`}>
            {error || output}
          </pre>
        </div>
      )}

      {aiFeedback && (
        <div className="p-5 bg-gradient-to-r from-indigo-950/50 to-slate-900 border-t border-indigo-500/30 animate-fadeIn">
          <div className="flex items-start space-x-4">
             <div className="flex-shrink-0 pt-1">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/50">
                    <svg className="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
             </div>
             <div className="flex-1">
               <h4 className="text-xs font-bold text-indigo-300 uppercase mb-1 tracking-wider">Tutor Feedback</h4>
               <p className="text-sm text-indigo-100 leading-relaxed">{aiFeedback}</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};