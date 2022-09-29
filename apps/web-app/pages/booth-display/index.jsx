import BoothContent from "../../components/TazBooth/BoothContent"
import TazBoothFooter from "../../components/TazBooth/TazBoothFooter"

const BoothDisplay = () => (
    <div className="flex flex-col h-screen bg-brand-black p-10">
        <BoothContent />
        <TazBoothFooter />
    </div>
)

export default BoothDisplay

// eslint-disable-next-line no-unused-vars
// export async function getServerSideProps(context) {
//   const subgraphs = new Subgraphs()
//   const imagesRequest = subgraphs.getMintedTokens()
//   // const artBoardRequest = axios.get('/api/modifyCanvas')

//   const [images] = await Promise.all([imagesRequest])

//   return {
//     props: { images }
//   }
// }
