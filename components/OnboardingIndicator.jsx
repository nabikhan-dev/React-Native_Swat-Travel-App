import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Custom Indicator component
const CustomIndicator = ({ pageCount = 3, currentIndex = 0 }) => { 
    const indicators = [];
    for (let i = 0; i < pageCount; i++) {
        indicators.push(
            <View key={i} style={[styles.indicator, i === currentIndex ? styles.activeIndicator : null]} />
        );
    }
    return (
        <View style={styles.indicatorContainer}>
            {indicators}
        </View>
    );
};

const styles = StyleSheet.create({
    indicatorContainer: {
        position: 'absolute',
        bottom: 50, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    indicator: {
        width: width * 0.02,
        height: width * 0.02,
        borderRadius: 2,
        borderColor: '#4AA9BC',
        borderWidth: 1,
        marginHorizontal: width * 0.04,
        marginBottom: 40,
    },
    activeIndicator: {
        backgroundColor: '#4AA9BC',
        transform: [{ rotate: '45deg' }],
        shadowColor: '#fff',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
});

export default CustomIndicator;
