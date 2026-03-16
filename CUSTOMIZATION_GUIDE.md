# 🎁 Customization Guide - Birthday Gift App

## ✅ 1. Password (Sudah Diubah)
Password sudah diubah ke: **140502** (14 Mei 2002)

## 🎨 2. Cara Mengganti Emoji dengan GIF/Images

### Langkah 1: Siapkan File Anda
Taruh file-file Anda di folder yang sesuai:
- **GIFs** → `public/gifs/`
- **Images** → `public/images/`
- **Videos** → `public/videos/`

Contoh struktur:
```
birthday-gift/
├── public/
│   ├── gifs/
│   │   ├── cute-cat.gif
│   │   ├── sparkle.gif
│   │   └── heart.gif
│   ├── images/
│   │   ├── photo1.jpg
│   │   └── photo2.jpg
│   └── videos/
│       └── memory-video.mp4
```

### Langkah 2: Ganti Emoji di Kode

#### Di Welcome Page (Baris ~107-121)
Ganti emoji dengan gambar:

```jsx
// SEBELUM (dengan emoji):
<BouncingCharacter emoji="🐱" size="text-8xl" />
<div className="absolute -top-2 -left-2 text-2xl">✨</div>
<div className="absolute -top-1 -right-3 text-xl">💖</div>

// SESUDAH (dengan GIF/Gambar):
<img src="/gifs/cute-cat.gif" className="w-32 h-32 object-contain" alt="cat" />
<img src="/gifs/sparkle.gif" className="absolute -top-2 -left-2 w-8 h-8" alt="sparkle" />
<img src="/gifs/heart.gif" className="absolute -top-1 -right-3 w-6 h-6" alt="heart" />
```

#### Di Password Page (Baris ~218)
Ganti emoji bouncing character:
```jsx
// SEBELUM:
<BouncingCharacter emoji="😸" size="text-6xl" />

// SESUDAH:
<img src="/gifs/curious-cat.gif" className="w-24 h-24" alt="curious cat" />
```

#### Di Birthday Message Page (Baris ~282-292)
Ganti confetti emoji:
```jsx
// SEBELUM:
const emojis = ["💙", "⭐", "💙", "✨", "💙", "⭐", "💫", "💙"];

// SESUDAH (gunakan gambar):
const confettiImages = [
  "/gifs/star.gif",
  "/gifs/heart.gif",
  "/gifs/sparkle.gif",
];
```

Lalu update ConfettiPiece component:
```jsx
const ConfettiPiece = ({ imageSrc, delay, left, duration, size }) => (
  <img
    src={imageSrc}
    className="fixed pointer-events-none z-10"
    style={{
      left: `${left}%`,
      top: "-40px",
      width: `${size}px`,
      height: `${size}px`,
      animation: `confettiFall ${duration}s linear ${delay}s infinite`,
    }}
    alt="confetti"
  />
);
```

## 📸 3. Cara Menambahkan Foto/Video Asli

### Di Memory Page (Baris ~436-459)

Ganti placeholder photo dengan foto asli:

```jsx
// SEBELUM:
<div className="w-full aspect-square max-w-xs rounded-2xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-lg overflow-hidden relative">
  <div className="text-center space-y-2">
    <div className="text-5xl">📸</div>
    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
      Our Photo
    </p>
  </div>
</div>

// SESUDAH (dengan foto asli):
<img
  src="/images/our-first-photo.jpg"
  alt="Our first photo together"
  className="w-full aspect-square max-w-xs rounded-2xl shadow-lg object-cover"
/>

// ATAU dengan video:
<video
  src="/videos/our-memory.mp4"
  controls
  className="w-full aspect-square max-w-xs rounded-2xl shadow-lg object-cover"
/>
```

### Multiple Photos/Gallery
Jika ingin gallery dengan banyak foto:

```jsx
<div className="grid grid-cols-2 gap-4">
  <img src="/images/photo1.jpg" className="rounded-xl shadow-lg" alt="Memory 1" />
  <img src="/images/photo2.jpg" className="rounded-xl shadow-lg" alt="Memory 2" />
  <img src="/images/photo3.jpg" className="rounded-xl shadow-lg" alt="Memory 3" />
  <img src="/images/photo4.jpg" className="rounded-xl shadow-lg" alt="Memory 4" />
</div>
```

## 💬 4. Update Birthday Message

### Di BirthdayMessagePage (Baris ~309-321)

```jsx
// SEBELUM:
<h1>Happy birthday, my love 🤍🤍</h1>
<p>
  On your special day, I just want to remind you how grateful I am to
  have you in my life. Thank you for being the amazing person you
  are—kind, loving, and always full of warmth. Every moment with you
  is a gift, and I hope this year brings you everything your heart
  desires. I love you more than words can say. 💙
</p>

// SESUDAH (dengan pesan pribadi Anda):
<h1>Selamat Ulang Tahun, Sayang! 🎂✨</h1>
<p>
  Di hari spesial ini, aku cuma mau ngasih tau kalau aku bersyukur banget
  punya kamu di hidupku. Makasih udah jadi orang yang luar biasa—baik, perhatian,
  dan selalu penuh kasih sayang. Setiap momen sama kamu itu hadiah terbaik,
  dan semoga tahun ini bawa semua yang kamu pengen. Aku sayang kamu lebih dari
  yang bisa diungkapin kata-kata. 💙
</p>
```

### Di Memory Page (Baris ~476-484)

```jsx
// SEBELUM:
<h2>Thank you for being mine</h2>
<p>
  You make every day brighter just by being you. Here's to another
  amazing year together. I love you endlessly 💙
</p>

// SESUDAH:
<h2>Makasih udah mau jadi milikku</h2>
<p>
  Kalo nggak ada kamu, hari-hariku pasti lebih sepi. Semoga tahun-tahun
  berikutnya kita bisa terus bareng ya. Aku sayang kamu, selamanya! 💙
</p>
```

## 🎵 5. Embed Spotify Playlist

### Di PlaylistPage (Baris ~336-425)

Ganti playlist dummy dengan Spotify embed asli:

#### Langkah 1: Dapatkan Spotify Embed Code
1. Buka playlist di Spotify
2. Klik tombol **Share** → **Embed playlist**
3. Copy **Spotify URI** atau langsung ambil embed code

#### Langkah 2: Update Kode

```jsx
// SEBELUM (playlist dummy):
const songs = [
  { number: 1, title: "Love Story (Taylor's Version)", artist: "Taylor Swift", duration: "03:55" },
  { number: 2, title: "My Love Mine All Mine", artist: "Mitski", duration: "02:17" },
  { number: 3, title: "Mine (Taylor's Version)", artist: "Taylor Swift", duration: "03:51" },
];

// SESUDAH (dengan Spotify iframe):
<div className="w-full rounded-3xl overflow-hidden shadow-2xl">
  <iframe
    style={{ borderRadius: '12px' }}
    src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
    width="100%"
    height="352"
    frameBorder="0"
    allowfullscreen=""
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  />
</div>
```

#### Contoh dengan Playlist ID:
```jsx
// Ganti dengan playlist ID kamu:
const PLAYLIST_ID = "37i9dQZF1DXcBWIGoYBM5M"; // Contoh: Today's Top Hits

<iframe
  src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator`}
  width="100%"
  height="352"
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
/>
```

### Full Contoh PlaylistPage dengan Spotify:

```jsx
const PlaylistPage = ({ onNext }) => {
  // Ganti dengan playlist ID kamu
  const PLAYLIST_ID = "37i9dQZF1DXcBWIGoYBM5M";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200 text-center">
          Playlist Buat Kamu 💙
        </h2>

        {/* Spotify Embed */}
        <div className="w-full rounded-3xl overflow-hidden shadow-2xl">
          <iframe
            style={{ borderRadius: '12px' }}
            src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>

        <button
          onClick={onNext}
          className="px-10 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-full shadow-lg transition-all hover:bg-blue-700 hover:scale-105"
        >
          Lanjut <ChevronRight className="w-5 h-5 inline ml-1" />
        </button>
      </div>
    </div>
  );
};
```

## 🎯 Quick Start Customization

### 1. Password ✅
Sudah diubah ke `140502`

### 2. Tambah Media Files
```bash
# Copy file Anda ke folder public:
copy cute-cat.gif public/gifs/
copy photo.jpg public/images/
copy playlist-cover.jpg public/images/
```

### 3. Update Code
Buka [src/App.jsx](src/App.jsx) dan:
- Baris 107-121: Ganti emoji di WelcomePage
- Baris 218: Ganti emoji di PasswordPage
- Baris 309-321: Update birthday message
- Baris 436: Ganti placeholder photo
- Baris 336-425: Ganti playlist dengan Spotify embed

### 4. Test & Deploy
```bash
# Test development
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

## 💡 Tips Tambahan

### Font Customization
Ganti font Poppins dengan font favorit kamu:
```jsx
// Di <style> tag (baris ~515)
@import url('https://fonts.googleapis.com/css2?family=FontName:wght@400;500;600;700&display=swap');

// Lalu ganti semua:
style={{ fontFamily: "'FontName', sans-serif" }}
```

### Color Scheme
Ganti warna tema (default: blue):
- Cari semua `blue-600` → ganti dengan warna pilihanmu (misal: `pink-600`, `purple-600`)
- Cari semua `text-blue-800` → ganti dengan warna text (misal: `text-pink-800`)

### Animations
Tambahkan efek khusus di moments penting:
```jsx
// Tambahkan confetti lebih banyak
for (let i = 0; i < 50; i++) { // 30 → 50
```

---

## 📝 Checklist Customization

- [x] Password diubah ke 140502
- [ ] Siapkan GIF files dan taruh di `public/gifs/`
- [ ] Ganti emoji dengan GIF di WelcomePage
- [ ] Ganti emoji di PasswordPage
- [ ] Siapkan foto/video untuk MemoryPage
- [ ] Update birthday message dengan kata-kata pribadi
- [ ] Buat/kumpulkan Spotify playlist
- [ ] Ganti playlist dengan Spotify embed
- [ ] Test semua functionality
- [ ] Build untuk deployment

---

Selamat mengcustomize! 🎉💙
Kalau butuh bantuan dengan bagian tertentu, tinggal tanya ya!
