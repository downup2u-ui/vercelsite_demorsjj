// 定义项目类型
export interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  startDate: string;
  endDate?: string;
  description: string;
}

// 模拟项目数据
const mockProjects: Project[] = [
  {
    id: '1',
    name: '智能家居产品设计',
    status: 'active',
    startDate: '2023-06-15',
    endDate: '2023-12-30',
    description: '开发一系列智能家居产品，包括智能音箱、灯光控制系统等。这个项目旨在创造用户友好、功能强大的家居智能化解决方案，使用户能够通过语音或移动应用程序轻松控制家中的设备。我们将注重产品的设计美感、实用性和互操作性，确保不同设备之间能够无缝协作。',
  },
  {
    id: '2',
    name: '环保包装设计',
    status: 'completed',
    startDate: '2023-01-10',
    endDate: '2023-05-20',
    description: '为日用品设计可生物降解的环保包装，减少塑料使用。本项目致力于通过创新设计减少环境污染，同时保持产品的保护功能和美观度。我们使用可回收材料和最小化设计来减少资源消耗，同时考虑了生产成本控制和消费者使用便利性。',
  },
  {
    id: '3',
    name: '电动汽车充电站',
    status: 'pending',
    startDate: '2023-08-01',
    description: '设计便携式电动汽车充电站，提高充电便利性。随着电动汽车的普及，便捷高效的充电解决方案变得越来越重要。这个项目将开发一种紧凑型充电站，可以安装在各种场所，如停车场、商场和住宅区。我们将着重优化充电速度、安全性和用户交互体验。',
  },
  {
    id: '4',
    name: '智能手表界面设计',
    status: 'active',
    startDate: '2023-07-05',
    endDate: '2023-10-30',
    description: '为新一代智能手表设计用户界面和交互体验。该项目将关注易用性、信息层次结构和视觉设计，创建符合品牌标识的界面，同时保证在小屏幕上的可读性和功能性。',
  },
  {
    id: '5',
    name: '办公家具系列设计',
    status: 'completed',
    startDate: '2022-11-22',
    endDate: '2023-03-15',
    description: '设计符合人体工程学的办公家具系列，提高工作舒适度。该项目包括办公椅、桌子、储物解决方案和隔断系统，旨在提高工作效率并减轻久坐带来的健康问题。',
  },
  {
    id: '6',
    name: '儿童玩具安全设计',
    status: 'pending',
    startDate: '2023-09-10',
    description: '针对3-6岁儿童设计安全、教育性强的玩具系列。重点是创造既有趣又有教育价值的产品，同时确保所有组件符合最严格的安全标准，不会对儿童造成潜在危害。',
  },
];

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 项目服务类
export class ProjectService {
  // 获取所有项目
  static async getProjects(): Promise<Project[]> {
    try {
      // 模拟API调用
      await delay(500);
      
      // 在实际应用中，这里会是一个fetch请求
      // const response = await fetch('/api/projects');
      // if (!response.ok) throw new Error('Failed to fetch projects');
      // return await response.json();
      
      return [...mockProjects];
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  // 根据ID获取项目
  static async getProjectById(id: string): Promise<Project | null> {
    try {
      // 模拟API调用
      await delay(300);
      
      // 在实际应用中，这里会是一个fetch请求
      // const response = await fetch(`/api/projects/${id}`);
      // if (!response.ok) throw new Error('Failed to fetch project');
      // return await response.json();
      
      const project = mockProjects.find(p => p.id === id);
      return project || null;
    } catch (error) {
      console.error(`Error fetching project with ID ${id}:`, error);
      throw error;
    }
  }

  // 创建新项目
  static async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    try {
      // 模拟API调用
      await delay(700);
      
      // 在实际应用中，这里会是一个POST请求
      // const response = await fetch('/api/projects', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(project)
      // });
      // if (!response.ok) throw new Error('Failed to create project');
      // return await response.json();
      
      // 创建一个带有新ID的项目
      const newProject: Project = {
        ...project,
        id: (mockProjects.length + 1).toString()
      };
      
      // 在实际应用中，这个数据会被保存到数据库中
      // 这里我们只是模拟添加到数组
      mockProjects.push(newProject);
      
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // 更新项目
  static async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    try {
      // 模拟API调用
      await delay(600);
      
      // 在实际应用中，这里会是一个PUT或PATCH请求
      // const response = await fetch(`/api/projects/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      // if (!response.ok) throw new Error('Failed to update project');
      // return await response.json();
      
      // 找到要更新的项目
      const projectIndex = mockProjects.findIndex(p => p.id === id);
      if (projectIndex === -1) {
        throw new Error(`Project with ID ${id} not found`);
      }
      
      // 更新项目
      const updatedProject: Project = {
        ...mockProjects[projectIndex],
        ...updates
      };
      
      // 在实际应用中，这个数据会被保存到数据库中
      // 这里我们只是模拟更新数组中的项目
      mockProjects[projectIndex] = updatedProject;
      
      return updatedProject;
    } catch (error) {
      console.error(`Error updating project with ID ${id}:`, error);
      throw error;
    }
  }

  // 删除项目
  static async deleteProject(id: string): Promise<boolean> {
    try {
      // 模拟API调用
      await delay(400);
      
      // 在实际应用中，这里会是一个DELETE请求
      // const response = await fetch(`/api/projects/${id}`, {
      //   method: 'DELETE'
      // });
      // return response.ok;
      
      // 找到要删除的项目索引
      const projectIndex = mockProjects.findIndex(p => p.id === id);
      if (projectIndex === -1) {
        throw new Error(`Project with ID ${id} not found`);
      }
      
      // 在实际应用中，这个数据会从数据库中删除
      // 这里我们只是模拟从数组中删除
      mockProjects.splice(projectIndex, 1);
      
      return true;
    } catch (error) {
      console.error(`Error deleting project with ID ${id}:`, error);
      throw error;
    }
  }

  // 搜索和筛选项目
  static async searchProjects(query: string, status?: string): Promise<Project[]> {
    try {
      // 模拟API调用
      await delay(300);
      
      // 在实际应用中，这里会是一个GET请求，带有查询参数
      // const params = new URLSearchParams();
      // if (query) params.append('query', query);
      // if (status) params.append('status', status);
      // const response = await fetch(`/api/projects/search?${params}`);
      // if (!response.ok) throw new Error('Failed to search projects');
      // return await response.json();
      
      // 获取所有项目
      let results = [...mockProjects];
      
      // 应用搜索过滤
      if (query) {
        const lowercaseQuery = query.toLowerCase();
        results = results.filter(project => 
          project.name.toLowerCase().includes(lowercaseQuery) || 
          project.description.toLowerCase().includes(lowercaseQuery)
        );
      }
      
      // 应用状态过滤
      if (status) {
        results = results.filter(project => project.status === status);
      }
      
      return results;
    } catch (error) {
      console.error('Error searching projects:', error);
      throw error;
    }
  }
} 