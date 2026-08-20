class ApiService {
  constructor() {
    if (ApiService.instance) {
      return ApiService.instance;
    }
    this.baseUrl = 'http://localhost:5000/api/courses';
    ApiService.instance = this;
  }

  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async fetchCourses(filter = 'all') {
    let url = this.baseUrl;
    
    if (filter === 'running') {
      url = `${this.baseUrl}/running`;
    } else if (filter === 'offers') {
      url = `${this.baseUrl}/offers`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch courses from server');
    }
    
    return await response.json();
  }
}

export default ApiService;