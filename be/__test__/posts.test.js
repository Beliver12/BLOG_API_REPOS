const app = require('../index')
const request = require('supertest')

describe('create', () => {
    it("returns jwt expired if user is not loged in while creating post", async() => {
      const res = await request(app).post('/create').send({postname: 'some-post', text: 'some-text', publish: 'true', })
      .then(res => {
        expect(res.body.message).toEqual('jwt expired')
      })
     
    })

    it("returns message Created Post if it recieves token", async() => {
        const res = await request(app).post('/create').send({postname: 'some-post', text: 'some-text', publish: 'true', 
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJ1c2VybmFtZSI6Ik5pa29sYSIsInBhc3N3b3JkIjoiJDJiJDEwJHpxb1J4MC4yYWljWS4ucVZhNUxGRy56VlBmWlg2b2FwdFlPVU9SR2pMTUJhUGxpU2VSYktlIn0sImlhdCI6MTc0MTY3ODYzMCwiZXhwIjoxNzQxNjgyMjMwfQ.geb9rWNJbZTzPuyjyL5zG5MiMm-nZz9-9WsJnwrF8P0'})
        .then(res => {
            console.log(res.body.message)
          expect(res.body.message).toEqual('Created Post')
        })
       
      })
   
})

/*describe('/', () => {
    it("returns status code 201 if posts get sucessfully pulled out from database", async() => {
      const res = await request(app).post('/').send({username: 'Jan', password: '123'});
   
      expect(res.status).toEqual(404)
    })
   
})*/