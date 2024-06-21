import cheerio from "cheerio";

const trackingCTT = async (tracking) => {
  try {
    const response = await fetch(
      `https://www.trackingencomendas.com/api/get-estado.php?id=${tracking}&modo=online`
    );

    // Check the status code
    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const text = await response.text();
    const $ = cheerio.load(text);
    const respostaEncomenda = $("tr").eq(1).find("td");

    const estadoEncomenda = respostaEncomenda.eq(1).text();
    const mensagemEncomenda = respostaEncomenda
      .eq(respostaEncomenda.length - 3)
      .text();
    const localizacaoEncomenda = respostaEncomenda
      .eq(respostaEncomenda.length - 2)
      .text();

    return {
      estado_encomenda: estadoEncomenda,
      localizacao_encomenda: localizacaoEncomenda,
      mensagem_encomenda: mensagemEncomenda,
    };
  } catch (error) {
    console.error("Error fetching tracking data:", error.message);
    return { error: error.message };
  }
};

export default trackingCTT;
