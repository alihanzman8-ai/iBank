import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CurrencyItem {
  id: string;
  country: string;
  code: string;
  flag: string;
  cashBuy: string;
  cashSell: string;
  onlineBuy: string;
  onlineSell: string;
}

const EXCHANGE_RATES: CurrencyItem[] = [
  { id: '1', country: 'АҚШ доллары', code: 'USD', flag: '🇺🇸', cashBuy: '495.20', cashSell: '499.50', onlineBuy: '496.00', onlineSell: '498.80' },
  { id: '2', country: 'Еуро', code: 'EUR', flag: '🇪🇺', cashBuy: '535.10', cashSell: '541.00', onlineBuy: '536.50', onlineSell: '539.90' },
  { id: '3', country: 'Ресей рублі', code: 'RUB', flag: '🇷🇺', cashBuy: '5.10', cashSell: '5.28', onlineBuy: '5.15', onlineSell: '5.25' },
  { id: '4', country: 'Қытай юані', code: 'CNY', flag: '🇨🇳', cashBuy: '68.40', cashSell: '70.10', onlineBuy: '68.90', onlineSell: '69.70' },
  { id: '5', country: 'Фунт стерлинг', code: 'GBP', flag: '🇬🇧', cashBuy: '628.00', cashSell: '636.50', onlineBuy: '629.50', onlineSell: '634.00' },
  { id: '6', country: 'БАӘ дирхамы', code: 'AED', flag: '🇦🇪', cashBuy: '134.80', cashSell: '136.20', onlineBuy: '135.00', onlineSell: '135.90' },
  { id: '7', country: 'Түрік лирасы', code: 'TRY', flag: '🇹🇷', cashBuy: '14.10', cashSell: '14.90', onlineBuy: '14.25', onlineSell: '14.70' },
  { id: '8', country: 'Корей воны (x100)', code: 'KRW', flag: '🇰🇷', cashBuy: '35.80', cashSell: '37.20', onlineBuy: '36.10', onlineSell: '36.90' },
  { id: '9', country: 'Швейцария франкі', code: 'CHF', flag: '🇨🇭', cashBuy: '562.00', cashSell: '570.40', onlineBuy: '564.00', onlineSell: '568.50' },
  { id: '10', country: 'Жапон иенасы (x100)', code: 'JPY', flag: '🇯🇵', cashBuy: '320.10', cashSell: '326.50', onlineBuy: '322.00', onlineSell: '324.80' },
];

export default function ExchangeRateScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'cash' | 'cashless'>('cash');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Шапка */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={26} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Валюта бағамы</Text>
        <TouchableOpacity 
  style={styles.backButton} 
  onPress={() => router.push('/language' as any)}
  activeOpacity={0.7}
>
  <Ionicons name="settings-outline" size={22} color="#1C1C1E" />
</TouchableOpacity>
      </View>

      {/* Интерактивный переключатель табов */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.switchTab, activeTab === 'cash' && styles.switchTabActive]}
          onPress={() => setActiveTab('cash')}
          activeOpacity={0.8}
        >
          <Text style={[styles.switchTabText, activeTab === 'cash' && styles.switchTabTextActive]}>
            Бөлімшелерде
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchTab, activeTab === 'cashless' && styles.switchTabActive]}
          onPress={() => setActiveTab('cashless')}
          activeOpacity={0.8}
        >
          <Text style={[styles.switchTabText, activeTab === 'cashless' && styles.switchTabTextActive]}>
            Қолма-қолсыз
          </Text>
        </TouchableOpacity>
      </View>

      {/* Заголовки таблицы */}
      <View style={styles.tableHeader}>
        <Text style={[styles.colHeader, styles.colCountry]}>Ел / Валюта</Text>
        <Text style={[styles.colHeader, styles.colRate]}>Сатып алу</Text>
        <Text style={[styles.colHeader, styles.colRate]}>Сату</Text>
      </View>

      {/* Список валют с динамическими курсами */}
      <ScrollView
        style={styles.bodyList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bodyListContent}
      >
        {EXCHANGE_RATES.map((item, index) => {
          const isEven = index % 2 === 0;
          const buyRate = activeTab === 'cash' ? item.cashBuy : item.onlineBuy;
          const sellRate = activeTab === 'cash' ? item.cashSell : item.onlineSell;

          return (
            <View
              key={item.id}
              style={[styles.tableRow, isEven ? styles.rowEven : styles.rowOdd]}
            >
              <View style={styles.colCountryWrap}>
                <Text style={styles.flagText}>{item.flag}</Text>
                <View style={styles.currencyNameWrap}>
                  <Text style={styles.currencyCountry}>{item.country}</Text>
                  <Text style={styles.currencyCode}>{item.code}</Text>
                </View>
              </View>

              <Text style={[styles.rateValue, styles.colRate]}>
                {buyRate} ₸
              </Text>

              <Text style={[styles.rateValue, styles.colRate, styles.sellRateColor]}>
                {sellRate} ₸
              </Text>
            </View>
          );
        })}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F6FA',
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 4,
  },
  switchTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  switchTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  switchTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#898989',
  },
  switchTabTextActive: {
    color: '#3629B7',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F7F8FC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ECEFF5',
  },
  colHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#898989',
  },
  colCountry: {
    flex: 2,
    textAlign: 'left',
  },
  colRate: {
    flex: 1,
    textAlign: 'right',
  },
  bodyList: {
    flex: 1,
  },
  bodyListContent: {
    paddingBottom: 24,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F6FA',
  },
  rowEven: {
    backgroundColor: '#FFFFFF',
  },
  rowOdd: {
    backgroundColor: '#FAFBFD',
  },
  colCountryWrap: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagText: {
    fontSize: 24,
    marginRight: 10,
  },
  currencyNameWrap: {
    flex: 1,
  },
  currencyCountry: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  currencyCode: {
    fontSize: 11,
    color: '#898989',
    marginTop: 2,
  },
  rateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E256F',
  },
  sellRateColor: {
    color: '#00BFA5',
  },
});