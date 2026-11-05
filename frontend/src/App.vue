<script setup>
import { ref, watch } from 'vue';
import { criarMatriz } from './petriLogic.js';

// Define o tamanho inicial como 10 (10x10), conforme o exemplo da especificação
const tamanhoGrade = ref(10);

// Estado reativo que guarda a matriz atual na memória do Vue
const matriz = ref(criarMatriz(tamanhoGrade.value));

// Controla se o usuário pode clicar nas células para editar o padrão
const modoEdicao = ref(true);

// Observador (Watcher): sempre que o usuário mudar o número do tamanho, recria a matriz automaticamente
watch(tamanhoGrade, (novoTamanho) => {
  // Limita o tamanho entre 5x5 e 50x50 para evitar travamentos visuais
  if (novoTamanho >= 5 && novoTamanho <= 50) {
    matriz.value = criarMatriz(novoTamanho);
  }
});

// RF02: Alterna o estado da célula (Viva <-> Morta) ao clicar
function alternarCelula(linha, coluna) {
  if (!modoEdicao.value) return;
  matriz.value[linha][coluna] = matriz.value[linha][coluna] === 1 ? 0 : 1;
}
</script>

<template>
  <main class="container">
    <h1>Simulador de Placa de Petri</h1>

    <!-- Painel de Configuração de Tamanho e Edição -->
    <section class="painel-config">
      <label for="input-tamanho">
        Tamanho da Matriz ({{ tamanhoGrade }}x{{ tamanhoGrade }}):
      </label>
      <input
        id="input-tamanho"
        type="number"
        v-model.number="tamanhoGrade"
        min="5"
        max="50"
      />

      <button
        type="button"
        :class="['btn-edicao', { ativo: modoEdicao }]"
        @click="modoEdicao = !modoEdicao"
      >
        {{ modoEdicao ? '🔓 Edição Liberada' : '🔒 Edição Bloqueada' }}
      </button>
    </section>

    <!-- RF01: Exibição da Grade Bidimensional -->
    <section
      class="grade-petri"
      :style="{ gridTemplateColumns: `repeat(${matriz.length}, 1fr)` }"
    >
      <template v-for="(linha, indexLinha) in matriz" :key="indexLinha">
        <div
          v-for="(celula, indexColuna) in linha"
          :key="`${indexLinha}-${indexColuna}`"
          :class="['celula', { viva: celula === 1, editavel: modoEdicao }]"
          @click="alternarCelula(indexLinha, indexColuna)"
        ></div>
      </template>
    </section>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.painel-config {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.painel-config input {
  width: 70px;
  padding: 6px;
  font-size: 1rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-edicao {
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

.btn-edicao.ativo {
  background-color: #28a745;
}

/* Estilização da grade seguindo o visual da especificação */
.grade-petri {
  display: grid;
  width: min(80vw, 550px);
  height: min(80vw, 550px);
  background-color: #9e9e9e;
  gap: 1px;
  border: 2px solid #555;
}

.celula {
  background-color: #808080; /* Cinza para célula morta */
  width: 100%;
  height: 100%;
  transition: background-color 0.1s ease;
}

.celula.editavel {
  cursor: pointer;
}

.celula.editavel:hover {
  filter: brightness(1.15);
}

.celula.viva {
  background-color: #ffff00; /* Amarelo vibrante para célula viva */
}
</style>