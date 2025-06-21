import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroScreen from "@/components/intro-screen";
import StrengthSelector from "@/components/strength-selector";
import QuestionForm from "@/components/question-form";
import PasswordResult from "@/components/password-result";
import { Lock, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

type AppState = 'intro' | 'selection' | 'questions' | 'random' | 'result';
type StrengthLevel = 'easy' | 'medium' | 'strong' | 'random';

export default function PasswordGenerator() {
  const [appState, setAppState] = useState<AppState>('intro');
  const [selectedStrength, setSelectedStrength] = useState<StrengthLevel | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');

  useEffect(() => {
    // Initialize app intro
    const timer = setTimeout(() => {
      setAppState('selection');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleStrengthSelect = (strength: StrengthLevel) => {
    setSelectedStrength(strength);
    if (strength === 'random') {
      setAppState('random');
    } else {
      setAppState('questions');
    }
  };

  const handleQuestionsComplete = (userAnswers: string[], password: string) => {
    setAnswers(userAnswers);
    setGeneratedPassword(password);
    setAppState('result');
  };

  const handleRandomGenerate = (password: string) => {
    setGeneratedPassword(password);
    setAppState('result');
  };

  const handleRestart = () => {
    setSelectedStrength(null);
    setAnswers([]);
    setGeneratedPassword('');
    setAppState('selection');
  };

  if (appState === 'intro') {
    return <IntroScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 overflow-x-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover opacity-20"
          poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSIjMEYxNzJBIi8+Cjwvc3ZnPgo="
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35204b5f8bb3&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/80"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 glassmorphic border-b border-white/10"
      >
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-violet-500 flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold">باسوردك في جيبك</h1>
            </div>
            <Button variant="ghost" size="icon" className="p-2 rounded-lg hover:bg-white/5">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-md mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {appState === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Welcome Section */}
              <section className="text-center">
                <h2 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">
                  اختر قوة كلمة المرور
                </h2>
                <p className="text-slate-300 mb-6">انشئ كلمة مرور آمنة ومخصصة لاحتياجاتك</p>
              </section>

              <StrengthSelector 
                onSelect={handleStrengthSelect}
                selectedStrength={selectedStrength}
              />
            </motion.div>
          )}

          {(appState === 'questions' || appState === 'random') && (
            <motion.div
              key="questions-random"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <QuestionForm
                strength={selectedStrength!}
                onComplete={handleQuestionsComplete}
                onRandomGenerate={handleRandomGenerate}
                onBack={() => setAppState('selection')}
              />
            </motion.div>
          )}

          {appState === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <PasswordResult
                password={generatedPassword}
                strength={selectedStrength!}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Link */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <a 
            href="https://ibrahimmustafacv.github.io/my-social-media-page/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glassmorphic hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
            </svg>
            تابعنا هنا
          </a>
        </motion.section>
      </main>
    </div>
  );
}
