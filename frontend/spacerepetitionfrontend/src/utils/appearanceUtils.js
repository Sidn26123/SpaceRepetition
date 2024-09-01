export function toggleClassWithID(id, className) {
    var element = document.getElementById(id);
    element.classList.toggle(className);
}

export function handleToggleHiddenEffect(id) {
    const content = document.querySelector(id);
    content.classList.toggle("hidden");
}
