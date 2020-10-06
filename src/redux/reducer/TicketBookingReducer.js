import { setInfoUser, setShowtime, chooseSeat, bookTicket } from '../constants/TicketBookingConst';
import { axios } from 'axios';

const initialState = {
    user: null,
    showtime: null,
    bookingList: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case setInfoUser:
            return {
                ...state, user: action.data
            };

        case setShowtime:
            return {
                ...state, showtime: action.data
            };

        case chooseSeat: {
            let list = state.bookingList;
            if (!action.status)
                list.push({
                    maGhe: action.seat.maGhe,
                    giaVe: action.seat.giaVe,
                    stt: action.seat.stt
                });
            else {
                const index = list.findIndex(item => item.maGhe === action.seat.maGhe);
                list.splice(index, 1);
            }
            return { ...state, bookingList: [...list] };
        };

        case bookTicket: {
            axios({
                url: 'http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe',
                method: 'POST',
                data: {
                    maLichChieu: state.showtime.thongTinPhim.maLichChieu,
                    danhSachVe: state.bookingList,
                    taiKhoanNguoiDung: 'hj'
                },
                header: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiY2MiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJLaGFjaEhhbmciLCJuYmYiOjE2MDA0OTQwOTksImV4cCI6MTYwMDQ5NzY5OX0.t1DFA753jQ5OPN_ncZaWceO1U_0Oow1biB9cLYQvgzA` }
            })
                .then(res => { console.log(1) })
                .catch(err => { console.log(2) })
            return { ...state };
        }

        default:
            return state;
    };
};