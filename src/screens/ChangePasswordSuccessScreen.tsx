import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChangePasswordSuccessScreen() {
  const router = useRouter();

  const handleComplete = () => {
    // Возвращает на экран входа (Sign in)
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Кнопка назад */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#1E232C" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {/* Иллюстрация смартфона и безопасности */}
        <View style={styles.illustrationWrapper}>
          <View style={styles.phoneDevice}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={22} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.shieldIcon}>
            <Ionicons name="shield-checkmark" size={38} color="#3629B7" />
          </View>
          <View style={styles.keyIcon}>
            <Ionicons name="key" size={26} color="#FFB800" />
          </View>
          <View style={styles.lockBox}>
            <Ionicons name="lock-closed" size={16} color="#FFFFFF" />
          </View>
        </View>

        {/* Тексты */}
        <Text style={styles.title}>Change password successfully!</Text>
        <Text style={styles.subtitle}>
          You have successfully change password.{'\n'}
          Please use the new password when Sign in.
        </Text>

        {/* Кнопка Ok */}
        <TouchableOpacity
          style={styles.okButton}
          onPress={handleComplete}
          activeOpacity={0.8}
        >
          <Text style={styles.okButtonText}>Ok</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topHeader: {
    height: 48,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: -40,
  },
  illustrationWrapper: {
    width: 220,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  phoneDevice: {
    width: 100,
    height: 150,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#3629B7',
    backgroundColor: '#F8F9FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#3629B7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shieldIcon: {
    position: 'absolute',
    right: 28,
    bottom: 26,
  },
  keyIcon: {
    position: 'absolute',
    left: 20,
    bottom: 16,
  },
  lockBox: {
    position: 'absolute',
    right: 18,
    bottom: 12,
    backgroundColor: '#FFB800',
    borderRadius: 8,
    padding: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3629B7',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 13,
    color: '#7D848F',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 36,
  },
  okButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#3629B7',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});