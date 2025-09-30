import { spec } from 'pactum';

describe('Reqres API tests', () => {
  it('GET /api/users?page=2 should return users on page 2', async () => {
    await spec()
      .get('https://reqres.in/api/users?page=2')
      .expectStatus(200)
      .expectJsonLike({
        page: 2,
        data: [
          {
            id: /\d+/,
            email: /.+@.+\..+/,
            first_name: /\w+/,
            last_name: /\w+/,
            avatar: /https?:\/\/.+/
          }
        ]
      });
  });

  it('GET /api/users/2 should return user with id 2', async () => {
    await spec()
      .get('https://reqres.in/api/users/2')
      .expectStatus(200)
      .expectJsonLike({
        data: {
          id: 2,
          email: /.+@.+\..+/,
          first_name: /\w+/,
          last_name: /\w+/,
          avatar: /https?:\/\/.+/
        }
      });
  });

  it('GET /api/users/23 should return 401 Unauthorized for non-existent user', async () => {
    await spec()
      .get('https://reqres.in/api/users/23')
      .expectStatus(401)
      .expectJson({
        error: 'Missing API key'
      });
  });

  it('POST /api/users should create a new user and return 401 Unauthorized', async () => {
    await spec()
      .post('https://reqres.in/api/users')
      .withHeaders({})
      .withJson({
        name: 'Luiz',
        job: 'Dev'
      })
      .expectStatus(401)
      .expectJson({
        error: 'Missing API key'
      });
  });

  it('PUT /api/users/2 should update user and return 401 Unauthorized', async () => {
    await spec()
      .put('https://reqres.in/api/users/2')
      .withHeaders({})
      .withJson({
        name: 'Luiz',
        job: 'Senior Dev'
      })
      .expectStatus(401)
      .expectJson({
        error: 'Missing API key'
      });
  });

  it('PATCH /api/users/2 should partially update user and return 401 Unauthorized', async () => {
    await spec()
      .patch('https://reqres.in/api/users/2')
      .withHeaders({})
      .withJson({
        job: 'Lead Dev'
      })
      .expectStatus(401)
      .expectJson({
        error: 'Missing API key'
      });
  });

  it('DELETE /api/users/2 should return 401 Unauthorized', async () => {
    await spec()
      .delete('https://reqres.in/api/users/2')
      .expectStatus(401)
      .expectJson({
        error: 'Missing API key'
      });
  });

  it('POST /api/register (sem senha) deve retornar 401', async () => {
    await spec()
      .post('https://reqres.in/api/register')
      .withJson({ email: 'eve.holt@reqres.in' })
      .expectStatus(401)
      .expectJson({ error: 'Missing API key' });
  });

  it('GET /api/users retorna página 1 de usuários e valida keys', async () => {
    await spec()
      .get('https://reqres.in/api/users')
      .expectStatus(200)
      .expectJsonLike({
        page: /\d+/,
        per_page: /\d+/,
        total: /\d+/,
        total_pages: /\d+/,
        data: [
          {
            id: /\d+/,
            email: /.+/,
            first_name: /.+/,
            last_name: /.+/,
            avatar: /.+/
          }
        ],
        support: {
          url: /.+/,
          text: /.+/
        }
      });
  });

  it('GET /api/ retorna descrição da api e valida keys', async () => {
    await spec()
      .get('https://reqres.in/api/')
      .expectStatus(200)
      .expectJsonLike({
        name: /.+/,
        version: /.+/,
        description: /.+/,
        documentation: /.+/,
        endpoints: {
          free: /.+/,
          pro: /.+/,
          health: /.+/
        },
        features: [/.+/]
      });
  });
});
