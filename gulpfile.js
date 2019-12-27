var fs = require('fs');
var gulp = require('gulp');
var ejs = require('gulp-ejs');
var rename = require('gulp-rename');
var replace = require("gulp-replace");

gulp.task('ejsBuild', function (done) {
  // 各ページデータを読み込み
  var pagePath = './src/pageData.json';
  var pageData = JSON.parse(fs.readFileSync(pagePath, 'utf8'));

  // 共通データを読み込み
  var commonPath = './src/commonData.json';
  var commonData = JSON.parse(fs.readFileSync(commonPath, 'utf8'));

  // pageDataの数だけ繰り返し
  for (var i = 0; i < pageData.length; i++) {
    // データからファイル名を取得
    var fileName = pageData[i].fileName;
    gulp.src('./src/template.ejs')
      // 変数Dataにデータ入れてejsファイルに渡す
      .pipe(ejs({
        Page: pageData[i],
        Common: commonData
      }))
      // ファイル名の変更
      .pipe(rename(fileName + '.html'))
      // ejsの出力時に、ファイルの始めに出来てしまう空行を削除
      .pipe(replace(/[\s\S]*?(<!DOCTYPE)/, "$1"))
      // ファイルの書き出し
      .pipe(gulp.dest('./dist/'));
  }
  done();
});
