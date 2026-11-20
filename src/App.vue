<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { gsap, ScrollTrigger } from './animations'

const route = useRoute()
const router = useRouter()
const sectionIds = ['home', 'me', 'my-skills', 'projects', 'rewards']
const navigationLinks = sectionIds.map((id) => ({
  id,
  label: id === 'my-skills' ? 'My Skills' : id.charAt(0).toUpperCase() + id.slice(1),
  mobileLabel: {
    'my-skills': 'Skills',
    rewards: 'Rewards',
  }[id] ?? (id.charAt(0).toUpperCase() + id.slice(1)),
}))
const activeSection = ref('home')
const headerVisible = ref(true)
const headerElement = ref(null)
const themeIcon = ref(null)
const systemThemePreference = window.matchMedia('(prefers-color-scheme: light)')
const savedTheme = localStorage.getItem('portfolio-theme')
const themeOverride = ref(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null)
const theme = ref(themeOverride.value ?? (systemThemePreference.matches ? 'light' : 'dark'))
let scrollFrame = 0
let lastScrollY = 0
let sectionAnimationContext

function applyTheme(nextTheme, savePreference = true) {
  theme.value = nextTheme
  if (savePreference) {
    themeOverride.value = nextTheme
    localStorage.setItem('portfolio-theme', nextTheme)
  }
  document.documentElement.dataset.theme = nextTheme
}

function handleSystemThemeChange(event) {
  if (themeOverride.value) return

  const nextTheme = event.matches ? 'light' : 'dark'
  applyTheme(nextTheme, false)
  animateNavigationLinks()
}

function toggleTheme(event) {
  const nextTheme = theme.value === 'dark' ? 'light' : 'dark'
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finishThemeChange = async () => {
    applyTheme(nextTheme)
    animateNavigationLinks()
    await nextTick()
  }

  if (reduceMotion) {
    finishThemeChange()
    return
  }

  const buttonBounds = event.currentTarget.getBoundingClientRect()
  const originX = buttonBounds.left + buttonBounds.width / 2
  const originY = buttonBounds.top + buttonBounds.height / 2

  if (document.startViewTransition) {
    const root = document.documentElement
    root.style.setProperty('--theme-origin-x', `${originX}px`)
    root.style.setProperty('--theme-origin-y', `${originY}px`)
    root.style.setProperty('--theme-reveal-radius', `${Math.hypot(window.innerWidth, window.innerHeight)}px`)

    const transition = document.startViewTransition(finishThemeChange)
    transition.finished.then(() => {
      gsap.fromTo(themeIcon.value, { rotation: -90, scale: 0.6, autoAlpha: 0 }, {
        rotation: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      })
    })
    return
  }

  gsap.to('#app', {
    autoAlpha: 0.4,
    duration: 0.16,
    ease: 'power1.out',
    onComplete: async () => {
      await finishThemeChange()
      gsap.to('#app', { autoAlpha: 1, duration: 0.25, ease: 'power2.out', clearProps: 'opacity,visibility' })
      gsap.fromTo(themeIcon.value, { rotation: -90, scale: 0.6, autoAlpha: 0 }, {
        rotation: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      })
    },
  })
}

function animateNavigationLinks() {
  const activeColor = theme.value === 'light' ? '#1769aa' : '#c5e3c9'
  const inactiveColor = theme.value === 'light' ? '#4a5b50' : '#a7b5ca'

  document.querySelectorAll('.desktop-navigation a, .mobile-navigation a').forEach((link) => {
    const color = link.getAttribute('aria-current') === 'page' ? activeColor : inactiveColor
    gsap.to(link, { color, duration: 0.2, ease: 'power1.out', overwrite: 'auto' })
  })
}

function animateLinkHover(event, isHovering, linkId) {
  const link = event.currentTarget
  const isActive = activeSection.value === linkId
  const color = isHovering
    ? (theme.value === 'light' ? '#34583b' : '#b4c9b5')
    : (isActive ? (theme.value === 'light' ? '#1769aa' : '#c5e3c9') : (theme.value === 'light' ? '#4a5b50' : '#a7b5ca'))

  gsap.to(link, { color, duration: 0.2, ease: 'power1.out', overwrite: 'auto' })
}

function animateThemeToggleHover(event, isHovering) {
  const color = theme.value === 'light'
    ? (isHovering ? '#2e5d36' : '#496458')
    : (isHovering ? '#a3b5c9' : '#91a8c0')

  gsap.to(event.currentTarget, { color, duration: 0.2, ease: 'power1.out', overwrite: 'auto' })
}

async function navigateToSection(event, id) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  event.preventDefault()

  const destination = router.resolve({ path: '/', hash: `#${id}` })
  if (route.fullPath !== destination.fullPath) {
    await router.push(destination.fullPath)
    await nextTick()
  }

  const target = document.getElementById(id)
  if (!target) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  gsap.to(window, {
    duration: reduceMotion ? 0 : 0.85,
    scrollTo: { y: target, offsetY: 24, autoKill: true },
    ease: 'power2.inOut',
    overwrite: 'auto',
    onUpdate: scheduleActiveSectionUpdate,
    onComplete: scheduleActiveSectionUpdate,
  })
}

function updateActiveSection() {
  scrollFrame = 0
  const marker = window.scrollY + Math.min(window.innerHeight * 0.35, 220)
  let currentSection = 'home'

  for (const id of sectionIds) {
    const section = document.getElementById(id)
    if (section && section.getBoundingClientRect().top + window.scrollY <= marker) {
      currentSection = id
    }
  }

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    currentSection = sectionIds[sectionIds.length - 1]
  }

  activeSection.value = currentSection
}

function scheduleActiveSectionUpdate() {
  if (!scrollFrame) {
    scrollFrame = window.requestAnimationFrame(updateActiveSection)
  }
}

function handleScroll() {
  const currentScrollY = window.scrollY
  const wasHeaderVisible = headerVisible.value

  if (currentScrollY <= 8) {
    headerVisible.value = true
  } else if (currentScrollY > lastScrollY + 4) {
    headerVisible.value = true
  } else if (currentScrollY < lastScrollY - 4) {
    headerVisible.value = false
  }

  if (headerVisible.value !== wasHeaderVisible) {
    gsap.to(headerElement.value, {
      yPercent: headerVisible.value ? 0 : -110,
      duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.28,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  lastScrollY = currentScrollY
  scheduleActiveSectionUpdate()
}

watch(
  () => route.path,
  async () => {
    await nextTick()
    setupSectionAnimations()
    ScrollTrigger.refresh()
    scheduleActiveSectionUpdate()
  },
)

watch(activeSection, animateNavigationLinks, { flush: 'post' })

function setupSectionAnimations() {
  sectionAnimationContext?.revert()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  sectionAnimationContext = gsap.context(() => {
    document.querySelectorAll('section[id]').forEach((section) => {
      const targets = Array.from(section.querySelectorAll('h1, h2, h3, p, article:not(.reward-card), blockquote, figure'))
      const label = section.querySelector('span.block.w-fit')
      if (label) targets.unshift(label)
      if (!targets.length) return

      gsap.fromTo(targets, { autoAlpha: 0, y: 18 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.045,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 82%', once: true },
      })
    })
  })
}

onMounted(() => {
  document.documentElement.dataset.theme = theme.value
  systemThemePreference.addEventListener('change', handleSystemThemeChange)
  lastScrollY = window.scrollY
  window.addEventListener('scroll', handleScroll, { passive: true })
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  gsap.set(headerElement.value, { yPercent: reduceMotion ? 0 : -110 })
  if (!reduceMotion) {
    gsap.to(headerElement.value, { yPercent: 0, duration: 0.35, ease: 'power2.out' })
  }
  setupSectionAnimations()
  nextTick(() => {
    if (route.hash) {
      const target = document.getElementById(route.hash.slice(1))
      if (target) {
        gsap.set(window, { scrollTo: { y: target, offsetY: 24 } })
      }
    }
    scheduleActiveSectionUpdate()
    animateNavigationLinks()
  })
})

onBeforeUnmount(() => {
  systemThemePreference.removeEventListener('change', handleSystemThemeChange)
  window.removeEventListener('scroll', handleScroll)
  sectionAnimationContext?.revert()
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
})
</script>

<template>
  <div class="min-h-screen pt-24 max-[640px]:pt-[68px] max-[640px]:pb-[calc(92px+env(safe-area-inset-bottom))]">
    <header
      ref="headerElement"
      class="fixed left-0 top-0 z-20 flex min-h-24 w-full items-center justify-between border-b border-[rgba(176,202,241,0.14)] bg-[rgba(7,16,31,0.96)] px-[clamp(24px,8.3vw,132px)] backdrop-blur-[16px] max-[640px]:min-h-[68px] max-[640px]:px-5"
      :inert="!headerVisible"
    >
      <RouterLink
        class="inline-flex items-center gap-3 font-code text-xs font-semibold tracking-[.16em] text-[#f4f7ff] no-underline"
        to="/"
        aria-label="Portfolio home"
      >
        <span
          class="grid size-[34px] place-items-center rounded-[10px] border border-[rgba(143,166,192,0.35)] font-code text-xs font-semibold tracking-[-.08em] text-[#91a8c0]"
          aria-hidden="true"
        >JM</span>
        <span>JOEL MSIKA</span>
      </RouterLink>
      <nav class="desktop-navigation flex items-center gap-[clamp(14px,2vw,29px)] max-[640px]:hidden" aria-label="Main navigation">
        <RouterLink
          v-for="link in navigationLinks"
          :key="link.id"
          :to="`/#${link.id}`"
          class="font-code text-xs font-medium leading-none text-[#a7b5ca] no-underline"
          :class="{ 'text-[#c5e3c9]': activeSection === link.id }"
          :aria-current="activeSection === link.id ? 'page' : undefined"
          @mouseenter="animateLinkHover($event, true, link.id)"
          @mouseleave="animateLinkHover($event, false, link.id)"
          @focus="animateLinkHover($event, true, link.id)"
          @blur="animateLinkHover($event, false, link.id)"
          @click="navigateToSection($event, link.id)"
        >{{ link.label }}</RouterLink>
      </nav>
      <button
        class="ml-5 grid size-10 shrink-0 cursor-pointer place-items-center rounded-full p-2 text-[#91a8c0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#91a8c0] max-[900px]:ml-3"
        type="button"
        :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
        :title="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
        @click="toggleTheme"
        @mouseenter="animateThemeToggleHover($event, true)"
        @mouseleave="animateThemeToggleHover($event, false)"
        @focus="animateThemeToggleHover($event, true)"
        @blur="animateThemeToggleHover($event, false)"
      >
        <svg
          v-if="theme === 'dark'"
          ref="themeIcon"
          class="theme-icon size-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
        <svg
          v-else
          ref="themeIcon"
          class="theme-icon size-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
        </svg>
      </button>
    </header>
    <nav
      class="mobile-navigation fixed bottom-0 left-0 z-30 hidden w-screen grid-cols-5 items-stretch gap-1 border-t border-[rgba(143,177,225,0.18)] bg-[rgba(7,16,31,0.98)] px-1 pt-1 pb-[calc(6px+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.2)] backdrop-blur-[18px] max-[640px]:grid"
      aria-label="Mobile navigation"
    >
      <RouterLink
        v-for="link in navigationLinks"
        :key="link.id"
        :to="`/#${link.id}`"
        class="flex min-h-[68px] flex-col items-center justify-center gap-1 rounded-xl py-1 font-code text-[9px] leading-none text-[#a7b5ca] no-underline"
        :class="{ 'text-[#c5e3c9]': activeSection === link.id }"
        :aria-label="link.label"
        :title="link.label"
        :aria-current="activeSection === link.id ? 'page' : undefined"
        @mouseenter="animateLinkHover($event, true, link.id)"
        @mouseleave="animateLinkHover($event, false, link.id)"
        @focus="animateLinkHover($event, true, link.id)"
        @blur="animateLinkHover($event, false, link.id)"
        @click="navigateToSection($event, link.id)"
      >
        <svg
          v-if="link.id === 'home'"
          class="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" />
        </svg>
        <svg
          v-else-if="link.id === 'me'"
          class="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
        <svg
          v-else-if="link.id === 'my-skills'"
          class="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12" />
        </svg>
        <svg
          v-else-if="link.id === 'projects'"
          class="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
        </svg>
        <svg
          v-else-if="link.id === 'rewards'"
          class="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="5" />
          <path d="m8.5 12-1 9 4.5-2.5 4.5 2.5-1-9M12 5.5l.8 1.6 1.7.2-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.2L12 5.5Z" />
        </svg>
        <svg
          v-else
          class="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
        <span class="whitespace-nowrap">{{ link.mobileLabel }}</span>
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
