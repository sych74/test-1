var db_cluster = '${settings.galera}' == 'true' ? "galera" : "master";
var db_cluster_name = '${settings.galera}' == 'true' ? "Galera cluster" : "DB Server";
var db_count = '${settings.galera}' == 'true' ? 3 : 2;

var resp = {
  result: 0,
  ssl: !!jelastic.billing.account.GetQuotas('environment.jelasticssl.enabled').array[0].value,
  nodes: []
}

resp.nodes.push({
  nodeType: "mariadb-dockerized",
  tag: ${settings.sqldb_tag:"10.4.12"},
  flexibleCloudlets: ${settings.db_flexibleCloudlets:16},
  fixedCloudlets: ${settings.db_fixedCloudlets:1},
  diskLimit: ${settings.db_diskLimit:10},
  count: db_count,
  nodeGroup: "sqldb",
  restartDelay: 5,
  skipNodeEmails: true,
  displayName: db_cluster_name,
  cluster: true,
  env: {
    SCHEME: db_cluster,
    DB_USER: "test",
    DB_PASS: "asdasdasd",
    IS_PROXYSQL: false
  }
});

return resp;
