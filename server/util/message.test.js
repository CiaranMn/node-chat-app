const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate correct message object', () => {

    const from = "Ciaran"
    const content = "Hello World!"
    const msg = generateMessage(from, content);
    expect(msg).toContain({
      from, content
    })
  })

})