scp -r ./mongodb root@101.43.156.37:/opt/mongodb

docker cp ./react mongo:/opt/mongodb

docker exec -it mongo /bin/bash -c "
mongorestore -h 127.0.0.1 -d react /opt/mongodb/react --username react --password 123456
"

