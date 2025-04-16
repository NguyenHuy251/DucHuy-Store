document.addEventListener('DOMContentLoaded', function () {
    const addProductButton = document.getElementById('addProduct');
    const productForm = document.getElementById('productForm');
    const productTableBody = document.querySelector('#productManagement table tbody');

    // Load products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    savedProducts.forEach(product => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="#" class="np-image"></td>
            <td>${product.name}</td>
            <td>${Number(product.price).toLocaleString()}đ</td>
            <td>
                <button class="edit-product"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-product"><i class="fa-solid fa-xmark"></i></button>
            </td>
        `;
        productTableBody.appendChild(newRow);
    });

    if (addProductButton && productForm) {
        addProductButton.addEventListener('click', function () {
            productForm.style.display = productForm.style.display === 'none' || productForm.style.display === '' ? 'block' : 'none';
        });
    }

    // Add product functionality
    productForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const productID = document.getElementById('productID').value;
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').files[0];
        const productImageURL = document.getElementById('productImageURL').value;

        // Check for duplicate ID or name
        const isDuplicateID = savedProducts.some(product => product.id === productID);
        const isDuplicateName = savedProducts.some(product => product.name === productName);

        if (isDuplicateID) {
            alert('ID sản phẩm đã tồn tại. Vui lòng nhập ID khác.');
            return;
        }

        if (isDuplicateName) {
            alert('Tên sản phẩm đã tồn tại. Vui lòng nhập tên khác.');
            return;
        }

        const imageSrc = productImage ? URL.createObjectURL(productImage) : productImageURL;

        const newProduct = { id: productID, name: productName, price: productPrice, image: imageSrc };
        savedProducts.push(newProduct);
        localStorage.setItem('products', JSON.stringify(savedProducts));

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${productID}</td>
            <td><img src="${imageSrc}" alt="#" class="np-image"></td>
            <td>${productName}</td>
            <td>${Number(productPrice).toLocaleString()}đ</td>
            <td>
                <button class="edit-product"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-product"><i class="fa-solid fa-xmark"></i></button>
            </td>
        `;
        productTableBody.appendChild(newRow);
        productForm.reset();
        productForm.style.display = 'none';
    });

    // Add event listeners for edit and delete actions in product table
    const productTable = document.querySelector('#productManagement table tbody');
    productTable.addEventListener('click', function (event) {
        const target = event.target;
        const row = target.closest('tr');
        if (target.classList.contains('edit-product')) {
            const productID = row.children[0].textContent;
            const productName = row.children[2].textContent;
            const productPrice = row.children[3].textContent;

            document.getElementById('productID').value = productID;
            document.getElementById('productName').value = productName;
            document.getElementById('productPrice').value = productPrice;
            document.getElementById('productForm').style.display = 'block';

            row.remove(); // Remove the row to avoid duplication
        } else if (target.classList.contains('delete-product')) {
            if (confirm('Bạn có chắc chắn muốn xoá sản phẩm này không?')) {
                const productID = row.children[0].textContent;
                const updatedProducts = savedProducts.filter(product => product.id !== productID);
                localStorage.setItem('products', JSON.stringify(updatedProducts));
                row.remove();
            }
        }
    });

    const addNewsButton = document.getElementById('addNews');
    const newsForm = document.getElementById('newsForm');
    const newsTableBody = document.querySelector('#newsManagement table tbody');

    // Load news from localStorage
    const savedNews = JSON.parse(localStorage.getItem('news')) || [];
    savedNews.forEach(news => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${news.id}</td>
            <td><img src="${news.image}" alt="News Image" class="np-image"></td>
            <td>${news.title}</td>
            <td>${news.content}</td>
            <td>
                <button class="edit-news"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-news"><i class="fa-solid fa-xmark"></i></button>
            </td>
        `;
        newsTableBody.appendChild(newRow);
    });

    if (addNewsButton && newsForm) {
        addNewsButton.addEventListener('click', function () {
            newsForm.style.display = newsForm.style.display === 'none' || newsForm.style.display === '' ? 'block' : 'none';
        });
    }

    // Add news functionality
    newsForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newsID = document.getElementById('newsID').value;
        const newsTitle = document.getElementById('newsTitle').value;
        const newsContent = document.getElementById('newsContent').value;
        const newsImage = document.getElementById('newsImage').files[0];
        const newsImageURL = document.getElementById('newsImageURL').value;

        // Check for duplicate ID or title
        const isDuplicateID = savedNews.some(news => news.id === newsID);
        const isDuplicateTitle = savedNews.some(news => news.title === newsTitle);

        if (isDuplicateID) {
            alert('ID tin tức đã tồn tại. Vui lòng nhập ID khác.');
            return;
        }

        if (isDuplicateTitle) {
            alert('Tiêu đề tin tức đã tồn tại. Vui lòng nhập tiêu đề khác.');
            return;
        }

        const imageSrc = newsImage ? URL.createObjectURL(newsImage) : newsImageURL;

        const newNews = { id: newsID, title: newsTitle, content: newsContent, image: imageSrc };
        savedNews.push(newNews);
        localStorage.setItem('news', JSON.stringify(savedNews));

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${newsID}</td>
            <td><img src="${imageSrc}" alt="News Image" class="np-image"></td>
            <td>${newsTitle}</td>
            <td>${newsContent}</td>
            <td>
                <button class="edit-news"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-news"><i class="fa-solid fa-xmark"></i></button>
            </td>
        `;
        newsTableBody.appendChild(newRow);
        newsForm.reset();
        newsForm.style.display = 'none';
    });

    // Add event listeners for edit and delete actions in news table
    const newsTable = document.querySelector('#newsManagement table tbody');
    newsTable.addEventListener('click', function (event) {
        const target = event.target;
        const row = target.closest('tr');
        if (target.classList.contains('edit-news')) {
            const newsTitle = row.children[2].textContent;
            const newsContent = row.children[3].textContent;

            document.getElementById('newsTitle').value = newsTitle;
            document.getElementById('newsContent').value = newsContent;
            document.getElementById('newsForm').style.display = 'block';

            row.remove(); // Remove the row to avoid duplication
        } else if (target.classList.contains('delete-news')) {
            if (confirm('Bạn có chắc chắn muốn xoá tin tức này không?')) {
                const newsTitle = row.children[2].textContent;
                const updatedNews = savedNews.filter(news => news.title !== newsTitle);
                localStorage.setItem('news', JSON.stringify(updatedNews));
                row.remove();
            }
        }
    });
});