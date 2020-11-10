var { apps, exec, toast } = ScriptyStrokes();

var { abspath, filename } = apps.cimco;

var xcopy = exec.create("xcopy");

var stagingPath = String.raw`\\fpc27536s1\importcam`;

xcopy([
    "/V",
    "/Y",
    "/Z",
    "/I",
    "/Q",
    `"${abspath.replace(/\//g, '\\')}"`,
    stagingPath
]);

toast(`${stagingPath}\\${filename}`, "Staged in Fastems for Import");
