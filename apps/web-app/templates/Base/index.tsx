import { ToastContainer } from "react-toastify"
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
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </div>
)

export default BaseTemplate
