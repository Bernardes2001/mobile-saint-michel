import React, { useRef, useState } from "react";
import { Image, StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity, Animated, TextInput } from "react-native";

const screenWidth = Dimensions.get('window').width;

const medicos = [
    { nome: "Dr. Flávio", especialidade: "Neurologista", imagem: require('../../assets/medicoNeuro.png') },
    { nome: "Dra. Carla", especialidade: "Cardiologista", imagem: require('../../assets/medicoCardio.png') },
    { nome: "Dr. Pedro", especialidade: "Ortopedista", imagem: require('../../assets/medicoOrtop.png') },   
];

const especialidades = ["Todos", "Cardiologista", "Dermatologista", "Gastroenterologista", "Ginecologista", "Nefrologista", "Neurologista",
                        "Oftalmologista", "Oncologista", "Ortopedista", "Otorrinolaringologista", "Pneumologista", "Urologista",
 ];

export default function MedicoEspecialidade() {
    const scrollViewRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [filtro, setFiltro] = useState("Todos");
    const [pesquisa, setPesquisa] = useState("");
    const scrollX = useRef(new Animated.Value(0)).current;

    const medicosFiltrados = medicos.filter(medico =>
        (filtro === "Todos" || medico.especialidade === filtro) &&
        medico.especialidade.toLowerCase().includes(pesquisa.toLowerCase())
    );

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false, listener: event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setActiveIndex(index);
        }}
    );

    return (
        <View>
            <TextInput
                style={estilos.inputFiltro}
                placeholder="Pesquisar especialidade"
                value={pesquisa}
                onChangeText={setPesquisa}
            />
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.filtroScrollView}>
                {especialidades.map((esp, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[estilos.filtroBotao, filtro === esp && estilos.filtroBotaoAtivo]}
                        onPress={() => setFiltro(esp)}
                    >
                        <Text style={[estilos.filtroTexto, filtro === esp && estilos.filtroTextoAtivo]}>{esp}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            
            <ScrollView 
                ref={scrollViewRef}
                horizontal 
                showsHorizontalScrollIndicator={false} 
                pagingEnabled 
                style={estilos.scrollView}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {medicosFiltrados.map((medico, index) => (
                    <View key={index} style={estilos.cardContainer}>
                        <View style={estilos.card}>
                            <Image source={medico.imagem} style={estilos.imgNeuro} />
                            <View style={estilos.nomesCard}>
                                <Text style={estilos.nomeDr}>{medico.nome}</Text>
                                <Text style={estilos.especialidade}>{medico.especialidade}</Text>
                                <View style={estilos.viewImg}>
                                    <Image source={require('../../assets/linkedinDois.png')} style={estilos.linkedin} />
                                    <Image source={require('../../assets/faceDois.png')} style={estilos.face} />
                                    <Image source={require('../../assets/instaDois.png')} style={estilos.insta} />
                                </View>
                            </View>
                            <View style={estilos.viewVizu}>
                                <Text style={estilos.vizu}>Visualizar Perfil</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            
            <View style={estilos.indicadorContainer}>
                {medicosFiltrados.map((_, index) => (
                    <View key={index} style={[estilos.indicador, activeIndex === index && estilos.indicadorAtivo]} />
                ))}
            </View>

            <View style={estilos.viewVazia}>

            </View>
        </View>
    );
}

    const estilos = StyleSheet.create({
        inputFiltro: {
            height: 40,
            borderColor: '#ccc',
            borderWidth: 1,
            margin: 10,
            paddingLeft: 8,
            borderRadius: 5,
        },
        filtroScrollView: {
            flexDirection: 'row',
            paddingVertical: 10,
            marginBottom: 10,
        },
        filtroBotao: {
            backgroundColor: '#ddd',
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 20,
            marginHorizontal: 5,
        },
        filtroBotaoAtivo: {
            backgroundColor: '#1F2B6C',
        },
        filtroTexto: {
            color: '#000',
        },
        filtroTextoAtivo: {
            color: '#FFF',
        },
        scrollView: {
            marginTop: 20,
        },
        cardContainer: {
            width: screenWidth,
            alignItems: 'center',
        },
        card: {
            alignItems: 'center',
            width: '80%',
        },
        imgNeuro: {
            width: '100%',
            height: 350,
            resizeMode: 'contain',
        },
        nomesCard: {
            backgroundColor: '#BFD2F8',
            width: '100%',
            alignItems: 'center',
            height: 140,
        },
        nomeDr: {
            color: '#1F2B6C',
            fontSize: 25,
            marginTop: 15,
        },
        especialidade: {
            color: '#1F2B6C',
            fontSize: 22,
            marginTop: -5,
        },
        viewImg: {
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'center'
        },
        linkedin: {
            height: 24,
            width: 24,
            marginRight: 13
        },
        face: {
            height: 24,
            width: 24
        },
        insta: {
            height: 24,
            width: 24,
            marginLeft: 13
        },
        viewVizu: {
            backgroundColor: '#1F2B6C',
            width: '100%',
            alignItems: 'center',
            height: 45,
            borderRadius: 4,
            marginTop: -1,
        },
        vizu: {
            color: '#BFD2F8',
            marginTop: 11,
            fontSize: 15,
        },
        viewVazia: {
            backgroundColor: '#FFF',
            marginTop: 20   
        },
            indicadorContainer: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
            },
            indicador: {
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#ccc',
                marginHorizontal: 4,
            },
            indicadorAtivo: {
                backgroundColor: '#1F2B6C',
                width: 8,
                height: 8,
            },
            viewVazia: {
                marginTop: 50
            },
        });
        
