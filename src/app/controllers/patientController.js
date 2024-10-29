const PatientModel = require('../models/Patient')
const schema = require('./validate');

class PatientController {
  // Lista todos os pacientes cadastrados
  async allPatients(request, response) {
    try {
      const patients = await PatientModel.find()
      return response.status(200).json(patients)
    } catch (error) {
      return response.status(400).json({ error: 'Ocorreu algum erro ao encontrar todos os pacientes.' });
    }
  }

  // Pesquisar o paciente por ID
  async show(request, response) {
    try {
      const id = request.params.id;
      const patientId = await PatientModel.findById(id);

      if (!patientId) {
        return response.status(404).json({ error: 'Paciente não encontrado.' });
      }

      response.json(patientId);
    } catch (error) {
      response.status(500).json({ error: 'Erro ao buscar paciente por ID.' });
    }
  }

  // Criação de um usuário (paciente)
  async create(request, response) {
    let sum = 0;
    let remainder;

    const {
      name, email, cpf, address, phone, reason,
    } = request.body;

    try {
      // Verificar se o CPF é válido
      for (let i = 0; i <= 9; i++) {
        sum += Number(cpf.substring(i - 1, i)) * (11 - i);
      }
      remainder = (sum * 10) % 11;

      if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
      }

      if (remainder !== Number(cpf.substring(9, 10))) {
        return response.status(400).json({ error: 'CPF inválido!' });
      }
      sum = 0;

      for (let i = 0; i <= 10; i++) {
        sum += Number(cpf.substring(i - 1, i)) * (12 - i);
      }
      remainder = (sum * 10) % 11;

      if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
      }

      if (remainder !== Number(cpf.substring(10, 11))) {
        return response.status(400).json({ error: 'CPF inválido!' });
      }

      if (cpf.length !== 11 || !Array.from(cpf).filter((e) => e !== cpf[0]).length) {
        return response.status(400).json({ error: 'CPF inválido!' });
      }
    } catch (error) {
      return response.status(400).json({ error: 'Ocorreu algum erro ao verificar o CPF.' });
    }

    const { error } = schema.validate({
      name, cpf, address, reason
    });

    if (error || !name || !cpf || !address || !reason) {
      return response.status(400).json({ error: 'Preencha os campos obrigatórios: Nome, Endereço, CPF e Motivo da Consulta.' });
    }

    // Verifica se o cpf já está cadastrado (Irá fazer uma verificação no banco de dados e informar se o paciente já tem um cadastro)
    const cpfPatient = await PatientModel.findOne({ cpf: cpf });

    if (cpfPatient) {
      return response.json({ error: 'CPF já está cadastrado.' });
    }

    // Caso as validações estajam tudo corretas cria um novo usuário
    const createPatient = await PatientModel.create({
      name, email, cpf, address, phone, reason
    });

    response.status(201).json(createPatient);
  }

  // Deletar usuário (paciente)
  async delete(request, response) {
    try {
      const id = request.params.id;
      const patient = await PatientModel.findById(id);

      if (!patient) {
        return response.status(404).json({ error: 'Paciente não encontrado.' });
      }

      await PatientModel.findByIdAndDelete(id);

      response.status(200).json({ msg: 'Paciente deletado!' });
    } catch (error) {
      response.status(500).json({ error: 'Erro ao deletar paciente.' });
    }
  }

  async update(request, response) {
    let sum = 0;
    let remainder;

    try {
      const id = request.params.id;
      const { name, email, cpf, address, reason } = request.body;

      // Verificar se o CPF é válido
      for (let i = 0; i <= 9; i++) {
        sum += Number(cpf.substring(i - 1, i)) * (11 - i);
      }
      remainder = (sum * 10) % 11;

      if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
      }

      if (remainder !== Number(cpf.substring(9, 10))) {
        return response.status(400).json({ error: 'CPF inválido!' });
      }
      sum = 0;

      for (let i = 0; i <= 10; i++) {
        sum += Number(cpf.substring(i - 1, i)) * (12 - i);
      }
      remainder = (sum * 10) % 11;

      if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
      }

      if (remainder !== Number(cpf.substring(10, 11))) {
        return response.status(400).json({ error: 'CPF inválido!' });
      }

      if (cpf.length !== 11 || !Array.from(cpf).filter((e) => e !== cpf[0]).length) {
        return response.status(400).json({ error: 'CPF inválido!' });
      }

      const { error } = schema.validate({
        name, email, cpf, address, reason,
      });

      if (error || !name || !cpf || !address || !reason) {
        return response.status(400).json({ error: 'Preencha todos os campos.' });
      }

      // Encontra e atualiza os dados do paciente
      const updatedPatient = await PatientModel.findByIdAndUpdate(id, request.body, { new: true });

      if (!updatedPatient) {
        return response.status(404).json({ error: 'Paciente não encontrado.' });
      }

      response.status(200).json(updatedPatient);
    } catch (error) {
      response.status(500).json({ error: 'Erro ao atualizar dados do paciente.' });
    }
  }
}

module.exports = new PatientController();
