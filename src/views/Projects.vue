<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import eshop1 from '../assets/Eshop1.png'
import eshop2 from '../assets/Eshop2.png'
import eshop3 from '../assets/Eshop3.png'

const ecommerceSlides = [
  { src: eshop1, alt: 'Eshop homepage screenshot' },
  { src: eshop2, alt: 'Eshop product listing screenshot' },
  { src: eshop3, alt: 'Eshop contact page screenshot' },
]

const activeSlide = ref(0)
const isHovering = ref(false)
const hasFocus = ref(false)
let slideshowTimer

const projects = [
  {
    id: 1,
    file: 'Eshop',
    title: 'E-commerce Website',
    description: 'Created using the Webyetu CMS platform.',
  },
  {
    id: 2,
    file: 'system-design.ts',
    title: 'Project title',
    description: 'Add a short project summary, your role, and the result here.',
  },
  {
    id: 3,
    file: 'reverse-engineering.py',
    title: 'Project title',
    description: 'Add a short project summary, your role, and the result here.',
  },
]

function showNextSlide() {
  activeSlide.value = (activeSlide.value + 1) % ecommerceSlides.length
}

function showPreviousSlide() {
  activeSlide.value = (activeSlide.value - 1 + ecommerceSlides.length) % ecommerceSlides.length
}

function updateSlideshow() {
  window.clearInterval(slideshowTimer)
  if (
    isHovering.value
    || hasFocus.value
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) return

  slideshowTimer = window.setInterval(showNextSlide, 5000)
}

onMounted(updateSlideshow)
onBeforeUnmount(() => window.clearInterval(slideshowTimer))
</script>

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
        <article
          v-for="project in projects"
          :key="project.id"
          class="project-card relative min-w-0 overflow-hidden rounded-[9px] border border-[rgba(114,151,196,0.2)] bg-[rgba(8,19,34,0.86)] shadow-[0_16px_38px_rgba(0,0,0,0.16)]"
        >
          <div class="border-b border-[rgba(114,151,196,0.15)] bg-[rgba(18,34,55,0.65)] px-[15px] py-[11px] font-code text-[10px] font-medium leading-[1.75] text-[#b4c9b5]">
            <template v-if="project.id === 1">Eshop{{ activeSlide + 1 }}.png</template>
            <template v-else>{{ project.file }}</template>
          </div>
          <div
            v-if="project.id === 1"
            class="project-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="E-commerce website screenshots"
            @mouseenter="isHovering = true; updateSlideshow()"
            @mouseleave="isHovering = false; updateSlideshow()"
            @focusin="hasFocus = true; updateSlideshow()"
            @focusout="hasFocus = false; updateSlideshow()"
          >
            <div class="project-slideshow relative aspect-[2.23/1] overflow-hidden bg-[#101b2b]">
              <Transition name="project-slide">
                <img
                  :key="activeSlide"
                  :src="ecommerceSlides[activeSlide].src"
                  :alt="ecommerceSlides[activeSlide].alt"
                  class="absolute inset-0 size-full object-cover object-[center_72%]"
                />
              </Transition>
            </div>
            <div class="flex items-center justify-between border-t border-[rgba(114,151,196,0.15)] bg-[rgba(18,34,55,0.88)] px-3 py-2">
              <button
                type="button"
                class="project-slide-control grid size-8 place-items-center rounded-full border border-white/30 bg-[rgba(7,16,31,0.68)] text-white transition-colors hover:bg-[rgba(7,16,31,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Previous screenshot"
                @click="showPreviousSlide"
              >
                <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <div class="flex items-center gap-2" role="group" aria-label="Choose screenshot">
                <button
                  v-for="(slide, index) in ecommerceSlides"
                  :key="slide.src"
                  type="button"
                  class="h-2 rounded-full transition-all"
                  :class="index === activeSlide ? 'w-5 bg-white' : 'w-2 bg-white/55 hover:bg-white'"
                  :aria-label="`Show screenshot ${index + 1}`"
                  :aria-pressed="index === activeSlide"
                  @click="activeSlide = index"
                ></button>
              </div>
              <button
                type="button"
                class="project-slide-control grid size-8 place-items-center rounded-full border border-white/30 bg-[rgba(7,16,31,0.68)] text-white transition-colors hover:bg-[rgba(7,16,31,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Next screenshot"
                @click="showNextSlide"
              >
                <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          <div v-else class="project-art grid min-h-[185px] place-items-center max-[640px]:min-h-[160px]" aria-hidden="true">
            <span class="font-code text-[38px] font-semibold leading-none tracking-[-.1em] text-[rgba(143,166,192,0.58)]">&lt;/&gt;</span>
          </div>
          <div class="p-[23px]">
            <p class="m-0 font-code text-[10px] font-semibold leading-[1.4] tracking-[.17em] text-[#91a8c0]">PROJECT 0{{ project.id }}</p>
            <h3 class="mb-2 mt-[13px] font-code text-[17px] font-semibold leading-[1.3] text-[#eaf1fc]">{{ project.title }}</h3>
            <p class="m-0 font-code text-xs leading-[1.75] text-[#a1b1c8]">{{ project.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
