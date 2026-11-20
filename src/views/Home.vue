<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from '../animations'
import Me from './Me.vue'
import MySkills from './MySkills.vue'
import Projects from './Projects.vue'
import Rewards from './Rewards.vue'
import Contact from './Contact.vue'

const typedIntro = ref(null)
let introContext

onMounted(() => {
  if (!typedIntro.value) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(typedIntro.value, { width: '23ch', borderRightWidth: 0 })
    return
  }

  introContext = gsap.context(() => {
    gsap.set(typedIntro.value, { width: 0 })
    gsap.timeline({ repeat: -1, repeatDelay: 2.2, delay: 0.35 })
      .to(typedIntro.value, { width: '23ch', duration: 2.8, ease: 'steps(23)' })

    gsap.to(typedIntro.value, {
      borderRightColor: 'transparent',
      duration: 0.375,
      ease: 'steps(1)',
      repeat: -1,
      yoyo: true,
    })
  }, document.querySelector('#home'))
})

onBeforeUnmount(() => introContext?.revert())
</script>

<template>
  <main class="min-h-screen bg-[#07101f]">
    <section id="home" class="relative isolate flex min-h-[calc(100svh-96px)] flex-col overflow-hidden bg-[#07101f] px-[clamp(24px,8.3vw,132px)] max-[640px]:min-h-[calc(100svh-68px)] max-[640px]:px-6" aria-labelledby="hero-title">
      <div class="hero-mesh pointer-events-none absolute right-[-80px] top-1/2 z-0 aspect-square w-[min(82vw,880px)] -translate-y-1/2 rounded-full opacity-[.6] max-[640px]:right-[-120px] max-[640px]:top-[30%] max-[640px]:w-[min(150vw,760px)] max-[640px]:translate-y-0 max-[640px]:opacity-[.68]" aria-hidden="true">
        <div class="hero-mesh-dots">
          <span v-for="dot in 625" :key="dot" class="hero-mesh-dot"></span>
        </div>
      </div>
      <div class="hero-overlay pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_82%_55%,rgba(66,84,108,.1),transparent_49%),linear-gradient(90deg,#07101f_0%,rgba(7,16,31,.96)_31%,rgba(7,16,31,.66)_57%,rgba(7,16,31,.36)_100%),linear-gradient(0deg,#07101f_0%,rgba(7,16,31,.92)_12%,transparent_32%)] max-[640px]:bg-[linear-gradient(90deg,rgba(7,16,31,.9),rgba(7,16,31,.52)),linear-gradient(0deg,#07101f_2%,rgba(7,16,31,.16)_76%,#07101f_100%)]" aria-hidden="true"></div>
      <div class="pointer-events-none absolute inset-0 z-[1] overflow-hidden font-code text-xs leading-[1.5] text-[#91a8c0] max-[640px]:text-[9px]" aria-hidden="true">
        <span class="absolute right-[7%] top-[9%] whitespace-nowrap rounded-[6px] border border-[rgba(143,166,192,0.2)] bg-[rgba(8,18,32,0.72)] px-3 py-[9px] text-[#addb67] opacity-[.82] shadow-[0_3px_10px_rgba(0,0,0,0.12)] max-[640px]:right-[5%] max-[640px]:top-[7%]">&lt;section class="hero"&gt;</span>
        <span class="absolute left-[3%] top-[17%] whitespace-nowrap rounded-[6px] border border-[rgba(143,166,192,0.2)] bg-[rgba(8,18,32,0.72)] px-3 py-[9px] text-[#91a8c0] opacity-[.82] shadow-[0_3px_10px_rgba(0,0,0,0.12)] max-[640px]:top-[15%]">const ideas = ["build", "create"];</span>
        <span class="absolute bottom-[12%] right-[8%] whitespace-nowrap rounded-[6px] border border-[rgba(143,166,192,0.2)] bg-[rgba(8,18,32,0.72)] px-3 py-[9px] text-[#c792ea] opacity-[.82] shadow-[0_3px_10px_rgba(0,0,0,0.12)] max-[640px]:hidden">display: grid;</span>
        <span class="absolute bottom-[8%] left-[5%] whitespace-nowrap rounded-[6px] border border-[rgba(143,166,192,0.2)] bg-[rgba(8,18,32,0.72)] px-3 py-[9px] text-[#addb67] opacity-[.82] shadow-[0_3px_10px_rgba(0,0,0,0.12)] max-[640px]:bottom-[5%]">&lt;/section&gt;</span>
        <span class="absolute bottom-[18%] left-[4%] text-[clamp(42px,7vw,92px)] font-semibold leading-none text-[rgba(143,166,192,0.2)] opacity-40 max-[640px]:hidden">{ }</span>
      </div>
      <div class="relative z-[2] my-auto grid w-full grid-cols-[minmax(300px,.8fr)_minmax(0,1fr)] items-center gap-[clamp(32px,6vw,88px)] py-12 min-[641px]:max-[900px]:grid-cols-[minmax(260px,.78fr)_minmax(0,1fr)] min-[641px]:max-[900px]:gap-7 max-[640px]:grid-cols-[minmax(0,1fr)] max-[640px]:gap-[30px] max-[640px]:pt-8 max-[640px]:pb-6">
        <div class="relative z-[1] flex w-full flex-col items-stretch gap-5 max-[640px]:max-w-[430px] max-[640px]:items-center">
          <div class="relative z-[2] mb-[-28px] aspect-square w-[clamp(136px,17vw,180px)] translate-y-[-28px] self-center overflow-hidden rounded-full border border-[rgba(143,166,192,0.38)] bg-[#10233d] p-[3px] shadow-[0_0_0_4px_rgba(143,166,192,0.035),0_8px_20px_rgba(0,0,0,0.16)] min-[641px]:max-[900px]:w-[146px] max-[640px]:mb-[-8px] max-[640px]:w-32 max-[640px]:translate-y-[-8px]">
            <img
              class="portrait-photo absolute inset-[3px] size-[calc(100%-6px)] rounded-full object-cover object-[center_18%]"
              src="../assets/file_0000000007308211b26b89fa01cca4c5-removebg-preview.png"
              alt="Portrait of Joel Msika"
              fetchpriority="high"
              decoding="async"
            />
          </div>
          <div class="typed-code-panel overflow-hidden rounded-[14px] border border-[rgba(120,157,202,0.24)] bg-[rgba(8,18,32,0.91)] shadow-[0_8px_22px_rgba(0,0,0,0.17),inset_0_1px_0_rgba(210,230,255,0.035)] backdrop-blur-[14px]">
            <div class="terminal-toolbar flex h-[42px] items-center gap-[14px] border-b border-[rgba(120,157,202,0.16)] bg-[rgba(18,34,55,0.8)] px-4 font-code text-[10px] font-medium leading-none text-[#8193ad] max-[640px]:h-[38px] max-[640px]:gap-[10px] max-[640px]:px-3" aria-hidden="true">
              <span class="flex gap-[5px]"><i class="size-[7px] rounded-full bg-[#ff6d6d]"></i><i class="size-[7px] rounded-full bg-[#f3c969]"></i><i class="size-[7px] rounded-full bg-[#59cf9b]"></i></span>
              <span class="text-[#d3deee]">hello-world.js</span>
              <span class="ml-auto text-[#91a8c0]">JavaScript</span>
            </div>
            <div class="typed-code-body flex min-w-0 items-start gap-3 px-[clamp(18px,3vw,34px)] py-[clamp(24px,3.8vw,42px)] max-[640px]:gap-2 max-[640px]:px-3 max-[640px]:py-[22px]">
              <span class="inline-block w-[30px] shrink-0 pt-[3px] font-code text-[11px] text-[#546882] select-none max-[640px]:w-[22px] max-[640px]:text-[9px]" aria-hidden="true">01</span>
              <h1 id="hero-title" class="m-0 min-w-0 whitespace-nowrap font-code text-[clamp(13px,1.35vw,18px)] font-medium leading-[1.8] tracking-[-.06em] text-[#d0daea] max-[640px]:text-[clamp(8px,2.7vw,12px)]" aria-label="Hello, I'm Joel Msika">
                <span class="text-[#91a8c0]">console.log</span>(<span ref="typedIntro" class="inline-block w-0 max-w-[23ch] overflow-hidden border-r-2 border-[#91a8c0] align-bottom text-[#addb67] whitespace-nowrap">"Hello, I'm Joel Msika"</span>);
              </h1>
            </div>
          </div>
        </div>

        <div class="relative z-[1] w-full self-center max-[640px]:self-stretch">
          <div class="hero-terminal role-terminal w-full overflow-hidden rounded-[14px] border border-[rgba(120,157,202,0.24)] bg-[rgba(8,18,32,0.91)] shadow-[0_8px_22px_rgba(0,0,0,0.17),inset_0_1px_0_rgba(210,230,255,0.035)] backdrop-blur-[14px]">
            <div class="terminal-toolbar flex h-[42px] items-center gap-[14px] border-b border-[rgba(120,157,202,0.16)] bg-[rgba(18,34,55,0.8)] px-4 font-code text-[10px] font-medium leading-none text-[#8193ad] max-[640px]:h-[38px] max-[640px]:gap-[10px] max-[640px]:px-3" aria-hidden="true">
              <span class="flex gap-[5px]"><i class="size-[7px] rounded-full bg-[#ff6d6d]"></i><i class="size-[7px] rounded-full bg-[#f3c969]"></i><i class="size-[7px] rounded-full bg-[#59cf9b]"></i></span>
              <span class="text-[#d3deee]">developer.js</span>
              <span class="ml-auto text-[#91a8c0]">JavaScript</span>
            </div>
            <div class="terminal-body p-5 max-[640px]:px-3 max-[640px]:py-4">
              <div class="code-block grid gap-[7px] font-code text-[clamp(10px,1.1vw,13px)] font-medium leading-[1.5] text-[#d0daea] max-[640px]:gap-1.5 max-[640px]:text-[10px]" aria-label="Developer specialties">
                <p class="m-0"><span class="mr-2 inline-block w-[34px] text-[#546882] select-none max-[640px]:w-[27px]">01</span><span class="text-[#c792ea]">const</span> developer = {</p>
                <p class="m-0 pl-5 max-[640px]:pl-3"><span class="mr-2 inline-block w-[34px] text-[#546882] select-none max-[640px]:w-[27px]">02</span>role: <span class="text-[#addb67]">"Stack Developer"</span>,</p>
                <p class="m-0 pl-5 max-[640px]:pl-3"><span class="mr-2 inline-block w-[34px] text-[#546882] select-none max-[640px]:w-[27px]">03</span>focus: <span class="text-[#addb67]">"System Design &amp; Architecture"</span>,</p>
                <p class="m-0 pl-5 max-[640px]:pl-3"><span class="mr-2 inline-block w-[34px] text-[#546882] select-none max-[640px]:w-[27px]">04</span>craft: <span class="text-[#addb67]">"Reverse Engineering"</span></p>
                <p class="m-0"><span class="mr-2 inline-block w-[34px] text-[#546882] select-none max-[640px]:w-[27px]">05</span>};</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Me />
    <MySkills />
    <Projects />
    <Rewards preview />
  </main>
  <Contact />
</template>

