import React, { useState, useEffect } from 'react';
import { COURSE_CONTENT } from './constants';
import { CourseModule, CourseSection, BlockType } from './types';
import { MarkdownView } from './components/MarkdownView';
import { CodeRunner } from './components/CodeRunner';
import { ImageGenerator } from './components/ImageGenerator';
import { QuizView } from './components/QuizView';
import { ChatAssistant } from './components/ChatAssistant';
import { initChatSession } from './services/geminiService';

const App: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>(COURSE_CONTENT[0].id);
  const [activeSectionId, setActiveSectionId] = useState<string>(COURSE_CONTENT[0].sections[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activeModule = COURSE_CONTENT.find(m => m.id === activeModuleId);
  const activeSection = activeModule?.sections.find(s => s.id === activeSectionId);

  // Initialize Chat context on mount
  useEffect(() => {
    initChatSession(COURSE_CONTENT);
  }, []);

  // Auto-scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSectionId]);

  // Flatten logic for Next/Prev buttons
  const allSections = COURSE_CONTENT.flatMap(module => 
    module.sections.map(section => ({
      moduleId: module.id,
      sectionId: section.id,
      title: section.title
    }))
  );

  const currentIndex = allSections.findIndex(s => s.sectionId === activeSectionId);
  const prevSection = currentIndex > 0 ? allSections[currentIndex - 1] : null;
  const nextSection = currentIndex < allSections.length - 1 ? allSections[currentIndex + 1] : null;

  const navigateTo = (moduleId: string, sectionId: string) => {
    setActiveModuleId(moduleId);
    setActiveSectionId(sectionId);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col md:flex-row font-sans relative">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-bold text-lg text-blue-400">BIM Python Master</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-300 p-2 rounded hover:bg-slate-800">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed md:sticky top-0 h-screen w-72 bg-slate-950 border-r border-slate-800 overflow-y-auto transition-transform duration-300 z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-slate-900">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-mono font-bold text-xl">Py</div>
            <h1 className="font-bold text-xl text-slate-100 tracking-tight">BIM <span className="text-blue-500">Master</span></h1>
          </div>
          <p className="text-xs text-slate-500 mt-3 font-medium uppercase tracking-wider">Interactive Course</p>
        </div>
        
        <nav className="p-4 space-y-8">
          {COURSE_CONTENT.map(module => (
            <div key={module.id}>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">{module.title}</h3>
              <ul className="space-y-1">
                {module.sections.map(section => (
                  <li key={section.id}>
                    <button
                      onClick={() => {
                        navigateTo(module.id, section.id);
                        if (window.innerWidth < 768) setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center ${
                        activeSectionId === section.id 
                          ? 'bg-blue-900/20 text-blue-400 font-semibold border-l-4 border-blue-500 translate-x-1' 
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                      }`}
                    >
                      {activeSectionId === section.id && <span className="mr-2">👉</span>}
                      {section.title.split('. ')[1] || section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 w-full p-4 md:p-10 lg:p-16 pb-32 bg-slate-900 flex flex-col justify-between">
        {activeSection ? (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn w-full">
            <header className="mb-12 pb-6 border-b border-slate-800">
              <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3 bg-blue-500/10 inline-block px-3 py-1 rounded-full">{activeModule?.title}</div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">{activeSection.title}</h1>
            </header>

            <div className="space-y-16">
              {activeSection.blocks.map((block, idx) => (
                <div key={`${activeSection.id}-${idx}`} className="group">
                  {/* Render Visual Prompt Button if available */}
                  {block.visualPrompt && (
                     <ImageGenerator prompt={block.visualPrompt} title={block.title || activeSection.title} />
                  )}

                  {block.type === BlockType.MARKDOWN && (
                    <MarkdownView content={block.content} />
                  )}

                  {block.type === BlockType.CODE_EXAMPLE && (
                    <div className="mt-6 relative">
                       <div className="absolute -top-3 left-4 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-slate-700 z-10">Example Code</div>
                       <CodeRunner initialCode={block.content} />
                    </div>
                  )}

                  {block.type === BlockType.QUIZ && (
                    <QuizView 
                      question={block.content}
                      options={block.options || []}
                      correctAnswerIndex={block.correctAnswerIndex || 0}
                      explanation={block.explanation || ""}
                    />
                  )}

                  {block.type === BlockType.EXERCISE && (
                    <div className="mt-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-1 border border-slate-700 shadow-2xl">
                      <div className="bg-slate-900/50 rounded-xl p-6 md:p-8">
                        <div className="flex items-center space-x-3 mb-6">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/50">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          </span>
                          <h3 className="text-xl font-bold text-white">{block.title}</h3>
                        </div>
                        
                        <div className="mb-8 prose prose-invert max-w-none">
                           <MarkdownView content={block.content} />
                           {block.hint && (
                             <div className="mt-4 flex items-start space-x-2 text-sm text-slate-400 bg-slate-950/50 p-3 rounded border border-slate-800">
                               <span>💡</span>
                               <span className="italic">Hint: {block.hint}</span>
                             </div>
                           )}
                        </div>

                        <CodeRunner 
                          initialCode={block.prefill || ''} 
                          isExercise={true}
                          exerciseId={block.id}
                          instruction={block.content}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-24 pt-8 border-t border-slate-800 flex justify-between items-center gap-4">
               {prevSection ? (
                 <button 
                    onClick={() => navigateTo(prevSection.moduleId, prevSection.sectionId)}
                    className="flex items-center px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700 group"
                 >
                    <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    <div className="text-left">
                       <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Previous</div>
                       <div className="font-semibold text-sm">{prevSection.title}</div>
                    </div>
                 </button>
               ) : <div />}

               {nextSection ? (
                 <button 
                    onClick={() => navigateTo(nextSection.moduleId, nextSection.sectionId)}
                    className="flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-900/20 group"
                 >
                    <div className="text-right">
                       <div className="text-[10px] uppercase text-blue-200 font-bold tracking-wider">Next</div>
                       <div className="font-semibold text-sm">{nextSection.title}</div>
                    </div>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                 </button>
               ) : <div />}
            </div>

          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            Select a module to begin
          </div>
        )}

        <footer className="mt-20 py-6 border-t border-slate-800 text-center text-slate-500 text-xs uppercase tracking-widest font-semibold">
           AUC Automation I - Eng. Mohamed Elnahla - 2025/2026
        </footer>
      </main>

      {/* Chat Assistant */}
      <ChatAssistant onNavigate={navigateTo} />

    </div>
  );
};

export default App;