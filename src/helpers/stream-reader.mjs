export async function readStream(body) {
  const reader = body.getReader();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      return JSON.parse(result);
    }

    if (typeof value === "string") {
      result += value;
    } else {
      result += new TextDecoder().decode(value);
    }
  }
}
