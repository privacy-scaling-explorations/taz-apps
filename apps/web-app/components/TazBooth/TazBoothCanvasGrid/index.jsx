import React, { useEffect, useState } from "react"
import axios from "axios"

const TazBoothCanvasGrid = ({ images }) => {
    const [gallaryImages, setGallaryImages] = useState(images)

    useEffect(() => {
        axios
            .get("/api/modifyCanvas")
            .then((response) => {
                console.log(response)
            })
            .catch((error) => console.log(error))
        // handle updaing data
    }, [gallaryImages])

    return (
        <div className="container h-fit w-full flex self-center p-8 ">
            <section className="overflow-hidden text-gray-700 ">
                <ul className="flex flex-wrap">
                    {gallaryImages.map((img) => (
                        <li key={img.id} className="flex flex-wrap w-1/12 border border-brand-gray2">
                            <picture>
                                <img
                                    alt="gallery"
                                    className="block object-cover object-center w-full h-auto"
                                    src={img.uri}
                                />
                            </picture>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default TazBoothCanvasGrid
