import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }
    };

    // Smooth ring follow via RAF lerp
    const lerp = (a, b, t) => a + (b - a) * t;
    const animateRing = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top  = `${ringPos.current.y}px`;
      }
      raf.current = requestAnimationFrame(animateRing);
    };
    animateRing();

    const onOver = (e) => {
      const el = e.target;
      const isInteractive =
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.closest("a") ||
        el.closest("button") ||
        el.classList.contains("glass-card") ||
        el.classList.contains("kv-input") ||
        el.role === "button";
      setHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver,  { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width:  hovering ? "0px" : "7px",
          height: hovering ? "0px" : "7px",
          background: "var(--clr-cyan-bright)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10001,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 14px var(--clr-cyan), 0 0 28px var(--clr-cyan-glow)",
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width:  hovering ? "52px" : "36px",
          height: hovering ? "52px" : "36px",
          border: `${hovering ? "1.5px" : "1.5px"} solid`,
          borderColor: hovering ? "var(--clr-cyan-bright)" : "var(--clr-primary-mid)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10000,
          transform: "translate(-50%, -50%)",
          background: hovering ? "rgba(6,182,212,0.06)" : "transparent",
          boxShadow: hovering
            ? "0 0 16px var(--clr-cyan-glow), inset 0 0 10px var(--clr-cyan-soft)"
            : "0 0 10px var(--clr-primary-glow)",
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
        }}
      />
    </>
  );
}
