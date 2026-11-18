import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const HEARTS = ["♥", "♡", "❤", "💕", "💗", "💖", "💓", "✨", "🌸", "💫"];

const PHOTOS = [
  { src: "/photos/photo-1.jpeg", caption: "Notre rencontre", label: "Magnifique", position: "center 28%" },
  { src: "/photos/photo-2.jpeg", caption: "Nos fous rires", label: "ravissante", position: "center 65%" },
  { src: "/photos/photo-3.jpeg", caption: "Nos balades", label: "splendide", position: "center 28%" },
  { src: "/photos/photo-4.jpeg", caption: "Toi, simplement", label: "charmante", position: "center 28%" },
];

const MESSAGES = [
  {
    title: "Dès le premier regard",
    body: "Au début, je me suis dit que tu étais vraiment magnifique. Maintenant, j’aimerais aussi avoir l’occasion de découvrir la personne que tu es",
    image: "/images/rose.png",
  },
  {
    title: "Tu m'intrigues, tu me plais",
    body: "On ne se connaît pas encore très bien, mais tu m’intrigues et tu me plais. J’espère qu’on aura l’occasion de parler davantage",
    image: "/images/etoile.png",
  },
  {
    title: "Te découvrir doucement",
    body: "Ton beau visage qui attire l’attention et une présence qui donne envie d’en savoir plus sur toi. J’aimerais apprendre à te connaître, doucement.",
    image: "/images/coeur-carte.png",
  },
  {
    title: "Aujourd'hui, c'est toi",
    body: "Pour ton anniversaire, je veux juste que tu te sentes entourée, célébrée et chouchoutée comme tu le mérites — complètement, follement, ridiculement ! Joyeux anniversaire, Samini !",
    image: "/images/gateau-carte.png",
  },
];

/* ─── CŒURS FLOTTANTS ─────────────────────────────────────────── */
function FloatingHeart({ x, delay, duration, symbol }) {
  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none select-none text-primary/30 text-2xl"
      style={{ left: `${x}%` }}
      initial={{ y: 0, opacity: 0.7 }}
      animate={{ y: "-110vh", opacity: 0, rotate: [0, -15, 15, -10, 10, 0] }}
      transition={{ duration, delay, ease: "easeOut", repeat: Infinity, repeatDelay: Math.random() * 6 + 2 }}
    >
      {symbol}
    </motion.div>
  );
}

/* ─── CONFETTIS ─────────────────────────────────────────────────── */
function Confetti({ active }) {
  const pieces = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#c94070", "#f4a7c0", "#f7dfe8", "#ffd6e7", "#fff4e0", "#ffe4b5", "#fbc2eb"][i % 7],
    delay: Math.random() * 0.5,
    duration: 1.4 + Math.random() * 1.2,
    rotate: Math.random() * 720,
    size: 5 + Math.random() * 9,
    shape: i % 3 === 0 ? "50%" : i % 3 === 1 ? "0%" : "2px",
  }));
  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {pieces.map((p) => (
            <motion.div
              key={p.id}
              className="absolute top-0"
              style={{ left: `${p.x}%`, width: p.size, height: p.size, backgroundColor: p.color, borderRadius: p.shape }}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{ y: "110vh", opacity: [1, 1, 0], rotate: p.rotate }}
              exit={{ opacity: 0 }}
              transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

function GarlandBurst() {
  const colors = ["#c94070", "#f4a7c0", "#ffd6e7", "#ffd166", "#a8e6cf", "#b8c0ff", "#fbc2eb"];
  const pieces = Array.from({ length: 46 }, (_, i) => {
    const angle = (i / 46) * Math.PI * 2 + Math.random() * 0.5;
    const radius = 280 + Math.random() * 420;
    return {
      id: i,
      color: colors[i % colors.length],
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      rotate: Math.random() * 720 - 360,
      duration: 1.3 + Math.random() * 0.7,
      delay: Math.random() * 0.18,
      ribbon: i % 2 === 0,
      size: 8 + Math.random() * 10,
    };
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-[110] overflow-hidden">
      <div className="absolute left-1/2 top-1/2">
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ marginLeft: p.ribbon ? -7 : -p.size / 2, marginTop: p.ribbon ? -35 : -p.size / 2 }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
            animate={{
              x: [0, p.x * 0.55, p.x],
              y: [0, p.y - 150, p.y + 130],
              rotate: p.rotate,
              scale: [0.4, 1.1, 1],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
          >
            {p.ribbon ? (
              <svg width="14" height="70" viewBox="0 0 14 70" aria-hidden="true">
                <path d="M7 0 C14 12, 0 25, 7 35 C14 45, 0 58, 7 70 L12 70 C5 58, 19 45, 12 35 C5 25, 19 12, 12 0 Z" fill={p.color} />
              </svg>
            ) : (
              <div style={{ width: p.size, height: p.size, borderRadius: "50%", backgroundColor: p.color }} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GiftIntro({ onComplete }) {
  const [opened, setOpened] = useState(false);

  const open = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(onComplete, 1900);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "radial-gradient(circle at 50% 40%, #fff8f4 0%, #fdf4f0 45%, #f7dfe8 100%)" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <AnimatePresence>{opened && <GarlandBurst />}</AnimatePresence>

      <motion.div
        className="absolute rounded-full bg-secondary/60 blur-3xl"
        style={{ width: 340, height: 340 }}
        animate={opened ? { scale: 1.8, opacity: 0 } : { scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={opened ? { duration: 0.8 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative"
        animate={
          opened
            ? { scale: 1.4, opacity: 0, y: -90, rotate: 10 }
            : { y: [0, -14, 0], rotate: [-2, 2, -2], scale: [1, 1.03, 1] }
        }
        transition={
          opened
            ? { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
            : { duration: 2.1, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <button
          type="button"
          onClick={open}
          aria-label="Ouvrir le cadeau"
          className="cursor-pointer border-0 bg-transparent p-0 select-none"
        >
          <img
            src="/images/cadeau-intro.png"
            alt="Cadeau d'anniversaire"
            className="w-52 md:w-72 drop-shadow-2xl pointer-events-none"
            draggable="false"
          />
        </button>
      </motion.div>

      {!opened && (
        <div className="relative text-center mt-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-5xl text-primary"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            un cadeau pour toi ♡
          </motion.p>
          <motion.p
            animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.04, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="mt-5 text-muted-foreground text-xs tracking-[0.28em] uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            clique sur le cadeau
          </motion.p>
        </div>
      )}
    </motion.div>
  );
}

/* ─── ENVELOPPE ET LETTRE ───────────────────────────────────────── */
function EnvelopeLetter() {
  const [phase, setPhase] = useState("sealed");
  const [showLetter, setShowLetter] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleClick = () => {
    if (phase !== "sealed") return;
    setPhase("opening");
    setTimeout(() => {
      setPhase("open");
      setShowLetter(true);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2600);
    }, 900);
  };

  return (
    <section className="py-28 px-6 flex flex-col items-center gap-10 z-10 relative overflow-visible">
      <Confetti active={confetti} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p
          className="text-5xl md:text-6xl text-foreground"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          j'ai écrit quelque chose pour toi
        </p>
      </motion.div>

      {/* Conteneur enveloppe + lettre */}
      <div className="relative flex flex-col items-center" style={{ perspective: "1200px" }}>

        {/* ── LETTRE (qui sort de l'enveloppe) ── */}
        <AnimatePresence>
          {showLetter && (
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: -20, opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative z-30 w-80 md:w-96 mb-[-60px]"
            >
              {/* Papier */}
              <div
                className="rounded-2xl shadow-2xl px-8 py-10 border border-rose-100"
                style={{
                  background: "linear-gradient(160deg, #fffcf9 0%, #fff8f2 100%)",
                  backgroundImage: `
                    linear-gradient(160deg, #fffcf9 0%, #fff8f2 100%),
                    repeating-linear-gradient(transparent, transparent 27px, rgba(201,64,112,0.07) 27px, rgba(201,64,112,0.07) 28px)
                  `,
                }}
              >
                <p
                  className="text-primary/60 text-sm mb-5 tracking-widest uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {new Date().toLocaleDateString("fr-FR", { month: "long", day: "numeric", year: "numeric" })}
                </p>
                <p
                  className="text-3xl text-primary mb-5"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Samini,
                </p>
                <div className="space-y-4 text-foreground/80 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.97rem" }}>
                  <p>
                    En cette journée spéciale, je te souhaite une année remplie de bonheur, de santé, de réussite
                    et de beaux projets. Que les mois à venir t’apportent de belles occasions, des moments
                    inoubliables et plein de raisons de sourire.
                  </p>
                  <p>
                    Même si on ne se connaît pas encore depuis très longtemps, j’apprécie les échanges que l’on a
                    eus. C’est toujours agréable de discuter avec toi, et j’espère que nous aurons d’autres
                    occasions d’apprendre à mieux nous connaître.
                  </p>
                  <p>
                    Je voulais aussi te dire que tu es vraiment magnifique ! J’espère que tu profiteras pleinement
                    de cette journée et que tu passeras un très bel anniversaire, entourée de bonne humeur et de
                    jolies surprises. Que cette nouvelle année t’apporte tout ce que tu souhaites !
                  </p>
                </div>
                <div className="mt-8">
                  <p
                    className="text-3xl text-primary"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    joyeux anniversaire jolie femme
                  </p>
                </div>

                {/* Décoration des coins */}
                <div className="absolute top-4 right-4 text-primary/20 text-xl">✦</div>
                <div className="absolute bottom-4 left-4 text-primary/20 text-xl">✦</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CORPS DE L'ENVELOPPE ── */}
        <motion.div
          onClick={handleClick}
          className="relative cursor-pointer select-none"
          whileHover={phase === "sealed" ? { scale: 1.02 } : {}}
          style={{ width: 320, height: 220, zIndex: 20 }}
        >
          {/* Dos de l'enveloppe */}
          <div
            className="absolute inset-0 rounded-2xl shadow-xl overflow-hidden"
            style={{ background: "linear-gradient(160deg, #f9d0de 0%, #f2a8c0 100%)" }}
          >
            {/* Pli diagonal de gauche */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom-right, transparent 49.5%, rgba(255,255,255,0.2) 49.5%, rgba(255,255,255,0.2) 50.5%, transparent 50.5%)",
              }}
            />
            {/* Pli diagonal de droite */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom-left, transparent 49.5%, rgba(255,255,255,0.2) 49.5%, rgba(255,255,255,0.2) 50.5%, transparent 50.5%)",
              }}
            />
            {/* V du bas */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: "50%",
                background: "linear-gradient(135deg, #f4aec4 50%, transparent 50%), linear-gradient(-135deg, #f4aec4 50%, transparent 50%)",
                backgroundSize: "50% 100%",
                backgroundPosition: "left, right",
                backgroundRepeat: "no-repeat",
              }}
            />
            {/* Pli intérieur du bas */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1/2"
              style={{
                clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                background: "rgba(201,64,112,0.1)",
              }}
            />
          </div>

          {/* Rabat (qui s'ouvre) */}
          <motion.div
            animate={{ rotateX: phase === "opening" || phase === "open" ? -175 : 0 }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "55%",
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              zIndex: 10,
            }}
          >
            {/* Face avant du rabat */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 88%)",
                background: "linear-gradient(170deg, #fce4ee 0%, #f9c0d8 100%)",
                boxShadow: "inset 0 -6px 12px rgba(201,64,112,0.1)",
                backfaceVisibility: "hidden",
              }}
            />
            {/* Face arrière du rabat (visible après rotation) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 88%)",
                background: "linear-gradient(170deg, #f9c0d8 0%, #fce4ee 100%)",
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>

          {/* Sceau de cire en forme de cœur */}
          <AnimatePresence>
            {phase === "sealed" && (
              <motion.div
                exit={{ scale: 0, opacity: 0, rotate: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center text-2xl border-2 border-primary-foreground/30">
                  ♡
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Texte indicatif */}
          {phase === "sealed" && (
            <div className="absolute -bottom-8 left-0 right-0 text-center">
              <p className="text-muted-foreground text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                clique pour ouvrir
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CARTE À RETOURNER ─────────────────────────────────────────── */
function MessageCard({ msg, index }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="cursor-pointer"
      onClick={() => setFlipped((f) => !f)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", position: "relative", minHeight: "220px" }}
      >
        <div
          className="absolute inset-0 bg-card rounded-3xl border border-border shadow-sm flex flex-col items-center justify-center gap-3 p-8"
          style={{ backfaceVisibility: "hidden" }}
        >
          {msg.image ? (
            <img src={msg.image} alt="" className="h-16 w-24 object-contain" />
          ) : (
            <span className="text-5xl">{msg.emoji}</span>
          )}
          <p className="text-xl text-center text-foreground italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            {msg.title}
          </p>
          <p className="text-muted-foreground text-sm tracking-wide mt-1">clique pour lire</p>
        </div>
        <div
          className="absolute inset-0 bg-primary rounded-3xl flex items-center justify-center p-8"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-primary-foreground leading-relaxed text-center text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
            {msg.body}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── GALERIE PHOTOS (cadre du portfolio) ───────────────────────── */
function PhotoFrame({ photo, index }) {
  const rot = index % 2 === 0 ? -3 : 3;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40, rotate: rot }}
      whileInView={{ opacity: 1, y: 0, rotate: rot }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ rotate: 0, y: -6, scale: 1.03, zIndex: 10 }}
      className="photo-frame"
    >
      <div className="photo-frame__image-wrap">
        <img src={photo.src} alt={photo.caption} style={{ objectPosition: photo.position }} />
        <span className="photo-frame__shutter photo-frame__shutter--left" aria-hidden="true" />
        <span className="photo-frame__shutter photo-frame__shutter--right" aria-hidden="true" />
      </div>
      <figcaption style={{ fontFamily: "'Dancing Script', cursive" }}>{photo.label}</figcaption>
    </motion.figure>
  );
}

/* ─── BOUGIE ────────────────────────────────────────────────────── */
function CandleSection() {
  const [blown, setBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const blow = () => {
    if (blown) return;
    setBlown(true);
    setConfetti(true);
    setTimeout(() => setShowWish(true), 600);
    setTimeout(() => setConfetti(false), 2800);
  };

  return (
    <section className="py-24 flex flex-col items-center gap-8 relative">
      <Confetti active={confetti} />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl text-muted-foreground"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        fais un vœu
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-2 cursor-pointer select-none"
        onClick={blow}
      >
        <div className="relative flex flex-col items-center">
          <AnimatePresence>
            {!blown && (
              <motion.div
                className="relative mb-1"
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-4 h-8 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-100"
                  animate={{ scaleX: [1, 1.25, 0.8, 1.15, 1], scaleY: [1, 0.92, 1.08, 0.96, 1] }}
                  transition={{ duration: 0.65, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-1 rounded-full bg-yellow-50/70"
                  animate={{ opacity: [0.5, 0.9, 0.4, 0.85, 0.5] }}
                  transition={{ duration: 0.65, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="w-9 h-24 rounded-t-lg bg-gradient-to-b from-pink-200 to-pink-300 border border-pink-300/60 relative overflow-hidden shadow-md">
            <div className="absolute inset-y-0 left-2.5 w-0.5 bg-white/50 rounded" />
            <div className="absolute inset-y-0 left-5 w-px bg-white/25 rounded" />
          </div>
          <div className="w-14 h-3 bg-primary/15 rounded-full mt-0.5 blur-[1px]" />
        </div>
        {!blown && (
          <p className="text-muted-foreground text-sm mt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            clique pour souffler
          </p>
        )}
      </motion.div>
      <AnimatePresence>
        {showWish && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md text-center px-6"
          >
            <p className="text-4xl text-primary mb-3" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Ton vœu a été entendu
            </p>
            <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
              Quel que soit ton vœu — j'espère qu'il se réalisera.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── APPLICATION ───────────────────────────────────────────────── */
export default function App() {
  const [floatingHearts] = useState(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: Math.random() * 95,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 7,
      symbol: HEARTS[i % HEARTS.length],
    }))
  );
  const [introOpen, setIntroOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <AnimatePresence>
        {introOpen && <GiftIntro onComplete={() => setIntroOpen(false)} />}
      </AnimatePresence>

      {/* Arrière-plan de cœurs flottants */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {floatingHearts.map((h) => (
          <FloatingHeart key={h.id} x={h.x} delay={h.delay} duration={h.duration} symbol={h.symbol} />
        ))}
      </div>

      {/* ── EN-TÊTE ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative -top-20 md:-top-28 mb-2"
        >
          <span className="text-sm tracking-[0.35em] uppercase text-muted-foreground">
            une journée très spéciale
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="text-[3.1rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[9.5rem] xl:text-[10.5rem] font-bold text-primary leading-none mb-4 whitespace-nowrap"
          style={{ fontFamily: "'Dancing Script', cursive", WebkitTextStroke: "1px currentColor" }}
        >
          Happy birthday
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl md:text-5xl text-foreground mb-24 md:mb-32"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Samini ♡
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="max-w-md text-muted-foreground text-lg leading-relaxed"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Aujourd'hui, le monde entier devient un peu plus lumineux parce que tu existes.
          Ce petit coin d'internet a été créé entièrement pour toi.
        </motion.p>

        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-1 text-muted-foreground/50 text-xs tracking-widest uppercase"
        >
          <span>défiler</span>
          <span>↓</span>
        </motion.div>
      </section>

      {/* ── ENVELOPPE ET LETTRE ──────────────────────────────────── */}
      <EnvelopeLetter />

      {/* ── SÉPARATEUR ───────────────────────────────────────────── */}
      <div className="flex items-center gap-4 px-10 md:px-24 py-6 z-10 relative">
        <div className="flex-1 h-px bg-border" />
        <span className="text-primary/40 text-xl">♡</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* ── CARTES À RETOURNER ───────────────────────────────────── */}
      <section className="py-20 px-6 md:px-16 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-4xl md:text-5xl text-primary mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
            des choses que je veux que tu saches
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {MESSAGES.map((msg, i) => (
            <MessageCard key={i} msg={msg} index={i} />
          ))}
        </div>
      </section>

      {/* ── GALERIE PHOTOS ───────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-16 z-10 relative bg-secondary/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-4xl md:text-5xl text-primary" style={{ fontFamily: "'Dancing Script', cursive" }}>
            4 plus belle image de toi
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 max-w-5xl mx-auto justify-items-center">
          {PHOTOS.map((photo, i) => (
            <PhotoFrame key={i} photo={photo} index={i} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-3xl text-primary" style={{ fontFamily: "'Dancing Script', cursive" }}>
            tu es magnifiques
          </p>
        </motion.div>
      </section>

      {/* ── BOUGIE ───────────────────────────────────────────────── */}
      <CandleSection />

      {/* ── CONCLUSION ───────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto"
        >
          <p className="text-5xl md:text-7xl text-primary mb-6" style={{ fontFamily: "'Dancing Script', cursive" }}>
            pour toujours à toi
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            À l’occasion de ton anniversaire, je te souhaite beaucoup de bonheur, de réussite et de beaux moments
            pour l’année à venir. C’est un plaisir d’avoir fait ta connaissance, et j’espère que nous aurons
            l’occasion d’échanger à nouveau. Profite bien de ta journée et des jolies surprises qui t’attendent
          </p>
        </motion.div>
      </section>

      {/* Pied de page */}
      <footer className="py-8 text-center border-t border-border">
        <p className="text-xl text-muted-foreground" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Chose promise, chose due
        </p>
      </footer>
    </div>
  );
}
