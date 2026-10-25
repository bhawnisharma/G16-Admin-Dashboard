// Owner: Harshpreet - SVG charts

const WIDTH = 260;
const HEIGHT = 140;
const PADDING = 20;

function toPoints(data) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = (WIDTH - PADDING * 2) / (data.length - 1);

  return data.map((value, i) => {
    const x = PADDING + i * step;
    const y = HEIGHT - PADDING - ((value - min) / range) * (HEIGHT - PADDING * 2);
    return [x, y];
  });
}

export function LineChart({ data, labels, color = "#4de1ff" }) {
  const points = toPoints(data);
  const pointsAttr = points.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mini-chart">
      <polyline points={pointsAttr} fill="none" stroke={color} strokeWidth="2" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={color} />
      ))}
      {labels.map((label, i) => (
        <text key={label} x={points[i][0]} y={HEIGHT - 4} className="mini-chart__label" textAnchor="middle">
          {label}
        </text>
      ))}
    </svg>
  );
}

export function BarChart({ data, labels, color = "#ffb84d" }) {
  const max = Math.max(...data);
  const barWidth = (WIDTH - PADDING * 2) / data.length - 6;

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mini-chart">
      {data.map((value, i) => {
        const barHeight = (value / max) * (HEIGHT - PADDING * 2);
        const x = PADDING + i * ((WIDTH - PADDING * 2) / data.length);
        const y = HEIGHT - PADDING - barHeight;
        return <rect key={i} x={x} y={y} width={barWidth} height={barHeight} rx="2" fill={color} />;
      })}
      {labels.map((label, i) => (
        <text
          key={label}
          x={PADDING + i * ((WIDTH - PADDING * 2) / data.length) + barWidth / 2}
          y={HEIGHT - 4}
          className="mini-chart__label"
          textAnchor="middle"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

export function DonutChart({ segments }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = 50;
  const cx = 65;
  const cy = 65;
  let startAngle = -90;

  const arcs = segments.map((segment) => {
    const angle = (segment.value / total) * 360;
    const endAngle = startAngle + angle;

    const start = polarToCartesian(cx, cy, radius, endAngle);
    const end = polarToCartesian(cx, cy, radius, startAngle);
    const largeArcFlag = angle > 180 ? 1 : 0;

    const path = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
    startAngle = endAngle;

    return { path, color: segment.color };
  });

  return (
    <div className="donut-wrapper">
      <svg viewBox="0 0 130 130" className="mini-chart mini-chart--donut">
        {arcs.map((arc, i) => (
          <path key={i} d={arc.path} stroke={arc.color} strokeWidth="20" fill="none" />
        ))}
      </svg>
      <div className="donut-legend">
        {segments.map((s) => (
          <span key={s.label} className="donut-legend__item">
            <i style={{ background: s.color }} /> {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

export function StackedAreaChart({ seriesA, seriesB, labels, colorA = "#4de1ff", colorB = "#ff4d8d" }) {
  const pointsA = toPoints(seriesA);
  const pointsB = toPoints(seriesB);

  const areaPath = (points) => {
    const top = points.map(([x, y]) => `${x},${y}`).join(" L ");
    const first = points[0];
    const last = points[points.length - 1];
    return `M ${first[0]},${HEIGHT - PADDING} L ${top} L ${last[0]},${HEIGHT - PADDING} Z`;
  };

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mini-chart">
      <path d={areaPath(pointsB)} fill={colorB} opacity="0.55" />
      <path d={areaPath(pointsA)} fill={colorA} opacity="0.75" />
      {labels.map((label, i) => (
        <text key={label} x={pointsA[i][0]} y={HEIGHT - 4} className="mini-chart__label" textAnchor="middle">
          {label}
        </text>
      ))}
    </svg>
  );
}
