import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AvatarIconStories from './src/components/AvatarIconStories';

export default function App() {
  return (
    <View style={{flex:1}}>
      <AvatarIconStories></AvatarIconStories>
    </View>
  );
}

