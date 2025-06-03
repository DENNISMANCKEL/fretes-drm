
function doPost(e) {
  try {
    const dados = e.parameter;
    const sheet = SpreadsheetApp.openById("1pTJCUvm8BvWNqMK6wDqaEnKwPJBFVBd6QgzigW4U8SM").getSheetByName("FRETE");

    const dataHora = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm");

    sheet.appendRow([
      dados.origem || "",
      dados.destino || "",
      dados.veiculo || "",
      dados.tipo || "",
      dados.rastreado || "",
      dados.valor || "",
      dados.whatsapp || "",
      dados.observacao || "",
      dataHora,
      "Registrado"
    ]);

    return ContentService.createTextOutput("CARGA REGISTRADA COM SUCESSO.")
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (erro) {
    return ContentService.createTextOutput("Erro interno: " + erro)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet(e) {
  const sheet = SpreadsheetApp.openById("1pTJCUvm8BvWNqMK6wDqaEnKwPJBFVBd6QgzigW4U8SM").getSheetByName("FRETE");
  const dados = sheet.getDataRange().getValues().slice(1);

  const cargas = dados.map(row => ({
    origem: row[0],
    destino: row[1],
    veiculo: row[2],
    tipo: row[3],
    rastreado: row[4],
    valor: row[5],
    whatsapp: row[6],
    observacao: row[7]
  }));

  return ContentService.createTextOutput(JSON.stringify(cargas))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
}
