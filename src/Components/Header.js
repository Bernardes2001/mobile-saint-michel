import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Header() {

    return (
        <View>

            <View style={estilos.viewPrincipal}>

                <View style={estilos.viewUm}>
                    <Image source={require('../../assets/IconTelefone.png')} style={estilos.IconT} />
                        <Text style={estilos.texto}>EMERGÊNCIA</Text>
                        <Text style={estilos.numero}>(11) 6818-1255</Text>
                </View>

                <View style={estilos.viewUm}>
                    <Image source={require('../../assets/IconLocal.png')} style={estilos.IconL} />
                        <Text style={estilos.texto}>LOCALIZAÇÃO</Text>
                        <Text style={estilos.TextoDois}>Av. Marechal Tito, 340</Text>
                </View>
                
            </View>

                <View style={estilos.viewDois}>
                    <Image source={require('../../assets/IconRelogio.png')} style={estilos.iconR}/>
                    <Text style={estilos.textoR}>HORÁRIO DE FUNCIONAMENTO</Text>
                   
                </View>

                <Text style={estilos.TextoDoisH}>09:00 - 20:00 Todo dia</Text>

        </View>
    )
}

const estilos = StyleSheet.create({

    viewPrincipal: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    viewUm: {
        marginTop: 48,
        flexDirection: 'row'
    },
    IconT: {
        width: 30,
        height: 30,
        marginLeft: 1,
        display: 'flex'
    },
    texto: {
        fontSize: 16,
        color: "#1F2B6C",
        marginLeft: 4,
        marginTop: -4
    },
    numero: {
        color: "#159EEC",
        marginLeft: -99,
        marginTop: 15
    },


    IconL: {
        width: 30,
        height: 30,
        marginLeft: 1,
        display: 'flex'
    },
    TextoDois: {
        color: "#159EEC",
        marginLeft: -105,
        marginTop: 15,
    },


    viewDois: {
        marginTop: 10,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        flexDirection: 'row'
    },
    iconR: {
        width: 28,
        height: 28,
        marginLeft: 1,
        display: 'flex'
    },
    TextoDoisH: {
        color: "#159EEC",
        marginLeft: 130,
        marginTop: -14
    },
    textoR: {
        fontSize: 16,
        color: "#1F2B6C",
        marginLeft: 4,
        marginTop: -14
    }
})