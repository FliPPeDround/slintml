import { parser } from 'posthtml-parser'

export function parserTemplate(templateCode: string) {
  return parser(templateCode)
}
