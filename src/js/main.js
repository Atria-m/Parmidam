// Create hearts
function createHearts() {
  const heartsContainer = document.getElementById("hearts-container");
  heartsContainer.innerHTML = "";

  const isDarkMode = document.body.classList.contains("dark");
  const heartColor = isDarkMode ? "#F8BBD0" : "#FFB7C5";

  if (!isDarkMode) {
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = "❤";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = Math.random() * 100 + "vh";
      heart.style.fontSize = Math.random() * 20 + 10 + "px";
      heart.style.animationDuration = Math.random() * 10 + 5 + "s";
      heart.style.animationDelay = Math.random() * 5 + "s";
      heart.style.color = heartColor;
      heart.style.opacity = Math.random() * 0.5 + 0.5;
      heartsContainer.appendChild(heart);
    }
  }
}

// Create stars for dark mood
function createStars() {
  const starsContainer = document.getElementById("stars-container");
  starsContainer.innerHTML = "";

  const isDarkMode = document.body.classList.contains("dark");

  if (isDarkMode) {
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      const size = Math.random() * 2 + 1;
      star.style.width = size + "px";
      star.style.height = size + "px";

      star.style.left = Math.random() * 100 + "vw";
      star.style.top = Math.random() * 100 + "vh";

      const duration = Math.random() * 5 + 3;
      star.style.setProperty("--duration", duration + "s");
      star.style.animationDelay = Math.random() * 5 + "s";

      star.style.opacity = Math.random() * 0.7 + 0.3;

      starsContainer.appendChild(star);
    }
  }
}
createHearts();
createStars();

window.addEventListener("resize", () => {
  createHearts();
  createStars();
});

setInterval(() => {
  createHearts();
  createStars();
}, 60000);

// Music player system with enhanced shuffle functionality
const musicToggle = document.getElementById("musicToggle");
const headerMusicToggle = document.getElementById("headerMusicToggle");
const prevSongBtn = document.getElementById("prevSong");
const nextSongBtn = document.getElementById("nextSong");
const shuffleBtn = document.getElementById("shuffleBtn");
const nowPlayingSpan = document.getElementById("nowPlaying");
const bgMusic = document.getElementById("bgMusic");

// Enhanced playlist with song names
const playlist = [
  { url: "./public/music/04 R.E.M.mp3", title: "R.E.M" },
  { url: "./public/music/04_one_last_time (1).mp3", title: "One Last Time" },
  { url: "./public/music/07. People You Know.mp3", title: "People You Know" },
  {
    url: "./public/music/11. Selena Gomez - Love Will Remember.mp3",
    title: "Love Will Remember",
  },
  {
    url: "./public/music/11_one_of_the_girls_the_weeknd_jennie_lily_rose_depp_128.mp3",
    title: "One of the Girls",
  },
  { url: "./public/music/124740792.mp3", title: "Track 124740792" },
  {
    url: "./public/music/1647186050878146735Ring_My_Bells-140_-_audio_only_medium.m4a.mp3",
    title: "Ring My Bells",
  },
  {
    url: "./public/music/1676050779457903960Na_Tabestoon_Na_Paeez_140_audio_only_medium.m4a",
    title: "Na Tabestoon Na Paeez",
  },
  {
    url: "./public/music/81e961d4-3452-4c19-be53-79c3a740493b.mp3",
    title: "Track 81e961d4",
  },
  {
    url: "./public/music/8988b01c-1c3b-4537-b9c4-0fb7be26d638.mp3",
    title: "Track 8988b01c",
  },
  {
    url: "./public/music/@Free_RapHipHop - Dopamine - Maslak.mp3",
    title: "Dopamine - Maslak",
  },
  {
    url: "./public/music/ABBA - Money, Money, Money (1).flac",
    title: "Money, Money, Money",
  },
  {
    url: "./public/music/Arash Angels Lullaby Ft Helena.mp3",
    title: "Angels Lullaby",
  },
  {
    url: "./public/music/Arctic-Monkeys-I-Wanna-Be-Yours-320.mp3",
    title: "I Wanna Be Yours",
  },
  {
    url: "./public/music/Corpse Bride - Remains Of The Day.mp3",
    title: "Remains Of The Day",
  },
  { url: "./public/music/ESCAPE   (G)I-DLE.mp3", title: "ESCAPE (G)I-DLE" },
  { url: "./public/music/file_2006870.mp3", title: "Track file_2006870" },
  {
    url: "./public/music/Kina-Get-You-the-Moon-(Ft-Snow)-320.mp3",
    title: "Get You the Moon",
  },
  {
    url: "./public/music/Metro-Boomin-The-Weeknd-21-Savage-Creepin-320.mp3",
    title: "Creepin",
  },
  {
    url: "./public/music/Penomeco_페노메코_BOLO_Feat_YDG_가사_Color_Coded_Lyrics_Han_Rom_EngMP3.mp3",
    title: "BOLO",
  },
  {
    url: "./public/music/Prettymuch - Eyes Off You ( GandomMusic.ir ).mp3",
    title: "Eyes Off You",
  },
  {
    url: "./public/music/Ragheb Alama – Nassini El Donia.mp3",
    title: "Nassini El Donia",
  },
  { url: "./public/music/Rauf_Faik_I_Love_You_320.mp3", title: "I Love You" },
  {
    url: "./public/music/Sami Beigi Donya Maleh Maast Ft Erfan.mp3",
    title: "Donya Maleh Maast",
  },
  {
    url: "./public/music/Selena-Gomez-Look-at-her-now.mp3",
    title: "Look at Her Now",
  },
  {
    url: "./public/music/selena-gomez-lose-you-to-love-me.mp3",
    title: "Lose You To Love Me",
  },
  { url: "./public/music/Tehran Kenaret_Saaren.mp3", title: "Tehran Kenaret" },
  {
    url: "./public/music/the-heart-wants-what-it-wants.mp3",
    title: "The Heart Wants What It Wants",
  },
  { url: "./public/music/Zayn-Malik-Pillowtalk-320.mp3", title: "Pillowtalk" },
  { url: "./public/music/روز_دوست_دختر.m4a", title: "روز دوست دختر" },
  { url: "./public/music/پارمیدا.mp3", title: "پارمیدام" },
];

let currentSongIndex = 0;
let isMusicPlaying = false;
let isShuffleOn = false;
let shuffleHistory = [];
let normalHistory = [];

function updateToggleButtons() {
  if (isMusicPlaying) {
    musicToggle.innerHTML = '<i class="fas fa-pause text-lg"></i>';
    headerMusicToggle.innerHTML = '<i class="fas fa-pause text-[15px]"></i>';
    headerMusicToggle.classList.add("text-pink-500", "dark:text-purple-300");
    headerMusicToggle.classList.remove("text-gray-600", "dark:text-gray-300");
  } else {
    musicToggle.innerHTML = '<i class="fas fa-play text-lg"></i>';
    headerMusicToggle.innerHTML = '<i class="fas fa-music text-[15px]"></i>';
    headerMusicToggle.classList.remove("text-pink-500", "dark:text-purple-300");
    headerMusicToggle.classList.add("text-gray-600", "dark:text-gray-300");
  }
}

// Initialize player
function loadSong(index) {
  currentSongIndex = index;
  const song = playlist[index];
  bgMusic.src = song.url;
  nowPlayingSpan.textContent = song.title || "Unknown Track";
  document.title = `Now Playing: ${song.title || "Music Player"}`;

  if (isShuffleOn) {
    shuffleHistory.push(index);
  } else {
    normalHistory.push(index);
  }

  // Auto-play
  if (isMusicPlaying) {
    bgMusic.play().catch((e) => console.log("Auto-play prevented:", e));
  }

  updateToggleButtons();
}

// Get next song
function getNextIndex() {
  if (isShuffleOn) {
    return getRandomUniqueIndex();
  }
  return (currentSongIndex + 1) % playlist.length;
}

// Get previous song
function getPrevIndex() {
  if (isShuffleOn && shuffleHistory.length > 1) {
    shuffleHistory.pop();
    return shuffleHistory.pop();
  } else if (!isShuffleOn && normalHistory.length > 1) {
    normalHistory.pop();
    return normalHistory.pop();
  }
  return (currentSongIndex - 1 + playlist.length) % playlist.length;
}

// Get random unique
function getRandomUniqueIndex() {
  if (shuffleHistory.length >= playlist.length) {
    shuffleHistory = [];
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * playlist.length);
  } while (
    shuffleHistory.includes(randomIndex) &&
    shuffleHistory.length < playlist.length
  );

  return randomIndex;
}

// Toggle play/pause
function togglePlayPause() {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.innerHTML = '<i class="fas fa-play text-lg"></i>';
  } else {
    bgMusic
      .play()
      .then(() => {
        musicToggle.innerHTML = '<i class="fas fa-pause text-lg"></i>';
      })
      .catch((e) => {
        console.log("Playback failed:", e);
        musicToggle.innerHTML = '<i class="fas fa-play text-lg"></i>';
      });
  }
  isMusicPlaying = !isMusicPlaying;
  updateToggleButtons();
}

// Event listeners
musicToggle.addEventListener("click", togglePlayPause);
headerMusicToggle.addEventListener("click", togglePlayPause);

nextSongBtn.addEventListener("click", () => {
  loadSong(getNextIndex());
  if (isMusicPlaying) bgMusic.play();
});

prevSongBtn.addEventListener("click", () => {
  loadSong(getPrevIndex());
  if (isMusicPlaying) bgMusic.play();
});

shuffleBtn.addEventListener("click", () => {
  isShuffleOn = !isShuffleOn;
  shuffleBtn.setAttribute("aria-pressed", isShuffleOn.toString());

  if (isShuffleOn) {
    shuffleBtn.classList.add("text-[#ff85a2]", "dark:text-[#7dcfff]");
    shuffleBtn.classList.remove("text-gray-500", "dark:text-gray-400");
  } else {
    shuffleBtn.classList.add("text-gray-500", "dark:text-gray-400");
    shuffleBtn.classList.remove("text-[#ff85a2]", "dark:text-[#7dcfff]");
  }

  if (isShuffleOn) {
    shuffleHistory = [currentSongIndex];
  }
});

bgMusic.addEventListener("ended", () => {
  loadSong(getNextIndex());
  if (isMusicPlaying) bgMusic.play();
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    togglePlayPause();
  } else if (e.code === "ArrowRight") {
    nextSongBtn.click();
  } else if (e.code === "ArrowLeft") {
    prevSongBtn.click();
  }
});

loadSong(0);
updateToggleButtons();

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function toggleTheme() {
  document.body.classList.toggle("dark");
  createHearts();
  createStars();

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.setAttribute("aria-pressed", isDark);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.setAttribute("aria-pressed", true);
  } else {
    document.body.classList.remove("dark");
    themeToggle.setAttribute("aria-pressed", false);
  }
} else if (prefersDark.matches) {
  document.body.classList.add("dark");
  themeToggle.setAttribute("aria-pressed", true);
}

themeToggle.addEventListener("click", toggleTheme);

// language Toggle
const languageToggle = document.getElementById("languageToggle");
const currentLanguage = document.getElementById("currentLanguage");

// translate texts
const translations = {
  heroTitle: {
    en: "For My Love",
    fa: "تقدیم به عشق من",
  },
  heroSubtitle: {
    en: "My Parmidam",
    fa: "پارمیدام",
  },
  heroDescription: {
    en: "Just wanted to say I love you today and always",
    fa: "فقط می‌خواستم بگم دوستت دارم، امروز و همیشه",
  },
  flowerButton: {
    en: "A Flower for You 🌸",
    fa: "یک گل برای تو 🌸",
  },
  quoteButton: {
    en: "From My Heart 💖",
    fa: "از ته دل 💖",
  },
  countdownTitle: {
    en: "Counting the Days",
    fa: "شمارش روزها",
  },
  countdownDays: {
    en: "Days",
    fa: "روز",
  },
  countdownHours: {
    en: "Hours",
    fa: "ساعت",
  },
  countdownMinutes: {
    en: "Minutes",
    fa: "دقیقه",
  },
  countdownSeconds: {
    en: "Seconds",
    fa: "ثانیه",
  },
  countdownText: {
    en: "Until our next anniversary on January 2, 2026",
    fa: "تا سالگرد بعدی ما در ۱۳ دی",
  },
  celebrationText: {
    en: " Happy Anniversary, my love 🎉",
    fa: " سالگردمون مبارک عشق قشنگم 🎉",
  },

  // Memories Section
  memoriesTitle: {
    en: "Sweet Reminiscences",
    fa: "یادهای شیرین و جاودانه",
  },
  memoriesSmileTitle: {
    en: "Your Smile",
    fa: "خندت",
  },
  memoriesSmileDesc: {
    en: "Every time you laugh, my world brightens your smile is the sweetest song that sings straight to my soul.",
    fa: "هر بار که می‌خندی، دنیای من روشن‌تر میشه خندت شیرین‌ ترین نغمه‌ای هست که مستقیم به عمق روحم میرسه.",
  },
  memoriesFirstKissTitle: {
    en: "Our First Kiss",
    fa: "اولین بوسمون",
  },
  memoriesFirstKissDesc: {
    en: "That gentle moment our lips met for the first time soft, nervous, and yet so full of love. I’ll never forget how my heart raced for you.",
    fa: "اون لحظه‌ی لطیف که برای اولین بار لب‌هامون همدیگه رو پیدا کردن  پر از عشق، با یه دل‌شوره‌ی شیرین. هیچ‌وقت اون تپش‌های عاشقانه‌ی قلبم رو فراموش نمی‌کنم.",
  },
  memoriesBirthdayTitle: {
    en: "Your Birthday",
    fa: "تولدت",
  },
  memoriesBirthdayDesc: {
    en: "The day you were born, love found its way into the world and years later, into my heart.",
    fa: "روزی که به دنیا اومدی، عشق پا به زمین گذاشت و سال‌ها بعد، وارد قلب من شد.",
  },

  // modal close button
  modalClose: {
    en: "Close",
    fa: "بستن",
  },

  // flower messages
  flowerMessages: {
    en: [
      "For my sweet princess ",
      "For my little cutie ",
      "For my Parmidam ",
      "For my beautiful girl ",
    ],
    fa: [
      "تقدیم به پرنسس قشنگم ",
      "تقدیم دختر کوشولوم ",
      "تقدیم به پارمیدام ",
      "تقدیم به دختر قشنگم ",
    ],
  },

  // quotes
  loveQuotes: {
    en: [
      {
        text: "You're not just my love, you're my peace, my safe place, my everything.",
      },
      { text: "I fall for you more and more every single day." },
      {
        text: "Your smile is my favorite sight, your voice is my favorite sound.",
      },
      { text: "No matter how dark the day is, your love makes it light." },
      { text: "With you, love feels like coming home." },
      { text: "My heart is yours, forever and always." },
      { text: "You're the reason I believe in love." },
      { text: "Your love is my favorite story." },
      { text: "Even silence feels perfect when I’m with you." },
      {
        text: "You're the kind of magic I never believed existed until I met you.",
      },
      { text: "If I could, I’d choose you in every lifetime." },
      { text: "Being yours is the best thing I’ve ever been." },
      { text: "You are my soft place to land and the wings that let me fly." },
      { text: "You’re not just in my heart — you are my heart." },
      { text: "Every heartbeat whispers your name." },
    ],
    fa: [
      { text: "تو نه فقط عشقی، آرامش منی، دلیل لبخندام، دنیام." },
      {
        text: "هر روز عاشق‌ترت می‌شم، حتی وقتی فکر می‌کنم بیشتر از این ممکن نیست.",
      },
      { text: "لبخندت قشنگ‌ترین تصویریه که هر روز می‌خوام ببینم." },
      { text: "کنار تو حتی سکوت هم شیرینه." },
      { text: "تو شدی خونه‌ی دلم، جایی که همیشه امنه." },
      { text: "قلبم رو بهت دادم، چون می‌دونم دستای تو امن‌ترین جاست." },
      { text: "با تو بودن، مثل نفس کشیدنه؛ طبیعی، اما حیاتی." },
      {
        text: "دوستت دارم، نه فقط به خاطر اینکه کی هستی، بلکه به خاطر اینکه با تو بودن منو بهتر می‌کنه.",
      },
      { text: "تو همون حس نابی هستی که همیشه دنبالش بودم." },
      { text: "اگه هزار بار دیگه هم زندگی کنم، باز تو رو انتخاب می‌کنم." },
      { text: "هر لحظه‌م با تو، یه خاطره‌ی طلاییه." },
      { text: "من با تو کامل شدم، با تو آرام گرفتم، با تو زندگی رو فهمیدم." },
      { text: "حتی اگه همه دنیا پشت کنن، نگاه تو برام کافیه." },
      { text: "تو شدی دلیل عاشق موندنم، بعد از همه‌ی سختی‌ها." },
      { text: "دل من، با بودن تو، دیگه چیزی کم نداره." },
    ],
  },

  // Our Story Section
  momentsForeverTitle: {
    en: "Moments Forever in My Heart",
    fa: "لحظه‌هایی که همیشه در قلبمه",
  },
  firstHugTitle: {
    en: "That First Hug – When My Heart Knew",
    fa: "اولین آغوش ، جایی که قلبم فهمید",
  },
  firstHugDesc: {
    en: `We met through a friend, just a casual day. But as we said goodbye, standing near the metro, you hugged me. And in that brief embrace, something shifted inside me, a softness, a spark, a silent whisper in my chest: This isn't just a moment. She's going to mean more.`,
    fa: `یه روز معمولی بود، آشنا شدیم. اما وقتی کنار مترو خداحافظی کردیم، آغوشت مثل آرام‌ ترین زلزله، منو لرزوند... یه چیزی توی قلبم تکون خورد – یه نرمی، یه جرقه، یه نجوا که گفت: این فقط یه لحظه نبود... قراره مهم‌تر از اینا بشه.`,
  },
  firstKissTitle: {
    en: "Our First Kiss , No More Hiding",
    fa: "اولین بوسمون ، وقتی دیگه چیزی پنهون نموند",
  },
  firstKissDesc: {
    en: `You knew how I felt long before I said a word. But with your soft insistence, I finally confessed… And then you smiled, said "I feel the same", and we sealed it all with our very first kiss.`,
    fa: `تو خیلی قبل‌ تر از اینکه چیزی بگم، حسمو می‌دونستی. با اون اصرار شیرینت ازم اعتراف گرفتی… لبخند زدی و گفتی "منم همین حسو دارم" و اون لحظه، همه‌چی با اولین بوسه‌مون واقعی شد.`,
  },
  dreamingForeverTitle: {
    en: "Dreaming Our Forever",
    fa: "رویای همیشگی ما",
  },
  dreamingForeverDesc: {
    en: `I often imagine our future , Padra’s sweet laugh, Atrina and Adrina’s sleepy hugs, peaceful mornings with you beside me. Just love, warmth, and our little world. This is all I dream of , you, me, our happy kids, and a life full of success, peace, and deep love.`,
    fa: `گاهی به آیندمون فکر می‌کنم ، خنده‌های پادرا، بغل‌های خواب‌آلود آترینا و آدرینا، صبح‌های آروم با حضور تو... فقط عشق، گرما، و دنیای کوچولوی ما. این همون چیزیه که همیشه آرزوشو دارم ، تو کنارم، بچه‌هامون شاد، و زندگی‌ای پر از موفقیت، آرامش و عشق واقعی.`,
  },
  peacefulDayTitle: {
    en: "That Peaceful Day",
    fa: "اون روز آروم",
  },
  peacefulDayDesc: {
    en: `No plans, no noise, just the two of us, holding each other close. You fell asleep in my arms, and I stayed still just to feel your warmth, your breathing soft and steady. That simple day became one of the sweetest memories of my life. Safe, quiet, full of love , like home.`,
    fa: `نه قراری، نه صدایی… فقط من و تو، توی آغوش هم. خواب بودی تو بغلم، نفس‌هات آروم، و من بی‌ حرکت مونده بودم تا فقط گرمای تنتو حس کنم. یکی از قشنگترین حس‌های عمرم همون روز ساده بود... آروم، امن، پر از عشق ، درست مثل خونه.`,
  },

  // Love Gallery Section
  galleryTitle: {
    en: "Our Love Gallery",
    fa: "گالری عشق ما",
  },
  loadMorePhotos: {
    en: "More Photos",
    fa: "عکس‌های بیشتر",
  },

  // footer section
  footerText: {
    en: "Made with all my Love for Parmidam, my forever love, on this special Girlfriend's Day",
    fa: "ساخته شده با تمام عشقم برای پامیدام، عشق همیشگیم، در این روز خاص دوست دختر",
  },
};

function setLanguage(lang) {
  currentLanguage.textContent = lang === "en" ? "EN" : "FA";
  localStorage.setItem("language", lang);
  window.dispatchEvent(new Event("languageChanged"));

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key][lang];
    }
  });

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", lang === "fa");

  if (lang === "fa") {
    document.querySelectorAll(".countdown-number").forEach((el) => {
      el.textContent = el.textContent.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
    });
  } else {
    document.querySelectorAll(".countdown-number").forEach((el) => {
      el.textContent = el.textContent.replace(/[۰-۹]/g, (d) =>
        "۰۱۲۳۴۵۶۷۸۹".indexOf(d)
      );
    });
  }
}

const savedLang = localStorage.getItem("language") || "en";
setLanguage(savedLang);

languageToggle.addEventListener("click", () => {
  const newLang = currentLanguage.textContent === "EN" ? "fa" : "en";
  setLanguage(newLang);
});

document.addEventListener("DOMContentLoaded", () => {
  let lang = localStorage.getItem("language") || "en";

  const flowerBtn = document.getElementById("giveFlower");
  const quoteBtn = document.getElementById("generateQuote");

  const flowerImages = [
    "./public/images/flowers/roze sefid.jpg",
    "./public/images/flowers/banafsh roze.jpg",
    "./public/images/flowers/4.jpg",
    "./public/images/flowers/3.jpg",
    "./public/images/flowers/5.jpg",
    "./public/images/flowers/6.jpg",
    "./public/images/flowers/7.jpg",
    "./public/images/flowers/8.jpg",
    "./public/images/flowers/9.jpg",
    "./public/images/flowers/10.jpg",
    "./public/images/flowers/11.jpg",
    "./public/images/flowers/12.jpg",
    "./public/images/flowers/13.jpg",
    "./public/images/flowers/14.jpg",
    "./public/images/flowers/15.jpg",
    "./public/images/flowers/16.jpg",
    "./public/images/flowers/17.jpg",
    "./public/images/flowers/18.jpg",
    "./public/images/flowers/19.jpg",
    "./public/images/flowers/20.jpg",
  ];

  // flower container
  flowerBtn.addEventListener("click", () => {
    document.getElementById("flowerModal")?.remove();

    const img = flowerImages[Math.floor(Math.random() * flowerImages.length)];
    const msgList = translations.flowerMessages[lang];
    const msg = msgList[Math.floor(Math.random() * msgList.length)];
    const closeText = translations.modalClose[lang];

    const modal = document.createElement("div");
    modal.id = "flowerModal";
    modal.className =
      "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm";

    const box = document.createElement("div");
    box.className =
      "bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-4 animate-fade-in";

    box.innerHTML = `
      <img src="${img}" alt="Flower" class="rounded-xl shadow-md mx-auto w-full h-[450px] object-cover" />
      <p class="text-xl font-semibold text-pink-600 dark:text-pink-400">${msg}</p>
      <button class="mt-2 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition" id="closeModal">${closeText}</button>
    `;

    modal.appendChild(box);
    document.body.appendChild(modal);

    document
      .getElementById("closeModal")
      .addEventListener("click", () => modal.remove());
  });

  // quit container
  quoteBtn.addEventListener("click", () => {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const quoteList = translations.loveQuotes[lang];
    const q = quoteList[Math.floor(Math.random() * quoteList.length)];

    quoteDisplay.innerHTML = `
      <div class="max-w-xl mx-auto px-6 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-md animate-fade-in">
        <p class="text-lg italic">"${q.text}"</p>
      </div>
    `;
  });

  const updateLangDynamic = () => {
    lang = localStorage.getItem("language") || "en";
  };

  window.addEventListener("languageChanged", updateLangDynamic);
});

// MAIN COUNTDOWN TIMER TO FEBRUARY 14, 2026
document.addEventListener("DOMContentLoaded", () => {
  const flowerImages = ["./public/images/Anniversary/1.jpg"];

  const translations = {
    countdownText: {
      en: "Until our next anniversary on January 2, 2026",
      fa: "تا سالگرد بعدی ما در ۱۳ دی",
    },
    celebrationText: {
      en: " Happy Anniversary, my love 🎉",
      fa: " سالگردمون مبارک عشق قشنگم 🎉",
    },
  };
  let lang = localStorage.getItem("language") || "en";

  const updateLangDynamic = () => {
    lang = localStorage.getItem("language") || "en";
    updateCountdown();
  };
  window.addEventListener("languageChanged", updateLangDynamic);

  const countdownTextEl = document.querySelector("[data-i18n='countdownText']");

  const getTargetDate = () => new Date("2026-01-02T00:00:00").getTime();

  let targetDate = getTargetDate();
  let celebrationShown = false;
  let celebrationStartTime = null;

  const toPersianNumber = (num) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return String(num).replace(/\d/g, (d) => persianDigits[d]);
  };

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const isRTL = document.documentElement.getAttribute("dir") === "rtl";

    const format = (n) => {
      const withPad = String(n).padStart(2, "0");
      return isRTL ? toPersianNumber(withPad) : withPad;
    };

    if (
      celebrationStartTime &&
      now - celebrationStartTime >= 24 * 60 * 60 * 1000
    ) {
      celebrationShown = false;
      celebrationStartTime = null;
      targetDate = getTargetDate();
    }

    if (distance <= 0) {
      if (!celebrationShown) {
        celebrationShown = true;
        celebrationStartTime = now;
        showCelebrationModal();
      }

      countdownTextEl.textContent =
        translations.celebrationText[lang] || translations.celebrationText.en;
      ["days", "hours", "minutes", "seconds"].forEach((unit) => {
        document.getElementById(`countdown-${unit}`).textContent = format(0);
      });
      return;
    }

    countdownTextEl.textContent =
      translations.countdownText[lang] || translations.countdownText.en;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown-days").textContent = format(days);
    document.getElementById("countdown-hours").textContent = format(hours);
    document.getElementById("countdown-minutes").textContent = format(minutes);
    document.getElementById("countdown-seconds").textContent = format(seconds);
  };

  function showCelebrationModal() {
    const modal = document.getElementById("celebrationModal");
    const img = flowerImages[Math.floor(Math.random() * flowerImages.length)];
    document.getElementById("celebrationImg").src = img;
    modal.classList.remove("hidden");
  }

  function closeModal() {
    const modal = document.getElementById("celebrationModal");
    modal.classList.add("hidden");
    celebrationShown = false;
    celebrationStartTime = null;
    targetDate = getTargetDate();
    countdownTextEl.textContent =
      translations.countdownText[lang] || translations.countdownText.en;
    updateCountdown();
  }

  document
    .getElementById("closeCelebration")
    .addEventListener("click", closeModal);

  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// Photo Gallery
const photoGallery = document.getElementById("photoGallery");
const loadMorePhotosBtn = document.getElementById("loadMorePhotos");
let currentIndex = 0;

const allPhotos = [
  "./public/images/Gallery section/photo_5787642468186049294_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049295_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049296_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049297_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049298_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049299_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049300_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049301_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049302_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049303_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049304_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049305_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049306_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049307_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049308_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049309_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049310_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049311_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049312_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049313_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049314_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049315_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049316_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049317_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049318_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049320_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049321_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049322_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049323_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049325_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049326_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049327_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049328_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049329_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049330_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049331_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049332_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049333_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049334_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049335_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049337_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049338_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049339_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049340_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049341_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049342_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049343_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049350_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049354_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049355_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049356_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049357_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049358_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049359_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049360_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049361_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049362_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049375_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049376_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049377_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049378_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049379_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049380_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049381_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049382_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049383_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049384_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049385_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049386_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049387_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049388_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049389_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049390_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049391_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049392_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049393_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049394_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049395_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049396_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049397_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049398_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049399_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049400_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049401_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049402_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049404_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049405_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049406_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049407_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049408_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049409_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049410_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049411_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049412_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049413_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049414_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049415_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049416_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049417_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049418_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049419_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049420_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049421_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049422_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049423_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049424_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049425_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049426_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049427_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049428_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049430_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049431_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049432_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049433_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049434_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049435_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049437_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049438_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049439_y (1).jpg",
  "./public/images/Gallery section/photo_5787642468186049440_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049441_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049442_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049443_y.jpg",
  "./public/images/Gallery section/photo_5787642468186049444_y.jpg",
  "public/images/Anniversary/3.jpg",
  "public/images/Anniversary/2.jpg",
];

let remainingPhotos = [...allPhotos];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadPhotos() {
  if (remainingPhotos.length === 0) {
    loadMorePhotosBtn.disabled = true;
    loadMorePhotosBtn.textContent = "No more photos";
    return;
  }

  // Pick 8 random items
  const photosToLoad = remainingPhotos.splice(0, 8);

  photosToLoad.forEach((photoUrl) => {
    const galleryItem = document.createElement("div");
    galleryItem.className =
      "gallery-item rounded-xl overflow-hidden transition-transform duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30";

    const img = document.createElement("img");
    img.src = photoUrl;
    img.alt = "Our memory";
    img.className =
      "w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110";

    galleryItem.appendChild(img);
    photoGallery.appendChild(galleryItem);
  });
}

remainingPhotos = shuffleArray(remainingPhotos);
loadPhotos();

loadMorePhotosBtn.addEventListener("click", () => {
  loadPhotos();
});
