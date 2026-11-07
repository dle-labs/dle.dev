import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Attachment } from 'svelte/attachments';

import { getGsap } from '$lib/animation/gsap';

/** Viewport line (from the top) the progress tip tracks while scrolling. */
const TRACKING_LINE = 'top 62%';
const REACHED_CLASS = 'is-reached';
const REFRESH_DEBOUNCE_MS = 160;

/**
 * Fills the timeline spine as the reader scrolls and lights up each entry
 * marker once the fill reaches it. Expects a `.resume-timeline-progress`
 * element (with `__bar` and `__tip` children) inside the attached node.
 */
export const scrollTimeline: Attachment<HTMLElement> = (node) => {
  const progress = node.querySelector<HTMLElement>('.resume-timeline-progress');
  const bar = progress?.querySelector<HTMLElement>('.resume-timeline-progress__bar');
  const tip = progress?.querySelector<HTMLElement>('.resume-timeline-progress__tip');
  const items = Array.from(node.querySelectorAll<HTMLElement>('.resume-timeline-item'));

  if (!progress || !bar || !tip) {
    return;
  }

  const { gsap } = getGsap();
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(bar, { scaleY: 1 });
    gsap.set(tip, { autoAlpha: 0 });
    items.forEach((item) => item.classList.add(REACHED_CLASS));
    return;
  }

  const context = gsap.context(() => {
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: node,
          start: TRACKING_LINE,
          end: `bottom ${TRACKING_LINE.split(' ')[1]}`,
          scrub: 0.5,
          onToggle: ({ isActive }) => gsap.to(tip, { autoAlpha: isActive ? 1 : 0, duration: 0.3 })
        }
      })
      .fromTo(bar, { scaleY: 0 }, { scaleY: 1 }, 0)
      .fromTo(tip, { top: '0%' }, { top: '100%' }, 0);

    for (const item of items) {
      const marker = item.querySelector<HTMLElement>('.resume-timeline-marker') ?? item;

      ScrollTrigger.create({
        trigger: marker,
        start: TRACKING_LINE,
        onEnter: () => item.classList.add(REACHED_CLASS),
        onLeaveBack: () => item.classList.remove(REACHED_CLASS)
      });
    }
  }, node);

  // Expanding or collapsing entries changes the timeline height, so trigger
  // positions need recalculating once the layout settles.
  let refreshTimer: ReturnType<typeof setTimeout> | undefined;
  const resizeObserver = new ResizeObserver(() => {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), REFRESH_DEBOUNCE_MS);
  });
  resizeObserver.observe(node);

  return () => {
    clearTimeout(refreshTimer);
    resizeObserver.disconnect();
    context.revert();
    items.forEach((item) => item.classList.remove(REACHED_CLASS));
  };
};
