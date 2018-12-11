const zookeeper = require('zookeeper-cluster-client');
const client = zookeeper.createClient('localhost:2181,localhost:2182,localhost:2183');
const path = process.argv[2];
const data = process.argv[3];
const mode = process.argv[4];
const acls = process.argv[5];

const CREATE_MODES = {
  /**
   * The znode will not be automatically deleted upon client's disconnect.
   */
  PERSISTENT: 0,

  /**
   * The znode will not be automatically deleted upon client's disconnect,
   * and its name will be appended with a monotonically increasing number.
   */
  PERSISTENT_SEQUENTIAL: 2,

  /**
   * The znode will be deleted upon the client's disconnect.
   */
  EPHEMERAL: 1,

  /**
   * The znode will be deleted upon the client's disconnect, and its name
   * will be appended with a monotonically increasing number.
   */
  EPHEMERAL_SEQUENTIAL: 3
};
console.log(mode);

client.once('connected', async function () {
  await client.create(path, data, acls, mode === 'e' ? CREATE_MODES.EPHEMERAL : CREATE_MODES.PERSISTENT);
  console.log('Node: %s is successfully created.', path);
  setTimeout(async () => {
    await client.close();
    console.log('Node: 连接已关闭');
  }, 5 * 1000)
});

client.connect();