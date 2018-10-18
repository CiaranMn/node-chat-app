const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate correct message object', () => {

    const from = "Ciaran"
    const content = "Hello World!"
    const createdAt = new Date().toLocaleString()
    const msg = generateMessage(from, content);
    expect(msg).toMatchObject({
      from, content, createdAt
    })
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
    const from = "Admin";
    const latitude = 15;
    const longitude = 10;
    const url = 'https://www.google.com/maps?q=15,10'
    const locMsg = generateLocationMessage(from, latitude, longitude)

    expect(locMsg.url).toEqual(url)
    expect(locMsg.from).toEqual(from)
  })
})