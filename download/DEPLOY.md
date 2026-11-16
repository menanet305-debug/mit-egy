# دليل نشر موقع MIT.egy

هذا الدليل يشرح كيفية نشر الموقع على الإنترنت بعدة طرق مختلفة. اختر الطريقة المناسبة لاحتياجك.

---

## 📦 محتويات حزمة النشر

في مجلد `download/` ستجد:

| الملف | الوصف |
|---|---|
| `mit-egy-source.tar.gz` | الكود المصدري الكامل جاهز للنشر (290 KB) |
| `mit-egy.bundle` | git bundle يحتوي التاريخ الكامل (للمطورين) |
| `.env.example` | قالب متغيرات البيئة (داخل الحزمة) |
| `DEPLOY.md` | هذا الملف |

---

## 🚀 الطريقة 1: النشر على Vercel (الأسهل والموصى به)

Vercel هي المنصة التي بُني عليها الموقع، وهي الأسهل والأسرع.

### الخطوات

1. **أنشئ حسابًا** على [vercel.com](https://vercel.com) (سجّل دخولًا بحساب GitHub)

2. **ارفع الكود إلى GitHub**:
   ```bash
   # فك ضغط الحزمة
   tar -xzf mit-egy-source.tar.gz -C mit-egy-site
   cd mit-egy-site

   # أنشئ مستودع على GitHub ثم:
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/mit-egy.git
   git push -u origin main
   ```

3. **اربط Vercel بـ GitHub**:
   - ادخل [vercel.com/new](https://vercel.com/new)
   - اختر مستودع `mit-egy`
   - اترك إعدادات Build فارغة (Vercel يكتشف Next.js تلقائيًا)
   - اضغط **Deploy**

4. **أضف متغيرات البيئة** (مهم جدًا):
   - في لوحة Vercel: Settings → Environment Variables
   - أضف هذه المتغيرات:

   | Variable | Value |
   |---|---|
   | `RESEND_API_KEY` | مفتاح Resend الحقيقي (من resend.com) |
   | `RESEND_FROM_EMAIL` | `onboarding@resend.dev` (للتجربة) أو بريدك الموثّق |
   | `CONTACT_TO_EMAIL` | `menanet305@gmail.com` |
   | `NEXT_PUBLIC_SITE_URL` | `https://mit-egy.vercel.app` (أو نطاقك) |
   | `ALLOWED_ORIGINS` | `https://mit-egy.vercel.app,http://localhost:3000` |

5. **أعد النشر** بعد إضافة المتغيرات (Redeploy)

✅ الموقع سيعمل خلال 1-2 دقيقة على `https://mit-egy.vercel.app`

---

## 🌐 الطريقة 2: النشر على Netlify

1. ارفع الكود إلى GitHub (نفس خطوات Vercel)
2. ادخل [app.netlify.com](https://app.netlify.com) → Add new site → Import from GitHub
3. إعدادات البناء:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. أضف نفس متغيرات البيئة (Settings → Environment variables)
5. اضغط **Deploy**

---

## 🐳 الطريقة 3: الاستضافة الذاتية (VPS / Docker)

مناسب لخوادم Linux (DigitalOcean, Hetzner, AWS EC2, إلخ).

### المتطلبات
- خادم Linux به Node.js 18+ أو Bun
- Nginx (لـ reverse proxy و SSL)

### الخطوات

```bash
# 1. انسخ الحزمة للخادم
scp mit-egy-source.tar.gz user@your-server:/var/www/

# 2. فك الضغط
ssh user@your-server
cd /var/www
tar -xzf mit-egy-source.tar.gz -C mit-egy
cd mit-egy

# 3. أنشئ ملف .env
cp .env.example .env
nano .env  # عبّئ القيم الحقيقية

# 4. ثبّت الاعتمادات (استخدم إحدى الطريقتين)
npm install      # أو
bun install

# 5. ابنِ الموقع في وضع standalone (للاستضافة الذاتية)
STANDALONE=true npm run build:standalone

# 6. شغّل الخادم
npm run start:standalone
# أو مع PM2 لإدارة العملية:
pm2 start "NODE_ENV=production node .next/standalone/server.js" --name mit-egy

# 7. اضبط Nginx كـ reverse proxy
sudo nano /etc/nginx/sites-available/mit-egy
```

محتوى إعداد Nginx:
```nginx
server {
    listen 80;
    server_name mit-egy.com www.mit-egy.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 8. فعّل SSL مجاني عبر Certbot
sudo certbot --nginx -d mit-egy.com -d www.mit-egy.com
```

✅ الموقع سيعمل على `https://mit-egy.com`

---

## 📧 إعداد خدمة البريد (Resend)

نموذج التواصل يحتاج Resend ليعمل. للحصول على مفتاح API:

1. أنشئ حسابًا على [resend.com](https://resend.com) (مجاني حتى 3000 بريد/شهر)
2. اذهب إلى API Keys → Create API Key
3. انسخ المفتاح (يبدأ بـ `re_...`)
4. ضعه في متغير البيئة `RESEND_API_KEY`

### للتجربة فقط (بدون توثيق نطاق)
- `RESEND_FROM_EMAIL=onboarding@resend.dev` (بريد Resend الافتراضي)

### للإنتاج (موثّق)
- أضف نطاقك في Resend → Domains → Add Domain
- أضف سجلات DNS المطلوبة
- `RESEND_FROM_EMAIL=noreply@mit-egy.com`

---

## ⚙️ متغيرات البيئة المطلوبة

| المتغير | الوصف | مطلوب؟ |
|---|---|---|
| `RESEND_API_KEY` | مفتاح Resend API لإرسال البريد | ✅ نعم |
| `RESEND_FROM_EMAIL` | البريد المُرسِل | ✅ نعم |
| `CONTACT_TO_EMAIL` | البريد الذي يستقبل رسائل التواصل | ✅ نعم |
| `NEXT_PUBLIC_SITE_URL` | رابط الموقع (لـ SEO و canonical) | ✅ نعم |
| `ALLOWED_ORIGINS` | النطاقات المسموح لها بـ POST (CSRF) | ✅ نعم |
| `STANDALONE` | `true` للاستضافة الذاتية فقط | ⚠️ اختياري |

### ⚠️ ممنوع
**لا تُضف `NODE_ENV`** — Next.js ومنصة النشر تُعيّنه تلقائيًا. إضافته يدويًا قد يكسر البناء.

---

## 🔍 بعد النشر: قائمة التحقق

- [ ] الموقع يفتح على `https://your-domain.com`
- [ ] صفحة التواصل تعمل (`/contact`)
- [ ] نموذج التواصل يُرسل البريد (اختبره)
- [ ] الصور تظهر (specifically صور الفريق في `/about`)
- [ ] الصفحات كلها تستجيب: `/`, `/about`, `/blog`, `/projects`, `/services`, `/contact`
- [ ] `/sitemap.xml` يعمل
- [ ] `/robots.txt` يعمل
- [ ] شهادة SSL فعّالة (القفل الأخضر في المتصفح)
- [ ] لم يعد هناك `http://localhost:3000` في أي رابط ظاهر

---

## 🆘 استكشاف الأخطاء

### الموقع لا يفتح بعد النشر
- تحقق من Build Logs في Vercel/Netlify
- تأكد أن متغيرات البيئة كلها مُضافة
- راجع `NEXT_PUBLIC_SITE_URL` يطابق نطاقك الفعلي

### نموذج التواصل لا يُرسل بريدًا
- تحقق من `RESEND_API_KEY` صحيح
- تحقق من `ALLOWED_ORIGINS` يحتوي نطاقك
- راجع Function Logs في Vercel للتفاصيل

### الصور لا تظهر
- تأكد أن إعداد `images.remotePatterns` في `next.config.ts` يحتوي على `images.unsplash.com`
- هذا مُعد بالفعل، لكن تحقق إن لم تُعدّل التكوين

---

## 📞 المساعدة

إذا واجهت مشكلة، انسخ رسالة الخطأ من Build Logs أو Function Logs وراجعها — تحتوي عادةً على السبب الدقيق.

**آخر تحديث:** الإصدار `v2026-11-16-deploy-fix`
