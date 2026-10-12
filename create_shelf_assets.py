"""
Generates pixel-art SVGs for the shelf items and wooden shelf structure.
"""
import os

assets = {}

# 1. RED BINDER (Projeler)
assets['binder_red.svg'] = '''<svg viewBox="0 0 36 96" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
  <!-- Arka plan gölge kenarı -->
  <rect x="1" y="1" width="34" height="94" fill="#1e0808" rx="1"/>
  <!-- Ana Cilt Gövdesi -->
  <rect x="2" y="2" width="32" height="92" fill="#9e2626"/>
  <!-- Sol Işık Bandı -->
  <rect x="3" y="2" width="4" height="92" fill="#c13838"/>
  <rect x="4" y="3" width="2" height="90" fill="#d94e4e"/>
  <!-- Sağ Gölge Bandı -->
  <rect x="30" y="2" width="4" height="92" fill="#6d1717"/>
  <!-- Kabartma Dikiş/Bant Çizgileri -->
  <rect x="2" y="10" width="32" height="2" fill="#6d1717"/>
  <rect x="2" y="11" width="32" height="1" fill="#d94e4e"/>
  <rect x="2" y="56" width="32" height="2" fill="#6d1717"/>
  <rect x="2" y="57" width="32" height="1" fill="#d94e4e"/>
  <rect x="2" y="82" width="32" height="2" fill="#6d1717"/>
  <rect x="2" y="83" width="32" height="1" fill="#d94e4e"/>
  <!-- Üst Pirinç Köşe Koruyucu -->
  <polygon points="2,2 14,2 14,5 5,5 5,14 2,14" fill="#dfa634"/>
  <polygon points="2,2 12,2 12,3 3,3 3,12 2,12" fill="#fce278"/>
  <rect x="4" y="4" width="2" height="2" fill="#7a5210"/>
  <!-- Alt Pirinç Köşe Koruyucu -->
  <polygon points="2,94 14,94 14,91 5,91 5,82 2,82" fill="#dfa634"/>
  <polygon points="2,94 12,94 12,93 3,93 3,84 2,84" fill="#fce278"/>
  <rect x="4" y="90" width="2" height="2" fill="#7a5210"/>
  <!-- Parşömen Etiket Kartı -->
  <rect x="6" y="16" width="24" height="34" fill="#3a2818"/>
  <rect x="7" y="17" width="22" height="32" fill="#fffbf0"/>
  <rect x="7" y="17" width="22" height="5" fill="#9e2626"/>
  <rect x="9" y="19" width="18" height="1" fill="#fce278"/>
  <!-- Etiket Yazı İpuçları (Piksel Çizgiler) -->
  <rect x="9" y="25" width="18" height="2" fill="#2b222a"/>
  <rect x="9" y="29" width="14" height="2" fill="#555555"/>
  <rect x="9" y="34" width="16" height="2" fill="#555555"/>
  <rect x="9" y="39" width="10" height="2" fill="#777777"/>
  <rect x="16" y="43" width="4" height="3" fill="#dfa634"/>
  <!-- Metal Çekme Halkası -->
  <rect x="13" y="66" width="10" height="10" fill="#221111" rx="2"/>
  <rect x="14" y="67" width="8" height="8" fill="#dfa634" rx="1"/>
  <rect x="15" y="68" width="6" height="6" fill="#1e0808" rx="1"/>
  <rect x="15" y="68" width="2" height="2" fill="#fce278"/>
</svg>'''

# 2. GREEN BINDER (Dersler)
assets['binder_green.svg'] = '''<svg viewBox="0 0 34 94" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
  <!-- Dış gölge kenar -->
  <rect x="1" y="1" width="32" height="92" fill="#0d1f13" rx="1"/>
  <!-- Ana Yeşil Gövde -->
  <rect x="2" y="2" width="30" height="90" fill="#246d3e"/>
  <!-- Sol Işık Bandı -->
  <rect x="3" y="2" width="4" height="90" fill="#359556"/>
  <rect x="4" y="3" width="2" height="88" fill="#50b573"/>
  <!-- Sağ Gölge Bandı -->
  <rect x="28" y="2" width="4" height="90" fill="#154224"/>
  <!-- Kabartma Dikişler -->
  <rect x="2" y="10" width="30" height="2" fill="#154224"/>
  <rect x="2" y="11" width="30" height="1" fill="#50b573"/>
  <rect x="2" y="54" width="30" height="2" fill="#154224"/>
  <rect x="2" y="55" width="30" height="1" fill="#50b573"/>
  <rect x="2" y="80" width="30" height="2" fill="#154224"/>
  <rect x="2" y="81" width="30" height="1" fill="#50b573"/>
  <!-- Çelik Köşe Koruyucuları -->
  <polygon points="2,2 12,2 12,4 4,4 4,12 2,12" fill="#b0b7c2"/>
  <polygon points="2,2 10,2 10,3 3,3 3,10 2,10" fill="#eef2f7"/>
  <polygon points="2,92 12,92 12,90 4,90 4,82 2,82" fill="#b0b7c2"/>
  <polygon points="2,92 10,92 10,91 3,91 3,84 2,84" fill="#eef2f7"/>
  <!-- Etiket Kartı -->
  <rect x="5" y="15" width="24" height="32" fill="#112918"/>
  <rect x="6" y="16" width="22" height="30" fill="#fcfbfa"/>
  <rect x="6" y="16" width="22" height="5" fill="#246d3e"/>
  <rect x="8" y="18" width="18" height="1" fill="#a4e4ba"/>
  <!-- Etiket Çizgileri -->
  <rect x="8" y="24" width="18" height="2" fill="#2b222a"/>
  <rect x="8" y="28" width="14" height="2" fill="#555555"/>
  <rect x="8" y="33" width="16" height="2" fill="#555555"/>
  <rect x="8" y="38" width="11" height="2" fill="#777777"/>
  <!-- Çelik Çekme Halkası -->
  <rect x="12" y="64" width="10" height="10" fill="#112217" rx="2"/>
  <rect x="13" y="65" width="8" height="8" fill="#b0b7c2" rx="1"/>
  <rect x="14" y="66" width="6" height="6" fill="#0d1f13" rx="1"/>
  <rect x="14" y="66" width="2" height="2" fill="#ffffff"/>
</svg>'''

# 3. BLUE BINDER (Notlar)
assets['binder_blue.svg'] = '''<svg viewBox="0 0 34 92" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
  <!-- Dış gölge kenar -->
  <rect x="1" y="1" width="32" height="90" fill="#0b1729" rx="1"/>
  <!-- Ana Mavi Gövde -->
  <rect x="2" y="2" width="30" height="88" fill="#24497e"/>
  <!-- Sol Işık Bandı -->
  <rect x="3" y="2" width="4" height="88" fill="#3866a8"/>
  <rect x="4" y="3" width="2" height="86" fill="#5282c9"/>
  <!-- Sağ Gölge Bandı -->
  <rect x="28" y="2" width="4" height="88" fill="#132646"/>
  <!-- Kabartma Bantlar -->
  <rect x="2" y="10" width="30" height="2" fill="#132646"/>
  <rect x="2" y="11" width="30" height="1" fill="#5282c9"/>
  <rect x="2" y="52" width="30" height="2" fill="#132646"/>
  <rect x="2" y="53" width="30" height="1" fill="#5282c9"/>
  <rect x="2" y="78" width="30" height="2" fill="#132646"/>
  <rect x="2" y="79" width="30" height="1" fill="#5282c9"/>
  <!-- Pirinç Köşe Koruyucuları -->
  <polygon points="2,2 12,2 12,4 4,4 4,12 2,12" fill="#dfa634"/>
  <polygon points="2,2 10,2 10,3 3,3 3,10 2,10" fill="#fce278"/>
  <polygon points="2,90 12,90 12,88 4,88 4,80 2,80" fill="#dfa634"/>
  <polygon points="2,90 10,90 10,89 3,89 3,82 2,82" fill="#fce278"/>
  <!-- Etiket Kartı -->
  <rect x="5" y="15" width="24" height="30" fill="#0c182b"/>
  <rect x="6" y="16" width="22" height="28" fill="#fffef7"/>
  <rect x="6" y="16" width="22" height="5" fill="#24497e"/>
  <rect x="8" y="18" width="18" height="1" fill="#9bc3fc"/>
  <!-- Not Çizgileri -->
  <rect x="8" y="24" width="18" height="2" fill="#2b222a"/>
  <rect x="8" y="28" width="13" height="2" fill="#555555"/>
  <rect x="8" y="33" width="15" height="2" fill="#555555"/>
  <rect x="8" y="38" width="9" height="2" fill="#777777"/>
  <!-- Pirinç Çekme Halkası -->
  <rect x="12" y="62" width="10" height="10" fill="#0c182b" rx="2"/>
  <rect x="13" y="63" width="8" height="8" fill="#dfa634" rx="1"/>
  <rect x="14" y="64" width="6" height="6" fill="#08101d" rx="1"/>
  <rect x="14" y="64" width="2" height="2" fill="#fce278"/>
</svg>'''

# 4. ARCHIVE BOOKS SET (Arşiv)
assets['books_stack.svg'] = '''<svg viewBox="0 0 68 88" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
  <!-- 1. KİTAP: Sol Amber/Taba Deri Cilt (Dik) -->
  <rect x="2" y="6" width="18" height="82" fill="#1f1107" rx="1"/>
  <rect x="3" y="7" width="16" height="80" fill="#a4591a"/>
  <rect x="3" y="7" width="3" height="80" fill="#cb762b"/>
  <rect x="4" y="8" width="1" height="78" fill="#e99547"/>
  <rect x="16" y="7" width="3" height="80" fill="#69350a"/>
  <!-- Sayfa Üstü (Kemik Rengi) -->
  <rect x="3" y="5" width="15" height="3" fill="#f5eed6"/>
  <rect x="4" y="4" width="13" height="2" fill="#d9ceb0"/>
  <!-- Altın Yaldızlı Sırt Kabartmaları -->
  <rect x="3" y="16" width="16" height="3" fill="#dfa634"/>
  <rect x="3" y="17" width="16" height="1" fill="#fce278"/>
  <rect x="3" y="28" width="16" height="3" fill="#dfa634"/>
  <rect x="3" y="29" width="16" height="1" fill="#fce278"/>
  <rect x="3" y="62" width="16" height="3" fill="#dfa634"/>
  <rect x="3" y="63" width="16" height="1" fill="#fce278"/>
  <rect x="3" y="74" width="16" height="3" fill="#dfa634"/>
  <rect x="3" y="75" width="16" height="1" fill="#fce278"/>
  <!-- Ortada Altın Mühür -->
  <polygon points="11,43 14,46 11,49 8,46" fill="#fce278"/>
  <polygon points="11,44 13,46 11,48 9,46" fill="#dfa634"/>

  <!-- 2. KİTAP: Orta Bordo/Şarap Deri Cilt (Dik) -->
  <rect x="21" y="10" width="17" height="78" fill="#1a080f" rx="1"/>
  <rect x="22" y="11" width="15" height="76" fill="#5d2238"/>
  <rect x="22" y="11" width="3" height="76" fill="#7d334e"/>
  <rect x="23" y="12" width="1" height="74" fill="#9e4566"/>
  <rect x="34" y="11" width="3" height="76" fill="#3a1221"/>
  <!-- Sayfa Üstü -->
  <rect x="22" y="9" width="14" height="3" fill="#f5eed6"/>
  <rect x="23" y="8" width="12" height="2" fill="#d9ceb0"/>
  <!-- Yaldız Bantlar -->
  <rect x="22" y="20" width="15" height="2" fill="#dfa634"/>
  <rect x="22" y="21" width="15" height="1" fill="#fce278"/>
  <rect x="22" y="66" width="15" height="2" fill="#dfa634"/>
  <rect x="22" y="67" width="15" height="1" fill="#fce278"/>

  <!-- 3. KİTAP: Sağ Koyu Zümrüt / Gece Mavisi (Hafifçe Dayalı) -->
  <g transform="translate(40, 16) rotate(14)">
    <rect x="0" y="0" width="16" height="72" fill="#0e1d24" rx="1"/>
    <rect x="1" y="1" width="14" height="70" fill="#244f5e"/>
    <rect x="1" y="1" width="3" height="70" fill="#356c80"/>
    <rect x="2" y="2" width="1" height="68" fill="#4d8ba3"/>
    <rect x="12" y="1" width="3" height="70" fill="#142e38"/>
    <!-- Sayfa Üstü -->
    <rect x="1" y="-2" width="13" height="3" fill="#f5eed6"/>
    <!-- Yaldız Çizgiler -->
    <rect x="1" y="12" width="14" height="2" fill="#dfa634"/>
    <rect x="1" y="13" width="14" height="1" fill="#fce278"/>
    <rect x="1" y="52" width="14" height="2" fill="#dfa634"/>
    <rect x="1" y="53" width="14" height="1" fill="#fce278"/>
  </g>
</svg>'''

# 5. POTTED IVY (Sarmaşık Saksı)
assets['shelf_plant.svg'] = '''<svg viewBox="0 0 56 112" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
  <!-- Üst Yaprak Kümesi (Yoğun yeşillik) -->
  <!-- Koyu Gölgeler -->
  <circle cx="28" cy="24" r="16" fill="#143d16"/>
  <circle cx="18" cy="22" r="12" fill="#1b5e20"/>
  <circle cx="38" cy="22" r="12" fill="#1b5e20"/>
  <!-- Orta Ton Yapraklar -->
  <circle cx="28" cy="20" r="14" fill="#2e7d32"/>
  <circle cx="16" cy="18" r="10" fill="#388e3c"/>
  <circle cx="40" cy="18" r="10" fill="#388e3c"/>
  <!-- Işıklı Yapraklar -->
  <circle cx="24" cy="14" r="8" fill="#4caf50"/>
  <circle cx="34" cy="15" r="7" fill="#4caf50"/>
  <circle cx="16" cy="12" r="6" fill="#66bb6a"/>
  <circle cx="28" cy="10" r="6" fill="#81c784"/>
  <!-- Piksel Yaprak Uçları -->
  <rect x="10" y="8" width="4" height="4" fill="#81c784"/>
  <rect x="26" y="4" width="5" height="4" fill="#a5d6a7"/>
  <rect x="38" y="8" width="4" height="4" fill="#66bb6a"/>
  <rect x="6" y="18" width="5" height="4" fill="#388e3c"/>
  <rect x="46" y="18" width="5" height="4" fill="#388e3c"/>

  <!-- Toprak -->
  <ellipse cx="28" cy="38" rx="14" ry="4" fill="#2d170c"/>

  <!-- Terakota Saksı -->
  <!-- Saksı Kenarı (Bilezik) -->
  <rect x="12" y="36" width="32" height="8" fill="#1e0b05" rx="1"/>
  <rect x="13" y="37" width="30" height="6" fill="#c4643c"/>
  <rect x="13" y="37" width="30" height="2" fill="#e07b53"/>
  <rect x="14" y="38" width="10" height="1" fill="#f79c74"/>
  <rect x="35" y="37" width="8" height="6" fill="#8c3e20"/>

  <!-- Saksı Gövdesi (Aşağı doğru konik) -->
  <polygon points="15,44 41,44 37,70 19,70" fill="#1e0b05"/>
  <polygon points="16,45 40,45 36,69 20,69" fill="#c4643c"/>
  <!-- Sol Işık Bandı -->
  <polygon points="16,45 23,45 21,69 20,69" fill="#da754d"/>
  <polygon points="17,46 20,46 19,68 18,68" fill="#f2956d"/>
  <!-- Sağ Gölge Bandı -->
  <polygon points="33,45 40,45 36,69 33,69" fill="#8c3e20"/>

  <!-- Saksı Altlığı -->
  <rect x="17" y="70" width="22" height="4" fill="#1e0b05"/>
  <rect x="18" y="71" width="20" height="2" fill="#9e4420"/>

  <!-- AŞAĞI SARKAN SARMAŞIK DALLARI & YAPRAKLARI -->
  <!-- Sol Dal -->
  <path d="M 16,42 Q 10,60 14,78 Q 18,94 11,106" stroke="#2e7d32" stroke-width="2" fill="none"/>
  <!-- Sol Dal Yaprakları -->
  <rect x="8" y="52" width="6" height="5" fill="#4caf50" rx="1"/>
  <rect x="9" y="53" width="2" height="2" fill="#a5d6a7"/>
  <rect x="13" y="66" width="6" height="5" fill="#388e3c" rx="1"/>
  <rect x="6" y="80" width="7" height="6" fill="#4caf50" rx="1"/>
  <rect x="7" y="81" width="3" height="2" fill="#81c784"/>
  <rect x="14" y="92" width="6" height="5" fill="#2e7d32" rx="1"/>
  <rect x="8" y="102" width="6" height="5" fill="#66bb6a" rx="1"/>

  <!-- Sağ Dal (Daha kısa, zarif) -->
  <path d="M 40,42 Q 46,58 42,76 Q 39,88 44,98" stroke="#1b5e20" stroke-width="2" fill="none"/>
  <!-- Sağ Dal Yaprakları -->
  <rect x="42" y="54" width="6" height="5" fill="#388e3c" rx="1"/>
  <rect x="36" y="68" width="6" height="5" fill="#4caf50" rx="1"/>
  <rect x="37" y="69" width="2" height="2" fill="#81c784"/>
  <rect x="42" y="82" width="6" height="5" fill="#2e7d32" rx="1"/>
  <rect x="41" y="94" width="5" height="5" fill="#66bb6a" rx="1"/>
</svg>'''

# 6. VINTAGE DESK CLOCK (Masa Saati)
assets['shelf_clock.svg'] = '''<svg viewBox="0 0 38 52" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
  <!-- Dış Ahşap Kasa Gölgesi -->
  <path d="M 5,16 Q 19,4 33,16 L 33,46 L 5,46 Z" fill="#1c0e06"/>
  <!-- Ahşap Kasa Gövdesi -->
  <path d="M 6,17 Q 19,6 32,17 L 32,45 L 6,45 Z" fill="#9c5f2b"/>
  <!-- Sol Işık Eğrisi -->
  <path d="M 6,17 Q 19,6 23,10 L 23,45 L 6,45 Z" fill="#b5753b"/>
  <rect x="8" y="20" width="3" height="23" fill="#d4945a"/>
  <!-- Sağ Gölge -->
  <rect x="28" y="20" width="4" height="24" fill="#633612"/>

  <!-- Pirinç Çerçeve Halkası -->
  <circle cx="19" cy="29" r="12" fill="#1c0e06"/>
  <circle cx="19" cy="29" r="11" fill="#dfa634"/>
  <circle cx="19" cy="29" r="10" fill="#fce278"/>
  <circle cx="19" cy="29" r="9.5" fill="#dfa634"/>

  <!-- Krem Kadran -->
  <circle cx="19" cy="29" r="9" fill="#fffdf2"/>

  <!-- Saat Noktaları (12, 3, 6, 9) -->
  <rect x="18" y="21" width="2" height="2" fill="#2b222a"/>
  <rect x="25" y="28" width="2" height="2" fill="#2b222a"/>
  <rect x="18" y="35" width="2" height="2" fill="#2b222a"/>
  <rect x="11" y="28" width="2" height="2" fill="#2b222a"/>

  <!-- Akrep ve Yelkovan (10:10 pozisyonu) -->
  <!-- Merkez Mil -->
  <circle cx="19" cy="29" r="1.5" fill="#dfa634"/>
  <!-- Akrep (10 yönü) -->
  <line x1="19" y1="29" x2="15" y2="25" stroke="#2b222a" stroke-width="1.8"/>
  <!-- Yelkovan (2 yönü) -->
  <line x1="19" y1="29" x2="24" y2="24" stroke="#2b222a" stroke-width="1.2"/>

  <!-- Pirinç Küre Ayaklar -->
  <circle cx="9" cy="47" r="3" fill="#1c0e06"/>
  <circle cx="9" cy="46" r="2.5" fill="#dfa634"/>
  <circle cx="9" cy="45.5" r="1" fill="#fce278"/>

  <circle cx="29" cy="47" r="3" fill="#1c0e06"/>
  <circle cx="29" cy="46" r="2.5" fill="#dfa634"/>
  <circle cx="29" cy="45.5" r="1" fill="#fce278"/>
</svg>'''

# 7. RETRO CAMERA (Fotoğraf Makinesi)
assets['shelf_camera.svg'] = '''<svg viewBox="0 0 48 38" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
  <!-- Dış Hat / Gölge -->
  <rect x="2" y="6" width="44" height="31" fill="#0f1114" rx="2"/>

  <!-- Üst Alüminyum Plaka -->
  <rect x="3" y="7" width="42" height="9" fill="#88909c"/>
  <rect x="3" y="7" width="42" height="8" fill="#d4d8de"/>
  <rect x="3" y="7" width="42" height="2" fill="#f2f5f8"/>

  <!-- Dekanşör Butonu (Kırmızı) -->
  <rect x="34" y="3" width="5" height="4" fill="#0f1114"/>
  <rect x="35" y="4" width="3" height="3" fill="#d32f2f"/>
  <rect x="35" y="4" width="3" height="1" fill="#ff7676"/>

  <!-- Sol Çark (Film Sarma) -->
  <rect x="6" y="3" width="7" height="4" fill="#0f1114"/>
  <rect x="7" y="4" width="5" height="3" fill="#a4aab4"/>
  <rect x="7" y="4" width="5" height="1" fill="#e4e8ef"/>

  <!-- Vizör Penceresi -->
  <rect x="10" y="9" width="7" height="5" fill="#0f1114"/>
  <rect x="11" y="10" width="5" height="3" fill="#2d4263"/>
  <rect x="11" y="10" width="2" height="2" fill="#88b5ea"/>

  <!-- Ana Gövde (Deri Kaplama / Siyah) -->
  <rect x="3" y="15" width="42" height="19" fill="#242528"/>
  <rect x="3" y="16" width="42" height="1" fill="#38393d"/>
  <rect x="3" y="33" width="42" height="1" fill="#141416"/>

  <!-- Alt Metal Plaka -->
  <rect x="3" y="34" width="42" height="2" fill="#9aa0aa"/>
  <rect x="3" y="34" width="42" height="1" fill="#d4d8de"/>

  <!-- Objektif / Lens (Merkez) -->
  <circle cx="27" cy="24" r="11" fill="#0f1114"/>
  <circle cx="27" cy="24" r="10" fill="#656c78"/>
  <circle cx="27" cy="24" r="9" fill="#8c94a0"/>
  <circle cx="27" cy="24" r="8" fill="#22252a"/>
  <circle cx="27" cy="24" r="6.5" fill="#162533"/>
  <!-- Mercek Cam Yansıması -->
  <path d="M 23,20 A 5,5 0 0,1 29,19" stroke="#4da8da" stroke-width="1.8" stroke-linecap="round"/>
  <circle cx="24" cy="21" r="1" fill="#ffffff"/>
  <circle cx="30" cy="27" r="1.2" fill="#4da8da"/>
</svg>'''

# 8. WOODEN SHELF STRUCTURE (Ahşap Raf & Konsollar)
assets['shelf_wood.svg'] = '''<svg viewBox="0 0 480 84" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
  <!-- Duvara Düşen Yumuşak Gölge -->
  <rect x="8" y="22" width="464" height="14" fill="#1e0a05" opacity="0.45"/>
  <rect x="14" y="36" width="452" height="6" fill="#1e0a05" opacity="0.2"/>
  <polygon points="52,22 86,22 52,76" fill="#1e0a05" opacity="0.35"/>
  <polygon points="394,22 428,22 394,76" fill="#1e0a05" opacity="0.35"/>

  <!-- SOL KONSOL / BRAKET -->
  <polygon points="54,20 82,20 82,24 58,70 54,70" fill="#1c0a05"/>
  <polygon points="56,20 80,20 80,23 60,68 56,68" fill="#7a3519"/>
  <!-- Sol Braket Işık Kenarı -->
  <polygon points="56,20 60,20 60,68 56,68" fill="#9c4925"/>
  <rect x="57" y="20" width="2" height="46" fill="#b86238"/>
  <!-- Sol Braket Gölge Kenarı -->
  <polygon points="76,20 80,20 80,23 62,65 60,65" fill="#4a1c0b"/>
  <!-- Braket Çivi/Dübel Ayrıntısı -->
  <circle cx="63" cy="30" r="2" fill="#2a0e05"/>
  <circle cx="63" cy="29" r="1" fill="#dfa634"/>

  <!-- SAĞ KONSOL / BRAKET -->
  <polygon points="398,20 426,20 426,24 402,70 398,70" fill="#1c0a05"/>
  <polygon points="400,20 424,20 424,23 404,68 400,68" fill="#7a3519"/>
  <!-- Sağ Braket Işık Kenarı -->
  <polygon points="400,20 404,20 404,68 400,68" fill="#9c4925"/>
  <rect x="401" y="20" width="2" height="46" fill="#b86238"/>
  <!-- Sağ Braket Gölge Kenarı -->
  <polygon points="420,20 424,20 424,23 406,65 404,65" fill="#4a1c0b"/>
  <!-- Braket Çivi/Dübel Ayrıntısı -->
  <circle cx="407" cy="30" r="2" fill="#2a0e05"/>
  <circle cx="407" cy="29" r="1" fill="#dfa634"/>

  <!-- AHŞAP RAF TAHTASI (ANA PLANK) -->
  <!-- Dış koyu hat -->
  <rect x="4" y="2" width="472" height="20" fill="#230c06" rx="2"/>
  <!-- Üst Işıklı Eğim Yüzeyi (Top Bevel) -->
  <rect x="6" y="3" width="468" height="6" fill="#b5663d"/>
  <rect x="6" y="3" width="468" height="2" fill="#d9885e"/>
  <rect x="10" y="3" width="460" height="1" fill="#f2ae88"/>

  <!-- Ön Dikey Ahşap Yüz (Front Face) -->
  <rect x="6" y="9" width="468" height="10" fill="#84391c"/>
  <!-- Ahşap Doku ve Damar Çizgileri -->
  <rect x="12" y="11" width="48" height="1" fill="#9e4d29"/>
  <rect x="30" y="14" width="72" height="1" fill="#61240e"/>
  <rect x="160" y="12" width="80" height="1" fill="#9e4d29"/>
  <rect x="190" y="15" width="64" height="1" fill="#61240e"/>
  <rect x="310" y="11" width="96" height="1" fill="#9e4d29"/>
  <rect x="340" y="14" width="50" height="1" fill="#61240e"/>
  <rect x="430" y="12" width="36" height="1" fill="#9e4d29"/>

  <!-- Alt Eğim ve Gölge Hattı -->
  <rect x="6" y="19" width="468" height="3" fill="#45190a"/>
  <rect x="6" y="21" width="468" height="1" fill="#290d04"/>
</svg>'''

for filename, content in assets.items():
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    print(f'Saved: {filename}')
print('All shelf assets successfully generated!')
