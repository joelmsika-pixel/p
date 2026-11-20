<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import {
  siGoogleanalytics,
  siGooglesearchconsole,
  siLaravel,
  siNodedotjs,
  siTypescript,
  siVuedotjs,
} from 'simple-icons'
import eshop1 from '../assets/Eshop1.jpg'
import eshop2 from '../assets/Eshop2.jpg'
import eshop3 from '../assets/Eshop3.jpg'
import gratech1 from '../assets/G1.jpg'
import gratech2 from '../assets/G2.jpg'
import gratech5 from '../assets/G5.jpg'
import clm1 from '../assets/C1.jpg'
import clm2 from '../assets/C2.jpg'
import clm3 from '../assets/G3.jpg'
import biashara1 from '../assets/B1.jpg'
import biashara2 from '../assets/B2.jpg'
import biashara3 from '../assets/B3.jpg'
import biashara4 from '../assets/B4.jpg'

const ecommerceSlides = [
  { src: eshop1, alt: 'Eshop homepage screenshot' },
  { src: eshop2, alt: 'Eshop product listing screenshot' },
  { src: eshop3, alt: 'Eshop contact page screenshot' },
]

const gratechSlides = [
  { src: gratech1, alt: 'Gratech website screenshot 1' },
  { src: gratech2, alt: 'Gratech website screenshot 2' },
  { src: gratech5, alt: 'Gratech website screenshot 5' },
]

const clmSlides = [
  { src: clm1, alt: 'CLM Consultants homepage screenshot' },
  { src: clm2, alt: 'CLM Consultants contact page screenshot' },
  { src: clm3, alt: 'CLM Consultants sign-in page screenshot' },
]

const biasharaSlides = [
  { src: biashara1, alt: 'Biashara Manager screenshot 1' },
  { src: biashara2, alt: 'Biashara Manager screenshot 2' },
  { src: biashara3, alt: 'Biashara Manager screenshot 3' },
  { src: biashara4, alt: 'Biashara Manager screenshot 4' },
]

const projects = [
  {
    id: 1,
    category: 'E-COMMERCE',
    title: 'E-commerce Website',
    description: 'Created using the Webyetu CMS platform.',
    slides: ecommerceSlides,
    link: 'https://eshop.co.tz',
    linkLabel: 'Visit Eshop.co.tz',
  },
  {
    id: 2,
    category: 'COMPANY WEBSITE',
    title: 'Gratech Company Website',
    description: 'Company website for Gratech Company-Tanzania.',
    skills: [
      { name: 'Vue.js', icon: siVuedotjs },
      { name: 'Google Analytics', icon: siGoogleanalytics },
      { name: 'Google Search Console', icon: siGooglesearchconsole },
    ],
    slides: gratechSlides,
    link: 'https://gratech.co.tz',
    linkLabel: 'Visit Gratech.co.tz',
  },
  {
    id: 3,
    category: 'WEB APPLICATION',
    title: 'CLM-Consultants.LTD',
    description: 'Currently in development.',
    skills: [
      { name: 'Vue.js', icon: siVuedotjs },
      { name: 'Laravel', icon: siLaravel },
    ],
    slides: clmSlides,
    link: 'https://clm-consultants.vercel.app',
    linkLabel: 'Visit CLM Consultants',
  },
  {
    id: 4,
    category: 'BUSINESS MANAGEMENT',
    title: 'Biashara Manager',
    description: 'Point-of-sale (POS) system - MVP 1.',
    skills: [
      { name: 'Vue.js', icon: siVuedotjs },
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'TypeScript', icon: siTypescript },
    ],
    slides: biasharaSlides,
    link: 'https://bizikua.vercel.app',
    linkLabel: 'Visit Bizikua',
  },
]

const activeSlides = ref({ 1: 0, 2: 0, 3: 0, 4: 0 })
const pointerPaused = ref({ 1: false, 2: false, 3: false, 4: false })
const focusPaused = ref({ 1: false, 2: false, 3: false, 4: false })
const swipeActive = ref({ 1: false, 2: false, 3: false, 4: false })
const slideshowTimers = new Map()
const swipeStartX = new Map()

function showNextSlide(projectId) {
  const project = projects.find(({ id }) => id === projectId)
  activeSlides.value[projectId] = (activeSlides.value[projectId] + 1) % project.slides.length
}

function updateSlideshow(projectId) {
  window.clearInterval(slideshowTimers.get(projectId))
  if (
    pointerPaused.value[projectId]
    || focusPaused.value[projectId]
    || swipeActive.value[projectId]
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    slideshowTimers.delete(projectId)
    return
  }

  slideshowTimers.set(projectId, window.setInterval(() => showNextSlide(projectId), 5000))
}

function pauseForPointer(projectId) {
  pointerPaused.value[projectId] = true
  updateSlideshow(projectId)
}

function resumeFromPointer(projectId) {
  pointerPaused.value[projectId] = false
  updateSlideshow(projectId)
}

function pauseForFocus(projectId) {
  focusPaused.value[projectId] = true
  updateSlideshow(projectId)
}

function resumeFromFocus(projectId) {
  focusPaused.value[projectId] = false
  updateSlideshow(projectId)
}

function startSlideSwipe(projectId, event) {
  if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return

  swipeStartX.set(projectId, event.clientX)
  swipeActive.value[projectId] = true
  updateSlideshow(projectId)
  event.currentTarget.setPointerCapture(event.pointerId)
}

function finishSlideSwipe(projectId, event) {
  const startX = swipeStartX.get(projectId)
  if (startX === undefined) return

  swipeStartX.delete(projectId)
  const deltaX = event.clientX - startX
  if (Math.abs(deltaX) >= 48) {
    const project = projects.find(({ id }) => id === projectId)
    const direction = deltaX < 0 ? 1 : -1
    activeSlides.value[projectId] = (activeSlides.value[projectId] + direction + project.slides.length) % project.slides.length
  }

  swipeActive.value[projectId] = false
  updateSlideshow(projectId)
}

function cancelSlideSwipe(projectId) {
  if (!swipeStartX.has(projectId)) return

  swipeStartX.delete(projectId)
  swipeActive.value[projectId] = false
  updateSlideshow(projectId)
}

onMounted(() => projects.filter(({ slides }) => slides).forEach(({ id }) => updateSlideshow(id)))
onBeforeUnmount(() => slideshowTimers.forEach(timer => window.clearInterval(timer)))
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
          @mouseenter="project.slides && pauseForPointer(project.id)"
          @mouseleave="project.slides && resumeFromPointer(project.id)"
          @focusin="project.slides && pauseForFocus(project.id)"
          @focusout="project.slides && resumeFromFocus(project.id)"
        >
          <div
            v-if="project.slides"
            class="project-slideshow relative aspect-[2.23/1] overflow-hidden bg-[#101b2b]"
            role="region"
            aria-roledescription="carousel"
            :aria-label="`${project.title} screenshots`"
            @pointerdown="startSlideSwipe(project.id, $event)"
            @pointerup="finishSlideSwipe(project.id, $event)"
            @pointercancel="cancelSlideSwipe(project.id)"
            @lostpointercapture="cancelSlideSwipe(project.id)"
          >
            <Transition name="project-slide">
              <img
                :key="activeSlides[project.id]"
                :src="project.slides[activeSlides[project.id]].src"
                :alt="project.slides[activeSlides[project.id]].alt"
                class="absolute inset-0 size-full object-cover object-[center_72%]"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                draggable="false"
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
              <div v-if="project.slides" class="flex items-center gap-2" role="group" :aria-label="`Choose ${project.title} screenshot`">
                <button
                  v-for="(slide, index) in project.slides"
                  :key="slide.src"
                  type="button"
                  class="project-slide-indicator h-2 rounded-full transition-all"
                  :class="index === activeSlides[project.id] ? 'w-5' : 'w-2'"
                  :aria-label="`Show screenshot ${index + 1}`"
                  :aria-pressed="index === activeSlides[project.id]"
                  @click="activeSlides[project.id] = index"
                ></button>
              </div>
              <span v-else class="project-category">{{ project.category }}</span>
            </div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div v-if="project.skills" class="mt-4 flex items-center gap-2" role="list" aria-label="Project technology icons">
              <span
                v-for="skill in project.skills"
                :key="skill.name"
                class="project-tool-icon"
                role="listitem"
                :aria-label="skill.name"
              >
                <svg
                  class="size-4"
                  :style="{ color: `#${skill.icon.hex}` }"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path :d="skill.icon.path" />
                </svg>
              </span>
            </div>
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${project.linkLabel} (opens in a new tab)`"
              class="project-visit-link mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"
            >
              {{ project.linkLabel }}
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
