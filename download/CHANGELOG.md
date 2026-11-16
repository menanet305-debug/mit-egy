# MIT.egy — سجل التغييرات

## الإصدار v2026-11-16 (16 نوفمبر 2026) — إصلاحات النشر

إصلاح المشاكل التي منعت نشر الموقع بنجاح. الـ commit الأخير `027576a`.

### ملخّص الإصلاحات

1. **`next.config.ts`: تسجيل `images.qualities: [75, 80]`**
   - كان Next.js 16 يرفض `quality={80}` على صورة الـ Hero لأنها ليست في القائمة المُهيّأة
   - هذا التحذير كان قد يتحوّل لخطأ يمنع النشر على بيئات الإنتاج الصارمة (مثل Vercel)

2. **`.env`: استبدال المتغيرات غير المستخدمة بالمتغيرات المطلوبة فعليًا**
   - كان `.env` يحتوي على `DATABASE_URL` (لا توجد قاعدة بيانات في الكود)
   - أُضيفت المتغيرات الحقيقية: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `ALLOWED_ORIGINS`
   - `.env` يبقى مُتجاهَلًا من git (كما يجب)؛ يجب تعيين هذه القيم على منصّة النشر

3. **`Hero.tsx`: إضافة `loading="eager"` لصورة LCP**
   - أزال تحذير Next.js عن Largest Contentful Paint على صورة الخلفية

### التحقق

- `bun run lint`: نظيف
- `npx tsc --noEmit`: نظيف
- `bun run build`: نجح بـ 14 صفحة، **بدون أي تحذيرات أو أخطاء**
- `bun .next/standalone/server.js` على المنفذ 3002: HTTP 200 على `/` و`/about`

### ملاحظة لمن ينشر الموقع

عند النشر على Vercel أو أي منصّة، عيّن متغيرات البيئة التالية في إعدادات المشروع:
```
RESEND_API_KEY=<مفتاح حقيقي من resend.com>
RESEND_FROM_EMAIL=onboarding@resend.dev  (أو بريد نطاقك المُوثّق)
CONTACT_TO_EMAIL=menanet305@gmail.com
NEXT_PUBLIC_SITE_URL=https://mit-egy.vercel.app
ALLOWED_ORIGINS=https://mit-egy.vercel.app
```

---

## الإصدار v2026-11-15 (15 نوفمبر 2026)

لقطة نهائية لجلسة تعديل المحتوى. شجرة العمل نظيفة، والـ commit الأخير `7dadd84`.

### ملخّص التعديلات

1. **حذف أيقونات السوشيال ميديا من الفوتر** (كل الصفحات)
   - حُذفت أيقونات LinkedIn / GitHub / Twitter / Instagram من `Footer.tsx`
   - نُظّفت الاستيرادات ومصفوفة `social`
   - تم التحقق على 7 صفحات (الرئيسية / about / blog / projects / services / contact / privacy)

2. **تقليل البلوج إلى كروت أساسية**
   - حُذفت صفحات تفاصيل المقالات بالكامل (`/blog/[slug]`)
   - حُذف النص الكامل للمقالات، المؤلفون، الأدوار من `blog.ts`
   - الكروت الآن: صورة + شارات تصنيف + عنوان + مقتطف + تاريخ + مدة قراءة (دون روابط)
   - نُظّفت: `blogPostingSchema`، فرع `blog` في JsonLd، روابط sitemap، مفاتيح القاموس غير المستخدمة

3. **استرجاع قسم Meet the Team** في صفحة About
   - النسخة القائمة على بطاقات الأدوار (8 بطاقات) — **بدون أسماء شخصية**
   - أُعيد ملف `src/data/team.ts` ومفاتيح `about.team` في القاموس

4. **إصلاح صور بطاقتي DevOps & Cloud و Quality Assurance**
   - الصورتان الأصليتان كانتا ترجعان HTTP 404 (حُذفتا من Unsplash)
   - استُبدلتا بصور حقيقية تعمل (HTTP 200) وموضوعية

5. **تحديث نص Behind the Scenes**
   - من: "A look at our workspace and shipped products."
   - إلى: "A look at your workspace and projects"

6. **تنظيف صفحات المشاريع** (تعديلات سابقة في الجلسة)
   - حذف قسمي Tech Stack و Key Features من كل المشاريع
   - حذف بطاقة Additional Information (Project ID / Published On / Engagement Type)
   - حذف أسماء مديري المشروعات الشخصية من الموقع كله

### التحقق

- `bun run lint`: نظيف
- `npx tsc --noEmit`: نظيف (بعد بناء أنواع جديدة)
- `bun run build`: نجح (14 صفحة ثابتة)
- فحص المتصفح: كل الصفحات تستجيب 200، والصور مُحمّلة

### ملفات النشر في `download/`

| الملف | الحجم | الوصف |
|---|---|---|
| `mit-egy.bundle` | ~3.9 MB | git bundle يحتوي التاريخ الكامل + العلامة `v2026-11-15` |
| `mit-egy-source.tar.gz` | ~213 KB | الكود المصدري بدون node_modules / .next / .git |
| `CHANGELOG.md` | — | هذا الملف |

### كيفية الاستعادة من الـ bundle

```bash
git clone mit-egy.bundle mit-egy-restored
cd mit-egy-restored
git checkout v2026-11-15
bun install
bun run dev
```
