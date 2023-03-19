import Header from "../../components/Header"
import Footer from "../../components/Footer"

const BaseTemplate = ({ children }: any) => (
    <div className="flex flex-col">
        <header>
            <Header />
        </header>
        <main>{children}</main>
        <footer>
            <Footer />
        </footer>
    </div>
)

export default BaseTemplate
