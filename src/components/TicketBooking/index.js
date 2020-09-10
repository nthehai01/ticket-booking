import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';

import './index.scss';
import 'antd/dist/antd.css';

import CheckoutComponent from './CheckoutComponent';
import InvoiceComponent from './InvoiceComponent';

export const BookingTicketContext = React.createContext();

const TicketBooking = () => {
    const [showtime, setShowtime] = useState(null);
    const [bookingList, setBookingList] = useState([]);

    useEffect(() => {
        axios({
            url: 'http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=18529',
            method: 'GET'
        })
            .then(res => { console.log(res.data); setShowtime(res.data); })
            .catch(err => console.log(err.response.data))
    }, []);

    const renderScreen = () => {
        return (
            <BookingTicketContext.Provider value={[bookingList, setBookingList]}>
                <Row gutter={[0, 0]}>
                    <Col xs={24} md={16}>
                        <CheckoutComponent value={showtime} />
                    </Col>
                    <Col xs={24} md={8}>
                        <InvoiceComponent />
                    </Col>
                </Row>
            </BookingTicketContext.Provider>
        );
    }

    return (
        showtime && renderScreen()
    );
}

export default TicketBooking;