import { ref, computed } from 'vue';
import {
  criarMatriz,
  calcularProximaGeracao,
  contarCelulasVivas
} from './petriLogic.js';

// Estado global reativo
export const tamanhoGrade = ref(10);
export const matriz = ref(criarMatriz(tamanhoGrade.value));
export const geracao = ref(0);
export const nascidasUltimaIteracao = ref(0);
export const mortasUltimaIteracao = ref(0);
export const simulando = ref(false);
export const modoEdicao = ref(true);
export const avisoParada = ref('');

let intervaloId = null;

// Estatísticas calculadas automaticamente para o painel lateral
export const celulasVivas = computed(() => contarCelulasVivas(matriz.value));
export const totalCelulas = computed(() => tamanhoGrade.value * tamanhoGrade.value);
export const celulasMortas = computed(() => totalCelulas.value - celulasVivas.value);

export function alterarTamanhoMatriz(novoTamanho) {
  const tamanhoValido = Math.max(5, Math.min(50, Number(novoTamanho) || 10));
  pausarSimulacao();
  tamanhoGrade.value = tamanhoValido;
  matriz.value = criarMatriz(tamanhoValido);
  geracao.value = 0;
  nascidasUltimaIteracao.value = 0;
  mortasUltimaIteracao.value = 0;
  avisoParada.value = '';
}

export function alternarCelula(linha, coluna) {
  if (!modoEdicao.value) return;
  avisoParada.value = '';
  matriz.value[linha][coluna] = matriz.value[linha][coluna] === 1 ? 0 : 1;
}

export function evoluirUmaGeracao() {
  const resultado = calcularProximaGeracao(matriz.value);

  matriz.value = resultado.proximaMatriz;
  nascidasUltimaIteracao.value = resultado.nascidas;
  mortasUltimaIteracao.value = resultado.mortas;
  geracao.value++;

  // Verifica condições de parada automática
  if (celulasVivas.value === 0) {
    pausarSimulacao();
    avisoParada.value = 'Simulação encerrada automaticamente: todas as células morreram (extinção).';
  } else if (resultado.nascidas === 0 && resultado.mortas === 0) {
    pausarSimulacao();
    avisoParada.value = 'Simulação encerrada automaticamente: o padrão estabilizou (nenhuma célula nasceu ou morreu).';
  }
}

export function iniciarSimulacao() {
  if (simulando.value) return;
  if (celulasVivas.value === 0) {
    avisoParada.value = 'Selecione ao menos uma célula viva antes de iniciar.';
    return;
  }

  avisoParada.value = '';
  simulando.value = true;
  modoEdicao.value = false;

  intervaloId = setInterval(() => {
    evoluirUmaGeracao();
  }, 350);
}

export function pausarSimulacao() {
  simulando.value = false;
  if (intervaloId) {
    clearInterval(intervaloId);
    intervaloId = null;
  }
}

export function avancarPassoAPasso() {
  pausarSimulacao();
  avisoParada.value = '';
  evoluirUmaGeracao();
}

export function reiniciarSimulacao() {
  pausarSimulacao();
  matriz.value = criarMatriz(tamanhoGrade.value);
  geracao.value = 0;
  nascidasUltimaIteracao.value = 0;
  mortasUltimaIteracao.value = 0;
  avisoParada.value = '';
  modoEdicao.value = true;
}