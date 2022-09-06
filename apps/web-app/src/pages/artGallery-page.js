// import dynamic from 'next/dynamic'
import ArtGallery from '../components/artGallery.js/index.js'
// const ArtBoard = dynamic(() => import('../components/artBoard'), {
//   ssr: false,
// })

export default function ArtGalleryPage() {
  return (
    <div>
      <ArtGallery />
    </div>
  )
}
