import { preview } from 'vite'
import { spawn } from 'node:child_process'

const server = process.env.PLAYWRIGHT_BASE_URL ? null : await preview({
 preview:{host:'127.0.0.1',port:5198,strictPort:true},
})
try {
 const child=spawn(process.execPath,['node_modules/@playwright/test/cli.js','test',...process.argv.slice(2)],{
  stdio:'inherit',
  env:{...process.env,PLAYWRIGHT_BASE_URL:process.env.PLAYWRIGHT_BASE_URL||'http://127.0.0.1:5198'},
 })
 process.exitCode=await new Promise((resolve,reject)=>{
  child.once('error',reject)
  child.once('exit',code=>resolve(code??1))
 })
} finally {
 if(server) {
  server.httpServer.closeAllConnections()
  await new Promise((resolve,reject)=>server.httpServer.close(error=>error?reject(error):resolve()))
 }
}
