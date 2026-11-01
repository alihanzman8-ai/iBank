import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const router = useRouter();

  // Состояния полей ввода
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+77'); // Начальное значение для Казахстана
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Контроль ввода: не дает стереть префикс +77
  const handlePhoneChange = (text: string) => {
    if (!text.startsWith('+77')) {
      setPhone('+77');
    } else {
      setPhone(text);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        
        {/* Шапка */}
        <View style={styles.topHeader}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.replace('/')}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign up</Text>
        </View>

        {/* Белая карточка */}
        <View style={styles.contentCard}>
          <Text style={styles.title}>Welcome to us,</Text>
          <Text style={styles.subtitle}>Hello there, create New account</Text>

          {/* Иллюстрация */}
          <View style={styles.illustrationWrapper}>
            <View style={styles.circleBg}>
              <View style={styles.phoneIconContainer}>
                <Ionicons name="phone-portrait-outline" size={38} color="#FFFFFF" />
              </View>
              <View style={[styles.dot, styles.dotPink]} />
              <View style={[styles.dot, styles.dotYellow]} />
              <View style={[styles.dot, styles.dotCyan]} />
              <View style={[styles.dot, styles.dotPurple]} />
            </View>
          </View>

          {/* Поле 1: Имя */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#9EA3AE"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Поле 2: Номер телефона Казахстана */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="(+77) 700 000 0000"
              placeholderTextColor="#9EA3AE"
              keyboardType="phone-pad" // Открывает цифровую клавиатуру
              value={phone}
              onChangeText={handlePhoneChange}
              maxLength={12} // +77 + 9 цифр номера (например: +77011234567)
            />
          </View>

          {/* Поле 3: Пароль */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9EA3AE"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#7D848F"
              />
            </TouchableOpacity>
          </View>

          {/* Чекбокс правил */}
          <TouchableOpacity 
            style={styles.checkboxRow} 
            onPress={() => setAgreeTerms(!agreeTerms)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, agreeTerms && styles.checkboxActive]}>
              {agreeTerms && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxLabel}>
              By creating an account your agree to our{' '}
              <Text style={styles.linkText}>Term and Conditions</Text>
            </Text>
          </TouchableOpacity>

          {/* Кнопка регистрации */}
          <TouchableOpacity 
            style={[
              styles.signUpButton, 
              !agreeTerms && styles.signUpButtonDisabled
            ]}
            disabled={!agreeTerms}
          >
            <Text style={[
              styles.signUpButtonText,
              !agreeTerms && styles.signUpButtonTextDisabled
            ]}>
              Sign up
            </Text>
          </TouchableOpacity>

          {/* Подвал */}
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Have an account? </Text>
            <TouchableOpacity onPress={() => router.replace('/')}>
              <Text style={styles.signInLinkText}>Sign In</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3629B7',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#3629B7',
  },
  topHeader: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E232C',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#7D848F',
    marginTop: 4,
    marginBottom: 16,
    textAlign: 'center',
  },
  illustrationWrapper: {
    width: 213,
    height: 135,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  circleBg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4FB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  phoneIconContainer: {
    width: 48,
    height: 62,
    borderRadius: 10,
    backgroundColor: '#4E44C6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    borderRadius: 8,
  },
  dotPink: {
    width: 14,
    height: 14,
    backgroundColor: '#F34A75',
    top: 12,
    right: 4,
  },
  dotYellow: {
    width: 12,
    height: 12,
    backgroundColor: '#FFB800',
    bottom: 16,
    left: 4,
  },
  dotCyan: {
    width: 8,
    height: 8,
    backgroundColor: '#00D1B2',
    left: -4,
    top: 45,
  },
  dotPurple: {
    width: 8,
    height: 8,
    backgroundColor: '#3629B7',
    top: -2,
    left: 38,
  },
  inputContainer: {
    width: 327,
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E4E8',
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#1E232C',
  },
  checkboxRow: {
    width: 327,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#C4C4C4',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#3629B7',
    borderColor: '#3629B7',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 12,
    color: '#7D848F',
    lineHeight: 18,
  },
  linkText: {
    color: '#3629B7',
    fontWeight: '600',
  },
  signUpButton: {
    width: 327,
    height: 48,
    backgroundColor: '#3629B7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  signUpButtonDisabled: {
    backgroundColor: '#F0F1F5',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  signUpButtonTextDisabled: {
    color: '#A0A4AE',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
  },
  bottomText: {
    fontSize: 13,
    color: '#7D848F',
  },
  signInLinkText: {
    fontSize: 13,
    color: '#3629B7',
    fontWeight: '700',
  },
});