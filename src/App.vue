<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sectionIds = ['home', 'me', 'my-skills', 'projects', 'testimonials', 'rewards', 'contact']
const navigationLinks = sectionIds.map((id) => ({
  id,
  label: id === 'my-skills' ? 'My Skills' : id.charAt(0).toUpperCase() + id.slice(1),
  mobileLabel: {
    'my-skills': 'Skills',
    testimonials: 'Testim.',
    rewards: 'Rewards',
  }[id] ?? (id.charAt(0).toUpperCase() + id.slice(1)),
}))
const activeSection = ref('home')
const headerVisible = ref(true)
const theme = ref(localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark')
let scrollFrame = 0
let lastScrollY = 0

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('portfolio-theme', theme.value)
  document.documentElement.dataset.theme = theme.value
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

  if (currentScrollY <= 8) {
    headerVisible.value = true
  } else if (currentScrollY > lastScrollY + 4) {
    headerVisible.value = true
  } else if (currentScrollY < lastScrollY - 4) {
    headerVisible.value = false
  }

  lastScrollY = currentScrollY
  scheduleActiveSectionUpdate()
}

watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    scheduleActiveSectionUpdate()
  },
)

onMounted(() => {
  document.documentElement.dataset.theme = theme.value
  lastScrollY = window.scrollY
  window.addEventListener('scroll', handleScroll, { passive: true })
  nextTick(scheduleActiveSectionUpdate)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
})
</script>

<template>
  <div class="min-h-screen pt-24 max-[640px]:pt-[68px] max-[640px]:pb-[calc(92px+env(safe-area-inset-bottom))]">
    <header
      class="fixed left-0 top-0 z-20 flex min-h-24 w-full -translate-y-[110%] items-center justify-between border-b border-[rgba(176,202,241,0.14)] bg-[rgba(7,16,31,0.96)] px-[clamp(24px,8.3vw,132px)] backdrop-blur-[16px] transition-transform duration-[280ms] ease-in-out motion-reduce:transition-none max-[640px]:min-h-[68px] max-[640px]:px-5"
      :class="{ 'translate-y-0': headerVisible }"
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
      <nav class="flex items-center gap-[clamp(14px,2vw,29px)] max-[640px]:hidden" aria-label="Main navigation">
        <RouterLink
          v-for="link in navigationLinks"
          :key="link.id"
          :to="`/#${link.id}`"
          class="font-code text-xs font-medium leading-none text-[#a7b5ca] no-underline transition-colors duration-200 hover:text-[#91a8c0]"
          :class="{ 'text-[#91a8c0]': activeSection === link.id }"
          :aria-current="activeSection === link.id ? 'page' : undefined"
        >{{ link.label }}</RouterLink>
      </nav>
      <button
        class="ml-5 grid size-10 shrink-0 place-items-center rounded-full p-2 text-[#91a8c0] transition-colors hover:text-[#a3b5c9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#91a8c0] max-[900px]:ml-3"
        type="button"
        :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
        :title="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
        @click="toggleTheme"
      >
        <svg
          v-if="theme === 'dark'"
          class="size-full"
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
          class="size-full"
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
      class="mobile-navigation fixed bottom-0 left-0 z-30 hidden w-full grid-cols-7 items-stretch gap-1 border-t border-[rgba(143,177,225,0.18)] bg-[rgba(7,16,31,0.98)] px-1 pt-1 pb-[calc(6px+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.2)] backdrop-blur-[18px] max-[640px]:grid"
      aria-label="Mobile navigation"
    >
      <RouterLink
        v-for="link in navigationLinks"
        :key="link.id"
        :to="`/#${link.id}`"
        class="flex min-h-[76px] flex-col items-center justify-center gap-1 rounded-xl py-1 font-code text-[8px] leading-none text-[#a7b5ca] no-underline transition-colors duration-200 hover:text-[#91a8c0]"
        :class="{ 'text-[#7094bd]': activeSection === link.id }"
        :aria-label="link.label"
        :title="link.label"
        :aria-current="activeSection === link.id ? 'page' : undefined"
      >
        <svg
          v-if="link.id === 'home'"
          class="size-[26px]"
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
          class="size-[26px]"
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
          class="size-[26px]"
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
          class="size-[26px]"
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
          v-else-if="link.id === 'testimonials'"
          class="size-[26px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M4 5h16v12h-8l-5 4v-4H4V5Z" />
          <path d="M8 9h3m-3 4h8" />
        </svg>
        <svg
          v-else-if="link.id === 'rewards'"
          class="size-[26px]"
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
          class="size-[26px]"
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
