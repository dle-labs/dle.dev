<script lang="ts" module>
  import type { Component, Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  export interface ResumeTimelineEntryProps {
    reversed?: boolean;
    icon: Component<{ class?: string }>;
    class?: ClassValue;
    /** Collapses the desktop media column (animated) when `false`. */
    mediaVisible?: boolean;
    media?: Snippet;
    children?: Snippet;
  }
</script>

<script lang="ts">
  import { untrack } from 'svelte';

  import { getGsap } from '$lib/animation/gsap';
  import { cn } from '$lib/utils.js';

  let {
    reversed = false,
    icon: Icon,
    class: className,
    mediaVisible = true,
    media,
    children
  }: ResumeTimelineEntryProps = $props();

  let mediaEl: HTMLDivElement | undefined = $state();

  // Server-rendered starting state so collapsed entries don't flash their media before hydration.
  const initialMediaStyle = untrack(() =>
    mediaVisible ? undefined : 'height: 0; opacity: 0; visibility: hidden; overflow: hidden;'
  );

  let hasAnimated = false;

  $effect(() => {
    const visible = mediaVisible;

    if (!mediaEl) {
      return;
    }

    if (!hasAnimated) {
      hasAnimated = true;
      return;
    }

    const { gsap } = getGsap();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.to(mediaEl, {
      height: visible ? 'auto' : 0,
      autoAlpha: visible ? 1 : 0,
      scale: visible ? 1 : 0.94,
      filter: visible ? 'blur(0px)' : 'blur(6px)',
      duration: reduceMotion ? 0 : visible ? 0.55 : 0.4,
      ease: visible ? 'power3.out' : 'power2.inOut',
      overwrite: true,
      onStart: () => {
        mediaEl?.style.setProperty('overflow', 'hidden');
      },
      onComplete: () => {
        if (visible) {
          mediaEl?.style.removeProperty('overflow');
        }
      }
    });
  });
</script>

<article
  class={cn(
    'resume-timeline-item',
    reversed ? 'resume-timeline-item--right' : 'resume-timeline-item--left',
    className
  )}
>
  <div aria-hidden="true" class="resume-timeline-marker text-primary">
    <Icon class="size-4" />
  </div>

  {#if media}
    <div
      bind:this={mediaEl}
      style={initialMediaStyle}
      class={cn(
        'hidden lg:row-start-1 lg:flex lg:items-center',
        reversed ? 'lg:col-start-1 lg:justify-end' : 'lg:col-start-2 lg:justify-start'
      )}
    >
      {@render media()}
    </div>
  {/if}

  <div class="resume-timeline-card lg:row-start-1">
    <div class="p-6 sm:p-7">
      {@render children?.()}
    </div>
  </div>
</article>
