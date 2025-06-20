# باسوردك في جيبك - Password Generator

مولد كلمات المرور الآمن باللغة العربية مع واجهة مستخدم حديثة ودعم كامل للهواتف المحمولة.

## المميزات

- 🔐 أربعة مستويات أمان (سهل، متوسط، قوي، عشوائي)
- 📱 تصميم متجاوب للهواتف المحمولة
- 🎨 واجهة مستخدم حديثة مع تأثيرات بصرية
- 🌙 تصميم داكن مريح للعينين
- ✨ حركات متدرجة وانتقالات سلسة
- 📋 نسخ وتحميل كلمات المرور
- 🔄 اهتزاز للملاحظات التفاعلية

## التقنيات المستخدمة

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Backend**: Node.js + Express
- **Build Tool**: Vite

## التشغيل المحلي

```bash
# تثبيت المكتبات
npm install

# تشغيل التطبيق
npm run dev
```

## البناء للإنتاج

```bash
npm run build
```

## الهيكل

```
├── client/          # Frontend React app
├── server/          # Backend Express server
├── shared/          # Shared types and schemas
└── components.json  # shadcn/ui configuration
```

## الأمان

- كلمات المرور تُنشأ محلياً في المتصفح
- لا يتم إرسال أو حفظ كلمات المرور على الخادم
- تشفير قوي للكلمات العشوائية

## المساهمة

نرحب بالمساهمات! يرجى فتح issue أو pull request.

## الترخيص

MIT License