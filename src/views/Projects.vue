<template>
  <section
    id="projects"
    class="section-surface relative scroll-mt-6 px-[clamp(24px,8.3vw,132px)] py-[clamp(88px,12vw,150px)] max-[640px]:px-6 max-[640px]:py-[82px]"
    aria-labelledby="projects-title"
  >
    <div class="mx-auto w-full max-w-[1120px]">
      <span class="mb-6 block w-fit rounded-[6px] border border-[rgba(110,154,209,0.2)] bg-[rgba(12,27,47,0.78)] px-[11px] py-2 font-code text-[10px] font-medium leading-none tracking-[.05em] text-[#b4c9b5]">projects/</span>
      <h2 id="projects-title" class="m-0 text-[clamp(24px,3vw,36px)] font-semibold leading-[1.08] tracking-[-.055em] text-[#8193ad]"><span class="font-normal" aria-hidden="true">// </span>Projects</h2>
      <div class="mt-12 grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-2 max-[640px]:mt-[34px] max-[640px]:grid-cols-1 max-[640px]:gap-[14px]">
        <article v-for="project in 3" :key="project" class="project-card relative min-w-0 overflow-hidden rounded-[9px] border border-[rgba(114,151,196,0.2)] bg-[rgba(8,19,34,0.86)] shadow-[0_16px_38px_rgba(0,0,0,0.16)]">
          <div class="border-b border-[rgba(114,151,196,0.15)] bg-[rgba(18,34,55,0.65)] px-[15px] py-[11px] font-code text-[10px] font-medium leading-[1.75] text-[#b4c9b5]">
            {{ ['project.vue', 'system-design.ts', 'reverse-engineering.py'][project - 1] }}
          </div>
          <div class="project-art grid min-h-[185px] place-items-center max-[640px]:min-h-[160px]" aria-hidden="true">
            <span class="font-code text-[38px] font-semibold leading-none tracking-[-.1em] text-[rgba(143,166,192,0.58)]">&lt;/&gt;</span>
          </div>
          <div class="p-[23px]">
            <p class="m-0 font-code text-[10px] font-semibold leading-[1.4] tracking-[.17em] text-[#91a8c0]">PROJECT 0{{ project }}</p>
            <h3 class="mb-2 mt-[13px] font-code text-[17px] font-semibold leading-[1.3] text-[#eaf1fc]">Project title</h3>
            <p class="m-0 font-code text-xs leading-[1.75] text-[#a1b1c8]">Add a short project summary, your role, and the result here.</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
