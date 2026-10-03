function alreadyOnScreen(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

/** Fade and rise an element the first time it enters the viewport. */
export function reveal(node: HTMLElement, delay = 0) {
  if (delay > 0) node.style.setProperty('--reveal-delay', `${delay}ms`);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || node.classList.contains('is-immediate') || alreadyOnScreen(node)) {
    node.classList.add('is-visible', 'is-immediate');
    return {};
  }

  let observer: IntersectionObserver | undefined;
  const frame = requestAnimationFrame(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer?.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px 8% 0px' }
    );
    observer.observe(node);
  });

  return {
    destroy() {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    }
  };
}
