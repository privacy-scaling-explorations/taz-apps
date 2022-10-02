import axios from 'axios'

export default function DbTest() {
    const handleGet = async () =>{
        const response = await axios.get('/api/test-saveCanva')
        console.log("GET response",response.data)
    }

    const handlePost = async () =>{
        const response = await axios.post('/api/test-saveCanva')
        console.log("POST response", response.data)

    }
    return (
        <div className="flex flex-col items-center justify-center h-[100%] mt-10">
            <button onClick={handleGet} className="bg-brand-blue mt-10 mb-5 text-brand-beige p-2 rounded-md">Get button</button>
            <button onClick={handlePost} className="bg-brand-blue text-brand-beige p-2 rounded-md">Post button</button>
        </div>
    )
}
