import ArtGallery from "../components/ArtGallery"
import { Subgraphs } from "../helpers/subgraphs.js"

export default function ArtGalleryPage({ images }) {
    return <ArtGallery images={images} />
}

// Use getStaticProps here instead and use revalidate: 10 (or whatever time)?
// eslint-disable-next-line no-unused-vars
export async function getServerSideProps(context) {
    const subgraphs = new Subgraphs()
    let images = []

    try {
        images = await subgraphs.getMintedTokens()
    } catch (err) {
        console.error("Error fetching images:", err)
    }

    return {
        props: { images }
    }
}
