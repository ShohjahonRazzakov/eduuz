// EduUz - Production-Grade Learning Platform
// Senior-level React SaaS Application
// Tech: React 18, Hooks, Context API, Framer Motion patterns

import { useState, useEffect, useContext, createContext, useCallback, useMemo, useRef } from "react";

// ============================================================
// CONSTANTS & DATA
// ============================================================
const SUBJECTS = [
  {
    id: "math",
    icon: "∑",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    topics: [
      {
        id: "algebra-basics",
        videoId: "NybHckSEQBI",
        questions: [
          { id: 1, text: "2x + 5 = 13 tenglamada x = ?", options: ["3", "4", "5", "6"], answer: 1 },
          { id: 2, text: "3(x - 2) = 9 bo'lsa x = ?", options: ["3", "4", "5", "6"], answer: 2 },
          { id: 3, text: "x² = 16 bo'lsa x = ?", options: ["2", "4", "8", "16"], answer: 1 },
          { id: 4, text: "2x - 3 = 7 bo'lsa x = ?", options: ["4", "5", "6", "7"], answer: 1 },
          { id: 5, text: "5x = 25 bo'lsa x = ?", options: ["3", "4", "5", "6"], answer: 2 },
          { id: 6, text: "x/4 = 3 bo'lsa x = ?", options: ["8", "10", "12", "14"], answer: 2 },
          { id: 7, text: "4x + 2 = 18 bo'lsa x = ?", options: ["3", "4", "5", "6"], answer: 1 },
          { id: 8, text: "x - 7 = 5 bo'lsa x = ?", options: ["10", "11", "12", "13"], answer: 2 },
          { id: 9, text: "(x+3)(x-3) = ?", options: ["x²-9", "x²+9", "x²-6", "x²+6"], answer: 0 },
          { id: 10, text: "2(x+3) = 14 bo'lsa x = ?", options: ["3", "4", "5", "6"], answer: 1 },
        ],
      },
      {
        id: "geometry",
        videoId: "WqzK3UAXaHs",
        questions: [
          { id: 1, text: "To'g'ri burchakli uchburchakda katetlar 3 va 4. Gipotenuza = ?", options: ["5", "6", "7", "8"], answer: 0 },
          { id: 2, text: "Doiraning yuzi π·r². r=5 bo'lsa yuzi = ?", options: ["25π", "10π", "5π", "50π"], answer: 0 },
          { id: 3, text: "Kvadratning perimetri 20. Tomoni = ?", options: ["4", "5", "6", "8"], answer: 1 },
          { id: 4, text: "Uchburchak burchaklari yig'indisi = ?", options: ["90°", "180°", "270°", "360°"], answer: 1 },
          { id: 5, text: "To'g'ri to'rtburchak: uzunlik=6, kenglik=4. Yuzi = ?", options: ["20", "24", "28", "32"], answer: 1 },
          { id: 6, text: "Doira diametri 10. Radiusi = ?", options: ["3", "4", "5", "6"], answer: 2 },
          { id: 7, text: "Kub qirrasi 3. Hajmi = ?", options: ["9", "18", "27", "36"], answer: 2 },
          { id: 8, text: "Parallelogramm: asos=8, balandlik=5. Yuzi = ?", options: ["35", "40", "45", "50"], answer: 1 },
          { id: 9, text: "Teng yonli uchburchak: tomon=6. Perimetri = ?", options: ["12", "15", "18", "21"], answer: 2 },
          { id: 10, text: "Trapetsiya: asoslar 4 va 6, balandlik 3. Yuzi = ?", options: ["12", "15", "18", "21"], answer: 1 },
        ],
      },
      {
        id: "statistics",
        videoId: "uhxtUt_-GyM",
        questions: [
          { id: 1, text: "1,2,3,4,5 sonlarning o'rtacha arifmetigi = ?", options: ["2", "3", "4", "5"], answer: 1 },
          { id: 2, text: "Moda qanday tushuncha?", options: ["O'rtacha", "Ko'p uchraydigan", "Eng katta", "Eng kichik"], answer: 1 },
          { id: 3, text: "2,4,6,8,10 ning mediasi = ?", options: ["4", "5", "6", "7"], answer: 2 },
          { id: 4, text: "Ehtimollik 0 dan ... gacha bo'ladi", options: ["0.5", "1", "2", "10"], answer: 1 },
          { id: 5, text: "Standart og'ish nima o'lchaydi?", options: ["O'rtacha", "Tarqalish", "Yig'indi", "Ko'paytma"], answer: 1 },
          { id: 6, text: "10 ta son, yig'indisi 80. O'rtachasi = ?", options: ["6", "7", "8", "9"], answer: 2 },
          { id: 7, text: "Normal taqsimot nima shaklda?", options: ["To'g'ri chiziq", "Qo'ng'iroq", "Parabola", "Giperbola"], answer: 1 },
          { id: 8, text: "Korrelyatsiya 0 bo'lsa bog'liqlik = ?", options: ["Kuchli", "O'rtacha", "Yo'q", "Manfiy"], answer: 2 },
          { id: 9, text: "Gistogramma nimani ko'rsatadi?", options: ["Chiziqli bog'liqlik", "Chastota taqsimoti", "O'rtacha", "Dispersiya"], answer: 1 },
          { id: 10, text: "Dispersiya bu standart og'ishning...", options: ["Yarmi", "Kvadrati", "Ildizi", "Ko'paylmasi"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "physics",
    icon: "⚛",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
    topics: [
      {
        id: "mechanics",
        videoId: "ZM8ECpBuQYE",
        questions: [
          { id: 1, text: "Nyutonning 2-qonuni: F = ?", options: ["m+a", "m·a", "m/a", "a/m"], answer: 1 },
          { id: 2, text: "Tezlik birligi SI tizimida = ?", options: ["km/s", "m/s", "cm/s", "mm/s"], answer: 1 },
          { id: 3, text: "Erkin tushish tezlanishi g ≈ ?", options: ["8 m/s²", "9.8 m/s²", "10.8 m/s²", "11 m/s²"], answer: 1 },
          { id: 4, text: "Kinetik energiya: Ek = ?", options: ["mv", "mv²", "½mv²", "2mv²"], answer: 2 },
          { id: 5, text: "Impuls: p = ?", options: ["m+v", "m·v", "m/v", "v/m"], answer: 1 },
          { id: 6, text: "Ishning birligi = ?", options: ["Vatt", "Nyuton", "Joul", "Pascal"], answer: 2 },
          { id: 7, text: "Quvvat: P = ?", options: ["F·t", "F·v", "m·v", "m·a"], answer: 1 },
          { id: 8, text: "Bosim: P = ?", options: ["F·S", "F/S", "S/F", "F+S"], answer: 1 },
          { id: 9, text: "Arximed kuchi: FA = ?", options: ["ρgV", "mgV", "ρmV", "ρg"], answer: 0 },
          { id: 10, text: "Tok kuchi birligi = ?", options: ["Vatt", "Volt", "Amper", "Om"], answer: 2 },
        ],
      },
      {
        id: "thermodynamics",
        videoId: "v3pYRn5j7oI",
        questions: [
          { id: 1, text: "Issiqlik o'tkazish turlari nechtа?", options: ["2", "3", "4", "5"], answer: 1 },
          { id: 2, text: "Absolyut nol temperatura = ?", options: ["-100°C", "-173°C", "-273°C", "-373°C"], answer: 2 },
          { id: 3, text: "Kelvin shkalasidag 0°C = ?", options: ["173 K", "273 K", "373 K", "473 K"], answer: 1 },
          { id: 4, text: "Ideal gaz qonuni: PV = ?", options: ["nRT", "nmT", "nRV", "mRT"], answer: 0 },
          { id: 5, text: "Termodinamikaning 1-qonuni: ΔU = ?", options: ["Q-A", "Q+A", "A-Q", "Q·A"], answer: 0 },
          { id: 6, text: "Issiqlik sig'imi birligi = ?", options: ["J/mol", "J/(kg·K)", "J/K", "W/m"], answer: 1 },
          { id: 7, text: "Stefan-Boltzmann qonuni bog'liq: T ga ...", options: ["To'g'ri", "Teskari", "T⁴ ga", "T² ga"], answer: 2 },
          { id: 8, text: "Entropiya nimani o'lchaydi?", options: ["Energiya", "Tartibsizlik", "Temperatura", "Bosim"], answer: 1 },
          { id: 9, text: "Karnot FIK: η = ?", options: ["1-T2/T1", "T2/T1", "T1/T2", "1+T2/T1"], answer: 0 },
          { id: 10, text: "Issiqlik o'tkazuvchanlik birligi = ?", options: ["W/(m·K)", "J/(m·K)", "W/m²", "J/K"], answer: 0 },
        ],
      },
      {
        id: "electromagnetism",
        videoId: "ruqmvwyMRho",
        questions: [
          { id: 1, text: "Om qonuni: I = ?", options: ["U·R", "U/R", "R/U", "U+R"], answer: 1 },
          { id: 2, text: "Elektr quvvati: P = ?", options: ["U+I", "U·I", "U/I", "I/U"], answer: 1 },
          { id: 3, text: "Kondensator sig'imi birligi = ?", options: ["Farad", "Genri", "Veber", "Tesla"], answer: 0 },
          { id: 4, text: "Kulон qonuni: F ∝ ?", options: ["r", "r²", "1/r", "1/r²"], answer: 3 },
          { id: 5, text: "Magnit induksiya birligi = ?", options: ["Tesla", "Veber", "Farad", "Genri"], answer: 0 },
          { id: 6, text: "Lenz qoidasi qaysi hodisaga tegishli?", options: ["Refraktsiya", "Induksiya", "Difraksiya", "Interferensiya"], answer: 1 },
          { id: 7, text: "Elektromagnit to'lqin tezligi = ?", options: ["3·10⁶", "3·10⁷", "3·10⁸", "3·10⁹"], answer: 2 },
          { id: 8, text: "Transformator qoidasi: U1/U2 = ?", options: ["n1/n2", "n2/n1", "n1·n2", "n1+n2"], answer: 0 },
          { id: 9, text: "Elektr sig'imi: C = ?", options: ["Q·U", "Q/U", "U/Q", "Q+U"], answer: 1 },
          { id: 10, text: "Aktiv qarshilik birligi = ?", options: ["Farad", "Genri", "Om", "Amper"], answer: 2 },
        ],
      },
    ],
  },
  {
    id: "biology",
    icon: "🧬",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    topics: [
      {
        id: "cell-biology",
        videoId: "URUJD5NEXC8",
        questions: [
          { id: 1, text: "Hujayraning 'energiya stantsiyasi' qaysi organoid?", options: ["Yadro", "Mitoxondriya", "Ribosoma", "Lizosoma"], answer: 1 },
          { id: 2, text: "DNK nima?", options: ["Oqsil", "Yog'", "Nukleotid", "Uglerod"], answer: 2 },
          { id: 3, text: "Fotosintez qayerda sodir bo'ladi?", options: ["Mitoxondriya", "Yadro", "Xloroplast", "Vakuola"], answer: 2 },
          { id: 4, text: "Oqsil sintezi qayerda bo'ladi?", options: ["Ribosoma", "Golji", "ER", "Yadro"], answer: 0 },
          { id: 5, text: "Hujayra membranasining asosiy komponenti?", options: ["Oqsil", "DNK", "Fosfolipid", "Uglerod"], answer: 2 },
          { id: 6, text: "Mitoz bo'linish natijasida hosil bo'ladi?", options: ["1 hujayra", "2 hujayra", "4 hujayra", "8 hujayra"], answer: 1 },
          { id: 7, text: "Meyoz bo'linish qanday hujayralar uchun?", options: ["Somatik", "Jinsiy", "Nerv", "Qon"], answer: 1 },
          { id: 8, text: "Lizosoma funktsiyasi = ?", options: ["Energiya", "Sintez", "Hazm qilish", "Transport"], answer: 2 },
          { id: 9, text: "ATP qayerda sintez bo'ladi?", options: ["Yadro", "Xloroplast", "Mitoxondriya", "Ribosoma"], answer: 2 },
          { id: 10, text: "O'simlik hujayrasi hayvon hujayrасidan farqi?", options: ["Membrana", "Yadro", "Hujayra devori", "Ribosoma"], answer: 2 },
        ],
      },
      {
        id: "genetics",
        videoId: "CBezq1fFUEA",
        questions: [
          { id: 1, text: "Mendel qonunlari nechtа?", options: ["1", "2", "3", "4"], answer: 2 },
          { id: 2, text: "Dominant belgi nima?", options: ["Yashirin belgi", "Ustun belgi", "Retsessiv belgi", "O'zgarmas belgi"], answer: 1 },
          { id: 3, text: "Insonning xromosom soni = ?", options: ["44", "46", "48", "50"], answer: 1 },
          { id: 4, text: "Genotip nima?", options: ["Tashqi ko'rinish", "Gen tarkibi", "Mutatsiya", "Fenotip"], answer: 1 },
          { id: 5, text: "RNK turlari nechtа?", options: ["2", "3", "4", "5"], answer: 1 },
          { id: 6, text: "Mutatsiya nima?", options: ["Normal o'zgarish", "DNK o'zgarishi", "Fenotip o'zgarishi", "Evolyutsiya"], answer: 1 },
          { id: 7, text: "Krossingover nima?", options: ["Murosasa bo'linish", "Xromosoma almashinuvi", "Gen duplikatsiyasi", "Mutatsiya"], answer: 1 },
          { id: 8, text: "Aa × Aa chatishuvida Aa nisbati = ?", options: ["1/4", "2/4", "3/4", "4/4"], answer: 1 },
          { id: 9, text: "Jinsiy xromosomalar = ?", options: ["A va B", "X va Y", "P va Q", "M va N"], answer: 1 },
          { id: 10, text: "Klonlash nima?", options: ["Jinsiy ko'payish", "Identik nusxa yaratish", "Mutatsiya", "Gibridizatsiya"], answer: 1 },
        ],
      },
      {
        id: "ecology",
        videoId: "bzCLME1xMus",
        questions: [
          { id: 1, text: "Ekotizim tarkibi = ?", options: ["Faqat o'simliklar", "Faqat hayvonlar", "Tirik va nojonli tabiat", "Faqat mikroorganizmlar"], answer: 2 },
          { id: 2, text: "Oziq zanjiri boshlanadi...", options: ["Iste'molchilardan", "Ishlab chiqaruvchilardan", "Parchalovchilardan", "Xo'jayindan"], answer: 1 },
          { id: 3, text: "Fotoavtotrof organizmlar = ?", options: ["Hayvonlar", "O'simliklar", "Zamburug'lar", "Viruslar"], answer: 1 },
          { id: 4, text: "Biosfera nima?", options: ["Faqat tuproq", "Barcha tirik organizmlar muhiti", "Faqat okean", "Atmosfera"], answer: 1 },
          { id: 5, text: "Simbioz nima?", options: ["Raqobat", "O'zaro manfaatli yashash", "Parazitizm", "Yirtqich-o'lja"], answer: 1 },
          { id: 6, text: "CO2 ning ortishi qanday ta'sir qiladi?", options: ["Sovutish", "Isish effekti", "O'zgarmaydi", "Kislorod ko'payadi"], answer: 1 },
          { id: 7, text: "Ekologik piramida nimani ko'rsatadi?", options: ["Populyatsiya hajmi", "Energiya o'tkazilishi", "Xilma-xillik", "Tarqalish"], answer: 1 },
          { id: 8, text: "Biogeokimyoviy tsikl nimaga misol?", options: ["Suv aylanishi", "Evolutsiya", "Mutatsiya", "Fotosintez"], answer: 0 },
          { id: 9, text: "Keystone tur nima?", options: ["Ko'p sonli tur", "Muhim ta'sir ko'rsatuvchi tur", "Endemik tur", "Parazit tur"], answer: 1 },
          { id: 10, text: "Biom nima?", options: ["Bitta organizm", "Yirik ekologik zona", "Kichik ekotizim", "Tur populyatsiyasi"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "chemistry",
    icon: "⚗",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
    topics: [
      {
        id: "periodic-table",
        videoId: "0RRVV4Diomg",
        questions: [
          { id: 1, text: "Vodorodning atom raqami = ?", options: ["0", "1", "2", "3"], answer: 1 },
          { id: 2, text: "Kislorodning kimyoviy belgisi = ?", options: ["K", "Ki", "O", "Ox"], answer: 2 },
          { id: 3, text: "Davriy jadval nechta davrdan iborat?", options: ["5", "6", "7", "8"], answer: 2 },
          { id: 4, text: "Inert gazlar qaysi guruhda?", options: ["I", "VII", "VIII", "VI"], answer: 2 },
          { id: 5, text: "Oltingugurtning atom raqami = ?", options: ["14", "15", "16", "17"], answer: 2 },
          { id: 6, text: "Eng yengil element = ?", options: ["Geliy", "Vodorod", "Litiy", "Berilliy"], answer: 1 },
          { id: 7, text: "Temir kimyoviy belgisi = ?", options: ["Te", "Ti", "Fe", "Ir"], answer: 2 },
          { id: 8, text: "Galogenlar qaysi guruhda?", options: ["VI A", "VII A", "VIII A", "V A"], answer: 1 },
          { id: 9, text: "Oltin kimyoviy belgisi = ?", options: ["Ol", "Au", "Ag", "Go"], answer: 1 },
          { id: 10, text: "Eng ko'p tarqalgan element = ?", options: ["Azot", "Kislorod", "Uglerod", "Vodorod"], answer: 1 },
        ],
      },
      {
        id: "chemical-reactions",
        videoId: "8m6RtOpqvtU",
        questions: [
          { id: 1, text: "Oksidlanish-qaytarilish reaksiyasida nima o'zgaradi?", options: ["Massa", "Oksidlanish darajasi", "Temperatura", "Bosim"], answer: 1 },
          { id: 2, text: "Kislotali muhitda pH = ?", options: ["pH > 7", "pH = 7", "pH < 7", "pH = 0"], answer: 2 },
          { id: 3, text: "Neytrallanish reaksiyasi: kislota + asos = ?", options: ["Tuz + suv", "Oksid + suv", "Gaz + tuz", "Metal + tuz"], answer: 0 },
          { id: 4, text: "Aktivatsiya energiyasi nima?", options: ["Mahsulot energiyasi", "Reaksiya boshlanish energiyasi", "Issiqlik effekti", "Qaytaruvchi energiya"], answer: 1 },
          { id: 5, text: "Katalizator nima qiladi?", options: ["Energiya beradi", "Reaksiyani tezlashtiradi", "Mahsulot hosil qiladi", "Reaktant bo'ladi"], answer: 1 },
          { id: 6, text: "Le Chatelier printsipi nimaga tegishli?", options: ["Kinetika", "Muvozanat", "Termodinamika", "Elektrokimyo"], answer: 1 },
          { id: 7, text: "Molar massa birligi = ?", options: ["g/mol", "kg/mol", "mg/mol", "g/L"], answer: 0 },
          { id: 8, text: "Avogadro soni ≈ ?", options: ["6.022·10²³", "6.022·10²²", "6.022·10²⁴", "3.011·10²³"], answer: 0 },
          { id: 9, text: "Ekzotermik reaksiyada issiqlik = ?", options: ["So'riladi", "Ajraladi", "O'zgarmaydi", "Yo'qoladi"], answer: 1 },
          { id: 10, text: "pH = -log[H⁺], pH=3 bo'lsa [H⁺] = ?", options: ["10⁻¹", "10⁻²", "10⁻³", "10⁻⁴"], answer: 2 },
        ],
      },
      {
        id: "organic-chemistry",
        videoId: "bSMx0NS0XfY",
        questions: [
          { id: 1, text: "Organik kimyoning asosi qaysi element?", options: ["Kislorod", "Vodorod", "Uglerod", "Azot"], answer: 2 },
          { id: 2, text: "Metan formulasi = ?", options: ["C2H6", "CH4", "C3H8", "C2H4"], answer: 1 },
          { id: 3, text: "Benzol formulasi = ?", options: ["C6H6", "C6H12", "C5H10", "C7H8"], answer: 0 },
          { id: 4, text: "Alkan umumiy formulasi = ?", options: ["CₙH₂ₙ", "CₙH₂ₙ₊₂", "CₙH₂ₙ₋₂", "CₙHₙ"], answer: 1 },
          { id: 5, text: "Etanol formulasi = ?", options: ["C2H5OH", "CH3OH", "C3H7OH", "C4H9OH"], answer: 0 },
          { id: 6, text: "Polimer nima?", options: ["Kichik molekula", "Takrorlanuvchi birliklardan tuzilgan", "Atom", "Ion"], answer: 1 },
          { id: 7, text: "Aminokislotalar nimani tashkil qiladi?", options: ["Yog'lar", "Uglevodlar", "Oqsillar", "Nuklein kislotalar"], answer: 2 },
          { id: 8, text: "Glukoza formulasi = ?", options: ["C12H22O11", "C6H12O6", "C5H10O5", "C3H6O3"], answer: 1 },
          { id: 9, text: "Saponifikatsiya reaksiyasi = ?", options: ["Yonish", "Sovun ishlab chiqarish", "Polimerizatsiya", "Oksidlanish"], answer: 1 },
          { id: 10, text: "Ester hosil bo'lish reaksiyasi = ?", options: ["Parchalanish", "Eterifikatsiya", "Polimerizatsiya", "Galogenlanish"], answer: 1 },
        ],
      },
    ],
  },
];

const TOPIC_NAMES = {
  uz: {
    "algebra-basics": "Algebra asoslari",
    "geometry": "Geometriya",
    "statistics": "Statistika",
    "mechanics": "Mexanika",
    "thermodynamics": "Termodinamika",
    "electromagnetism": "Elektromagnitizm",
    "cell-biology": "Hujayra biologiyasi",
    "genetics": "Genetika",
    "ecology": "Ekologiya",
    "periodic-table": "Davriy jadval",
    "chemical-reactions": "Kimyoviy reaksiyalar",
    "organic-chemistry": "Organik kimyo",
  },
  en: {
    "algebra-basics": "Algebra Basics",
    "geometry": "Geometry",
    "statistics": "Statistics",
    "mechanics": "Mechanics",
    "thermodynamics": "Thermodynamics",
    "electromagnetism": "Electromagnetism",
    "cell-biology": "Cell Biology",
    "genetics": "Genetics",
    "ecology": "Ecology",
    "periodic-table": "Periodic Table",
    "chemical-reactions": "Chemical Reactions",
    "organic-chemistry": "Organic Chemistry",
  },
  ru: {
    "algebra-basics": "Основы алгебры",
    "geometry": "Геометрия",
    "statistics": "Статистика",
    "mechanics": "Механика",
    "thermodynamics": "Термодинамика",
    "electromagnetism": "Электромагнетизм",
    "cell-biology": "Клеточная биология",
    "genetics": "Генетика",
    "ecology": "Экология",
    "periodic-table": "Периодическая таблица",
    "chemical-reactions": "Химические реакции",
    "organic-chemistry": "Органическая химия",
  },
};

const SUBJECT_NAMES = {
  uz: { math: "Matematika", physics: "Fizika", biology: "Biologiya", chemistry: "Kimyo" },
  en: { math: "Mathematics", physics: "Physics", biology: "Biology", chemistry: "Chemistry" },
  ru: { math: "Математика", physics: "Физика", biology: "Биология", chemistry: "Химия" },
};

// ============================================================
// LOCALES
// ============================================================
const TRANSLATIONS = {
  uz: {
    appName: "EduUz",
    tagline: "O'zbek tilida ta'lim platformasi",
    login: "Kirish",
    register: "Ro'yxatdan o'tish",
    logout: "Chiqish",
    dashboard: "Boshqaruv paneli",
    subjects: "Fanlar",
    profile: "Profil",
    settings: "Sozlamalar",
    guestMode: "Mehmon sifatida davom etish",
    email: "Email yoki foydalanuvchi nomi",
    password: "Parol",
    wrongPassword: "Parol noto'g'ri",
    userNotFound: "Foydalanuvchi topilmadi",
    welcome: "Xush kelibsiz",
    startLearning: "O'qishni boshlash",
    topics: "Mavzular",
    video: "Video",
    quiz: "Test",
    score: "Natija",
    correct: "To'g'ri",
    incorrect: "Noto'g'ri",
    completed: "Tugallandi",
    inProgress: "O'rganilmoqda",
    onHold: "To'xtatilgan",
    locked: "Kelajakdagi",
    markInProgress: "O'rganilmoqda deb belgilash",
    markOnHold: "To'xtatish",
    totalTests: "Jami testlar",
    totalCorrect: "To'g'ri javoblar",
    totalIncorrect: "Noto'g'ri javoblar",
    progress: "Jarayon",
    recentLessons: "So'nggi darslar",
    noHistory: "Tarix yo'q",
    guestWarning: "Mehmon sifatida tarix saqlanmaydi",
    nextQuestion: "Keyingi savol",
    submitQuiz: "Testni yakunlash",
    watchVideo: "Videoni ko'ring",
    videoWatched: "Video ko'rildi ✓",
    quizCompleted: "Test yakunlandi",
    percentage: "Foiz",
    back: "Orqaga",
    theme: "Mavzu",
    language: "Til",
    allTopics: "Barcha mavzular",
    loginToSave: "Tarixni saqlash uchun kiring",
    name: "Ism",
    confirmPassword: "Parolni tasdiqlang",
    passwordMismatch: "Parollar mos kelmaydi",
    createAccount: "Hisob yaratish",
    haveAccount: "Hisobingiz bormi?",
    noAccount: "Hisobingiz yo'qmi?",
    overall: "Umumiy",
    topicProgress: "Mavzu jarayoni",
    completeToUnlock: "Mavzuni yakunlash uchun testni bajaring",
    viewMore: "Ko'proq ko'rish",
    collapse: "Yig'ish",
  },
  en: {
    appName: "EduUz",
    tagline: "Education platform in Uzbek",
    login: "Login",
    register: "Register",
    logout: "Logout",
    dashboard: "Dashboard",
    subjects: "Subjects",
    profile: "Profile",
    settings: "Settings",
    guestMode: "Continue as Guest",
    email: "Email or Username",
    password: "Password",
    wrongPassword: "Incorrect password",
    userNotFound: "User not found",
    welcome: "Welcome",
    startLearning: "Start Learning",
    topics: "Topics",
    video: "Video",
    quiz: "Quiz",
    score: "Score",
    correct: "Correct",
    incorrect: "Incorrect",
    completed: "Completed",
    inProgress: "In Progress",
    onHold: "On Hold",
    locked: "Locked",
    markInProgress: "Mark as In Progress",
    markOnHold: "Put On Hold",
    totalTests: "Total Tests",
    totalCorrect: "Correct Answers",
    totalIncorrect: "Incorrect Answers",
    progress: "Progress",
    recentLessons: "Recent Lessons",
    noHistory: "No history",
    guestWarning: "History not saved in guest mode",
    nextQuestion: "Next Question",
    submitQuiz: "Submit Quiz",
    watchVideo: "Watch Video",
    videoWatched: "Video Watched ✓",
    quizCompleted: "Quiz Completed",
    percentage: "Percentage",
    back: "Back",
    theme: "Theme",
    language: "Language",
    allTopics: "All Topics",
    loginToSave: "Login to save history",
    name: "Name",
    confirmPassword: "Confirm Password",
    passwordMismatch: "Passwords don't match",
    createAccount: "Create Account",
    haveAccount: "Have an account?",
    noAccount: "No account?",
    overall: "Overall",
    topicProgress: "Topic Progress",
    completeToUnlock: "Complete quiz to unlock topic",
    viewMore: "View More",
    collapse: "Collapse",
  },
  ru: {
    appName: "EduUz",
    tagline: "Образовательная платформа на узбекском",
    login: "Войти",
    register: "Регистрация",
    logout: "Выйти",
    dashboard: "Панель управления",
    subjects: "Предметы",
    profile: "Профиль",
    settings: "Настройки",
    guestMode: "Продолжить как гость",
    email: "Email или имя пользователя",
    password: "Пароль",
    wrongPassword: "Неверный пароль",
    userNotFound: "Пользователь не найден",
    welcome: "Добро пожаловать",
    startLearning: "Начать обучение",
    topics: "Темы",
    video: "Видео",
    quiz: "Тест",
    score: "Результат",
    correct: "Правильно",
    incorrect: "Неправильно",
    completed: "Завершено",
    inProgress: "В процессе",
    onHold: "На паузе",
    locked: "Заблокировано",
    markInProgress: "Отметить как В процессе",
    markOnHold: "Поставить на паузу",
    totalTests: "Всего тестов",
    totalCorrect: "Правильных ответов",
    totalIncorrect: "Неправильных ответов",
    progress: "Прогресс",
    recentLessons: "Недавние уроки",
    noHistory: "Нет истории",
    guestWarning: "В режиме гостя история не сохраняется",
    nextQuestion: "Следующий вопрос",
    submitQuiz: "Завершить тест",
    watchVideo: "Смотреть видео",
    videoWatched: "Видео просмотрено ✓",
    quizCompleted: "Тест завершён",
    percentage: "Процент",
    back: "Назад",
    theme: "Тема",
    language: "Язык",
    allTopics: "Все темы",
    loginToSave: "Войдите чтобы сохранить историю",
    name: "Имя",
    confirmPassword: "Подтвердите пароль",
    passwordMismatch: "Пароли не совпадают",
    createAccount: "Создать аккаунт",
    haveAccount: "Есть аккаунт?",
    noAccount: "Нет аккаунта?",
    overall: "Общий",
    topicProgress: "Прогресс темы",
    completeToUnlock: "Пройдите тест чтобы завершить тему",
    viewMore: "Ещё",
    collapse: "Свернуть",
  },
};

// ============================================================
// CONTEXTS
// ============================================================
const ThemeContext = createContext(null);
const LanguageContext = createContext(null);
const AuthContext = createContext(null);
const AppContext = createContext(null);

// ============================================================
// PROVIDERS
// ============================================================
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "uz");

  const changeLang = useCallback((l) => {
    localStorage.setItem("lang", l);
    setLang(l);
  }, []);

  const t = useCallback((key) => TRANSLATIONS[lang]?.[key] || key, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem("auth_user");
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });
  const [isGuest, setIsGuest] = useState(false);

  const login = useCallback(async (emailOrUsername, password) => {
    if (password !== "1234") throw new Error("wrongPassword");
    if (!["user", "user@edu.uz"].includes(emailOrUsername)) throw new Error("userNotFound");
    const u = { id: "usr_1", name: "Foydalanuvchi", email: "user@edu.uz", token: "mock_jwt_token_xyz" };
    localStorage.setItem("auth_user", JSON.stringify(u));
    setUser(u);
    setIsGuest(false);
    return u;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const u = { id: "usr_" + Date.now(), name, email, token: "mock_jwt_token_" + Date.now() };
    localStorage.setItem("auth_user", JSON.stringify(u));
    setUser(u);
    setIsGuest(false);
    return u;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_user");
    setUser(null);
    setIsGuest(false);
  }, []);

  const continueAsGuest = useCallback(() => {
    setIsGuest(true);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isGuest, login, register, logout, continueAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
}

function AppProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [topicProgress, setTopicProgress] = useState(() => {
    if (!user) return {};
    try { return JSON.parse(localStorage.getItem(`progress_${user.id}`) || "{}"); }
    catch { return {}; }
  });

  const [lessonHistory, setLessonHistory] = useState(() => {
    if (!user) return [];
    try { return JSON.parse(localStorage.getItem(`history_${user.id}`) || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(`progress_${user.id}`, JSON.stringify(topicProgress));
    }
  }, [topicProgress, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`history_${user.id}`, JSON.stringify(lessonHistory));
    }
  }, [lessonHistory, user]);

  const updateTopicProgress = useCallback((subjectId, topicId, data) => {
    if (!user) return;
    setTopicProgress((prev) => ({
      ...prev,
      [`${subjectId}_${topicId}`]: { ...prev[`${subjectId}_${topicId}`], ...data },
    }));
  }, [user]);

  const addLessonHistory = useCallback((entry) => {
    if (!user) return;
    setLessonHistory((prev) => {
      const filtered = prev.filter((h) => h.topicId !== entry.topicId);
      return [{ ...entry, timestamp: Date.now() }, ...filtered].slice(0, 20);
    });
  }, [user]);

  const getTopicStatus = useCallback((subjectId, topicId) => {
    const key = `${subjectId}_${topicId}`;
    const progress = topicProgress[key];
    if (!progress) return "locked";
    return progress.status || "locked";
  }, [topicProgress]);

  const getTopicData = useCallback((subjectId, topicId) => {
    return topicProgress[`${subjectId}_${topicId}`] || {};
  }, [topicProgress]);

  return (
    <AppContext.Provider value={{
      topicProgress, lessonHistory,
      updateTopicProgress, addLessonHistory,
      getTopicStatus, getTopicData,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ============================================================
// HOOKS
// ============================================================
const useTheme = () => useContext(ThemeContext);
const useLang = () => useContext(LanguageContext);
const useAuth = () => useContext(AuthContext);
const useApp = () => useContext(AppContext);

// ============================================================
// STYLES (CSS-in-JS with CSS variables)
// ============================================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --font-main: 'Outfit', sans-serif;
      --font-mono: 'Space Mono', monospace;
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --radius-xl: 28px;
      --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
      --shadow-md: 0 4px 24px rgba(0,0,0,0.1);
      --shadow-lg: 0 8px 48px rgba(0,0,0,0.15);
      --transition: 0.2s cubic-bezier(0.4,0,0.2,1);
      --sidebar-w: 260px;
    }

    [data-theme="light"] {
      --bg: #f0f2f8;
      --bg-2: #ffffff;
      --bg-3: #e8eaf4;
      --surface: rgba(255,255,255,0.85);
      --surface-border: rgba(255,255,255,0.6);
      --glass: rgba(255,255,255,0.7);
      --glass-border: rgba(255,255,255,0.9);
      --text: #0f1117;
      --text-2: #4b5168;
      --text-3: #8b92a9;
      --accent: #6366f1;
      --accent-2: #8b5cf6;
      --accent-light: rgba(99,102,241,0.12);
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
      --info: #06b6d4;
    }

    [data-theme="dark"] {
      --bg: #0a0c14;
      --bg-2: #111422;
      --bg-3: #181c2e;
      --surface: rgba(20,24,40,0.9);
      --surface-border: rgba(255,255,255,0.08);
      --glass: rgba(18,22,38,0.8);
      --glass-border: rgba(255,255,255,0.1);
      --text: #e8eaf6;
      --text-2: #8892b0;
      --text-3: #4a5070;
      --accent: #818cf8;
      --accent-2: #a78bfa;
      --accent-light: rgba(129,140,248,0.15);
      --success: #34d399;
      --warning: #fbbf24;
      --danger: #f87171;
      --info: #22d3ee;
    }

    html { scroll-behavior: smooth; }
    body {
      font-family: var(--font-main);
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      transition: background var(--transition), color var(--transition);
      overflow-x: hidden;
    }

    .app-layout {
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: var(--sidebar-w);
      background: var(--glass);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-right: 1px solid var(--surface-border);
      position: fixed;
      top: 0; left: 0;
      height: 100vh;
      z-index: 100;
      display: flex;
      flex-direction: column;
      transition: transform var(--transition);
      overflow-y: auto;
    }

    .sidebar.hidden { transform: translateX(-100%); }

    .main-content {
      margin-left: var(--sidebar-w);
      flex: 1;
      min-height: 100vh;
      padding: 0;
      transition: margin var(--transition);
    }

    .topbar {
      background: var(--glass);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-bottom: 1px solid var(--surface-border);
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .page-content {
      padding: 28px 32px;
      max-width: 1200px;
    }

    /* Glass card */
    .glass-card {
      background: var(--glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      transition: all var(--transition);
    }

    .glass-card:hover { box-shadow: var(--shadow-lg); }

    /* Button */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: var(--radius-md);
      font-family: var(--font-main);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all var(--transition);
      white-space: nowrap;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      color: white;
      box-shadow: 0 4px 16px rgba(99,102,241,0.3);
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 24px rgba(99,102,241,0.4);
    }

    .btn-ghost {
      background: transparent;
      color: var(--text-2);
      border: 1px solid var(--surface-border);
    }

    .btn-ghost:hover {
      background: var(--accent-light);
      color: var(--accent);
      border-color: var(--accent);
    }

    .btn-danger {
      background: var(--danger);
      color: white;
    }

    .btn-sm { padding: 6px 14px; font-size: 13px; }
    .btn-lg { padding: 14px 28px; font-size: 16px; }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }

    /* Input */
    .input-field {
      width: 100%;
      padding: 12px 16px;
      background: var(--bg-3);
      border: 1.5px solid var(--surface-border);
      border-radius: var(--radius-md);
      font-family: var(--font-main);
      font-size: 15px;
      color: var(--text);
      transition: all var(--transition);
      outline: none;
    }

    .input-field:focus {
      border-color: var(--accent);
      background: var(--bg-2);
      box-shadow: 0 0 0 3px var(--accent-light);
    }

    .input-field.error { border-color: var(--danger); }

    /* Status badges */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 10px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
    }

    .badge-completed { background: rgba(99,102,241,0.15); color: #6366f1; }
    .badge-inprogress { background: rgba(16,185,129,0.15); color: #10b981; }
    .badge-onhold { background: rgba(245,158,11,0.15); color: #f59e0b; }
    .badge-locked { background: rgba(139,146,176,0.15); color: #8892b0; }

    /* Progress bar */
    .progress-bar {
      height: 6px;
      background: var(--bg-3);
      border-radius: 100px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      border-radius: 100px;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
    }

    /* Nav item */
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition);
      color: var(--text-2);
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      margin: 2px 8px;
    }

    .nav-item:hover { background: var(--accent-light); color: var(--accent); }
    .nav-item.active { background: var(--accent-light); color: var(--accent); font-weight: 600; }

    /* Quiz styles */
    .quiz-option {
      padding: 14px 18px;
      border: 2px solid var(--surface-border);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition);
      background: var(--bg-2);
      font-size: 15px;
      text-align: left;
      color: var(--text);
      width: 100%;
    }

    .quiz-option:hover:not(:disabled) {
      border-color: var(--accent);
      background: var(--accent-light);
      color: var(--accent);
    }

    .quiz-option.selected { border-color: var(--accent); background: var(--accent-light); color: var(--accent); }
    .quiz-option.correct { border-color: var(--success) !important; background: rgba(16,185,129,0.1) !important; color: var(--success) !important; }
    .quiz-option.wrong { border-color: var(--danger) !important; background: rgba(239,68,68,0.1) !important; color: var(--danger) !important; }

    /* Animations */
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

    .fade-in { animation: fadeIn 0.3s ease forwards; }
    .slide-in { animation: slideIn 0.3s ease forwards; }

    /* Mobile */
    @media (max-width: 768px) {
      .sidebar { transform: translateX(-100%); }
      .sidebar.mobile-open { transform: translateX(0); }
      .main-content { margin-left: 0; }
      .page-content { padding: 20px 16px; }
      .hide-mobile { display: none !important; }
      .topbar { padding: 0 16px; }
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--text-3); border-radius: 100px; }

    /* Overlay */
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 90;
      backdrop-filter: blur(4px);
    }

    /* Auth page */
    .auth-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg);
      padding: 20px;
      position: relative;
      overflow: hidden;
    }

    .auth-page::before {
      content: '';
      position: absolute;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%);
      top: -200px;
      right: -100px;
      pointer-events: none;
    }

    .auth-page::after {
      content: '';
      position: absolute;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%);
      bottom: -100px;
      left: -100px;
      pointer-events: none;
    }

    .auth-card {
      width: 100%;
      max-width: 420px;
      padding: 40px;
      position: relative;
      z-index: 1;
    }

    /* Grid layouts */
    .subject-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .topics-grid {
      display: grid;
      gap: 12px;
    }

    /* Subject card */
    .subject-card {
      padding: 24px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .subject-card::before {
      content: '';
      position: absolute;
      top: -40px;
      right: -40px;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.06;
      transition: transform var(--transition);
    }

    .subject-card:hover::before { transform: scale(1.4); }

    .subject-icon {
      font-size: 32px;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      margin-bottom: 16px;
    }

    /* Topic row */
    .topic-row {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      cursor: pointer;
      transition: all var(--transition);
    }

    .topic-row:hover { background: var(--accent-light); }

    /* Score display */
    .score-display {
      text-align: center;
      padding: 40px;
    }

    .score-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      position: relative;
    }

    /* Avatar */
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 16px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      color: white;
      flex-shrink: 0;
    }

    /* Notification/alert */
    .alert {
      padding: 12px 16px;
      border-radius: var(--radius-md);
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .alert-warning { background: rgba(245,158,11,0.1); color: var(--warning); border: 1px solid rgba(245,158,11,0.2); }
    .alert-error { background: rgba(239,68,68,0.1); color: var(--danger); border: 1px solid rgba(239,68,68,0.2); }
    .alert-success { background: rgba(16,185,129,0.1); color: var(--success); border: 1px solid rgba(16,185,129,0.2); }
    .alert-info { background: rgba(6,182,212,0.1); color: var(--info); border: 1px solid rgba(6,182,212,0.2); }

    /* Mobile hamburger */
    .hamburger {
      width: 36px;
      height: 36px;
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      cursor: pointer;
      padding: 6px;
      border-radius: var(--radius-sm);
    }

    .hamburger span {
      width: 100%;
      height: 2px;
      background: var(--text);
      border-radius: 2px;
      transition: all var(--transition);
    }

    @media (max-width: 768px) {
      .hamburger { display: flex; }
    }

    /* Tabs */
    .tabs {
      display: flex;
      gap: 4px;
      background: var(--bg-3);
      padding: 4px;
      border-radius: var(--radius-md);
    }

    .tab {
      padding: 8px 20px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all var(--transition);
      color: var(--text-2);
      border: none;
      background: none;
      font-family: var(--font-main);
    }

    .tab.active {
      background: var(--bg-2);
      color: var(--accent);
      font-weight: 600;
      box-shadow: var(--shadow-sm);
    }

    /* Video iframe */
    .video-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      border-radius: var(--radius-lg);
    }

    .video-container iframe {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      border: none;
      border-radius: var(--radius-lg);
    }

    /* Stats card */
    .stat-card {
      padding: 20px 24px;
      text-align: center;
    }

    .stat-number {
      font-size: 32px;
      font-weight: 800;
      font-family: var(--font-mono);
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Divider */
    .divider {
      height: 1px;
      background: var(--surface-border);
      margin: 16px 0;
    }

    /* Page header */
    .page-header {
      margin-bottom: 28px;
    }

    .page-title {
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 6px;
    }

    .page-subtitle {
      color: var(--text-2);
      font-size: 15px;
    }

    /* Flex utils */
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .items-center { align-items: center; }
    .justify-between { justify-content: space-between; }
    .gap-8 { gap: 8px; }
    .gap-12 { gap: 12px; }
    .gap-16 { gap: 16px; }
    .gap-20 { gap: 20px; }
    .gap-24 { gap: 24px; }
    .mb-8 { margin-bottom: 8px; }
    .mb-12 { margin-bottom: 12px; }
    .mb-16 { margin-bottom: 16px; }
    .mb-20 { margin-bottom: 20px; }
    .mb-24 { margin-bottom: 24px; }
    .mt-8 { margin-top: 8px; }
    .mt-16 { margin-top: 16px; }
    .mt-24 { margin-top: 24px; }
    .w-full { width: 100%; }
    .text-sm { font-size: 13px; }
    .text-xs { font-size: 12px; }
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .text-accent { color: var(--accent); }
    .text-muted { color: var(--text-2); }
    .text-light { color: var(--text-3); }
    .text-success { color: var(--success); }
    .text-danger { color: var(--danger); }
    .text-warning { color: var(--warning); }

    .logo-text {
      font-size: 22px;
      font-weight: 800;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.5px;
    }

    .sidebar-logo {
      padding: 20px 16px;
      border-bottom: 1px solid var(--surface-border);
      margin-bottom: 8px;
    }

    /* Completed topic link */
    .topic-completed-title {
      color: var(--accent);
      text-decoration: underline;
      text-decoration-color: rgba(99,102,241,0.3);
    }
  `}</style>
);

// ============================================================
// UI COMPONENTS
// ============================================================
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="btn btn-ghost btn-sm" title="Toggle theme"
      style={{ width: 36, height: 36, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

function LanguageSwitcher() {
  const { lang, changeLang } = useLang();
  const flags = { uz: "🇺🇿", en: "🇬🇧", ru: "🇷🇺" };
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button className="btn btn-ghost btn-sm" onClick={() => setOpen((o) => !o)}
        style={{ gap: 4 }}>
        {flags[lang]} <span style={{ fontSize: 11 }}>▼</span>
      </button>
      {open && (
        <div className="glass-card" style={{
          position: "absolute", right: 0, top: "calc(100% + 8px)",
          minWidth: 120, padding: 6, zIndex: 200,
        }}>
          {Object.entries(flags).map(([l, f]) => (
            <button key={l} onClick={() => { changeLang(l); setOpen(false); }}
              className="nav-item" style={{ margin: 0, padding: "8px 12px", width: "100%",
                background: l === lang ? "var(--accent-light)" : "transparent" }}>
              {f} {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Avatar({ name, size = 40 }) {
  const initials = name ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U";
  return (
    <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.4 }}>
      {initials}
    </div>
  );
}

function StatusBadge({ status, t }) {
  const map = {
    completed: { cls: "badge-completed", icon: "●", label: t("completed") },
    inprogress: { cls: "badge-inprogress", icon: "●", label: t("inProgress") },
    onhold: { cls: "badge-onhold", icon: "●", label: t("onHold") },
    locked: { cls: "badge-locked", icon: "○", label: t("locked") },
  };
  const d = map[status] || map.locked;
  return (
    <span className={`badge ${d.cls}`}>
      <span>{d.icon}</span>
      {d.label}
    </span>
  );
}

function ProgressBar({ value, color, height = 6 }) {
  return (
    <div className="progress-bar" style={{ height }}>
      <div className="progress-fill" style={{
        width: `${Math.min(100, Math.max(0, value))}%`,
        background: color || undefined,
      }} />
    </div>
  );
}

function GlassCard({ children, style, className = "", onClick }) {
  return (
    <div className={`glass-card ${className}`} style={style} onClick={onClick}>
      {children}
    </div>
  );
}

// ============================================================
// AUTH PAGES
// ============================================================
function AuthPage({ onBack }) {
  const [mode, setMode] = useState("login");
  const { t } = useLang();
  const { login, register, continueAsGuest } = useAuth();

  const [form, setForm] = useState({ email: "", password: "", name: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) return;
    if (mode === "register" && form.password !== form.confirm) {
      setError(t("passwordMismatch"));
      return;
    }
    setLoading(true);
    try {
      if (mode === "login") await login(form.email, form.password);
      else await register(form.name || form.email.split("@")[0], form.email, form.password);
    } catch (e) {
      setError(t(e.message) || e.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-card fade-in">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="logo-text" style={{ fontSize: 30, marginBottom: 8 }}>EduUz</div>
          <p style={{ color: "var(--text-2)", fontSize: 14 }}>{t("tagline")}</p>
        </div>

        <div className="tabs mb-24">
          <button className={`tab ${mode === "login" ? "active" : ""}`} style={{ flex: 1 }} onClick={() => { setMode("login"); setError(""); }}>
            {t("login")}
          </button>
          <button className={`tab ${mode === "register" ? "active" : ""}`} style={{ flex: 1 }} onClick={() => { setMode("register"); setError(""); }}>
            {t("register")}
          </button>
        </div>

        <div className="flex flex-col gap-12">
          {mode === "register" && (
            <input className="input-field" placeholder={t("name")} value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          )}
          <input className={`input-field ${error ? "error" : ""}`} placeholder={t("email")}
            value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
          <input className={`input-field ${error ? "error" : ""}`} type="password"
            placeholder={t("password")} value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
          {mode === "register" && (
            <input className={`input-field ${error ? "error" : ""}`} type="password"
              placeholder={t("confirmPassword")} value={form.confirm}
              onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
          )}

          {error && <div className="alert alert-error" style={{ fontSize: 14 }}>⚠ {error}</div>}

          <button className="btn btn-primary btn-lg w-full" onClick={handleSubmit} disabled={loading}
            style={{ justifyContent: "center" }}>
            {loading ? "..." : mode === "login" ? t("login") : t("createAccount")}
          </button>

          <div className="divider" />

          <button className="btn btn-ghost w-full" onClick={continueAsGuest}
            style={{ justifyContent: "center", color: "var(--text-2)" }}>
            {t("guestMode")}
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--text-3)" }}>
          {mode === "login"
            ? <span>{t("noAccount")} <button onClick={() => setMode("register")} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>{t("register")}</button></span>
            : <span>{t("haveAccount")} <button onClick={() => setMode("login")} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>{t("login")}</button></span>
          }
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SIDEBAR
// ============================================================
function Sidebar({ activePage, setActivePage, mobileOpen, onClose }) {
  const { t } = useLang();
  const { user, isGuest, logout } = useAuth();

  const navItems = [
    { id: "dashboard", icon: "⊞", label: t("dashboard") },
    { id: "subjects", icon: "📚", label: t("subjects") },
    { id: "profile", icon: "👤", label: t("profile") },
  ];

  return (
    <>
      {mobileOpen && <div className="overlay" onClick={onClose} />}
      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-logo">
          <div className="flex items-center gap-12">
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: "white", fontWeight: 800,
            }}>E</div>
            <span className="logo-text">EduUz</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "8px 0" }}>
          {navItems.map((item) => (
            <button key={item.id}
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
              style={{ width: "calc(100% - 16px)", background: activePage === item.id ? "var(--accent-light)" : "transparent" }}
              onClick={() => { setActivePage(item.id); onClose(); }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--surface-border)" }}>
          {user ? (
            <div>
              <div className="flex items-center gap-12 mb-12">
                <Avatar name={user.name} size={36} />
                <div style={{ overflow: "hidden" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)" }}>Pro</div>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm w-full" onClick={logout}
                style={{ justifyContent: "center" }}>🚪 {t("logout")}</button>
            </div>
          ) : (
            <div>
              <div className="badge badge-locked mb-8">👤 {t("guestMode").replace("Continue as ", "")}</div>
              <div className="alert alert-warning text-xs" style={{ fontSize: 11, padding: "8px 10px" }}>
                {t("guestWarning")}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// ============================================================
// TOPBAR
// ============================================================
function Topbar({ activePage, onMenuToggle, t }) {
  const titles = {
    dashboard: t("dashboard"),
    subjects: t("subjects"),
    profile: t("profile"),
    topic: t("topics"),
  };
  return (
    <div className="topbar">
      <div className="flex items-center gap-16">
        <button className="hamburger" onClick={onMenuToggle}>
          <span /><span /><span />
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 700 }}>{titles[activePage] || activePage}</h1>
      </div>
      <div className="flex items-center gap-8">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD PAGE
// ============================================================
function DashboardPage({ setActivePage, setCurrentSubject }) {
  const { t, lang } = useLang();
  const { user, isGuest } = useAuth();
  const { lessonHistory, getTopicData } = useApp();

  const stats = useMemo(() => {
    let totalTests = 0, totalCorrect = 0, totalTopics = 0, completedTopics = 0;
    SUBJECTS.forEach((s) => {
      s.topics.forEach((topic) => {
        const data = getTopicData(s.id, topic.id);
        totalTopics++;
        if (data.status === "completed") completedTopics++;
        if (data.quizScore !== undefined) {
          totalTests += 10;
          totalCorrect += data.quizScore;
        }
      });
    });
    return { totalTests, totalCorrect, totalIncorrect: totalTests - totalCorrect, completedTopics, totalTopics };
  }, [getTopicData]);

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <h2 className="page-title">
          {user ? `${t("welcome")}, ${user.name}! 👋` : `${t("welcome")}! 👋`}
        </h2>
        <p className="page-subtitle">{t("startLearning")}</p>
      </div>

      {isGuest && (
        <div className="alert alert-warning mb-24">
          ⚠ {t("guestWarning")} — <strong>{t("loginToSave")}</strong>
        </div>
      )}

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 28 }}>
        {[
          { label: t("totalTests"), value: stats.totalTests, icon: "📝" },
          { label: t("correct"), value: stats.totalCorrect, icon: "✅" },
          { label: t("incorrect"), value: stats.totalIncorrect, icon: "❌" },
          { label: t("completed"), value: `${stats.completedTopics}/${stats.totalTopics}`, icon: "🏆" },
        ].map((s) => (
          <GlassCard key={s.label} className="stat-card">
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div className="stat-number">{s.value}</div>
            <div style={{ fontSize: 13, color: "var(--text-2)", marginTop: 4 }}>{s.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Subjects overview */}
      <GlassCard style={{ padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: 16 }}>📊 {t("progress")}</h3>
        <div className="flex flex-col gap-16">
          {SUBJECTS.map((subject) => {
            const total = subject.topics.length;
            const completed = subject.topics.filter((t) => getTopicData(subject.id, t.id).status === "completed").length;
            const pct = Math.round((completed / total) * 100);
            return (
              <div key={subject.id}>
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-8">
                    <span style={{ fontSize: 20 }}>{subject.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{SUBJECT_NAMES[lang][subject.id]}</span>
                  </div>
                  <span style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{pct}%</span>
                </div>
                <ProgressBar value={pct} color={subject.gradient} />
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Recent history */}
      {user && (
        <GlassCard style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>🕑 {t("recentLessons")}</h3>
          {lessonHistory.length === 0 ? (
            <p style={{ color: "var(--text-3)", fontSize: 14 }}>{t("noHistory")}</p>
          ) : (
            <div className="flex flex-col gap-8">
              {lessonHistory.slice(0, 5).map((h) => (
                <div key={h.topicId} className="flex items-center gap-12"
                  style={{ padding: "10px 0", borderBottom: "1px solid var(--surface-border)" }}>
                  <div style={{ fontSize: 20 }}>{SUBJECTS.find((s) => s.id === h.subjectId)?.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{TOPIC_NAMES[lang][h.topicId]}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>
                      {SUBJECT_NAMES[lang][h.subjectId]}
                    </div>
                  </div>
                  {h.quizScore !== undefined && (
                    <span style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
                      {h.quizScore}/10
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      )}
    </div>
  );
}

// ============================================================
// SUBJECTS PAGE
// ============================================================
function SubjectsPage({ setActivePage, setCurrentSubject }) {
  const { t, lang } = useLang();
  const { getTopicData } = useApp();

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <h2 className="page-title">📚 {t("subjects")}</h2>
        <p className="page-subtitle">{t("allTopics")}</p>
      </div>

      <div className="subject-grid">
        {SUBJECTS.map((subject) => {
          const total = subject.topics.length;
          const completed = subject.topics.filter((t) => getTopicData(subject.id, t.id).status === "completed").length;
          const pct = Math.round((completed / total) * 100);

          return (
            <GlassCard key={subject.id} className="subject-card" style={{ cursor: "pointer" }}
              onClick={() => { setCurrentSubject(subject.id); setActivePage("subject"); }}>
              <div className="subject-icon" style={{
                background: subject.gradient,
                boxShadow: `0 4px 16px ${subject.color}40`,
              }}>
                <span style={{ fontSize: 26 }}>{subject.icon}</span>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 6, color: subject.color }}>
                {SUBJECT_NAMES[lang][subject.id]}
              </h3>
              <p style={{ color: "var(--text-2)", fontSize: 13, marginBottom: 16 }}>
                {total} {t("topics")}
              </p>
              <ProgressBar value={pct} color={subject.gradient} height={8} />
              <div className="flex justify-between mt-8">
                <span style={{ fontSize: 12, color: "var(--text-3)" }}>{completed}/{total} {t("completed")}</span>
                <span style={{ fontSize: 12, color: subject.color, fontFamily: "var(--font-mono)", fontWeight: 700 }}>{pct}%</span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// SUBJECT DETAIL PAGE
// ============================================================
function SubjectPage({ subjectId, setActivePage, setCurrentTopic }) {
  const { t, lang } = useLang();
  const { getTopicStatus, getTopicData, updateTopicProgress } = useApp();
  const { user } = useAuth();
  const subject = SUBJECTS.find((s) => s.id === subjectId);
  if (!subject) return null;

  const getStatusColor = (status) => {
    const map = { completed: "#6366f1", inprogress: "#10b981", onhold: "#f59e0b", locked: "#8892b0" };
    return map[status] || map.locked;
  };

  return (
    <div className="page-content fade-in">
      <button className="btn btn-ghost btn-sm mb-20" onClick={() => setActivePage("subjects")}>
        ← {t("back")}
      </button>

      <div className="page-header">
        <div className="flex items-center gap-16 mb-4">
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: subject.gradient,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, boxShadow: `0 4px 20px ${subject.color}40`,
          }}>
            {subject.icon}
          </div>
          <div>
            <h2 className="page-title" style={{ marginBottom: 0 }}>{SUBJECT_NAMES[lang][subject.id]}</h2>
            <p className="page-subtitle">{subject.topics.length} {t("topics")}</p>
          </div>
        </div>
      </div>

      <GlassCard style={{ overflow: "hidden" }}>
        {subject.topics.map((topic, idx) => {
          const status = getTopicStatus(subject.id, topic.id);
          const data = getTopicData(subject.id, topic.id);
          const isLocked = status === "locked" && !user;
          const pct = data.quizScore !== undefined ? Math.round((data.quizScore / 10) * 100) : 0;

          const handleStatusChange = (newStatus) => {
            if (!user) return;
            if (newStatus === "inprogress" || newStatus === "onhold") {
              updateTopicProgress(subject.id, topic.id, { status: newStatus });
            }
          };

          return (
            <div key={topic.id}>
              <div className="topic-row">
                {/* Status dot */}
                <div style={{
                  width: 12, height: 12, borderRadius: "50%",
                  background: getStatusColor(status), flexShrink: 0,
                  boxShadow: `0 0 8px ${getStatusColor(status)}60`,
                }} />

                {/* Topic info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    className={status === "completed" ? "topic-completed-title" : ""}
                    style={{
                      fontWeight: 600, fontSize: 15,
                      cursor: "pointer",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      if (!user && !isGuest) return;
                      setCurrentTopic({ subjectId: subject.id, topicId: topic.id });
                      setActivePage("topic");
                    }}>
                    {TOPIC_NAMES[lang][topic.id]}
                  </div>
                  {data.quizScore !== undefined && (
                    <div style={{ marginTop: 6 }}>
                      <ProgressBar value={pct} color={subject.gradient} height={4} />
                    </div>
                  )}
                </div>

                {/* Score */}
                {data.quizScore !== undefined && (
                  <span style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: subject.color, whiteSpace: "nowrap" }}>
                    {data.quizScore}/10
                  </span>
                )}

                {/* Status badge */}
                <StatusBadge status={status} t={t} />

                {/* Actions */}
                {user && status !== "completed" && (
                  <div className="flex gap-8 hide-mobile">
                    {status !== "inprogress" && (
                      <button className="btn btn-ghost btn-sm" onClick={() => handleStatusChange("inprogress")}
                        style={{ fontSize: 11, padding: "4px 10px" }}>
                        🟢
                      </button>
                    )}
                    {status !== "onhold" && (
                      <button className="btn btn-ghost btn-sm" onClick={() => handleStatusChange("onhold")}
                        style={{ fontSize: 11, padding: "4px 10px" }}>
                        🟡
                      </button>
                    )}
                  </div>
                )}
              </div>
              {idx < subject.topics.length - 1 && <div className="divider" style={{ margin: "0 20px" }} />}
            </div>
          );
        })}
      </GlassCard>
    </div>
  );
}

// ============================================================
// TOPIC PAGE (Video + Quiz)
// ============================================================
function TopicPage({ subjectId, topicId, setActivePage }) {
  const { t, lang } = useLang();
  const { user } = useAuth();
  const { getTopicData, updateTopicProgress, addLessonHistory } = useApp();

  const subject = SUBJECTS.find((s) => s.id === subjectId);
  const topic = subject?.topics.find((tp) => tp.id === topicId);
  if (!subject || !topic) return null;

  const data = getTopicData(subjectId, topicId);
  const [tab, setTab] = useState("video");
  const [videoWatched, setVideoWatched] = useState(data.videoWatched || false);
  const [quizState, setQuizState] = useState({
    currentQ: data.quizProgress || 0,
    answers: data.quizAnswers || {},
    submitted: data.quizSubmitted || false,
    score: data.quizScore,
  });

  const handleVideoWatched = () => {
    setVideoWatched(true);
    if (user) {
      updateTopicProgress(subjectId, topicId, { videoWatched: true, status: data.status === "locked" || !data.status ? "inprogress" : data.status });
    }
  };

  const handleAnswer = (qIndex, optIndex) => {
    if (quizState.submitted) return;
    setQuizState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [qIndex]: optIndex },
    }));
  };

  const handleNext = () => {
    if (quizState.currentQ < topic.questions.length - 1) {
      setQuizState((prev) => ({ ...prev, currentQ: prev.currentQ + 1 }));
    }
  };

  const handleSubmitQuiz = () => {
    const score = topic.questions.reduce((acc, q, i) => acc + (quizState.answers[i] === q.answer ? 1 : 0), 0);
    const isCompleted = videoWatched && score === topic.questions.length;
    const newStatus = isCompleted ? "completed" : data.status || "inprogress";

    setQuizState((prev) => ({ ...prev, submitted: true, score }));

    if (user) {
      updateTopicProgress(subjectId, topicId, {
        quizScore: score,
        quizAnswers: quizState.answers,
        quizSubmitted: true,
        status: newStatus,
        videoWatched,
      });
      addLessonHistory({ subjectId, topicId, quizScore: score });
    }
  };

  const currentQ = topic.questions[quizState.currentQ];
  const pct = quizState.score !== undefined ? Math.round((quizState.score / topic.questions.length) * 100) : 0;

  return (
    <div className="page-content fade-in">
      <button className="btn btn-ghost btn-sm mb-20" onClick={() => setActivePage("subject")}>
        ← {t("back")}
      </button>

      <div className="page-header">
        <h2 className="page-title">{TOPIC_NAMES[lang][topicId]}</h2>
        <p className="page-subtitle">{SUBJECT_NAMES[lang][subjectId]}</p>
      </div>

      <div className="tabs mb-24">
        <button className={`tab ${tab === "video" ? "active" : ""}`} onClick={() => setTab("video")} style={{ flex: 1 }}>
          🎬 {t("video")} {videoWatched && "✓"}
        </button>
        <button className={`tab ${tab === "quiz" ? "active" : ""}`} onClick={() => setTab("quiz")} style={{ flex: 1 }}>
          📝 {t("quiz")} {quizState.submitted && `(${quizState.score}/10)`}
        </button>
      </div>

      {tab === "video" && (
        <div className="fade-in">
          <GlassCard style={{ padding: 24, marginBottom: 20 }}>
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${topic.videoId}`}
                title={TOPIC_NAMES[lang][topicId]}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen
              />
            </div>
          </GlassCard>

          {!videoWatched ? (
            <button className="btn btn-primary btn-lg" onClick={handleVideoWatched}
              style={{ display: "flex", margin: "0 auto" }}>
              ✓ {t("videoWatched")}
            </button>
          ) : (
            <div className="alert alert-success" style={{ justifyContent: "center" }}>
              ✅ {t("videoWatched")}
            </div>
          )}
        </div>
      )}

      {tab === "quiz" && (
        <div className="fade-in">
          {!quizState.submitted ? (
            <GlassCard style={{ padding: 28, maxWidth: 680 }}>
              <div className="flex justify-between items-center mb-20">
                <span style={{ fontSize: 14, color: "var(--text-3)" }}>
                  {quizState.currentQ + 1} / {topic.questions.length}
                </span>
                <ProgressBar value={((quizState.currentQ + 1) / topic.questions.length) * 100} />
                <span style={{ fontSize: 13, color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                  {Math.round(((quizState.currentQ + 1) / topic.questions.length) * 100)}%
                </span>
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, lineHeight: 1.5 }}>
                {currentQ.text}
              </h3>

              <div className="flex flex-col gap-12">
                {currentQ.options.map((opt, i) => (
                  <button key={i} className={`quiz-option ${quizState.answers[quizState.currentQ] === i ? "selected" : ""}`}
                    onClick={() => handleAnswer(quizState.currentQ, i)}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, marginRight: 10, color: "var(--text-3)" }}>
                      {["A", "B", "C", "D"][i]}.
                    </span>
                    {opt}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-24">
                {quizState.currentQ < topic.questions.length - 1 ? (
                  <button className="btn btn-primary" onClick={handleNext}
                    disabled={quizState.answers[quizState.currentQ] === undefined}
                    style={{ marginLeft: "auto" }}>
                    {t("nextQuestion")} →
                  </button>
                ) : (
                  <button className="btn btn-primary btn-lg"
                    disabled={Object.keys(quizState.answers).length < topic.questions.length}
                    onClick={handleSubmitQuiz} style={{ marginLeft: "auto" }}>
                    ✓ {t("submitQuiz")}
                  </button>
                )}
              </div>
            </GlassCard>
          ) : (
            <div className="fade-in">
              {/* Score summary */}
              <GlassCard className="score-display mb-20" style={{ maxWidth: 480, margin: "0 auto 20px" }}>
                <div className="score-circle" style={{
                  background: `conic-gradient(var(--accent) ${pct * 3.6}deg, var(--bg-3) 0deg)`,
                  boxShadow: `0 0 0 8px var(--bg-2), 0 0 0 10px var(--accent-light)`,
                }}>
                  <div style={{
                    position: "absolute", inset: 8, borderRadius: "50%",
                    background: "var(--bg-2)", display: "flex",
                    flexDirection: "column", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 30, fontWeight: 800, fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
                      {pct}%
                    </span>
                    <span style={{ fontSize: 12, color: "var(--text-3)" }}>{quizState.score}/{topic.questions.length}</span>
                  </div>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
                  {pct >= 80 ? "🎉 Zo'r!" : pct >= 50 ? "👍 Yaxshi!" : "📚 Yana o'qing"}
                </h3>
                <div className="flex gap-24" style={{ justifyContent: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 800, fontSize: 24, color: "var(--success)" }}>{quizState.score}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>{t("correct")}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 800, fontSize: 24, color: "var(--danger)" }}>{topic.questions.length - quizState.score}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>{t("incorrect")}</div>
                  </div>
                </div>

                {videoWatched && quizState.score === topic.questions.length && (
                  <div className="alert alert-success mt-16" style={{ justifyContent: "center" }}>
                    🏆 {t("completed")}!
                  </div>
                )}
                {(!videoWatched || quizState.score < topic.questions.length) && (
                  <div className="alert alert-info mt-16" style={{ fontSize: 13 }}>
                    ℹ {t("completeToUnlock")}
                    {!videoWatched && <span> — {t("watchVideo")}</span>}
                  </div>
                )}
              </GlassCard>

              {/* Question review */}
              <GlassCard style={{ padding: 24, maxWidth: 680 }}>
                <h4 style={{ fontWeight: 700, marginBottom: 16 }}>📋 {t("quiz")} — Review</h4>
                <div className="flex flex-col gap-16">
                  {topic.questions.map((q, i) => {
                    const userAnswer = quizState.answers[i];
                    const isCorrect = userAnswer === q.answer;
                    return (
                      <div key={q.id} style={{ paddingBottom: 16, borderBottom: "1px solid var(--surface-border)" }}>
                        <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 14 }}>
                          {i + 1}. {q.text}
                          <span style={{ marginLeft: 8 }}>{isCorrect ? "✅" : "❌"}</span>
                        </div>
                        <div className="flex flex-col gap-6">
                          {q.options.map((opt, oi) => (
                            <div key={oi} className={`quiz-option ${oi === q.answer ? "correct" : oi === userAnswer && !isCorrect ? "wrong" : ""}`}
                              style={{ cursor: "default", padding: "8px 14px", fontSize: 14 }}>
                              {["A","B","C","D"][oi]}. {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// PROFILE PAGE
// ============================================================
function ProfilePage() {
  const { t, lang } = useLang();
  const { user, isGuest } = useAuth();
  const { getTopicData, lessonHistory } = useApp();

  const subjectStats = useMemo(() => {
    return SUBJECTS.map((subject) => {
      let tests = 0, correct = 0;
      const total = subject.topics.length;
      let completed = 0;
      subject.topics.forEach((topic) => {
        const d = getTopicData(subject.id, topic.id);
        if (d.quizScore !== undefined) { tests += 10; correct += d.quizScore; }
        if (d.status === "completed") completed++;
      });
      const pct = tests > 0 ? Math.round((correct / tests) * 100) : 0;
      return { subject, tests, correct, incorrect: tests - correct, pct, completed, total };
    });
  }, [getTopicData]);

  if (!user && !isGuest) return null;

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <h2 className="page-title">👤 {t("profile")}</h2>
      </div>

      {/* User card */}
      <GlassCard style={{ padding: 28, marginBottom: 24 }}>
        <div className="flex items-center gap-20">
          <Avatar name={user?.name || "Guest"} size={64} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 22 }}>{user?.name || "Guest"}</div>
            {user?.email && <div style={{ color: "var(--text-2)", fontSize: 14, marginTop: 4 }}>{user.email}</div>}
            {isGuest && (
              <div className="badge badge-locked mt-8">👤 {t("guestMode")}</div>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Per-subject stats */}
      <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 16 }}>📊 {t("subjects")} {t("progress")}</h3>
      <div className="flex flex-col gap-16 mb-24">
        {subjectStats.map(({ subject, tests, correct, incorrect, pct, completed, total }) => (
          <GlassCard key={subject.id} style={{ padding: 22 }}>
            <div className="flex items-center gap-12 mb-16">
              <span style={{ fontSize: 28 }}>{subject.icon}</span>
              <span style={{ fontWeight: 700, fontSize: 16 }}>{SUBJECT_NAMES[lang][subject.id]}</span>
              <div style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", color: subject.color, fontWeight: 700, fontSize: 20 }}>
                {pct}%
              </div>
            </div>

            <ProgressBar value={pct} color={subject.gradient} height={8} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16 }}>
              {[
                { label: t("totalTests"), value: tests },
                { label: t("correct"), value: correct },
                { label: t("incorrect"), value: incorrect },
                { label: t("completed"), value: `${completed}/${total}` },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--accent)" }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP SHELL
// ============================================================
function AppShell() {
  const { t } = useLang();
  const { user, isGuest } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSetActivePage = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const renderPage = () => {
    if (activePage === "topic" && currentTopic) {
      return (
        <TopicPage
          subjectId={currentTopic.subjectId}
          topicId={currentTopic.topicId}
          setActivePage={(p) => {
            setActivePage(p === "subject" ? "subject" : p);
          }}
        />
      );
    }
    if (activePage === "subject" && currentSubject) {
      return (
        <SubjectPage
          subjectId={currentSubject}
          setActivePage={handleSetActivePage}
          setCurrentTopic={(t) => {
            setCurrentTopic(t);
            setActivePage("topic");
          }}
        />
      );
    }
    switch (activePage) {
      case "dashboard": return <DashboardPage setActivePage={handleSetActivePage} setCurrentSubject={setCurrentSubject} />;
      case "subjects": return <SubjectsPage setActivePage={(p) => { handleSetActivePage(p); }} setCurrentSubject={(id) => { setCurrentSubject(id); handleSetActivePage("subject"); }} />;
      case "profile": return <ProfilePage />;
      default: return <DashboardPage setActivePage={handleSetActivePage} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={handleSetActivePage}
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <div className="main-content">
        <Topbar
          activePage={activePage}
          onMenuToggle={() => setMobileMenuOpen((o) => !o)}
          t={t}
        />
        {renderPage()}
      </div>
    </div>
  );
}

// ============================================================
// ROOT
// ============================================================
function InnerApp() {
  const { user, isGuest } = useAuth();

  if (!user && !isGuest) {
    return <AuthPage />;
  }

  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <InnerApp />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
