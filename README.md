# Whitelist an ip address into the database

RG=''
SERVER=''
STARTIP=''
ENDIP=''

az sql server firewall-rule create --resource-group $RG --server $SERVER --name AllowClientIP --start-ip-address $STARTIP --end-ip-address $ENDIP
