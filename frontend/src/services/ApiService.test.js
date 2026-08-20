import ApiService from './ApiService';

describe('ApiService Unit & Coverage Tests', () => {
  beforeEach(() => {
    ApiService.instance = null;
    global.fetch = jest.fn(); // Mocking external API fetch dependency
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Req 1: Should enforce Singleton pattern instance isolation', () => {
    const instance1 = ApiService.getInstance();
    const instance2 = ApiService.getInstance();
    expect(instance1).toBe(instance2);
  });

  test('Req 2 & 4: Should fetch default "all" courses using mocked fetch', async () => {
    const mockData = { success: true, data: [{ id: 1, title: 'System Analysis' }] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const service = ApiService.getInstance();
    const result = await service.fetchCourses('all');

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/courses');
    expect(result.data.length).toBe(1);
  });

  test('Req 4: Should test "running" courses branch', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ success: true, data: [] }),
    });

    const service = ApiService.getInstance();
    await service.fetchCourses('running');
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/courses/running');
  });

  test('Req 4: Should test "offers" courses branch', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ success: true, data: [] }),
    });

    const service = ApiService.getInstance();
    await service.fetchCourses('offers');
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/courses/offers');
  });

  test('Req 2 & 4: Should handle non-ok server error response', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false });

    const service = ApiService.getInstance();
    await expect(service.fetchCourses('all')).rejects.toThrow('Failed to fetch courses from server');
  });
});