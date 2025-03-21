import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function BodyHome() {
    return (
        <ScrollView contentContainerStyle={estilos.scrollContainer}>
            <View style={estilos.viewBody}>
                <Text style={estilos.titulo}>BEM-VINDO AO APP DO HOSPITAL SAINT-MICHEL</Text>
                
                <View style={estilos.viewT}>
                    <Text style={estilos.tituloDois}>CUIDAR DE VOCÊ</Text>
                    <Text style={estilos.tituloDois}>É A NOSSA MISSÃO</Text>
                    <Text style={estilos.tituloDois}>DIVINA</Text>
                </View>
                
                <Text style={estilos.descricao}>Com o aplicativo do Hospital Saint-Michel, você tem acesso a um atendimento de excelência na palma da mão.</Text>
                
                <View style={estilos.caixaApresentacao}>
                    <Text style={estilos.apresentacao}>🏥 No Hospital Saint-Michel, priorizamos a sua saúde e bem-estar. Nossa equipe altamente qualificada está pronta para oferecer atendimento humanizado, tecnologia de ponta e um ambiente acolhedor. Seja para consultas, exames ou emergências, estamos aqui para cuidar de você e da sua família com dedicação e compromisso.</Text>
                </View>
                
                <Text style={estilos.subtitulo}>Nossos Serviços:</Text>
                <View style={estilos.listaServicos}>
                    <Text style={estilos.servico}>🩺 Agende consultas e exames rapidamente.</Text>
                    <Text style={estilos.servico}>📋 Acompanhe seus resultados com segurança.</Text>
                    <Text style={estilos.servico}>🚑 Pronto atendimento e localização de unidades.</Text>
                    <Text style={estilos.servico}>💊 Receba prescrições e laudos digitalmente.</Text>
                    <Text style={estilos.servico}>👩‍⚕️ Telemedicina: consulte especialistas online.</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const estilos = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    viewBody: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    viewT: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    titulo: {
        color: '#159EEC',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    tituloDois: {
        color: '#1F2B6C',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    descricao: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
        marginVertical: 15,
    },
    caixaApresentacao: {
        backgroundColor: '#E8F0FE',
        padding: 15,
        borderRadius: 10,
        marginVertical: 15,
    },
    apresentacao: {
        fontSize: 16,
        textAlign: 'center',
        color: '#1F2B6C',
        fontWeight: '500',
    },
    subtitulo: {
        fontSize: 20,
        color: '#1F2B6C',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    listaServicos: {
        marginVertical: 15,
        alignItems: 'flex-start',
    },
    servico: {
        fontSize: 16,
        color: '#1F2B6C',
        marginBottom: 5,
    },
});
