// Attempts to parse JSON even if the LLM wraps it in ```json code fences.
export function safeJsonParse(text) {
  if (!text) throw new Error('Empty LLM response');

  const codeFence = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const raw = codeFence ? codeFence[1] : text;

  try {
    return JSON.parse(raw);
  } catch (e) {
    // Try to salvage by trimming garbage before/after first/last braces
    const first = raw.indexOf('{');
    const last = raw.lastIndexOf('}');
    if (first !== -1 && last !== -1 && last > first) {
      const sliced = raw.slice(first, last + 1);
      return JSON.parse(sliced);
    }
    throw e;
  }
}