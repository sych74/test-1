var db_cluster = '${settings.galera}' == 'true' ? "galera" : "master";
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
  cluster: {
    scheme: db_cluster,
    db_user: "${globals.DB_USER}",
    db_pass: "${globals.DB_PASS}",
    is_proxysql: false
  }
});

return resp;
