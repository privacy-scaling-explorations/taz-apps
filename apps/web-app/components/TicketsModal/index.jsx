import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React, { useState, useEffect } from "react"
import TicketsModalView from "./view.jsx"

const supabase = createBrowserSupabaseClient()

const TicketsModal = ({ isOpen, closeModal, checkSession, userInfo }) => {
    const [tickets, setTickets] = useState([])
    function setModalOpen() {
        closeModal(false)
    }

    async function getUserTickets() {
        try {
            const supabaseResponse = await supabase.from("tickets").select("*").eq("email", userInfo.email)
            if (!supabaseResponse.error) {
                setTickets(supabaseResponse.data)
                console.log(tickets)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserTickets()
    }, [])
    return <TicketsModalView isOpen={isOpen} closeModal={setModalOpen} tickets={tickets} />
}

export default TicketsModal
