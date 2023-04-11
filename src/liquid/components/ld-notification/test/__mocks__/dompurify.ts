import { JSDOM } from 'jsdom'
import DOMPurify, { type Config } from 'dompurify/dist/purify.cjs'
const win = new JSDOM('').window
const CustomDOMPurify = DOMPurify(win)

const dompurify = jest.genMockFromModule('dompurify')

module.exports.sanitize = (source: string | Node, config?: Config) =>
  CustomDOMPurify.sanitize(source, config)

module.exports.default = dompurify
