import { LoadImageUrls } from './images.js'

const overlay = document.getElementById('image-overlay')
const overlayImg = document.getElementById('overlay-image')
const prevBtn = overlay.querySelector('.overlay-prev')
const nextBtn = overlay.querySelector('.overlay-next')
const closeBtn = overlay.querySelector('.overlay-close')

let urls = []
let current = 0

function Show(index) {
  if (urls.length === 0) return
  current = (index + urls.length) % urls.length   // wraps around at both ends
  overlayImg.src = urls[current]
}

export function OpenGalleryOverlay(index) {
  Show(index)
  overlay.style.display = 'flex'
}

export function CloseGalleryOverlay() {
  overlay.style.display = 'none'
  overlayImg.src = ''
}

prevBtn.addEventListener('click', () => Show(current - 1))
nextBtn.addEventListener('click', () => Show(current + 1))
closeBtn.addEventListener('click', CloseGalleryOverlay)

// click the dark background to close
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) CloseGalleryOverlay()
})

// keyboard: Escape closes, arrows navigate (only while open)
document.addEventListener('keydown', (e) => {
  if (overlay.style.display !== 'flex') return
  if (e.key === 'Escape') CloseGalleryOverlay()
  if (e.key === 'ArrowLeft') Show(current - 1)
  if (e.key === 'ArrowRight') Show(current + 1)
})

export async function InitGallery() {
  urls = await LoadImageUrls()
  const imgs = document.querySelectorAll('.gallery-grid img')

  imgs.forEach((img, i) => {
    if (!urls[i]) return
    img.src = urls[i]
    img.addEventListener('click', () => OpenGalleryOverlay(i))
  })
}