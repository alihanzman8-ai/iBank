import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransferConfirmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    name?: string;
    card?: string;
    amount?: string;
    comment?: string;
  }>();

  const [otpCode, setOtpCode] = useState('6789');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const fromAccount = '**** **** 6789';
  const recipientName = params.name || 'Amanda';
  const cardNumber = params.card || '0123456789';
  const transactionFee = '0 ₸';
  const content = params.comment || 'From Jimy';
  const amount = params.amount ? `${params.amount} ₸` : '$1000';

  const handleFinish = () => {
    setSuccessModalVisible(false);
    router.replace('/home' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Шапка: < Confirm */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={26} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Подзаголовок как в Figma */}
        <Text style={styles.subTitle}>Confirm transaction information</Text>

        {/* 1. From */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>From</Text>
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>{fromAccount}</Text>
          </View>
        </View>

        {/* 2. To */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>To</Text>
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>{recipientName}</Text>
          </View>
        </View>

        {/* 3. Card number */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Card number</Text>
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>{cardNumber}</Text>
          </View>
        </View>

        {/* 4. Transaction fee */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Transaction fee</Text>
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>{transactionFee}</Text>
          </View>
        </View>

        {/* 5. Content */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Content</Text>
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>{content}</Text>
          </View>
        </View>

        {/* 6. Amount */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Amount</Text>
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>{amount}</Text>
          </View>
        </View>

        {/* 7. Get OTP to verify transaction */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Get OTP to verify transaction</Text>
          <View style={styles.otpRow}>
            <TextInput
              style={styles.otpInput}
              value={otpCode}
              onChangeText={setOtpCode}
              keyboardType="numeric"
              placeholder="OTP"
              placeholderTextColor="#B0B5C1"
            />
            <TouchableOpacity style={styles.getOtpBtn} activeOpacity={0.85}>
              <Text style={styles.getOtpText}>Get OTP</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Кнопка Confirm внизу */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setSuccessModalVisible(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Окно успешной отправки */}
      <Modal visible={successModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <Ionicons name="checkmark-circle" size={56} color="#00BFA5" style={{ marginBottom: 12 }} />
            <Text style={styles.successTitle}>Сәтті орындалды!</Text>
            <Text style={styles.successDesc}>
              {amount} сомасы {recipientName} шотына сәтті жіберілді.
            </Text>
            <TouchableOpacity
              style={styles.doneBtn}
              onPress={handleFinish}
              activeOpacity={0.85}
            >
              <Text style={styles.doneBtnText}>Жабу</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F7',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  headerRightPlaceholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  subTitle: {
    fontSize: 13,
    color: '#898989',
    marginBottom: 16,
    fontWeight: '400',
  },
  fieldGroup: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#898989',
    marginBottom: 6,
    fontWeight: '500',
  },
  readOnlyBox: {
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECEFF5',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  readOnlyText: {
    fontSize: 14,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  otpInput: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECEFF5',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#1C1C1E',
    fontWeight: '600',
  },
  getOtpBtn: {
    width: 100,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#3629B7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getOtpText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  confirmButton: {
    height: 50,
    borderRadius: 16,
    backgroundColor: '#3629B7',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  successDesc: {
    fontSize: 13,
    color: '#7D848F',
    textAlign: 'center',
    marginBottom: 20,
  },
  doneBtn: {
    width: '100%',
    height: 46,
    borderRadius: 14,
    backgroundColor: '#3629B7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});