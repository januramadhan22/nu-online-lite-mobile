import React, {useContext} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeContext from '../utils/context/themeContext';

const Settings = () => {
  const {toggleTheme, theme} = useContext(ThemeContext);

  return (
    <ScrollView>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View
        style={{
          gap: 14,
          paddingVertical: 14,
          backgroundColor: theme !== 'light' ? '#222' : 'grey',
        }}>
        {/* Umum */}
        <View
          style={{
            padding: 12,
            backgroundColor: theme === 'light' ? '#fff' : '#2F312F',
            gap: 8,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: theme === 'light' ? '#000' : '#fff',
            }}>
            Umum
          </Text>
          <View>
            <TouchableOpacity
              onPress={toggleTheme}
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderBottomColor: theme === 'light' ? '#000' : '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons
                name={theme === 'light' ? 'moon-outline' : 'moon'}
                size={18}
                color={theme === 'light' ? '#000' : '#fff'}
              />
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 16,
                }}>
                Mode Gelap
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderBottomColor: theme === 'light' ? '#000' : '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons
                name="text"
                size={18}
                color={theme === 'light' ? '#000' : '#fff'}
              />
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 16,
                }}>
                Preferensi Membaca
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons
                name={theme === 'light' ? 'bookmark-outline' : 'bookmark'}
                size={18}
                color={theme === 'light' ? '#000' : '#fff'}
              />
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 16,
                }}>
                Daftar Bookmark
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ibadah */}
        <View
          style={{
            padding: 12,
            backgroundColor: theme === 'light' ? '#fff' : '#2F312F',
            gap: 8,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: theme === 'light' ? '#000' : '#fff',
            }}>
            Ibadah
          </Text>
          <View>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderBottomColor: theme === 'light' ? '#000' : '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons
                name={theme === 'light' ? 'book-outline' : 'book'}
                size={18}
                color={theme === 'light' ? '#000' : '#fff'}
              />
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 16,
                }}>
                Al-Quran
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderBottomColor: theme === 'light' ? '#000' : '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons
                name={theme === 'light' ? 'time-outline' : 'time'}
                size={18}
                color={theme === 'light' ? '#000' : '#fff'}
              />
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 16,
                }}>
                Lokasi dan Pengaturan Waktu Shalat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderBottomColor: theme === 'light' ? '#000' : '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons
                name={
                  theme === 'light' ? 'notifications-outline' : 'notifications'
                }
                size={18}
                color={theme === 'light' ? '#000' : '#fff'}
              />
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 16,
                }}>
                Notifikasi Waktu Shalat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons
                name="calendar-outline"
                size={18}
                color={theme === 'light' ? '#000' : '#fff'}
              />
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 16,
                }}>
                Pengaturan Kalender Hijriah
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Artikel */}
        <View
          style={{
            padding: 12,
            backgroundColor: theme === 'light' ? '#fff' : '#2f312f',
            gap: 8,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: theme === 'light' ? '#000' : '#fff',
            }}>
            Artikel
          </Text>
          <View>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderBottomColor: theme === 'light' ? '#000' : '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons
                name="newspaper-outline"
                size={18}
                color={theme === 'light' ? '#000' : '#fff'}
              />
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 16,
                }}>
                Kanal Artikel Utama
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons
                name="newspaper-outline"
                size={18}
                color={theme === 'light' ? '#000' : '#fff'}
              />
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 16,
                }}>
                Kanal Artikel Keislaman
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tentang Aplikasi */}
        <View
          style={{
            padding: 12,
            backgroundColor: theme === 'light' ? '#fff' : '#2f312f',
            gap: 8,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: theme === 'light' ? '#000' : '#fff',
            }}>
            Tentang Aplikasi
          </Text>
          <View>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderBottomColor: theme === 'light' ? '#000' : '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons
                name="logo-google-playstore"
                size={18}
                color={theme === 'light' ? '#000' : '#fff'}
              />
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 16,
                }}>
                Periksa Pembaharuan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderBottomColor: theme === 'light' ? '#000' : '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons
                name="share-social-outline"
                size={18}
                color={theme === 'light' ? '#000' : '#fff'}
              />
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 16,
                }}>
                Bagikan Aplikasi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderBottomColor: theme === 'light' ? '#000' : '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons
                name={theme === 'light' ? 'help-circle-outline' : 'help-circle'}
                size={18}
                color={theme === 'light' ? '#000' : '#fff'}
              />
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 16,
                }}>
                Pertanyaan Umum (FAQ)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons
                name={
                  theme === 'light' ? 'heart-circle-outline' : 'heart-circle'
                }
                size={18}
                color={theme === 'light' ? '#000' : '#fff'}
              />
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 16,
                }}>
                Ikuti Media Sosial Kami
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
