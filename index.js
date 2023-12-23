#!/usr/bin/env node

/**
 * directory-separater
 * ファイルをディレクトリに入れて個別に分けます。
 * ver. 1.0.0
 */

const fs = require("fs");
const { program } = require("commander");

if (require.main === module) (async () => {
  program
    .name('comic fuz downloader')
    .description('ファイルをディレクトリに入れて個別に分けます。')
    .argument('<string>', 'ディレクトリパス')
    .version('1.0.0');

  program.parse();

  if (!program.args[0]) {
    console.log('引数がありません。');
    process.exit(1);
  }
  const dirname = program.args[0];
 
  const files = fs.readdirSync(dirname, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name);

  files.forEach(file => {
    let split = file.split('.');
    let newDirname;
    if (split.length > 2) {
      let dotLastIndex = file.lastIndexOf('.');
      let requiredPath = file.slice(0, dotLastIndex).replace(/\//,"／").replace(/\./g,"．");
      newDirname = `${dirname}/${requiredPath}`;
    } else {
      newDirname = `${dirname}/${split[0].replace(/\//,"／")}`;
    }
    fs.mkdirSync(newDirname, { recursive: true });
    fs.renameSync(`${dirname}/${file}`, `${newDirname}/${file}`);
  });
})().catch(e => console.error(e));