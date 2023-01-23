rm -rf deploy/public
mkdir deploy/public
cp -a build/* deploy/public
cd deploy
firebase deploy