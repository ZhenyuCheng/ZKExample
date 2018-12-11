const zookeeper = require('zookeeper-cluster-client');
const client = zookeeper.createClient('localhost:2181,localhost:2182,localhost:2183');
const path = process.argv[2];
console.log(`\n-----------------------优雅的分割线----------------\n`);
async function listNodeInfo() {
    let state = client.getState();
    let children = await client.getChildren(
        path,
        event => {
            console.log('Got watcher event', event);
            listNodeInfo();
        });
    let data = await client.getData(
        path,
        event => {
            console.log('Got watcher event', event);
            listNodeInfo();
        });

    let acl = await client.getACL(
        path, {
            withStat: true
        }
    );
    console.log('state:', state);
    console.log('data:', data ? data.toString(): '');
    console.log('acls:', JSON.parse(JSON.stringify(acl.acls)));
    console.log('stat:', JSON.parse(JSON.stringify(acl.stat)));
    console.log('children:', children);
    console.log(`\n-----------------------优雅的分割线----------------\n`);
}

client.once('connected', async function () {
    listNodeInfo(path)
});


client.connect();