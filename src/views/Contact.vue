<script setup>
import { siGithub, siInstagram, siWhatsapp } from 'simple-icons'

const contactDetails = [
  { label: 'EMAIL', value: 'joelmsika@gmail.com', href: 'mailto:joelmsika@gmail.com' },
  { label: 'PHONE', value: '+25561519837', href: 'tel:+25561519837' },
  { label: 'LOCATION', value: 'Morogoro Municipal' },
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/joelmsika-pixel', icon: siGithub },
  { name: 'Instagram', href: 'https://instagram.com/joelmsika', icon: siInstagram },
  { name: 'WhatsApp', href: 'https://wa.me/25561519837', icon: siWhatsapp },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    id="contact"
    class="section-contact-surface relative border-t border-[rgba(114,151,196,0.2)] px-[clamp(24px,8.3vw,132px)] pt-12 pb-6 max-[640px]:px-6 max-[640px]:pt-10"
    aria-label="Site footer"
  >
    <div class="contact-content mx-auto w-full max-w-[1120px]">
      <div class="grid grid-cols-[1fr_1.2fr_auto] items-start gap-10 max-[760px]:grid-cols-1 max-[760px]:gap-8">
        <div>
          <p class="footer-name">Joel Msika</p>
          <p class="footer-role">Full-Stack Developer</p>
        </div>

        <address class="not-italic">
          <ul class="grid list-none gap-3 p-0">
            <li v-for="detail in contactDetails" :key="detail.label" class="grid grid-cols-[72px_1fr] items-baseline gap-3">
              <span class="footer-detail-label">{{ detail.label }}</span>
              <component
                :is="detail.href ? 'a' : 'span'"
                :href="detail.href"
                class="footer-detail-value"
              >
                {{ detail.value }}
              </component>
            </li>
          </ul>
        </address>

        <div>
          <p class="footer-social-label">SOCIAL</p>
          <nav class="flex gap-2" aria-label="Social media">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :aria-label="social.name"
              :title="social.name"
              target="_blank"
              rel="noopener noreferrer"
              :class="`contact-social-link--${social.name.toLowerCase()}`"
              class="contact-social-link relative isolate grid size-11 place-items-center overflow-hidden rounded-full"
            >
              <span class="contact-social-fill absolute inset-0 z-0 rounded-[inherit]" aria-hidden="true"></span>
              <svg class="contact-social-icon relative z-[1] size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path :d="social.icon.path" />
              </svg>
            </a>
          </nav>
        </div>
      </div>

      <div class="footer-bottom mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(114,151,196,0.16)] pt-5 text-xs max-[640px]:mt-8">
        <span>© {{ currentYear }} Joel Msika</span>
        <span>All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>
