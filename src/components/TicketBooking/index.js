import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import Countdown, { zeroPad } from 'react-countdown';

import './index.scss';
import 'antd/dist/antd.css';

import CheckoutComponent from './CheckoutComponent';
import InvoiceComponent from './InvoiceComponent';

import { setShowtime } from '../../redux/constants/TicketBookingConst';

export const BookingTicketContext = React.createContext();

const TicketBooking = ({ setShowtime }) => {
    const [isDone, setIsDone] = useState(false);
    const [isTimeOut, setIsTimeOut] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            axios({
                url: 'http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=18529',
                method: 'GET'
            })
                .then(res => {
                    console.log(res.data);
                    setIsDone(true);
                    setShowtime(res.data);
                })
                .catch(err => console.log(err.response.data))
        }
        const timer = setInterval(fetchData, 100);

        return () => clearInterval(timer);
    }, []);

    // Renderer callback with condition
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <span>You are good to go!</span>;
        } else {
            // Render a countdown
            return <span>{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}</span>;
        }
    };

    return (
        <>
            {isDone &&
                <Countdown
                    date={Date.now() + 5 * 60 * 1000}
                    renderer={renderer}
                />}
            <Row gutter={[0, 0]}>
                <Col xs={24} md={16}>
                    <CheckoutComponent />
                </Col>
                <Col xs={24} md={8}>
                    <InvoiceComponent />
                </Col>
            </Row>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setShowtime: (showtime) => {
            dispatch({
                type: setShowtime,
                data: showtime
            });
        }
    }
};

export default connect(null, mapDispatchToProps)(TicketBooking);