// 1. Cria uma matriz bidimensional NxN preenchida com 0 (células mortas)
export function criarMatriz(tamanho) {
    return Array.from({ length: tamanho }, () => Array(tamanho).fill(0));
}

// 2. Conta quantas das 8 células vizinhas estão vivas, respeitando as bordas finitas
export function contarVizinhosVivos(matriz, linha, coluna) {
    const tamanho = matriz.length;
    let vizinhosVivos = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            const linhaVizinha = linha + i;
            const colunaVizinha = coluna + j;

            if (
                linhaVizinha >= 0 &&
                linhaVizinha < tamanho &&
                colunaVizinha >= 0 &&
                colunaVizinha < tamanho
            ) {
                vizinhosVivos += matriz[linhaVizinha][colunaVizinha];
            }
        }
    }

    return vizinhosVivos;
}

// 3. Calcula a próxima geração e retorna métricas de nascimentos e mortes da iteração
export function calcularProximaGeracao(matrizAtual) {
    const tamanho = matrizAtual.length;
    const proximaMatriz = criarMatriz(tamanho);
    let nascidas = 0;
    let mortas = 0;

    for (let l = 0; l < tamanho; l++) {
        for (let c = 0; c < tamanho; c++) {
            const estadoAtual = matrizAtual[l][c];
            const vizinhos = contarVizinhosVivos(matrizAtual, l, c);

            if (estadoAtual === 1) {
                if (vizinhos === 2 || vizinhos === 3) {
                    proximaMatriz[l][c] = 1;
                } else {
                    proximaMatriz[l][c] = 0;
                    mortas++; // Estava viva e morreu por isolamento (<2) ou superpopulação (>3)
                }
            } else {
                if (vizinhos === 3) {
                    proximaMatriz[l][c] = 1;
                    nascidas++; // Estava morta e nasceu por ter exatamente 3 vizinhas vivas
                }
            }
        }
    }

    return {
        proximaMatriz,
        nascidas,
        mortas
    };
}

// 4. Conta o total de células vivas na geração atual (RF08)
export function contarCelulasVivas(matriz) {
    let total = 0;
    for (let l = 0; l < matriz.length; l++) {
        for (let c = 0; c < matriz[l].length; c++) {
            total += matriz[l][c];
        }
    }
    return total;
}