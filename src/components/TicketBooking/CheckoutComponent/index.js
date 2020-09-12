import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import './index.scss';
import 'antd/dist/antd.css';

import Seat from './Seat';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const CheckoutComponent = ({ showtime }) => {
    const renderMovieInfo = () => {
        return (
            <>
                <p>{showtime?.thongTinPhim.tenCumRap}</p>
                <p>{showtime?.thongTinPhim.tenPhim}</p>
            </>
        )
    };

    const renderSeatArea = () => {
        return showtime?.danhSachGhe.map((item, index) => {
            return (
                <Seat key={index} seat={item} />
            )
        })
    };

    const renderColumnHeading = () => {
        return alphabet.map((item, index) => {
            return (
                <p className="column-heading">
                    <b key={index}>{item}</b>
                </p>
            )
        })
    }

    return (
        <div className="checkout-container">
            <div className="checkout-heading">
                {renderMovieInfo()}
            </div>
            <div className="checkout-theater">
                <img src="img/screen.png" alt="" />
                <Row className="checkout-content">
                    <Col span={2}>
                        {renderColumnHeading()}
                    </Col>
                    <Col span={22}>
                        {renderSeatArea()}
                    </Col>
                </Row>
            </div>
            <div className="checkout-note">
                <div className="seat-icon">
                    <div className="seat demo"></div>
                    <p>Ordinary</p>
                </div>
                <div className="seat-icon">
                    <div className="seat demo vip"></div>
                    <p>VIP</p>
                </div>
                <div className="seat-icon">
                    <div className="seat demo choosing"></div>
                    <p>Choosing</p>
                </div>
                <div className="seat-icon">
                    <div className="seat demo chosen"></div>
                    <p>Chosen</p>
                </div>
                <div className="seat-icon">
                    <div className="seat demo being-chosen"></div>
                    <p>Being Chosen</p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        showtime: state.TicketBookingReducer.showtime
    }
};

export default connect(mapStateToProps)(CheckoutComponent);