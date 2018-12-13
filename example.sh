1. 列出ZkCLi的操作：h
2. create(注册)：
脚本：
    node create.js /root 根节点 e
ZKCli：
    get /root

2. set(更新) node set.js -p path -a acls -d data
脚本：更新数据和权限为所有人都有读和删除权限
    node set.js -p /root -d 根节点 -a ADMIN:world:anyone -a DELETE:world:anyone
ZKCli： 无权限会失败
    get /root 
    

脚本：更新权限和数据为本机IP有所有权限
    node set.js -p /root -d 根节点 -a ALL:ip:127.0.0.1  // 该IP有所有权限
ZKCli： 成功
    get /root


3. get(发现) node get.js path (同时设置了watch)
脚本：
    node get.js /root
ZKCli： node脚本看到数据更新
    set /root test1

4. watch(监听) node watch.js path
脚本：
    node watch.js /root
ZKCLi：插入一个临时节点，可以看到子节点列表更新
    create -e /root/test1 test1
ZKCLi：会话结束，临时节点被删除可以看到子，节点列表更新
    quit