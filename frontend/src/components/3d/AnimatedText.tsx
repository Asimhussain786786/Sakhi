import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface LineMaskRevealProps {
  lines: { text: string; highlightWord?: string }[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  reducedMotion?: boolean;
  inView?: boolean;
}

function renderLineWithGradientHighlight(text: string, highlightWord?: string) {
  if (!highlightWord || !text.includes(highlightWord)) {
    return text;
  }
  const idx = text.indexOf(highlightWord);
  const before = text.slice(0, idx);
  const after = text.slice(idx + highlightWord.length);
  return (
    <>
      {before}
      <span className="sakhi-gradient-text">{highlightWord}</span>
      {after}
    </>
  );
}

export function LineMaskReveal({
  lines,
  className = '',
  lineClassName = '',
  delay = 0.08,
  stagger = 0.14,
  reducedMotion = false,
  inView = false,
}: LineMaskRevealProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const shouldAnimate = !inView || isInView;

  if (reducedMotion) {
    return (
      <span className={`block ${className}`}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${lineClassName}`}>
            {renderLineWithGradientHighlight(line.text, line.highlightWord)}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span ref={containerRef} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-1 -mb-1">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: '105%', opacity: 0, filter: 'blur(8px)' }}
            animate={
              shouldAnimate
                ? { y: '0%', opacity: 1, filter: 'blur(0px)' }
                : { y: '105%', opacity: 0, filter: 'blur(8px)' }
            }
            transition={{
              duration: 0.72,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {renderLineWithGradientHighlight(line.text, line.highlightWord)}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface WordRevealTextProps {
  text: string;
  highlightWords?: string[];
  className?: string;
  delay?: number;
  stagger?: number;
  reducedMotion?: boolean;
  inView?: boolean;
}

export function WordRevealText({
  text,
  highlightWords = [],
  className = '',
  delay = 0.05,
  stagger = 0.045,
  reducedMotion = false,
  inView = false,
}: WordRevealTextProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const shouldAnimate = !inView || isInView;
  const words = text.split(' ');

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {words.map((word, idx) => {
        const clean = word.replace(/[.,!?'"]/g, '');
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === clean.toLowerCase(),
        );
        return (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden align-bottom mr-[0.26em] pb-0.5 -mb-0.5"
          >
            <motion.span
              aria-hidden="true"
              className={`inline-block ${isHighlight ? 'sakhi-gradient-text' : ''}`}
              initial={{ y: '95%', opacity: 0, filter: 'blur(6px)' }}
              animate={
                shouldAnimate
                  ? { y: '0%', opacity: 1, filter: 'blur(0px)' }
                  : { y: '95%', opacity: 0, filter: 'blur(6px)' }
              }
              transition={{
                duration: 0.62,
                delay: delay + idx * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

interface CharStaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  reducedMotion?: boolean;
  inView?: boolean;
}

export function CharStaggerText({
  text,
  className = '',
  delay = 0.05,
  stagger = 0.032,
  reducedMotion = false,
  inView = false,
}: CharStaggerTextProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const shouldAnimate = !inView || isInView;

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {Array.from(text).map((ch, idx) => (
        <motion.span
          key={`${ch}-${idx}`}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: 8, filter: 'blur(5px)' }}
          animate={
            shouldAnimate
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 8, filter: 'blur(5px)' }
          }
          transition={{
            duration: 0.48,
            delay: delay + idx * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}
