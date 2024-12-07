export async function carregarPaises() {
    try {
        const response = await fetch('./paises.json');
        if (!response.ok) throw new Error('Não foi possível carregar os dados dos países.');

        const paises = await response.json();
        const select = document.getElementById('paisSelect');


        // Uso de destructuring
        paises.forEach(({ nome_pais, gentilico, nome_pais_int, sigla }, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = nome_pais;
            select.appendChild(option);
        });

        select.addEventListener('change', () => {
            const infoDiv = document.getElementById('infoPais');
            const index = select.value;

            if (index === "") {
                infoDiv.innerHTML = "<p>Por favor, selecione um país.</p>";
                return;
            }

            const paisSelecionado = paises[index];
            infoDiv.innerHTML = `
                <h2>País: ${paisSelecionado.nome_pais}</h2>
                <p><strong>Gentílico:</strong> ${paisSelecionado.gentilico}</p>
                <p><strong>Nome Internacional:</strong> ${paisSelecionado.nome_pais_int}</p>
                <p><strong>Sigla:</strong> ${paisSelecionado.sigla}</p>
            `;
        });
    } catch (error) {
        console.error('Erro ao carregar os países:', error);
        document.getElementById('infoPais').innerHTML = '<p class="error">Erro ao carregar os dados dos países.</p>';
    }
}

export async function listarTodosNCMs() {
    try {
        const response = await fetch('https://brasilapi.com.br/api/ncm/v1');
        if (!response.ok) throw new Error('Erro ao listar todos os NCMs');
        const data = await response.json();
        exibirTabela(data);
    } catch (error) {
        console.error('Erro ao listar NCMs:', error);
        exibirErro('Erro ao conectar à API para listar todos os NCMs.');
    }
}

export async function pesquisarPorCodigo(codigo) {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/ncm/v1/${codigo}`);
        if (!response.ok) throw new Error('Nenhum NCM encontrado para o código fornecido.');
        const data = await response.json();
        exibirTabela([data]);
    } catch (error) {
        console.error('Erro ao buscar NCM por código:', error);
        exibirErro('Erro ao conectar à API para consulta por código.');
    }
}

export async function pesquisarPorDescricao(descricao) {
    try {
        const response = await fetch('https://brasilapi.com.br/api/ncm/v1');
        if (!response.ok) throw new Error('Erro ao listar todos os NCMs');
        const data = await response.json();
        const resultados = data.filter(item =>
            item.descricao.toLowerCase().includes(descricao.toLowerCase())
        );
        if (resultados.length > 0) {
            exibirTabela(resultados);
        } else {
            exibirErro('Nenhum NCM encontrado para a descrição fornecida.');
        }
    } catch (error) {
        console.error('Erro ao buscar NCM por descrição:', error);
        exibirErro('Erro ao conectar à API para consulta por descrição.');
    }
}

function exibirTabela(data) {
    const resultadoDiv = document.getElementById('resultado');
    if (data.length === 0) {
        resultadoDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    const tabela = `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Descrição</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(({ codigo, descricao }) => `
                    <tr>
                        <td>${codigo}</td>
                        <td>${descricao}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    resultadoDiv.innerHTML = tabela;
}

function exibirErro(mensagem) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p class="text-danger">${mensagem}</p>`;
}
