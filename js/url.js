const products = [
    {
      name: "Quạt tản nhiệt Montech AX140 PWM ARGB",
      price: 399000,
      image: "https://nvs.tn-cdn.net/2024/04/quat-tan-nhiet-montech-ax140-pwm-argb-5.jpg"
    },

    {
      name: "Bộ 3 Quạt Tản Nhiệt ASUS TUF GAMING TF120 ARGB",
      price: 950000,
      image: "https://lh3.googleusercontent.com/BtdZ75gaTnzy_5dHWu-pdNAnYF6oSz8oXg6SEjDE-kUqQvXCYKC8Ip_sKitsuQJscce884fBaBJSvSeEXfY-wqu9hLZLhZ6R4g"
    },

    {
      name: "Quạt TảN NhiệT CPU Cho ASUS TUF Gaming A15",
      price: 800000,
      image: "https://bizweb.dktcdn.net/100/503/563/products/7083892f-7d96-452c-aa36-4cb981963812-1716889275000.jpg?v=1724691980777"
    },

    {
      name: "AL19 - Quạt Tản Nhiệt Sò Lạnh Từ Tính | Đèn LED RGB Gaming",
      price: 299000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRghlwzXvxmCMyO9hspIKw2a2aijFeeVkohaQ&s"
    },
  ];
  
  products.forEach(product => {
    const html = `
  <img src="${product.image}" alt="#">
  <p><strong>${product.name}</strong></p>
  <p class="gia"><strong>${product.price.toLocaleString()}đ</strong></p>
  <div class="giohang">
      <a href="" class="themgio">
          <input onclick="addToCart('${product.name}', ${product.price}, '${product.image}')" type="submit" value="THÊM VÀO GIỎ">
      </a>
      <a href="../html/chitiet.html?name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&price=${product.price}" class="xemct">
          <input type="submit" value="Xem Chi Tiết">
      </a>
  </div>\n`;
  
    console.log(html);
  });