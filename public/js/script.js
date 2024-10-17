function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUca60e0320e4efe88cba90a0f45c070c25be27bbda08c1e0581aeed94a060ac6e9814e1ecbc03415609b693cdc78d4de4'
        },
        body: JSON.stringify({ UserName: username, PassWord: password })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // ตรวจสอบข้อมูลที่ดึงมา
        if (data.status === true) {
            document.getElementById('message').innerText = "Login successful!";
            showPopup(data); // แสดงป๊อปอัปพร้อมข้อมูลที่ดึงมา
        } else {
            document.getElementById('message').innerText = "Incorrect credentials!";
            document.getElementById('message').style.color = "#ff4500";
            document.getElementById('message').style.animation = "flash 1s infinite";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = "An error occurred.";
    });
}

function showPopup(data) {
    // สร้างป๊อปอัป
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // ข้อมูลที่แสดงพร้อมการแปลและจัดองค์ประกอบ
    popup.innerHTML = `
        <div class="popup-content">
            <h2>ข้อมูลผู้ใช้</h2>
            <p><strong>ชื่อผู้ใช้ (Username):</strong> ${data.username}</p>
            <p><strong>สถานะ (Status):</strong> ${data.tu_status} (${data.statusid})</p>
            <p><strong>ชื่อ-สกุล (ไทย):</strong> ${data.displayname_th}</p>
            <p><strong>ชื่อ-สกุล (อังกฤษ):</strong> ${data.displayname_en}</p>
            <p><strong>อีเมล (Email):</strong> ${data.email}</p>
            <p><strong>คณะ (Faculty):</strong> ${data.faculty}</p>
            <p><strong>ภาควิชา (Department):</strong> ${data.department}</p>
            <button class="close-btn" onclick="closePopup()">ปิด</button>
        </div>
    `;

    // เพิ่มป๊อปอัปไปที่ body
    document.body.appendChild(popup);

    // ป้องกันไม่ให้สกอล์หน้าเว็บเมื่อป๊อปอัปเปิดอยู่
    document.body.style.overflow = "hidden";
}

function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
        document.body.style.overflow = "auto"; // คืนค่า overflow เดิมเมื่อปิดป๊อปอัป
    }
}
