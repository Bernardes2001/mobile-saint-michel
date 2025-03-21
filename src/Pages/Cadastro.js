import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Calendar } from 'react-native-calendars';
import api from '../Services/Api'; 

// Esquema de validação com Yup
const schema = yup.object().shape({
  fullName: yup.string().required('Nome completo é obrigatório'),
  birthDate: yup
    .string()
    .required('Data de nascimento é obrigatória')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/, // Formato esperado: YYYY-MM-DD
      'Data de nascimento deve estar no formato YYYY-MM-DD'
    ),
  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .matches(/^\d{11}$/, 'CPF deve ter 11 dígitos')
    .test('cpf-valid', 'CPF inválido', (value) => {
      // Função para validar CPF (opcional)
      return validateCPF(value);
    }),
  rg: yup.string().required('RG é obrigatório'),
  address: yup.string().required('Endereço é obrigatório'),
  phone: yup
    .string()
    .required('Telefone é obrigatório')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone deve estar no formato (XX) XXXXX-XXXX'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      'Senha deve conter letras e números'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senhas devem ser iguais'),
  gender: yup.string().required('Gênero é obrigatório').nullable(),
  healthInsurance: yup.string().required('Convênio médico é obrigatório').nullable(),
  healthInsurancePlan: yup.string().when('healthInsurance', {
    is: (healthInsurance) => healthInsurance && healthInsurance.length > 0,
    then: yup.string().required('Plano do convênio é obrigatório').nullable(),
  }),
  bloodType: yup.string().required('Tipo sanguíneo é obrigatório').nullable(),
});

// Função para validar CPF (opcional)
const validateCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;

  return true;
};

const Cadastro = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // Validação em tempo real
  });

  const [selectedHealthInsurance, setSelectedHealthInsurance] = useState('');
  const [plans, setPlans] = useState([]);
  const [selectedDate, setSelectedDate] = useState(''); // Estado para a data selecionada
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // Estado para controlar a visibilidade do modal

  // Monitorar os valores dos campos em tempo real
  const watchPassword = watch('password', ''); // Monitora o campo de senha
  const watchHealthInsurance = watch('healthInsurance', ''); // Monitora o campo de convênio médico

  // Planos disponíveis para cada convênio
  const healthInsurancePlans = {
    Unimed: ['Unimed Nacional', 'Unimed Empresarial', 'Unimed Individual'],
    SulAmérica: ['SulAmérica Premium', 'SulAmérica Empresarial', 'SulAmérica Básico'],
    Amil: ['Amil 400', 'Amil 500', 'Amil 600'],
    BradescoSaúde: ['Bradesco Saúde Ouro', 'Bradesco Saúde Prata', 'Bradesco Saúde Bronze'],
  };

  // Função para enviar os dados do formulário para a API
  const onSubmit = async (data) => {
    try {
      // Remove o campo de confirmação de senha antes de enviar
      const { confirmPassword, ...userData } = data;

      // Envia os dados para a API
      const response = await api.post('http://localhost:5000/paciente/cadastro', userData);

      // Verifica se a requisição foi bem-sucedida
      if (response.status === 200 || response.status === 201) {
        Alert.alert('Cadastro realizado com sucesso!', 'Você será redirecionado para a página de login.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login'); // Navega para a tela de login
            },
          },
        ]);
      } else {
        // Se a API retornar um status diferente de 200 ou 201, exibe uma mensagem de erro
        Alert.alert('Erro', 'Ocorreu um erro ao tentar cadastrar. Tente novamente mais tarde.');
      }
    } catch (error) {
      // Se ocorrer um erro na requisição, exibe uma mensagem de erro
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar cadastrar. Tente novamente mais tarde.');
    }
  };

  // Função para lidar com a seleção de data
  const onDayPress = (day) => {
    setSelectedDate(day.dateString); // Atualiza o estado da data selecionada
    setValue('birthDate', day.dateString); // Atualiza o valor do campo no formulário
    setIsCalendarVisible(false); // Fecha o modal após a seleção da data
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Campo: Nome Completo */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Nome Completo"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="fullName"
        defaultValue=""
      />
      {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}

      {/* Campo: Data de Nascimento (Modal com Calendário) */}
      <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
        <Controller
          control={control}
          render={({ field: { value } }) => (
            <TextInput
              placeholder="Data de Nascimento"
              value={value}
              editable={false} // Impede a edição manual
              style={styles.input}
            />
          )}
          name="birthDate"
          defaultValue=""
        />
      </TouchableOpacity>
      {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate.message}</Text>}

      {/* Modal com Calendário */}
      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#1F2B6C' }
              }}
              theme={{
                calendarBackground: '#FFFFFF',
                textSectionTitleColor: '#1F2B6C',
                selectedDayBackgroundColor: '#1F2B6C',
                selectedDayTextColor: '#FFFFFF',
                todayTextColor: '#1F2B6C',
                dayTextColor: '#000000',
                textDisabledColor: '#BFD2F8',
                arrowColor: '#1F2B6C',
              }}
            />
            <Button title="Fechar" onPress={() => setIsCalendarVisible(false)} color="#1F2B6C" />
          </View>
        </View>
      </Modal>

      {/* Campo: CPF */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="CPF (apenas números)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="cpf"
        defaultValue=""
      />
      {errors.cpf && <Text style={styles.errorText}>{errors.cpf.message}</Text>}

      {/* Campo: RG */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="RG"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="rg"
        defaultValue=""
      />
      {errors.rg && <Text style={styles.errorText}>{errors.rg.message}</Text>}

      {/* Campo: Endereço */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Endereço"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="address"
        defaultValue=""
      />
      {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}

      {/* Campo: Telefone */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Telefone (XX) XXXXX-XXXX"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="phone"
        defaultValue=""
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

      {/* Campo: Email */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      {/* Campo: Senha */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Senha (mínimo 6 caracteres)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            style={styles.input}
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      {/* Campo: Confirmação de Senha */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Confirmação de Senha"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            style={styles.input}
          />
        )}
        name="confirmPassword"
        defaultValue=""
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

      {/* Campo: Gênero */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label="Selecione o gênero" value={null} />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Feminino" value="Feminino" />
              <Picker.Item label="Outro" value="Outro" />
            </Picker>
          </View>
        )}
        name="gender"
        defaultValue={null}
      />
      {errors.gender && <Text style={styles.errorText}>{errors.gender.message}</Text>}

      {/* Campo: Convênio Médico */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                setSelectedHealthInsurance(itemValue);
                setPlans(healthInsurancePlans[itemValue] || []);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Selecione o convênio" value={null} />
              <Picker.Item label="Unimed" value="Unimed" />
              <Picker.Item label="SulAmérica" value="SulAmérica" />
              <Picker.Item label="Amil" value="Amil" />
              <Picker.Item label="Bradesco Saúde" value="BradescoSaúde" />
            </Picker>
          </View>
        )}
        name="healthInsurance"
        defaultValue={null}
      />
      {errors.healthInsurance && <Text style={styles.errorText}>{errors.healthInsurance.message}</Text>}

      {/* Campo: Plano do Convênio */}
      {watchHealthInsurance && (
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
              >
                <Picker.Item label="Selecione o plano" value={null} />
                {plans.map((plan, index) => (
                  <Picker.Item key={index} label={plan} value={plan} />
                ))}
              </Picker>
            </View>
          )}
          name="healthInsurancePlan"
          defaultValue={null}
        />
      )}
      {errors.healthInsurancePlan && <Text style={styles.errorText}>{errors.healthInsurancePlan.message}</Text>}

      {/* Campo: Tipo Sanguíneo */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label="Selecione o tipo sanguíneo" value={null} />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
            </Picker>
          </View>
        )}
        name="bloodType"
        defaultValue={null}
      />
      {errors.bloodType && <Text style={styles.errorText}>{errors.bloodType.message}</Text>}

      {/* Botão de Cadastro */}
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={handleSubmit(onSubmit)} color="#1F2B6C" />
      </View>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1F2B6C',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#BFD2F8',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  pickerContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#BFD2F8',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  errorText: {
    color: '#FF6B6B',
    marginBottom: 10,
    width: '80%',
    textAlign: 'left',
  },
});

export default Cadastro;