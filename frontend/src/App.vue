<template>
  <div class="app-wrapper">
    <header class="topo">
      <h1>Simulador de Placa de Petri</h1>
      <nav class="menu">
        <router-link to="/">🔬 Simulador</router-link>
        <router-link to="/configuracao">⚙️ Configurar Matriz</router-link>
      </nav>
    </header>

    <main class="conteudo">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
}

.topo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.menu {
  display: flex;
  gap: 12px;
}

.menu a {
  padding: 8px 16px;
  background: #ffffff;
  color: #333;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.menu a.router-link-exact-active {
  background: #007bff;
  color: #ffffff;
}

.conteudo {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>