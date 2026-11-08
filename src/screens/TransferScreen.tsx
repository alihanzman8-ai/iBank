import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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

interface Beneficiary {
  id: string;
  name: string;
  initial: string;
  card: string;
  bg: string;
}

const BENEFICIARIES: Beneficiary[] = [
  { id: '1', name: 'Аружан', initial: 'А', card: '4405 1289 9012 3341', bg: '#FF4267' },
  { id: '2', name: 'Данияр', initial: 'Д', card: '5168 7701 4452 8920', bg: '#3629B7' },
  { id: '3', name: 'Алихан', initial: 'Ә', card: '4003 9912 6541 1102', bg: '#00BFA5' },
];

export default function TransferScreen() {
  const router = useRouter();

  // Выбранный тип перевода (по номеру карты / клиент банка / басқа банкке)
  const [transferType, setTransferType] = useState<'card' | 'client' | 'other'>('card');
  
  // Данные формы
  const [recipientName, setRecipientName] = useState('Аружан Сейітқали');
  const [cardNumber, setCardNumber] = useState('4405 1289 9012 3341');
  const [amount, setAmount] = useState('15000');
  const [comment, setComment] = useState('Қарызды қайтару');
  const [saveBeneficiary, setSaveBeneficiary] = useState(true);

  // Выбор сохраненного получателя
  const handleSelectBeneficiary = (b: Beneficiary) => {
    setRecipientName(b.name);
    setCardNumber(b.card);
  };

  const handleConfirm = () => {
    router.push({
      pathname: '/transfer-confirm' as any,
      params: {
        name: recipientName,
        card: cardNumber,
        amount: amount,
        comment: comment,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Верхний заголовок */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={26} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Аударым (Transfer)</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Выбор счета списания */}
        <View style={styles.sourceCardPicker}>
          <View style={styles.sourceCardLeft}>
            <Text style={styles.sourceCardLabel}>Шоттан (Счет списания)</Text>
            <Text style={styles.sourceCardNumber}>Kaspi Gold •••• 7018</Text>
            <Text style={styles.availableBalance}>Қолжетімді: 845 600 ₸</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#3629B7" />
        </View>

        {/* Выбор типа перевода (Choose transaction) */}
        <Text style={styles.sectionLabel}>Аударым түрі</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeRow}
        >
          {/* Картаға */}
          <TouchableOpacity
            style={[styles.typeCard, transferType === 'card' && styles.typeCardActive]}
            onPress={() => setTransferType('card')}
            activeOpacity={0.8}
          >
            <View style={[styles.typeIconBox, transferType === 'card' && styles.typeIconBoxActive]}>
              <MaterialCommunityIcons
                name="credit-card-outline"
                size={24}
                color={transferType === 'card' ? '#FFFFFF' : '#3629B7'}
              />
            </View>
            <Text style={[styles.typeText, transferType === 'card' && styles.typeTextActive]}>
              Карта нөмірі{'\n'}бойынша
            </Text>
          </TouchableOpacity>

          {/* Клиентке */}
          <TouchableOpacity
            style={[styles.typeCard, transferType === 'client' && styles.typeCardActive]}
            onPress={() => setTransferType('client')}
            activeOpacity={0.8}
          >
            <View style={[styles.typeIconBox, transferType === 'client' && styles.typeIconBoxActive]}>
              <Ionicons
                name="person-outline"
                size={22}
                color={transferType === 'client' ? '#FFFFFF' : '#3629B7'}
              />
            </View>
            <Text style={[styles.typeText, transferType === 'client' && styles.typeTextActive]}>
              Банк клиентіне{'\n'}(телефон арқылы)
            </Text>
          </TouchableOpacity>

          {/* Басқа банкке */}
          <TouchableOpacity
            style={[styles.typeCard, transferType === 'other' && styles.typeCardActive]}
            onPress={() => setTransferType('other')}
            activeOpacity={0.8}
          >
            <View style={[styles.typeIconBox, transferType === 'other' && styles.typeIconBoxActive]}>
              <MaterialCommunityIcons
                name="bank-outline"
                size={22}
                color={transferType === 'other' ? '#FFFFFF' : '#3629B7'}
              />
            </View>
            <Text style={[styles.typeText, transferType === 'other' && styles.typeTextActive]}>
              Басқа банкке{'\n'}(IBAN / шот)
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Выбор получателя (Choose beneficiary) */}
        <View style={styles.beneficiaryHeader}>
          <Text style={styles.sectionLabel}>Алушылар (Таңдаулылар)</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.findBeneficiaryText}>Барлығы</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.beneficiaryRow}
        >
          {/* Кнопка добавления нового */}
          <TouchableOpacity style={styles.addBeneficiaryBtn} activeOpacity={0.7}>
            <Ionicons name="add" size={26} color="#3629B7" />
          </TouchableOpacity>

          {BENEFICIARIES.map((b) => (
            <TouchableOpacity
              key={b.id}
              style={styles.beneficiaryItem}
              onPress={() => handleSelectBeneficiary(b)}
              activeOpacity={0.8}
            >
              <View style={[styles.beneficiaryAvatar, { backgroundColor: b.bg }]}>
                <Text style={styles.beneficiaryInitial}>{b.initial}</Text>
              </View>
              <Text style={styles.beneficiaryName} numberOfLines={1}>
                {b.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Форма ввода реквизитов */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Алушының аты-жөні</Text>
            <TextInput
              style={styles.textInput}
              value={recipientName}
              onChangeText={setRecipientName}
              placeholder="Толық аты-жөнін жазыңыз"
              placeholderTextColor="#B0B5C1"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Карта немесе шот нөмірі</Text>
            <TextInput
              style={styles.textInput}
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="#B0B5C1"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Аударым сомасы (₸)</Text>
            <TextInput
              style={[styles.textInput, styles.amountInputText]}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0 ₸"
              placeholderTextColor="#B0B5C1"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Түсініктеме (Сообщение)</Text>
            <TextInput
              style={styles.textInput}
              value={comment}
              onChangeText={setComment}
              placeholder="Мысалы: Түскі ас үшін"
              placeholderTextColor="#B0B5C1"
            />
          </View>

          {/* Чекбокс сохранения в избранное */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setSaveBeneficiary(!saveBeneficiary)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, saveBeneficiary && styles.checkboxActive]}>
              {saveBeneficiary && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxLabel}>Алушыны таңдаулыларға сақтау</Text>
          </TouchableOpacity>

          {/* Кнопка подтверждения перехода */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmButtonText}>Жалғастыру (Confirm)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
  },
  sourceCardPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ECEFF5',
    backgroundColor: '#F8F9FD',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  sourceCardLeft: {
    flex: 1,
  },
  sourceCardLabel: {
    fontSize: 11,
    color: '#898989',
    fontWeight: '500',
  },
  sourceCardNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E256F',
    marginTop: 2,
  },
  availableBalance: {
    fontSize: 12,
    color: '#00BFA5',
    fontWeight: '600',
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 10,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  typeCard: {
    width: 120,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECEFF5',
    padding: 10,
    justifyContent: 'space-between',
  },
  typeCardActive: {
    backgroundColor: '#3629B7',
    borderColor: '#3629B7',
  },
  typeIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EEEDFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeIconBoxActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#7D848F',
    lineHeight: 14,
  },
  typeTextActive: {
    color: '#FFFFFF',
  },
  beneficiaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  findBeneficiaryText: {
    fontSize: 12,
    color: '#3629B7',
    fontWeight: '600',
  },
  beneficiaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  addBeneficiaryBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EEEDFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  beneficiaryItem: {
    alignItems: 'center',
    width: 60,
  },
  beneficiaryAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  beneficiaryInitial: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  beneficiaryName: {
    fontSize: 11,
    color: '#1C1C1E',
    fontWeight: '500',
    textAlign: 'center',
  },
  formContainer: {
    gap: 12,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7D848F',
  },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ECEFF5',
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#1C1C1E',
    backgroundColor: '#FFFFFF',
  },
  amountInputText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#3629B7',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#B0B5C1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#3629B7',
    borderColor: '#3629B7',
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#1C1C1E',
  },
  confirmButton: {
    backgroundColor: '#3629B7',
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});