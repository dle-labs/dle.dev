<script lang="ts">
  import { GraduationCap } from '@lucide/svelte';

  import hamburg from '$lib/assets/education/hamburg.jpg?enhanced&w=240;384;768';
  import london from '$lib/assets/education/london.jpg?enhanced&w=240;384;768';
  import zurich from '$lib/assets/education/zurich.jpg?enhanced&w=240;384;768';
  import resume from '$lib/assets/resume/resume.json';
  import SectionIntro from '$lib/components/SectionIntro.svelte';
  import Typography from '$lib/components/Typography.svelte';
  import ResumeTimeline from '$lib/components/resume/ResumeTimeline.svelte';
  import ResumeTimelineBulletList from '$lib/components/resume/ResumeTimelineBulletList.svelte';
  import ResumeTimelineEntry from '$lib/components/resume/ResumeTimelineEntry.svelte';
  import ResumeTimelineMedia from '$lib/components/resume/ResumeTimelineMedia.svelte';

  type ResumeEducationEntry = (typeof resume.education)[number];

  type EducationDisplayEntry = {
    id: string;
    degree: string;
    institution: string;
    dateRange: string;
    summary: string;
    details: string[];
    isReversed: boolean;
    image: string;
    placeholderClass: string;
  };

  type EditorialEducationEntry = {
    summary: string;
    details: string[];
    image: string;
  };

  const editorialCopy: Record<string, EditorialEducationEntry> = {
    'Bachelor of Science in Computer Science ZHAW Zurich (BSc)|2015-09-01': {
      image: zurich,
      summary:
        'A focused computer science track centered on software systems, implementation, and applied machine learning work.',
      details: [
        'Built a stronger engineering foundation around software design, implementation, and technical problem solving.',
        'Thesis: Training image classifiers with smartphones.'
      ]
    },
    'Master of Business Administration (MBA)|2009-09-01': {
      image: hamburg,
      summary:
        'An MBA grounding in business strategy, media, and digital product thinking that still informs how I connect execution with commercial outcomes.',
      details: [
        'Developed a stronger lens on market positioning, business priorities, and decision-making beyond pure implementation.',
        'Thesis: Analysing critical success factors of browser games.'
      ]
    },
    'Bachelor of Arts in Economics (BA)|2006-09-01': {
      image: london,
      summary:
        'An economics degree that established the analytical and structural thinking behind later product, marketing, and engineering work.',
      details: [
        'Built the early quantitative and commercial foundation that later supported both marketing leadership and software delivery.'
      ]
    }
  };

  const placeholderClasses = [
    'from-primary/10 via-primary/4 to-transparent',
    'from-sky-500/10 via-violet-500/4 to-transparent',
    'from-amber-500/10 via-orange-500/4 to-transparent',
    'from-emerald-500/10 via-cyan-500/4 to-transparent'
  ] as const;

  const sortedEducation = [...resume.education].sort(
    (left, right) => Date.parse(right.startDate) - Date.parse(left.startDate)
  );

  const educationEntries: EducationDisplayEntry[] = sortedEducation.map((entry, index) => {
    const copyKey = `${entry.area}|${entry.startDate}`;
    const copy = editorialCopy[copyKey];

    return {
      id: getEducationId(entry),
      degree: entry.area,
      institution: entry.institution,
      dateRange: `${formatMonthYear(entry.startDate)} - ${formatMonthYear(entry.endDate)}`,
      summary: copy?.summary ?? entry.area,
      details: copy?.details ?? (entry.thesis ? [`Thesis: ${entry.thesis}.`] : []),
      isReversed: index % 2 === 1,
      image: copy?.image,
      placeholderClass: placeholderClasses[index % placeholderClasses.length]
    };
  });

  function getEducationId(entry: ResumeEducationEntry) {
    return `${entry.area}-${entry.institution}-${entry.startDate}`
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
</script>

<section aria-labelledby="education" class="mx-auto mt-24 max-w-6xl px-4 sm:mt-28 sm:px-6 lg:px-8">
  <div class="relative">
    <div
      class="pointer-events-none absolute top-10 left-0 -z-10 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
    ></div>

    <SectionIntro
      id="education"
      eyebrow="Academic path"
      title="Education"
      description="The academic track behind the way I work today, spanning economics, business, and software engineering."
    />

    <div class="relative mt-12 lg:mt-16">
      <ResumeTimeline>
        {#each educationEntries as entry (entry.id)}
          <ResumeTimelineEntry reversed={entry.isReversed} icon={GraduationCap}>
            {#snippet media()}
              <ResumeTimelineMedia
                src={entry.image}
                sizes="(min-width: 1024px) 384px, 0px"
                placeholderClass={entry.placeholderClass}
                class="aspect-[4/3] w-full max-w-[24rem] rounded-[2rem] shadow-[0_22px_60px_-40px_rgba(15,23,42,0.48)]"
                imageClass="absolute inset-0 h-full w-full"
              />
            {/snippet}

            <div class="min-w-0 space-y-4">
              <div
                class="flex flex-wrap items-center gap-2.5 text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase"
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
                  {entry.institution}
                </Typography>
              </div>

              <Typography as="h3" variant="card-title" id={entry.id} class="min-w-0">
                <a
                  href={`#${entry.id}`}
                  class="underline-offset-4 hover:underline focus-visible:underline"
                >
                  {entry.degree}
                </a>
              </Typography>
            </div>

            <div class="mt-6">
              <div class="space-y-5 border-t border-black/8 pt-6 dark:border-white/10">
                <Typography as="p" variant="body">
                  {entry.summary}
                </Typography>

                <ResumeTimelineBulletList items={entry.details} />

                <ResumeTimelineMedia
                  src={entry.image}
                  sizes="(min-width: 1024px) 0px, calc(100vw - 5rem)"
                  placeholderClass={entry.placeholderClass}
                  class="p-4 lg:hidden"
                  imageClass="relative h-24 w-full rounded-[1rem]"
                />
              </div>
            </div>
          </ResumeTimelineEntry>
        {/each}
      </ResumeTimeline>
    </div>
  </div>
</section>
