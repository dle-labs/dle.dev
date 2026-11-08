<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  export interface ResumeTimelineProps {
    class?: ClassValue;
    children?: Snippet;
  }
</script>

<script lang="ts">
  import { scrollTimeline } from '$lib/animation/scroll-timeline';
  import { cn } from '$lib/utils.js';

  let { class: className, children }: ResumeTimelineProps = $props();
</script>

<div class={cn('resume-timeline', className)} {@attach scrollTimeline}>
  <div aria-hidden="true" class="resume-timeline-progress">
    <div class="resume-timeline-progress__bar"></div>
    <div class="resume-timeline-progress__tip"></div>
  </div>

  {@render children?.()}
</div>
