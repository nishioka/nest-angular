import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './app/app.module';
import { UpdateUserDto } from '@sample/dto';

import { TestDataUser } from './setup/user.setup';

describe('/', () => {
  let module: TestingModule;
  let app: INestApplication;
  let testData: TestDataUser;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
      providers: [
        TestDataUser,
      ]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    testData = module.get<TestDataUser>(TestDataUser);
    await testData.createTestData();
  });

  describe('/user', () => {

    describe('GET /me', () => {
      it('should return 200', () => {
        return request(app.getHttpServer())
        .get(`/user/me`)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toEqual(testData.responses[0]);
        });
      });

      it('should return 401 if not authorized', () => {
        return request(app.getHttpServer())
        .get(`/user/me`)
        .expect(HttpStatus.UNAUTHORIZED);
      });
    });

    describe('GET /:employeeNo', () => {
      it('should return 200', () => {
        return request(app.getHttpServer())
        .get(`/user/${testData.requests[1].employeeNo}`)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toEqual(testData.responses[1]);
        });
      });

      it('should return 401 if not authorized', () => {
        return request(app.getHttpServer())
        .get(`/user/${testData.requests[1].employeeNo}`)
        .expect(HttpStatus.UNAUTHORIZED);
      });
    });

    describe('GET', () => {
      it('should return 200', () => {
        return request(app.getHttpServer())
        .get('/user')
        .expect(HttpStatus.OK)
        .expect((res) => {
// console.dir(res.body, {depth: 4});
          expect(res.body).toEqual(testData.responses);
        });
      });

      it('should return 401 if not authorized', () => {
        return request(app.getHttpServer())
        .get('/user')
        .expect(HttpStatus.UNAUTHORIZED);
      });
    });

    describe('PUT /me', () => {
      let requestData: UpdateUserDto;
      let expecteData: any;

      beforeAll(async () => {
        requestData = {
          email: 'change@example.com'
        };
        expecteData = JSON.parse(JSON.stringify(testData.responses[0]));
        expecteData.email = requestData.email;
      });

      it('should return 401 if not authorized', () => {
        return request(app.getHttpServer())
        .put('/user/me')
        .send(requestData)
        .expect(HttpStatus.UNAUTHORIZED);
      });

      it('should return 200', () => {
        return request(app.getHttpServer())
        .put('/user/me')
        .send(requestData)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toEqual(expecteData);
        });
      });
    });

    describe('PUT /:id', () => {
      let requestData: UpdateUserDto;
      let expecteData: any;

      beforeAll(async () => {
        requestData = {
          email: 'change2@example.com'
        };
        expecteData = JSON.parse(JSON.stringify(testData.responses[4]));
        expecteData.email = requestData.email;
      });

      it('should return 401 if not authorized', () => {
        return request(app.getHttpServer())
        .put(`/user/${testData.responses[4].id}`)
        .send(requestData)
        .expect(HttpStatus.UNAUTHORIZED);
      });

      it('should return 200', () => {
        return request(app.getHttpServer())
        .put(`/user/${testData.responses[4].id}`)
        .send(requestData)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toEqual(expecteData);
        });
      });
    });

    describe('DELETE /:id', () => {
      it('should return 401 if not authorized', () => {
        return request(app.getHttpServer())
        .delete(`/user/${testData.responses[1].id}`)
        .expect(HttpStatus.UNAUTHORIZED);
      });

      it('should return 403 if the role is not manager', () => {
        return request(app.getHttpServer())
        .delete(`/user/${testData.responses[1].id}`)
        .expect(HttpStatus.FORBIDDEN);
      });

      it('should return 200', () => {
        return request(app.getHttpServer())
        .delete(`/user/${testData.responses[1].id}`)
        .expect(HttpStatus.OK);
      });
    });

    // CreateはAuthControllerで行う
  });

  afterAll(async (done) => {
    await app.close();
    done();
  });

});
