require('dotenv').config()

module.exports = {
  base: process.env.MODE === 'gh_pages' ? '/liquid' : '',
}
