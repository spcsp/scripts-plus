var comNum = 2;
var mapped = $.explorer.mapUNCpath($.cimco.abspath);

var commands = [
  `MODE COM${comNum} BAUD=19200 PARITY=e DATA=7`,
  `ECHO Sending "${mapped}" to the machine`,
  `COPY "${mapped}" COM${comNum}`,
  //`PAUSE`
];

sp.RunProgram(
  "cmd",
  String.raw`/C "${commands.join(' & ')}"`,
  'open',
  'normal',
  true,
  false,
  true
);

$.toast("was sent to the machine", $.cimco.abspath);