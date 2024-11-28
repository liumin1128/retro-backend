scp -r root@101.43.156.37:/opt/mongodb ./

docker cp ./mongodb/mongod_bak_now/2024_11_28/mongodb/react mongo:/opt/mongodb

docker exec -it mongo /bin/bash -c "
mongorestore -h 127.0.0.1 -d react /opt/mongodb/react --username react --password 123456
"