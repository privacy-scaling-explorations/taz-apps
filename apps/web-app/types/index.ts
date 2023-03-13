export interface UserDTO {
    code: string
    created_at: Date
    email: string
    id: number
    semaphoreId: string
    userName: string
}

export interface EventsDTO {
    created_at: Date
    endDate: Date
    endTime: string
    id: 21
    info: string
    location: string
    name: string
    organizers: string[]
    startDate: Date
    startTime: string
    tags: string[]
}

export interface ParticipantsDTO {
    created_at: Date
    event_id: number
    user_id: number
    events: EventsDTO
    users: UserDTO[]
}

export interface FavoritedEventsDTO {
    created_at: Date
    event_id: number
    user_id: number
    events: EventsDTO
    users: UserDTO[]
}
