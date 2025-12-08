import { useState } from "react";
import { create, all } from "mathjs";

const math = create(all);

function extractCoefficients(exprStr: string) {
  const f0 = Number(math.evaluate(exprStr, { x: 0 }));
  const f1 = Number(math.evaluate(exprStr, { x: 1 }));
  const fm1 = Number(math.evaluate(exprStr, { x: -1 }));

  const a = (f1 + fm1 - 2 * f0) / 2;
  const b = (f1 - fm1) / 2;
  const c = f0;

  const clean = (n: number) => (Math.abs(n) < 1e-12 ? 0 : n);

  return {
    a: clean(a),
    b: clean(b),
    c: clean(c)
  };
}

export default function QuadraticEquationSolver({
  leftSide,
  rightSide
}: {
  leftSide: string;
  rightSide: string;
}) {
  const [solution, setSolution] = useState<any>(null);
  const [steps, setSteps] = useState<string[]>([]);

  function solveQuadratic() {
    try {
 
      const left = math.simplify(leftSide).toString();
      const right = math.simplify(rightSide).toString();

     
      const fullExpr = math.simplify(`(${left}) - (${right})`).toString();

     
      const { a, b, c } = extractCoefficients(fullExpr);

      if (a === 0) {
        throw new Error("a = 0 — esta equação não é de segundo grau.");
      }

      const delta = b * b - 4 * a * c;

      let x1: number;
      let x2: number | undefined;

      if (delta < 0) {
        setSolution("Sem raízes reais");
        setSteps([
          `Forma padrão: ${a}x² + ${b}x + ${c} = 0`,
          `Δ = ${b}² - 4·${a}·${c} = ${delta}`,
          `Δ < 0 → não existem raízes reais`
        ]);
        return;
      }

      if (delta === 0) {
        x1 = -b / (2 * a);
        setSolution([x1]);
      } else {
        x1 = (-b + Math.sqrt(delta)) / (2 * a);
        x2 = (-b - Math.sqrt(delta)) / (2 * a);
        setSolution([x1, x2]);
      }

      const explanation = [
        `Forma padrão: ${a}x² + ${b}x + ${c} = 0`,
        `a = ${a}, b = ${b}, c = ${c}`,
        `Δ = b² - 4ac = ${delta}`,
        `Fórmula: x = (-b ± √Δ) / (2a)`
      ];

      if (delta === 0) {
        explanation.push(`x = (-${b}) / (2·${a}) = ${x1}`);
      } else {
        explanation.push(`x₁ = (-${b} + √${delta}) / (2·${a}) = ${x1}`);
        explanation.push(`x₂ = (-${b} - √${delta}) / (2·${a}) = ${x2}`);
      }

      setSteps(explanation);

    } catch (err: any) {
      setSolution("Erro: " + err.message);
      setSteps([]);
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={solveQuadratic}>
        Resolver equação de 2º grau
      </button>

      {solution && (
        <>
          <h2>Resultado: {JSON.stringify(solution)}</h2>
          <ul>
            {steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}