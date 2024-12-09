import { carregarPaises, listarTodosNCMs, pesquisarPorCodigo, pesquisarPorDescricao } from './modules/funcoes.js';

document.addEventListener('DOMContentLoaded', () => {
    carregarPaises();

    document.getElementById('listarTodos').addEventListener('click', listarTodosNCMs);

    document.getElementById('consultaCodigoForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const codigo = document.getElementById('codigoInput').value.trim();
        if (codigo) {
            pesquisarPorCodigo(codigo);
        } else {
            exibirErro('Por favor, insira um código válido.');
        }
    });

    document.getElementById('consultaDescricaoForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const descricao = document.getElementById('descricaoInput').value.trim();
        if (descricao) {
            pesquisarPorDescricao(descricao);
        } else {
            exibirErro('Por favor, insira uma descrição válida.');
        }
    });
});

