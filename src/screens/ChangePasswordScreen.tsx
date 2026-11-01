import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChangePasswordScreen() {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Кнопка активна, если оба поля заполнены и совпадают
  const isFormValid =
    password.length >= 6 &&
    confirmPassword.length >= 6 &&
    password === confirmPassword;

  const handleSubmit = () => {
    if (isFormValid) {
      // Переход на экран успеха
      router.push('/change-password-success' as any);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Шапка со стрелкой назад */}
          <View style={styles.topHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="chevron-back" size={24} color="#1E232C" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Change password</Text>
          </View>

          {/* Белая карточка */}
          <View style={styles.card}>
            {/* Поле 1: New password */}
            <Text style={styles.inputLabel}>Type your new password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="************"
                placeholderTextColor="#A0A4AE"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#7D848F"
                />
              </TouchableOpacity>
            </View>

            {/* Поле 2: Confirm password */}
            <Text style={styles.inputLabel}>Confirm password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="************"
                placeholderTextColor="#A0A4AE"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#7D848F"
                />
              </TouchableOpacity>
            </View>

            {/* Кнопка смены пароля */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                !isFormValid && styles.actionButtonDisabled,
              ]}
              disabled={!isFormValid}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  !isFormValid && styles.actionButtonTextDisabled,
                ]}
              >
                Change password
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  flexContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
  },
  topHeader: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 6,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E232C',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 13,
    color: '#7D848F',
    marginBottom: 8,
  },
  inputWrapper: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E4E8',
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1E232C',
  },
  actionButton: {
    height: 48,
    backgroundColor: '#3629B7',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  actionButtonDisabled: {
    backgroundColor: '#F0F1F5',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  actionButtonTextDisabled: {
    color: '#A0A4AE',
  },
});
