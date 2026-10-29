"use client";

import { useEffect, useRef, useState } from "react";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

const heartImages = [
  "/Emoji/archivo_31.png",
  "/Emoji/Leon_Kennedy_emote_11.png",
  "/Emoji/archivo_34.png",
  "/Emoji/Leon_Kennedy_emote_7.png",
];

const Emj = ({ name }) => (
  <img
    src={`/Emoji/${name}.png`}
    alt=""
    style={{ height: "1.1em", width: "auto", verticalAlign: "-0.2em", marginLeft: 6 }}
  />
);

const MAX_NO_CLICKS = 4;

const noLabels = [
   <>No <Emj name="archivo_24" /></>,
  <>Are you sure? <Emj name="archivo_17" /></>,
  <>Really?? <Emj name="archivo_7" /></>,
  <>Okay fine... <Emj name="archivo_13" /></>,
 <>I didn't know you hate me that much <Emj name="Leon_Kennedy_emote_15" /></>,];
const messages = [
  "",
  <>You miss clicked <Emj name="archivo_7" /></>,
  <>You really going to say no <Emj name="archivo_21" /></>,
  <>Come on pick the righ  one <Emj name="archivo_15" /></>,
  <>YOU MADE LEON ANGRY YOU BULLY <Emj name="Leon_Kennedy_emote_2" /></>,
];

export default function Home() {
  const noSoundRef = useRef(null);
  const yesSoundRef = useRef(null);

  const [noClicks, setNoClicks] = useState(0);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    let id = 0;
    const interval = setInterval(() => {
      const heart = {
        id: id++,
        src: heartImages[Math.floor(Math.random() * heartImages.length)],
        left: Math.random() * 100,
        size: Math.random() * 22 + 14,
        duration: Math.random() * 3 + 4,
        opacity: Math.random() * 0.5 + 0.4,
      };
      setHearts((prev) => [...prev, heart]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== heart.id));
      }, 8000);
    }, 380);

    return () => clearInterval(interval);
  }, []);

  const handleNo = () => {
    if (noClicks >= MAX_NO_CLICKS) return;

    const audio = noSoundRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }

    setNoClicks((c) => c + 1);
  };

  const handleYes = () => {
    yesSoundRef.current?.play().catch(() => {});

    setTimeout(() => {
      alert("I just wanted to say THANK YOU VERY MUCH!");
    }, 500);
  };

  const noDisabled = noClicks >= MAX_NO_CLICKS;

  return (
    <div className={`page ${poppins.className}`}>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart"
          style={{
            left: `${h.left}vw`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            opacity: h.opacity,
          }}
        >
          <img src={h.src} alt="" style={{ width: h.size * 2, height: h.size * 2 }} />
        </div>
      ))}

      <div className="card">
        <div className="emoji">
          <img src="/Emoji/Leon_Kennedy_emote_9.png" alt="Leon" className="emoji-img" />
        </div>
        <h2 className={playfair.className}>
          Runa
          <br />
          I have a gift for you. Do you Accept?
        </h2>

        <div className="buttons">
          <button
            className="yes"
            onClick={handleYes}
            style={{ fontSize: `${16 + noClicks * 10}px` }}
          >
            Yes <Emj name="archivo_29" />
          </button>
          <button className="no" onClick={handleNo} disabled={noDisabled}>
            {noLabels[noClicks]}
          </button>
        </div>

        <div className="hint">{messages[noClicks]}</div>
      </div>

      <audio
        ref={noSoundRef}
        src="https://assets.mixkit.co/sfx/preview/mixkit-cartoon-voice-laugh-343.mp3"
      />
      <audio
        ref={yesSoundRef}
        src="https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3"
      />

      <style jsx global>{`
        body {
          margin: 0;
          overflow: hidden;
        }
      `}</style>

      <style jsx>{`
        .page,
        .page * {
          box-sizing: border-box;
        }

        .page {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1);
          background-size: 400% 400%;
          animation: bgMove 12s ease infinite;
          overflow: hidden;
        }

        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .card {
          width: min(92%, 420px);
          padding: 40px 30px 45px;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(18px);
          border-radius: 28px;
          text-align: center;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25),
            inset 0 0 0 1px rgba(255, 255, 255, 0.4);
          position: relative;
          animation: cardIn 1.1s ease;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .card::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 30px;
          background: linear-gradient(120deg, #ff4d6d, #ff9a9e, #fbc2eb);
          z-index: -1;
          filter: blur(20px);
          opacity: 0.7;
        }

        .emoji {
          font-size: 68px;
          margin-bottom: 12px;
          animation: heartbeat 1.8s infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.08); }
          50% { transform: scale(1); }
          75% { transform: scale(1.12); }
        }

        h2 {
          font-size: 28px;
          font-weight: 600;
          color: #4a1c2f;
          margin: 0 0 30px;
          line-height: 1.35;
        }

        .buttons {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 16px;
          min-height: 78px;
        }

        button {
          padding: 0.875em 2.2em;
          border-radius: 40px;
          border: none;
          font-family: inherit;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        button:active {
          transform: scale(0.94);
        }

        .yes {
          background: linear-gradient(135deg, #ff4d6d, #ff758f);
          color: #fff;
          box-shadow: 0 15px 35px rgba(255, 77, 109, 0.55);
        }

        .yes:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(255, 77, 109, 0.7);
        }

        .no {
          background: rgba(255, 255, 255, 0.9);
          color: #777;
        }

        .no:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .hint {
          margin-top: 28px;
          min-height: 20px;
          font-size: 13px;
          color: #6b6b6b;
          font-style: italic;
        }

        .heart {
          position: fixed;
          bottom: -20px;
          animation: floatUp linear forwards;
          pointer-events: none;
          filter: blur(0.3px);
        }

        @keyframes floatUp {
          from { transform: translateY(0) scale(1); opacity: 1; }
          to { transform: translateY(-120vh) scale(1.8); opacity: 0; }
        }

        .emoji-img {
          width: 90px;
          height: 90px;
          object-fit: contain;
        }

        .heart img {
          display: block;
          object-fit: contain;
        }

        @media (max-width: 480px) {
          h2 { font-size: 23px; }
          .emoji { font-size: 58px; }
        }
      `}</style>
    </div>
  );
}