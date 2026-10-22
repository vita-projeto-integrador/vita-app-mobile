import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
 content: {
  flex: 1,
  paddingHorizontal: 32,  
  justifyContent: 'center',
},
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F5A623',
  },
  label: {
    fontSize: 13,
    color: '#2E2E2E',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
  },
  button: {
    backgroundColor: '#F5A623',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 13,
    color: '#666666',
  },
  footerLink: {
    color: '#F5A623',
    fontWeight: '600',
  },
});