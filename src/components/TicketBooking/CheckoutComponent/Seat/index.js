import React, { useState, useEffect, useContext } from 'react';

import './index.scss';

import { BookingTicketContext } from '../../../TicketBooking';

const Seat = (props) => {
    const { value } = props;
    const [status, setStatus] = useState(false);
    const [seatType, setSeatType] = useState('normal');

    const [bookingList, setBookingList] = useContext(BookingTicketContext);

    useEffect(() => {
        if (value.daDat) {
            setSeatType("chosen");
            return;
        }
        if (value.loaiGhe === "Vip")
            setSeatType("vip");
    }, [value]);

    const handleClick = () => {
        let list = bookingList;
        if (!status)
            list.push(value);
        else {
            const index = list.findIndex(item => item.stt === value.stt);
            list.splice(index, 1);
        }
        setBookingList([...list]);
        setStatus(!status);
    }

    const handleSeatNumber = (number) => (number % 16) ? (number % 16) : '16'

    return (
        <button
            className={status ? `seat ${seatType} choosing` : `seat ${seatType}`}
            onClick={handleClick}
            disabled={value.daDat}
        >
            {status && <span className="seat-text">{handleSeatNumber(value.stt)}</span>}
        </button>
    )
}

export default Seat;