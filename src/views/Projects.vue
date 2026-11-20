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
    category: 'E-COMMERCE',
    title: 'E-commerce Website',
    description: 'Created using the Webyetu CMS platform.',
  },
  {
    id: 2,
    file: 'system-design.ts',
    category: 'SYSTEM DESIGN',
    title: 'Project title',
    description: 'Add a short project summary, your role, and the result here.',
  },
  {
    id: 3,
    file: 'reverse-engineering.py',
    category: 'REVERSE ENGINEERING',
    title: 'Project title',
    description: 'Add a short project summary, your role, and the result here.',
  },
]

function showNextSlide() {
  activeSlide.value = (activeSlide.value + 1) % ecommerceSlides.length
}

function pauseForPointer() {
  isHovering.value = true
  updateSlideshow()
}

function resumeFromPointer() {
  isHovering.value = false
  updateSlideshow()
}

function pauseForFocus() {
  hasFocus.value = true
  updateSlideshow()
}

function resumeFromFocus() {
  hasFocus.value = false
  updateSlideshow()
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
      <div class="mt-12 grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[640px]:mt-[34px] max-[640px]:grid-cols-1 max-[640px]:gap-[14px]">
        <article
          v-for="project in projects"
          :key="project.id"
          class="project-card mx-auto w-full max-w-[420px] min-w-0"
          @mouseenter="project.id === 1 && pauseForPointer()"
          @mouseleave="project.id === 1 && resumeFromPointer()"
          @focusin="project.id === 1 && pauseForFocus()"
          @focusout="project.id === 1 && resumeFromFocus()"
        >
          <div
            v-if="project.id === 1"
            class="project-slideshow relative aspect-[2.23/1] overflow-hidden bg-[#101b2b]"
            role="region"
            aria-roledescription="carousel"
            aria-label="E-commerce website screenshots"
          >
            <Transition name="project-slide">
              <img
                :key="activeSlide"
                :src="ecommerceSlides[activeSlide].src"
                :alt="ecommerceSlides[activeSlide].alt"
                class="absolute inset-0 size-full object-cover object-[center_72%]"
              />
            </Transition>
          </div>
          <div v-else class="project-art relative grid aspect-[2.23/1] place-items-center overflow-hidden" aria-hidden="true">
            <span class="absolute left-4 top-4 font-code text-[10px] tracking-wide text-[rgba(143,166,192,0.7)]">{{ project.file }}</span>
            <span class="font-code text-[42px] font-semibold leading-none tracking-[-.1em] text-[rgba(143,166,192,0.58)]">&lt;/&gt;</span>
          </div>
          <div class="project-details-panel">
            <div class="mb-3 flex items-center justify-between gap-3">
              <p class="project-index m-0">PROJECT 0{{ project.id }}</p>
              <div v-if="project.id === 1" class="flex items-center gap-2" role="group" aria-label="Choose screenshot">
                <button
                  v-for="(slide, index) in ecommerceSlides"
                  :key="slide.src"
                  type="button"
                  class="project-slide-indicator h-2 rounded-full transition-all"
                  :class="index === activeSlide ? 'w-5' : 'w-2'"
                  :aria-label="`Show screenshot ${index + 1}`"
                  :aria-pressed="index === activeSlide"
                  @click="activeSlide = index"
                ></button>
              </div>
              <span v-else class="project-category">{{ project.category }}</span>
            </div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <a
              v-if="project.id === 1"
              href="https://eshop.co.tz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Eshop.co.tz (opens in a new tab)"
              class="project-visit-link mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"
            >
              Visit Eshop.co.tz
              <svg viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M14 4h6v6m-11 5L20 4M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
