function floydWarshall(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const V = rows * cols;
    const dist = Array.from({ length: V }, () => Array(V).fill(Infinity));

    // 函数将二维坐标转换为一维索引
    function getIndex(x, y) {
        return x * cols + y;
    }

    // 初始化距离矩阵
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const index = getIndex(i, j);
            if (grid[i][j] === 1) continue; // 跳过障碍物
            dist[index][index] = 0;
            const neighbors = [
                [i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]
            ];
            for (const [ni, nj] of neighbors) {
                if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj] === 0) {
                    const neighborIndex = getIndex(ni, nj);
                    dist[index][neighborIndex] = 1; // 假设相邻节点之间的距离为1
                }
            }
        }
    }

    // 应用 Floyd-Warshall 算法
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    return dist;
}

// 使用示例
const grid = [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
];

const distances = floydWarshall(grid);
// console.log(distances);

// 获取任意两个点之间的最短路径距离
function getShortestPathDistance(dist, rows, cols, start, end) {
    const startIndex = start[0] * cols + start[1];
    const endIndex = end[0] * cols + end[1];
    return dist[startIndex][endIndex];
}

// 示例：计算从 (0, 0) 到 (4, 3) 的最短路径距离
const start = [0, 0];
const end = [4, 2];
const distance = getShortestPathDistance(distances, grid.length, grid[0].length, start, end);
console.log(`Shortest path distance from ${start} to ${end} is ${distance}`);
