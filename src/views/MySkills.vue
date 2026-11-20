<script setup>
import {
  siGit,
  siGithub,
  siGsap,
  siJavascript,
  siLaravel,
  siMysql,
  siNeon,
  siNodedotjs,
  siPostgresql,
  siRender,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVuedotjs,
} from 'simple-icons'

const skillGroups = [
  {
    title: 'Frontend & UI',
    description: 'Responsive interfaces and interactive motion.',
    skills: [
      { name: 'Vue.js', icon: siVuedotjs },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'Tailwind CSS', icon: siTailwindcss },
      { name: 'GSAP', icon: siGsap },
    ],
  },
  {
    title: 'Backend & APIs',
    description: 'Application logic and API development.',
    skills: [
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'Laravel', icon: siLaravel },
    ],
  },
  {
    title: 'Databases',
    description: 'Relational data and hosted PostgreSQL.',
    skills: [
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'MySQL', icon: siMysql },
      { name: 'Neon', icon: siNeon },
    ],
  },
  {
    title: 'System Design',
    description: 'Architecture, data modeling, and scalability.',
    skills: [
      { name: 'Architecture' },
      { name: 'Data modeling' },
      { name: 'Scalability' },
    ],
  },
  {
    title: 'Reverse Engineering',
    description: 'Analyze code, debug, and understand existing systems.',
    skills: [
      { name: 'Code analysis' },
      { name: 'Debugging' },
      { name: 'System understanding' },
    ],
  },
  {
    title: 'Cloud Hosting',
    description: 'Deploy and host applications.',
    skills: [
      { name: 'Vercel', icon: siVercel, contrast: true },
      { name: 'Render', icon: siRender, contrast: true },
    ],
  },
  {
    title: 'Tools & Workflow',
    description: 'Version control and collaboration.',
    skills: [
      { name: 'Git', icon: siGit },
      { name: 'GitHub', icon: siGithub, contrast: true },
    ],
  },
]
</script>

<template>
  <section
    id="my-skills"
    class="section-alt-surface relative scroll-mt-6 px-[clamp(24px,8.3vw,132px)] py-[clamp(88px,12vw,150px)] max-[640px]:px-6 max-[640px]:py-[82px]"
    aria-labelledby="skills-title"
  >
    <div class="mx-auto w-full max-w-[1120px]">
      <span class="mb-6 block w-fit rounded-[6px] border border-[rgba(110,154,209,0.2)] bg-[rgba(12,27,47,0.78)] px-[11px] py-2 font-code text-[10px] font-medium leading-none tracking-[.05em] text-[#b4c9b5]">skills.json</span>
      <h2 id="skills-title" class="m-0 text-[clamp(24px,3vw,36px)] font-semibold leading-[1.08] tracking-[-.055em] text-[#8193ad]"><span class="font-normal" aria-hidden="true">// </span>My skills</h2>
      <div class="skills-overview mt-7 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 rounded-xl px-4 py-3.5">
        <span class="font-code text-[10px] font-semibold tracking-[.1em] text-[#b4c9b5]">FULL-STACK DEVELOPMENT</span>
        <p class="m-0 font-code text-xs leading-[1.7] text-[#a1b1c8]">Frontend <span aria-hidden="true">/</span> backend <span aria-hidden="true">/</span> APIs <span aria-hidden="true">/</span> databases</p>
      </div>
      <div class="mt-5 grid grid-cols-4 gap-3 max-[1050px]:grid-cols-3 max-[760px]:grid-cols-2 max-[440px]:grid-cols-1">
        <article
          v-for="group in skillGroups"
          :key="group.title"
          class="skills-card flex min-w-0 flex-col rounded-xl p-4 transition duration-200"
        >
          <h3 class="m-0 font-code text-[14px] font-semibold leading-[1.4] text-[#eaf1fc]">{{ group.title }}</h3>
          <p class="mb-0 mt-1.5 min-h-[36px] font-code text-[10px] leading-[1.7] text-[#a1b1c8]">{{ group.description }}</p>
          <ul class="mt-3 flex flex-wrap gap-1.5 p-0" :aria-label="`${group.title} skills`">
            <li
              v-for="skill in group.skills"
              :key="skill.name"
              class="skills-chip inline-flex max-w-full items-center gap-1.5 rounded-lg px-2 py-1.5 font-code text-[10px] leading-none"
            >
              <svg
                v-if="skill.icon"
                class="size-3.5 shrink-0"
                :class="{ 'skills-brand-icon--contrast': skill.contrast }"
                :style="skill.contrast ? undefined : { color: `#${skill.icon.hex}` }"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path :d="skill.icon.path" />
              </svg>
              <span class="truncate">{{ skill.name }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
