# MIT.egy — سجل التغييرات

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
