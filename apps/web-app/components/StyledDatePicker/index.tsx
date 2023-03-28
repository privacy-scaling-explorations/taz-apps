import React, { ReactNode } from "react"
import DatePicker, { ReactDatePickerCustomHeaderProps, ReactDatePickerProps } from "react-datepicker"
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css"
import styles from "../../styles/datepicker.module.css"

interface StyledDatePickerProps {
    onChange: (dates: [Date | null, Date | null]) => void
    startDate: Date | null
    endDate: Date | null
}

const StyledDatePicker: React.FC<StyledDatePickerProps> = ({ onChange, startDate, endDate }) => {
    const getDayClassName = (date: Date): string => {
        const isWeekend = moment(date).day() === 0 || moment(date).day() === 6
        return isWeekend ? styles["datepicker__day--weekend"] : styles.datepicker__day
    }

    const formatWeekDay = (day: Date): any => {
        const formattedDay = moment(day).format("dd").charAt(0)
        const isWeekend = moment(day).day() === 0 || moment(day).day() === 6

        return <span className={isWeekend ? styles.datepicker__day_name_weekend : ""}>{formattedDay}</span>
    }

    function convertUTCToLocalDate(date: Date | null) {
        if (!date) {
            return date
        }
        date = new Date(date)
        date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
        return date
    }

    function convertLocalToUTCDate(date: Date | null) {
        if (!date) {
            return date
        }
        date = new Date(date)
        date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
        return date
    }

    const renderCustomHeader = (props: ReactDatePickerCustomHeaderProps) => {
        const { date, decreaseMonth, increaseMonth } = props
        return (
            <div
                className={`react-datepicker__header ${styles["datepicker__header--white"]} flex justify-between items-center bg-white`}
            >
                <span className="text-[#35655F] font-bold ml-4">{moment(date).format("MMMM")}</span>
                <div className="flex">
                    <button className="text-[#35655F] mr-4" onClick={decreaseMonth}>
                        &#x3C;
                    </button>
                    <button onClick={increaseMonth} className="text-[#35655F] mr-4 font-medium">
                        &#x3E;
                    </button>
                </div>
            </div>
        )
    }

    const customRenderDayContents = (date: number, day: Date) => {
        const isSelected = startDate && endDate && day >= startDate && day <= endDate
        const isToday = moment().isSame(day, "day")

        const selectedClass = isSelected ? "bg-[#bae1db] rounded" : ""
        const todayClass = isToday ? "bg-[#E4EAEA] rounded" : ""

        return <div className={`react-datepicker__day-contents ${selectedClass} ${todayClass}`}>{date}</div>
    }

    return (
        <DatePicker
            className="border-2 border-[#35655F] rounded-full"
            startDate={convertUTCToLocalDate(startDate)}
            endDate={convertUTCToLocalDate(endDate)}
            onChange={(dates) => {
                const [localStartDate, localEndDate] = dates
                const utcStartDate = convertLocalToUTCDate(localStartDate)
                const utcEndDate = convertLocalToUTCDate(localEndDate)
                onChange([utcStartDate, utcEndDate])
            }}
            selectsRange
            inline
            dateFormat="DD/MM/YYYY"
            shouldCloseOnSelect={true}
            dayClassName={getDayClassName}
            formatWeekDay={formatWeekDay}
            renderCustomHeader={renderCustomHeader}
            renderDayContents={customRenderDayContents}
        />
    )
}

export default StyledDatePicker
