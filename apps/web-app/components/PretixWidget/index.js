import React, { useEffect } from "react"

const PretixWidget = ({ event }) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const script = document.createElement("script")
            script.src = "https://pretix.eu/widget/v1.en.js"
            script.async = true
            document.body.appendChild(script)
            return () => {
                document.body.removeChild(script)
            }
        }
    }, [])

    return (
        <div class="w-full md:w-1/2 mx-auto my-10">
            <link rel="stylesheet" type="text/css" href="https://pretix.eu/taz-zuzalu/ticket/widget/v1.css" />
            {typeof window !== "undefined" && <pretix-widget event={event}></pretix-widget>}
            <div>
                <a href="https://pretix.eu" target="_blank" rel="noopener" className="text-brand-black text-xs">
                    ticketing powered by pretix
                </a>
            </div>
            <noscript>
                <div className="pretix-widget">
                    <div className="pretix-widget-info-message">
                        JavaScript is disabled in your browser. To access our ticket shop without JavaScript, please{" "}
                        <a target="_blank" rel="noopener" href={event.publicUrl}>
                            click here
                        </a>
                        .
                    </div>
                </div>
            </noscript>
        </div>
    )
}

export default PretixWidget
