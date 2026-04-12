import { useState, useEffect } from 'react';

const TOTAL_MS = 3000;

// All animation CSS lives here — keeps the component self-contained.
// cl- prefix avoids collisions with the rest of the site.
const CSS = `
  /* ── Full-screen overlay ─────────────────────────────────────────── */
  .cl-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: #080808;
    animation: cl-overlay-fade ${TOTAL_MS}ms ease-in-out forwards;
    pointer-events: all;
  }

  /* Fills the overlay — children use absolute positioning */
  .cl-stage {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  /*
   * Pivot — a zero-size anchor point at 40% / 50% of the viewport.
   * The top of the can assembly is placed here, so when the can rotates
   * it pivots from this point (its opening) — liquid falls straight down.
   */
  .cl-pivot {
    position: absolute;
    top: 40%;
    left: 50%;
  }

  /* ── Can assembly — rotates around its top-centre ────────────────── */
  .cl-wrap {
    position: absolute;
    top: 0;
    left: -35px;              /* half of 70px can width centres the can on pivot */
    width: 70px;
    transform-origin: 35px 0; /* top-centre of can = the pivot point */
    animation: cl-can-pour ${TOTAL_MS}ms cubic-bezier(0.45, 0, 0.55, 1) forwards;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  /* Pull tab */
  .cl-tab {
    width: 26px;
    height: 9px;
    align-self: center;
    background: linear-gradient(180deg, #d8d8d8 0%, #a0a0a0 50%, #666 100%);
    border-radius: 3px 3px 1px 1px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.55), 0 2px 4px rgba(0,0,0,0.7);
    flex-shrink: 0;
  }

  /* Top rim — metallic ellipse (same gradient as CanHero) */
  .cl-top-rim {
    width: 70px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(180deg,
      #c0c0c0 0%, #909090 15%, #686868 35%,
      #444 60%, #2a2a2a 80%, #1a1a1a 100%
    );
    box-shadow: 0 2px 8px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.4);
    flex-shrink: 0;
    position: relative;
  }
  .cl-top-rim::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 10%;
    width: 40%;
    height: 6px;
    background: rgba(255,255,255,0.45);
    border-radius: 50%;
  }

  /* Can body — cylindrical lighting (same layered gradients as CanHero) */
  .cl-body {
    width: 70px;
    height: 175px;
    background:
      linear-gradient(to right,
        rgba(0,0,0,0.50)          0%,
        rgba(0,0,0,0.20)         10%,
        rgba(255,255,255,0.10)   16%,
        rgba(255,255,255,0.04)   26%,
        transparent              38%,
        transparent              68%,
        rgba(0,0,0,0.28)         82%,
        rgba(0,0,0,0.58)        100%
      ),
      linear-gradient(to right,
        #0e0e0e 0%, #1f1f1f 20%, #1c1c1c 50%, #141414 80%, #080808 100%
      );
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Monster M logo — glows in at start */
  .cl-logo {
    width: 65%;
    height: auto;
    position: relative;
    z-index: 2;
    opacity: 0;
    animation: cl-logo-glow ${TOTAL_MS}ms ease-in-out forwards;
  }

  /* Inner liquid contents */
  .cl-contents {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  /* Green liquid — fills from bottom, then rotates with gravity as can tilts */
  .cl-water {
    position: absolute;
    left: -5%;
    right: -5%;
    bottom: 0;
    height: 100%;
    background: rgba(0, 220, 50, 0.85);
    transform: scaleY(0);
    transform-origin: bottom center;
    animation: cl-fill-water ${TOTAL_MS}ms ease-in-out forwards;
    z-index: 1;
  }

  /* Dark foam settles at the bottom of the liquid */
  .cl-inner-foam {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 22%;
    background: #006614;
    transform: scaleY(0);
    transform-origin: bottom center;
    animation: cl-fill-foam ${TOTAL_MS}ms ease-in-out forwards;
    z-index: 2;
  }

  /* Green strip — sits between body and bottom rim */
  .cl-strip {
    width: 70px;
    height: 10px;
    background: linear-gradient(180deg,
      #00ff44 0%, #00DC32 40%, #009922 70%, #006614 100%
    );
    box-shadow: 0 0 10px rgba(0,220,50,0.6), inset 0 1px 0 rgba(255,255,255,0.3);
    border-radius: 0 0 3px 3px;
    flex-shrink: 0;
    margin: 0;
  }

  /* Bottom rim */
  .cl-bottom-rim {
    width: 70px;
    height: 14px;
    border-radius: 50%;
    background: linear-gradient(180deg,
      #c0c0c0 0%, #909090 15%, #686868 35%,
      #444 60%, #2a2a2a 80%, #1a1a1a 100%
    );
    box-shadow: 0 5px 12px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.4);
    flex-shrink: 0;
  }

  /*
   * Drop — positioned at the pivot (can opening).
   * NOT inside cl-wrap, so it falls straight down regardless of can rotation.
   */
  .cl-drop {
    position: absolute;
    top: -5px;
    left: -7px;
    width: 14px;
    height: 14px;
    background: #00DC32;
    border-radius: 0 100% 100% 100%;
    transform: rotate(-45deg) scale(0);
    transform-origin: left top;
    animation: cl-drop ${TOTAL_MS}ms ease-in-out forwards;
    filter: drop-shadow(0 0 4px rgba(0,220,50,0.8));
    z-index: 5;
  }

  /*
   * Pour stream — thin vertical bar from the pivot downward.
   * Appears while the can is tilted; fades when can returns upright.
   */
  .cl-stream {
    position: absolute;
    top: 0;
    left: -5px;
    width: 10px;
    height: 55vh;
    background: linear-gradient(to bottom,
      rgba(0,220,50,0.9)  0%,
      rgba(0,220,50,0.55) 55%,
      rgba(0,220,50,0.1) 100%
    );
    transform: scaleY(0);
    transform-origin: top center;
    animation: cl-stream ${TOTAL_MS}ms ease-in-out forwards;
    border-radius: 0 0 5px 5px;
    z-index: 3;
  }

  /* Green pool that grows at the bottom of the screen */
  .cl-pool {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: rgba(0, 220, 50, 0.85);
    transform: scaleY(0);
    transform-origin: bottom center;
    animation: cl-pool-fill ${TOTAL_MS}ms ease-in-out forwards;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(0,220,50,0.35);
  }

  .cl-pool-foam {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 35%;
    background: #006614;
    border-top: 2px solid #009922;
    transform: scaleY(0);
    transform-origin: bottom center;
    animation: cl-pool-foam-kf ${TOTAL_MS}ms ease-in-out forwards;
  }

  /* ── Keyframes ──────────────────────────────────────────────────────── */

  /* Overlay fades out in the final ~12% */
  @keyframes cl-overlay-fade {
    0%, 88%  { opacity: 1; }
    100%     { opacity: 0; }
  }

  /*
   * Can pours:
   *   0–10%   upright   → M logo glows in
   *   10–30%  tilting   → 105 deg clockwise (transform-origin = top of can)
   *   30–65%  held tilted → liquid streams
   *   65–80%  tilting back → upright
   */
  @keyframes cl-can-pour {
    0%, 10%  { transform: rotate(0deg); }
    30%      { transform: rotate(105deg); }
    65%      { transform: rotate(105deg); }
    80%      { transform: rotate(0deg); }
    100%     { transform: rotate(0deg); }
  }

  /* Logo glows in as can is introduced, stays visible during pour */
  @keyframes cl-logo-glow {
    0%, 5%   { opacity: 0;   filter: drop-shadow(0 0 0   rgba(0,220,50,0)); }
    14%      { opacity: 1;   filter: drop-shadow(0 0 16px rgba(0,220,50,0.9)); }
    28%      { opacity: 0.9; filter: drop-shadow(0 0 14px rgba(0,220,50,0.7)); }
    100%     { opacity: 0.9; filter: drop-shadow(0 0 14px rgba(0,220,50,0.7)); }
  }

  /*
   * Liquid fills the inside of the can from bottom, then at 45–55% the
   * transform-origin shifts to top-right so when it rotates −105 deg it
   * appears to maintain its level (gravity) while the can is tilted.
   */
  @keyframes cl-fill-water {
    0%, 10%   { transform: scaleY(0);   transform-origin: bottom center; }
    28%       { transform: scaleY(1);   transform-origin: bottom center; }
    45%, 55%  {
      transform: scaleY(1) rotate(0deg);
      background-color: rgba(0,220,50,0.85);
      transform-origin: top right;
    }
    72%, 100% {
      transform: rotate(-105deg);
      background-color: rgba(0,153,34,0.9);
      transform-origin: top right;
    }
  }

  @keyframes cl-fill-foam {
    0%, 15%   { transform: scaleY(0); opacity: 0; }
    30%, 68%  { transform: scaleY(1); opacity: 1; }
    82%, 100% { transform: scaleY(0); opacity: 0; }
  }

  /* Drop appears at the pivot (can opening), falls and fades toward pool */
  @keyframes cl-drop {
    0%, 28%  { transform: rotate(-45deg) scale(0); opacity: 1; }
    36%      { transform: rotate(-45deg) scale(1.3); opacity: 1; }
    40%      { transform: rotate(-45deg) scale(1);   opacity: 1; }
    68%      { transform: rotate(-45deg) scale(1) translate(10px, 52vh); opacity: 0; }
    100%     { transform: rotate(-45deg) scale(0);   opacity: 0; }
  }

  /* Stream grows downward during pour phase then retracts */
  @keyframes cl-stream {
    0%, 30%   { transform: scaleY(0); opacity: 0; }
    36%       { transform: scaleY(1); opacity: 1; }
    63%       { transform: scaleY(1); opacity: 1; }
    74%, 100% { transform: scaleY(0); opacity: 0; }
  }

  /* Pool grows as liquid lands, fades before overlay disappears */
  @keyframes cl-pool-fill {
    0%, 30%  { transform: scaleY(0); opacity: 1; }
    36%      { transform: scaleY(0.2); }
    65%      { transform: scaleY(1);  opacity: 1; }
    82%, 85% { transform: scaleY(1);  opacity: 1; }
    93%      { opacity: 0; }
    100%     { opacity: 0; transform: scaleY(1); }
  }

  @keyframes cl-pool-foam-kf {
    0%, 36%  { transform: scaleY(0); opacity: 0; }
    42%      { transform: scaleY(1); opacity: 1; }
    82%, 85% { transform: scaleY(1); opacity: 1; }
    93%      { opacity: 0; }
    100%     { opacity: 0; }
  }

  /* Reduced motion: skip entire animation, unmount immediately via JS */
  @media (prefers-reduced-motion: reduce) {
    .cl-overlay {
      animation: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  }
`;

export default function CanLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = prefersReduced ? 100 : TOTAL_MS;
    const timer = setTimeout(() => setVisible(false), delay);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cl-overlay" aria-hidden="true" role="presentation">
        <div className="cl-stage">

          {/* Pivot anchors the can opening at 40% / 50% viewport */}
          <div className="cl-pivot">

            {/* Can assembly — rotates around its top-centre */}
            <div className="cl-wrap">
              <div className="cl-tab" />
              <div className="cl-top-rim" />
              <div className="cl-body">
                <img
                  src="/icons/monster-m.svg"
                  className="cl-logo"
                  alt=""
                  aria-hidden="true"
                />
                <div className="cl-contents">
                  <div className="cl-water" />
                  <div className="cl-inner-foam" />
                </div>
              </div>
              <div className="cl-strip" />
              <div className="cl-bottom-rim" />
            </div>

            {/* Drop and stream sit at the pivot — fall straight down */}
            <div className="cl-drop" />
            <div className="cl-stream" />
          </div>

          {/* Green pool builds at the bottom of the screen */}
          <div className="cl-pool">
            <div className="cl-pool-foam" />
          </div>

        </div>
      </div>
    </>
  );
}
