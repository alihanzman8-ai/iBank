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

interface RateRow {
  id: string;
  category: string;
  term: string;
  rate: string;
}

const RATES_DATA: RateRow[] = [
  { id: '1', category: 'Жеке тұлғалар', term: '1 ай', rate: '14.00%' },
  { id: '2', category: 'Корпоративтік', term: '2 ай', rate: '14.50%' },
  { id: '3', category: 'Жеке тұлғалар', term: '3 ай', rate: '15.00%' },
  { id: '4', category: 'Корпоративтік', term: '6 ай', rate: '15.30%' },
  { id: '5', category: 'Жеке тұлғалар', term: '6 ай', rate: '15.50%' },
  { id: '6', category: 'Корпоративтік', term: '8 ай', rate: '15.80%' },
  { id: '7', category: 'Жеке тұлғалар', term: '9 ай', rate: '16.00%' },
  { id: '8', category: 'Корпоративтік', term: '12 ай', rate: '16.20%' },
  { id: '9', category: 'Жеке тұлғалар', term: '12 ай', rate: '16.50%' },
  { id: '10', category: 'Корпоративтік', term: '24 ай', rate: '16.80%' },
  { id: '11', category: 'Жеке тұлғалар', term: '24 ай', rate: '17.00%' },
];

export default function InterestRateScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'individual' | 'corporate'>('all');

  const filteredRates = RATES_DATA.filter((item) => {
    if (selectedFilter === 'individual') return item.category === 'Жеке тұлғалар';
    if (selectedFilter === 'corporate') return item.category === 'Корпоративтік';
    return true;
  });

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
        <Text style={styles.headerTitle}>Пайыздық мөлшерлеме</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Быстрые фильтры */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, selectedFilter === 'all' && styles.filterChipActive]}
          onPress={() => setSelectedFilter('all')}
        >
          <Text style={[styles.filterChipText, selectedFilter === 'all' && styles.filterChipTextActive]}>
            Барлығы
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, selectedFilter === 'individual' && styles.filterChipActive]}
          onPress={() => setSelectedFilter('individual')}
        >
          <Text style={[styles.filterChipText, selectedFilter === 'individual' && styles.filterChipTextActive]}>
            Жеке тұлғалар
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, selectedFilter === 'corporate' && styles.filterChipActive]}
          onPress={() => setSelectedFilter('corporate')}
        >
          <Text style={[styles.filterChipText, selectedFilter === 'corporate' && styles.filterChipTextActive]}>
            Бизнес
          </Text>
        </TouchableOpacity>
      </View>

      {/* Заголовки колонок таблицы (Figma: Interest kind | Deposit | Rate) */}
      <View style={styles.tableHeader}>
        <Text style={[styles.colHeader, styles.colKind]}>Түрі (Клиент)</Text>
        <Text style={[styles.colHeader, styles.colDeposit]}>Мерзімі</Text>
        <Text style={[styles.colHeader, styles.colRate]}>Мөлшерлеме</Text>
      </View>

      {/* Список строк таблицы */}
      <ScrollView
        style={styles.tableBody}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tableBodyContent}
      >
        {filteredRates.map((row, index) => {
          const isEven = index % 2 === 0;
          return (
            <View
              key={row.id}
              style={[styles.tableRow, isEven ? styles.rowEven : styles.rowOdd]}
            >
              <Text style={[styles.cellText, styles.colKind, styles.kindText]}>
                {row.category}
              </Text>
              <Text style={[styles.cellText, styles.colDeposit, styles.termText]}>
                {row.term}
              </Text>
              <Text style={[styles.cellText, styles.colRate, styles.rateText]}>
                {row.rate}
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
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F4F5F8',
  },
  filterChipActive: {
    backgroundColor: '#3629B7',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7D848F',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F7F8FC',
    paddingHorizontal: 20,
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
  colKind: {
    flex: 2,
    textAlign: 'left',
  },
  colDeposit: {
    flex: 1,
    textAlign: 'center',
  },
  colRate: {
    flex: 1.2,
    textAlign: 'right',
  },
  tableBody: {
    flex: 1,
  },
  tableBodyContent: {
    paddingBottom: 24,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F6FA',
  },
  rowEven: {
    backgroundColor: '#FFFFFF',
  },
  rowOdd: {
    backgroundColor: '#FAFBFD',
  },
  cellText: {
    fontSize: 14,
  },
  kindText: {
    color: '#1E256F',
    fontWeight: '600',
  },
  termText: {
    color: '#7D848F',
    fontWeight: '500',
  },
  rateText: {
    color: '#00BFA5',
    fontWeight: '700',
  },
});