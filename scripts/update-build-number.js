import fs from 'fs'
const file = 'build.txt'
let build = 0
if (fs.existsSync(file)) {
  const num = parseInt(fs.readFileSync(file, 'utf8'))
  if (!isNaN(num)) build = num
}
build += 1
fs.writeFileSync(file, String(build))
fs.writeFileSync('src/build.ts', `export const BUILD_NUMBER = ${build};\n`)

