# 🎮 Pixel Room Desktop (Lively Wallpaper & Web Background)

Windows Lively Wallpaper veya tam ekran web tarayıcıları için tasarlanmış, retro 16-bit piksel temalı, yüksek performanslı ve etkileşimli masaüstü arka planı.

---

## ✨ Özellikler

1. **Duvardaki İnteraktif Çerçeve (Sol Üst)**
   - Resim (PNG, JPG, GIF, WebP) ve Döngüsel Video (MP4, WebM) desteği.
   - **IndexedDB Entegrasyonu**: Büyük boyutlu video ve resimler tarayıcı/duvar kağıdı kapansa veya yenilense dahi bilgisayarınızda kalıcı kalır.
   - Sürükle & Bırak (Drag-and-Drop) veya doğrudan tıklama ile medya seçimi.
   - Üzerine gelindiğinde beliren retro "Değiştir" ve "Sıfırla" kontrolleri.

2. **Mantar Pano / Post-It To-Do Listesi (Sağ Üst)**
   - Nostaljik raptiye ve post-it tasarımı.
   - Görev ekleme (`Enter` veya `+`), tamamlandı olarak işaretleme ve tek tek silme.
   - **LocalStorage Kalıcılığı**: Görevleriniz hiçbir zaman kaybolmaz.
   - Özel piksel kaydırma çubuğu (custom pixel scrollbar).

3. **Duvar Rafı ve Piksel Klasörler (Mantar Pano Altı)**
   - Odanın ahşap duvarına tam oturan piksel ahşap raf ve metal destek ayakları.
   - Gerçekçi ciltli retro klasörler (PROJELER, DERSLER, NOTLAR, MEDYA).
   - Klasörün üzerine gelindiğinde raftan öne doğru çekilme animasyonu ve retro kağıt sürtünme sesi.
   - Tıklandığında klasörün içindeki bağlantıları ve dosyaları listeleyen özel modal pencere.
   - Kullanıcı dilediği renkte (bordo, mavi, yeşil, sarı, mor) yeni klasör ekleyebilir ve bağlantılarını düzenleyebilir.

4. **Masadaki Defterler / Kısayollar (Masa Sol Bölümü)**
   - Tıklandığında retro işletim sistemi penceresi (modal) açılır.
   - Hızlı bağlantılar (GitHub, Notlar, Dokümanlar, Lo-Fi Müzik vb.).
   - Kullanıcının kendi web bağlantılarını ekleyip silebileceği dinamik kısayol sistemi.

5. **Çöp Kutusu (Masa Yanı - Sağ Alt)**
   - Tıklandığında piksel sarsıntı animasyonu (`pixel-shake`).
   - Tek tıkla mantar panodaki **tamamlanmış tüm görevleri temizler**.
   - Üzerinde kaç adet tamamlanmış görev olduğunu gösteren retro sayaç rozeti.

6. **Retro 8-Bit Ses Motoru (Web Audio API)**
   - Harici ses dosyası yüklemeden, tarayıcının kendi ses sentezleyicisi ile retro chiptune tınıları üretir (0 KB bant genişliği, ultra hafif).
   - Sağ alttaki dock menüsünden ses tek tıkla açılıp kapatılabilir.

7. **Canlı Koordinat Kalibratörü (Görsel Ayar Aracı)**
   - Sağ alt dock menüsündeki `⚙ KALİBRASYON` butonu ile açılır.
   - Kendi özel `background.png` görselinizi kullandığınızda, bileşenlerin konumlarını gerçek zamanlı slider'lar ile ayarlayabilir ve hazır CSS kodunu panoya kopyalayabilirsiniz.

---

## 🚀 Lively Wallpaper Kurulumu

1. **Lively Wallpaper'ı Açın**.
2. Bu klasörü (`pixel-wallpaper`) doğrudan Lively Wallpaper penceresinin içine **sürükleyip bırakın** (klasör içindeki `LivelyInfo.json` sayesinde Lively bunu otomatik olarak tanır).
3. Veya Lively Wallpaper içinden **+ Add Wallpaper** butonuna tıklayıp bu klasördeki `index.html` dosyasını seçin.
4. Duvar kağıdınız hemen masaüstünüzde aktif olacaktır!

---

## 🌐 Normal Tarayıcıda Çalıştırma

- `index.html` dosyasına çift tıklayarak Chrome, Edge veya Firefox ile açın.
- Klavyeden **F11** tuşuna basarak tam ekran yapın.
- 16:9 oranı sayesinde monitörünüzün çözünürlüğü ne olursa olsun sahne bozulmadan merkezlenir.

---

## 🎨 Koordinatları ve Arka Planı Değiştirme

Kendi arka planınızı kullanmak isterseniz:
1. Görselinizi `background.png` adıyla bu klasöre kaydedin (1920x1080 önerilir).
2. `style.css` dosyasının en üstündeki CSS değişkenlerini (`:root`) düzenleyin veya canlı kalibratörü kullanarak slider'ları kaydırıp CSS kodunu kopyalayın:

```css
:root {
  /* 1. Medya Çerçevesi */
  --frame-top: 8.5%;
  --frame-left: 6.2%;
  --frame-width: 22.0%;
  --frame-height: 27.5%;

  /* 2. Mantar Pano */
  --todo-top: 12.0%;
  --todo-left: 73.0%;
  --todo-width: 22.5%;
  --todo-height: 32.5%;

  /* 3. Duvar Rafı ve Klasörler */
  --shelf-top: 48.0%;
  --shelf-left: 72.5%;
  --shelf-width: 23.5%;
  --shelf-height: 16.0%;

  /* 4. Masadaki Defterler */
  --notebook-top: 74.0%;
  --notebook-left: 7.8%;
  --notebook-width: 16.5%;
  --notebook-height: 20.0%;

  /* 5. Çöp Kutusu */
  --trash-top: 84.5%;
  --trash-left: 68.5%;
  --trash-width: 11.5%;
  --trash-height: 15.0%;
}
```

---

## ⚡ Performans ve Kaynak Tüketimi
- Harici JS kütüphanesi (React, jQuery, Vue vb.) **kullanılmamıştır**. Tamamen saf Vanilla JavaScript'tir.
- Arka planda CPU döngüsü tüketen `setInterval` veya ağır canvas döngüleri yoktur.
- GPU hızlandırmalı CSS dönüşümleri (`transform`, `opacity`) kullanılmıştır.
- Lively Wallpaper arkada çalışırken minimum RAM ve %0-%0.1 CPU tüketir.
