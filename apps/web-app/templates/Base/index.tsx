import Header from "../../components/Header"
import Footer from "../../components/Footer"

const BaseTemplate = ({ children }: any) => (
    <div className="flex flex-col">
        <div className="z-20">
            <header>
                <Header />
            </header>
        </div>
        <main>{children}</main>
        <footer>
            <Footer />
        </footer>
    </div>
)

export default BaseTemplate
