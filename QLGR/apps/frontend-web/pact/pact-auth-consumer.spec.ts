import path from 'path';
import { Pact } from '@pact-foundation/pact';
import axios from 'axios';

describe('Auth API Pact', () => {
  const provider = new Pact({
    port: 1234,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    consumer: 'frontend-web',
    provider: 'auth-service',
  });

  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  it('should login', async () => {
    await provider.addInteraction({
      state: 'user exists',
      uponReceiving: 'a login request',
      withRequest: {
        method: 'POST',
        path: '/auth/login',
        body: { email: 'admin@example.com', password: 'admin123' },
        headers: { 'Content-Type': 'application/json' },
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          accessToken: 'some-jwt',
          refreshToken: 'some-refresh',
        },
      },
    });

    const res = await axios.post('http://localhost:1234/auth/login', {
      email: 'admin@example.com',
      password: 'admin123',
    });

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('accessToken');
    expect(res.data).toHaveProperty('refreshToken');
    await provider.verify();
  });
});
