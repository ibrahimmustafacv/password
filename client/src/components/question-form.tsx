import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import { questionSets } from "@/lib/questions";
import { generatePassword, generateRandomPassword } from "@/lib/password-generator";

type StrengthLevel = 'easy' | 'medium' | 'strong' | 'random';

interface QuestionFormProps {
  strength: StrengthLevel;
  onComplete: (answers: string[], password: string) => void;
  onRandomGenerate: (password: string) => void;
  onBack: () => void;
}

export default function QuestionForm({ strength, onComplete, onRandomGenerate, onBack }: QuestionFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const questions = questionSets[strength] || [];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  useEffect(() => {
    // Initialize answers array
    setAnswers(new Array(totalQuestions).fill(''));
  }, [totalQuestions]);

  useEffect(() => {
    // Load current answer when question changes
    setCurrentAnswer(answers[currentQuestionIndex] || '');
  }, [currentQuestionIndex, answers]);

  const handleNext = () => {
    // Save current answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = currentAnswer.trim();
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Generate password and complete
      const password = generatePassword(strength, newAnswers);
      onComplete(newAnswers, password);
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      // Save current answer before going back
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = currentAnswer.trim();
      setAnswers(newAnswers);
      
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRandomGeneration = () => {
    const password = generateRandomPassword();
    onRandomGenerate(password);
  };

  const isNextDisabled = currentAnswer.trim().length === 0;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  if (strength === 'random') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="glassmorphic rounded-2xl p-6 text-center">
          <motion.div 
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <RotateCcw className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-lg font-semibold mb-2">كلمة مرور عشوائية</h3>
          <p className="text-slate-300 mb-6">سيتم إنشاء كلمة مرور قوية وعشوائية</p>
          <div className="space-y-3">
            <Button 
              onClick={handleRandomGeneration}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 transition-all transform hover:scale-105"
            >
              إنشاء كلمة مرور
            </Button>
            <Button 
              variant="outline" 
              onClick={onBack}
              className="w-full"
            >
              العودة
            </Button>
          </div>
        </div>
      </motion.section>
    );
  }

  if (questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="glassmorphic rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">الأسئلة المطلوبة</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-300">
              {currentQuestionIndex + 1} من {totalQuestions}
            </span>
            <div className="w-8 h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <Label className="block text-sm font-medium text-slate-300 mb-2">
                {currentQuestion.label}
              </Label>
              <Input
                type="text"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isNextDisabled) {
                    handleNext();
                  }
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex gap-3 mt-6">
          <Button 
            variant="outline"
            onClick={currentQuestionIndex === 0 ? onBack : handlePrevious}
            className="flex-1 px-4 py-3 rounded-xl border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            {currentQuestionIndex === 0 ? 'العودة' : 'السابق'}
          </Button>
          <Button
            onClick={handleNext}
            disabled={isNextDisabled}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isLastQuestion ? 'إنشاء كلمة المرور' : 'التالي'}
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
