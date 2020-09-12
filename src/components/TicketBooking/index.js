import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import './index.scss';
import 'antd/dist/antd.css';

import CheckoutComponent from './CheckoutComponent';
import InvoiceComponent from './InvoiceComponent';

import { setShowtime } from '../../redux/constants/TicketBookingConst';

export const BookingTicketContext = React.createContext();

const TicketBooking = ({ setShowtime }) => {
    useEffect(() => {
        axios({
            url: 'http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=18529',
            method: 'GET'
        })
            .then(res => { console.log(res.data); setShowtime(res.data); })
            .catch(err => console.log(err.response.data))
    }, []);

    return (
        <Row gutter={[0, 0]}>
            <Col xs={24} md={16}>
                <CheckoutComponent />
            </Col>
            <Col xs={24} md={8}>
                <InvoiceComponent />
            </Col>
        </Row>
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