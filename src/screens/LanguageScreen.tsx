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

interface LanguageItem {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
}

const LANGUAGES: LanguageItem[] = [
  { id: 'kk', name: 'Kazakh', nativeName: 'Қазақ тілі', flag: '🇰🇿' },
  { id: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { id: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { id: 'zh', name: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳' },
  { id: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { id: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { id: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { id: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('kk');

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
        <Text style={styles.headerTitle}>Тіл (Language)</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Список языков */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {LANGUAGES.map((lang) => {
          const isSelected = lang.id === selectedLanguage;
          return (
            <TouchableOpacity
              key={lang.id}
              style={[styles.langItem, isSelected && styles.langItemActive]}
              onPress={() => setSelectedLanguage(lang.id)}
              activeOpacity={0.7}
            >
              <View style={styles.langLeft}>
                <Text style={styles.flag}>{lang.flag}</Text>
                <View>
                  <Text style={[styles.langNativeName, isSelected && styles.langTextActive]}>
                    {lang.nativeName}
                  </Text>
                  <Text style={styles.langSubName}>{lang.name}</Text>
                </View>
              </View>

              {/* Синяя галочка активного языка как в Figma */}
              {isSelected ? (
                <Ionicons name="checkmark" size={22} color="#3629B7" />
              ) : (
                <View style={styles.checkmarkPlaceholder} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Кнопка сохранить */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Сақтау (Save)</Text>
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
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  headerRightPlaceholder: {
    width: 40,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 90,
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECEFF5',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  langItemActive: {
    borderColor: '#3629B7',
    backgroundColor: '#F7F6FF',
  },
  langLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 24,
    marginRight: 14,
  },
  langNativeName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  langTextActive: {
    color: '#3629B7',
    fontWeight: '700',
  },
  langSubName: {
    fontSize: 12,
    color: '#898989',
    marginTop: 2,
  },
  checkmarkPlaceholder: {
    width: 22,
  },
  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F5F6FA',
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    height: 50,
    backgroundColor: '#3629B7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});