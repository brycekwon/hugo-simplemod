function loadPreferredTheme() {
    const prefTheme = localStorage.getItem("pref-theme");
    const isDark = document.body.classList.contains("dark");

    if (prefTheme === "light" && isDark) {
        document.body.classList.remove('dark')
    } else if (prefTheme === "dark" && !isDark) {
        document.body.classList.add('dark')
    }
}

function themeToggle() {
    const themeButton = document.getElementById("theme-toggle");

    themeButton.addEventListener("click", () => {
        if (document.body.className.includes("dark")) {
            document.body.classList.remove('dark');
            localStorage.setItem("pref-theme", 'light');
        } else {
            document.body.classList.add('dark');
            localStorage.setItem("pref-theme", 'dark');
        }
    });
}

function showCodeCopyButtons() {
    document.querySelectorAll('pre > code').forEach((codeblock) => {
        const container = codeblock.parentNode.parentNode;

        const copybutton = document.createElement('button');
        copybutton.classList.add('copy-code');
        copybutton.innerHTML = 'copy';

        function copyingDone() {
            copybutton.innerHTML = 'copied!';
            setTimeout(() => {
                copybutton.innerHTML = 'copy';
            }, 2000);
        }

        copybutton.addEventListener('click', () => {
            if ('clipboard' in navigator) {
                navigator.clipboard.writeText(codeblock.textContent);
                copyingDone();
                return;
            }
        });

        if (container.classList.contains("highlight")) {
            container.appendChild(copybutton);
        }
    });
}

function openToc() {
    const toc = document.getElementById("toc");

    if (!toc) return;

    if (window.innerWidth > 1500 && window.innerHeight > 800) {
        toc.open = true;
    }
}

function progressBar() {
    const bar = document.getElementById("progressBar");

    if (!bar) return;

    document.addEventListener('scroll', () => {
        let scrollPercent = document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        if (scrollPercent >= 99) { scrollPercent = 0 };
        bar.style.setProperty("--scrollAmount", scrollPercent + '%');
    })
}

loadPreferredTheme();
themeToggle();
showCodeCopyButtons();
openToc();
progressBar();
