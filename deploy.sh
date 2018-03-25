HOST='benimfirsatim.com'
USER='metiner'
PASSWD='q1w2e3RR'
LOCALPATH='dist'
FILE=*
DIR='/'

ftp -n $HOST <<EOF
quote USER $USER
quote PASS $PASSWD
cd $DIR
lcd $LOCALPATH
mput *
quit
exit;