import {View, StyleSheet, Dimensions} from 'react-native'

import Colors from '../util/colors';

function Card({children}) {
    return <View style={styles.card}>{children}</View>
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        padding: 16,
        marginTop: deviceWidth < 380 ? 18: 36,
        marginHorizontal: 24,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
      },
})