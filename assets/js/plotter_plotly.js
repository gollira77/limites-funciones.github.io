// plotter_plotly.js
// Uso: plotFunction(obj, 'idDelContenedor')
// obj = { expr: 'string', fn: Function, x0: número (opcional) }

function plotFunction(obj, targetId) {
  const { expr = 'f(x)', fn, x0 } = obj || {};
  const el = document.getElementById(targetId);
  if (!el) {
    console.warn('plotFunction: target element not found:', targetId);
    return;
  }

  // Grid / rango
  const N = 700;
  const pad = 5; // +/- alrededor de x0
  const center = (typeof x0 === 'number') ? x0 : 0;
  const left = center - pad;
  const right = center + pad;

  // Muestreamos la función en una malla y usamos `null` para los puntos no finitos
  const xs = new Array(N);
  const ys = new Array(N);
  for (let i = 0; i < N; i++) {
    const x = left + (right - left) * (i / (N - 1));
    xs[i] = x;
    let y = null;
    try {
      const v = fn(x);
      // filtramos valores no finitos y valores demasiado grandes
      if (Number.isFinite(v) && Math.abs(v) <= 1e6) y = v;
    } catch (e) {
      y = null;
    }
    ys[i] = y;
  }

  // calculamos min/max razonables a partir de valores finitos
  const finiteYs = ys.filter(v => v !== null && Number.isFinite(v));
  let yMin = finiteYs.length ? Math.min(...finiteYs) : -10;
  let yMax = finiteYs.length ? Math.max(...finiteYs) : 10;
  if (yMin === yMax) { yMin -= 1; yMax += 1; }
  const yPad = (yMax - yMin) * 0.15;
  yMin -= yPad; yMax += yPad;

  // aproximaciones por izquierda/derecha
  const h = Math.max((right - left) / 1000, 1e-6);
  let leftVal = null, rightVal = null;
  try {
    const vL = fn(center - h);
    if (Number.isFinite(vL) && Math.abs(vL) <= 1e6) leftVal = vL;
  } catch (e) { /* ignore */ }
  try {
    const vR = fn(center + h);
    if (Number.isFinite(vR) && Math.abs(vR) <= 1e6) rightVal = vR;
  } catch (e) { /* ignore */ }

  const approxEqual = (a, b, eps = 1e-2) => (a !== null && b !== null && Math.abs(a - b) <= eps);

  // traza principal (las `null` en ys generan cortes en la curva)
  const traces = [{
    x: xs,
    y: ys,
    mode: 'lines',
    name: expr,
    hoverinfo: 'x+y',
    line: { width: 2 },
  }];

  // marcadores de aproximación (izq / der)
  if (leftVal !== null) {
    traces.push({
      x: [center - h],
      y: [leftVal],
      mode: 'markers',
      name: 'lim- (aprox.)',
      marker: { symbol: 'diamond-open', size: 10 },
      hovertemplate: 'x: %{x:.6f}<br>lim- ≈ %{y:.6f}<extra></extra>'
    });
  }
  if (rightVal !== null) {
    traces.push({
      x: [center + h],
      y: [rightVal],
      mode: 'markers',
      name: 'lim+ (aprox.)',
      marker: { symbol: 'diamond-open', size: 10 },
      hovertemplate: 'x: %{x:.6f}<br>lim+ ≈ %{y:.6f}<extra></extra>'
    });
  }

  // si las aproximaciones coinciden, marcamos el límite aproximado en x0
  if (approxEqual(leftVal, rightVal) && leftVal !== null) {
    const mid = (leftVal + rightVal) / 2;
    traces.push({
      x: [center],
      y: [mid],
      mode: 'markers',
      name: 'límite (aprox.)',
      marker: { symbol: 'circle-open', size: 14 },
      hovertemplate: `x: ${center}<br>lim ≈ %{y:.6f}<extra></extra>`
    });
  }

  // shapes / anotaciones (línea vertical y textos)
  const shapes = [];
  const annotations = [];

  // línea vertical en x0 para indicar el punto de interés
  if (typeof center === 'number') {
    shapes.push({
      type: 'line',
      xref: 'x',
      yref: 'paper',
      x0: center,
      x1: center,
      y0: 0,
      y1: 1,
      line: { color: '#888', width: 1, dash: 'dot' }
    });
    annotations.push({
      x: center,
      y: 1,
      xref: 'x',
      yref: 'paper',
      xanchor: 'left',
      yanchor: 'bottom',
      text: `x → ${center}`,
      showarrow: false,
      font: { size: 12, color: '#333' }
    });
  }

  // anotaciones numéricas
  if (leftVal !== null) {
    annotations.push({
      x: center - h,
      y: leftVal,
      text: `lim- ≈ ${Number(leftVal).toFixed(4)}`,
      showarrow: true,
      ax: -20,
      ay: -30
    });
  }
  if (rightVal !== null) {
    annotations.push({
      x: center + h,
      y: rightVal,
      text: `lim+ ≈ ${Number(rightVal).toFixed(4)}`,
      showarrow: true,
      ax: 20,
      ay: -30
    });
  }
  if (approxEqual(leftVal, rightVal) && leftVal !== null) {
    annotations.push({
      x: center,
      y: (leftVal + rightVal) / 2,
      text: `lim ≈ ${Number(((leftVal + rightVal) / 2)).toFixed(4)}`,
      showarrow: true,
      ax: 0,
      ay: -40
    });
  }

  const layout = {
    title: expr,
    xaxis: { title: 'x', range: [left, right], zeroline: true },
    yaxis: { title: 'f(x)', range: [yMin, yMax], zeroline: true },
    shapes,
    annotations,
    margin: { t: 50, l: 60, r: 20, b: 50 },
    legend: { orientation: 'h', y: -0.2 }
  };

  // graficar (Plotly manejará el clearing)
  Plotly.newPlot(el, traces, layout, { responsive: true });
}
