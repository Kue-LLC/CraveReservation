import React from 'react';
import {View, TouchableOpacity, FlatList, Text, Image} from 'react-native';
import styles from '../styles/app.styles';
import AddIcon from '../assets/images/add_icon.svg';
import CheckIcon from '../assets/images/check_icon.svg';
import {formatTimeString} from '../helpers/helpers';

export default CraveRestaurantsList = props => {
    const renderRestaurant = ({item}) => {
        const resExists = props.reservations.find(
            res =>
                res.name === item.name && res.time === props.resTimeSelection,
        );

        return (
            <TouchableOpacity
                disabled={resExists}
                style={styles.restaurantsContainer}
                onPress={() => props.setReservationSelection(item)}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: item.logo,
                    }}
                />
                <View style={styles.restaurantSpacer}>
                    <Text numberOfLines={1} style={styles.restaurantText}>
                        {item.name}
                    </Text>
                    {props.reservationSelection !== null &&
                    props.reservationSelection === item ? (
                        <TouchableOpacity
                            disabled={resExists}
                            style={styles.placeReservationContainer}
                            onPress={() => props.confirmReservation()}>
                            <Text
                                style={
                                    styles.confirmationText
                                }>{`Confirm for ${formatTimeString(
                                props.resTimeSelection,
                            )}?`}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            disabled={resExists}
                            style={styles.placeReservationContainer}
                            onPress={() => props.setReservationSelection(item)}>
                            {resExists === undefined ? (
                                <AddIcon
                                    width={25}
                                    height={25}
                                    fill={'black'}
                                />
                            ) : (
                                <CheckIcon
                                    width={25}
                                    height={25}
                                    fill={'green'}
                                />
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{flex: 1}}>
            {props.restaurantsAvailable !== null ? (
                <FlatList
                    contentContainerStyle={{
                        paddingBottom: 25,
                    }}
                    style={styles.reservationList}
                    data={props.restaurantsAvailable}
                    renderItem={renderRestaurant}
                    keyExtractor={(item, index) => item + index}
                />
            ) : null}
        </View>
    );
};
