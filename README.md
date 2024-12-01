# 使い方
1. gitで空のリポジトリを作る
1. ```git remote -v``` でremoteを確認する。cloneしたsuiwave/vite-react-template.gitが表示されるはず
1. ```git remote remove origin``` でorigin情報を削除する
1. ```git remote add origin ${repository_url}``` で 1. で作成したリポジトリにひもづける
1. ```git push -u origin main``` でmainブランチにpushすればok
