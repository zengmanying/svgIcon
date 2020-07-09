/* eslint-disable */
import { Selector } from 'testcafe'

fixture('get started').page('http://127.0.0.1:9000/')

test('find anwser', async t => {
  let btn = Selector('button')

  await t
  .expect(btn.exists).ok()
})