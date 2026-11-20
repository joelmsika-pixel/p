<script setup>
import agentsCertificate from '../assets/Screenshot 2026-11-20 201020.png'
import aiCertificate from '../assets/Screenshot 2026-11-20 201102.png'
import dataScienceCertificate from '../assets/Screenshot 2026-11-20 201138.png'
import digitalMarketingCertificate from '../assets/Screenshot 2026-11-20 201205.png'
import machineLearningCertificate from '../assets/Screenshot 2026-11-20 201242.png'
import pythonCertificate from '../assets/Screenshot 2026-11-20 201311.png'
import chatGptCertificate from '../assets/Screenshot 2026-11-20 201334.png'

const certificates = [
  {
    title: 'Basics of Agents & Environments in AI',
    description: 'Explored AI agents, their environments, and how they interact.',
    issuer: 'UniAthena · Cambridge International Qualifications, UK',
    image: agentsCertificate,
  },
  {
    title: 'Basics of Artificial Intelligence',
    description: 'Built a foundation in core artificial intelligence concepts.',
    issuer: 'UniAthena · Cambridge International Qualifications, UK',
    image: aiCertificate,
  },
  {
    title: 'Basics of Data Science',
    description: 'Learned foundational data science and data analysis concepts.',
    issuer: 'UniAthena · Cambridge International Qualifications, UK',
    image: dataScienceCertificate,
  },
  {
    title: 'Basics of Digital Marketing',
    description: 'Covered core digital marketing and online promotion concepts.',
    issuer: 'UniAthena · Cambridge International Qualifications, UK',
    image: digitalMarketingCertificate,
  },
  {
    title: 'Basics of Machine Learning Algorithms',
    description: 'Studied algorithms that help systems learn patterns from data.',
    issuer: 'UniAthena · Cambridge International Qualifications, UK',
    image: machineLearningCertificate,
  },
  {
    title: 'Basics of Python Programming',
    description: 'Developed foundational programming skills using Python.',
    issuer: 'UniAthena · Cambridge International Qualifications, UK',
    image: pythonCertificate,
  },
  {
    title: 'Master ChatGPT',
    description: 'Completed training on ChatGPT and its practical applications.',
    issuer: 'UniAthena',
    image: chatGptCertificate,
  },
]
</script>

<template>
  <section
    id="rewards"
    class="section-surface relative scroll-mt-6 px-[clamp(24px,8.3vw,132px)] py-[clamp(88px,12vw,150px)] max-[640px]:px-6 max-[640px]:py-[82px]"
    aria-labelledby="rewards-title"
  >
    <div class="mx-auto w-full max-w-[1120px]">
      <span class="mb-6 block w-fit rounded-[6px] border border-[rgba(110,154,209,0.2)] bg-[rgba(12,27,47,0.78)] px-[11px] py-2 font-code text-[10px] font-medium leading-none tracking-[.05em] text-[#b4c9b5]">rewards.json</span>
      <h2 id="rewards-title" class="m-0 text-[clamp(24px,3vw,36px)] font-semibold leading-[1.08] tracking-[-.055em] text-[#8193ad]"><span class="font-normal" aria-hidden="true">// </span>Rewards</h2>
      <p class="mt-5 max-w-[650px] text-sm leading-[1.85] text-[#a7b5ca]">Certificates of achievement in artificial intelligence, data science, programming, and digital marketing.</p>
      <ul class="mt-9 grid list-none grid-cols-3 gap-4 p-0 max-[900px]:grid-cols-2 max-[640px]:mt-7 max-[640px]:grid-cols-1">
        <li v-for="(certificate, index) in certificates" :key="certificate.title">
          <article class="reward-card h-full">
            <div class="mb-5 flex items-center justify-between gap-3">
              <span class="reward-index">CERTIFICATE 0{{ index + 1 }}</span>
              <svg class="reward-icon size-8 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="5" />
                <path d="m8.5 12-1 9 4.5-2.5 4.5 2.5-1-9M12 5.5l.8 1.6 1.7.2-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.2L12 5.5Z" />
              </svg>
            </div>
            <img
              v-if="certificate.image"
              :src="certificate.image"
              :alt="`${certificate.title} certificate`"
              class="reward-certificate-image mb-5"
              loading="lazy"
            />
            <h3 class="reward-title">{{ certificate.title }}</h3>
            <p class="reward-description">{{ certificate.description }}</p>
            <p class="reward-date">Completed 17 November 2026</p>
            <p class="reward-issuer">{{ certificate.issuer }}</p>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>
