<script setup>
import { onUnmounted } from 'vue';
import {
  tamanhoGrade,
  matriz,
  geracao,
  celulasVivas,
  celulasMortas,
  nascidasUltimaIteracao,
  mortasUltimaIteracao,
  simulando,
  modoEdicao,
  avisoParada,
  alternarCelula,
  iniciarSimulacao,
  pausarSimulacao,
  avancarPassoAPasso,
  reiniciarSimulacao
} from '../simulacaoStore.js';

onUnmounted(() => {
  pausarSimulacao();
});
</script>

<template>
  <div class="layout-simulador">
    <!-- Coluna Principal: Controles e Placa de Petri -->
    <section class="area-principal">
      <div class="painel-controles">
        <button
          type="button"
          class="btn btn-iniciar"
          :disabled="simulando"
          @click="iniciarSimulacao"
        >
          ▶ {{ geracao > 0 && !simulando ? 'Continuar' : 'Iniciar' }}
        </button>

        <button
          type="button"
          class="btn btn-pausar"
          :disabled="!simulando"
          @click="pausarSimulacao"
        >
          ⏸ Pausar
        </button>

        <button
          type="button"
          class="btn btn-passo"
          :disabled="simulando"
          @click="avancarPassoAPasso"
        >
          ⏭ Passo (+1)
        </button>

        <button
          type="button"
          class="btn btn-reiniciar"
          @click="reiniciarSimulacao"
        >
          🔄 Reiniciar
        </button>

        <button
          type="button"
          :class="['btn', 'btn-edicao', { ativo: modoEdicao }]"
          @click="modoEdicao = !modoEdicao"
        >
          {{ modoEdicao ? '✏️ Edição: ON' : '🔒 Edição: OFF' }}
        </button>
      </div>

      <!-- Alerta de Parada Automática (Equilíbrio ou Extinção) -->
      <div v-if="avisoParada" class="alerta-parada">
        {{ avisoParada }}
      </div>

      <!-- Grade Bidimensional (RF01) -->
      <div
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
      </div>
    </section>

    <!-- Painel Lateral de Estatísticas -->
    <aside class="painel-lateral">
      <h2>Estatísticas da Placa</h2>
      <p class="subtitulo-grade">Dimensão atual: {{ tamanhoGrade }}x{{ tamanhoGrade }}</p>

      <div class="lista-estatisticas">
        <div class="item-estatistica">
          <span class="rotulo">Iterações (Gerações)</span>
          <strong class="valor destaque-azul">{{ geracao }}</strong>
        </div>

        <div class="item-estatistica">
          <span class="rotulo">Células Vivas</span>
          <strong class="valor destaque-verde">{{ celulasVivas }}</strong>
        </div>

        <div class="item-estatistica">
          <span class="rotulo">Células Mortas</span>
          <strong class="valor">{{ celulasMortas }}</strong>
        </div>

        <div class="item-estatistica">
          <span class="rotulo">Nasceram na última iteração</span>
          <strong class="valor destaque-nascimento">+{{ nascidasUltimaIteracao }}</strong>
        </div>

        <div class="item-estatistica">
          <span class="rotulo">Morreram na última iteração</span>
          <strong class="valor destaque-morte">-{{ mortasUltimaIteracao }}</strong>
        </div>
      </div>

      <router-link to="/configuracao" class="link-config">
        ⚙️ Alterar Tamanho da Matriz
      </router-link>
    </aside>
  </div>
</template>

<style scoped>
.layout-simulador {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 960px;
}

.area-principal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.painel-controles {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  background: #ffffff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.btn-iniciar { background-color: #28a745; }
.btn-pausar { background-color: #ffc107; color: #222; }
.btn-passo { background-color: #17a2b8; }
.btn-reiniciar { background-color: #dc3545; }
.btn-edicao { background-color: #6c757d; }
.btn-edicao.ativo { background-color: #007bff; }

.alerta-parada {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: bold;
  text-align: center;
  max-width: 520px;
}

.grade-petri {
  display: grid;
  width: min(80vw, 520px);
  height: min(80vw, 520px);
  background-color: #9e9e9e;
  gap: 1px;
  border: 2px solid #555;
}

.celula {
  background-color: #808080;
  width: 100%;
  height: 100%;
  transition: background-color 0.08s ease;
}

.celula.editavel { cursor: pointer; }
.celula.editavel:hover { filter: brightness(1.15); }
.celula.viva { background-color: #ffff00; }

/* Painel Lateral */
.painel-lateral {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.painel-lateral h2 {
  font-size: 1.2rem;
  color: #222;
}

.subtitulo-grade {
  font-size: 0.9rem;
  color: #666;
  margin-top: -10px;
}

.lista-estatisticas {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item-estatistica {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #ccc;
}

.item-estatistica .rotulo {
  font-size: 0.85rem;
  color: #555;
}

.item-estatistica .valor {
  font-size: 1.2rem;
  color: #222;
}

.destaque-azul { color: #007bff !important; }
.destaque-verde { color: #28a745 !important; }
.destaque-nascimento { color: #17a2b8 !important; }
.destaque-morte { color: #dc3545 !important; }

.link-config {
  text-align: center;
  padding: 10px;
  background-color: #343a40;
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.9rem;
}

.link-config:hover {
  background-color: #23272b;
}
</style>