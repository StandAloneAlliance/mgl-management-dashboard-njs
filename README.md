# Whitelist an ip address into the database

az sql server firewall-rule create --resource-group myResourceGroup --server myServer --name AllowClientIP --start-ip-address 'start-address' --end-ip-address 'end-address'
