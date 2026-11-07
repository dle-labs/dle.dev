<script lang="ts">
  import { BriefcaseBusiness, ChevronDown, MapPin } from '@lucide/svelte';
  import { onMount } from 'svelte';

  import mechnic from '$lib/assets/work/mechnic.jpg?enhanced&w=256;416;832';
  import design from '$lib/assets/work/design.jpg?enhanced&w=256;416;832';
  import lead from '$lib/assets/work/lead.jpg?enhanced&w=256;416;832';
  import library from '$lib/assets/work/library.jpg?enhanced&w=256;416;832';
  import marketing from '$lib/assets/work/marketing.jpg?enhanced&w=256;416;832';
  import migration from '$lib/assets/work/migration.jpg?enhanced&w=256;416;832';
  import seo from '$lib/assets/work/seo.jpg?enhanced&w=256;416;832';
  import time from '$lib/assets/work/time.jpg?enhanced&w=256;416;832';
  import resume from '$lib/assets/resume/resume.json';
  import SectionIntro from '$lib/components/SectionIntro.svelte';
  import Typography from '$lib/components/Typography.svelte';
  import ResumeTimeline from '$lib/components/resume/ResumeTimeline.svelte';
  import ResumeTimelineBulletList from '$lib/components/resume/ResumeTimelineBulletList.svelte';
  import ResumeTimelineEntry from '$lib/components/resume/ResumeTimelineEntry.svelte';
  import ResumeTimelineMedia from '$lib/components/resume/ResumeTimelineMedia.svelte';
  import * as Collapsible from '$lib/components/ui/collapsible/index.js';
  import { cn } from '$lib/utils.js';

  type ResumeWorkEntry = (typeof resume.work)[number];

  type WorkDisplayEntry = {
    id: string;
    position: string;
    company: string;
    location: string;
    dateRange: string;
    summary: string;
    highlights: string[];
    isReversed: boolean;
    imageSrc: string;
    placeholderClass: string;
  };

  type EditorialWorkEntry = {
    summary: string;
    highlights: string[];
    imageSrc: string;
  };

  const editorialCopy: Record<string, EditorialWorkEntry> = {
    'Lead Software Engineer|2025-10-01': {
      summary:
        'Leading the frontend recovery of a digital onboarding platform, bringing dormant flows back to production readiness under current compliance and security expectations.',
      imageSrc: mechnic,
      highlights: [
        'Revived a legacy React onboarding stack to support identity verification, liveness checks, and KYC-critical user journeys.',
        'Connected a productized onboarding layer to inconsistent in-house APIs and undocumented third-party dependencies without losing delivery momentum.',
        'Created realistic delivery paths when customer requests conflicted with platform limits, compliance rules, or near-term stability needs.'
      ]
    },
    'Lead Software Engineer|2024-04-01': {
      imageSrc: lead,
      summary:
        'Drove frontend direction for a large B2B e-banking platform, balancing hands-on delivery with architecture, standards, and team-wide execution in a regulated domain.',
      highlights: [
        'Set frontend direction around maintainability, delivery speed, and platform constraints for a business-critical banking product.',
        'Introduced contract-driven type generation and dependency automation to reduce integration friction and lower upgrade risk.',
        'Helped the team operationalize AI coding tools through shared guardrails, tooling, and practical usage patterns.'
      ]
    },
    'Senior Software Engineer|2022-06-01': {
      imageSrc: migration,
      summary:
        'Owned the B2C frontend experience for a major credit institution, combining modernization work with feature delivery and day-to-day engineering leadership.',
      highlights: [
        'Led the migration from create-react-app to Next.js, using incremental static regeneration to improve load performance and release efficiency.',
        'Delivered high-visibility frontend initiatives across teams of varying size while providing technical direction and implementation support.',
        'Raised team capability through accessibility-focused linting and structured pairing that helped junior engineers take on larger ownership.'
      ]
    },
    'Professional Software Engineer|2019-09-01': {
      imageSrc: design,
      summary:
        'Built and maintained customer-facing React applications while improving tooling, consistency, and design-system execution across multiple frontend surfaces.',
      highlights: [
        'Standardized frontend quality with ESLint, lint-staged, and Prettier across repositories to reduce manual review overhead.',
        'Modernized local tooling and dependency baselines to make day-to-day development more reliable and onboarding less fragile.',
        'Translated site-wide design changes into production frontend updates across React applications and Magnolia CMS.'
      ]
    },
    'Software Engineer|2018-08-15': {
      imageSrc: time,
      summary:
        'Delivered client software projects spanning Android and build engineering, with a focus on performance, maintainability, and practical modernization.',
      highlights: [
        'Built an Android remote-support application with WebRTC and Dagger 2, balancing real-time communication demands with device constraints.',
        'Led the migration of 148 Ant projects to Gradle, cutting compile time from roughly ten minutes to under two.'
      ]
    },
    'Werkstudent|2016-02-01': {
      imageSrc: library,
      summary:
        'Supported consulting work through automation tooling that reduced manual effort in data preparation and testing workflows.',
      highlights: [
        'Built web scrapers, transformation utilities, and automated test-case generation tools for the EasyTax product.'
      ]
    },
    'Marketing Manager Germany and Head of Marketing|2013-04-01': {
      imageSrc: marketing,
      summary:
        'Led performance marketing across EU markets, combining channel strategy, team leadership, and commercial optimization.',
      highlights: [
        'Owned multi-market digital marketing initiatives with a strong focus on efficiency, scale, and return on ad spend.'
      ]
    },
    'Online Marketing Manager|2012-08-01': {
      imageSrc: seo,
      summary:
        'Managed channel relationships, acquisition activity, and commercial negotiations for online marketing programs.',
      highlights: [
        'Oversaw partner channels, publisher relationships, and new-client acquisition while handling the commercial side of delivery.'
      ]
    }
  };

  const placeholderClasses = [
    'from-primary/10 via-primary/4 to-transparent',
    'from-sky-500/10 via-violet-500/4 to-transparent',
    'from-amber-500/10 via-orange-500/4 to-transparent',
    'from-emerald-500/10 via-cyan-500/4 to-transparent'
  ] as const;

  const sortedWork = [...resume.work].sort(
    (left, right) => Date.parse(right.startDate) - Date.parse(left.startDate)
  );

  const workEntries: WorkDisplayEntry[] = sortedWork.map((entry, index) => {
    const copyKey = `${entry.position}|${entry.startDate}`;
    const copy = editorialCopy[copyKey];
    const { company, location } = splitCompanyAndLocation(entry.name);

    return {
      id: getWorkId(entry),
      position: entry.position,
      company,
      location,
      dateRange: formatDateRange(entry),
      summary: copy?.summary ?? entry.summary ?? '',
      highlights: copy?.highlights ?? entry.highlights.slice(0, 3),
      isReversed: index % 2 === 1,
      imageSrc: copy?.imageSrc,
      placeholderClass: placeholderClasses[index % placeholderClasses.length]
    };
  });

  const INITIALLY_OPEN_COUNT = 3;

  let openStates = $state(workEntries.map((_, index) => index < INITIALLY_OPEN_COUNT));

  onMount(() => {
    // Deep links to a collapsed role should land on it expanded.
    const openFromHash = () => {
      const index = workEntries.findIndex((entry) => `#${entry.id}` === window.location.hash);

      if (index !== -1) {
        openStates[index] = true;
      }
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);

    return () => window.removeEventListener('hashchange', openFromHash);
  });

  /** Resume entries store "Company, City, Country" in a single field. */
  function splitCompanyAndLocation(name: string) {
    const separatorIndex = name.indexOf(',');

    if (separatorIndex === -1) {
      return { company: name.trim(), location: '' };
    }

    return {
      company: name.slice(0, separatorIndex).trim(),
      location: name
        .slice(separatorIndex + 1)
        .trim()
        .replace(/\s*\/\s*/g, ' / ')
    };
  }

  function getWorkId(entry: ResumeWorkEntry) {
    return `${entry.position}-${entry.name}-${entry.startDate}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function formatMonthYear(dateString: string) {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(`${dateString}T00:00:00Z`));
  }

  function formatDateRange(entry: ResumeWorkEntry) {
    if (entry.endDate) {
      return `${formatMonthYear(entry.startDate)} - ${formatMonthYear(entry.endDate)}`;
    }

    return `${formatMonthYear(entry.startDate)} - PRESENT`;
  }
</script>

<section
  aria-labelledby="work-experience"
  class="mx-auto mt-24 max-w-6xl px-4 sm:mt-28 sm:px-6 lg:px-8"
>
  <div class="relative">
    <div
      class="pointer-events-none absolute top-10 right-0 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
    ></div>

    <SectionIntro
      id="work-experience"
      eyebrow="Career timeline"
      title="Work Experience"
      description="A role-by-role view of the systems, products, and teams I have shaped, ordered from the current frontier back through the work that built it."
    />

    <div class="relative mt-12 lg:mt-16">
      <ResumeTimeline>
        {#each workEntries as entry, index (entry.id)}
          <ResumeTimelineEntry
            reversed={entry.isReversed}
            icon={BriefcaseBusiness}
            mediaVisible={openStates[index]}
            class={cn(openStates[index] ? 'is-open' : 'is-collapsed')}
          >
            {#snippet media()}
              <ResumeTimelineMedia
                src={entry.imageSrc}
                sizes="(min-width: 1024px) 416px, 0px"
                placeholderClass={entry.placeholderClass}
                class="aspect-[4/3] w-full max-w-[26rem] rounded-[2rem] shadow-[0_22px_60px_-40px_rgba(15,23,42,0.48)]"
                imageClass="absolute inset-0 h-full w-full"
              />
            {/snippet}

            <Collapsible.Root bind:open={openStates[index]}>
              <div class="group/header relative min-w-0 space-y-4">
                <div
                  class="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase"
                >
                  <Typography
                    as="span"
                    variant="eyebrow-tight"
                    class="inline-flex items-center rounded-full border border-primary/16 bg-primary/7 px-3 py-1 text-primary/90 dark:border-primary/35 dark:bg-primary/18 dark:text-primary-foreground"
                  >
                    {entry.dateRange}
                  </Typography>
                  <span class="h-1 w-1 rounded-full bg-primary/35"></span>
                  <Typography as="span" variant="caption" class="max-w-[24rem]">
                    {entry.company}
                  </Typography>
                  {#if entry.location}
                    <Typography
                      as="span"
                      variant="caption"
                      class="inline-flex items-center gap-1.5 tracking-normal text-muted-foreground/90 normal-case"
                    >
                      <MapPin aria-hidden="true" class="size-3.5 shrink-0 text-primary/60" />
                      {entry.location}
                    </Typography>
                  {/if}
                </div>

                <Typography as="h3" variant="card-title" id={entry.id} class="min-w-0 scroll-mt-28">
                  <Collapsible.Trigger
                    class="flex w-full items-start justify-between gap-4 rounded-md text-left outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <span class="min-w-0 transition-colors group-hover/header:text-primary">
                      {entry.position}
                    </span>
                    <span
                      class="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/18 bg-primary/6 text-primary transition-colors group-hover/header:bg-primary/12"
                    >
                      <ChevronDown
                        aria-hidden="true"
                        class={cn(
                          'size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                          openStates[index] && 'rotate-180'
                        )}
                      />
                    </span>
                  </Collapsible.Trigger>
                </Typography>
              </div>

              <Collapsible.Content
                class="overflow-hidden duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
              >
                <div class="pt-6">
                  <div class="space-y-5 border-t border-black/8 pt-6 dark:border-white/10">
                    <Typography as="p" variant="body">
                      {entry.summary}
                    </Typography>

                    <ResumeTimelineBulletList items={entry.highlights} />

                    <ResumeTimelineMedia
                      src={entry.imageSrc}
                      sizes="(min-width: 1024px) 0px, calc(100vw - 5rem)"
                      placeholderClass={entry.placeholderClass}
                      class="p-4 lg:hidden"
                      imageClass="relative h-24 w-full rounded-[1rem]"
                    />
                  </div>
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          </ResumeTimelineEntry>
        {/each}
      </ResumeTimeline>
    </div>
  </div>
</section>
