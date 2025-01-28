let users = {
    1: {
      id: '1',
      username: 'Robin Wieruch',
    },
    2: {
      id: '2',
      username: 'Dave Davids',
    },
  };
  
let posts = {
    1: {
        id: '1',
        text: 'Hello World',
        userId: '1',
      },
      2: {
        id: '2',
        text: 'By World',
        userId: '2',
      },
}

let comments = {
    1: {
        id: '1',
        text: 'Hello World',
        postId: '1',
      },
      2: {
        id: '2',
        text: 'By World',
        postId: '2',
      },
}

module.exports = {
    users,
    posts, 
    comments
  };