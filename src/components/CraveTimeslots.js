import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../styles/app.styles';
import {formatTimeString} from '../helpers/helpers';

export default CraveTimeslots = props => {
    const renderTimeslot = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.timeslotItem}
                onPress={() => props.selectReservationTime(item)}>
                <Text
                    style={
                        props.resTimeSelection === item
                            ? styles.restuarantItemText
                            : styles.restuarantItemTextDisabled
                    }>
                    {formatTimeString(item)}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            {props.uniqueTimeslots !== undefined ? (
                <FlatList
                    contentContainerStyle={{paddingRight: 10}}
                    style={styles.timeslotsContainer}
                    data={props.uniqueTimeslots}
                    renderItem={renderTimeslot}
                    keyExtractor={(item, index) => item + index}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            ) : (
                <Text>
                    Oops, no reservations are available at this time, please
                    check back later!
                </Text>
            )}
        </View>
    );
};
