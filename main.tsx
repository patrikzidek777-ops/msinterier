@import "tailwindcss";

@theme {
  --color-brand-light: #ffffff;
  --color-brand-gold: #8b5a2b; /* richer wood tone */
  --color-brand-dark: #1a0e08; /* deep wood black/brown */
  --color-brand-gray: #dcd0c5;
}

@keyframes logoIntro {
  0% { transform: scale(0.8); opacity: 0; filter: blur(10px); }
  50% { transform: scale(1.05); opacity: 1; filter: blur(0px); }
  100% { transform: scale(1); opacity: 1; filter: blur(0px); }
}

@keyframes floatUp {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes floatDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(15px); }
}

@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

body {
  background-color: var(--color-brand-dark);
  color: var(--color-brand-light);
  overflow-x: hidden;
}

html {
  scroll-behavior: smooth;
}

.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: .07;
  z-index: 999;
  background-image: repeating-radial-gradient(circle, #fff 0 1px, transparent 1px 3px);
  mix-blend-mode: overlay;
}

.scroll-motion {
  transform: translate3d(0, 60px, 0) scale(.98);
  opacity: 0;
  transition:
    transform 1s cubic-bezier(.16, 1, .3, 1),
    opacity 1s cubic-bezier(.16, 1, .3, 1);
  will-change: transform, opacity;
}

.scroll-motion.show {
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
}

.parallax-card {
  will-change: transform;
  transition: transform .12s linear;
}

.cinematic-section {
  position: relative;
  overflow: hidden;
}

.cinematic-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(199,151,89,.13), transparent 55%);
  opacity: 0;
  transition: opacity 1s ease;
  pointer-events: none;
}

.cinematic-section.show::before {
  opacity: 1;
}

.smooth-image {
  transform: scale(1.12);
  transition: transform 1.4s cubic-bezier(.16, 1, .3, 1);
  will-change: transform;
}

.scroll-motion.show .smooth-image {
  transform: scale(1);
}

.heading-slide {
  transform: translateX(-100px);
  opacity: 0;
  transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.heading-slide.show {
  transform: translateX(0);
  opacity: 1;
}

/* Custom Card Effect */
.card {
  position: relative;
  overflow: hidden;
  perspective: 1000px;
}

.card__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: rgba(26, 14, 8, 0.9);
  border: 1px solid rgba(166, 124, 82, 0.3);
  transform: rotateX(-90deg);
  transform-origin: bottom;
  transition: all 0.8s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card:hover .card__content {
  transform: rotateX(0deg);
}

.card__title {
  margin: 0;
  font-size: 28px;
  color: #fff;
  font-weight: 700;
  margin-bottom: 12px;
}

.card__description {
  margin: 0;
  font-size: 16px;
  color: #dcd0c5;
  line-height: 1.6;
}

/* Text Spinner Effect */
.text-spinner-card {
  --bg-color: rgba(26, 14, 8, 0.4);
  background-color: var(--bg-color);
  padding: 0.5rem 1rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(166, 124, 82, 0.2);
}

.loader {
  color: #f5efe7;
  font-weight: 600;
  font-size: 28px;
  box-sizing: content-box;
  height: 40px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  border-radius: 8px;
}

.words {
  overflow: hidden;
  position: relative;
  height: 40px;
}

.words::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    var(--bg-color) 0%,
    transparent 20%,
    transparent 80%,
    var(--bg-color) 100%
  );
  z-index: 20;
}

.word {
  display: block;
  height: 100%;
  line-height: 40px;
  padding-left: 8px;
  color: #a67c52;
  animation: spin_4991 6s infinite ease-in-out;
}

@keyframes spin_4991 {
  10% { transform: translateY(-100%); }
  25% { transform: translateY(-100%); }
  35% { transform: translateY(-200%); }
  50% { transform: translateY(-200%); }
  60% { transform: translateY(-300%); }
  75% { transform: translateY(-300%); }
  85% { transform: translateY(-400%); }
  100% { transform: translateY(-400%); }
}
