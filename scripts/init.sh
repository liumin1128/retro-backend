# echo '>>> stop all container'
# podman stop $(podman ps -a -q) 

# echo '>>> remove all container'
# podman rm $(podman ps -a -q) 

echo '>>> create mongo container'
podman run -itd --name mongo -p 27017:27017 mongo --auth

echo '>>> create redis container'
podman run -itd --name redis -p 6379:6379 redis

echo '>>> start mongo container'
podman start mongo 

echo '>>> wait 3 second'
sleep 1

echo '>>> wait 2 second'
sleep 1

echo '>>> wait 1 second'
sleep 1

echo '>>> init mongo'
podman exec -i mongo mongosh admin <<EOF
use admin
db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'}]});
db.auth('admin', '123456')
use react
db.createUser({ user:'react',pwd:'123456',roles:[ { role:'readWrite', db: 'react'}]});
db.auth('react', '123456')
exit;
EOF

# echo '>>> stop mongo'
# podman stop mongo

echo '>>> init done'
