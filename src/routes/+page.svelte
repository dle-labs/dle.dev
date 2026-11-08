<script lang="ts">
  import CertificatesSection from '$lib/components/CertificatesSection.svelte';
  import EducationSection from '$lib/components/EducationSection.svelte';
  import SkillsSection from '$lib/components/SkillsSection.svelte';
  import WorkExperienceSection from '$lib/components/WorkExperienceSection.svelte';
  import HomeAboutSection from '$lib/components/home/HomeAboutSection.svelte';
  import HomeContactSection from '$lib/components/home/HomeContactSection.svelte';
  import HomeHeroSection from '$lib/components/home/HomeHeroSection.svelte';
</script>

<svelte:head>
  <title>Daniel L. Einars — Designer-engineer</title>
  <meta
    name="description"
    content="Designer-engineer building high-quality frontend systems, architecture, and deliberate product design for the web."
  />
</svelte:head>

<main class="relative isolate min-h-svh px-4 pt-32 sm:px-6 sm:pt-36 lg:px-8">
  <HomeHeroSection />
  <HomeAboutSection />
  <SkillsSection />
  <WorkExperienceSection />
  <EducationSection />
  <CertificatesSection />
  <HomeContactSection />
</main>
