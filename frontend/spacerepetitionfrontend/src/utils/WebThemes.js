const WebThemes = (() => {
    const setDarkMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    };

    const setLightMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    };

    const setTheme = () => {
        if (localStorage.getItem('theme') === 'dark') {
            setDarkMode();
        } else {
            setLightMode();
        }
    };

    // Expose the functions you want to use externally
    return {
        setDarkMode,
        setLightMode,
        setTheme
    };
})();

export default WebThemes;
