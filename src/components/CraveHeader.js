import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import ForkIcon from '../assets/images/fork_icon.svg';
import CraveLogo from '../assets/images/crave_logo.svg';
import styles from '../styles/app.styles';

export default CraveHeader = props => {
    return (
        <SafeAreaView>
            <CraveLogo style={styles.headerLogo} width={95} height={40} />
            <View style={styles.rowContainer}>
                <Text style={styles.headerText}>{props.title}</Text>
                {true ? (
                    <TouchableOpacity
                        onPress={() => props.openModal()}
                        style={styles.buttonContainer}>
                        <ForkIcon
                            width={20}
                            height={20}
                            fill={'black'}
                            stroke={'black'}
                        />
                        <Text style={styles.myReservationsText}>
                            My Reservations
                        </Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </SafeAreaView>
    );
};
