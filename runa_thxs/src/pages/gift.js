"use client";

import { useEffect, useState } from "react";
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
  "/Emoji/archivo_28.png",
  "/Emoji/archivo_29.png",
  "/Emoji/Leon_Kennedy_emote_1.png",
  "/Emoji/Leon_Kennedy_emote_11.png",
];

export default function Gift() {
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

  return (
    <div className={`page ${poppins.className}`}>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart"
          style={{
            left: `${h.left}vw`,
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
          THANK YOU VERY MUCH!
        </h2>

        <p className="message">
          I appreciate having you around and the gift you gave me
        </p>
      </div>

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

        /* Emoji above the title.
           Change text-align to: left | center | right */
        .emoji {
          margin-bottom: 12px;
          text-align: center;
        }

        .emoji-img {
          width: 90px;
          height: 90px;
          object-fit: contain;
          display: inline-block;
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
          margin: 0 0 20px;
          line-height: 1.35;
        }

        .message {
          font-size: 18px;
          color: #6b6b6b;
          line-height: 1.6;
          margin: 0;
        }

        .heart {
          position: fixed;
          bottom: -20px;
          animation: floatUp linear forwards;
          pointer-events: none;
          filter: blur(0.3px);
        }

        .heart img {
          display: block;
          object-fit: contain;
        }

        @keyframes floatUp {
          from { transform: translateY(0) scale(1); opacity: 1; }
          to { transform: translateY(-120vh) scale(1.8); opacity: 0; }
        }

        @media (max-width: 480px) {
          h2 { font-size: 23px; }
        }
      `}</style>
    </div>
  );
}