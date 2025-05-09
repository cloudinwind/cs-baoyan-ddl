export const toLightMode = () => {
    document.documentElement.style.setProperty('--bg-color', '#f4f4f9');
    document.documentElement.style.setProperty('--secondary-color', '#f5f6fa');
    document.documentElement.style.setProperty('--text-color', '#2c3e50');
    document.documentElement.style.setProperty('--border-color', '#e1e4e8');
    document.documentElement.style.setProperty('--link-color', '#007bff');
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
}

export const toDarkMode = () => {
    document.documentElement.style.setProperty('--bg-color', '#121212');
    document.documentElement.style.setProperty('--secondary-color', '#1a1a1a');
    document.documentElement.style.setProperty('--text-color', 'white');
    document.documentElement.style.setProperty('--border-color', '#2c2c2c');
    document.documentElement.style.setProperty('--link-color', '#bb86fc');
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
}