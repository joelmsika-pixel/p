import { gsap } from '../animations'

export function animateSocialLink(event, isActive, social) {
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
