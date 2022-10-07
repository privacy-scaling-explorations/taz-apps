import ArtGallery from "../components/ArtGallery"

export default function ArtGalleryPage({ images }) {
    return <ArtGallery images={images} />
}

// This exists to prevent losing dynamic query params on refresh
// eslint-disable-next-line no-unused-vars
export async function getServerSideProps(context) {
    return {
        props: {}
    }
}
