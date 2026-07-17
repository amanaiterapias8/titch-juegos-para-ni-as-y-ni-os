import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#FF6B35",
  secondary: "#FFD700",
  purple: "#9B59B6",
  blue: "#3498DB",
  green: "#2ECC71",
  pink: "#E91E8C",
  lightBg: "#FFF9F0",
  cardBg: "#FFFFFF",
  text: "#2C3E50",
  textLight: "#7F8C8D",
  gradient1: "linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)",
  gradient2: "linear-gradient(135deg, #9B59B6 0%, #6C3483 100%)",
  gradient3: "linear-gradient(135deg, #3498DB 0%, #1A5276 100%)",
  gradient4: "linear-gradient(135deg, #2ECC71 0%, #1A8A4A 100%)",
  gradient5: "linear-gradient(135deg, #FFD700 0%, #F39C12 100%)",
  gradient6: "linear-gradient(135deg, #E91E8C 0%, #AD1457 100%)",
};

const EMOJIS = {
  abc: "🔤",
  numbers: "🔢",
  animals: "🐾",
  colors: "🎨",
  music: "🎵",
  puzzle: "🧩",
  memory: "🧠",
  trace: "✏️",
  shapes: "🔷",
  cooking: "🍳",
  star: "⭐",
  trophy: "🏆",
  heart: "❤️",
  home: "🏠",
  games: "🎮",
  learn: "📚",
  profile: "👤",
  lock: "🔒",
  play: "▶️",
  check: "✅",
  rocket: "🚀",
  rainbow: "🌈",
  sun: "☀️",
  moon: "🌙",
};

// ── PANTALLA DE BIENVENIDA ──────────────────────────────────────────
function SplashScreen({ onFinish }) {
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 2000);
    const t2 = setTimeout(() => onFinish(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onFinish]);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "linear-gradient(160deg, #FF6B35 0%, #FFD700 50%, #9B59B6 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 9999,
      opacity: fade ? 0 : 1,
      transition: "opacity 0.6s ease",
      pointerEvents: fade ? "none" : "all",
    }}>
      <div style={{ animation: "bounce 0.8s infinite alternate" }}>
        <div style={{ fontSize: 90, textAlign: "center" }}>🌟</div>
      </div>
      <h1 style={{
        color: "#fff", fontSize: 32, fontWeight: 900,
        margin: "16px 0 6px", textShadow: "2px 3px 6px rgba(0,0,0,0.2)",
        letterSpacing: 1, textAlign: "center",
      }}>Titch</h1>
      <p style={{
        color: "rgba(255,255,255,0.92)", fontSize: 15,
        fontWeight: 600, letterSpacing: 2, textTransform: "uppercase",
      }}>Juegos para niñas y niños</p>
      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 8 }}>
        por VitaStudio
      </p>
      <div style={{ marginTop: 40, display: "flex", gap: 8 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: "50%",
            background: "rgba(255,255,255,0.8)",
            animation: `pulse 1.2s ${i * 0.4}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ── PANTALLA DE ONBOARDING ──────────────────────────────────────────
function OnboardingScreen({ onFinish }) {
  const [step, setStep] = useState(0);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState(null);

  const steps = [
    {
      emoji: "🌈",
      title: "¡Bienvenido a Titch!",
      subtitle: "El mundo mágico de aprendizaje para tu pequeño explorador",
      bg: "linear-gradient(160deg, #FF6B35 0%, #FFD700 100%)",
    },
    {
      emoji: "🎮",
      title: "Aprende jugando",
      subtitle: "Puzzles, canciones, trazado de letras y mucho más para niños de 2 a 6 años",
      bg: "linear-gradient(160deg, #9B59B6 0%, #3498DB 100%)",
    },
    {
      emoji: "📚",
      title: "Más de 500 actividades",
      subtitle: "Letras, números, animales, colores, creatividad y mucho más cada día",
      bg: "linear-gradient(160deg, #2ECC71 0%, #3498DB 100%)",
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else setStep(steps.length); // ir a config
  };

  if (step >= steps.length) {
    return (
      <div style={{
        minHeight: "100dvh", background: COLORS.lightBg,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "24px 20px",
      }}>
        <div style={{ fontSize: 70, marginBottom: 16 }}>👶</div>
        <h2 style={{ color: COLORS.text, fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>
          ¿Cómo se llama tu pequeño?
        </h2>
        <p style={{ color: COLORS.textLight, textAlign: "center", marginBottom: 28, fontSize: 14 }}>
          Personaliza la experiencia de aprendizaje
        </p>
        <input
          value={childName}
          onChange={e => setChildName(e.target.value)}
          placeholder="Nombre del niño/a"
          style={{
            width: "100%", maxWidth: 320, padding: "14px 18px",
            borderRadius: 16, border: `2px solid ${COLORS.primary}`,
            fontSize: 18, fontWeight: 600, color: COLORS.text,
            outline: "none", marginBottom: 20, boxSizing: "border-box",
            background: "#fff", textAlign: "center",
          }}
        />
        <p style={{ color: COLORS.text, fontWeight: 700, marginBottom: 12, fontSize: 15 }}>
          ¿Cuántos años tiene?
        </p>
        <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap", justifyContent: "center" }}>
          {["1", "2", "3", "4", "5", "6+"].map(age => (
            <button
              key={age}
              onClick={() => setChildAge(age)}
              style={{
                width: 56, height: 56, borderRadius: "50%",
                border: `3px solid ${childAge === age ? COLORS.primary : "#E0E0E0"}`,
                background: childAge === age ? COLORS.primary : "#fff",
                color: childAge === age ? "#fff" : COLORS.text,
                fontSize: 18, fontWeight: 800, cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {age}
            </button>
          ))}
        </div>
        <button
          onClick={() => onFinish({ name: childName || "Explorador", age: childAge || "3" })}
          style={{
            background: COLORS.gradient1, color: "#fff",
            border: "none", borderRadius: 20, padding: "16px 48px",
            fontSize: 18, fontWeight: 800, cursor: "pointer",
            boxShadow: "0 6px 20px rgba(255,107,53,0.4)",
            transition: "transform 0.15s",
          }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        >
          ¡Empezar a aprender! 🚀
        </button>
      </div>
    );
  }

  const s = steps[step];
  return (
    <div style={{
      minHeight: "100dvh", background: s.bg,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", transition: "background 0.5s",
    }}>
      <div style={{ fontSize: 100, marginBottom: 24, animation: "bounce 1s infinite alternate" }}>
        {s.emoji}
      </div>
      <h2 style={{
        color: "#fff", fontSize: 28, fontWeight: 900,
        textAlign: "center", marginBottom: 16, lineHeight: 1.2,
        textShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}>{s.title}</h2>
      <p style={{
        color: "rgba(255,255,255,0.88)", fontSize: 16,
        textAlign: "center", lineHeight: 1.6, maxWidth: 300,
        marginBottom: 50,
      }}>{s.subtitle}</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        {steps.map((_, i) => (
          <div key={i} style={{
            width: i === step ? 24 : 8, height: 8, borderRadius: 4,
            background: i === step ? "#fff" : "rgba(255,255,255,0.4)",
            transition: "all 0.3s",
          }} />
        ))}
      </div>
      <button
        onClick={handleNext}
        style={{
          background: "rgba(255,255,255,0.25)", color: "#fff",
          border: "3px solid rgba(255,255,255,0.8)",
          borderRadius: 20, padding: "14px 44px",
          fontSize: 17, fontWeight: 800, cursor: "pointer",
          backdropFilter: "blur(8px)",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.4)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
      >
        {step < steps.length - 1 ? "Siguiente →" : "¡Vamos! 🎉"}
      </button>
      {step === 0 && (
        <button
          onClick={() => onFinish({ name: "Explorador", age: "3" })}
          style={{
            background: "transparent", color: "rgba(255,255,255,0.7)",
            border: "none", fontSize: 13, cursor: "pointer",
            marginTop: 16, textDecoration: "underline",
          }}
        >
          Saltar introducción
        </button>
      )}
    </div>
  );
}

// ── JUEGO: ABC PUZZLE ──────────────────────────────────────────────
function ABCPuzzle({ onBack }) {
  const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const emojisABC = {
    A:"🍎", B:"🦋", C:"🌙", D:"🐬", E:"🐘", F:"🌸", G:"🦒", H:"🏠",
    I:"🦋", J:"🦁", K:"🥝", L:"🦁", M:"🐒", N:"🌙", Ñ:"🎵", O:"🦉",
    P:"🐧", Q:"🎸", R:"🌹", S:"🌞", T:"🐢", U:"🦄", V:"🦋", W:"🐺",
    X:"🎸", Y:"🌿", Z:"🦓"
  };
  const [current, setCurrent] = useState(0);
  const [matched, setMatched] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const letter = letters[current];
  const options = [letter, letters[(current + 3) % letters.length], letters[(current + 7) % letters.length]]
    .sort(() => Math.random() - 0.5);
  const [shuffled] = useState(() =>
    [letter, letters[(current + 3) % letters.length], letters[(current + 7) % letters.length]]
      .sort(() => Math.random() - 0.5)
  );

  const handleGuess = (l) => {
    if (l === letter) {
      setFeedback("correct");
      setMatched(prev => [...prev, letter]);
      setTimeout(() => {
        setFeedback(null);
        if (current < letters.length - 1) setCurrent(c => c + 1);
      }, 1000);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 700);
    }
  };

  return (
    <div style={{ minHeight: "100dvh", background: "linear-gradient(160deg,#FF6B35 0%,#FFD700 100%)", padding: "20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.3)", border: "none", borderRadius: 12, padding: "8px 14px", color: "#fff", fontSize: 18, cursor: "pointer" }}>←</button>
        <h2 style={{ color: "#fff", flex: 1, textAlign: "center", fontSize: 20, fontWeight: 800, margin: 0 }}>Puzzle ABC 🔤</h2>
        <div style={{ width: 42 }} />
      </div>
      <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "6px 12px", marginBottom: 20 }}>
        <div style={{ height: 8, background: "rgba(255,255,255,0.3)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: `${(current / letters.length) * 100}%`, height: "100%", background: "#fff", borderRadius: 4, transition: "width 0.4s" }} />
        </div>
        <p style={{ color: "#fff", fontSize: 12, textAlign: "center", margin: "4px 0 0" }}>{current} / {letters.length} letras</p>
      </div>
      <div style={{ background: "#fff", borderRadius: 28, padding: "32px 24px", textAlign: "center", marginBottom: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
        <div style={{ fontSize: 80, marginBottom: 8 }}>{emojisABC[letter] || "⭐"}</div>
        <div style={{
          fontSize: 96, fontWeight: 900, color: COLORS.primary,
          lineHeight: 1, textShadow: `4px 4px 0px ${COLORS.secondary}`,
          animation: feedback === "correct" ? "bounce 0.5s" : feedback === "wrong" ? "shake 0.5s" : "none"
        }}>{letter}</div>
        <p style={{ color: COLORS.textLight, fontSize: 14, marginTop: 8 }}>¿Cuál es esta letra?</p>
      </div>
      {feedback && (
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 40 }}>{feedback === "correct" ? "🎉" : "❌"}</span>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {shuffled.map(l => (
          <button
            key={l}
            onClick={() => handleGuess(l)}
            style={{
              background: "#fff", border: `3px solid ${feedback === "correct" && l === letter ? COLORS.green : "#E0E0E0"}`,
              borderRadius: 20, padding: "24px 0", fontSize: 48, fontWeight: 900,
              color: COLORS.text, cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "transform 0.15s",
            }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.93)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            {l}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
        {letters.slice(0, current).map(l => (
          <span key={l} style={{ width: 24, height: 24, borderRadius: "50%", background: COLORS.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 700 }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

// ── JUEGO: TRAZADO DE LETRAS ────────────────────────────────────────
function TraceLetters({ onBack }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [currentLetter, setCurrentLetter] = useState("A");
  const [cleared, setCleared] = useState(false);
  const letters = ["A","B","C","D","E","M","S","T"];
  const lastPos = useRef(null);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const startDraw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    lastPos.current = pos;
    setDrawing(true);
    setCleared(false);
    e.preventDefault();
  };

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.strokeStyle = COLORS.purple;
    ctx.globalAlpha = 0.9;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    lastPos.current = pos;
    e.preventDefault();
  };

  const stopDraw = () => setDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCleared(true);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 200px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255,214,0,0.18)";
    ctx.fillText(currentLetter, canvas.width / 2, canvas.height / 2);
  }, [currentLetter]);

  return (
    <div style={{ minHeight: "100dvh", background: "linear-gradient(160deg,#9B59B6 0%,#3498DB 100%)", padding: "20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.3)", border: "none", borderRadius: 12, padding: "8px 14px", color: "#fff", fontSize: 18, cursor: "pointer" }}>←</button>
        <h2 style={{ color: "#fff", flex: 1, textAlign: "center", fontSize: 20, fontWeight: 800, margin: 0 }}>Trazar Letras ✏️</h2>
        <div style={{ width: 42 }} />
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {letters.map(l => (
          <button
            key={l}
            onClick={() => setCurrentLetter(l)}
            style={{
              minWidth: 44, height: 44, borderRadius: 12,
              background: currentLetter === l ? "#fff" : "rgba(255,255,255,0.25)",
              border: "none", fontSize: 20, fontWeight: 800,
              color: currentLetter === l ? COLORS.purple : "#fff",
              cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
            }}
          >
            {l}
          </button>
        ))}
      </div>
      <div style={{ position: "relative", background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", marginBottom: 16 }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 0 }}>
          <span style={{ fontSize: 180, color: "rgba(255,214,0,0.12)", fontWeight: 900, lineHeight: 1 }}>{currentLetter}</span>
        </div>
        <canvas
          ref={canvasRef}
          width={340}
          height={320}
          style={{ display: "block", touchAction: "none", cursor: "crosshair", position: "relative", zIndex: 1 }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
      </div>
      <p style={{ color: "rgba(255,255,255,0.8)", textAlign: "center", fontSize: 13, marginBottom: 14 }}>
        ¡Dibuja la letra siguiendo el contorno amarillo!
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button
          onClick={clearCanvas}
          style={{
            background: "rgba(255,255,255,0.25)", border: "2px solid rgba(255,255,255,0.6)",
            borderRadius: 16, padding: "12px 28px", color: "#fff", fontSize: 15,
            fontWeight: 700, cursor: "pointer",
          }}
        >
          🗑️ Borrar
        </button>
        <button
          onClick={() => {
            const idx = letters.indexOf(currentLetter);
            if (idx < letters.length - 1) setCurrentLetter(letters[idx + 1]);
          }}
          style={{
            background: "#fff", border: "none", borderRadius: 16,
            padding: "12px 28px", color: COLORS.purple, fontSize: 15,
            fontWeight: 800, cursor: "pointer",
          }}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

// ── JUEGO: CARTAS DE MEMORIA ────────────────────────────────────────
function MemoryCards({ onBack }) {
  const allCards = [
    { id: 1, emoji: "🐶" }, { id: 2, emoji: "🐱" },
    { id: 3, emoji: "🐭" }, { id: 4, emoji: "🐹" },
    { id: 5, emoji: "🦊" }, { id: 6, emoji: "🐻" },
  ];
  const [cards] = useState(() => {
    const doubled = [...allCards, ...allCards].map((c, i) => ({ ...c, uid: i }));
    return doubled.sort(() => Math.random() - 0.5);
  });
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const flip = (uid) => {
    if (flipped.length === 2 || flipped.includes(uid) || matched.includes(uid)) return;
    const newFlipped = [...flipped, uid];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped.map(u => cards.find(c => c.uid === u));
      if (a.id === b.id) {
        setMatched(prev => {
          const nm = [...prev, newFlipped[0], newFlipped[1]];
          if (nm.length === cards.length) setTimeout(() => setWon(true), 500);
          return nm;
        });
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const reset = () => { setFlipped([]); setMatched([]); setMoves(0); setWon(false); };

  if (won) return (
    <div style={{ minHeight: "100dvh", background: "linear-gradient(160deg,#FFD700 0%,#FF6B35 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ fontSize: 80, animation: "bounce 0.6s infinite alternate" }}>🏆</div>
      <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 900, margin: "16px 0 8px" }}>¡Ganaste!</h2>
      <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 16 }}>Lo lograste en {moves} movimientos</p>
      <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
        <button onClick={reset} style={{ background: "#fff", border: "none", borderRadius: 16, padding: "14px 32px", fontSize: 16, fontWeight: 800, color: COLORS.primary, cursor: "pointer" }}>Jugar de nuevo</button>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.3)", border: "2px solid #fff", borderRadius: 16, padding: "14px 24px", fontSize: 16, fontWeight: 800, color: "#fff", cursor: "pointer" }}>Volver</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100dvh", background: "linear-gradient(160deg,#E91E8C 0%,#9B59B6 100%)", padding: "20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.3)", border: "none", borderRadius: 12, padding: "8px 14px", color: "#fff", fontSize: 18, cursor: "pointer" }}>←</button>
        <h2 style={{ color: "#fff", flex: 1, textAlign: "center", fontSize: 20, fontWeight: 800, margin: 0 }}>Memoria 🧠</h2>
        <span style={{ background: "rgba(255,255,255,0.25)", borderRadius: 10, padding: "4px 10px", color: "#fff", fontSize: 13, fontWeight: 700 }}>{moves} mov.</span>
      </div>
      <p style={{ color: "rgba(255,255,255,0.8)", textAlign: "center", fontSize: 13, marginBottom: 16 }}>
        Encuentra todas las parejas iguales
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, maxWidth: 360, margin: "0 auto" }}>
        {cards.map(c => {
          const isFlipped = flipped.includes(c.uid) || matched.includes(c.uid);
          return (
            <button
              key={c.uid}
              onClick={() => flip(c.uid)}
              style={{
                height: 80, borderRadius: 16,
                background: isFlipped ? "#fff" : "rgba(255,255,255,0.25)",
                border: matched.includes(c.uid) ? `3px solid ${COLORS.green}` : "3px solid rgba(255,255,255,0.4)",
                fontSize: isFlipped ? 36 : 0,
                cursor: "pointer", transition: "all 0.3s",
                transform: isFlipped ? "scale(1.04)" : "scale(1)",
                boxShadow: isFlipped ? "0 4px 14px rgba(0,0,0,0.15)" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {isFlipped ? c.emoji : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── JUEGO: PUZZLE DE FORMAS ─────────────────────────────────────────
function ShapesPuzzle({ onBack }) {
  const shapes = [
    { name: "Círculo", emoji: "🔴", color: "#E74C3C", desc: "redondo como el sol" },
    { name: "Cuadrado", emoji: "🟦", color: "#3498DB", desc: "4 lados iguales" },
    { name: "Triángulo", emoji: "🔺", color: "#F39C12", desc: "3 lados, como una montaña" },
    { name: "Estrella", emoji: "⭐", color: "#FFD700", desc: "brilla en el cielo" },
    { name: "Corazón", emoji: "❤️", color: "#E91E8C", desc: "símbolo del amor" },
    { name: "Diamante", emoji: "💎", color: "#9B59B6", desc: "4 lados en diagonal" },
  ];
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState([]);

  const handleSelect = (i) => {
    setSelected(i);
    if (!completed.includes(i)) {
      setTimeout(() => {
        setCompleted(prev => [...prev, i]);
        setSelected(null);
      }, 800);
    }
  };

  return (
    <div style={{ minHeight: "100dvh", background: "linear-gradient(160deg,#3498DB 0%,#2ECC71 100%)", padding: "20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.3)", border: "none", borderRadius: 12, padding: "8px 14px", color: "#fff", fontSize: 18, cursor: "pointer" }}>←</button>
        <h2 style={{ color: "#fff", flex: 1, textAlign: "center", fontSize: 20, fontWeight: 800, margin: 0 }}>Formas 🔷</h2>
        <span style={{ background: "rgba(255,255,255,0.25)", borderRadius: 10, padding: "4px 10px", color: "#fff", fontSize: 12, fontWeight: 700 }}>{completed.length}/{shapes.length}</span>
      </div>
      <p style={{ color: "rgba(255,255,255,0.85)", textAlign: "center", marginBottom: 20, fontSize: 14 }}>
        ¡Toca cada forma para aprender sobre ella!
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {shapes.map((s, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            style={{
              background: "#fff", border: `4px solid ${completed.includes(i) ? COLORS.green : selected === i ? s.color : "#E0E0E0"}`,
              borderRadius: 24, padding: "20px 12px", cursor: "pointer",
              transition: "all 0.3s",
              transform: selected === i ? "scale(1.06)" : "scale(1)",
              boxShadow: completed.includes(i) ? `0 0 0 2px ${COLORS.green}` : "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 6 }}>{s.emoji}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.text, marginBottom: 4 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: COLORS.textLight, lineHeight: 1.4 }}>{s.desc}</div>
            {completed.includes(i) && <div style={{ marginTop: 8, fontSize: 18 }}>✅</div>}
          </button>
        ))}
      </div>
      {completed.length === shapes.length && (
        <div style={{ marginTop: 24, background: "rgba(255,255,255,0.95)", borderRadius: 20, padding: "20px", textAlign: "center" }}>
          <div style={{ fontSize: 50 }}>🎊</div>
          <p style={{ fontWeight: 800, color: COLORS.text, fontSize: 18 }}>¡Conoces todas las formas!</p>
        </div>
      )}
    </div>
  );
}

// ── JUEGO: NÚMEROS ─────────────────────────────────────────────────
function NumbersGame({ onBack }) {
  const [current, setCurrent] = useState(1);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const getQuestion = (n) => {
    const items = Array.from({ length: n }, (_, i) => i);
    const wrong1 = n === 1 ? 2 : n - 1;
    const wrong2 = n === 10 ? 9 : n + 1;
    const options = [n, wrong1, wrong2].sort(() => Math.random() - 0.5);
    const emojis = ["⭐", "🍎", "🦋", "🐶", "🌸", "🎈", "🍭", "🚀", "🌈", "💎"];
    return { items, options, emoji: emojis[n - 1] || "⭐" };
  };

  const [q, setQ] = useState(() => getQuestion(1));

  const handleAnswer = (val) => {
    setSelected(val);
    if (val === current) {
      setFeedback("correct");
      setScore(s => s + 10);
      setTimeout(() => {
        const next = current < 10 ? current + 1 : 1;
        setCurrent(next);
        setQ(getQuestion(next));
        setSelected(null);
        setFeedback(null);
      }, 900);
    } else {
      setFeedback("wrong");
      setTimeout(() => { setSelected(null); setFeedback(null); }, 800);
    }
  };

  return (
    <div style={{ minHeight: "100dvh", background: "linear-gradient(160deg,#2ECC71 0%,#3498DB 100%)", padding: "20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.3)", border: "none", borderRadius: 12, padding: "8px 14px", color: "#fff", fontSize: 18, cursor: "pointer" }}>←</button>
        <h2 style={{ color: "#fff", flex: 1, textAlign: "center", fontSize: 20, fontWeight: 800, margin: 0 }}>Números 🔢</h2>
        <span style={{ background: "rgba(255,255,255,0.25)", borderRadius: 10, padding: "4px 10px", color: "#fff", fontSize: 13, fontWeight: 700 }}>⭐{score}</span>
      </div>
      <div style={{ background: "#fff", borderRadius: 28, padding: "28px 20px", textAlign: "center", marginBottom: 20, boxShadow: "0 8px 28px rgba(0,0,0,0.1)" }}>
        <p style={{ color: COLORS.textLight, fontSize: 14, marginBottom: 12 }}>¿Cuántos hay?</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, minHeight: 80, alignItems: "center", marginBottom: 12 }}>
          {q.items.map((_, i) => (
            <span key={i} style={{ fontSize: 32, animation: feedback === "correct" ? "bounce 0.4s" : "none" }}>{q.emoji}</span>
          ))}
        </div>
        <div style={{ fontSize: 72, fontWeight: 900, color: COLORS.primary, lineHeight: 1, textShadow: `3px 3px 0 ${COLORS.secondary}` }}>{current}</div>
      </div>
      {feedback && (
        <div style={{ textAlign: "center", fontSize: 36, marginBottom: 10 }}>
          {feedback === "correct" ? "🎉" : "❌"}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {q.options.map(opt => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            style={{
              background: selected === opt ? (feedback === "correct" ? COLORS.green : "#E74C3C") : "#fff",
              border: "none", borderRadius: 20, padding: "24px 0", fontSize: 40,
              fontWeight: 900, color: selected === opt ? "#fff" : COLORS.text,
              cursor: "pointer", transition: "all 0.2s",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 24 }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: "50%",
            background: i < current - 1 ? COLORS.green : i === current - 1 ? COLORS.secondary : "rgba(255,255,255,0.4)",
          }} />
        ))}
      </div>
    </div>
  );
}

// ── JUEGO: ANIMALES ────────────────────────────────────────────────
function AnimalsGame({ onBack }) {
  const animals = [
    { name: "Perro", emoji: "🐶", sound: "¡Guau!", color: "#F39C12" },
    { name: "Gato", emoji: "🐱", sound: "¡Miau!", color: "#E74C3C" },
    { name: "Vaca", emoji: "🐮", sound: "¡Muuu!", color: "#8E44AD" },
    { name: "Pato", emoji: "🐥", sound: "¡Cuac!", color: "#F1C40F" },
    { name: "León", emoji: "🦁", sound: "¡Roarr!", color: "#E67E22" },
    { name: "Elefante", emoji: "🐘", sound: "¡Barrrrr!", color: "#95A5A6" },
    { name: "Rana", emoji: "🐸", sound: "¡Croac!", color: "#27AE60" },
    { name: "Pingüino", emoji: "🐧", sound: "¡Graznido!", color: "#2980B9" },
    { name: "Mariposa", emoji: "🦋", sound: "¡Aleteo!", color: "#E91E8C" },
    { name: "Conejo", emoji: "🐰", sound: "¡Squeak!", color: "#FF6B35" },
    { name: "Panda", emoji: "🐼", sound: "¡Eek!", color: "#2C3E50" },
    { name: "Jirafa", emoji: "🦒", sound: "¡Hmm!", color: "#D4A054" },
  ];
  const [active, setActive] = useState(null);

  return (
    <div style={{ minHeight: "100dvh", background: "linear-gradient(160deg,#F39C12 0%,#E74C3C 100%)", padding: "20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.3)", border: "none", borderRadius: 12, padding: "8px 14px", color: "#fff", fontSize: 18, cursor: "pointer" }}>←</button>
        <h2 style={{ color: "#fff", flex: 1, textAlign: "center", fontSize: 20, fontWeight: 800, margin: 0 }}>Animales 🐾</h2>
        <div style={{ width: 42 }} />
      </div>
      <p style={{ color: "rgba(255,255,255,0.85)", textAlign: "center", marginBottom: 16, fontSize: 13 }}>
        ¡Toca cada animal para escuchar su sonido!
      </p>
      {active && (
        <div style={{
          background: "#fff", borderRadius: 20, padding: "12px 20px",
          textAlign: "center", marginBottom: 16, display: "flex",
          alignItems: "center", justifyContent: "center", gap: 10,
          animation: "slideIn 0.2s ease",
        }}>
          <span style={{ fontSize: 32 }}>{animals.find(a => a.name === active.name)?.emoji}</span>
          <div>
            <p style={{ fontWeight: 800, color: COLORS.text, margin: 0, fontSize: 16 }}>{active.name}</p>
            <p style={{ color: active.color, fontWeight: 700, margin: 0, fontSize: 18 }}>{active.sound}</p>
          </div>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {animals.map((a, i) => (
          <button
            key={i}
            onClick={() => setActive(a)}
            style={{
              background: active?.name === a.name ? a.color : "#fff",
              border: `3px solid ${active?.name === a.name ? a.color : "transparent"}`,
              borderRadius: 20, padding: "16px 8px", cursor: "pointer",
              transition: "all 0.2s",
              transform: active?.name === a.name ? "scale(1.06)" : "scale(1)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: 40 }}>{a.emoji}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: active?.name === a.name ? "#fff" : COLORS.text, marginTop: 4 }}>{a.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── JUEGO: CANCIONES ───────────────────────────────────────────────
function KidsSongs({ onBack }) {
  const [playing, setPlaying] = useState(null);
  const [progress, setProgress] = useState({});
  const songs = [
    { id: 1, title: "El Abecedario", emoji: "🔤", color: COLORS.gradient1, duration: "2:30", lyrics: "A B C D E F G... ¡aprendo el abecedario con Titch!" },
    { id: 2, title: "Los Números", emoji: "🔢", color: COLORS.gradient4, duration: "2:10", lyrics: "1 2 3 cuento bien, 4 5 6 otra vez..." },
    { id: 3, title: "Los Colores", emoji: "🎨", color: "linear-gradient(135deg,#E91E8C,#9B59B6)", duration: "1:55", lyrics: "Rojo, azul, amarillo y verde... ¡los colores aprendo siempre!" },
    { id: 4, title: "Los Animales", emoji: "🐾", color: "linear-gradient(135deg,#F39C12,#E74C3C)", duration: "2:45", lyrics: "El perro dice guau, el gato miau..." },
    { id: 5, title: "Las Formas", emoji: "🔷", color: COLORS.gradient3, duration: "2:00", lyrics: "El círculo rueda, el cuadrado no..." },
    { id: 6, title: "Buenas Noches", emoji: "🌙", color: "linear-gradient(135deg,#2C3E50,#9B59B6)", duration: "3:15", lyrics: "Cierra los ojos mi pequeño explorador..." },
  ];

  // TODO: Integrar reproductor de audio real con archivos MP3 o API de canciones infantiles
  const togglePlay = (id) => {
    setPlaying(playing === id ? null : id);
    if (playing !== id) {
      setProgress(prev => ({ ...prev, [id]: 0 }));
    }
  };

  useEffect(() => {
    if (playing === null) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        const curr = (prev[playing] || 0) + 1;
        if (curr >= 100) { setPlaying(null); return { ...prev, [playing]: 0 }; }
        return { ...prev, [playing]: curr };
      });
    }, 150);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div style={{ minHeight: "100dvh", background: "linear-gradient(160deg,#FFD700 0%,#FF6B35 100%)", padding: "20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.3)", border: "none", borderRadius: 12, padding: "8px 14px", color: "#fff", fontSize: 18, cursor: "pointer" }}>←</button>
        <h2 style={{ color: "#fff", flex: 1, textAlign: "center", fontSize: 20, fontWeight: 800, margin: 0 }}>Canciones 🎵</h2>
        <div style={{ width: 42 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {songs.map(song => (
          <div
            key={song.id}
            style={{
              background: "#fff", borderRadius: 20,
              padding: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              border: playing === song.id ? `3px solid ${COLORS.primary}` : "3px solid transparent",
              transition: "all 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: song.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                {song.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 800, color: COLORS.text, margin: "0 0 2px", fontSize: 15 }}>{song.title}</p>
                <p style={{ color: COLORS.textLight, margin: 0, fontSize: 12 }}>{song.duration} · Titch</p>
              </div>
              <button
                onClick={() => togglePlay(song.id)}
                style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: playing === song.id ? COLORS.primary : "rgba(255,107,53,0.1)",
                  border: "none", fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s", color: playing === song.id ? "#fff" : COLORS.primary,
                }}
              >
                {playing === song.id ? "⏸" : "▶"}
              </button>
            </div>
            {playing === song.id && (
              <div style={{ marginTop: 10 }}>
                <div style={{ height: 6, background: "#F0F0F0", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${progress[song.id] || 0}%`, height: "100%", background: COLORS.primary, borderRadius: 3, transition: "width 0.15s" }} />
                </div>
                <p style={{ color: COLORS.textLight, fontSize: 11, fontStyle: "italic", margin: "6px 0 0", lineHeight: 1.5 }}>
                  🎵 {song.lyrics}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PANTALLA DE INICIO ─────────────────────────────────────────────
function HomeScreen({ childInfo, onNavigate, progress }) {
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return "¡Buenos días";
    if (h < 18) return "¡Buenas tardes";
    return "¡Buenas noches";
  });

  const featuredGames = [
    { id: "abc", name: "Letras ABC", emoji: "🔤", color: COLORS.gradient1, stars: 3 },
    { id: "numbers", name: "Números", emoji: "🔢", color: COLORS.gradient4, stars: 2 },
    { id: "animals", name: "Animales", emoji: "🐾", color: "linear-gradient(135deg,#F39C12,#E74C3C)", stars: 4 },
    { id: "songs", name: "Canciones", emoji: "🎵", color: COLORS.gradient5, stars: 1 },
  ];

  const dailyStreak = 5;
  const totalStars = Object.values(progress).reduce((a, b) => a + b, 0);

  return (
    <div style={{ background: COLORS.lightBg, minHeight: "calc(100dvh - 70px)", overflowY: "auto", paddingBottom: 20 }}>
      {/* Header */}
      <div style={{ background: COLORS.gradient1, padding: "24px 20px 32px", borderRadius: "0 0 32px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
        <div style={{ position: "absolute", bottom: -30, left: -10, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, margin: "0 0 4px" }}>{greeting},</p>
        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 900, margin: "0 0 16px", textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          {childInfo.name}! 👋
        </h1>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 14, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 18 }}>🔥</span>
            <div>
              <p style={{ color: "#fff", fontSize: 11, margin: 0, opacity: 0.8 }}>Racha</p>
              <p style={{ color: "#fff", fontSize: 16, fontWeight: 800, margin: 0 }}>{dailyStreak} días</p>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 14, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 18 }}>⭐</span>
            <div>
              <p style={{ color: "#fff", fontSize: 11, margin: 0, opacity: 0.8 }}>Estrellas</p>
              <p style={{ color: "#fff", fontSize: 16, fontWeight: 800, margin: 0 }}>{totalStars + 24}</p>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 14, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 18 }}>🎯</span>
            <div>
              <p style={{ color: "#fff", fontSize: 11, margin: 0, opacity: 0.8 }}>Nivel</p>
              <p style={{ color: "#fff", fontSize: 16, fontWeight: 800, margin: 0 }}>{childInfo.age}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        {/* Actividad diaria */}
        <div style={{ background: "linear-gradient(135deg,#FFD700,#FF6B35)", borderRadius: 20, padding: "16px 18px", marginBottom: 22, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🌟</div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: "0 0 3px" }}>Actividad del día</p>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, margin: 0 }}>¡Practica letras y gana estrellas!</p>
          </div>
          <button
            onClick={() => onNavigate("game", "abc")}
            style={{ background: "#fff", border: "none", borderRadius: 14, padding: "10px 16px", color: COLORS.primary, fontWeight: 800, fontSize: 13, cursor: "pointer" }}
          >
            ¡Jugar!
          </button>
        </div>

        {/* Juegos destacados */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.text, margin: "0 0 14px" }}>
          Juegos populares ✨
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }}>
          {featuredGames.map(g => (
            <button
              key={g.id}
              onClick={() => onNavigate("game", g.id)}
              style={{
                background: g.color, border: "none", borderRadius: 22,
                padding: "20px 14px", cursor: "pointer", textAlign: "left",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)", transition: "transform 0.2s",
                position: "relative", overflow: "hidden",
              }}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ position: "absolute", top: -15, right: -15, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
              <div style={{ fontSize: 38, marginBottom: 8 }}>{g.emoji}</div>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: 14, margin: "0 0 6px" }}>{g.name}</p>
              <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} style={{ fontSize: 11, opacity: i <= g.stars ? 1 : 0.35 }}>⭐</span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Progreso semanal */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.text, margin: "0 0 14px" }}>
          Tu progreso 📈
        </h2>
        <div style={{ background: "#fff", borderRadius: 20, padding: "18px 16px", marginBottom: 22, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            {["L", "M", "X", "J", "V", "S", "D"].map((day, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 8, height: [40, 60, 35, 70, 45, 80, 30][i],
                  background: i < 5 ? COLORS.primary : "#E0E0E0",
                  borderRadius: 4, transition: "height 0.3s",
                }} />
                <span style={{ fontSize: 11, color: COLORS.textLight, fontWeight: 600 }}>{day}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ color: COLORS.textLight, fontSize: 12, margin: 0 }}>Esta semana aprendiste:</p>
            <p style={{ color: COLORS.primary, fontSize: 14, fontWeight: 800, margin: 0 }}>12 actividades</p>
          </div>
        </div>

        {/* Categorías */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.text, margin: "0 0 14px" }}>
          Explorar categorías 🗂️
        </h2>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8 }}>
          {[
            { name: "ABC", emoji: "🔤", color: COLORS.primary },
            { name: "Números", emoji: "🔢", color: COLORS.green },
            { name: "Animales", emoji: "🐾", color: "#F39C12" },
            { name: "Colores", emoji: "🎨", color: COLORS.pink },
            { name: "Formas", emoji: "🔷", color: COLORS.blue },
            { name: "Música", emoji: "🎵", color: COLORS.purple },
          ].map((cat, i) => (
            <button
              key={i}
              onClick={() => onNavigate("games")}
              style={{
                background: `${cat.color}18`, border: `2px solid ${cat.color}40`,
                borderRadius: 16, padding: "10px 14px",
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 4, cursor: "pointer", flexShrink: 0, minWidth: 72,
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 24 }}>{cat.emoji}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: cat.color, whiteSpace: "nowrap" }}>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PANTALLA DE JUEGOS ─────────────────────────────────────────────
function GamesScreen({ onNavigate }) {
  const categories = [
    {
      title: "Letras y Lectura",
      color: COLORS.gradient1,
      emoji: "🔤",
      games: [
        { id: "abc", name: "Puzzle ABC", emoji: "🔤", desc: "Reconoce las letras", locked: false },
        { id: "trace", name: "Trazar Letras", emoji: "✏️", desc: "Practica la escritura", locked: false },
      ]
    },
    {
      title: "Números y Matemáticas",
      color: COLORS.gradient4,
      emoji: "🔢",
      games: [
        { id: "numbers", name: "Conteo Mágico", emoji: "🔢", desc: "Aprende los números", locked: false },
        { id: "shapes", name: "Formas y Figuras", emoji: "🔷", desc: "Reconoce las formas", locked: false },
      ]
    },
    {
      title: "Mundo Animal",
      color: "linear-gradient(135deg,#F39C12,#E74C3C)",
      emoji: "🐾",
      games: [
        { id: "animals", name: "Animales del Mundo", emoji: "🐾", desc: "Sonidos y nombres", locked: false },
        { id: "memory", name: "Cartas de Memoria", emoji: "🧠", desc: "Encuentra las parejas", locked: false },
      ]
    },
    {
      title: "Música y Canciones",
      color: COLORS.gradient5,
      emoji: "🎵",
      games: [
        { id: "songs", name: "Canciones Infantiles", emoji: "🎵", desc: "Aprende cantando", locked: false },
        { id: null, name: "Karaoke Kids", emoji: "🎤", desc: "Próximamente...", locked: true },
      ]
    },
  ];

  return (
    <div style={{ background: COLORS.lightBg, minHeight: "calc(100dvh - 70px)", overflowY: "auto", padding: "20px 16px", paddingBottom: 24 }}>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: COLORS.text, margin: "0 0 6px" }}>Juegos y Actividades 🎮</h2>
      <p style={{ color: COLORS.textLight, fontSize: 14, margin: "0 0 20px" }}>Más de 15 actividades interactivas</p>
      {categories.map((cat, ci) => (
        <div key={ci} style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: cat.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              {cat.emoji}
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: COLORS.text, margin: 0 }}>{cat.title}</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
            {cat.games.map((game, gi) => (
              <button
                key={gi}
                onClick={() => !game.locked && game.id && onNavigate("game", game.id)}
                style={{
                  background: game.locked ? "#F5F5F5" : "#fff",
                  border: "none", borderRadius: 18,
                  padding: "16px 12px", textAlign: "left", cursor: game.locked ? "not-allowed" : "pointer",
                  boxShadow: game.locked ? "none" : "0 4px 14px rgba(0,0,0,0.07)",
                  transition: "transform 0.2s", opacity: game.locked ? 0.7 : 1,
                  position: "relative", overflow: "hidden",
                }}
                onMouseDown={e => !game.locked && (e.currentTarget.style.transform = "scale(0.97)")}
                onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
              >
                {game.locked && (
                  <div style={{ position: "absolute", top: 10, right: 10, fontSize: 16 }}>🔒</div>
                )}
                <div style={{ fontSize: 34, marginBottom: 8 }}>{game.emoji}</div>
                <p style={{ fontWeight: 800, color: game.locked ? COLORS.textLight : COLORS.text, fontSize: 13, margin: "0 0 4px" }}>{game.name}</p>
                <p style={{ fontSize: 11, color: COLORS.textLight, margin: 0 }}>{game.desc}</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── PANTALLA DE APRENDIZAJE ────────────────────────────────────────
function LearnScreen({ onNavigate }) {
  const topics = [
    { title: "Escritura", emoji: "✏️", count: 45, color: COLORS.gradient1 },
    { title: "Lenguaje", emoji: "💬", count: 38, color: COLORS.gradient2 },
    { title: "Matemáticas", emoji: "🔢", count: 52, color: COLORS.gradient4 },
    { title: "Lógica", emoji: "🧠", count: 29, color: COLORS.gradient3 },
    { title: "Creatividad", emoji: "🎨", count: 41, color: COLORS.gradient6 },
    { title: "Dinosaurios", emoji: "🦕", count: 18, color: "linear-gradient(135deg,#F39C12,#E67E22)" },
    { title: "Naturaleza", emoji: "🌿", count: 33, color: COLORS.gradient4 },
    { title: "Ciencias", emoji: "🔬", count: 22, color: COLORS.gradient3 },
  ];

  return (
    <div style={{ background: COLORS.lightBg, minHeight: "calc(100dvh - 70px)", overflowY: "auto", padding: "20px 16px", paddingBottom: 24 }}>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: COLORS.text, margin: "0 0 6px" }}>Hojas de Trabajo 📚</h2>
      <p style={{ color: COLORS.textLight, fontSize: 14, margin: "0 0 4px" }}>+500 actividades imprimibles</p>
      <div style={{ background: COLORS.gradient1, borderRadius: 16, padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 24 }}>⏱️</span>
        <p style={{ color: "#fff", fontSize: 13, margin: 0, fontWeight: 600 }}>
          Más de <strong>400 horas</strong> de aprendizaje significativo para tu hijo/a
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
        {topics.map((t, i) => (
          <div
            key={i}
            style={{
              background: "#fff", borderRadius: 20,
              overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,0.07)",
              cursor: "pointer", transition: "transform 0.2s",
            }}
            onClick={() => onNavigate("games")}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{ background: t.color, padding: "18px", textAlign: "center" }}>
              <span style={{ fontSize: 40 }}>{t.emoji}</span>
            </div>
            <div style={{ padding: "12px" }}>
              <p style={{ fontWeight: 800, color: COLORS.text, fontSize: 14, margin: "0 0 4px" }}>{t.title}</p>
              <p style={{ color: COLORS.textLight, fontSize: 12, margin: 0 }}>{t.count} hojas</p>
              <div style={{ marginTop: 8, height: 4, background: "#F0F0F0", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${Math.random() * 60 + 20}%`, height: "100%", background: COLORS.primary, borderRadius: 2 }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Consejos para padres */}
      <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.text, margin: "24px 0 12px" }}>
        Consejos para Padres 👨‍👩‍👧
      </h2>
      {[
        { emoji: "🌟", title: "Sesiones cortas", desc: "15-20 min al día son suficientes para un aprendizaje efectivo." },
        { emoji: "🎯", title: "Refuerzo positivo", desc: "Celebra cada logro pequeño para motivar a tu hijo/a." },
        { emoji: "📱", title: "Aprende junto a ellos", desc: "Participar en las actividades fortalece el vínculo familiar." },
      ].map((tip, i) => (
        <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", marginBottom: 10, display: "flex", gap: 12, alignItems: "flex-start", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <span style={{ fontSize: 28 }}>{tip.emoji}</span>
          <div>
            <p style={{ fontWeight: 700, color: COLORS.text, margin: "0 0 3px", fontSize: 14 }}>{tip.title}</p>
            <p style={{ color: COLORS.textLight, margin: 0, fontSize: 13, lineHeight: 1.5 }}>{tip.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── PANTALLA DE PERFIL ─────────────────────────────────────────────
function ProfileScreen({ childInfo, onReset }) {
  const achievements = [
    { emoji: "🔤", name: "Maestro de las Letras", unlocked: true },
    { emoji: "🔢", name: "Mago de los Números", unlocked: true },
    { emoji: "🧠", name: "Memoria de Elefante", unlocked: true },
    { emoji: "🎵", name: "Pequeño Músico", unlocked: false },
    { emoji: "🦕", name: "Explorador Dino", unlocked: false },
    { emoji: "🏆", name: "Campeón Titch", unlocked: false },
  ];

  const stats = [
    { label: "Días aprendiendo", value: "12", emoji: "📅" },
    { label: "Actividades completadas", value: "34", emoji: "✅" },
    { label: "Estrellas ganadas", value: "156", emoji: "⭐" },
    { label: "Minutos aprendidos", value: "240", emoji: "⏱️" },
  ];

  return (
    <div style={{ background: COLORS.lightBg, minHeight: "calc(100dvh - 70px)", overflowY: "auto", paddingBottom: 24 }}>
      {/* Header perfil */}
      <div style={{ background: COLORS.gradient2, padding: "32px 20px 40px", borderRadius: "0 0 36px 36px", textAlign: "center" }}>
        <div style={{ width: 88, height: 88, borderRadius: "50%", background: "rgba(255,255,255,0.2)", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, border: "4px solid rgba(255,255,255,0.5)" }}>
          👤
        </div>
        <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: "0 0 4px" }}>{childInfo.name}</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, margin: 0 }}>
          {childInfo.age} años · Explorador Nivel 3
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 12 }}>
          {[1,2,3,4,5].map(i => (
            <span key={i} style={{ fontSize: 16, opacity: i <= 3 ? 1 : 0.35 }}>⭐</span>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        {/* Estadísticas */}
        <h3 style={{ fontSize: 17, fontWeight: 800, color: COLORS.text, margin: "0 0 14px" }}>Mis estadísticas 📊</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "14px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.emoji}</div>
              <p style={{ fontWeight: 900, color: COLORS.primary, fontSize: 22, margin: "0 0 2px" }}>{s.value}</p>
              <p style={{ color: COLORS.textLight, fontSize: 11, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Logros */}
        <h3 style={{ fontSize: 17, fontWeight: 800, color: COLORS.text, margin: "0 0 14px" }}>Mis logros 🏆</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24 }}>
          {achievements.map((a, i) => (
            <div
              key={i}
              style={{
                background: a.unlocked ? "#fff" : "#F5F5F5",
                borderRadius: 16, padding: "16px 8px", textAlign: "center",
                boxShadow: a.unlocked ? "0 4px 14px rgba(0,0,0,0.08)" : "none",
                border: a.unlocked ? `2px solid ${COLORS.secondary}` : "2px solid transparent",
                opacity: a.unlocked ? 1 : 0.5,
              }}
            >
              <div style={{ fontSize: 32, filter: a.unlocked ? "none" : "grayscale(100%)", marginBottom: 6 }}>{a.emoji}</div>
              <p style={{ fontSize: 10, fontWeight: 700, color: a.unlocked ? COLORS.text : COLORS.textLight, margin: 0, lineHeight: 1.3 }}>{a.name}</p>
              {!a.unlocked && <p style={{ fontSize: 14, margin: "4px 0 0" }}>🔒</p>}
            </div>
          ))}
        </div>

        {/* Suscripción */}
        <div style={{ background: "linear-gradient(135deg,#FF6B35,#FFD700)", borderRadius: 20, padding: "20px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 32 }}>👑</span>
            <div>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: 16, margin: 0 }}>Titch Premium</p>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, margin: 0 }}>Desbloquea todo el contenido</p>
            </div>
          </div>
          {[
            "Más de 500 hojas de trabajo",
            "Todos los juegos desbloqueados",
            "Sin anuncios",
            "Acceso sin conexión",
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <span style={{ color: "#fff", fontSize: 13 }}>✓</span>
              <span style={{ color: "#fff", fontSize: 13 }}>{f}</span>
            </div>
          ))}
          <button style={{ marginTop: 12, width: "100%", background: "#fff", border: "none", borderRadius: 14, padding: "13px 0", fontSize: 15, fontWeight: 800, color: COLORS.primary, cursor: "pointer" }}>
            Probar gratis 7 días
          </button>
        </div>

        {/* Opciones */}
        {[
          { emoji: "🔔", label: "Notificaciones" },
          { emoji: "🌐", label: "Idioma" },
          { emoji: "👨‍👩‍👧", label: "Control parental" },
          { emoji: "ℹ️", label: "Acerca de Titch" },
        ].map((opt, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            <span style={{ fontSize: 22 }}>{opt.emoji}</span>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: COLORS.text }}>{opt.label}</span>
            <span style={{ color: COLORS.textLight, fontSize: 16 }}>›</span>
          </div>
        ))}

        <button
          onClick={onReset}
          style={{ width: "100%", background: "transparent", border: `2px solid #E0E0E0`, borderRadius: 14, padding: "13px 0", fontSize: 14, fontWeight: 700, color: COLORS.textLight, cursor: "pointer", marginTop: 8 }}
        >
          Cambiar perfil de niño/a
        </button>
        <p style={{ color: COLORS.textLight, fontSize: 11, textAlign: "center", marginTop: 16 }}>
          Titch v1.0 · VitaStudio · Privacidad
        </p>
      </div>
    </div>
  );
}

// ── BARRA DE NAVEGACIÓN ────────────────────────────────────────────
function BottomNav({ active, onNavigate }) {
  const tabs = [
    { id: "home", emoji: "🏠", label: "Inicio" },
    { id: "games", emoji: "🎮", label: "Juegos" },
    { id: "learn", emoji: "📚", label: "Aprender" },
    { id: "profile", emoji: "👤", label: "Perfil" },
  ];

  return (
    <div style={{
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: "100%", maxWidth: 430,
      background: "#fff", borderTop: "1px solid #F0F0F0",
      display: "flex", height: 70,
      boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
      zIndex: 100,
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onNavigate(tab.id)}
          style={{
            flex: 1, background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 2,
            transition: "all 0.15s",
          }}
        >
          <span style={{ fontSize: active === tab.id ? 26 : 22, transition: "font-size 0.15s", filter: active !== tab.id ? "grayscale(60%)" : "none" }}>
            {tab.emoji}
          </span>
          <span style={{
            fontSize: 10, fontWeight: active === tab.id ? 800 : 500,
            color: active === tab.id ? COLORS.primary : COLORS.textLight,
            transition: "color 0.15s",
          }}>
            {tab.label}
          </span>
          {active === tab.id && (
            <div style={{ position: "absolute", bottom: 0, width: 36, height: 3, background: COLORS.primary, borderRadius: "2px 2px 0 0" }} />
          )}
        </button>
      ))}
    </div>
  );
}

// ── APP PRINCIPAL ──────────────────────────────────────────────────
export default function App() {
  const [appState, setAppState] = useState("splash"); // splash, onboarding, main
  const [screen, setScreen] = useState("home");
  const [activeGame, setActiveGame] = useState(null);
  const [childInfo, setChildInfo] = useState(null);
  const [progress, setProgress] = useState({});

  const handleSplashFinish = () => {
    const saved = localStorage.getItem("titch_child");
    if (saved) {
      setChildInfo(JSON.parse(saved));
      setAppState("main");
    } else {
      setAppState("onboarding");
    }
  };

  const handleOnboardingFinish = (info) => {
    setChildInfo(info);
    localStorage.setItem("titch_child", JSON.stringify(info));
    setAppState("main");
  };

  const handleNavigate = (targetScreen, gameId = null) => {
    if (targetScreen === "game" && gameId) {
      setActiveGame(gameId);
      setScreen("game");
    } else {
      setScreen(targetScreen);
      setActiveGame(null);
    }
  };

  const handleBackFromGame = () => {
    setScreen("games");
    setActiveGame(null);
    setProgress(prev => ({ ...prev, [activeGame]: (prev[activeGame] || 0) + 1 }));
  };

  const handleReset = () => {
    localStorage.removeItem("titch_child");
    setChildInfo(null);
    setAppState("onboarding");
  };

  const renderGame = () => {
    const props = { onBack: handleBackFromGame };
    switch (activeGame) {
      case "abc": return <ABCPuzzle {...props} />;
      case "trace": return <TraceLetters {...props} />;
      case "memory": return <MemoryCards {...props} />;
      case "shapes": return <ShapesPuzzle {...props} />;
      case "numbers": return <NumbersGame {...props} />;
      case "animals": return <AnimalsGame {...props} />;
      case "songs": return <KidsSongs {...props} />;
      default: return <div style={{ padding: 40, textAlign: "center", fontSize: 18 }}>Juego no encontrado</div>;
    }
  };

  const renderScreen = () => {
    if (screen === "game") return renderGame();
    switch (screen) {
      case "home": return <HomeScreen childInfo={childInfo} onNavigate={handleNavigate} progress={progress} />;
      case "games": return <GamesScreen onNavigate={handleNavigate} />;
      case "learn": return <LearnScreen onNavigate={handleNavigate} />;
      case "profile": return <ProfileScreen childInfo={childInfo} onReset={handleReset} />;
      default: return null;
    }
  };

  if (appState === "splash") return <SplashScreen onFinish={handleSplashFinish} />;
  if (appState === "onboarding") return <OnboardingScreen onFinish={handleOnboardingFinish} />;

  return (
    <div style={{
      maxWidth: 430, margin: "0 auto", minHeight: "100dvh",
      background: COLORS.lightBg, position: "relative",
      fontFamily: "'Nunito', 'Comic Sans MS', 'Segoe UI', sans-serif",
      boxShadow: "0 0 40px rgba(0,0,0,0.15)",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-12px); } }
        @keyframes pulse { 0%,100%{opacity:0.4;transform:scale(0.8);} 50%{opacity:1;transform:scale(1.2);} }
        @keyframes shake { 0%,100%{transform:translateX(0);} 25%{transform:translateX(-6px);} 75%{transform:translateX(6px);} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px);} to{opacity:1;transform:translateY(0);} }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 0; }
      `}</style>
      <div style={{ paddingBottom: screen === "game" ? 0 : 70 }}>
        {renderScreen()}
      </div>
      {screen !== "game" && (
        <BottomNav active={screen} onNavigate={handleNavigate} />
      )}
    </div>
  );
}