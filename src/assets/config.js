const env = 'local';
const merchant_version  = 'v1.0/';
const admin_version  = 'v1.0/';

const Config = {
  page_size: 10
};

switch (env) {
  case 'local':
    Config.img_url = 'http://api.parks8.com/fileService/image/product/';
    Config.api_url = 'http://api.parks8.com/';
    Config.merchant_version = 'v1.0';
    Config.admin_version = 'v1.0';
    Config.base_url = 'http://localhost:8086/';
    break;
  case 'test':
    Config.img_url = 'http://api.parks8.com/fileService/image/product/';
    Config.api_url = 'http://api.parks8.com/';
    Config.merchant_version = 'v1.0';
    Config.admin_version = 'v1.0';
    Config.base_url = 'http://47.98.121.24:8080/';
    break;
  case 'prod':
    Config.api_url = 'http://api.pmd99.com/';
    Config.base_url = 'http://www.pmd99.com/';
    break;
  default:
    console.error('Config error')
}

module.exports = Config;
