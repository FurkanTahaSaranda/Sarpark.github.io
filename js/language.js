document.addEventListener("DOMContentLoaded", async function () {
    const menuBtn = document.getElementById("menu-btn");
    const languageMenu = document.getElementById("language");
    const languageOptions = document.querySelectorAll(".language-option");

    let isMenuAnimating = false; // Çakışmayı önlemek için değişken
    let languageData = null; // JSON önbelleği

    // 📌 İlk açılışta JSON'u yükleyelim ki donma olmasın
    async function loadLanguageData() {
        if (!languageData) {
            try {
                const response = await fetch("./js/language.json");
                if (!response.ok) throw new Error("Dil dosyası yüklenemedi.");
                languageData = await response.json();
            } catch (error) {
                console.error("Dil dosyası yüklenirken hata:", error);
            }
        }
    }

    await loadLanguageData(); // JSON'u başta yükle

    // 📌 Menü aç/kapat fonksiyonu (animasyon çakışmalarını önler)
    menuBtn.addEventListener("click", () => {
        if (isMenuAnimating) return; // Eğer animasyon devam ediyorsa işlem yapma
        isMenuAnimating = true;
        requestAnimationFrame(() => {
            languageMenu.classList.toggle("open");
            setTimeout(() => {
                isMenuAnimating = false;
            }, 300); // Animasyon süresi kadar bekle
        });
    });

    // 📌 Dil değişim fonksiyonu (JSON'u tekrar yüklemez, hızlandırır)
    async function changeLanguage(lang) {
        if (!languageData) await loadLanguageData(); // Eğer JSON yüklenmediyse, yükle
        requestAnimationFrame(() => {
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                el.innerText = languageData[lang][key] || el.innerText;
            });
        });

        // 📌 URL'yi güncelle ve localStorage’a kaydet
        const newUrl = window.location.pathname + "?lang=" + lang;
        window.history.pushState({ path: newUrl, lang: lang }, "", newUrl);
        localStorage.setItem("selectedLanguage", lang);
    }

    // 📌 Dil seçeneklerine tıklanınca dili değiştir ve menüyü kapat
    languageOptions.forEach(option => {
        option.addEventListener("click", function () {
            const lang = this.getAttribute("data-lang");
            changeLanguage(lang);
            languageMenu.classList.remove("open");
        });
    });

    // 📌 URL veya localStorage'dan dili çek
    function getLanguageFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get("lang") || localStorage.getItem("selectedLanguage") || "tr";
    }

    // 📌 Geri tuşuna basıldığında dili geri al
    window.onpopstate = function (event) {
        if (event.state && event.state.lang) {
            updatePageLanguage(event.state.lang);
            localStorage.setItem("selectedLanguage", event.state.lang);
        } else {
            updatePageLanguage("tr");
            localStorage.setItem("selectedLanguage", "tr");
        }
    };

    // 📌 Sayfa yüklenirken kaydedilmiş dili uygula
    async function updatePageLanguage(lang) {
        if (!languageData) await loadLanguageData();
        requestAnimationFrame(() => {
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                el.innerText = languageData[lang][key] || el.innerText;
            });
        });
    }

    // 📌 İlk yüklemede dil ayarlarını uygula
    const savedLang = getLanguageFromURL();
    updatePageLanguage(savedLang);
});






// Google Analytics scriptini yüklemek için async kullanarak
const script = document.createElement('script');
script.async = true;
script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXX-X';
document.head.appendChild(script);

// Script yüklendikten sonra gtag fonksiyonunu başlatmak için
script.onload = function() {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXXX-X');
};
