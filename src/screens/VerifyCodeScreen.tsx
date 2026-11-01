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

export default function VerifyCodeScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');

  // Кнопка становится синей и активной ровно при 4 введенных цифрах
  const isCodeComplete = code.length === 4;

  const handleResend = () => {
    console.log('Запрос повторной отправки SMS');
  };

  const handleNext = () => {
    if (isCodeComplete) {
      router.push('/change-password' as any);
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
          {/* Верхняя панель со стрелкой назад */}
          <View style={styles.topHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="chevron-back" size={24} color="#1E232C" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Forgot password</Text>
          </View>

          {/* Белая карточка формы */}
          <View style={styles.card}>
            <Text style={styles.inputLabel}>Type a code</Text>

            {/* Строка с вводом кода и кнопкой Resend */}
            <View style={styles.codeRow}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Code"
                  placeholderTextColor="#A0A4AE"
                  keyboardType="number-pad"
                  maxLength={4}
                  value={code}
                  onChangeText={setCode}
                  autoFocus={true}
                />
              </View>

              <TouchableOpacity
                style={styles.resendButton}
                onPress={handleResend}
                activeOpacity={0.8}
              >
                <Text style={styles.resendButtonText}>Resend</Text>
              </TouchableOpacity>
            </View>

            {/* Информация о номере и времени действия */}
            <Text style={styles.helperText}>
              We texted you a code to verify your phone number{' '}
              <Text style={styles.phoneHighlight}>(+77) 701 123 4xxx</Text>
            </Text>

            <Text style={styles.subHelperText}>
              This code will expire 10 minutes after this message. If you don't get a message.
            </Text>

            {/* Кнопка смены пароля (Change password) */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                !isCodeComplete && styles.actionButtonDisabled,
              ]}
              disabled={!isCodeComplete}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  !isCodeComplete && styles.actionButtonTextDisabled,
                ]}
              >
                Change password
              </Text>
            </TouchableOpacity>
          </View>

          {/* Ссылка возврата для смены номера телефона */}
          <TouchableOpacity
            style={styles.changePhoneWrapper}
            onPress={() => router.back()}
          >
            <Text style={styles.changePhoneText}>Change your phone number</Text>
          </TouchableOpacity>

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
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 13,
    color: '#7D848F',
    marginBottom: 10,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  inputWrapper: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E4E8',
    borderRadius: 14,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginRight: 10,
  },
  input: {
    fontSize: 16,
    color: '#1E232C',
    fontWeight: '600',
    letterSpacing: 2,
  },
  resendButton: {
    height: 48,
    paddingHorizontal: 24,
    backgroundColor: '#27209E',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  helperText: {
    fontSize: 13,
    color: '#7D848F',
    lineHeight: 18,
    marginBottom: 8,
  },
  phoneHighlight: {
    color: '#27209E',
    fontWeight: '600',
  },
  subHelperText: {
    fontSize: 12,
    color: '#9EA3AE',
    lineHeight: 18,
    marginBottom: 22,
  },
  actionButton: {
    height: 48,
    backgroundColor: '#3629B7',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
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
  changePhoneWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  changePhoneText: {
    fontSize: 13,
    color: '#27209E',
    fontWeight: '600',
  },
});