import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Card } from 'react-native-paper';

const PerfilPaciente = () => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/80');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage}>
            <Avatar.Image size={80} source={{ uri: profileImage }} />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>José Santos</Text>
            <Text style={styles.email}>jose@gmail.com</Text>
          </View>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Idade:</Text>
          <TextInput style={styles.input} placeholder="" />

          <Text style={styles.label}>CPF:</Text>
          <TextInput style={styles.input} placeholder="" />

          <Text style={styles.label}>RG:</Text>
          <TextInput style={styles.input} placeholder="" />
        </View>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>DADOS DO PACIENTE:</Text>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Nome completo:</Text>
          <TextInput style={styles.input} placeholder="" />

          <Text style={styles.label}>Data de Nascimento:</Text>
          <TextInput style={styles.input} placeholder="dd/mm/aaaa" />

          <Text style={styles.label}>Endereço:</Text>
          <TextInput style={styles.input} placeholder="" />

          <Text style={styles.label}>Telefone:</Text>
          <TextInput style={styles.input} placeholder="" />

          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input} placeholder="" />

          <Text style={styles.label}>Gênero:</Text>
          <TextInput style={styles.input} placeholder="" />

          <Text style={styles.label}>Senha:</Text>
          <TextInput style={styles.input} secureTextEntry placeholder="" />

          <Text style={styles.label}>Tipo sanguíneo:</Text>
          <TextInput style={styles.input} placeholder="" />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D2B64',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileInfo: {
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoSection: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default PerfilPaciente;
