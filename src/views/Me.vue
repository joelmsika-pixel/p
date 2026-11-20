<script setup>
import portrait from '../assets/file_0000000007308211b26b89fa01cca4c5-removebg-preview.png'
import { gsap } from '../animations'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/joelmsika-pixel', iconColor: '#181717' },
  { name: 'Instagram', href: 'https://instagram.com/joelmsika', iconColor: '#d62976' },
  { name: 'WhatsApp', href: 'https://wa.me/25561519837', iconColor: '#25d366' },
]

function animateSocialLink(event, isActive, social) {
  const link = event.currentTarget
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isLightTheme = document.documentElement.dataset.theme === 'light'
  const duration = reduceMotion ? 0 : 0.45
  const fill = link.querySelector('.social-fill')
  const icon = link.querySelector('.social-icon')

  gsap.to(fill, {
    scaleY: isActive ? 1 : 0,
    ...(social.name === 'GitHub' && isActive
      ? { backgroundColor: isLightTheme ? '#181717' : '#f0f6fc' }
      : {}),
    duration,
    ease: 'power3.out',
    overwrite: 'auto',
  })
  gsap.to(icon, {
    color: isActive
      ? (social.name === 'GitHub' && !isLightTheme ? '#181717' : '#ffffff')
      : getSocialIconColor(social),
    scale: isActive && !reduceMotion ? 1.12 : 1,
    duration: reduceMotion ? 0 : 0.25,
    ease: 'power2.out',
    overwrite: 'auto',
    onComplete: () => {
      if (!isActive) gsap.set(icon, { clearProps: 'color' })
    },
  })
  gsap.to(link, {
    y: isActive && !reduceMotion ? -3 : 0,
    borderColor: isActive ? '#5b9dd5' : 'rgba(143,166,192,0.3)',
    duration: reduceMotion ? 0 : 0.25,
    ease: 'power2.out',
    overwrite: 'auto',
  })
}

function getSocialIconColor(social) {
  if (social.name === 'GitHub' && document.documentElement.dataset.theme !== 'light') {
    return '#f0f6fc'
  }

  return social.iconColor
}
</script>

<template>
  <section
    id="me"
    class="section-surface relative scroll-mt-6 px-[clamp(24px,8.3vw,132px)] py-[clamp(88px,12vw,150px)] max-[640px]:px-6 max-[640px]:py-[82px]"
    aria-labelledby="me-title"
  >
    <div class="about-content mx-auto grid w-full max-w-[1120px] grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)] items-center gap-[clamp(40px,8vw,112px)] max-[760px]:grid-cols-1 max-[760px]:gap-10">
      <div>
        <span class="mb-6 block w-fit rounded-[6px] border border-[rgba(110,154,209,0.2)] bg-[rgba(12,27,47,0.78)] px-[11px] py-2 font-code text-[10px] font-medium leading-none tracking-[.05em] text-[#b4c9b5]">about.js</span>
        <h2 id="me-title" class="m-0 text-[clamp(24px,3vw,36px)] font-semibold leading-[1.08] tracking-[-.055em] text-[#8193ad]"><span class="font-normal" aria-hidden="true">// </span>A little about me</h2>
        <div class="mt-[25px] grid max-w-[660px] gap-4 text-base leading-[1.85] text-[#a7b5ca]">
          <p class="m-0">
            I'm Joel Msika, a developer focused on full-stack development, system design and
            architecture, and reverse engineering. I'm curious about how software works beneath
            the surface and how thoughtful design can make complex systems easier to understand.
          </p>
          <p class="m-0">
            I enjoy moving between the big picture and the details: exploring a problem, understanding
            how its pieces fit together, and building solutions that are clear, dependable, and ready
            to grow.
          </p>
          <p class="m-0">
            What motivates me is turning ideas into useful experiences. I keep learning, experiment
            with new approaches, and value patience and collaboration as much as the final result.
            For me, good development is a balance of curiosity, craft, and practical impact.
          </p>
        </div>
      </div>
      <figure class="about-portrait relative mx-auto w-full max-w-[300px] overflow-hidden rounded-[18px] border border-[rgba(143,166,192,0.3)] p-2 shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
        <div class="about-portrait-image relative aspect-[4/5] overflow-hidden rounded-[12px]">
          <img
            class="portrait-photo absolute inset-0 size-full object-cover object-[center_18%]"
            :src="portrait"
            alt="Portrait of Joel Msika"
            loading="lazy"
            decoding="async"
          />
          <div class="about-portrait-overlay absolute inset-0 flex flex-col justify-end px-5 pb-5 pt-20">
            <div class="text-xl font-semibold tracking-[-.03em] text-white">Joel Msika</div>
            <span class="mt-1 font-code text-[10px] font-medium tracking-[.13em] text-[rgba(255,255,255,0.76)]">
              FULL-STACK DEVELOPER
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between px-1 pb-1 pt-3">
          <span class="font-code text-[9px] font-medium tracking-[.12em] text-[#91a8c0]">FIND ME</span>
          <nav class="flex items-center gap-2" aria-label="Social media">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            class="social-link relative grid size-10 place-items-center overflow-hidden rounded-full border border-[rgba(143,166,192,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b9dd5]"
            :class="`social-link--${social.name.toLowerCase()}`"
            :href="social.href"
            :aria-label="social.name"
            :title="social.name"
            target="_blank"
            rel="noopener noreferrer"
            @mouseenter="animateSocialLink($event, true, social)"
            @mouseleave="animateSocialLink($event, false, social)"
            @focus="animateSocialLink($event, true, social)"
            @blur="animateSocialLink($event, false, social)"
          >
            <span class="social-fill absolute inset-0" :class="`social-fill--${social.name.toLowerCase()}`" aria-hidden="true"></span>
            <svg
              v-if="social.name === 'GitHub'"
              class="social-icon relative z-[1] size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.61 1.22 3.25.93.1-.73.39-1.23.71-1.51-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.16-2.99-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.16 1.77 1.16 2.99 0 4.29-2.62 5.23-5.11 5.5.4.35.76 1.02.76 2.06v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
            </svg>
            <svg
              v-else-if="social.name === 'Instagram'"
              class="social-icon relative z-[1] size-5"
              :style="{ color: social.iconColor }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.8" r="1" fill="currentColor" stroke="none" />
            </svg>
            <svg
              v-else
              class="social-icon relative z-[1] size-5"
              :style="{ color: social.iconColor }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.4-4.5a8.4 8.4 0 1 1 15.6-4.3Z" />
              <path d="M9 8.2c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.9c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4 0 .6.5.9 1.3 1.6 2.2 2.1.2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.7-.1l1.8.9c.3.1.4.3.3.6-.1.7-.4 1.3-.9 1.7-.5.4-1.1.6-1.8.5-1.1-.2-2.5-.8-3.9-2-1.2-1-2.1-2.3-2.5-3.3-.4-1.1-.3-2.2.2-3.1Z" />
            </svg>
          </a>
          </nav>
        </div>
      </figure>
    </div>
  </section>
</template>
