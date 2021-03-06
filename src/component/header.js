/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

 'use strict';
 import type {Node} from 'react';
 import {StyleSheet, Text, useColorScheme, View} from 'react-native';
 import React from 'react';
 import {Colors} from 'react-native/Libraries/NewAppScreen';
 
 const Header = (): Node => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <View
       style={[
         styles.background,
         {
           backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
         },
       ]}
       imageStyle={styles.logo}>
       <Text
         style={[
           styles.text,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         Welcome to
         {'\n'}
         Covid Autobook
       </Text>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   background: {
     paddingBottom: 10,
     paddingTop: 10,
     paddingHorizontal: 32,
   },
   logo: {
     opacity: 0.2,
     overflow: 'visible',
     resizeMode: 'cover',
     /*
      * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
      *
      * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
      * source image's size.
      */
     marginLeft: -128,
     marginBottom: -192,
   },
   text: {
     fontSize: 20,
     fontWeight: '700',
     textAlign: 'center',
   },
 });
 
 export default Header;
 