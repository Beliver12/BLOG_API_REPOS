const app = require('../index')
const request = require('supertest')


describe('/signup', () => {
    it("returns status code 400 if passwords dont match", async() => {
      const res = await request(app).post('/signup').send({password: '123', password2: '12', username: 'Nikola'});

      expect(res.status).toEqual(400)
    })

   /* it("returns Status code 200 if passwords match  and username is not allready in use", async() => {
        const res = await request(app).post('/signup').send({password: '123', password2: '123', username: 'Miki'});
  
        expect(res.status).toEqual(200)
      })*/

    it("returns Status code 400 if username is allready in use", async() => {
        const res = await request(app).post('/signup').send({password: '123', password2: '123', username: 'Nikola'});
  
        expect(res.status).toEqual(400)
      })
      
})


describe('login', () => {
    it("returns status 400 if user enters wrong username and password ", async() => {
        const res = await request(app).post('/login').send({username: 'Jan', password: '123'})
        expect(res.status).toEqual(400)
      })

    it("returns message 'true' if user entered correct password and username", () => {
      return request(app).post('/login').send({username: 'Nikola', password: '123'})
      .then(res => {
        console.log(res.body.token)
        expect(res.body.message).toEqual('true')
      })
      
    })

    it("should specify json in the content type header", async () => {
        const res = await request(app).post("/login").send({username: 'Jan', password: '123'});
        
        expect(res.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

})


describe('/', () => {
    it("returns status code 201 if pulling all users from database works", async() => {
      const res = await request(app).get('/').send({username: 'Jan', password: '123'});
   
      expect(res.status).toEqual(201)
     
    })
   
})

describe('logedInUser', () => {
    it("returns status code 201 if user is not loged in", async() => {
      const res = await request(app).post('/logedInUser').send({username: 'Jan', password: '123'});
   
      expect(res.status).toEqual(404)
    })
   
})

