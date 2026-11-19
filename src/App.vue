<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sectionIds = ['home', 'me', 'my-skills', 'projects', 'testimonials', 'rewards', 'contact']
const navigationLinks = sectionIds.map((id) => ({
  id,
  label: id === 'my-skills' ? 'My Skills' : id.charAt(0).toUpperCase() + id.slice(1),
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
  <div class="min-h-screen pt-24 max-[640px]:pt-[68px] max-[640px]:pb-[calc(68px+env(safe-area-inset-bottom))]">
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
          class="grid size-[34px] place-items-center rounded-[10px] border border-[rgba(86,157,255,0.55)] font-code text-xs font-semibold tracking-[-.08em] text-[#69aaff]"
          aria-hidden="true"
        >&lt;/&gt;</span>
        <span>PORTFOLIO</span>
      </RouterLink>
      <nav class="flex items-center gap-[clamp(14px,2vw,29px)] max-[640px]:hidden" aria-label="Main navigation">
        <RouterLink
          v-for="link in navigationLinks"
          :key="link.id"
          :to="`/#${link.id}`"
          class="font-code text-xs font-medium leading-none text-[#a7b5ca] no-underline transition-colors duration-200 hover:text-[#75b2ff]"
          :class="{ 'text-[#75b2ff]': activeSection === link.id }"
          :aria-current="activeSection === link.id ? 'page' : undefined"
        >{{ link.label }}</RouterLink>
      </nav>
      <button
        class="ml-5 grid size-10 shrink-0 place-items-center rounded-full p-2 text-[#75b2ff] transition-colors hover:text-[#82aaff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75b2ff] max-[900px]:ml-3"
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
      class="fixed bottom-0 left-0 right-0 z-30 hidden min-h-16 items-stretch gap-1 overflow-x-auto border-t border-[rgba(143,177,225,0.18)] bg-[rgba(7,16,31,0.97)] px-2 py-[6px] pb-[calc(6px+env(safe-area-inset-bottom))] backdrop-blur-[18px] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden max-[640px]:flex"
      aria-label="Mobile navigation"
    >
      <RouterLink
        v-for="link in navigationLinks"
        :key="link.id"
        :to="`/#${link.id}`"
        class="flex min-w-[62px] flex-[1_0_auto] flex-col items-center justify-center gap-1.5 rounded-[10px] px-2.5 py-2 font-code text-[10px] font-medium leading-none text-[#a7b5ca] no-underline transition-colors duration-200 hover:text-[#75b2ff] max-[640px]:whitespace-nowrap"
        :class="{ 'bg-[rgba(62,132,220,0.12)] text-[#75b2ff]': activeSection === link.id }"
        :aria-current="activeSection === link.id ? 'page' : undefined"
      >
        <span class="size-[5px] rounded-full bg-current opacity-70" aria-hidden="true"></span>
        <span>{{ link.label }}</span>
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
