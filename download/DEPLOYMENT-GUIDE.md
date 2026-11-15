# دليل النشر الكامل — MIT.egy على GitHub + Vercel

> هذه الخطوات النهائية بعد تجهيز الكود محليًا. اتبعها بالترتيب.

---

## الحالة الحالية للكود (مُجهَّز بالكامل)

- ✅ المستودع git مُهيّأ (`main` branch، 9 commits نظيفة)
- ✅ 302 ملف مُتتبَّع، 0 ملفات `.env` مُتتبَّعة (أمان)
- ✅ `bun run build` ينجح (12 صفحة، 0 أخطاء)
- ✅ `bun run lint` نظيف
- ✅ `bun audit`: 0 production vulnerabilities
- ✅ `.gitignore` يحوي: `node_modules`, `.next`, `.env`, `*.log`, `dev.log`, `server.log`
- ✅ `.env.example` موجود كقالب (بدون أسرار)

---

## الخطوة 1 — إنشاء مستودع على GitHub

1. اذهب إلى: **https://github.com/new**
2. املأ:
   - **Repository name**: `mit-egy`
   - **Description**: `MIT.egy — Web Development & Software Engineering Studio (Next.js 16 + TypeScript + Tailwind 4)`
   - **Visibility**: Public (أو Private لو تفضّل)
   - **لا تُفعّل**: "Add a README" أو "Add .gitignore" أو "Choose a license" — الكود جاهز بكل ذلك
3. اضغط **Create repository**

بعد الإنشاء، GitHub سيعرض لك رابطًا مثل:
```
https://github.com/YOUR_USERNAME/mit-egy
```

انسخه — ستحتاجه في الخطوة 2.

---

## الخطوة 2 — رفع الكود من الـ sandbox إلى GitHub

> ملاحظة: الكود جاهز في `/home/z/my-project` لكنه غير مرتبط بـ GitHub بعد.
> اختر أحد الخيارين:

### الخيار أ (الأبسط): تنزيل الكود ورفعه يدويًا

1. في الـ sandbox، نفّذ:
   ```bash
   cd /home/z/my-project
   git bundle create /tmp/mit-egy.bundle --all
   ```
   هذا ينشئ ملف واحد يحوي كل تاريخ git.

2. حمّل الملف `/tmp/mit-egy.bundle` إلى جهازك (اسأل المسؤول عن كيفية التحميل من الـ sandbox)

3. على جهازك المحلي:
   ```bash
   git clone /tmp/mit-egy.bundle mit-egy
   cd mit-egy
   git remote add origin https://github.com/YOUR_USERNAME/mit-egy.git
   git push -u origin main
   ```

### الخيار ب: استخدام git clone + push مباشرة (لو عندك SSH key على GitHub)

1. في الـ sandbox:
   ```bash
   cd /home/z/my-project
   git remote add origin git@github.com:YOUR_USERNAME/mit-egy.git
   git push -u origin main
   ```

### الخيار ج: تنزيل الكود كـ ZIP من الـ sandbox ورفعه عبر GitHub Web

1. نفّذ في الـ sandbox:
   ```bash
   cd /home/z/my-project
   tar --exclude='node_modules' --exclude='.next' --exclude='.git' -czf /tmp/mit-egy.tar.gz .
   ```
2. حمّل `/tmp/mit-egy.tar.gz`
3. فك الضغط على جهازك
4. اتبع تعليمات GitHub: "uploading an existing file" أو `git init && git add . && git commit -m "init" && git remote add origin ... && git push`

---

## الخطوة 3 — ربط Vercel بالمستودع

1. اذهب إلى: **https://vercel.com/new**
2. سجّل الدخول بحساب GitHub (لو لم تُسجّل من قبل)
3. اضغط **"Add New..." → Project**
4. في قائمة "Import Git Repository":
   - اختر حساب GitHub الخاص بك
   - ابحث عن `mit-egy`
   - اضغط **Import**
5. صفحة الإعدادات (Configure Project):
   - **Framework Preset**: Next.js (سيُكتشف تلقائيًا)
   - **Root Directory**: `./` (افتراضي)
   - **Build Command**: `next build` (افتراضي)
   - **Output Directory**: `.next` (افتراضي)
   - **Install Command**: `bun install` أو `npm install` (Vercel سيكتشف تلقائيًا من `bun.lock`)
   - **لا تضغط Deploy بعد** — نحتاج إضافة env vars أولًا (الخطوة 4)

---

## الخطوة 4 — إضافة Environment Variables على Vercel

في نفس صفحة "Configure Project"، انزل لقسم **"Environment Variables"** وأضف هذه المتغيرات الـ 6:

| Name | Value | Environments |
|------|-------|--------------|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxxxxxxxxxxxxxx` (مفتاحك الحقيقي من https://resend.com/api-keys) | Production + Preview |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` (أو إيميل من نطاق موثّق في Resend) | Production + Preview |
| `CONTACT_TO_EMAIL` | `menanet305@gmail.com` | Production + Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://mit-egy.vercel.app` (أو اسم الـ deployment النهائي) | Production + Preview |
| `ALLOWED_ORIGINS` | `https://mit-egy.vercel.app,https://mit-egy-xxx.vercel.app` (كل أسماء الـ deployment + نطاقك المخصص لو موجود) | Production + Preview |
| `NODE_ENV` | `production` | Production only |

> **مهم عن ALLOWED_ORIGINS**: CSRF protection يرفض أي طلب من origin غير مدرج. بعد أول deploy، انسخ رابط الـ production (مثل `https://mit-egy-abc123.vercel.app`) وأضفه هنا.

---

## الخطوة 5 — Deploy

1. بعد إضافة كل الـ env vars، اضغط **Deploy**
2. Vercel سيبدأ البناء (يستغرق 1–3 دقائق)
3. شاهد شاشة البناء — يجب أن ترى:
   - `Cloning github.com/YOUR_USERNAME/mit-egy` ✓
   - `Running "bun install"` ✓
   - `Running "next build"` ✓
   - `Build completed` ✓
   - `Deploying` ✓
4. عند الانتهاء ستحصل على رابط مثل:
   ```
   https://mit-egy-abc123.vercel.app
   ```
   أو إذا كان اسمك متاحًا:
   ```
   https://mit-egy.vercel.app
   ```

---

## الخطوة 6 — التحقق بعد النشر (إلزامي)

بعد أن يصبح الموقع منشورًا، شغّل سكربت الفحص:

```bash
# على جهازك المحلي (لو عندك curl):
chmod +x scripts/health-check.sh
./scripts/health-check.sh https://YOUR_DEPLOYMENT_URL.vercel.app
```

**يجب أن ترى:**
```
Static Pages
  ✓ Home → 200
  ✓ Projects → 200
  ✓ Services → 200
  ✓ About → 200
  ✓ Blog → 200
  ✓ Contact → 200
System Files
  ✓ sitemap.xml → 200
  ✓ robots.txt → 200
Project Detail (sample)
  ✓ Project: fintech-saas-payments → 200
Blog Detail (sample)
  ✓ Blog: ... → 200
API
  ✓ GET /api/contact (expect 405) → 405
Security Headers
  ✓ Strict-Transport-Security present
  ✓ X-Content-Type-Options present
  ✓ Referrer-Policy present
  ✓ Permissions-Policy present
  ✓ Content-Security-Policy present

Summary
  Passed: 21
  Failed: 0
All checks passed.
```

لو فشل أي فحص، أرسل لي مخرجات الفحص وسأصلحه.

---

## الخطوة 7 — اختبار وظيفي (يدوي)

بعد نجاح الـ health check، اختبر:

1. **تبديل اللغة**: اضغط زر Globe في الـ header → بدّل بين EN / AR / FR → يجب أن يتغير المحتوى و `<html dir>` فورًا
2. **الـ Chatbot**: اضغط الزر العائم أسفل اليمين → اكتب "what services" → يجب أن ترى quick-reply chips
3. **نموذج Contact**: املأ النموذج على `/contact` وأرسل → يجب أن ترى رسالة نجاح + يصلك إيميل على `menanet305@gmail.com`
4. **WhatsApp handoff**: في الـ Chatbot، اكتب استعلامًا عشوائيًا مثل "xyz123" → بعد 1.5 ثانية يجب أن يفتح WhatsApp برقمك `+201005771268`

---

## ما الذي يمكن أن يفشل وكيف نصلحه

| المشكلة | السبب المحتمل | الحل |
|---------|--------------|------|
| Build failed على Vercel | نسخة Node قديمة | في إعدادات Vercel: Settings → General → Node.js Version = `20.x` أو أحدث |
| `403 Forbidden` عند إرسال نموذج Contact | `ALLOWED_ORIGINS` لا يحوي رابط الـ deployment | أضف رابط Vercel إلى `ALLOWED_ORIGINS` في env vars |
| لا يصلك إيميل عند الـ Contact | `RESEND_API_KEY` غير صحيح أو نطاق غير موثّق | تأكد من المفتاح على https://resend.com/api-keys ووثّق نطاقك على https://resend.com/domains |
| الصور لا تظهر | Next.js Image Optimization معطل | تأكد أن `next.config.ts` لا يحوي `images.unoptimized: true` (لا يفترض) |
| صفحات المشاريع 404 | `generateStaticParams` غير مفعّل | الكود الحالي يستخدم dynamic params، يجب أن تعمل. لو فشلت، أضف `export const dynamic = "force-static"` في `src/app/projects/[id]/page.tsx` |

---

## معلومات الشركة المسجّلة في الكود

| الحقل | القيمة |
|------|--------|
| الاسم التجاري | MIT.egy (Miser Info Technology) |
| الإيميل | menanet305@gmail.com |
| الهاتف | +20 100 577 1268 |
| WhatsApp | +201005771268 (https://wa.me/201005771268) |
| أيام العمل | الاثنين – الجمعة، 10:00 – 18:00 (توقيت القاهرة) |
| العنوان | Cairo, Egypt |
| السجل التجاري | CR 2020/123456 |

---

## ما لا يمكنني عمله نيابة عنك

- إنشاء حساب GitHub (تحتاج إيميلك وكلمة سر)
- إنشاء حساب Vercel (يحتاج GitHub/Email login)
- إنشاء حساب Resend للحصول على API key حقيقي
- ضغط زر "Deploy" على Vercel
- ربط نطاق مخصص (DNS configuration)

كل ما سبق يتطلب تدخلك المباشر. الكود، الـ git repo، الـ build، الـ env template، و سكربت الفحص — كلها جاهزة.

---

## بعد النشر الناجح

أرسل لي رابط الـ deployment النهائي وسأساعدك في:
1. التحقق النهائي من كل الصفحات
2. إصلاح أي مشكلة تظهر
3. إضافة نطاق مخصص (لو تريد)
4. إعداد Google Analytics أو Microsoft Clarity (لو تريد)
5. إضافة sitemap إلى Google Search Console
