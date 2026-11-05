const express = require('express');
const path = require('path');

const app = express();

// Faz o Express servir os arquivos estáticos gerados pelo build do Vue
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Garante que qualquer acesso na raiz entregue o index.html do Vue
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});