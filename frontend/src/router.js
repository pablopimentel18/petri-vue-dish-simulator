import { createRouter, createWebHistory } from 'vue-router';
import SimuladorView from './views/SimuladorView.vue';
import ConfiguracaoView from './views/ConfiguracaoView.vue';

const routes = [
  { path: '/', name: 'simulador', component: SimuladorView },
  { path: '/configuracao', name: 'configuracao', component: ConfiguracaoView }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});