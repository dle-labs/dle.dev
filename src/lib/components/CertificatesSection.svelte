<script lang="ts">
  import { Award } from '@lucide/svelte';

  import arch from '$lib/assets/certificates/arch.jpg?enhanced&w=220;352;704';
  import cloud from '$lib/assets/certificates/cloud.jpg?enhanced&w=220;352;704';
  import fundamentals from '$lib/assets/certificates/fundamentals.jpg?enhanced&w=220;352;704';
  import kube from '$lib/assets/certificates/kube.jpg?enhanced&w=220;352;704';
  import proces from '$lib/assets/certificates/proces.jpg?enhanced&w=220;352;704';
  import quark from '$lib/assets/certificates/quark.jpg?enhanced&w=220;352;704';
  import scrum from '$lib/assets/certificates/scrum.jpg?enhanced&w=220;352;704';
  import security from '$lib/assets/certificates/security.jpg?enhanced&w=220;352;704';
  import websec from '$lib/assets/certificates/websec.jpg?enhanced&w=220;352;704';
  import resume from '$lib/assets/resume/resume.json';
  import SectionIntro from '$lib/components/SectionIntro.svelte';
  import Typography from '$lib/components/Typography.svelte';
  import ResumeTimeline from '$lib/components/resume/ResumeTimeline.svelte';
  import ResumeTimelineBulletList from '$lib/components/resume/ResumeTimelineBulletList.svelte';
  import ResumeTimelineEntry from '$lib/components/resume/ResumeTimelineEntry.svelte';
  import ResumeTimelineMedia from '$lib/components/resume/ResumeTimelineMedia.svelte';

  type ResumeCertificateEntry = (typeof resume.certificates)[number];

  type CertificateDisplayEntry = {
    id: string;
    name: string;
    issuer: string;
    dateLabel: string;
    isUpcoming: boolean;
    summary: string;
    details: string[];
    image?: string;
    isReversed: boolean;
    placeholderClass: string;
  };

  type CertificateGroup = {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    entries: CertificateDisplayEntry[];
  };

  type EditorialCertificateEntry = {
    summary: string;
    details: string[];
    image?: string;
  };

  const editorialCopy: Record<string, EditorialCertificateEntry> = {
    'CPSA® Advanced Level Module WEBSEC|2026-09-28': {
      image: websec,
      summary:
        'Advanced architecture training focused on secure software design and web security concerns.',
      details: [
        'Deepened architecture-level thinking around security, threat surfaces, and resilient web systems.'
      ]
    },
    'CPSA® Advanced Level CLOUDINFRA|2026-12-09': {
      image: cloud,
      summary:
        'Advanced architecture coursework focused on cloud infrastructure and modern platform concerns.',
      details: [
        'Strengthened the platform and infrastructure perspective behind scalable software architecture decisions.'
      ]
    },
    'Kubernetes PaaS Cluster Design Guide|2026-08-24': {
      image: kube,
      summary: 'Internal ti&m training on designing Kubernetes clusters that run as a shared PaaS.',
      details: [
        'Covered how to separate teams on one cluster, where to put guardrails, and how to keep it manageable day to day.'
      ]
    },
    'Introduction to Quarkus|2026-06-15': {
      image: quark,
      summary: 'Technical training in the Quarkus ecosystem for modern Java backend development.',
      details: [
        'Expanded backend platform familiarity beyond the frontend-heavy delivery work shown elsewhere in the portfolio.'
      ]
    },
    'Kubernetes CKAD Certification|2026-12-20': {
      image: kube,
      summary:
        'Hands-on certification validating day-to-day Kubernetes application design and deployment skills.',
      details: [
        'Reinforced practical container orchestration knowledge across deployment, troubleshooting, and platform workflows.'
      ]
    },
    'Professional Scrum Master™ I Certification|2026-04-20': {
      image: scrum,
      summary:
        'Scrum certification covering facilitation, delivery rhythms, and the operating model behind effective team execution.',
      details: [
        'Supports leadership work across planning, alignment, and day-to-day delivery in cross-functional teams.'
      ]
    },
    'Two-Day Kubernetes Fundamentals Workshop|2025-08-18': {
      image: fundamentals,
      summary:
        'Focused Kubernetes training on the fundamentals behind cluster-based application delivery.',
      details: [
        'Built a stronger operational baseline ahead of deeper platform and certification work.'
      ]
    },
    'Security-Awareness Training for Backend Developers|2025-03-19': {
      image: security,
      summary:
        'Security training aimed at backend implementation risks, secure development habits, and common attack vectors.',
      details: [
        'Reinforced the security lens needed for work in regulated environments and compliance-sensitive products.'
      ]
    },
    'Foundation Training in Software Architecture (CPSA-F)|2025-01-20': {
      image: arch,
      summary:
        'Foundation architecture training covering core principles for structuring maintainable software systems.',
      details: [
        'Formalized the architecture vocabulary and patterns already present in day-to-day engineering leadership.'
      ]
    },
    'Camunda Platform for Java Developers|2021-09-01': {
      image: proces,
      summary:
        'Technical training in Camunda-based workflow orchestration for Java-centric systems.',
      details: [
        'Added process orchestration context useful for complex product flows and backend-integrated delivery.'
      ]
    }
  };

  const placeholderClasses = [
    'from-primary/10 via-primary/4 to-transparent',
    'from-sky-500/10 via-violet-500/4 to-transparent',
    'from-amber-500/10 via-orange-500/4 to-transparent',
    'from-emerald-500/10 via-cyan-500/4 to-transparent'
  ] as const;

  const sortedCertificates = [...resume.certificates].sort(
    (left, right) => Date.parse(right.date) - Date.parse(left.date)
  );

  const todayUtc = new Date();
  const currentDay = Date.UTC(
    todayUtc.getUTCFullYear(),
    todayUtc.getUTCMonth(),
    todayUtc.getUTCDate()
  );

  const certificateEntries: CertificateDisplayEntry[] = sortedCertificates.map((entry, index) => {
    const copyKey = `${entry.name}|${entry.date}`;
    const copy = editorialCopy[copyKey];
    const certificateDay = Date.parse(`${entry.date}T00:00:00Z`);
    const isUpcoming = certificateDay > currentDay;

    return {
      id: getCertificateId(entry),
      name: entry.name,
      issuer: entry.issuer,
      dateLabel: formatMonthYear(entry.date),
      isUpcoming,
      summary: copy?.summary ?? `${entry.issuer} credential in ${entry.name}.`,
      details: copy?.details ?? [],
      image: copy?.image,
      isReversed: index % 2 === 1,
      placeholderClass: placeholderClasses[index % placeholderClasses.length]
    };
  });

  const upcomingCertificates = certificateEntries
    .filter((entry) => entry.isUpcoming)
    .map((entry, index) => ({
      ...entry,
      isReversed: index % 2 === 1,
      placeholderClass: placeholderClasses[index % placeholderClasses.length]
    }));

  const completedCertificates = certificateEntries
    .filter((entry) => !entry.isUpcoming)
    .map((entry, index) => ({
      ...entry,
      isReversed: index % 2 === 1,
      placeholderClass: placeholderClasses[index % placeholderClasses.length]
    }));

  const certificateGroups: CertificateGroup[] = [
    {
      id: 'upcoming-certificates',
      eyebrow: 'In progress',
      title: 'Upcoming certificates',
      description:
        'Planned certifications and current training tracks scheduled next in the learning path.',
      entries: upcomingCertificates
    },
    {
      id: 'completed-certificates',
      eyebrow: 'Completed',
      title: 'Completed certificates',
      description:
        'Earned credentials and completed training already folded into day-to-day engineering work.',
      entries: completedCertificates
    }
  ].filter((group) => group.entries.length > 0);

  function getCertificateId(entry: ResumeCertificateEntry) {
    return `${entry.name}-${entry.issuer}-${entry.date}`
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

<section
  aria-labelledby="certificates"
  class="mx-auto mt-24 max-w-6xl px-4 sm:mt-28 sm:px-6 lg:px-8"
>
  <div class="relative">
    <div
      class="pointer-events-none absolute top-12 right-0 -z-10 h-60 w-60 rounded-full bg-primary/8 blur-3xl"
    ></div>

    <SectionIntro
      id="certificates"
      eyebrow="Ongoing formation"
      title="Certificates"
      description="Credentials and focused training that sharpen the architecture, platform, security, and delivery side of the work."
    />

    <div class="mt-12 space-y-14 lg:mt-16 lg:space-y-18">
      {#each certificateGroups as group (group.id)}
        <section aria-labelledby={group.id} class="relative">
          <SectionIntro
            id={group.id}
            eyebrow={group.eyebrow}
            title={group.title}
            description={group.description}
            headingTag="h3"
            class="max-w-2xl"
            eyebrowClass="tracking-[0.24em]"
            titleClass="mt-3 text-[1.45rem] tracking-[-0.03em] sm:text-[1.7rem]"
            descriptionClass="mt-3 text-[0.96rem] sm:text-[1rem] lg:text-[1.05rem] lg:leading-8"
          />

          <div class="relative mt-8 lg:mt-10">
            <ResumeTimeline>
              {#each group.entries as entry (entry.id)}
                <ResumeTimelineEntry reversed={entry.isReversed} icon={Award}>
                  {#snippet media()}
                    <ResumeTimelineMedia
                      src={entry.image}
                      sizes="(min-width: 1024px) 352px, 0px"
                      placeholderClass={entry.placeholderClass}
                      class="aspect-[4/3] w-full max-w-[22rem] rounded-[2rem] shadow-[0_22px_60px_-40px_rgba(15,23,42,0.48)]"
                      imageClass="absolute inset-0 h-full w-full"
                      fallbackVariant="certificate"
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
                        {entry.dateLabel}
                      </Typography>

                      {#if entry.isUpcoming}
                        <Typography
                          as="span"
                          variant="eyebrow-tight"
                          class="inline-flex items-center rounded-full border border-primary/18 bg-primary/8 px-3 py-1 text-primary/90 dark:border-primary/40 dark:bg-primary/20 dark:text-primary-foreground"
                        >
                          Upcoming
                        </Typography>
                      {/if}

                      <span class="h-1 w-1 rounded-full bg-primary/35"></span>
                      <Typography as="span" variant="caption" class="max-w-[24rem]">
                        {entry.issuer}
                      </Typography>
                    </div>

                    <Typography as="h4" variant="card-title-sm" id={entry.id} class="min-w-0">
                      <a
                        href={`#${entry.id}`}
                        class="underline-offset-4 hover:underline focus-visible:underline"
                      >
                        {entry.name}
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
        </section>
      {/each}
    </div>
  </div>
</section>
