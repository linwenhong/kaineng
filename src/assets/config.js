const env = 'local'

const Config = {
  page_size: 10
}

switch (env) {
  case 'local':
    Config.api_url = 'http://localhost:3000/'
    Config.base_url = 'http://localhost:8086/'
    break
  case 'test':
    Config.api_url = 'http://localhost:3000/'
    Config.base_url = 'http://localhost:8085/'
    break
  case 'prod':
    Config.api_url = 'http://api.pmd99.com/'
    Config.base_url = 'http://www.pmd99.com/'
    break
  default:
    console.error('Config error')
}

Config.test = [ {
  id: '1',
  label: 'a',
  children: [ {
    id: '2',
    label: 'aa',
  }, {
    id: '3',
    label: 'ab',
  } ],
}, {
  id: '4',
  label: 'b',
}, {
  id: '5',
  label: 'c',
} ]

module.exports = Config
