cd ./zookeeper1
./bin/zkServer.sh start
# start-foreground 前台运行
cd ../zookeeper2
./bin/zkServer.sh start
cd ../zookeeper3
./bin/zkServer.sh start