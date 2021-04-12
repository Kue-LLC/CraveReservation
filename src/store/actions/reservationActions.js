import Types from '../types/reservationTypes';

export const addReservation = reservation => {
    console.log('add reservation called ', reservation);
    return async dispatch => {
        try {
            dispatch({
                type: Types.ADD_RESERVATION_SUCCESS,
                reservation: reservation,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteReservation = reservation => {
    console.log('delete reservation called ', reservation);
    return async dispatch => {
        try {
            dispatch({
                type: Types.DELETE_RESERVATION_SUCCESS,
                reservation: reservation,
            });
        } catch (error) {
            console.log(error);
        }
    };
};
