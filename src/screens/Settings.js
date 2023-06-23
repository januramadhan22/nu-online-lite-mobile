import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Settings = () => {
  return (
    <ScrollView>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={{gap: 14, paddingVertical: 14}}>
        {/* Umum */}
        <View style={{padding: 12, backgroundColor: '#fff', gap: 8}}>
          <Text style={{fontSize: 14, fontWeight: 600, color: '#000'}}>
            Umum
          </Text>
          <View>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons name="moon-outline" size={18} color={'#000'} />
              <Text style={{color: '#000', fontSize: 16}}>Mode Gelap</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons name="text" size={18} color={'#000'} />
              <Text style={{color: '#000', fontSize: 16}}>
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
              <Ionicons name="bookmark-outline" size={18} color={'#000'} />
              <Text style={{color: '#000', fontSize: 16}}>Daftar Bookmark</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ibadah */}
        <View style={{padding: 12, backgroundColor: '#fff', gap: 8}}>
          <Text style={{fontSize: 14, fontWeight: 600, color: '#000'}}>
            Ibadah
          </Text>
          <View>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons name="book-outline" size={18} color={'#000'} />
              <Text style={{color: '#000', fontSize: 16}}>Al-Quran</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons name="time-outline" size={18} color={'#000'} />
              <Text style={{color: '#000', fontSize: 16}}>
                Lokasi dan Pengaturan Waktu Shalat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons name="notifications-outline" size={18} color={'#000'} />
              <Text style={{color: '#000', fontSize: 16}}>
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
              <Ionicons name="calendar-outline" size={18} color={'#000'} />
              <Text style={{color: '#000', fontSize: 16}}>
                Pengaturan Kalender Hijriah
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Artikel */}
        <View style={{padding: 12, backgroundColor: '#fff', gap: 8}}>
          <Text style={{fontSize: 14, fontWeight: 600, color: '#000'}}>
            Artikel
          </Text>
          <View>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons name="newspaper-outline" size={18} color={'#000'} />
              <Text style={{color: '#000', fontSize: 16}}>
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
              <Ionicons name="newspaper-outline" size={18} color={'#000'} />
              <Text style={{color: '#000', fontSize: 16}}>
                Kanal Artikel Keislaman
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tentang Aplikasi */}
        <View
          style={{
            padding: 12,
            backgroundColor: '#fff',
            gap: 8,
          }}>
          <Text style={{fontSize: 14, fontWeight: 600, color: '#000'}}>
            Tentang Aplikasi
          </Text>
          <View>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons name="logo-google-playstore" size={18} color={'#000'} />
              <Text style={{color: '#000', fontSize: 16}}>
                Periksa Pembaharuan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons name="share-social-outline" size={18} color={'#000'} />
              <Text style={{color: '#000', fontSize: 16}}>
                Bagikan Aplikasi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Ionicons name="help-circle-outline" size={18} color={'#000'} />
              <Text style={{color: '#000', fontSize: 16}}>
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
              <Ionicons name="heart-circle-outline" size={18} color={'#000'} />
              <Text style={{color: '#000', fontSize: 16}}>
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
