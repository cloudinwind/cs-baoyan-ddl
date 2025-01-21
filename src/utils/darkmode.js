export const toLightMode = () => {
    document.documentElement.style.setProperty('--bg-color', '#f4f4f9');
    document.documentElement.style.setProperty('--text-color', 'black');
    document.documentElement.style.setProperty('--link-color', '#007bff');
}

export const toDarkMode = () => {
    document.documentElement.style.setProperty('--bg-color', '#282828');
    document.documentElement.style.setProperty('--text-color', 'white');
    document.documentElement.style.setProperty('--link-color', '#bb86fc');
}