scp -r root@8.131.92.84:/opt/mongodb ./

docker cp ./mongodb/mongod_bak_now/2023_06_09/mongodb/react mongo:/opt/mongodb

docker exec -it mongo /bin/bash -c "
mongorestore -h 127.0.0.1 -d react /opt/mongodb/react --username react --password 123456
"