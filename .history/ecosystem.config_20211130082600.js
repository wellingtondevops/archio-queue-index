module.exports = {
    apps : [{
      name   : "process-index-user ",
      script : "./index.js",
      instances: 1,
      exec_mode: "cluster",
      watch: true,
      merge_logs: true,
      env: {
        SERVER_PORT: 4000,      
        NODE_ENV: "production",
        RABBITMQ_URL="amqp://archio:archio@localhost:5672"      
      }
    }]
  }