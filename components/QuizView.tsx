import React, { useState } from 'react';

interface Props {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const QuizView: React.FC<Props> = ({ question, options, correctAnswerIndex, explanation }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
    setIsSubmitted(true);
  };

  const isCorrect = selectedOption === correctAnswerIndex;

  return (
    <div className="my-8 bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden shadow-lg animate-fadeIn">
      <div className="p-6 border-b border-slate-700/50 bg-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded uppercase tracking-wider">
            Knowledge Check
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white leading-relaxed">
          {question}
        </h3>
      </div>
      
      <div className="p-6 space-y-3">
        {options.map((option, idx) => {
          let optionClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center justify-between group ";
          
          if (isSubmitted) {
            if (idx === correctAnswerIndex) {
              optionClass += "bg-green-900/30 border-green-500/50 text-green-200";
            } else if (idx === selectedOption) {
              optionClass += "bg-red-900/30 border-red-500/50 text-red-200";
            } else {
              optionClass += "bg-slate-900/30 border-slate-700 text-slate-500 opacity-50";
            }
          } else {
            optionClass += "bg-slate-900 border-slate-700 hover:bg-slate-700 hover:border-slate-500 text-slate-300";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSubmit(idx)}
              disabled={isSubmitted}
              className={optionClass}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs font-bold
                  ${isSubmitted && idx === correctAnswerIndex ? 'border-green-500 bg-green-500 text-black' : 
                    isSubmitted && idx === selectedOption ? 'border-red-500 bg-red-500 text-white' : 
                    'border-slate-600 text-slate-500 group-hover:border-slate-400 group-hover:text-slate-300'
                  }
                `}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span>{option}</span>
              </div>
              
              {isSubmitted && idx === correctAnswerIndex && (
                 <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              )}
              {isSubmitted && idx === selectedOption && idx !== correctAnswerIndex && (
                 <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              )}
            </button>
          );
        })}
      </div>

      {isSubmitted && (
        <div className={`p-5 mx-6 mb-6 rounded-lg border ${isCorrect ? 'bg-green-900/10 border-green-500/20' : 'bg-red-900/10 border-red-500/20'}`}>
          <div className="flex items-start gap-3">
             <div className="mt-1">
               {isCorrect ? (
                 <span className="text-xl">🎉</span> 
               ) : (
                 <span className="text-xl">💡</span>
               )}
             </div>
             <div>
               <h4 className={`font-bold text-sm mb-1 ${isCorrect ? 'text-green-400' : 'text-slate-200'}`}>
                 {isCorrect ? "Correct!" : "Not quite right."}
               </h4>
               <p className="text-sm text-slate-300 leading-relaxed">
                 {explanation}
               </p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};