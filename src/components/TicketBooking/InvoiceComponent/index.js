import React, { useContext } from 'react';

import './index.scss';

import { BookingTicketContext } from '../../TicketBooking';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const InvoiceComponent = () => {
    const [bookingList] = useContext(BookingTicketContext);

    const handleSeatNumber = (number) => {
        let position = '';
        position += alphabet[parseInt(number / 16)];
        position += (number % 16) ? (number % 16) : '16';
        return position;
    };

    const calculateMoney = () => {
        return bookingList.reduce((total, currentValue) => total + currentValue.giaVe, 0);
    };

    const renderBookingSeat = () => {
        return bookingList.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{handleSeatNumber(item.stt)}</td>
                    <td>{item.giaVe}</td>
                </tr>
            )
        })
    };

    const renderInvoiceTable = () => {
        if (bookingList.length)
            return (
                <table className="invoice-table">
                    <tr>
                        <th>Seat</th>
                        <th>Price</th>
                    </tr>
                    {renderBookingSeat()}
                </table>
            )
    }

    return (
        <>
            <p className="invoice-header">
                Total: <b>{calculateMoney()}</b>
            </p>
            {renderInvoiceTable()}
        </>
    );
}

export default InvoiceComponent;