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

interface BranchItem {
  id: string;
  name: string;
  address: string;
  distance: string;
  pinTop: number;
  pinLeft: number;
}

const BRANCHES: BranchItem[] = [
  {
    id: '1',
    name: '№150 Бөлімшесі',
    address: 'Абай даңғылы, 150',
    distance: '500 м',
    pinTop: 45,
    pinLeft: 40,
  },
  {
    id: '2',
    name: '№45 Бөлімшесі',
    address: 'Қабанбай батыр көшесі, 45',
    distance: '1.2 км',
    pinTop: 80,
    pinLeft: 180,
  },
  {
    id: '3',
    name: '№88 Бөлімшесі',
    address: 'Төле би көшесі, 88',
    distance: '2.1 км',
    pinTop: 140,
    pinLeft: 70,
  },
  {
    id: '4',
    name: '№210 Бөлімшесі',
    address: 'Достық даңғылы, 210',
    distance: '3.4 км',
    pinTop: 120,
    pinLeft: 240,
  },
  {
    id: '5',
    name: '№12 Бөлімшесі',
    address: 'Сейфуллин даңғылы, 500',
    distance: '4.0 км',
    pinTop: 175,
    pinLeft: 160,
  },
];

export default function BranchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('1');

  const filteredBranches = BRANCHES.filter((b) =>
    b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Text style={styles.headerTitle}>Бөлімшелер</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Верхняя половина: Стилизованная интерактивная карта */}
      <View style={styles.mapContainer}>
        {/* Фоновые улицы и разметка */}
        <View style={[styles.mapRoad, styles.roadAbay]}>
          <Text style={styles.roadNameText}>Абай даңғылы</Text>
        </View>
        <View style={[styles.mapRoad, styles.roadKabanbay]}>
          <Text style={styles.roadNameText}>Қабанбай батыр к-сі</Text>
        </View>
        <View style={[styles.mapRoadVertical, styles.roadDostyk]}>
          <Text style={styles.roadNameVerticalText}>Достық даңғылы</Text>
        </View>
        <View style={[styles.mapRoadVertical, styles.roadSeifullin]}>
          <Text style={styles.roadNameVerticalText}>Сейфуллин даңғылы</Text>
        </View>

        {/* Парковая зеленая зона для реалистичности */}
        <View style={styles.parkZone}>
          <Text style={styles.parkText}>Орталық саябақ</Text>
        </View>

        {/* Маркеры отделений на карте */}
        {BRANCHES.map((branch) => {
          const isSelected = branch.id === selectedBranchId;
          return (
            <TouchableOpacity
              key={branch.id}
              style={[
                styles.mapPin,
                { top: branch.pinTop, left: branch.pinLeft },
                isSelected && styles.mapPinActive,
              ]}
              onPress={() => setSelectedBranchId(branch.id)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="map-marker"
                size={isSelected ? 36 : 28}
                color={isSelected ? '#3629B7' : '#FF4267'}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Нижняя половина: Поиск и список отделений */}
      <View style={styles.bottomSheetContainer}>
        {/* Поле поиска */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#898989" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Бөлімшені немесе көшені іздеу..."
            placeholderTextColor="#898989"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#898989" />
            </TouchableOpacity>
          )}
        </View>

        {/* Список адресов */}
        <ScrollView
          style={styles.branchList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.branchListContent}
        >
          {filteredBranches.map((item) => {
            const isSelected = item.id === selectedBranchId;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.branchCard, isSelected && styles.branchCardActive]}
                onPress={() => setSelectedBranchId(item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.branchLeft}>
                  <View style={[styles.pinCircle, isSelected && styles.pinCircleActive]}>
                    <Ionicons
                      name="location"
                      size={18}
                      color={isSelected ? '#3629B7' : '#FF4267'}
                    />
                  </View>
                  <View style={styles.branchInfo}>
                    <Text style={styles.branchTitle}>{item.name}</Text>
                    <Text style={styles.branchAddress}>{item.address}</Text>
                  </View>
                </View>
                <Text style={styles.distanceText}>{item.distance}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
    backgroundColor: '#FFFFFF',
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
  mapContainer: {
    height: 250,
    backgroundColor: '#EBF0F5',
    position: 'relative',
    overflow: 'hidden',
  },
  mapRoad: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 18,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D7DFE8',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  roadAbay: {
    top: 60,
  },
  roadKabanbay: {
    top: 155,
  },
  mapRoadVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#D7DFE8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roadDostyk: {
    right: 65,
  },
  roadSeifullin: {
    left: 110,
  },
  roadNameText: {
    fontSize: 9,
    color: '#9AA7B6',
    fontWeight: '600',
  },
  roadNameVerticalText: {
    fontSize: 8,
    color: '#9AA7B6',
    fontWeight: '600',
    transform: [{ rotate: '-90deg' }],
    width: 90,
    textAlign: 'center',
  },
  parkZone: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 80,
    height: 60,
    backgroundColor: '#D7EBD8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parkText: {
    fontSize: 8,
    color: '#4B7B50',
    fontWeight: '600',
  },
  mapPin: {
    position: 'absolute',
    zIndex: 10,
  },
  mapPinActive: {
    zIndex: 20,
    transform: [{ scale: 1.15 }],
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1C1C1E',
  },
  branchList: {
    flex: 1,
  },
  branchListContent: {
    paddingBottom: 24,
  },
  branchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F1F5',
    marginBottom: 10,
  },
  branchCardActive: {
    borderColor: '#3629B7',
    backgroundColor: '#F7F6FF',
  },
  branchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pinCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFEBF0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pinCircleActive: {
    backgroundColor: '#EEEDFF',
  },
  branchInfo: {
    flex: 1,
  },
  branchTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  branchAddress: {
    fontSize: 12,
    color: '#898989',
    marginTop: 2,
  },
  distanceText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3629B7',
    marginLeft: 8,
  },
});