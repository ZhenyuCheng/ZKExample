#!/usr/bin/env node

const yargs = require('yargs');
const zookeeper = require('zookeeper-cluster-client');
const client = zookeeper.createClient('localhost:2181,localhost:2182,localhost:2183');

const {
    argv
} = yargs
    // 
    .option('path', {
        alias: 'p',
        describe: '节点路径'
    })
    // 代理到某个url
    .option('data', {
        alias: 'd',
        describe: '节点数据'
    })
    // 代理到本地java机器
    .option('acl', {
        alias: 'a',
        describe: '{权限}:{方案}:{ID}'
    })
    .alias('h', 'help')
    .help('h');

const PERMISSIONS = {
    READ: 1,
    WRITE: 2,
    CREATE: 4,
    DELETE: 8,
    ADMIN: 16,
    ALL: 31
};
let {
    path,
    data,
    acl
} = argv;

function setAcls(acl, arr) {
    let [permission, scheme, id] = acl.split(':');
    if (!permission || !scheme || !id) {
        console.log('输入的acl不符合规范');
        client.close();
        return;
    }
    arr.push(new zookeeper.ACL(
        PERMISSIONS[permission],
        new zookeeper.Id(scheme, id)
    ));
}

client.once('connected', async function () {
    if (data) {
        await client.setData(path, new Buffer.from(data));
    }
    let acls = [];
    if (acl && Array.isArray(acl)) {
        acl.forEach((ele) => {
            setAcls(ele, acls);
        })
    } else if(acl) {
        setAcls(acl, acls);
    }
    if (acl) {
        await client.setACL(path, acls);
    }
    client.close();
});



client.connect();