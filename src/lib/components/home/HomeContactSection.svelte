<script lang="ts">
  import { Mail } from '@lucide/svelte';

  import githubIcon from '$lib/assets/icons/github.svg';
  import linkedinIcon from '$lib/assets/icons/linkedin.svg';
  import resume from '$lib/assets/resume/resume.json';
  import SectionIntro from '$lib/components/SectionIntro.svelte';
  import { Button } from '$lib/components/ui/button';
  import { contactEmail } from '$lib/content/home';

  const profiles = resume.basics.profiles
    .filter((profile) => profile.network === 'LinkedIn' || profile.network === 'Github')
    .map((profile) => ({
      ...profile,
      label: profile.network === 'Github' ? 'GitHub' : profile.network,
      iconUrl: profile.network === 'Github' ? githubIcon : linkedinIcon
    }));
</script>

<section aria-labelledby="contact" class="mx-auto mt-24 max-w-6xl px-4 sm:mt-28 sm:px-6 lg:px-8">
  <SectionIntro
    id="contact"
    eyebrow="Contact"
    title="Let’s talk"
    description="Whether it’s a role, a project, or a question about something on this page, I’m happy to hear from you."
  />

  <div class="mt-8 flex flex-wrap items-center gap-3">
    <Button href={`mailto:${contactEmail}`} size="lg" class="h-11 gap-2 rounded-full px-5">
      <Mail aria-hidden="true" />
      Email me
    </Button>

    {#each profiles as profile (profile.url)}
      <Button
        href={profile.url}
        target="_blank"
        rel="external noreferrer"
        variant="outline"
        size="lg"
        class="h-11 gap-2 rounded-full px-5"
      >
        <img src={profile.iconUrl} alt="" class="size-4 object-contain dark:invert" />
        {profile.label}
      </Button>
    {/each}
  </div>
</section>
