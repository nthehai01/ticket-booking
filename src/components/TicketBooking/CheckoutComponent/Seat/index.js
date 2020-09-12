import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './index.scss';

import { chooseSeat } from '../../../../redux/constants/TicketBookingConst';

const Seat = ({ seat, choose }) => {
    const [status, setStatus] = useState(false);
    const [seatType, setSeatType] = useState('normal');

    useEffect(() => {
        if (seat.daDat) {
            setSeatType("chosen");
            return;
        }
        if (seat.loaiGhe === "Vip")
            setSeatType("vip");
    }, [seat]);

    const handleClick = () => {
        choose(status, seat);
        setStatus(!status);
    };

    const handleSeatNumber = (number) => (number % 16) ? (number % 16) : '16'

    return (
        <button
            className={status ? `seat ${seatType} choosing` : `seat ${seatType}`}
            onClick={() => handleClick()}
            disabled={seat.daDat}
        >
            {status && <span className="seat-text">{handleSeatNumber(seat.stt)}</span>}
        </button>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        choose: (status, seat) => {
            dispatch({
                type: chooseSeat,
                status,
                seat
            })
        }
    }
};

export default connect(null, mapDispatchToProps)(Seat);