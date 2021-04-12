import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import TrashIcon from '../assets/images/trash_icon.svg';
import CraveHeader from '../components/CraveHeader';
import CraveTimeslots from '../components/CraveTimeslots';
import CraveRestaurantsList from '../components/CraveRestaurantsList';
import reservationsJSON from '../../data.json';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styles from '../styles/app.styles';
import {formatTimeString} from '../helpers/helpers';
import {Modalize} from 'react-native-modalize';

export default ReservationPage = () => {
    const [resTimeSelection, setResTimeSelection] = useState(null);
    const [reservationSelection, setReservationSelection] = useState(null);
    const [restaurantsAvailable, setRestaurantsAvailable] = useState([]);
    const [reservations, setReservations] = useState([]);
    const restaurants = reservationsJSON.restaurants;
    const modalizeRef = useRef(null);

    let allTimeslots = restaurants
        .map(restaurant => restaurant.timeslots)
        .flat();
    let uniqueTimeslots = [...new Set(allTimeslots)].sort();

    const fetchImages = () => {
        restaurants.map(restaurant => {
            try {
                fetch(restaurant.logo)
                    .then(response => {
                        restaurant.logo = response.url;
                        setResTimeSelection(uniqueTimeslots[0]);
                        setRestaurantsAvailable(
                            existsAtTime(uniqueTimeslots[0]),
                        );
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.log(error);
            } finally {
                setResTimeSelection(uniqueTimeslots[0]);
                setRestaurantsAvailable(existsAtTime(uniqueTimeslots[0]));
            }
        });
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const existsAtTime = time => {
        return restaurants.filter(restaurant =>
            restaurant.timeslots.includes(time),
        );
    };

    const selectReservationTime = time => {
        setReservationSelection(null);
        setResTimeSelection(time);
        setRestaurantsAvailable(existsAtTime(time));
    };

    const confirmReservation = () => {
        setReservations([
            ...reservations,
            {
                name: reservationSelection.name,
                time: resTimeSelection,
                logo: reservationSelection.logo,
            },
        ]);
        onOpen();
        setReservationSelection(null);
    };

    const deleteReservation = item => {
        const keepReservations = reservations.filter(res => {
            if (res.name !== item.name || res.time !== item.time) {
                return res;
            }
        });
        setReservations([...keepReservations]);
    };

    const renderRightActions = item => {
        return (
            <TouchableOpacity
                style={styles.deleteAction}
                onPress={() => deleteReservation(item)}>
                <TrashIcon width={30} height={30} fill="white" />
            </TouchableOpacity>
        );
    };

    const renderReservation = ({item}) => {
        return (
            <Swipeable renderRightActions={() => renderRightActions(item)}>
                <View style={styles.restaurantsContainer}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: item.logo,
                        }}
                    />
                    <Text numberOfLines={1} style={styles.reservationsText}>{`${
                        item.name
                    } @ ${formatTimeString(item.time)}`}</Text>
                </View>
            </Swipeable>
        );
    };

    return (
        <View style={styles.container}>
            <CraveHeader title={'Reservations'} openModal={onOpen} />
            <View style={{flex: 1}}>
                <CraveTimeslots
                    uniqueTimeslots={uniqueTimeslots}
                    selectReservationTime={time => selectReservationTime(time)}
                    resTimeSelection={resTimeSelection}
                />
                <CraveRestaurantsList
                    setReservationSelection={item => {
                        setReservationSelection(item);
                    }}
                    confirmReservation={() => confirmReservation()}
                    reservationSelection={reservationSelection}
                    resTimeSelection={resTimeSelection}
                    restaurantsAvailable={restaurantsAvailable}
                    reservations={reservations}
                />
            </View>
            <Modalize
                style={styles.modalOuterContainer}
                ref={modalizeRef}
                adjustToContentHeight={true}
                flatListProps={{
                    ListHeaderComponent: (
                        <Text style={styles.reservationsModalText}>
                            My Reservations
                        </Text>
                    ),
                    ListFooterComponent:
                        reservations.length === 0 ? (
                            <Text style={styles.reservationsModalEmptyText}>
                                You don't have any reservations yet!
                            </Text>
                        ) : null,
                    style: styles.modalContainer,
                    data: reservations,
                    renderItem: renderReservation,
                    keyExtractor: (item, index) => item + index,
                    showsVerticalScrollIndicator: true,
                }}
            />
        </View>
    );
};
