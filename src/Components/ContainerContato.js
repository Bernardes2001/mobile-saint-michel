import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';

export default function ContainerContato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');

  return (
    <ScrollView contentContainerStyle={estilos.scrollView}>
      <MapView
        style={estilos.mapa}
        initialRegion={{
          latitude: -23.4990,
          longitude: -46.4110,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{ latitude: -23.4990, longitude: -46.4110 }}
          title={"Av. Marechal Tito, 340"}
          description={"Localização do endereço"}
        />
      </MapView>
      <View style={estilos.viewP}>
        <Text style={estilos.texto1}>ENTRE EM CONTATO</Text>
        <Text style={estilos.texto2}>Contato</Text>
        <View style={estilos.container}>
          <TextInput
            style={estilos.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={estilos.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <TextInput
          style={estilos.inputA}
          placeholder="Assunto"
          value={assunto}
          onChangeText={setAssunto}
        />
        <TextInput
          style={estilos.inputM}
          placeholder="Mensagem"
          value={mensagem}
          onChangeText={setMensagem}
          multiline
        />
        <TouchableOpacity style={estilos.botao}>
          <Text style={estilos.textoBotao}>Enviar</Text>
        </TouchableOpacity>
        <View style={estilos.infoAdicional}>
          <Text style={estilos.textoInfo}>Endereço: Av. Marechal Tito, 340</Text>
          <Text style={estilos.textoInfo}>Telefone: (11) 6818-1255</Text>
          <Text style={estilos.textoInfo}>Email: saintmichel@gmail.com</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  mapa: {
    width: '100%',
    height: 200,
  },
  viewP: {
    backgroundColor: '#BFD2F8',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  texto1: {
    fontSize: 20,
    color: '#159EEC',
    textAlign: 'center',
    marginBottom: 10,
  },
  texto2: {
    fontSize: 25,
    color: '#1F2B6C',
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '48%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  inputA: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  inputM: {
    width: '100%',
    height: 120,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#159EEC',
    padding: 15,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoAdicional: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  textoInfo: {
    fontSize: 16,
    color: '#1F2B6C',
    marginBottom: 5,
  },
});
