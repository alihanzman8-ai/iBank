import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = [
  {
    id: '1',
    title: 'Шоттар мен\nкарталар',
    icon: 'wallet-outline',
    iconFamily: 'Ionicons',
    color: '#3629B7',
    bg: '#ECEBFF',
  },
  {
    id: '2',
    title: 'Аударымдар\n(Переводы)',
    icon: 'swap-horizontal',
    iconFamily: 'Ionicons',
    color: '#FF4267',
    bg: '#FFEBF0',
  },
  {
    id: '3',
    title: 'Қолма-қол\nақша алу',
    icon: 'cash-outline',
    iconFamily: 'Ionicons',
    color: '#00BFA5',
    bg: '#E0F7F4',
  },
  {
    id: '4',
    title: 'Мобильді\nбайланыс',
    icon: 'cellphone-charging',
    iconFamily: 'MaterialCommunityIcons',
    color: '#FFB800',
    bg: '#FFF8E6',
  },
  {
    id: '5',
    title: 'Төлемдер\n(Платежи)',
    icon: 'receipt-outline',
    iconFamily: 'Ionicons',
    color: '#00D1B2',
    bg: '#E6FAF7',
  },
  {
    id: '6',
    title: 'Депозит\n(iBank Депозит)',
    icon: 'safe',
    iconFamily: 'MaterialCommunityIcons',
    color: '#5655B9',
    bg: '#EEEDFF',
  },
  {
    id: '7',
    title: 'Кредит\nкартасы',
    icon: 'credit-card-outline',
    iconFamily: 'MaterialCommunityIcons',
    color: '#FF9800',
    bg: '#FFF3E0',
  },
  {
    id: '8',
    title: 'Шығыстар мен\nесептер',
    icon: 'file-document-outline',
    iconFamily: 'MaterialCommunityIcons',
    color: '#3629B7',
    bg: '#ECEBFF',
  },
  {
    id: '9',
    title: 'Тарих\n(История)',
    icon: 'history',
    iconFamily: 'MaterialCommunityIcons',
    color: '#FF4267',
    bg: '#FFEBF0',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'mail' | 'settings'>('home');

  const renderCategoryIcon = (item: typeof CATEGORIES[0]) => {
    if (item.iconFamily === 'Ionicons') {
      return <Ionicons name={item.icon as any} size={26} color={item.color} />;
    }
    return <MaterialCommunityIcons name={item.icon as any} size={26} color={item.color} />;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" />

      {/* Верхний синий хедер */}
      <View style={styles.header}>
        <View style={styles.userInfoRow}>
  <View style={styles.avatarPlaceholder}>
    <Text style={styles.avatarLetter}>Н</Text>
  </View>
  <View style={styles.greetingContainer}>
    <Text style={styles.welcomeSub}>Қош келдіңіз,</Text>
    <Text style={styles.greetingText}>Нұркелді</Text>
  </View>
</View>

        {/* Колокольчик с уведомлением */}
        <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Карточка Kaspi Gold / Mastercard */}
        <View style={styles.cardWrapper}>
          <View style={styles.bankCard}>
            {/* Фоновые круги */}
            <View style={styles.cardDecorativeCircle1} />
            <View style={styles.cardDecorativeCircle2} />

            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardHolderName}>NURKELDI OMIRZAK</Text>
              <Text style={styles.cardBrandBadge}>iBank </Text>
            </View>

            <View style={styles.cardMiddle}>
              <Text style={styles.cardType}>Mastercard World</Text>
              <Text style={styles.cardNumber}>4405  ••••  ••••  7018</Text>
            </View>

            <View style={styles.cardBottomRow}>
              {/* Баланс в тенге */}
              <Text style={styles.cardBalance}>845 600 ₸</Text>
              
              {/* Фирменный логотип Mastercard (два круга) */}
              <View style={styles.mastercardLogo}>
                <View style={[styles.mcCircle, styles.mcRed]} />
                <View style={[styles.mcCircle, styles.mcYellow]} />
              </View>
            </View>

            {/* Акцентная полоска */}
            <View style={styles.cardBottomAccent} />
          </View>
        </View>

        {/* Сетка категорий 3x3 */}
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              style={styles.categoryItem}
              activeOpacity={0.7}
            >
              <View style={[styles.categoryIconWrap, { backgroundColor: cat.bg }]}>
                {renderCategoryIcon(cat)}
              </View>
              <Text style={styles.categoryTitle}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Нижняя панель навигации */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'home' && styles.activeTabPill]}
          onPress={() => setActiveTab('home')}
        >
          <Ionicons 
            name="home" 
            size={18} 
            color={activeTab === 'home' ? '#FFFFFF' : '#898989'} 
          />
          {activeTab === 'home' && (
            <Text style={styles.activeTabText}>Басты бет</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => setActiveTab('search')}
        >
          <Ionicons 
            name="search-outline" 
            size={22} 
            color={activeTab === 'search' ? '#3629B7' : '#898989'} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => setActiveTab('mail')}
        >
          <Ionicons 
            name="mail-outline" 
            size={22} 
            color={activeTab === 'mail' ? '#3629B7' : '#898989'} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => setActiveTab('settings')}
        >
          <Ionicons 
            name="settings-outline" 
            size={22} 
            color={activeTab === 'settings' ? '#3629B7' : '#898989'} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3629B7',
  },
  header: {
    backgroundColor: '#3629B7',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4E98FF', // Аккуратный акцентный фон
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  greetingContainer: {
    marginLeft: 12,
  },
  welcomeSub: {
    fontSize: 12,
    color: '#D1CEF5',
  },
  greetingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  bellButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#FF4267',
    position: 'absolute',
    top: 6,
    right: 8,
    borderWidth: 1.5,
    borderColor: '#3629B7',
  },
  scrollContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 90,
  },
  cardWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bankCard: {
    width: '100%',
    height: 195,
    backgroundColor: '#1E256F',
    borderRadius: 22,
    padding: 22,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#1E256F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  cardDecorativeCircle1: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#2D7CF6',
    opacity: 0.85,
    right: -40,
    top: -40,
  },
  cardDecorativeCircle2: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#4E98FF',
    opacity: 0.45,
    right: 30,
    bottom: -20,
  },
  cardBottomAccent: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: 4,
    backgroundColor: '#FF4267',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  cardHolderName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardBrandBadge: {
    color: '#FFE600',
    fontWeight: '700',
    fontSize: 14,
  },
  cardMiddle: {
    zIndex: 2,
  },
  cardType: {
    color: '#BAC9EB',
    fontSize: 12,
    marginBottom: 4,
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    letterSpacing: 1.5,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  cardBalance: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  mastercardLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mcCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  mcRed: {
    backgroundColor: '#EB001B',
    marginRight: -10,
    zIndex: 1,
  },
  mcYellow: {
    backgroundColor: '#F79E1B',
    opacity: 0.95,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '31%',
    height: 98,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0F1F5',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  categoryIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryTitle: {
    fontSize: 11,
    color: '#7D848F',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 14,
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