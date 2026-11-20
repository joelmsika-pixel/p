<template>
  <section
    id="my-skills"
    class="section-alt-surface relative scroll-mt-6 px-[clamp(24px,8.3vw,132px)] py-[clamp(88px,12vw,150px)] max-[640px]:px-6 max-[640px]:py-[82px]"
    aria-labelledby="skills-title"
  >
    <div class="mx-auto w-full max-w-[1120px]">
      <span class="mb-6 block w-fit rounded-[6px] border border-[rgba(110,154,209,0.2)] bg-[rgba(12,27,47,0.78)] px-[11px] py-2 font-code text-[10px] font-medium leading-none tracking-[.05em] text-[#91a8c0]">skills.json</span>
      <h2 id="skills-title" class="m-0 text-[clamp(24px,3vw,36px)] font-semibold leading-[1.08] tracking-[-.055em] text-[#8193ad]"><span class="font-normal" aria-hidden="true">// </span>My skills</h2>
      <div class="mt-12 grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-2 max-[640px]:mt-[34px] max-[640px]:grid-cols-1 max-[640px]:gap-[14px]">
        <article class="info-card relative min-w-0 min-h-[230px] overflow-hidden rounded-[9px] border border-[rgba(114,151,196,0.2)] bg-[rgba(8,19,34,0.86)] p-[22px] shadow-[0_16px_38px_rgba(0,0,0,0.16)] max-[640px]:min-h-0">
          <span class="-mx-[22px] -mt-[22px] mb-[22px] block border-b border-[rgba(114,151,196,0.15)] bg-[rgba(18,34,55,0.65)] px-4 py-[11px] font-code text-[10px] font-medium leading-none text-[#91a8c0]">skill.js</span>
          <span class="block font-code text-[10px] font-semibold leading-[1.4] tracking-[.17em] text-[#91a8c0]">01</span>
          <h3 class="mb-[10px] mt-[27px] font-code text-[17px] font-semibold leading-[1.3] text-[#eaf1fc]">Stack Development</h3>
          <p class="m-0 font-code text-xs leading-[1.75] text-[#a1b1c8]">Add the technologies and development strengths you want to highlight.</p>
        </article>
        <article class="info-card relative min-w-0 min-h-[230px] overflow-hidden rounded-[9px] border border-[rgba(114,151,196,0.2)] bg-[rgba(8,19,34,0.86)] p-[22px] shadow-[0_16px_38px_rgba(0,0,0,0.16)] max-[640px]:min-h-0">
          <span class="-mx-[22px] -mt-[22px] mb-[22px] block border-b border-[rgba(114,151,196,0.15)] bg-[rgba(18,34,55,0.65)] px-4 py-[11px] font-code text-[10px] font-medium leading-none text-[#91a8c0]">architecture.yml</span>
          <span class="block font-code text-[10px] font-semibold leading-[1.4] tracking-[.17em] text-[#91a8c0]">02</span>
          <h3 class="mb-[10px] mt-[27px] font-code text-[17px] font-semibold leading-[1.3] text-[#eaf1fc]">System Design &amp; Architecture</h3>
          <p class="m-0 font-code text-xs leading-[1.75] text-[#a1b1c8]">Add the architecture areas, methods, or systems you work with.</p>
        </article>
        <article class="info-card relative min-w-0 min-h-[230px] overflow-hidden rounded-[9px] border border-[rgba(114,151,196,0.2)] bg-[rgba(8,19,34,0.86)] p-[22px] shadow-[0_16px_38px_rgba(0,0,0,0.16)] max-[640px]:min-h-0">
          <span class="-mx-[22px] -mt-[22px] mb-[22px] block border-b border-[rgba(114,151,196,0.15)] bg-[rgba(18,34,55,0.65)] px-4 py-[11px] font-code text-[10px] font-medium leading-none text-[#91a8c0]">reverse-engineering.py</span>
          <span class="block font-code text-[10px] font-semibold leading-[1.4] tracking-[.17em] text-[#91a8c0]">03</span>
          <h3 class="mb-[10px] mt-[27px] font-code text-[17px] font-semibold leading-[1.3] text-[#eaf1fc]">Reverse Engineering</h3>
          <p class="m-0 font-code text-xs leading-[1.75] text-[#a1b1c8]">Add details about the tools and techniques you use in this area.</p>
        </article>
      </div>
    </div>
  </section>
</template>
