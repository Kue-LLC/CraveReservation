const initialState = {
    reservationsState: {
        reservations: [],
    },
};

export default function ReservationReducers(state = initialState, action) {
    switch (action.type) {
        case Types.ADD_RESERVATION_SUCCESS:
            return {
                ...state,
                reservationsState: {
                    reservations: [
                        ...state.reservationsState.reservations,
                        action.reservation,
                    ],
                },
            };
        case Types.DELETE_RESERVATION_SUCCESS:
            //TODO remove action.reservation

            return {
                ...state,
                reservationsState: {
                    reservations: [...state.reservationsState.reservations],
                },
            };
        default:
            return state;
    }
}
