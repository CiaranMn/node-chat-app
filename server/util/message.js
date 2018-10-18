const generateMessage = (from, content) => {
  return {
    from,
    content,
    createdAt: new Date().toLocaleString()
  }
}

module.exports = {generateMessage};
