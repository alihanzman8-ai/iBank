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

export default function ForgotPasswordScreen() {
  const router = useRouter();

  // Начальное значение для Казахстана (+77)
  const [phone, setPhone] = useState('+77');

  // Защита префикса +77 от удаления
  const handlePhoneChange = (text: string) => {
    if (!text.startsWith('+77')) {
      setPhone('+77');
    } else {
      setPhone(text);
    }
  };

  // Проверка: кнопка станет активной (состояние #2), когда набрано 12 символов (+77XXXXXXXXX)
  const isFilled = phone.length >= 12;

  const handleSend = () => {
    if (isFilled) {
      // Переход на следующий экран подтверждения кода
      router.push('/verify-code' as any);
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
          {/* Верхняя шапка с кнопкой назад */}
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
            <Text style={styles.inputLabel}>Type your phone number</Text>

            {/* Поле ввода номера */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="(+77) 700 000 0000"
                placeholderTextColor="#A0A4AE"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={handlePhoneChange}
                maxLength={12}
                autoFocus={true} // Автоматически открывает цифровую клавиатуру
              />
            </View>

            {/* Подсказка под полем */}
            <Text style={styles.helperText}>
              We texted you a code to verify your phone number
            </Text>

            {/* Кнопка Send (переключается между состоянием #1 и #2) */}
            <TouchableOpacity
              style={[
                styles.sendButton,
                !isFilled && styles.sendButtonDisabled,
              ]}
              disabled={!isFilled}
              onPress={handleSend}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.sendButtonText,
                  !isFilled && styles.sendButtonTextDisabled,
                ]}
              >
                Send
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
    backgroundColor: '#F8F9FD', // Светло-серый фон экрана из макета
  },
  flexContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
    backgroundColor: '#FFFFFF', // Чисто белая карточка
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    // Мягкая тень карточки
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 13,
    color: '#7D848F',
    marginBottom: 10,
  },
  inputWrapper: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E4E8',
    borderRadius: 14,
    paddingHorizontal: 14,
    justifyContent: 'center',
    marginBottom: 14,
  },
  input: {
    fontSize: 15,
    color: '#1E232C',
    fontWeight: '500',
  },
  helperText: {
    fontSize: 13,
    color: '#7D848F',
    lineHeight: 18,
    marginBottom: 22,
  },
  sendButton: {
    height: 48,
    backgroundColor: '#3629B7', // Фирменный цвет для активного состояния #2
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#F0F1F5', // Бледный цвет для неактивного состояния #1
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  sendButtonTextDisabled: {
    color: '#A0A4AE',
  },
});