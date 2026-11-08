<script lang="ts">
  import { onMount } from 'svelte';
  import type { LayoutProps } from './$types';

  import {
    applyHomeIntroInitialState,
    applyHomeIntroReducedMotionState,
    cleanupHomeIntro,
    createHomeIntroTimeline,
    resolveHomeIntroScene,
    stopHomeIntro,
    type HomeIntroRuntime
  } from '$lib/animation/home-intro';
  import AmbientBackground from '$lib/components/AmbientBackground.svelte';
  import HaloNavbar from '$lib/components/HaloNavbar.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import { HomeIntroController, setHomeIntro } from '$lib/state/home-intro.svelte';
  import {
    type UiSettingsSnapshot,
    UiSettings,
    setUiSettings
  } from '$lib/state/ui-settings.svelte';
  import Typography from '$lib/components/Typography.svelte';
  import './layout.css';

  let { data, children }: LayoutProps = $props();

  let introLayer: HTMLDivElement | undefined;
  let introCover: HTMLDivElement | undefined;
  let seal: HTMLDivElement | undefined;
  let axis: HTMLDivElement | undefined;
  let markD = $state<HTMLSpanElement | undefined>(undefined);
  let markL = $state<HTMLSpanElement | undefined>(undefined);
  let markE = $state<HTMLSpanElement | undefined>(undefined);
  let ring: SVGCircleElement | undefined;
  let pulse: HTMLDivElement | undefined;
  let appShell: HTMLDivElement | undefined;

  let mediaQuery: MediaQueryList | null = null;

  const runtime: HomeIntroRuntime = {
    timeline: null
  };

  function createUiSettings() {
    return new UiSettings(data.uiSettings as UiSettingsSnapshot);
  }

  const ui = setUiSettings(createUiSettings());
  const intro = setHomeIntro(new HomeIntroController());

  function getIntroScene() {
    return resolveHomeIntroScene({
      appShell,
      introLayer,
      introCover,
      seal,
      axis,
      markD,
      markL,
      markE,
      ring,
      pulse
    });
  }

  function applyReducedMotion() {
    const scene = getIntroScene();
    if (!scene) return;

    applyHomeIntroReducedMotionState(runtime, scene);
    intro.hasRevealed = true;
    intro.hasPlayed = true;
  }

  function playIntro() {
    const scene = getIntroScene();
    if (!scene) return;

    if (intro.prefersReducedMotion) {
      applyReducedMotion();
      return;
    }

    stopHomeIntro(runtime);
    applyHomeIntroInitialState(scene);
    intro.hasRevealed = false;
    intro.hasPlayed = false;
    runtime.timeline = createHomeIntroTimeline(scene, {
      onRevealStart: () => {
        intro.hasRevealed = true;
      },
      onComplete: () => {
        intro.hasPlayed = true;
        runtime.timeline = null;
      }
    });
  }

  intro.setReplay(playIntro);

  $effect(() => {
    ui.applyThemeToDocument();
  });

  onMount(() => {
    const stopObservingSystemTheme = ui.observeSystemTheme();

    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncMotionPreference = () => {
      intro.prefersReducedMotion = mediaQuery?.matches ?? false;

      if (intro.prefersReducedMotion) {
        applyReducedMotion();
      } else {
        playIntro();
      }
    };

    syncMotionPreference();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncMotionPreference);
    } else {
      mediaQuery.addListener(syncMotionPreference);
    }

    return () => {
      stopObservingSystemTheme();
      cleanupHomeIntro(runtime, getIntroScene());

      if (!mediaQuery) return;

      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', syncMotionPreference);
      } else {
        mediaQuery.removeListener(syncMotionPreference);
      }
    };
  });
</script>

<svelte:head>
  <link rel="icon" href="/favicon-light.svg" media="(prefers-color-scheme: light)" />
  <link rel="icon" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)" />
  <script data-theme={(data.uiSettings as UiSettingsSnapshot).theme}>
    (() => {
      const theme = document.currentScript?.getAttribute('data-theme') ?? 'system';

      try {
        const resolvedTheme =
          theme === 'system'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
            : theme;

        document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
        document.documentElement.style.colorScheme = resolvedTheme;

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          document.documentElement.setAttribute('data-intro-active', 'true');
        }
      } catch {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-intro-active', 'true');
      }
    })();
  </script>
</svelte:head>

<div
  data-app-shell
  bind:this={appShell}
  class="relative min-h-svh overflow-x-hidden bg-background transition-colors duration-500"
>
  <AmbientBackground />
  <HaloNavbar />

  <div
    data-intro-layer
    bind:this={introLayer}
    aria-hidden="true"
    class="pointer-events-none fixed inset-0 z-[60]"
  >
    <div data-intro-cover bind:this={introCover} class="absolute inset-0 bg-background"></div>

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        data-seal
        bind:this={seal}
        class="relative flex size-72 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-[color-mix(in_oklab,var(--color-background)_68%,white_32%)] text-foreground shadow-[0_40px_140px_-55px_rgba(15,23,42,0.75)] backdrop-blur-2xl dark:border-white/10 dark:bg-[color-mix(in_oklab,var(--color-background)_76%,white_6%)]"
      >
        <div
          data-pulse
          bind:this={pulse}
          class="absolute inset-5 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-primary)_28%,transparent)_0%,transparent_72%)]"
        ></div>

        <svg
          class="pointer-events-none absolute top-3 left-3 block size-[calc(100%-1.5rem)] -rotate-90"
          viewBox="0 0 100 100"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            data-ring
            bind:this={ring}
            cx="50"
            r="45"
            cy="50"
            stroke="currentColor"
            stroke-width="0.9"
            stroke-linecap="round"
            class="opacity-70"
            vector-effect="non-scaling-stroke"
          ></circle>
        </svg>

        <div
          data-axis
          bind:this={axis}
          class="absolute inset-0 m-auto h-26 w-px bg-gradient-to-b from-transparent via-current to-transparent"
        ></div>

        <Typography as="div" variant="seal" class="relative z-10 flex items-end gap-1.5">
          <Typography as="span" variant="inline" data-mark="d" bind:ref={markD}>d</Typography>
          <Typography as="span" variant="inline" data-mark="l" bind:ref={markL}>l</Typography>
          <Typography as="span" variant="inline" data-mark="e" bind:ref={markE}>e</Typography>
        </Typography>

        <div
          class="absolute bottom-9 left-1/2 h-px w-14 -translate-x-1/2 bg-gradient-to-r from-transparent via-current to-transparent opacity-30"
        ></div>
      </div>
    </div>
  </div>

  {@render children()}

  <SiteFooter />
</div>
