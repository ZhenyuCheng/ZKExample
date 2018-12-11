/**
 * @NOTE: 监听输入节点的数据变动、以及
 * @Author: chengzhenyu@corp.netease.com
 * @Date: 2018-12-08 14:52:00
 * @Last Modified by: chengzhenyu@corp.netease.com
 * @Last Modified time: 2018-12-08 15:31:28
 */
const zookeeper = require('zookeeper-cluster-client');
const client = zookeeper.createClient('localhost:2181,localhost:2182,localhost:2183');
const path = process.argv[2];

client.once('connected', async function () {
    client.watch(path, (err, data, stat) => {
        // get stat命令的一层封装
        if (err) {
            // handle error
            return;
        }
        console.log('data => %s', data ? data.toString(): '');
        // console.log('stat =>', stat);
    });
    client.watchChildren(path, (err, children, stat) => {
        // 对ls2的封装
        if (err) {
          // handle error
          return;
        }
        console.log('children => %j', children);
        // console.log('stat => ', stat);
      });
});

client.connect();