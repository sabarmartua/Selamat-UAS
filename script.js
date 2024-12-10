document.getElementById("submit").addEventListener("click", function () {
    const name = document.getElementById("name").value.trim();
    const messageDiv = document.getElementById("message");
    const canvas = document.getElementById("stars");
    const verses = [
        "Filipi 4:13\n\"Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.\"",
        "Kolose 3:23\n\"Apapun juga yang kamu perbuat, perbuatlah dengan segenap hatimu seperti untuk Tuhan dan bukan untuk manusia.\"",
        "Mazmur 119:105\n\"Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku.\"",
        "Amsal 16:3\n\"Serahkanlah perbuatanmu kepada TUHAN, maka terlaksanalah segala rencanamu.\"",
        "Yesaya 41:10\n\"Janganlah takut, sebab Aku menyertai engkau, janganlah bimbang, sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong engkau; Aku akan memegang engkau dengan tangan kanan-Ku yang membawa kemenangan.\"",
        "Amsal 4:7\n\"Hikmat adalah hal yang paling utama; oleh sebab itu perolehlah hikmat dan dengan segala yang kauperoleh perolehlah pengertian.\"",
        "Yakobus 1:5\n\"Tetapi apabila di antara kamu ada yang kekurangan hikmat, hendaklah ia memintakannya kepada Allah, yang memberikan kepada semua orang dengan murah hati dan dengan tidak membangkit-bangkit, maka hal itu akan diberikan kepadanya.\"",
        "Mazmur 37:5\n\"Serahkanlah hidupmu kepada TUHAN dan percayalah kepada-Nya, dan Ia akan bertindak.\"",
        "2 Timotius 2:15\n\"Usahakanlah supaya engkau layak di hadapan Allah sebagai seorang pekerja yang tidak usah malu, yang berterus terang memberitakan perkataan kebenaran itu.\"",
        "Mazmur 20:4\n\"Kiranya Ia mengaruniakan kepadamu apa yang kauinginkan dan menjadikan segala rencanamu berhasil.\"",
    ];

    if (!name) {
        messageDiv.textContent = "Silakan masukkan nama Anda!";
        return;
    }

    if (/novita/i.test(name)) {
        canvas.style.display = "block";
        createStarEffect(canvas);
        showCardPopup(verses, name);
    } else {
        canvas.style.display = "none";
        messageDiv.textContent = "";
        const randomVerse = verses[Math.floor(Math.random() * verses.length)];
        showCardPopup([randomVerse], name);
    }
});

function createStarEffect(canvas) {
    const ctx = canvas.getContext("2d");
    const stars = [];

    function createStar() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1, 
            brightness: Math.random() * 0.5 + 0.5,
            speed: Math.random() * 1 + 0.5, 
        };
    }

    function drawStar(star) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`; 
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach((star) => {
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
            drawStar(star);
        });
        requestAnimationFrame(animate);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 200; i++) {
        stars.push(createStar());
    }

    animate();
}

function showCardPopup(verses, name) {
    // Hapus card lama jika ada
    const existingCard = document.querySelector(".pop-up-card");
    if (existingCard) {
        existingCard.remove();
    }

    const card = document.createElement("div");
    card.classList.add("pop-up-card");
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    card.innerHTML = `<h2>Halo, ${name}!</h2><p>${randomVerse}</p>`;

    document.body.appendChild(card);

    setTimeout(() => {
        card.style.transform = "translateY(-10px)";
        card.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
    }, 100);

    setTimeout(() => {
        card.remove();
    }, 100000000); // Hapus card setelah 5 detik
}
