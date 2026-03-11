// CommonJS-style export so Node can require this .ts without transpilation
module.exports = {
  api: {
    postEcho: {
      method: 'POST',
      path: '/post',
      headers: { 'Content-Type': 'application/json' },
      // Send a simple JSON so response.json.hello === 'world'
      body: { hello: 'world' },
      expectedStatus: '200'
    }
  }
};
