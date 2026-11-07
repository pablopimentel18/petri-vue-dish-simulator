<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { tamanhoGrade, alterarTamanhoMatriz } from '../simulacaoStore.js';

const router = useRouter();
const novoTamanho = ref(tamanhoGrade.value);

function salvarConfiguracao() {
  alterarTamanhoMatriz(novoTamanho.value);
  router.push('/');
}
</script>

<template>
  <section class="card-configuracao">
    <h2>Configuração da Placa de Petri</h2>
    <p>
      Defina a dimensão da grade bidimensional (N x N). Alterar o tamanho reiniciará a placa atual.
    </p>

    <form @submit.prevent="salvarConfiguracao" class="form-config">
      <div class="campo">
        <label for="input-dimensao">
          Dimensão da Matriz ({{ novoTamanho }}x{{ novoTamanho }} = {{ novoTamanho * novoTamanho }} células):
        </label>
        <input
          id="input-dimensao"
          type="number"
          v-model.number="novoTamanho"
          min="5"
          max="50"
          required
        />
      </div>

      <!-- Botões de atalho rápido -->
      <div class="atalhos-tamanho">
        <button type="button" @click="novoTamanho = 10">10x10 (Padrão)</button>
        <button type="button" @click="novoTamanho = 20">20x20 (Médio)</button>
        <button type="button" @click="novoTamanho = 35">35x35 (Grande)</button>
      </div>

      <div class="acoes">
        <router-link to="/" class="btn-voltar">Cancelar</router-link>
        <button type="submit" class="btn-salvar">Aplicar e Voltar ao Jogo</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.card-configuracao {
  background: #ffffff;
  padding: 28px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-configuracao p {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.4;
}

.form-config {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.campo label {
  font-weight: bold;
  font-size: 0.9rem;
}

.campo input {
  padding: 10px;
  font-size: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.atalhos-tamanho {
  display: flex;
  gap: 8px;
}

.atalhos-tamanho button {
  flex: 1;
  padding: 8px;
  background: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.atalhos-tamanho button:hover {
  background: #dde2e6;
}

.acoes {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}

.btn-voltar {
  padding: 10px 16px;
  background: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
}

.btn-salvar {
  flex: 1;
  padding: 10px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
</style>