import { Ionicons } from '@expo/vector-icons';
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

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign in</Text>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Hello there, sign in to continue</Text>

          <View style={styles.illustrationWrapper}>
            <View style={styles.circleBg}>
              <View style={styles.lockIconContainer}>
                <Ionicons name="lock-closed" size={36} color="#FFFFFF" />
              </View>
              <View style={[styles.dot, styles.dotPink]} />
              <View style={[styles.dot, styles.dotYellow]} />
              <View style={[styles.dot, styles.dotCyan]} />
              <View style={[styles.dot, styles.dotBlue]} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Text input"
              placeholderTextColor="#9EA3AE"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9EA3AE"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#7D848F"
              />
            </TouchableOpacity>
          </View>

         <TouchableOpacity 
  style={styles.forgotPasswordWrapper}
  onPress={() => router.push('/forgot-password' as any)}
>
  <Text style={styles.forgotPasswordText}>Forgot your password ?</Text>
</TouchableOpacity>

          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fingerprintButton}>
            <Ionicons name="finger-print" size={38} color="#2E3A8C" />
          </TouchableOpacity>

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2E3A8C',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#2E3A8C',
  },
  topHeader: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E232C',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#7D848F',
    marginTop: 4,
    marginBottom: 20,
    textAlign: 'center',
  },
  illustrationWrapper: {
    width: 213,
    height: 165,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  circleBg: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#EBF1FD',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lockIconContainer: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#4E61DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    borderRadius: 8,
  },
  dotPink: {
    width: 14,
    height: 14,
    backgroundColor: '#E74C6C',
    top: 14,
    right: 6,
  },
  dotYellow: {
    width: 12,
    height: 12,
    backgroundColor: '#F5B942',
    bottom: 20,
    left: 8,
  },
  dotCyan: {
    width: 8,
    height: 8,
    backgroundColor: '#26C6DA',
    left: 2,
    top: 50,
  },
  dotBlue: {
    width: 7,
    height: 7,
    backgroundColor: '#3052DE',
    bottom: 24,
    right: 18,
  },
  inputContainer: {
    width: 327,
    height: 44,
    borderWidth: 1,
    borderColor: '#CACACA',
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#1E232C',
  },
  forgotPasswordWrapper: {
    width: 327,
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: '#00B4D8',
    fontWeight: '500',
  },
  signInButton: {
    width: 327,
    height: 44,
    backgroundColor: '#2E3A8C',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  fingerprintButton: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CACACA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
  },
  bottomText: {
    fontSize: 13,
    color: '#7D848F',
  },
  signUpText: {
    fontSize: 13,
    color: '#2E3A8C',
    fontWeight: '700',
  },
});