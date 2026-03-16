import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Music, VolumeX, Trash2, ChevronRight } from "lucide-react";

const CORRECT_PASSWORD = "190307";
const TOTAL_DIGITS = 6;

// Tenor Embed Component - Fixed version
const TenorGifEmbed = ({ postId, width = "100%" }) => {
  const embedRef = useRef(null);

  useEffect(() => {
    // Load Tenor embed script dynamically
    const loadScript = () => {
      if (window.TenorEmbed) {
        // Script already loaded, just trigger embed
        window.TenorEmbed();
        return;
      }

      // Create and load script
      const script = document.createElement('script');
      script.src = 'https://tenor.com/embed.js';
      script.async = true;
      script.onload = () => {
        // Trigger embed after script loads
        setTimeout(() => {
          if (window.TenorEmbed) {
            window.TenorEmbed();
          }
        }, 200);
      };
      document.body.appendChild(script);
    };

    loadScript();

    // Re-trigger when postId changes
    if (window.TenorEmbed) {
      const timer = setTimeout(() => {
        window.TenorEmbed();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [postId]);

  return (
    <div
      ref={embedRef}
      className="tenor-gif-embed"
      data-postid={postId}
      data-share-method="host"
      data-aspect-ratio="1"
      data-width={width}
      style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    />
  );
};

// Typing Effect Component
const TypingEffect = ({ text, speed = 50, className = "", style = {} }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span className={className} style={style}>
      {displayText}
      {index < text.length && (
        <span
          className="inline-block ml-1 w-0.5 h-5 bg-blue-600 dark:bg-blue-400 animate-pulse"
          style={{ animation: 'blink 1s infinite' }}
        />
      )}
    </span>
  );
};

const ConfettiPiece = ({ emoji, delay, left, duration, size }) => (
  <div
    className="fixed pointer-events-none z-10"
    style={{
      left: `${left}%`,
      top: "-40px",
      fontSize: `${size}px`,
      animation: `confettiFall ${duration}s linear ${delay}s infinite`,
    }}
  >
    {emoji}
  </div>
);

const MusicToggle = ({ musicOn, setMusicOn }) => (
  <button
    onClick={() => setMusicOn(!musicOn)}
    className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center border-2 border-blue-400 dark:border-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
    aria-label={musicOn ? "Mute music" : "Play music"}
  >
    {musicOn ? (
      <Music className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    ) : (
      <VolumeX className="w-5 h-5 text-blue-400 dark:text-blue-500" />
    )}
  </button>
);

const PageWrapper = ({ children, isVisible }) => (
  <div
    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
      isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-8 pointer-events-none"
    }`}
  >
    {children}
  </div>
);

const BouncingCharacter = ({ emoji = "🐱", size = "text-7xl" }) => (
  <div className="flex flex-col items-center justify-center">
    <div
      className={`${size} select-none`}
      style={{ animation: "bounce 1.2s ease-in-out infinite" }}
    >
      {emoji}
    </div>
    <div
      className="w-16 h-3 bg-blue-200 dark:bg-blue-800 rounded-full mt-2 opacity-40"
      style={{ animation: "shadowPulse 1.2s ease-in-out infinite" }}
    />
  </div>
);

const DotIndicator = ({ filled }) => (
  <div
    className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
      filled
        ? "bg-blue-600 dark:bg-blue-400 border-blue-600 dark:border-blue-400 scale-110"
        : "bg-transparent border-blue-300 dark:border-blue-600"
    }`}
  />
);

const NumericKey = ({ value, onClick, isBackspace = false }) => (
  <button
    onClick={() => onClick(value)}
    className={`w-20 h-16 rounded-2xl font-semibold text-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md ${
      isBackspace
        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center"
        : "bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-gray-700"
    }`}
    aria-label={isBackspace ? "Backspace" : `Number ${value}`}
  >
    {isBackspace ? <Trash2 className="w-6 h-6" /> : value}
  </button>
);

const WelcomePage = ({ onYes }) => {
  const [noClicked, setNoClicked] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleNo = () => {
    setNoClicked(true);
    setNoPosition({
      x: Math.random() * 100 - 50,
      y: Math.random() * 60 - 30,
    });
    setTimeout(() => setNoClicked(false), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full">
        <div className="relative">
          <div
            className="absolute inset-0 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 blur-2xl"
            style={{ animation: "pulse 3s ease-in-out infinite" }}
          />
          {/* Direct GIF URL - ganti XXXXX dengan direct URL dari Tenor */}
          <img
            src="https://media.tenor.com/sOVYL1RsYyYAAAAj/munch-face.gif"  // Ganti ini dengan direct URL dari Tenor
            className="w-40 h-40 object-contain animate-bounce"
            alt="welcome gif"
            onError={(e) => {
              console.error('GIF failed to load:', e.target.src);
              // Fallback ke emoji jika gagal
              e.target.style.display = 'none';
            }}
          />
        </div>

        <div className="text-center space-y-2">
          <h1
            className="text-2xl font-bold text-blue-800 dark:text-blue-200"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Are you readyy to open
          </h1>
          <h1
            className="text-3xl font-bold text-blue-800 dark:text-blue-200"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            thisss?
          </h1>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={onYes}
            className="px-10 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-300 dark:shadow-blue-900 transition-all duration-300 hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-105 hover:shadow-xl active:scale-95"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            yess
          </button>
          <button
            onClick={handleNo}
            className="px-10 py-3 bg-transparent text-blue-600 dark:text-blue-400 font-semibold rounded-full border-2 border-blue-400 dark:border-blue-500 transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              fontFamily: "'Poppins', sans-serif",
              transform: noClicked
                ? `translate(${noPosition.x}px, ${noPosition.y}px)`
                : "translate(0, 0)",
              transition: "transform 0.3s ease",
            }}
          >
            noo
          </button>
        </div>

        {noClicked && (
          <p
            className="text-blue-500 dark:text-blue-400 font-medium text-sm animate-pulse"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            too bad, click yess! 😤💕
          </p>
        )}
      </div>
    </div>
  );
};

const PasswordPage = ({ onCorrect }) => {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleKeyPress = useCallback(
    (value) => {
      if (success) return;
      if (value === "backspace") {
        setInput((prev) => prev.slice(0, -1));
        return;
      }
      if (input.length >= TOTAL_DIGITS) return;

      const newInput = input + value;
      setInput(newInput);

      if (newInput.length === TOTAL_DIGITS) {
        if (newInput === CORRECT_PASSWORD) {
          setSuccess(true);
          setTimeout(() => onCorrect(), 800);
        } else {
          setShake(true);
          setTimeout(() => {
            setShake(false);
            setInput("");
          }, 600);
        }
      }
    },
    [input, success, onCorrect]
  );

  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [null, "0", "backspace"],
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        {/* Direct GIF URL untuk password page - ganti YYYYY dengan direct URL */}
        <img
          src="https://media.tenor.com/arLtVbLvu10AAAAi/bubu-dudu-sseeyall.gif"  // Ganti ini dengan direct URL dari Tenor
          className="w-32 h-32 object-contain animate-bounce"
          alt="password gif"
          onError={(e) => {
            console.error('GIF failed to load:', e.target.src);
            e.target.style.display = 'none';
          }}
        />

        <div className="text-center space-y-1">
          <h2
            className="text-xl font-bold text-blue-800 dark:text-blue-200"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Hi love, ayo tebak passwordnya,
          </h2>
          <h2
            className="text-xl font-bold text-blue-800 dark:text-blue-200"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            I bet u knoww!!
          </h2>
        </div>

        <div
          className={`flex gap-3 my-2 ${shake ? "" : ""}`}
          style={{
            animation: shake
              ? "shakeAnimation 0.5s ease-in-out"
              : success
              ? "successPulse 0.5s ease-in-out"
              : "none",
          }}
        >
          {Array.from({ length: TOTAL_DIGITS }).map((_, i) => (
            <DotIndicator key={i} filled={i < input.length} />
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-2">
          {keys.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-3 justify-center">
              {row.map((key, keyIndex) =>
                key === null ? (
                  <div key={keyIndex} className="w-20 h-16" />
                ) : (
                  <NumericKey
                    key={keyIndex}
                    value={key}
                    onClick={handleKeyPress}
                    isBackspace={key === "backspace"}
                  />
                )
              )}
            </div>
          ))}
        </div>

        <p
          className="text-blue-400 dark:text-blue-500 text-sm mt-2"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          clue : your birthday
        </p>
      </div>
    </div>
  );
};

const generateConfettiItems = () => {
  const items = [];
  // Emojis untuk confetti
  const emojis = ["🩷", "⭐", "🩷", "✨", "💫",  "🎉", "💖"];
  for (let i = 0; i < 10; i++) {
    items.push({
      id: i,
      emoji: emojis[i % emojis.length],
      delay: Math.random() * 90,
      left: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      size: 16 + Math.random() * 20,
    });
  }
  return items;
};

const BirthdayMessagePage = ({ onNext }) => {
  const confettiItems = useMemo(() => generateConfettiItems(), []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden relative">
      {confettiItems.map((item) => (
        <ConfettiPiece key={item.id} {...item} />
      ))}

      <div className="flex flex-col items-center gap-8 max-w-sm w-full z-20 relative">
        <img
          src="https://media.tenor.com/Zrr4L_Wd4JkAAAAi/bubu-rub-bubu-love-dudu.gif"  // Ganti ini dengan direct URL dari Tenor
          className=" h-40 object-contain animate-bounce"
          alt="password gif"
          onError={(e) => {
            console.error('GIF failed to load:', e.target.src);
            e.target.style.display = 'none';
          }}
        />
        <div className="text-center space-y-6">

          <TypingEffect
            text="Happy Birthday, my Matchaa"
            speed={100}
            className="text-2xl font-bold text-blue-800 dark:text-blue-200 leading-relaxed lineight-relaxed px-2 block"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />

          <TypingEffect
            text="To someone who means a lot to me, your kindness and patience fill my days with warmth and make life feel brighter, your presence in my life is a gift I'll always be grateful for. Thank you for always being here and supporting me. I hope this year brings youu beautiful moments, endless happiness , and everything your heart has been wishing for. 💫⭐"
            speed={30}
            className="text-base text-blue-600 dark:text-blue-300 leading-relaxed px-2 block"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
        </div>

        <button
          onClick={() => onNext(3)}  // Langsung ke page 3 (Memory Page)
          className="px-10 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-300 dark:shadow-blue-900 transition-all duration-300 hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-105 hover:shadow-xl active:scale-95 flex items-center gap-2 mt-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          About you 🎉<ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const ShuffleCard = ({ photo, index, isActive }) => {
  return (
    <div
      className={`
        absolute w-48 h-64 rounded-2xl overflow-hidden
        transition-all duration-500 ease-out
        ${isActive ? 'animate-cardShuffle' : ''}
      `}
      style={{
        left: `${50 + (index - 1.5) * 20}%`,
        transform: `translateX(-50%) rotate(${(index - 1.5) * 5}deg) ${isActive ? ' translateY(-40px) scale(1.15)' : ''}`,
        boxShadow: isActive ? '0 30px 60px rgba(0,0,0,0.4)' : '0 10px 20px rgba(0,0,0,0.2)',
        zIndex: isActive ? 50 : 10 + index,
      }}
    >
      {/* Photo as background */}
      <img
        src={photo.image}
        alt={photo.caption}
        className="w-full h-full object-cover"
        onError={(e) => {
          console.error('Image failed to load:', e.target.src);
          e.target.style.display = 'none';
        }}
      />

      {/* Overlay with caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl">
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-white text-sm font-medium px-2 drop-shadow-lg">
            {photo.caption}
          </p>
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute top-3 right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <span className="text-white text-xs">✨</span>
        </div>
      )}
    </div>
  );
};

const MemoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1); // 1 = shuffle cards, 2 = single photo
  const [showFinal, setShowFinal] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0); // Track which card is currently active

  // 4 photos for shuffle cards page
  const shufflePhotos = [
    {
      id: 1,
      image: "/images/1.jpeg",
      caption: "",
      description: "Even if we aren't in a same place"
    },
    {
      id: 2,
      image: "/images/2.jpeg",
      caption: "",
      description: "Every moment with you is special"
    },
    {
      id: 3,
      image: "/images/3.jpeg",
      caption: "",
      description: "Making memories that last forever"
    },
    {
      id: 4,
      image: "/images/4.jpeg",
      caption: "",
      description: "Each day with you is a gift"
    }
  ];

  // 1 photo for final page
  const finalPhoto = {
    image: "/images/favouriteMemory.jpeg",
    caption: "Favorite memory",
    description: "Cute things you gift to mee and soo meaningfull for mee"
  };

  // Infinite sequential animation from left to right
  useEffect(() => {
    if (currentPage === 1) { // Only run on page 1
      const interval = setInterval(() => {
        setActiveCardIndex((prevIndex) => (prevIndex + 1) % shufflePhotos.length);
      }, 2500); // Change active card every 2.5 seconds

      return () => clearInterval(interval);
    }
  }, [currentPage, shufflePhotos.length]);

  // Quote Page - Final Page (CHECK THIS FIRST!)
  if (showQuote) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div
          className="flex flex-col items-center gap-8 text-center max-w-md"
          style={{ animation: "fadeInUp 1s ease-out" }}
        >
          {/* Decorative element */}
          <div className="text-6xl">❤️</div>

          {/* Quote */}
          <div className="space-y-6">
            <p
              className="text-xl md:text-2xl font-medium text-blue-800 dark:text-blue-200 leading-relaxed italic"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              "Akuu akan terus menjagaa hubungan ini yaa, ada atau tidak adanya aku didepanmu, doakuu akan selalu kuhadirkan untukmuu"
            </p>

            <div className="flex justify-center">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            </div>

            <p
              className="text-lg text-blue-600 dark:text-blue-400 font-medium"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              your cheesecake •
            </p>
          </div>

          {/* Floating hearts */}
          <div className="flex gap-3 mt-6">
            {["❤️", "✨", "❤️", "✨"].map((emoji, i) => (
              <span
                key={i}
                className="text-2xl"
                style={{
                  animation: `floatHeart 2s ease-in-out infinite ${i * 0.3}s`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showFinal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div
          className="flex flex-col items-center gap-6 text-center max-w-sm"
          style={{ animation: "fadeInUp 0.8s ease-out" }}
        >
          <img
            src="/gifs/Open Gift.gif"
            alt="Open Gift"
            className="w-50 h-50 object-contain"
            style={{ animation: "bounce 2s ease-in-out infinite" }}
            onError={(e) => {
              console.error('GIF failed to load:', e.target.src);
              e.target.style.display = 'none';
            }}
          />
          <h2
            className="text-2xl font-bold text-blue-800 dark:text-blue-200"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Thank youu for presence in my life, sweetie
          </h2>
          <p
            className="text-blue-600 dark:text-blue-300 leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
tetapp menjadii diri kamuu yaa, akuu akan ikut terus menjadii  supporter terbaikmuu. 🥳🥳
          </p>
          <div className="flex gap-2 mt-4">
            {["💖", "😽", "💖", "😽", "💖"].map((emoji, i) => (
              <span
                key={i}
                className="text-2xl"
                style={{
                  animation: `sparkle 1.5s ease-in-out infinite ${i * 0.2}s`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowQuote(true)}
            className="mt-4 px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  // Page 1: Shuffle Cards Animation
  if (currentPage === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
        <div className="flex flex-col items-center gap-8 max-w-lg w-full">
          <h2
            className="text-2xl font-bold text-blue-800 dark:text-blue-200 text-center"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            About You 📸
          </h2>

          {/* Shuffle Cards Container */}
          <div className="relative w-full h-80 flex items-center justify-center">
            {shufflePhotos.map((photo, index) => (
              <ShuffleCard
                key={photo.id}
                photo={photo}
                index={index}
                isActive={activeCardIndex === index}
              />
            ))}
          </div>

          {/* Description */}
          <p
            className="text-center text-lg font-semibold text-blue-700 dark:text-blue-300 px-4 transition-all duration-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {shufflePhotos[activeCardIndex].description} ✨
          </p>

          {/* Page Navigation */}
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentPage(2)}
              className="px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Page 2: Single Photo Display
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        <h2
          className="text-2xl font-bold text-blue-800 dark:text-blue-200 text-center"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Favorite Memory 📸
        </h2>

        {/* Single Photo Gallery */}
        <div
          className="w-full aspect-square max-w-xs rounded-2xl shadow-2xl overflow-hidden relative"
          style={{
            animation: "fadeInScale 0.8s ease-out"
          }}
        >
          {/* Photo */}
          <img
            src={finalPhoto.image}
            alt={finalPhoto.caption}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              e.target.style.display = 'none';
            }}
          />

          {/* Caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
            <p className="text-white font-semibold text-lg text-center drop-shadow-lg">
              {finalPhoto.caption}
            </p>
          </div>
        </div>

        {/* Photo Description */}
        <p
          className="text-center text-base font-medium text-blue-700 dark:text-blue-300 leading-relaxed px-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {finalPhoto.description}
        </p>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentPage(1)}
            className="px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-blue-400 dark:border-blue-500"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            ← Back
          </button>
          <button
            onClick={() => setShowFinal(true)}
            className="px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-blue-400 dark:border-blue-500"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

const BirthdayApp = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [musicOn, setMusicOn] = useState(true);
  const audioRef = useRef(null);

  // Control audio play/pause based on musicOn state
  useEffect(() => {
    if (audioRef.current) {
      if (musicOn) {
        audioRef.current.play().catch(error => {
          console.log('Audio autoplay prevented:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicOn]);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden bg-blue-50 dark:bg-gray-950"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes shadowPulse {
          0%, 100% { transform: scaleX(1); opacity: 0.4; }
          50% { transform: scaleX(0.6); opacity: 0.2; }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        @keyframes confettiFall {
          0% { transform: translateY(-40px) rotate(0deg); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }

        @keyframes shakeAnimation {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }

        @keyframes successPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.25); }
          30% { transform: scale(1); }
          45% { transform: scale(1.15); }
          60% { transform: scale(1); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes cardShuffle {
          0% { transform: translateX(-50%) translateY(0) rotate(0deg) scale(1); }
          25% { transform: translateX(-50%) translateY(-30px) rotate(-5deg) scale(1.05); }
          50% { transform: translateX(-50%) translateY(-15px) rotate(3deg) scale(1.02); }
          75% { transform: translateX(-50%) translateY(-25px) rotate(-2deg) scale(1.08); }
          100% { transform: translateX(-50%) translateY(0) rotate(0deg) scale(1); }
        }

        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }

        .animate-cardShuffle {
          animation: cardShuffle 0.6s ease-in-out;
        }

        @keyframes floatHeart {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-10px) scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>

      {/* Audio Element - Autoplay with Loop */}
      <audio
        ref={audioRef}
        src="/So High School.mp3"
        loop
        autoPlay
        preload="auto"
      />

      <MusicToggle musicOn={musicOn} setMusicOn={setMusicOn} />

      <PageWrapper isVisible={currentPage === 0}>
        <WelcomePage onYes={() => setCurrentPage(1)} />
      </PageWrapper>

      <PageWrapper isVisible={currentPage === 1}>
        <PasswordPage onCorrect={() => setCurrentPage(2)} />
      </PageWrapper>

      <PageWrapper isVisible={currentPage === 2}>
        <BirthdayMessagePage onNext={() => setCurrentPage(3)} />
      </PageWrapper>

      <PageWrapper isVisible={currentPage === 3}>
        <MemoryPage />
      </PageWrapper>
    </div>
  );
};

export default BirthdayApp;