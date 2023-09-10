import { Root } from "../../components/root.mjs";
import { Table } from "../../components/table.mjs";
import { readStream } from "../../helpers/stream-reader.mjs";

async function handle() {
  const { body } = await fetch(
    "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.295713&lon=9.002495",
    {
      headers: {
        Origin: "bjarkum.no github.com/sondrebjarkum",
      },
    }
  );

  if (!body) {
    console.log("error fetching");
    return new Response("error");
  }

  const yrApiResponse = await readStream(body);

  const longTermForecast = true;

  const forecastDocument = Root(Table(yrApiResponse, longTermForecast));

  return forecastDocument;
}
const langtid = {
  handle,
};

export default langtid;
