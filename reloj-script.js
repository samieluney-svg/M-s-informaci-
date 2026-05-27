// Zonas horarias y sus identificadores
const timezones = {
    'clock-madrid': 'Europe/Madrid',
    'clock-ny': 'America/New_York',
    'clock-london': 'Europe/London',
    'clock-tokyo': 'Asia/Tokyo',
    'clock-sydney': 'Australia/Sydney',
    'clock-dubai': 'Asia/Dubai',
    'clock-bangkok': 'Asia/Bangkok',
    'clock-saopaulo': 'America/Sao_Paulo'
};

// Función para formatear la hora
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Función para obtener la hora en una zona horaria específica
function getTimeInTimezone(timezone) {
    const now = new Date();
    const utcTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    return tzTime;
}

// Función para detectar la zona horaria local del usuario
function getLocalTimezone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
        return 'Desconocida';
    }
}

// Función para actualizar todos los relojes
function updateClocks() {
    // Actualizar relojes de zonas horarias
    Object.entries(timezones).forEach(([elementId, timezone]) => {
        const element = document.getElementById(elementId);
        if (element) {
            const time = getTimeInTimezone(timezone);
            element.textContent = formatTime(time);
        }
    });

    // Actualizar reloj local
    const localClockElement = document.getElementById('clock-local');
    const localTzElement = document.getElementById('local-tz');
    if (localClockElement && localTzElement) {
        const now = new Date();
        localClockElement.textContent = formatTime(now);
        localTzElement.textContent = getLocalTimezone();
    }
}

// Actualizar relojes cada segundo
updateClocks();
setInterval(updateClocks, 1000);
