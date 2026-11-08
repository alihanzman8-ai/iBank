import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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

interface Currency {
  code: string;
  name: string;
  symbol: string;
  rateToKzt: number; // курс к тенге
}

const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rateToKzt: 498.5 },
  { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', rateToKzt: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', rateToKzt: 538.2 },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', rateToKzt: 5.2 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rateToKzt: 69.1 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rateToKzt: 632.0 },
  { code: 'KRW', name: 'Korean Won', symbol: '₩', rateToKzt: 0.36 },
];

export default function ExchangeScreen() {
  const router = useRouter();

  const [fromCurrency, setFromCurrency] = useState<Currency>(CURRENCIES[0]); // USD
  const [toCurrency, setToCurrency] = useState<Currency>(CURRENCIES[1]); // KZT
  const [amount, setAmount] = useState('100');

  // Модальное окно выбора валюты
  const [modalVisible, setModalVisible] = useState(false);
  const [selectingField, setSelectingField] = useState<'from' | 'to'>('from');

  // Расчет результата
  const numAmount = parseFloat(amount) || 0;
  const calculatedAmount = ((numAmount * fromCurrency.rateToKzt) / toCurrency.rateToKzt).toFixed(2);
  const currentPairRate = (fromCurrency.rateToKzt / toCurrency.rateToKzt).toFixed(4);

  // Смена валют местами
  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const openSelectModal = (field: 'from' | 'to') => {
    setSelectingField(field);
    setModalVisible(true);
  };

  const handleSelectCurrency = (curr: Currency) => {
    if (selectingField === 'from') {
      setFromCurrency(curr);
    } else {
      setToCurrency(curr);
    }
    setModalVisible(false);
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
        <Text style={styles.headerTitle}>Exchange (Айырбастау)</Text>
        
        {/* Кнопка настроек / языка в углу */}
        <TouchableOpacity
          style={styles.langHeaderBtn}
          onPress={() => router.push('/language' as any)}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={22} color="#1C1C1E" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Иллюстрация как в Figma: обмен монет через телефон */}
        <View style={styles.illustrationWrap}>
          <View style={styles.phoneIllustration}>
            <View style={styles.phoneInner}>
              <MaterialCommunityIcons name="swap-horizontal-bold" size={36} color="#3629B7" />
            </View>
            <View style={styles.coinLeft}>
              <Text style={styles.coinText}>₸</Text>
            </View>
            <View style={styles.coinRight}>
              <Text style={styles.coinText}>$</Text>
            </View>
          </View>
        </View>

        {/* Карточка ввода FROM */}
        <View style={styles.inputCard}>
          <Text style={styles.inputCardLabel}>From (Сіз сатасыз)</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.amountInput}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              placeholderTextColor="#B0B5C1"
            />
            <TouchableOpacity
              style={styles.currencySelector}
              onPress={() => openSelectModal('from')}
              activeOpacity={0.7}
            >
              <Text style={styles.currencySelectorText}>{fromCurrency.code}</Text>
              <Ionicons name="chevron-down" size={16} color="#1C1C1E" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Кнопка смены местами стрелками ↓↑ */}
        <View style={styles.swapWrap}>
          <TouchableOpacity 
            style={styles.swapButton} 
            onPress={handleSwap}
            activeOpacity={0.8}
          >
            <Ionicons name="swap-vertical" size={22} color="#3629B7" />
          </TouchableOpacity>
        </View>

        {/* Карточка вывода TO */}
        <View style={styles.inputCard}>
          <Text style={styles.inputCardLabel}>To (Сіз аласыз)</Text>
          <View style={styles.inputRow}>
            <Text style={styles.amountOutput} numberOfLines={1}>
              {calculatedAmount}
            </Text>
            <TouchableOpacity
              style={styles.currencySelector}
              onPress={() => openSelectModal('to')}
              activeOpacity={0.7}
            >
              <Text style={styles.currencySelectorText}>{toCurrency.code}</Text>
              <Ionicons name="chevron-down" size={16} color="#1C1C1E" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Строка текущего курса валютной пары */}
        <View style={styles.rateRow}>
          <Text style={styles.rateLabel}>Currency rate:</Text>
          <Text style={styles.rateValue}>
            1 {fromCurrency.code} = {currentPairRate} {toCurrency.code}
          </Text>
        </View>

        {/* Главная кнопка Exchange */}
        <TouchableOpacity
          style={styles.exchangeButton}
          onPress={() => router.back()}
          activeOpacity={0.85}
        >
          <Text style={styles.exchangeButtonText}>Exchange</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Модальное окно Select currency из 3-го макета Figma */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalContent} 
            activeOpacity={1}
          >
            {/* Хедер модалки с крестиком */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select the currency</Text>
              <TouchableOpacity 
                style={styles.closeBtn} 
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={22} color="#1C1C1E" />
              </TouchableOpacity>
            </View>

            {/* Список валют */}
            <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
              {CURRENCIES.map((curr) => {
                const currentFieldVal = selectingField === 'from' ? fromCurrency : toCurrency;
                const isSelected = curr.code === currentFieldVal.code;

                return (
                  <TouchableOpacity
                    key={curr.code}
                    style={styles.modalItem}
                    onPress={() => handleSelectCurrency(curr)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.modalItemLeft}>
                      <Text style={styles.modalItemCode}>{curr.code}</Text>
                      <Text style={styles.modalItemName}>({curr.name})</Text>
                    </View>
                    {isSelected && (
                      <Ionicons name="checkmark" size={20} color="#3629B7" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
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
  langHeaderBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  illustrationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
  },
  phoneIllustration: {
    width: 110,
    height: 140,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#3629B7',
    backgroundColor: '#F5F6FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  phoneInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinLeft: {
    position: 'absolute',
    left: -20,
    top: 40,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFB800',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  coinRight: {
    position: 'absolute',
    right: -20,
    top: 50,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FF4267',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  coinText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputCardLabel: {
    fontSize: 12,
    color: '#898989',
    marginBottom: 6,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountInput: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    paddingVertical: 4,
  },
  amountOutput: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  currencySelectorText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  swapWrap: {
    alignItems: 'center',
    marginVertical: 10,
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ECEBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 4,
  },
  rateLabel: {
    fontSize: 13,
    color: '#898989',
  },
  rateValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  exchangeButton: {
    backgroundColor: '#3629B7',
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  exchangeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    maxHeight: '65%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  closeBtn: {
    padding: 4,
  },
  modalList: {
    maxHeight: 280,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F6FA',
  },
  modalItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalItemCode: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  modalItemName: {
    fontSize: 13,
    color: '#898989',
  },
});