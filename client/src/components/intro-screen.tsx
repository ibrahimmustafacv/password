import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function IntroScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center px-6">
        <motion.div 
          className="w-32 h-32 mx-auto mb-8 rounded-full glassmorphic flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Lock className="w-16 h-16 text-primary pulse-slow" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          باسوردك في جيبك
        </motion.h1>
        
        <motion.p 
          className="text-slate-300 text-lg mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          مولد كلمات المرور الآمن
        </motion.p>
        
        <motion.div 
          className="w-64 h-2 bg-slate-700 rounded-full mx-auto overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: 256 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
