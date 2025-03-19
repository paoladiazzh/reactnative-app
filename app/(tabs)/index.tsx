import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ButtonGame from './ButtonGame.tsx';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ButtonGame />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});