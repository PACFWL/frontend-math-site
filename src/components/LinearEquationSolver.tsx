import { useState } from "react";
import { create, all } from "mathjs";

const math = create(all);

function extractLinearCoefficients(expr: string) {
  const f0 = Number(math.evaluate(expr, { x: 0 }));
  const f1 = Number(math.evaluate(expr, { x: 1 }));

  const a = f1 - f0;
  const b = f0;

  const clean = (n: number) => (Math.abs(n) < 1e-12 ? 0 : n);

  return {
    a: clean(a),
    b: clean(b),
  };
}

export default function LinearEquationSolver({ leftSide, rightSide }: any) {
  const [solution, setSolution] = useState<any>(null);
  const [steps, setSteps] = useState<string[]>([]);

  function solve() {
    try {
      const left = math.simplify(leftSide).toString();
      const right = math.simplify(rightSide).toString();

   
      const fullExpr = math.simplify(`(${left}) - (${right})`).toString();

    
      const { a, b } = extractLinearCoefficients(fullExpr);

      if (a === 0) {
        if (b === 0) {
          setSolution("Equação indeterminada (0 = 0)");
          setSteps([`0 = 0 → infinitas soluções`]);
        } else {
          setSolution("Equação impossível (sem solução)");
          setSteps([`${b} = 0 é falso → nenhuma solução`]);
        }
        return;
      }

      const x = -b / a;

      setSolution(`x = ${x}`);

      setSteps([
        `Expressão final: ${a}x + ${b} = 0`,
        `a = ${a}, b = ${b}`,
        `x = -b/a = ${x}`
      ]);

    } catch (err: any) {
      setSolution("Erro: " + err.message);
      setSteps([]);
    }
  }

  return (
    <div>
      <button onClick={solve}>Resolver equação de 1º grau</button>

      {solution && (
        <>
          <h2>{solution}</h2>
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