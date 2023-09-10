import { Custom } from "../../components/custom-root.mjs";
import { Table } from "../../components/table.mjs";
import { readStream } from "../../helpers/stream-reader.mjs";

function validate(lat, lng) {
  let errors = [];
  if (!lat || !lat.includes(".")) {
    errors.push("could not interpret latitude.");
  }
  if (!lng || !lng.includes(".")) {
    errors.push("could not interpret longitude.");
  }
  if (errors.length > 0) {
    errors.push("Format should be a decimal number.");
  }
  return { isError: errors.length > 0, errors: errors };
}

async function handle({ lat, lng, city, country }) {
  const { isError, errors } = validate(lat, lng);

  if (isError) {
    let content = errors
      .map((error) => `<h2 style="color: red;">${error}</h2>`)
      .join("");

    content += "<p style='text-align: center'>example usage: /by/oslo</p>";

    return Custom(content, "Noe gikk galt.");
  }

  const { body, status } = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lng}`,
    {
      headers: {
        Origin: "bjarkum.no github.com/sondrebjarkum",
      },
    }
  );

  if (status > 203) {
    console.log("error fetching");
    return new Response("Error with YR");
  }

  const yrApiResponse = await readStream(body);

  const longTermForecast = true;

  const forecastDocument = Custom(
    Table(yrApiResponse, longTermForecast),
    `Værvarsel for ${city}, ${country}`
  );

  return forecastDocument;
}
const by = {
  handle,
};

export default by;
