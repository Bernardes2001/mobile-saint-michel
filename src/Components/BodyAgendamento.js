import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Alert,
  ImageBackground,
  Button,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function BodyAgendamento() {
  const [formularioAtivo, setFormularioAtivo] = useState(null);
  const [tipoAgendamento, setTipoAgendamento] = useState(null); // 'eu' ou 'dependente'
  const [dependenteSelecionado, setDependenteSelecionado] = useState('Selecionar');
  const [consultaDate, setConsultaDate] = useState('dd/mm/aaaa');
  const [consultaTime, setConsultaTime] = useState('--:--');
  const [consultaValues, setConsultaValues] = useState({
    departamento: 'Especialidade',
    profissional: 'Médico',
    tipoConsulta: 'Local',
  });

  const [exameDate, setExameDate] = useState('dd/mm/aaaa');
  const [exameTime, setExameTime] = useState('--:--');
  const [exameValues, setExameValues] = useState({
    categoriaExame: 'Tipo de exame',
    tipoExame: 'Exame',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [currentForm, setCurrentForm] = useState(null);

  // Estados para o formulário do dependente
  const [dependenteInfo, setDependenteInfo] = useState({
    nomeCompleto: '',
    dataNascimento: 'dd/mm/aaaa',
    cpf: '',
    endereco: '',
    genero: 'Genêro',
    etnia: 'Etnia',
    problemaSaude: '',
    parentesco: 'Parentesco',
    tipoSanguineo: 'Tipo sanguíneo',
    convenio: 'Convênio',
    plano: 'Plano',
  });

  const [dependenteConcluido, setDependenteConcluido] = useState(false);

  const dependentes = ['Filho 1', 'Filho 2', 'Cônjuge'];

  // Planos específicos para cada convênio
  const planosPorConvenio = {
    Amil: ['Amil 400', 'Amil 500', 'Amil 600'],
    Bradesco: ['Bradesco Saúde Ouro', 'Bradesco Saúde Prata', 'Bradesco Saúde Bronze'],
    Unimed: ['Unimed Nacional', 'Unimed Empresarial', 'Unimed Individual'],
    SulAmérica: ['SulAmérica Premium', 'SulAmérica Empresarial', 'SulAmérica Básico'],
  };

  const options = {
    tipoAgendamento: ['Para mim', 'Para um dependente'],
    dependente: dependentes,
    departamento: ['Cardiologia', 'Dermatologia', 'Gastrologia', 'Ginecologia', 'Nefrologia', 'Oftalmologia', 'Oncologia', 'Ortopedia', 'Otorrino', 'Pneumo', 'Urologia'],
    profissional: {
      Cardiologia: ['Dr. João', 'Dra. Maria'],
      Ortopedia: ['Dr. Pedro', 'Dra. Ana'],
      Dermatologia: ['Dr. Carlos', 'Dra. Sofia'],
    },
    tipoConsulta: ['Presencial', 'Online'],
    categoriaExame: [
      'Exames de Sangue',
      'Exames de Imagem',
      'Exames Cardiológicos',
      'Exames de Urina',
      'Exames Hormonais',
      'Exames Microbiológicos',
      'Outros',
    ],
    tipoExame: {
      'Exames de Sangue': [
        'Hemograma Completo',
        'Glicemia em Jejum',
        'Colesterol Total',
        'Triglicerídeos',
        'TGO e TGP',
        'TSH e T4 Livre',
      ],
      'Exames de Imagem': [
        'Raio-X',
        'Ultrassom',
        'Tomografia Computadorizada',
        'Ressonância Magnética',
        'Mamografia',
        'Densitometria Óssea',
      ],
      'Exames Cardiológicos': [
        'Eletrocardiograma',
        'Teste Ergométrico',
        'Ecocardiograma',
        'Holter 24 horas',
        'MAPA 24 horas',
      ],
      'Exames de Urina': [
        'Urina Tipo 1',
        'Urocultura',
        'Proteinúria de 24 horas',
        'Clearance de Creatinina',
      ],
      'Exames Hormonais': [
        'Cortisol',
        'Prolactina',
        'Testosterona',
        'Estradiol',
        'Progesterona',
      ],
      'Exames Microbiológicos': [
        'Cultura de Secreção',
        'Antibiograma',
        'Pesquisa de Fungos',
        'Pesquisa de Parasitas',
      ],
      Outros: [
        'Teste de Alergia',
        'Exame de Vista',
        'Audiometria',
        'Endoscopia',
        'Colonoscopia',
      ],
    },
    convenio: ['Amil', 'Unimed', 'Bradesco', 'SulAmérica'], // Adicionado mais um convênio
    genero: ['Masculino', 'Feminino', 'Outro'],
    etnia: ['Branco', 'Negro', 'Pardo', 'Indígena', 'Amarelo'],
    parentesco: ['Filho', 'Cônjuge', 'Outro'],
    tipoSanguineo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Desconhecido'],
  };

  const openModal = (form, field) => {
    setCurrentForm(form);
    setCurrentField(field);
    setModalVisible(true);
  };

  const selectOption = (value) => {
    if (currentField === 'tipoAgendamento') {
      setTipoAgendamento(value);
      if (value === 'Para mim') {
        setDependenteSelecionado('Selecionar'); // Resetar dependente se for para ele mesmo
      }
    } else if (currentField === 'dependente') {
      setDependenteSelecionado(value);
    } else if (currentForm === 'consulta') {
      if (currentField === 'departamento') {
        setConsultaValues((prev) => ({ ...prev, departamento: value, profissional: 'Médico' }));
      } else {
        setConsultaValues((prev) => ({ ...prev, [currentField]: value }));
      }
    } else if (currentForm === 'exame') {
      if (currentField === 'categoriaExame') {
        setExameValues((prev) => ({ ...prev, categoriaExame: value, tipoExame: 'Exame' }));
      } else {
        setExameValues((prev) => ({ ...prev, [currentField]: value }));
      }
    } else if (currentField === 'convenio') {
      // Resetar o plano ao mudar o convênio
      setDependenteInfo((prev) => ({ ...prev, convenio: value, plano: 'Plano' }));
    } else if (currentField === 'plano') {
      setDependenteInfo((prev) => ({ ...prev, [currentField]: value }));
    } else if (
      currentField === 'genero' ||
      currentField === 'etnia' ||
      currentField === 'parentesco' ||
      currentField === 'tipoSanguineo'
    ) {
      setDependenteInfo((prev) => ({ ...prev, [currentField]: value }));
    }
    setModalVisible(false);
  };

  const handleInputChange = (field, value) => {
    setDependenteInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleConcluirDependente = () => {
    const {
      nomeCompleto,
      dataNascimento,
      cpf,
      endereco,
      genero,
      etnia,
      parentesco,
      tipoSanguineo,
      convenio,
      plano,
    } = dependenteInfo;

    if (
      !nomeCompleto ||
      !dataNascimento ||
      !cpf ||
      !endereco ||
      genero === 'Selecionar' ||
      etnia === 'Selecionar' ||
      parentesco === 'Selecionar' ||
      tipoSanguineo === 'Selecionar' ||
      convenio === 'Selecionar' ||
      plano === 'Selecionar'
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setDependenteConcluido(true);
  };

  const renderTipoAgendamento = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Para quem é o agendamento?</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.input} onPress={() => openModal(null, 'tipoAgendamento')}>
          <Text>{tipoAgendamento || 'Selecionar'}</Text>
        </TouchableOpacity>
        {tipoAgendamento === 'Para um dependente' && (
          <TouchableOpacity style={styles.input} onPress={() => openModal(null, 'dependente')}>
            <Text>{dependenteSelecionado}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderDependenteForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Informações do Dependente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={dependenteInfo.nomeCompleto}
        onChangeText={(text) => handleInputChange('nomeCompleto', text)}
      />
      <TouchableOpacity style={styles.input} onPress={() => openModal(null, 'dataNascimento')}>
        <Text>{dependenteInfo.dataNascimento}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={dependenteInfo.cpf}
        onChangeText={(text) => handleInputChange('cpf', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={dependenteInfo.endereco}
        onChangeText={(text) => handleInputChange('endereco', text)}
      />
      <View style={styles.row}>
        <TouchableOpacity style={styles.input} onPress={() => openModal(null, 'genero')}>
          <Text>{dependenteInfo.genero}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={() => openModal(null, 'etnia')}>
          <Text>{dependenteInfo.etnia}</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.inputP}
        placeholder="Problema de Saúde (Opcional)"
        value={dependenteInfo.problemaSaude}
        onChangeText={(text) => handleInputChange('problemaSaude', text)}
      />
      <TouchableOpacity style={styles.input} onPress={() => openModal(null, 'parentesco')}>
        <Text>{dependenteInfo.parentesco}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input} onPress={() => openModal(null, 'tipoSanguineo')}>
        <Text>{dependenteInfo.tipoSanguineo}</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity style={styles.input} onPress={() => openModal(null, 'convenio')}>
          <Text>{dependenteInfo.convenio}</Text>
        </TouchableOpacity>
        {dependenteInfo.convenio !== 'Convênio' && (
          <TouchableOpacity style={styles.input} onPress={() => openModal(null, 'plano')}>
            <Text>{dependenteInfo.plano}</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleConcluirDependente}>
        <Text style={styles.buttonText}>Concluir</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMenuAgendamento = () => (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={[styles.menuButton, formularioAtivo === 'consulta' && styles.menuButtonActive]}
        onPress={() => setFormularioAtivo('consulta')}
      >
        <Text style={styles.menuButtonText}>Agendar Consulta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuButton, formularioAtivo === 'exame' && styles.menuButtonActive]}
        onPress={() => setFormularioAtivo('exame')}
      >
        <Text style={styles.menuButtonText}>Agendar Exame</Text>
      </TouchableOpacity>
    </View>
  );

  const renderConsultaForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Agendamento de Consulta</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.input} onPress={() => openModal('consulta', 'departamento')}>
          <Text>{consultaValues.departamento}</Text>
        </TouchableOpacity>
        {consultaValues.departamento !== 'Especialidade' && (
          <TouchableOpacity style={styles.input} onPress={() => openModal('consulta', 'profissional')}>
            <Text>{consultaValues.profissional}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.input} onPress={() => openModal('consulta', 'dataConsulta')}>
          <Text>{consultaDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={() => openModal('consulta', 'horario')}>
          <Text>{consultaTime}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowO}>
        <TouchableOpacity style={styles.input} onPress={() => openModal('consulta', 'tipoConsulta')}>
          <Text>{consultaValues.tipoConsulta}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => alert('Consulta agendada!')}>
        <Text style={styles.buttonText}>Agendar Consulta</Text>
      </TouchableOpacity>
    </View>
  );

  const renderExameForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Agendamento de Exame</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.input} onPress={() => openModal('exame', 'categoriaExame')}>
          <Text>{exameValues.categoriaExame}</Text>
        </TouchableOpacity>
        {exameValues.categoriaExame !== 'Tipo de exame' && (
          <TouchableOpacity style={styles.input} onPress={() => openModal('exame', 'tipoExame')}>
            <Text>{exameValues.tipoExame}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.input} onPress={() => openModal('exame', 'dataExame')}>
          <Text>{exameDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={() => openModal('exame', 'horario')}>
          <Text>{exameTime}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => alert('Exame agendado!')}>
        <Text style={styles.buttonText}>Agendar Exame</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHorarioModal = () => {
    const horarios = [];
    for (let hora = 9; hora <= 20; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        const horario = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        horarios.push(horario);
      }
    }

    return (
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={horarios}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    if (currentForm === 'consulta') {
                      setConsultaTime(item);
                    } else if (currentForm === 'exame') {
                      setExameTime(item);
                    }
                    setModalVisible(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const renderCalendarModal = () => (
    <Modal visible={modalVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Calendar
            onDayPress={(day) => {
              if (currentForm === 'consulta') {
                setConsultaDate(day.dateString);
              } else if (currentForm === 'exame') {
                setExameDate(day.dateString);
              } else if (currentField === 'dataNascimento') {
                setDependenteInfo((prev) => ({ ...prev, dataNascimento: day.dateString }));
              }
              setModalVisible(false);
            }}
            markedDates={{
              [currentForm === 'consulta' ? consultaDate : currentForm === 'exame' ? exameDate : dependenteInfo.dataNascimento]: {
                selected: true,
                selectedColor: '#1F2B6C',
              },
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
          <Button title="Fechar" onPress={() => setModalVisible(false)} color="#1F2B6C" />
        </View>
      </View>
    </Modal>
  );

  return (
    <ImageBackground
      source={require('../../assets/recepcaoHospital.jpeg')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.5 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Agende agora</Text>

        {/* Exibe o formulário de tipo de agendamento */}
        {!tipoAgendamento && renderTipoAgendamento()}

        {/* Exibe o formulário de dependente, se necessário */}
        {tipoAgendamento === 'Para um dependente' && !dependenteConcluido && renderDependenteForm()}

        {/* Exibe o menu de agendamento (consulta/exame) após selecionar o tipo de agendamento e preencher as informações do dependente (se necessário) */}
        {tipoAgendamento && (tipoAgendamento === 'Para mim' || dependenteConcluido) && renderMenuAgendamento()}

        {/* Exibe o formulário selecionado (consulta ou exame) */}
        {formularioAtivo === 'consulta' && renderConsultaForm()}
        {formularioAtivo === 'exame' && renderExameForm()}

        {/* Modal para seleção de opções */}
        {currentField === 'horario' ? (
          renderHorarioModal()
        ) : currentField === 'dataConsulta' || currentField === 'dataExame' || currentField === 'dataNascimento' ? (
          renderCalendarModal()
        ) : (
          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={
                    currentField === 'profissional'
                      ? consultaValues.departamento !== 'Especialidade'
                        ? options.profissional[consultaValues.departamento]
                        : []
                      : currentField === 'tipoExame'
                      ? exameValues.categoriaExame !== 'Tipo de exame'
                        ? options.tipoExame[exameValues.categoriaExame]
                        : []
                      : currentField === 'plano'
                      ? planosPorConvenio[dependenteInfo.convenio] || []
                      : options[currentField]
                  }
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.modalItem} onPress={() => selectOption(item)}>
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2B6C',
    marginBottom: 10,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  menuButtonActive: {
    backgroundColor: '#BFD2F8',
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  menuButtonActiveText: {
    color: '#BFD2F8',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rowO: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    width: '48%',
    marginBottom: 10,
  },
  inputP: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1F2B6C',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
});