import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Copy, Download, Eye, EyeOff, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type StrengthLevel = 'easy' | 'medium' | 'strong' | 'random';

interface PasswordResultProps {
  password: string;
  strength: StrengthLevel;
  onRestart: () => void;
}

export default function PasswordResult({ password, strength, onRestart }: PasswordResultProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const calculateStrength = (pwd: string) => {
    let score = 0;
    
    if (pwd.length >= 8) score += 20;
    if (pwd.length >= 12) score += 10;
    if (pwd.length >= 16) score += 10;
    
    if (/[a-z]/.test(pwd)) score += 15;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15;
    
    return Math.min(score, 100);
  };

  const getStrengthInfo = () => {
    const score = calculateStrength(password);
    
    if (score >= 80) return { text: 'قوية جداً', color: 'bg-green-500', filled: 4 };
    if (score >= 60) return { text: 'قوية', color: 'bg-green-400', filled: 3 };
    if (score >= 40) return { text: 'متوسطة', color: 'bg-yellow-500', filled: 2 };
    return { text: 'ضعيفة', color: 'bg-red-500', filled: 1 };
  };

  const strengthInfo = getStrengthInfo();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setIsCopied(true);
      
      toast({
        title: "تم النسخ",
        description: "تم نسخ كلمة المرور إلى الحافظة",
      });

      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }

      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "خطأ",
        description: "فشل في نسخ كلمة المرور",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([password], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `password_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "تم التحميل",
      description: "تم تحميل كلمة المرور كملف نصي",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="glassmorphic rounded-2xl p-6">
        <div className="text-center mb-6">
          <motion.div 
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6 }}
          >
            <Check className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-lg font-semibold mb-2">كلمة المرور جاهزة!</h3>
        </div>
        
        {/* Password Display */}
        <div className="bg-slate-800 rounded-xl p-4 mb-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">كلمة المرور</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i <= strengthInfo.filled ? strengthInfo.color : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400">{strengthInfo.text}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <code className="flex-1 text-lg font-mono bg-transparent text-primary selection:bg-primary/20 break-all">
              {isPasswordVisible ? password : '•'.repeat(password.length)}
            </code>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
              title="إظهار/إخفاء كلمة المرور"
            >
              {isPasswordVisible ? (
                <EyeOff className="w-5 h-5 text-slate-400" />
              ) : (
                <Eye className="w-5 h-5 text-slate-400" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button
            onClick={handleCopy}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
              isCopied 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isCopied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
            {isCopied ? 'تم النسخ' : 'نسخ'}
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            تحميل
          </Button>
        </div>
        
        <Button
          variant="outline"
          onClick={onRestart}
          className="w-full px-4 py-3 rounded-xl border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          إنشاء كلمة مرور جديدة
        </Button>
      </div>
    </motion.section>
  );
}
