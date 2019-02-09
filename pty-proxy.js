const pty = require('node-pty');
const os = require('os');

const COLS = parseInt(process.env.COLS) || 80;
const ROWS = parseInt(process.env.ROWS) || 24;

const shell = process.env.SHELL || (os.platform() === 'win32' ? 'powershell.exe' : 'bash');

process.stdin.resume();

const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: COLS,
  rows: ROWS,
  cwd: process.env.HOME,
  env: process.env
});

ptyProcess.on('data', function(data) {
  process.stdout.write(data);
});

process.stdin.on('data', function (chunk) { 
  ptyProcess.write(chunk); 
});
