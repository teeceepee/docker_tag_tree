desc 'Generate RSA key pair'
task :gen_key do
  require 'openssl'
  puts OpenSSL::PKey::RSA.generate(4096).to_pem
end

desc 'Backup database'
task :db_backup do
  db_conf = Rails.configuration.database_configuration[Rails.env]
  raise "database.yml does not have `#{Rails.env}` section" if db_conf.blank?

  host = db_conf['host']
  port = db_conf['port']
  username = db_conf['username']
  password = db_conf['password']
  database = db_conf['database']

  connection_options = [
    ['--host', host],
    ['--port', port],
    ['--username', username],
  ]

  conn = connection_options.select do |option|
    option.last.present?
  end.flatten.join(' ')

  backup_dir = Rails.root.join('db/backup')
  FileUtils.mkdir_p(backup_dir)
  filename = backup_dir.join("#{Time.now.utc.strftime('%Y%m%d%H%M%S')}.sql").to_s
  file = ['--file', filename].join(' ')

  cmd = "pg_dump #{conn} #{file} #{database}"

  system(cmd)
end

# RAILS_ENV=production bin/rake letsencrypt CONFIG=config/letsencrypt_plugin_xiumaijia.yml
desc "Generates SSL certificate using Let's Encrypt service"
task letsencrypt: :setup_logger do
  if ENV['CONFIG'].present?
    config = YAML.load_file(Rails.root.join(ENV['CONFIG']))
    config.merge! config.fetch(Rails.env, {})
    LetsencryptPlugin.config = config

    cert_generator = LetsencryptPlugin::CertGenerator.new(LetsencryptPlugin.config.to_h)
    cert_generator.generate_certificate
  else
    Rails.logger.error '`CONFIG` variable is not set'
  end

end