./zookeeper1/bin/zkCli.sh -server 127.0.0.1:2181,127.0.0.1:2182,127.0.0.1:2183


# stat path [watch] 获取指定节点的状态信息  监听只执行一次
    # czxid：节点被创建的事务ID
    # ctime: 创建时间
    # mzxid: 最后一次被更新的事务ID
    # mtime: 修改时间
    # pzxid：子节点列表最后一次被更新的事务ID
    # cversion：子节点的版本号
    # dataversion：数据版本号
    # aclversion：权限版本号
    # ephemeralOwner：用于临时节点，代表临时节点的事务ID，如果为持久节点则为0
    # dataLength：节点存储的数据的长度
    # numChildren：当前节点的子节点个数

# set path data [version] 设置节点的数据
# get path [watch] 获取某个节点的数据，如果加上watch参数，那么当这个节点内的数据发生变化的时候就会收到通知
# sync path 同步

# rmr path 删除某个节点，并删除该节点下的所有子节点
# delete path [version]  删除一个节点，该节点下不能有子节点；version的就是指定dataVersion不一致不能删除
# create [-s] [-e] path data acl   创建一个节点，带-e那么这是一个临时节点，在断开连接后就销毁，-s就会给创建的节点上面加上序列号：顺序节点-顺序节点可以使临时的也可以是持久的 path是节点的路径 data是节点的值 acl是节点的权限控制
    # 临时节点不允许有子节点。如果临时节点被删除，则下一个合适的节点将填充其位置。
    # 权限主要有：
    # CREATE : 创建子节点
    # READ : 获取节点数据和子节点列表
    # WRITE : 更新节点数据
    # DELETE : 删除子节点
    # ADMIN : 调整设置节点ACL的权限


# ls path [watch] 列出所有子节点 只监听一次
# ls2 path [watch] 和ls用法功能一样，唯一的区别就是列出子节点的同时列出了该节点的状态信息


# setquota -n|-b val path  为某个节点设置配额（所谓的配额是指该节点的最大子节点数n，或者该节点的最大数据值的长度v） val就是要设置的配额的值
# delquota [-n|-b] path 删除指定节点的子节点最大值或者数据长度最大值
# listquota path 获取配置信息

# setAcl path acl 设置某个节点的授权信息
# getAcl path 获取权限信息



# addauth scheme auth scheme可取ip或digest 增加一个认证用户：addauth digest 用户名:密码明文，如：addauth digest user1:password1
    # world	只有一个用户：anyone，代表所有人（默认）
    # ip	使用IP地址认证
    # auth	使用已添加认证的用户认证
    # digest	使用“用户名:密码”方式认证
# quit 退出
# close 关闭连接
# connect host:port
# history 操作历史
# redo cmdno  该命令可以重新执行指定命令编号的历史命令,命令编号可以通过history查看
# printwatches on|off 是否输出watch事件