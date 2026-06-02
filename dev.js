import { spawn } from 'child_process';
// const { spawn } = require ('child_process');

const startProcess = (command, args) => {
	const proc = spawn(command, args, {stdio: 'inherit', shell: true});
	proc.on('close', () => process.exit());
};

startProcess('json-server', ['db.json', '--port', '3241']);
startProcess('vite', ['--port', '5684']);
// "scripts": {
//   "dev": "vite --port 5684",
//   "build": "tsc && vite build",
//   "preview": "vite preview"
// },