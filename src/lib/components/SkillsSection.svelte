<script lang="ts">
  import openai from '$lib/assets/icons/openai.svg';
  import playwrightIcon from '$lib/assets/icons/playwright.svg';
  import SectionIntro from '$lib/components/SectionIntro.svelte';
  import Typography from '$lib/components/Typography.svelte';
  import IconCloud from '$lib/components/magic/icon-cloud/icon-cloud.svelte';
  import { getHomeIntro } from '$lib/state/home-intro.svelte';
  import resume from '../assets/resume/resume.json';
  type SkillGroup = {
    name: string;
    keywords: string[];
  };

  function getSkillGroupId(name: string) {
    return `skills-${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}`;
  }

  const skillGroups: SkillGroup[] = resume.skills.map((entry) => ({
    name: entry.name,
    keywords: entry.keywords
  }));

  const cloudImages = [
    'https://cdn.simpleicons.org/react/61DAFB',
    'https://cdn.simpleicons.org/svelte/FF3E00',
    'https://cdn.simpleicons.org/prisma/2D3748',
    'https://cdn.simpleicons.org/typescript/3178C6',
    'https://cdn.simpleicons.org/javascript/F7DF1E',
    'https://cdn.simpleicons.org/vitest/6E9F18',
    playwrightIcon,
    'https://cdn.simpleicons.org/cypress',
    'https://cdn.simpleicons.org/storybook/FF4785',
    'https://cdn.simpleicons.org/vite/646CFF',
    'https://cdn.simpleicons.org/webpack/8DD6F9',
    'https://cdn.simpleicons.org/nodedotjs/5FA04E',
    'https://cdn.simpleicons.org/quarkus/4695EB',
    'https://cdn.simpleicons.org/camunda/FC5D0D',
    'https://cdn.simpleicons.org/docker/2496ED',
    'https://cdn.simpleicons.org/podman/892CA0',
    'https://cdn.simpleicons.org/kubernetes/326CE5',
    'https://cdn.simpleicons.org/githubactions/2088FF',
    'https://cdn.simpleicons.org/gitlab/FC6D26',
    'https://cdn.simpleicons.org/cloudflare/F38020',
    'https://cdn.simpleicons.org/eslint/4B32C3',
    'https://cdn.simpleicons.org/prettier/F7B93E',
    openai,
    'https://cdn.simpleicons.org/anthropic/191919'
  ];

  const intro = getHomeIntro();

  let modeClass = $derived(
    intro.prefersReducedMotion
      ? 'mode-reduced'
      : intro.hasRevealed
        ? 'mode-sequenced'
        : 'mode-staged'
  );
</script>

<section
  aria-labelledby="skills"
  class={`${modeClass} skills-intro mx-auto mt-24 max-w-6xl px-4 sm:mt-28 sm:px-6 lg:px-8`}
>
  <div class="relative">
    <div
      class="pointer-events-none absolute top-8 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
    ></div>

    <div data-skills-copy>
      <SectionIntro
        id="skills"
        eyebrow="Capability map"
        title="Skills"
        description="A working stack shaped by frontend systems, platform delivery, architecture discipline, and the tools that keep execution sharp."
      />
    </div>

    <div
      class="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start lg:gap-20"
    >
      <div class="relative" data-skills-cloud>
        <div
          class="relative mx-auto aspect-square w-full max-w-[26rem] overflow-hidden rounded-[2rem] border border-black/8 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.42)_42%,transparent_72%)] shadow-[0_30px_90px_-48px_rgba(15,23,42,0.42)] dark:border-white/10 dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_42%,transparent_72%)]"
        >
          <div
            class="pointer-events-none absolute inset-[14%] rounded-full border border-black/6 dark:border-white/10"
          ></div>
          <div
            class="pointer-events-none absolute inset-[28%] rounded-full border border-black/5 dark:border-white/8"
          ></div>
          <div
            class="pointer-events-none absolute inset-[42%] rounded-full border border-black/4 dark:border-white/7"
          ></div>

          <div
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.7),transparent_30%),radial-gradient(circle_at_70%_72%,rgba(99,102,241,0.12),transparent_26%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_70%_72%,rgba(99,102,241,0.18),transparent_26%)]"
          ></div>

          <div class="absolute inset-0 flex items-center justify-center">
            <IconCloud images={cloudImages} class="size-full" />
          </div>
        </div>
      </div>

      <div>
        <div class="space-y-8">
          {#each skillGroups as group (group.name)}
            <section
              class="border-t border-black/10 pt-5 sm:pt-6 dark:border-white/12"
              data-skills-group
              style:--skills-group-order={skillGroups.indexOf(group)}
            >
              <Typography
                as="h3"
                variant="card-title-sm"
                id={getSkillGroupId(group.name)}
                class="text-[1.08rem] tracking-[-0.02em] sm:text-[1.2rem]"
              >
                <a
                  href={`#${getSkillGroupId(group.name)}`}
                  class="underline-offset-4 hover:underline focus-visible:underline"
                >
                  {group.name}
                </a>
              </Typography>

              <div class="mt-4 flex flex-wrap gap-2.5">
                {#each group.keywords as keyword (keyword)}
                  <Typography
                    as="span"
                    variant="chip"
                    class="inline-flex items-center rounded-full border border-black/8 bg-black/[0.025] px-3 py-1.5 text-sm leading-5 text-foreground/84 transition-colors duration-200 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/86"
                  >
                    {keyword}
                  </Typography>
                {/each}
              </div>
            </section>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .skills-intro {
    --skills-copy-delay: 140ms;
    --skills-cloud-delay: 260ms;
    --skills-group-delay: 360ms;
  }

  .mode-staged [data-skills-copy],
  .mode-staged [data-skills-cloud],
  .mode-staged [data-skills-group] {
    opacity: 0;
    pointer-events: none;
  }

  .mode-staged [data-skills-copy] {
    transform: translate3d(0, 28px, 0);
    filter: blur(18px);
  }

  .mode-staged [data-skills-cloud] {
    transform: translate3d(0, 28px, 0) scale(0.96);
    filter: blur(18px);
  }

  .mode-staged [data-skills-group] {
    transform: translate3d(0, 24px, 0);
    filter: blur(16px);
  }

  @media (prefers-reduced-motion: no-preference) {
    .mode-sequenced [data-skills-copy] {
      animation: skills-section-rise 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
      animation-delay: var(--skills-copy-delay);
    }

    .mode-sequenced [data-skills-cloud] {
      animation: skills-section-rise 820ms cubic-bezier(0.22, 1, 0.36, 1) both;
      animation-delay: var(--skills-cloud-delay);
    }

    .mode-sequenced [data-skills-group] {
      animation: skills-section-rise 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
      animation-delay: calc(var(--skills-group-delay) + (var(--skills-group-order, 0) * 90ms));
    }
  }

  @keyframes skills-section-rise {
    0% {
      opacity: 0;
      transform: translate3d(0, 28px, 0) scale(0.98);
      filter: blur(18px);
    }

    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
      filter: blur(0);
      pointer-events: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .skills-intro [data-skills-copy],
    .skills-intro [data-skills-cloud],
    .skills-intro [data-skills-group] {
      opacity: 1;
      transform: none;
      filter: none;
      pointer-events: auto;
    }
  }
</style>
