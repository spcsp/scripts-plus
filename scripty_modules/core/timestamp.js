function timestamp() {
    const date = new Date;
    const t = date.getMonth() + 1;
    const g = date.getDate();
    const n = date.getHours();
    const a = date.getMinutes();
    const r = date.getSeconds();

    t = (t < 10 ? "0" : "") + t;
    g = (g < 10 ? "0" : "") + g;
    n = (n < 10 ? "0" : "") + n;
    a = (a < 10 ? "0" : "") + a;
    r = (r < 10 ? "0" : "") + r;

    return date.getFullYear() + "-" + t + "-" + g + " " + n + ":" + a + ":" + r
}