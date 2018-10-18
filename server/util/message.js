const now = () => new Date().toLocaleString()

const generateMessage = (from, content) => {
  return {
    from,
    content,
    createdAt: now()
  }
}

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: now()
  }
}

module.exports = {
  generateMessage,
  generateLocationMessage
};
