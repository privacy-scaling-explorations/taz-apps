import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/icon.png" />
                    <link rel="icon" href="https://polcxtixgqxfuvrqgthn.supabase.co/storage/v1/object/public/zulalu-images/zulalofavicon.svg" />
                    <meta property="theme-color" content="#fff" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                    <link
                        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Poppins:wght@700&display=swap"
                        rel="stylesheet"
                    />

                    <link
                        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap"
                        rel="stylesheet"
                    />

                    <link
                        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className="font-sans">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
