export const multiply = (a, b) => {
    let aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);
    for (let r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols);
        for (let c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;
            for (let i = 0; i < aNumCols; ++i) {
                m[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return m;
}