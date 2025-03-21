import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Exemplo de lista de usuários cadastrados (em um caso real, isso viria de um backend)
  const registeredUsers = [
    { email: "user1@example.com", password: "password1" },
    { email: "user2@example.com", password: "password2" },
  ];

  const handleLogin = () => {
    // Resetar mensagens de erro
    setEmailError("");
    setPasswordError("");

    // Verificar se o campo de email está vazio
    if (!email.trim()) {
      setEmailError("Por favor, preencha o campo de email.");
      return;
    }

    // Verificar se o campo de senha está vazio
    if (!password.trim()) {
      setPasswordError("Por favor, preencha o campo de senha.");
      return;
    }

    // Verificar se o email está em um formato válido (opcional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Por favor, insira um email válido.");
      return;
    }

    // Verificar se o usuário está cadastrado
    const user = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      navigation.navigate("HomePage");
    } else {
      setPasswordError("Email ou senha incorretos. Por favor, tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Logo.png")} style={styles.logo} />
      <Text style={styles.hospitalName}>Saint Michel</Text>
      <Text style={styles.slogan}>Cuidar de você é nossa missão divina</Text>
      <Text style={styles.title}>Login</Text>

      {/* Campo de Email */}
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError(""); // Limpar erro ao digitar
        }}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Campo de Senha */}
      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError(""); // Limpar erro ao digitar
        }}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {/* Botão de Login */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Link para Cadastro */}
      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F2B6C",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hospitalName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  slogan: {
    fontSize: 16,
    fontStyle: "italic",
    color: "white",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2B6C",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#159EEC",
    borderRadius: 8,
    backgroundColor: "#BFD2F8",
  },
  inputError: {
    borderColor: "red", // Destacar campo com erro
  },
  button: {
    backgroundColor: "#159EEC",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  registerText: {
    color: "white",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
});

export default Login;