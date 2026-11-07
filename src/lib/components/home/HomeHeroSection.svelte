<script lang="ts">
  import AvatarImg from '$lib/assets/avatar/avatar.jpg?enhanced&w=220;352;704';
  import githubIcon from '$lib/assets/icons/github.svg';
  import linkedinIcon from '$lib/assets/icons/linkedin.svg';
  import Typography from '$lib/components/Typography.svelte';
  import { Avatar } from '$lib/components/ui/avatar';
  import AuroraText from '$lib/components/AuroraText.svelte';
  import { homeOpener } from '$lib/content/home';
  import { cn } from '$lib/utils';
  import resume from '../../assets/resume/resume.json';

  const profileLinks = resume.basics.profiles
    .filter((p) => p.network === 'Github' || p.network === 'LinkedIn')
    .map((p) => ({
      ...p,
      iconUrl: p.network === 'Github' ? githubIcon : linkedinIcon
    }));

  const bodySegments = splitHighlights(homeOpener.body, homeOpener.bodyHighlights);

  function splitHighlights(text: string, highlights: string[]) {
    const escaped = highlights.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`(${escaped.join('|')})`, 'g');

    return text
      .split(pattern)
      .filter(Boolean)
      .map((part) => ({ text: part, highlighted: highlights.includes(part) }));
  }
</script>

<div
  data-hero-backdrop
  class="pointer-events-none absolute inset-x-0 top-16 -z-10 mx-auto h-[36rem] w-full max-w-6xl rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-primary)_24%,transparent)_0%,transparent_72%)] blur-3xl"
></div>

<section class="mx-auto flex max-w-6xl items-start px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
  <div data-intro-content class="relative w-full">
    <div class="relative z-10 py-6 sm:py-8 lg:py-12">
      <!-- Two rows shared by both columns: avatar beside the headline, identity beside the
           paragraph, so the second text blocks always start at the same height. -->
      <div class="hero-grid">
        <div class="hero-avatar">
          <div class="relative shrink-0">
            <div
              class="absolute inset-[-0.4rem] rounded-full border border-black/8 sm:-inset-3 lg:-inset-5 dark:border-white/10"
            ></div>
            <div
              class="absolute inset-[-2.4rem] rounded-full bg-primary/18 blur-2xl lg:inset-[-3rem]"
            ></div>

            <Avatar
              class="relative size-28 border border-white/75 bg-white shadow-[0_22px_55px_-22px_rgba(15,23,42,0.48)] sm:size-36 lg:size-44 dark:border-white/18 dark:bg-black/25"
            >
              <enhanced:img
                src={AvatarImg}
                alt="Portrait of Daniel L. Einars"
                loading="lazy"
                decoding="async"
                data-slot="avatar-image"
                class={cn('aspect-square size-full rounded-full object-cover')}
              >
              </enhanced:img>
            </Avatar>
          </div>
        </div>

        <div class="hero-identity min-w-0 text-center">
          <Typography as="p" variant="eyebrow-wide">Daniel L. Einars</Typography>
          <Typography as="p" variant="body-strong" class="mt-3 max-w-sm lg:mt-4">
            Engineering quality, design, architecture, and implementation moving in the same
            direction.
          </Typography>
          <div class="mt-5 flex items-center justify-center gap-2.5 lg:mt-7">
            {#each profileLinks as profile (profile.url)}
              <a
                href={profile.url}
                target="_blank"
                rel="external noreferrer"
                aria-label={profile.network}
                title={profile.network}
                class={cn(
                  'inline-flex size-9 items-center justify-center rounded-full',
                  'border border-black/8 bg-black/[0.03] text-foreground',
                  'transition-colors duration-200 hover:bg-black/[0.06]',
                  'dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]'
                )}
              >
                <img src={profile.iconUrl} alt="" class="size-4 object-contain dark:invert" />
              </a>
            {/each}
          </div>
        </div>

        <Typography
          as="h1"
          variant="hero-title"
          class="hero-headline max-w-4xl text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.08] tracking-[-0.04em]"
        >
          {homeOpener.headlinePrefix}<AuroraText>{homeOpener.headlineHighlight}</AuroraText
          >{homeOpener.headlineSuffix}
        </Typography>

        <Typography as="p" variant="body" class="hero-body max-w-2xl sm:leading-8">
          {#each bodySegments as segment, index (index)}
            {#if segment.highlighted}
              <strong class="font-medium text-foreground">{segment.text}</strong>
            {:else}
              {segment.text}
            {/if}
          {/each}
        </Typography>
      </div>
    </div>
  </div>
</section>

<style>
  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'avatar'
      'identity'
      'headline'
      'body';
    row-gap: 1.5rem;
  }

  .hero-avatar {
    grid-area: avatar;
    justify-self: center;
  }

  .hero-identity {
    grid-area: identity;
    justify-self: center;
  }

  .hero-grid :global(.hero-headline) {
    grid-area: headline;
    margin-top: 1rem;
  }

  .hero-grid :global(.hero-body) {
    grid-area: body;
  }

  @media (min-width: 1024px) {
    .hero-grid {
      grid-template-columns: minmax(0, 20rem) minmax(0, 1fr);
      grid-template-areas:
        'avatar headline'
        'identity body';
      column-gap: 4rem;
      row-gap: 2.25rem;
    }

    .hero-avatar {
      align-self: center;
    }

    .hero-identity {
      align-self: start;
    }

    .hero-grid :global(.hero-headline) {
      margin-top: 0;
    }

    .hero-grid :global(.hero-body) {
      align-self: start;
    }
  }
</style>
