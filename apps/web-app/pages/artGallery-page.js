import ArtGallery from '../components/ArtGallery'
import { Subgraphs } from '../hooks/subgraphs'

export default function ArtGalleryPage({ images }) {
  return <ArtGallery images={images} />
}

// Use getStaticProps here instead and use revalidate: 10 (or whatever time)?
// eslint-disable-next-line no-unused-vars
export async function getServerSideProps(context) {
  const subgraphs = new Subgraphs()
  const images = await subgraphs.getMintedTokens()

  return {
    props: { images }
  }
}
