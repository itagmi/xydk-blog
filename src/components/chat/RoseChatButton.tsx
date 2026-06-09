"use client";

type ParticleStyle = React.CSSProperties & {
  "--dur"?: string;
  "--delay"?: string;
};

const SPARKLES: ParticleStyle[] = [
  { top: 8, left: 12, "--dur": "1.8s", "--delay": "0s" },
  { top: 6, right: 10, "--dur": "2.1s", "--delay": "0.4s" },
  { bottom: 10, left: 8, "--dur": "1.6s", "--delay": "0.8s" },
  { bottom: 8, right: 12, "--dur": "2.3s", "--delay": "0.2s" },
  { top: "50%", left: 4, "--dur": "1.9s", "--delay": "1s" },
];

const HEARTS: ParticleStyle[] = [
  { top: -5, left: 5, "--dur": "2.5s", "--delay": "0s" },
  { top: -5, right: 5, "--dur": "2.8s", "--delay": "1.2s" },
];

type RoseChatButtonProps = {
  open?: boolean;
  onClick: () => void;
  "aria-label"?: string;
};

export default function RoseChatButton({
  open = false,
  onClick,
  "aria-label": ariaLabel = "챗봇 열기",
}: RoseChatButtonProps) {
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={onClick}
        aria-label={open ? "챗봇 닫기" : ariaLabel}
        aria-expanded={open}
        className={`rose-btn ${open ? "rose-btn--open" : ""}`}
      >
        {open ? "✕" : "🌹"}

        {!open &&
          SPARKLES.map((style, index) => (
            <span
              key={`sparkle-${index}`}
              className="rose-sparkle"
              style={style}
              aria-hidden
            />
          ))}

        {!open &&
          HEARTS.map((style, index) => (
            <span
              key={`heart-${index}`}
              className="rose-heart"
              style={style}
              aria-hidden
            >
              🤍
            </span>
          ))}
      </button>
    </div>
  );
}
