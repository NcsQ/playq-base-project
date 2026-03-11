// CommonJS-style export so Node can require this .ts without transpilation
module.exports = {
  api: {
    todo1: {
      method: 'GET',
      path: '/todos/1',
      expectedStatus: '200'
    }
  }
};
