const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');

describe('Test suite: register and login', () => {
  beforeAll(async () => {
    await db('users').truncate();
  });

  it('adds a user, returns JSON object', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        "username": "testuser",
        "password": "test",
        "organization": "test_org",
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "role": "test_role"
      })
      .then(res => {
        expect(res.status).toBe(201)
        expect(res.type).toBe('application/json')
        expect([res.body]).toBeArray()
      })
  });

  it('should log in and return a token', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        username: "testuser",
        password: "test"
      })
      .then(res => {
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.token).toBeTruthy();
      })
  });

  it('should verify user is logged in and get a list of all students', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        username: "testuser",
        password: "test"
      })
      const students = await request(server)
        .get('/api/students')
        .set('Authorization', res.body.token)
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.type).toBe('application/json')
          expect([res.body]).toBeArray()
          console.log("test body", res.body);
        })
  });

  it('should verify user is logged in and get all data of an individual student', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        username: "testuser",
        password: "test"
      })
      const students = await request(server)
        .get('/api/students/1')
        .set('Authorization', res.body.token)
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.type).toBe('application/json')
          expect([res.body]).toBeArray()
        })
  });

  it('should verify user is logged in and then delete a student', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        username: "testuser",
        password: "test"
      })
      const students = await request(server)
        .delete('/api/students/1')
        .set('Authorization', res.body.token)
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.type).toBe('application/json')
          expect([res.body]).toBeArray()
        })
  });

  it('should verify user is logged in and then add a student', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        username: "testuser",
        password: "test"
      })
      const students = await request(server)
        .post('/api/students')
        .set('Authorization', res.body.token)
        .send({
          "first_name": "Kwabena",
          "last_name": "Domakyaareh",
          "grade_id": "12",
          "background_story": "background story",
          "status": "student",
          "age": 17,
          "insurance_card": 1,
          "insurance_expiration_date": "12-31-2020",
          "birth_certificate": 1,
          "special_needs": "special needs",
          "representative": "representative's name",
          "contact_info": "contact information",
          "visit_id": 2
        })
        .then(res => {
          expect(res.status).toBe(201)
          expect(res.type).toBe('application/json')
          expect([res.body]).toBeArray()
        })
  });

  it('should verify user is logged in and then update student data', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        username: "testuser",
        password: "test"
      })
      const students = await request(server)
        .put('/api/students/')
        .set('Authorization', res.body.token)
        .send({
          "grade_id": 13,
          "age": 17,
          "visit_id": 3
        })
        .then(res => {
          expect(res.status).toBe(201)
          expect(res.type).toBe('application/json')
          expect([res.body]).toBeArray()
        })
  });

})