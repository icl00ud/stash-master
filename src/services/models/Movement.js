class Movimentacao {
  constructor(idMovement, date, product, type, quantity, origin, destination) {
    if (idMovement === null || idMovement === undefined || idMovement === "")
      throw new Error("Id Inválido!");

    if (date === null || date === undefined || date === "")
      throw new Error("Data Inválida!");

    if (product === null || product === undefined || product === "")
      throw new Error("Produto Inválido!");

    if (type === null || type === undefined || type === "")
      throw new Error("Tipo Inválido!");

    if (quantity === null || quantity === undefined || quantity === "")
      throw new Error("Quantidade Inválida!");

    if (origin === null || origin === undefined || origin === "")
      throw new Error("Origem Inválida!");

    if (destination === null || destination === undefined || destination === "")
      throw new Error("Destino Inválido!");

    this.idMovement = idMovement;
    this.date = date;
    this.product = product;
    this.type = type;
    this.quantity = quantity;
    this.origin = origin;
    this.destination = destination;
  }
}

module.exports = {
    Movimentacao
};
