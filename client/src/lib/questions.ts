export interface Question {
  label: string;
  id: string;
  placeholder: string;
}

export const questionSets = {
  easy: [
    { 
      label: 'ما هو تاريخ ميلادك؟', 
      id: 'birth', 
      placeholder: 'مثال: 15/05/1990' 
    },
    { 
      label: 'ما هو رقم تليفونك؟', 
      id: 'phone', 
      placeholder: 'مثال: 0123456789' 
    },
    { 
      label: 'ما هو تاريخ ذكرى سعيدة؟', 
      id: 'memory', 
      placeholder: 'مثال: 10/12/2020' 
    }
  ],
  medium: [
    { 
      label: 'اختر اسم (مثلاً اسمك أو اسم بنتك):', 
      id: 'name', 
      placeholder: 'مثال: أحمد' 
    },
    { 
      label: 'رقم أو تاريخ أو رقم مميز عندك:', 
      id: 'mediumNumber', 
      placeholder: 'مثال: 2023' 
    }
  ],
  strong: [
    { 
      label: 'اكتب اسم بالإنجليزية:', 
      id: 'engName', 
      placeholder: 'مثال: Ahmed' 
    },
    { 
      label: 'رقم مميز جدًا:', 
      id: 'specialNum', 
      placeholder: 'مثال: 1234' 
    },
    { 
      label: 'أول حرفين من اسمك بالإنجليزية:', 
      id: 'initials', 
      placeholder: 'مثال: AH' 
    },
    { 
      label: 'اكتب حرف مميز:', 
      id: 'char1', 
      placeholder: 'مثال: A' 
    },
    { 
      label: 'اكتب رقمين مميزين:', 
      id: 'digits', 
      placeholder: 'مثال: 99' 
    },
    { 
      label: 'حرف مميز آخر:', 
      id: 'char2', 
      placeholder: 'مثال: Z' 
    }
  ]
} as const;
