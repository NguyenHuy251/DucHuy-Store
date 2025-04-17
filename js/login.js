function registerAccount() {
    // Lấy giá trị từ các trường đăng ký
    const username = document.getElementById("registerUser").value;
    const password = document.getElementById("registerPass").value;
    const email = document.getElementById("registerEmail").value;
    const displayName = document.getElementById("registerDisplayName").value;

    // Kiểm tra xem tất cả trường có dữ liệu
    if (username === "" || password === "" || email === "" || displayName === "") {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    if (!validatePasswordFormat(password)) {
        alert("Mật khẩu phải bắt đầu bằng chữ in hoa, chứa ít nhất một số và một ký tự đặc biệt, và có độ dài tối thiểu 8 ký tự.");
        return;
    }

    if (!validateEmailFormat(email)) {
        alert("Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
        return;
    }

    // Tạo đối tượng tài khoản mới
    const account = {
        username: username,
        password: password,
        email: email,
        displayName: displayName
    };

    // Lấy danh sách tài khoản từ localStorage (nếu có)
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Kiểm tra xem tên đăng nhập đã tồn tại hay chưa
    const isExistingUser = accounts.some((acc) => acc.username === username);
    if (isExistingUser) {
        alert("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
        return;
    }

    // Thêm tài khoản mới vào danh sách
    accounts.push(account);

    // Lưu danh sách tài khoản vào localStorage
    localStorage.setItem("accounts", JSON.stringify(accounts));

    alert("Đăng ký thành công!");
    // Chuyển hướng đến trang đăng nhập hoặc trang chính
    window.location.href = "login.html";
}

function login() {
    // Lấy thông tin người dùng nhập vào
    const username = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPass").value;
  
    // Kiểm tra xem người dùng đã nhập đủ thông tin chưa
    if (username === "" || password === "") {
        alert("Vui lòng điền đầy đủ tên đăng nhập và mật khẩu.");
        return;
    }

    if (!validatePasswordFormat(password)) {
        alert("Mật khẩu phải bắt đầu bằng chữ in hoa, chứa ít nhất một số và một ký tự đặc biệt, và có độ dài tối thiểu 8 ký tự.");
        return;
    }
  
    // Lấy danh sách tài khoản từ localStorage
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  
    // Kiểm tra xem tài khoản có tồn tại và mật khẩu có khớp không
    const userAccount = accounts.find((account) => account.username === username && account.password === password);
  
    if (userAccount) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("displayName", userAccount.displayName);
        localStorage.setItem("username", username); // Store the username

        if (username === "duchuy2501") {
            window.location.href = "admin.html"; 
        } else {
            window.location.href = "index.html"; 
        }
    } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
}

function requireLogin() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        document.getElementById("login-form").style.display = "block";
    }
}

// Hàm xử lý đăng xuất
function logout() {
    localStorage.removeItem("isLoggedIn"); // Xóa trạng thái đăng nhập
    localStorage.removeItem("displayName"); // Xóa tên hiển thị
    location.reload(); // Load lại trang
    window.location.href = "index.html"; // Chuyển hướng về trang index
}

// Kiểm tra trạng thái đăng nhập khi tải trang
document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const displayName = localStorage.getItem("displayName");

    if (isLoggedIn === "true") {
        // Ẩn nút đăng nhập/đăng ký, hiển thị nút đăng xuất
        document.getElementById("auth-options").innerHTML = `
            <span>Xin chào, ${displayName}</span>
            <button onclick="logout()">Đăng xuất<i class="fa-solid fa-arrow-right-from-bracket"></i></button>
        `;
    }
});

function redirectToHomeOrAdmin() {
    const username = localStorage.getItem("username");
    if (username === "duchuy2501") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "index.html";
    }
}

function togglePasswordVisibility(inputId, toggleIconId) {
    const input = document.getElementById(inputId);
    const toggleIcon = document.getElementById(toggleIconId);
    if (input.type === "password") {
        input.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}

function validatePasswordFormat(password) {
    const passwordPattern = /^[A-Z](?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    return passwordPattern.test(password);
}

function validateEmailFormat(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}



