export function criarMatriz(tamanho) {
    return Array.from({ length: tamanho }, () => Array(tamanho).fill(0));
}

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
                    mortas++; 
                }
            } else {
                if (vizinhos === 3) {
                    proximaMatriz[l][c] = 1;
                    nascidas++; 
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

export function contarCelulasVivas(matriz) {
    let total = 0;
    for (let l = 0; l < matriz.length; l++) {
        for (let c = 0; c < matriz[l].length; c++) {
            total += matriz[l][c];
        }
    }
    return total;
}