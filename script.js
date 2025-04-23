let pacientes = [];
    let medicos = [];
    let consultas = [];
    let usuarioLogado = null;
    
    const dadosIniciais = {
      pacientes: [
      { nome: "João Silva", cpf: "123.456.789-00", email: "joao.silva@example.com", senha: "senha123" },
      { nome: "Maria Souza", cpf: "987.654.321-00", email: "maria.souza@example.com", senha: "senha456" },
      { nome: "Carlos Pereira", cpf: "456.789.123-00", email: "carlos.pereira@example.com", senha: "senha789" },
      { nome: "Ana Oliveira", cpf: "321.654.987-00", email: "ana.oliveira@example.com", senha: "senhaabc" },
      { nome: "Fernando Lima", cpf: "654.321.987-00", email: "fernando.lima@example.com", senha: "senhalima" },
      { nome: "Juliana Santos", cpf: "789.123.456-00", email: "juliana.santos@example.com", senha: "senhasantos" },
      { nome: "Rafael Almeida", cpf: "999.888.777-00", email: "rafael.almeida@example.com", senha: "senhaalmeida" },
      { nome: "Camila Rodrigues", cpf: "888.777.666-00", email: "camila.rodrigues@example.com", senha: "senharodrigues" }

      ],
      medicos: [
      { nome: "Dr. José Almeida", crm: "1111", email: "jose.almeida@example.com", senha: "medico123" },
      { nome: "Dra. Ana Costa", crm: "2222", email: "ana.costa@example.com", senha: "medico456" },
      { nome: "Dr. Pedro Oliveira", crm: "3333", email: "pedro.oliveira@example.com", senha: "medico789" },
      { nome: "Dra. Carla Santos", crm: "4444", email: "carla.santos@example.com", senha: "medicobcd" },
      { nome: "Dr. Marcos Silva", crm: "5555", email: "marcos.silva@example.com", senha: "medicosilva" },
      { nome: "Dra. Luiza Fernandes", crm: "6666", email: "luiza.fernandes@example.com", senha: "medicofernandes" },
      { nome: "Dr. André Ribeiro", crm: "7777", email: "andre.ribeiro@example.com", senha: "medicoribeiro" },
      { nome: "Dra. Paula Mendes", crm: "8888", email: "paula.mendes@example.com", senha: "medicomendes" }
 ],
      admin: { email: "admin@admin.com", senha: "admin123" }
    };

    function carregarDadosIniciais() {
      pacientes = [...dadosIniciais.pacientes];
      medicos = [...dadosIniciais.medicos];
      atualizarSelects();
    }

    function atualizarSelects() {
      const selectPaciente = document.getElementById("selectPaciente");
      const selectMedico = document.getElementById("selectMedico");
      selectPaciente.innerHTML = pacientes.map(p => `<option value="${p.nome}">${p.nome}</option>`).join('');
      selectMedico.innerHTML = medicos.map(m => `<option value="${m.nome}">${m.nome}</option>`).join('');
    }

    function fazerLogin() {
      const email = document.getElementById("loginEmail").value;
      const senha = document.getElementById("loginSenha").value;

      if (email === dadosIniciais.admin.email && senha === dadosIniciais.admin.senha) {
        usuarioLogado = { nome: "Admin", tipo: "admin" };
        iniciarSessao();
      } else {
        const paciente = pacientes.find(p => p.email === email && p.senha === senha);
        if (paciente) {
          usuarioLogado = { nome: paciente.nome, tipo: "paciente" };
          iniciarSessao();
        } else {
          alert("Email ou senha inválidos.");
        }
      }
    }

    function iniciarSessao() {
      document.getElementById("login-container").style.display = "none";
      document.getElementById("main-container").style.display = "block";
      document.getElementById("usuarioNome").textContent = usuarioLogado.nome;

      if (usuarioLogado.tipo === "admin") {
        document.getElementById("adminOptions").style.display = "block";
      }

      carregarDadosIniciais();
    }

    function cadastrarPaciente() {
      const nome = document.getElementById("pacienteNome").value;
      const cpf = document.getElementById("pacienteCpf").value;
      const email = document.getElementById("pacienteEmail").value;
      const senha = document.getElementById("pacienteSenha").value;
      if (nome && cpf && email && senha) {
        pacientes.push({ nome, cpf, email, senha });
        atualizarSelects();
        alert("Paciente cadastrado!");
      }
    }

    function cadastrarMedico() {
      const nome = document.getElementById("medicoNome").value;
      const crm = document.getElementById("medicoCrm").value;
      const email = document.getElementById("medicoEmail").value;
      const senha = document.getElementById("medicoSenha").value;
      if (nome && crm && email && senha) {
        medicos.push({ nome, crm, email, senha });
        atualizarSelects();
        alert("Médico cadastrado!");
      }
    }

    function marcarConsulta() {
      const paciente = document.getElementById("selectPaciente").value;
      const medico = document.getElementById("selectMedico").value;
      const data = document.getElementById("data").value;
      const horario = document.getElementById("horario").value;
      if (paciente && medico && data && horario) {
        const consulta = { paciente, medico, data, horario, id: Date.now() };
        consultas.push(consulta);
        exibirConsultas();
        alert("Consulta marcada com sucesso!");
      } else {
        alert("Preencha todos os campos para marcar a consulta.");
      }
    }

    function exibirConsultas() {
      const lista = document.getElementById("listaConsultas");
      lista.innerHTML = '';
      consultas.forEach(c => {
        const div = document.createElement("div");
        div.className = "consulta";
        div.innerHTML = `
          <p><strong>Paciente:</strong> ${c.paciente}</p>
          <p><strong>Médico:</strong> ${c.medico}</p>
          <p><strong>Data:</strong> ${c.data}</p>
          <p><strong>Horário:</strong> ${c.horario}</p>
          <button class="remover" onclick="removerConsulta(${c.id})">Remover</button>
        `;
        lista.appendChild(div);
      });
    }

    function removerConsulta(id) {
      consultas = consultas.filter(c => c.id !== id);
      exibirConsultas();
    }

    function alternarModo() {
      document.body.classList.toggle("dark");
    }
  