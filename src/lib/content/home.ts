export type HomeOpener = {
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  body: string;
  /** Phrases in `body` rendered with emphasis. */
  bodyHighlights: string[];
};

export const homeOpener = {
  headlinePrefix: 'I build software that takes ',
  headlineHighlight: 'friction',
  headlineSuffix: ' out of people’s work, and lead teams that build it well.',
  body: 'Over seven years in Swiss banking I’ve grown from frontend specialist to full-stack lead across React, SvelteKit, Kotlin/Quarkus, Camunda, and Kubernetes, with a focus on architecture, migrations, and maintainable systems. A background in economics and marketing keeps me close to the business.',
  bodyHighlights: ['React', 'SvelteKit', 'Kotlin/Quarkus', 'Camunda', 'Kubernetes']
} satisfies HomeOpener;

export const contactEmail = 'hi@dle.dev';
