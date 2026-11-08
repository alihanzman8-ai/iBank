import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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

const SEARCH_ITEMS = [
 {
  id: '1',
  title: 'Бөлімшелер',
  subtitle: 'Жақын маңдағы бөлімшені іздеу',
  iconName: 'bank',
  iconFamily: 'MaterialCommunityIcons', // ✅ правильное семейство
  iconColor: '#3629B7',
  badgeBg: '#EEEDFF',
},
  {
    id: '2',
    title: 'Пайыздық мөлшерлеме',
    subtitle: 'Депозит пен несие мөлшерлемелері',
    iconName: 'percent',
    iconFamily: 'FontAwesome5',
    iconColor: '#FFB800',
    badgeBg: '#FFF8E6',
  },
  {
    id: '3',
    title: 'Валюта бағамы',
    subtitle: 'Ағымдағы валюта бағамдарын көру',
    iconName: 'currency-usd',
    iconFamily: 'MaterialCommunityIcons',
    iconColor: '#00BFA5',
    badgeBg: '#E0F7F4',
  },
  {
    id: '4',
    title: 'Айырбастау',
    subtitle: 'Ақшаны онлайн айырбастау',
    iconName: 'chart-line',
    iconFamily: 'FontAwesome5',
    iconColor: '#FF4267',
    badgeBg: '#FFEBF0',
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'mail' | 'settings'>('search');

  const renderCardIcon = (item: typeof SEARCH_ITEMS[0]) => {
    if (item.iconFamily === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={item.iconName as any} size={32} color={item.iconColor} />;
    }
    return <FontAwesome5 name={item.iconName as any} size={30} color={item.iconColor} />;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Верхний заголовок с кнопкой назад */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={26} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Іздеу</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Список карточек */}
     <ScrollView
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
>
  {SEARCH_ITEMS.map((item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {
        if (item.id === '1') router.push('/branch' as any);
        if (item.id === '2') router.push('/interest-rate' as any);
        if (item.id === '3') router.push('/exchange-rate' as any);
        if (item.id === '4') router.push('/exchange' as any);
      }}
    >
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>

            {/* Графический бейдж с иконкой */}
            <View style={[styles.cardIllustrationWrap, { backgroundColor: item.badgeBg }]}>
              {renderCardIcon(item)}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Нижняя навигация (Bottom Tab Bar) */}
      <View style={styles.bottomTabBar}>
        {/* Кнопка Басты бет (Home) */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.replace('/home' as any)}
        >
          <Ionicons name="home-outline" size={22} color="#898989" />
        </TouchableOpacity>

        {/* Активная кнопка Іздеу (Search) */}
        <TouchableOpacity
          style={[styles.tabButton, styles.activeTabPill]}
          onPress={() => setActiveTab('search')}
        >
          <Ionicons name="search" size={18} color="#FFFFFF" />
          <Text style={styles.activeTabText}>Іздеу</Text>
        </TouchableOpacity>

        {/* Хабарламалар (Сообщения) */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('mail')}
        >
          <Ionicons name="mail-outline" size={22} color="#898989" />
        </TouchableOpacity>

        {/* Баптаулар (Настройки) */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('settings')}
        >
          <Ionicons name="settings-outline" size={22} color="#898989" />
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
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  headerRightPlaceholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 90,
  },
  card: {
    width: '100%',
    minHeight: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECEFF5',
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    shadowColor: '#1E256F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTextContainer: {
    flex: 1,
    paddingRight: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E256F',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#898989',
    fontWeight: '400',
    lineHeight: 18,
  },
  cardIllustrationWrap: {
    width: 68,
    height: 68,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F1F5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  tabButton: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  activeTabPill: {
    flexDirection: 'row',
    backgroundColor: '#3629B7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
});