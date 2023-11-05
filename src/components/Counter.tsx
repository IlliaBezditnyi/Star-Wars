import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CounterProps} from '../types';
import {Button} from 'react-native-paper';

const Counter: FC<CounterProps> = ({female, male, others, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.counterItems}>
        <View style={styles.counterItemsItem}>
          <Text style={styles.counterItemsTitle}>{female}</Text>
          <Text>Female fans</Text>
        </View>
        <View style={styles.counterItemsItem}>
          <Text style={styles.counterItemsTitle}>{male}</Text>
          <Text>Male fans</Text>
        </View>
        <View style={styles.counterItemsItem}>
          <Text style={styles.counterItemsTitle}>{others}</Text>
          <Text>Others</Text>
        </View>
      </View>
      <Button
        icon="delete"
        mode="contained"
        buttonColor="red"
        textColor="#fff"
        style={styles.clearButton}
        onPress={onPress}>
        Clear fans
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  counterItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  counterItemsItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  counterItemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  clearButton: {
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10,
  },
});

export default Counter;
