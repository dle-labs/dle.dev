<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import {
    Award,
    BookOpen,
    BriefcaseBusiness,
    ChevronDown,
    GraduationCap,
    Home,
    List,
    Mail,
    Menu,
    Sparkles,
    UserRound,
    X
  } from '@lucide/svelte';
  import gsap from 'gsap';
  import { onMount } from 'svelte';

  import Typography from '$lib/components/Typography.svelte';
  import { Button } from '$lib/components/ui/button';
  import { contactEmail } from '$lib/content/home';
  import { cn } from '$lib/utils';
  import { AnimatedThemeToggler } from './magic/animated-theme-toggler';

  type NavItem = {
    href: string;
    label: string;
    icon: typeof Home;
  };

  type SectionItem = NavItem;

  const navItems: NavItem[] = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/blog', label: 'Blog', icon: BookOpen }
  ];

  const sectionItems: SectionItem[] = [
    { href: '/#about-me', label: 'About', icon: UserRound },
    { href: '/#skills', label: 'Skills', icon: Sparkles },
    { href: '/#work-experience', label: 'Work Experience', icon: BriefcaseBusiness },
    { href: '/#education', label: 'Education', icon: GraduationCap },
    { href: '/#certificates', label: 'Certificates', icon: Award },
    { href: '/#contact', label: 'Contact', icon: Mail }
  ];

  const pathname = $derived(page.url.pathname);
  const isHomePage = $derived(pathname === '/');

  const navShellClass = cn(
    'relative mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3',
    'rounded-[2rem] border border-black/8 bg-white/88 px-3 py-3',
    'shadow-[0_20px_70px_-35px_rgba(15,23,42,0.45)] backdrop-blur-2xl',
    'transition-[background-color,border-color,box-shadow] duration-500 min-[930px]:flex-nowrap min-[930px]:px-4',
    'dark:border-white/8 dark:bg-zinc-950/78'
  );

  const mutedPillClass = cn(
    'rounded-full border border-black/6 bg-black/[0.03]',
    'dark:border-white/8 dark:bg-white/[0.03]'
  );

  const iconButtonClass = cn(
    'inline-flex size-11 items-center justify-center rounded-full',
    'border border-black/8 bg-white/70 text-foreground',
    'transition-all duration-300 hover:bg-white',
    'dark:border-white/10 dark:bg-white/[0.05]',
    'dark:text-white dark:hover:bg-white/[0.08]'
  );

  const navbarIconClass = cn('size-5');

  const navItemBaseClass = cn(
    'h-auto rounded-full px-4 py-2 text-sm font-medium',
    'transition-colors duration-200'
  );

  const activeNavItemClass = cn(
    'bg-primary text-primary-foreground shadow-sm',
    'hover:bg-primary/95'
  );

  const inactiveNavItemClass = cn(
    'bg-nav-inactive text-nav-inactive-foreground',
    'hover:bg-nav-inactive/85 dark:hover:bg-nav-inactive/85'
  );

  const contactLinkClass = cn(
    'inline-flex items-center gap-2 rounded-full border border-black/8',
    'bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground',
    'transition-all duration-300 hover:opacity-92 dark:border-white/10'
  );

  const tocButtonClass = cn(
    'cursor-pointer inline-flex h-11 items-center gap-2 rounded-full border border-black/8 bg-white/70 px-3.5',
    'text-sm font-medium text-foreground transition-all duration-300 hover:bg-white',
    'dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.08]'
  );

  let isMenuOpen = $state(false);
  let isTocOpen = $state(false);
  let tocMenuEl = $state<HTMLDivElement | undefined>(undefined);

  function toggleMenu() {
    isTocOpen = false;
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  function toggleToc() {
    closeMenu();
    isTocOpen = !isTocOpen;
  }

  function closeToc() {
    isTocOpen = false;
  }

  function handleSectionNavigation() {
    closeToc();
    closeMenu();
  }

  function handleDocumentClick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (!tocMenuEl?.contains(target)) {
      closeToc();
    }
  }

  function handleWindowKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeToc();
      closeMenu();
    }
  }

  function isActive(href: string) {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  // Floating navbar scroll logic
  let headerEl: HTMLElement | undefined;
  let lastScrollY = 0;
  let visible = true;

  function setVisible(show: boolean) {
    if (!headerEl) return;
    if (show === visible) return;
    visible = show;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(headerEl, { y: show ? 0 : -120, opacity: show ? 1 : 0 });
      return;
    }

    if (show) {
      gsap.to(headerEl, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.out'
      });
    } else {
      gsap.to(headerEl, {
        y: -120,
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in'
      });
    }
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    if (currentScrollY < 80) {
      // Near the top — always show
      setVisible(true);
    } else if (scrollDelta < 0) {
      // Scrolling up — reveal
      setVisible(true);
    } else if (scrollDelta > 4) {
      // Scrolling down with intent — hide
      setVisible(false);
    }

    lastScrollY = currentScrollY;
  }

  onMount(() => {
    // Start fully visible
    gsap.set(headerEl!, { y: 0, opacity: 1 });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<svelte:document onclick={handleDocumentClick} />
<svelte:window onkeydown={handleWindowKeydown} />

<header bind:this={headerEl} class={cn('fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-5')}>
  <div class={cn('mx-auto max-w-6xl')}>
    <div class={cn('relative')}>
      <div
        data-navbar-glow
        class={cn(
          'absolute inset-x-10 -top-2 -z-10 h-14 rounded-full bg-foreground/8',
          'opacity-70 blur-2xl'
        )}
      ></div>

      <nav
        data-navbar-shell
        data-mobile-open={isMenuOpen ? 'true' : 'false'}
        aria-label="Primary"
        class={cn(navShellClass)}
      >
        <div
          class={cn(
            'pointer-events-none absolute inset-0 rounded-[inherit]',
            'bg-linear-to-b from-white/35 via-transparent to-transparent',
            'dark:from-white/7'
          )}
        ></div>

        <a
          href={resolve('/', {})}
          class={cn(
            'relative z-10 flex min-w-0 flex-1 items-center gap-3 rounded-full',
            'px-2 py-1.5 text-left sm:flex-none'
          )}
        >
          <span
            data-brand-icon
            class={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-full',
              'border border-black/10 bg-black/3 text-foreground shadow-sm',
              'transition-colors duration-500',
              'dark:border-white/10 dark:bg-white/6 dark:text-white'
            )}
          >
            <img src="/favicon-light.svg" alt="" class={cn('size-6 object-contain dark:hidden')} />
            <img
              src="/favicon-dark.svg"
              alt=""
              class={cn('hidden size-6 object-contain dark:block')}
            />
          </span>

          <span data-navbar-content class={cn('min-w-0')}>
            <Typography as="span" variant="brand-title" class={cn('block')} truncate>
              Daniel L. Einars
            </Typography>
            <Typography as="span" variant="brand-subtitle" class={cn('block')} truncate>
              Designer-engineer • premium frontend systems
            </Typography>
          </span>
        </a>

        <div
          data-navbar-content
          class={cn(
            'relative z-10 hidden flex-wrap items-center justify-center gap-1 p-1 min-[930px]:flex',
            mutedPillClass
          )}
        >
          {#each navItems as item (item.href)}
            {@const active = isActive(item.href)}
            <Button
              href={resolve(item.href, {})}
              aria-current={active ? 'page' : undefined}
              class={cn(
                navItemBaseClass,
                'flex items-center gap-1.5',
                active ? activeNavItemClass : inactiveNavItemClass
              )}
            >
              <item.icon class="size-4" />
              {item.label}
            </Button>
          {/each}
        </div>

        <div data-navbar-content class={cn('relative z-10 flex items-center gap-2 sm:justify-end')}>
          {#if isHomePage}
            <div bind:this={tocMenuEl} class="relative hidden min-[930px]:block">
              <button
                type="button"
                class={tocButtonClass}
                aria-expanded={isTocOpen}
                aria-controls="home-sections-panel"
                aria-haspopup="menu"
                aria-label="Toggle section table of contents"
                onclick={toggleToc}
              >
                <List class="size-4" />
                <Typography as="span" variant="inline" class="hidden sm:inline">Sections</Typography
                >
                <ChevronDown
                  class={cn(
                    'size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    isTocOpen && 'rotate-180'
                  )}
                />
              </button>

              <div
                id="home-sections-panel"
                aria-hidden={!isTocOpen}
                class={cn(
                  'absolute top-[calc(100%+0.75rem)] right-0 z-20 w-72  overflow-hidden rounded-[1.5rem] border border-black/8 bg-white/96 p-2 shadow-[0_28px_90px_-42px_rgba(15,23,42,0.52)] backdrop-blur-2xl transition-all duration-200 dark:border-white/10 dark:bg-zinc-950/92',
                  isTocOpen
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none -translate-y-2 opacity-0'
                )}
              >
                <div class="space-y-1">
                  {#each sectionItems as item (item.href)}
                    <Button
                      href={resolve(item.href, {})}
                      class={cn(
                        'h-auto w-full justify-start gap-3 rounded-[1rem] px-3 py-2.5 text-sm font-medium',
                        'bg-transparent text-foreground hover:bg-black/[0.04] dark:bg-transparent dark:text-white dark:hover:bg-white/[0.06]'
                      )}
                      onclick={handleSectionNavigation}
                    >
                      <span
                        class="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/16 bg-primary/7 text-primary dark:border-primary/30 dark:bg-primary/16"
                      >
                        <item.icon class="size-4" />
                      </span>
                      <Typography as="span" variant="inline">{item.label}</Typography>
                    </Button>
                  {/each}
                </div>
              </div>
            </div>
          {/if}

          <AnimatedThemeToggler class={iconButtonClass} />

          <button
            type="button"
            class={cn(iconButtonClass, 'min-[930px]:hidden')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onclick={toggleMenu}
          >
            {#if isMenuOpen}
              <X class={navbarIconClass} />
            {:else}
              <Menu class={navbarIconClass} />
            {/if}
          </button>

          <a
            href={`mailto:${contactEmail}`}
            class={cn(contactLinkClass, 'hidden min-[930px]:inline-flex')}
          >
            <Mail class={navbarIconClass} />
            <Typography as="span" variant="inline">Contact</Typography>
          </a>
        </div>

        <div
          id="mobile-nav-panel"
          aria-hidden={!isMenuOpen}
          class={cn(
            'relative z-10 grid w-full min-[930px]:hidden',
            'transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            isMenuOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'pointer-events-none grid-rows-[0fr] opacity-0'
          )}
        >
          <div class={cn('overflow-hidden')}>
            <div class={cn('flex flex-col gap-2 px-2 pt-1 pb-2')}>
              {#each navItems as item, index (item.href)}
                {@const active = isActive(item.href)}
                <div
                  style={`--mobile-nav-delay:${isMenuOpen ? index * 40 : 0}ms`}
                  class={cn('mobile-nav-item', isMenuOpen && 'mobile-nav-item-open')}
                >
                  <Button
                    href={resolve(item.href, {})}
                    aria-current={active ? 'page' : undefined}
                    class={cn(
                      navItemBaseClass,
                      'flex w-full items-center justify-center gap-1.5 py-2.5',
                      active ? activeNavItemClass : inactiveNavItemClass
                    )}
                    onclick={closeMenu}
                  >
                    <item.icon class="size-4" />
                    {item.label}
                  </Button>
                </div>
              {/each}

              {#if isHomePage}
                <div
                  style={`--mobile-nav-delay:${isMenuOpen ? navItems.length * 40 : 0}ms`}
                  class={cn('mobile-nav-item', isMenuOpen && 'mobile-nav-item-open')}
                >
                  <div
                    class={cn(
                      'rounded-[1.4rem] border border-black/6 bg-black/[0.025] p-2 dark:border-white/8 dark:bg-white/[0.03]'
                    )}
                  >
                    <Typography as="p" variant="eyebrow-compact" class="px-2 pb-2">
                      Sections
                    </Typography>

                    <div class="flex flex-col gap-1">
                      {#each sectionItems as item (item.href)}
                        <Button
                          href={resolve(item.href, {})}
                          class={cn(
                            'h-auto w-full justify-start gap-3 rounded-[1rem] px-3 py-2.5 text-sm font-medium',
                            'bg-transparent text-foreground hover:bg-black/[0.04] dark:bg-transparent dark:text-white dark:hover:bg-white/[0.06]'
                          )}
                          onclick={handleSectionNavigation}
                        >
                          <span
                            class="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/16 bg-primary/7 text-primary dark:border-primary/30 dark:bg-primary/16"
                          >
                            <item.icon class="size-4" />
                          </span>
                          <Typography as="span" variant="inline">{item.label}</Typography>
                        </Button>
                      {/each}
                    </div>
                  </div>
                </div>
              {/if}

              <div
                style={`--mobile-nav-delay:${isMenuOpen ? (navItems.length + (isHomePage ? 1 : 0)) * 40 : 0}ms`}
                class={cn('mobile-nav-item', isMenuOpen && 'mobile-nav-item-open')}
              >
                <a
                  href={`mailto:${contactEmail}`}
                  class={cn(contactLinkClass, 'w-full justify-center')}
                  onclick={closeMenu}
                >
                  <Mail class={navbarIconClass} />
                  <Typography as="span" variant="inline">Contact</Typography>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</header>

<style>
  :global(nav[data-navbar-shell]) {
    transform-origin: top center;
  }

  .mobile-nav-item {
    opacity: 0;
    transform: translateY(-0.5rem);
    transition:
      transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 180ms ease;
    transition-delay: 0ms;
  }

  .mobile-nav-item-open {
    opacity: 1;
    transform: translateY(0);
    transition-delay: var(--mobile-nav-delay, 0ms);
  }

  @media (max-width: 929px) {
    :global(nav[data-navbar-shell]) {
      transition:
        transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 320ms cubic-bezier(0.22, 1, 0.36, 1),
        background-color 320ms cubic-bezier(0.22, 1, 0.36, 1),
        border-color 320ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    :global(nav[data-navbar-shell] > div:first-child) {
      transition:
        opacity 320ms cubic-bezier(0.22, 1, 0.36, 1),
        background 320ms cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 320ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    :global(div[data-navbar-glow]) {
      transition:
        opacity 320ms cubic-bezier(0.22, 1, 0.36, 1),
        transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
        filter 320ms cubic-bezier(0.22, 1, 0.36, 1);
      transform-origin: top center;
    }

    :global(nav[data-navbar-shell][data-mobile-open='true']) {
      transform: scale(1.015);
      box-shadow: 0 28px 90px -38px rgba(15, 23, 42, 0.58);
    }

    :global(nav[data-navbar-shell][data-mobile-open='true'] > div:first-child) {
      opacity: 1;
      background: linear-gradient(to bottom, rgb(255 255 255 / 0.5), transparent 58%);
      box-shadow:
        inset 0 1px 0 rgb(255 255 255 / 0.22),
        inset 0 18px 40px rgb(255 255 255 / 0.08);
    }

    :global(.dark nav[data-navbar-shell][data-mobile-open='true'] > div:first-child) {
      background: linear-gradient(to bottom, rgb(255 255 255 / 0.1), transparent 58%);
      box-shadow:
        inset 0 1px 0 rgb(255 255 255 / 0.12),
        inset 0 18px 44px rgb(255 255 255 / 0.05);
    }

    :global(div[data-navbar-glow]:has(+ nav[data-navbar-shell][data-mobile-open='true'])) {
      opacity: 0.95;
      transform: scale(1.08);
      filter: blur(42px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(nav[data-navbar-shell]),
    :global(nav[data-navbar-shell] > div:first-child),
    :global(div[data-navbar-glow]),
    .mobile-nav-item {
      transition: opacity 120ms ease;
      transform: none;
    }

    :global(nav[data-navbar-shell][data-mobile-open='true']) {
      transform: none;
    }
  }
</style>
