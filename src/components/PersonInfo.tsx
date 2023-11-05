import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';
import {PeopleItemProps} from '../types';

const PersonInfo: FC<PeopleItemProps> = ({
  name,
  birth_year,
  gender,
  height,
  mass,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBlock}>
        <Avatar.Image
          size={100}
          source={require('../assets/icons/user-icon.png')}
          style={styles.icon}
        />
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.mainContentWrapper}>
          <Avatar.Image
            size={64}
            source={require('../assets/icons/birth-icon.png')}
            style={styles.icon}
          />
          <View style={styles.mainContentData}>
            <Text style={styles.mainContentTitle}>Date of birth</Text>
            <Text style={styles.mainContentText}>{birth_year}</Text>
            <Divider style={styles.mainContentDivider} />
          </View>
        </View>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.mainContentWrapper}>
          <Avatar.Image
            size={64}
            source={require('../assets/icons/gender-icon.png')}
            style={styles.icon}
          />
          <View style={styles.mainContentData}>
            <Text style={styles.mainContentTitle}>Gender</Text>
            <Text style={styles.mainContentText}>{gender}</Text>
            <Divider style={styles.mainContentDivider} />
          </View>
        </View>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.mainContentWrapper}>
          <Avatar.Image
            size={64}
            source={require('../assets/icons/height-icon.png')}
            style={styles.icon}
          />
          <View style={styles.mainContentData}>
            <Text style={styles.mainContentTitle}>Height</Text>
            <Text style={styles.mainContentText}>{height}</Text>
            <Divider style={styles.mainContentDivider} />
          </View>
        </View>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.mainContentWrapper}>
          <Avatar.Image
            size={64}
            source={require('../assets/icons/weight-icon.png')}
            style={styles.icon}
          />
          <View style={styles.mainContentData}>
            <Text style={styles.mainContentTitle}>Mass</Text>
            <Text style={styles.mainContentText}>{mass}</Text>
            <Divider style={styles.mainContentDivider} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBlock: {
    width: '100%',
    height: '30%',
    paddingVertical: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#624aa1',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  nameText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  icon: {
    backgroundColor: 'none',
  },
  mainContent: {
    padding: 20,
    gap: 20,
  },
  mainContentWrapper: {
    flexDirection: 'row',
    gap: 20,
  },
  mainContentData: {
    width: '70%',
    justifyContent: 'space-between',
  },
  mainContentDivider: {
    backgroundColor: '#000',
  },
  mainContentTitle: {
    fontSize: 18,
    color: '#624aa1',
  },
  mainContentText: {
    fontSize: 18,
  },
});

export default PersonInfo;
