# ZenBlog Client

Angular ile geliştirilmiş, .NET Core (Clean Architecture + MediatR + EF Core) backend'e bağlanan tam kapsamlı bir blog platformu ön yüzü. Hem yönetim paneli hem de ziyaretçilerin göreceği public blog arayüzünü içerir.

Backend repo: [ZenBlogServer](https://github.com/UmutCan37/ZenBlogServer)

## Ekran Görüntüleri


## Özellikler

### Admin Paneli (`/admin`)
- **Kategoriler** — CRUD, anlık liste güncelleme
- **Bloglar** — CRUD, kategori seçimi, kapak/görsel URL yönetimi
- **Yorumlar** — Listeleme, düzenleme, silme (moderasyon)
- **İletişim Bilgileri** — Adres/telefon/email/harita linki CRUD
- **Mesajlar** — Okundu/okunmadı filtreleme, detay görüntüleme, silme
- **Sosyal Ağlar** — CRUD, Font Awesome ikon önizlemesi
- JWT tabanlı kimlik doğrulama, route guard ile korunan admin sayfaları

### Public Site
- **Ana Sayfa** — Öne çıkan yazı (hero) + kategori bazlı blog grid'i
- **Blog Detay** — Makale içeriği, yorumlar, giriş yapan kullanıcılar için yorum formu
- **İletişim** — İletişim bilgileri + mesaj gönderme formu

## Teknoloji Yığını

- **Framework:** Angular (standalone olmayan, module-based mimari)
- **Stil:** Custom CSS (Inter font, tutarlı tasarım sistemi — CSS custom properties ile tema yönetimi)
- **UI Kütüphaneleri:** Bootstrap (modal, dropdown), Font Awesome (ikonlar), Alertify.js (bildirimler)
- **Kimlik Doğrulama:** JWT, HTTP Interceptor ile otomatik token ekleme, Route Guard ile sayfa koruması
- **HTTP:** Angular HttpClient, RxJS

## Mimari Notlar

- **Modüler klasör yapısı:** `_admin_components`, `_main-components`, `_layouts`, `_services`, `_models`, `_guards`, `_interceptors`
- **Servis katmanı:** Her domain (Category, Blog, Comment, ContactInfo, Message, Social, Auth) için ayrı Angular servisi, backend'deki `Result<T>` sarmalayıcı response formatına uygun tip tanımları
- **Değişiklik algılama:** Bazı bileşenlerde `ChangeDetectorRef.detectChanges()` ile manuel tetikleme kullanılıyor (HTTP response'larının zone dışında dönmesi durumuna karşı)

## Kurulum

```bash
npm install
ng serve
```

Uygulama varsayılan olarak `http://localhost:4200` adresinde çalışır. Backend API'nin `https://localhost:7000` adresinde ayakta olması gerekir (bkz. [ZenBlogServer](https://github.com/UmutCan37/ZenBlogServer)).

## Proje Yapısı

```
src/app/
├── _admin_components/     # Admin panel bileşenleri (category, blog, comment, ...)
├── _main-components/      # Public site bileşenleri (home, blogdetails, contact-main, ...)
├── _layouts/               # admin-layout, main-layout (header/footer/sidebar)
├── _services/               # HTTP servisleri
├── _models/                 # DTO tip tanımları
├── _guards/                 # AuthGuard
└── _interceptors/           # AuthInterceptor (JWT header ekleme)
```
