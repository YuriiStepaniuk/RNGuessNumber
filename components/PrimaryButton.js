import { View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../util/colors';

function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.btnOuterContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
        style={({ pressed }) =>
          pressed
            ? [styles.btnInnerContainer, styles.pressed]
            : styles.btnInnerContainer
        }
      >
        <Text style={styles.btnText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  btnOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  btnInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingHorizontal: 16,
    elevation: 2,
    paddingVertical: 8,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
