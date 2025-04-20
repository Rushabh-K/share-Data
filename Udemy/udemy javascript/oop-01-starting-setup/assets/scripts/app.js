const productList = {
  product: [
    {
      title: "A Soft Pillow",
      price: 43,
      image: "url",
      description: "A soft pillow for childrens",
    },
    {
      title: "A Soft Blanket",
      price: 97,
      image: "url",
      description: "A soft Blanket for childrens",
    },
  ],
  render() {
    const renderHook = document.getElementById("app");
    const prodList = documenet.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.product) {
      const prodEl = document.createElement("li");
      prodEl.className = "product-item";
      productList.append(prodEl);
    }
    renderHook.append();
  },
};
