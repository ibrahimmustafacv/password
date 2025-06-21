import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type StrengthLevel = 'easy' | 'medium' | 'strong' | 'random';

interface StrengthSelectorProps {
  onSelect: (strength: StrengthLevel) => void;
  selectedStrength: StrengthLevel | null;
}

const strengthOptions = [
  {
    value: 'easy' as const,
    label: 'سهلة',
    description: 'للاستخدام العادي',
    color: 'bg-yellow-500',
    hoverColor: 'hover:border-yellow-500'
  },
  {
    value: 'medium' as const,
    label: 'متوسطة',
    description: 'حماية أفضل',
    color: 'bg-orange-500',
    hoverColor: 'hover:border-orange-500'
  },
  {
    value: 'strong' as const,
    label: 'قوية',
    description: 'أمان عالي',
    color: 'bg-green-500',
    hoverColor: 'hover:border-green-500'
  },
  {
    value: 'random' as const,
    label: 'عشوائية',
    description: 'أقصى حماية',
    color: 'bg-purple-500',
    hoverColor: 'hover:border-purple-500'
  }
];

export default function StrengthSelector({ onSelect, selectedStrength }: StrengthSelectorProps) {
  const handleVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <section>
      <div className="glassmorphic rounded-2xl p-6 space-y-4">
        <label className="block text-sm font-medium text-slate-300 mb-4">مستوى الأمان</label>
        <div className="grid grid-cols-2 gap-3">
          {strengthOptions.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className={`
                  w-full p-4 h-auto rounded-xl border-2 transition-all duration-200 text-right
                  ${selectedStrength === option.value 
                    ? 'border-primary bg-primary/10' 
                    : `border-slate-600 ${option.hoverColor}`
                  }
                `}
                onClick={() => {
                  handleVibration();
                  onSelect(option.value);
                }}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`w-3 h-3 rounded-full ${option.color}`} />
                  <div className="flex-1">
                    <span className="font-medium block">{option.label}</span>
                    <p className="text-xs text-slate-400 mt-1">{option.description}</p>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
