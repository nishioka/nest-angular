import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './app/app.module';
import { CreateAnnouncementDto } from '@sample/dto';

import { TestDataAnnouncement } from './setup/announcement.setup';

describe('/', () => {
  let module: TestingModule;
  let app: INestApplication;

  let testData: TestDataAnnouncement;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
      providers: [
        TestDataAnnouncement,
      ]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    testData = module.get<TestDataAnnouncement>(TestDataAnnouncement);
    await testData.createTestData();
  });

  describe('/announcement', () => {

    describe('GET', () => {
      it('should return 200 if not authorized', () => {
        return request(app.getHttpServer())
          .get('/announcement')
          .expect(HttpStatus.OK)
          .expect((res) => {
// console.log(util.inspect(res.body, {depth: null}));
            expect(res.body).toEqual(testData.responses);
          });
      });
    });

    describe('GET /:id', () => {
      it('should return 200 if not authorized', () => {
        return request(app.getHttpServer())
          .get(`/announcement/${testData.responses[1].id}`)
          .expect(HttpStatus.OK)
          .expect((res) => {
            expect(res.body).toEqual(testData.responses[1]);
          });
      });
    });

    describe('PUT /:id', () => {
      let expectData: any;
      let requestData: any;

      beforeAll(() => {
        expectData = JSON.parse(JSON.stringify(testData.responses[1]));
        expectData.content = '現在テスト中です(2)UPDATE';

        requestData = JSON.parse(JSON.stringify(expectData));
      });

      it('should return 401 if not authorized', () => {
        return request(app.getHttpServer())
          .put(`/announcement/${testData.responses[1].id}`)
          .send(requestData)
          .expect(HttpStatus.UNAUTHORIZED);
      });

      it('should return 403 if the role is not admin', () => {
        return request(app.getHttpServer())
        .put(`/announcement/${testData.responses[1].id}`)
        .send(requestData)
        .expect(HttpStatus.FORBIDDEN);
      });

      it('should return 200', () => {
        return request(app.getHttpServer())
          .put(`/announcement/${testData.responses[1].id}`)
          .send(requestData)
          .expect(HttpStatus.OK)
          .expect((res) => {
            expect(res.body).toEqual(expectData);
          });
      });
    });

    describe('DELETE /:id', () => {
      it('should return 401 if not authorized', () => {
        return request(app.getHttpServer())
          .delete(`/announcement/${testData.responses[1].id}`)
          .expect(HttpStatus.UNAUTHORIZED);
      });

      it('should return 403 if the role is not admin', () => {
        return request(app.getHttpServer())
        .delete(`/announcement/${testData.responses[1].id}`)
        .expect(HttpStatus.FORBIDDEN);
      });

      // 戻り値を見る場合、authorはassosiationしていないので注意
      it('should return 200', () => {
        return request(app.getHttpServer())
          .delete(`/announcement/${testData.responses[1].id}`)
          .expect(HttpStatus.OK);
      });
    });

    describe('POST /', () => {
      let requestAnnouncement: CreateAnnouncementDto;
      let expectedAnnouncement: any;

      beforeAll(() => {
        requestAnnouncement = JSON.parse(JSON.stringify(testData.requests[1]));
        expectedAnnouncement = JSON.parse(JSON.stringify(testData.responses[1]));
      });

      it('should return 401 if not authorized', () => {
        return request(app.getHttpServer())
          .post('/announcement')
          .send(requestAnnouncement)
          .expect(HttpStatus.UNAUTHORIZED);
      });

      it('should return 403 if the role is not admin', () => {
        return request(app.getHttpServer())
        .post('/announcement')
        .send(requestAnnouncement)
        .expect(HttpStatus.FORBIDDEN);
      });

      it('should return 201', () => {
        return request(app.getHttpServer())
          .post('/announcement')
          .send(requestAnnouncement)
          .expect(HttpStatus.CREATED)
          .expect((res) => {
// console.log('requestAnnouncement1: ', requestAnnouncement1);
            expectedAnnouncement.id = res.body.id;
            expectedAnnouncement.createdAt = res.body.createdAt;
            expect(res.body).toEqual(expectedAnnouncement);
          });
      });
    });
  });

  afterAll(async () => {
    await app.close();
    await module.close();
  });
});
