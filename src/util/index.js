export const formatCurrency = value => `$${value.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}`;
export const padZeros = num => {
    const characterCount = num.toString().length;
    const zeros = '0'.repeat(2 - characterCount);
    return `${zeros}${num}`;
}

export const getCurrentFormattedTime = (currentTime) => {
    const currentHours = padZeros(currentTime.getHours());
    const currentMinutes = padZeros(currentTime.getMinutes());
    const currentDate = padZeros(currentTime.getDate());
    const currentMonth = padZeros(currentTime.getMonth());
    const currentYear = currentTime.getFullYear();
    const formattedDay = `${currentDate}-${currentMonth}-${currentYear}`;
    const formattedTime = `${currentHours}:${currentMinutes}`;
    return { formattedDay, formattedTime }
}