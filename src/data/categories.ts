export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  level: 1 | 2 | 3 | 4;  // Category level: 1=primary, 2=secondary, 3=tertiary, 4=quaternary
  parentId?: string;     // Parent category ID
  subcategories?: string[]; // IDs of child categories
  introduction?: string;
  applications?: string[];
  trends?: string[];
  keyTechnologies?: string[];
  heroImage?: string;
  designers?: string[];  // Designer IDs who have created products in this category
  artworks?: number;
  events?: number;
}

export const primaryCategories: CategoryInfo[] = [
  {
    id: "cultural_arts",
    name: "文化艺术领域",
    description: "致力于文化遗产的保护与传承，艺术作品的复制与创新，为文化艺术领域提供先进技术支持。",
    level: 1,
    introduction: "文化艺术领域应用3D打印技术，实现文物保护与复制、艺术创作与表达的创新方式，为传统文化注入新的活力。",
    applications: [
      "文物复制（青铜器、陶瓷器）",
      "艺术装置（沉浸式艺术体验）",
      "艺术衍生品（博物馆文创）",
      "数字艺术实体化（NFT实物化）"
    ],
    trends: [
      "文化遗产数字化保护与复原",
      "数字艺术与实体艺术融合",
      "沉浸式艺术体验装置",
      "博物馆文创产业发展"
    ],
    keyTechnologies: [
      "高精度扫描与复制技术",
      "多材料艺术打印",
      "文物修复专用材料",
      "数字艺术转换算法"
    ],
    heroImage: "/images/applications/art.svg",
    subcategories: ["cultural_arts_heritage", "cultural_arts_art"]
  },
  {
    id: "creative_design",
    name: "创意设计领域",
    description: "为创意设计提供从概念到实体的全流程解决方案，赋能创意产业的快速发展与创新。",
    level: 1,
    introduction: "创意设计领域利用3D打印技术，将设计师的创意快速转化为实体产品，实现设计迭代与个性化定制，推动创意产业发展。",
    applications: [
      "潮玩手办（IP形象、角色模型）",
      "异形家具（概念家居）",
      "艺术灯具（几何灯罩）",
      "生活日用品（花器、容器）"
    ],
    trends: [
      "IP衍生品市场扩张",
      "定制化家居产品普及",
      "设计师品牌崛起",
      "创意设计与功能结合"
    ],
    keyTechnologies: [
      "彩色打印技术",
      "多材料混合打印",
      "表面处理工艺",
      "结构优化算法"
    ],
    heroImage: "/images/applications/consumer.svg",
    subcategories: ["creative_design_toys", "creative_design_interior", "creative_design_daily"]
  },
  {
    id: "architectural_design",
    name: "建筑设计领域",
    description: "将先进制造技术应用于建筑设计领域，实现复杂结构的高精度实体化，推动建筑创新。",
    level: 1,
    introduction: "建筑设计领域通过3D打印技术，实现复杂建筑结构的快速原型与实体化，助力建筑设计创新和可持续发展。",
    applications: [
      "建筑概念模型（竞标展示）",
      "建筑结构化生产（复杂构件）",
      "复杂架构实体化（参数化设计）",
      "应急房屋制造（快速部署住所）"
    ],
    trends: [
      "参数化建筑设计普及",
      "建筑3D打印技术成熟",
      "可持续建筑材料研发",
      "建筑信息模型(BIM)集成"
    ],
    keyTechnologies: [
      "大型建筑打印设备",
      "建筑级材料开发",
      "结构优化算法",
      "现场打印系统"
    ],
    heroImage: "/images/applications/construction.svg",
    subcategories: ["architectural_design_models", "architectural_design_experimental"]
  },
  {
    id: "engineering_industrial",
    name: "工程工业领域",
    description: "为工业制造提供定制化解决方案，助力产业升级与技术创新，提升制造效率与产品性能。",
    level: 1,
    introduction: "工程工业领域利用3D打印技术，实现复杂零部件的轻量化设计与高效制造，满足先进工业生产的多样化需求。",
    applications: [
      "汽车零部件（轻量化支架）",
      "内饰定制（人机工程学设计）",
      "消费电子产品（外壳、支架）",
      "工业设备部件（功能性零件）"
    ],
    trends: [
      "数字化供应链转型",
      "智能制造集成",
      "金属3D打印普及",
      "工业级材料多样化"
    ],
    keyTechnologies: [
      "金属激光选区熔合(SLM)",
      "电子束熔合(EBM)",
      "高温合金材料",
      "拓扑优化设计"
    ],
    heroImage: "/images/applications/product.svg",
    subcategories: ["engineering_industrial_automotive", "engineering_industrial_electronics", "engineering_industrial_equipment"]
  },
  {
    id: "medical_health",
    name: "医疗健康领域",
    description: "应用精密制造技术于医疗健康领域，提供个性化医疗解决方案，提升医疗效果与患者体验。",
    level: 1,
    introduction: "医疗健康领域通过3D打印技术，实现个性化医疗器械、植入物与辅助设备的精准制造，推动精准医疗发展。",
    applications: [
      "截骨导板（骨科手术导航）",
      "定制化植入物（颅骨修复板）",
      "体外假体（功能性义肢）",
      "牙齿矫正（牙科模型与矫正器）"
    ],
    trends: [
      "生物相容性材料研发",
      "医用级打印设备普及",
      "个性化医疗方案",
      "生物打印技术发展"
    ],
    keyTechnologies: [
      "医用级材料开发",
      "患者数据建模",
      "生物打印技术",
      "植入物优化算法"
    ],
    heroImage: "/images/applications/medical.svg",
    subcategories: ["medical_health_devices", "medical_health_dental"]
  },
  {
    id: "fashion_media",
    name: "时尚媒体领域",
    description: "将创新技术融入时尚产业，创造独特设计与功能性产品，引领时尚趋势与可持续发展。",
    level: 1,
    introduction: "时尚媒体领域借助3D打印技术，打破传统设计与制造限制，创造创新时尚产品与媒体内容，推动时尚产业数字化转型。",
    applications: [
      "实验性时装（概念服装、走秀单品）",
      "功能性服饰（定制运动装备）",
      "服装面料（可变形织物）",
      "鞋履箱包（轻量化结构）"
    ],
    trends: [
      "可持续时尚设计",
      "数字化时尚展示",
      "功能性与美学结合",
      "个性化定制服务"
    ],
    keyTechnologies: [
      "柔性材料打印",
      "纤维增强复合材料",
      "4D打印技术",
      "可穿戴设计优化"
    ],
    heroImage: "/images/applications/fashion.svg",
    subcategories: ["fashion_media_clothing", "fashion_media_accessories"]
  }
];

export const subcategories: CategoryInfo[] = [
  // 文化艺术领域子分类
  {
    id: "cultural_arts_heritage",
    name: "文物",
    parentId: "cultural_arts",
    level: 2,
    description: "3D打印技术在文物保护、复制与文创开发中的应用",
    subcategories: ["cultural_arts_heritage_replication", "cultural_arts_heritage_creative"]
  },
  {
    id: "cultural_arts_art",
    name: "艺术",
    parentId: "cultural_arts",
    level: 2,
    description: "3D打印技术在艺术创作、复制与展示中的创新应用",
    subcategories: ["cultural_arts_art_installation", "cultural_arts_art_derivatives", "cultural_arts_art_replicas", "cultural_arts_art_digital"]
  },
  
  // 文物三级分类
  {
    id: "cultural_arts_heritage_replication",
    name: "文物复制",
    parentId: "cultural_arts_heritage",
    level: 3,
    description: "高精度文物扫描与复制技术，用于文物保存、展示与研究"
  },
  {
    id: "cultural_arts_heritage_creative",
    name: "文物文创衍生品",
    parentId: "cultural_arts_heritage",
    level: 3,
    description: "基于文物元素的创意文化产品开发"
  },
  
  // 艺术三级分类
  {
    id: "cultural_arts_art_installation",
    name: "艺术装置",
    parentId: "cultural_arts_art",
    level: 3,
    description: "利用3D打印技术创作的艺术装置，实现复杂艺术表达"
  },
  {
    id: "cultural_arts_art_derivatives",
    name: "艺术衍生品",
    parentId: "cultural_arts_art",
    level: 3,
    description: "基于艺术作品的衍生产品，拓展艺术的可及性"
  },
  {
    id: "cultural_arts_art_replicas",
    name: "艺术复制品",
    parentId: "cultural_arts_art",
    level: 3,
    description: "高精度艺术作品复制，用于教育、展示与收藏"
  },
  {
    id: "cultural_arts_art_digital",
    name: "数字艺术实体化",
    parentId: "cultural_arts_art",
    level: 3,
    description: "将数字艺术作品转化为实体展品，包括NFT实物化"
  },

  // 创意设计领域子分类
  {
    id: "creative_design_toys",
    name: "潮玩",
    parentId: "creative_design",
    level: 2,
    description: "3D打印技术在潮流玩具与收藏品设计制造中的应用",
    subcategories: ["creative_design_toys_figurines", "creative_design_toys_merchandise"]
  },
  {
    id: "creative_design_interior",
    name: "室内设计",
    parentId: "creative_design",
    level: 2,
    description: "3D打印技术在室内设计与家居产品中的创新应用",
    subcategories: ["creative_design_interior_furniture", "creative_design_interior_lighting", "creative_design_interior_decoration"]
  },
  {
    id: "creative_design_daily",
    name: "生活日用",
    parentId: "creative_design",
    level: 2,
    description: "3D打印技术在日常生活用品中的应用",
    subcategories: ["creative_design_daily_containers", "creative_design_daily_accessories"]
  },

  // 潮玩三级分类
  {
    id: "creative_design_toys_figurines",
    name: "潮玩手办",
    parentId: "creative_design_toys",
    level: 3,
    description: "3D打印制作的潮流玩具与收藏手办"
  },
  {
    id: "creative_design_toys_merchandise",
    name: "电影动漫周边",
    parentId: "creative_design_toys",
    level: 3,
    description: "影视与动漫IP周边产品的3D打印制作"
  },

  // 室内设计三级分类
  {
    id: "creative_design_interior_furniture",
    name: "异形家具",
    parentId: "creative_design_interior",
    level: 3,
    description: "3D打印技术制作的创新形态家具"
  },
  {
    id: "creative_design_interior_lighting",
    name: "艺术灯具",
    parentId: "creative_design_interior",
    level: 3,
    description: "3D打印技术制作的艺术照明产品"
  },
  {
    id: "creative_design_interior_decoration",
    name: "家居装饰",
    parentId: "creative_design_interior",
    level: 3,
    description: "3D打印技术制作的家居装饰品与艺术品"
  },

  // 生活日用三级分类
  {
    id: "creative_design_daily_containers",
    name: "花器容器",
    parentId: "creative_design_daily",
    level: 3,
    description: "3D打印技术制作的花瓶、容器等日用品"
  },
  {
    id: "creative_design_daily_accessories",
    name: "电子设备配件",
    parentId: "creative_design_daily",
    level: 3,
    description: "3D打印技术制作的电子产品配件与支架"
  },

  // 建筑设计领域子分类
  {
    id: "architectural_design_models",
    name: "建筑模型",
    parentId: "architectural_design",
    level: 2,
    description: "3D打印技术在建筑模型与概念展示中的应用",
    subcategories: ["architectural_design_models_concept"]
  },
  {
    id: "architectural_design_experimental",
    name: "实验建筑",
    parentId: "architectural_design",
    level: 2,
    description: "3D打印技术在实验性建筑结构与创新建造中的应用",
    subcategories: ["architectural_design_experimental_structure", "architectural_design_experimental_complex", "architectural_design_experimental_emergency"]
  },

  // 建筑模型三级分类
  {
    id: "architectural_design_models_concept",
    name: "建筑概念模型",
    parentId: "architectural_design_models",
    level: 3,
    description: "3D打印技术制作的建筑设计概念模型，用于展示与沟通"
  },

  // 实验建筑三级分类
  {
    id: "architectural_design_experimental_structure",
    name: "建筑结构化生产",
    parentId: "architectural_design_experimental",
    level: 3,
    description: "3D打印技术在建筑结构部件生产中的应用"
  },
  {
    id: "architectural_design_experimental_complex",
    name: "复杂架构实体化",
    parentId: "architectural_design_experimental",
    level: 3,
    description: "复杂建筑结构与形态的3D打印实现"
  },
  {
    id: "architectural_design_experimental_emergency",
    name: "应急房屋制造",
    parentId: "architectural_design_experimental",
    level: 3,
    description: "3D打印技术在快速应急住所建造中的应用"
  },

  // 工程工业领域子分类
  {
    id: "engineering_industrial_automotive",
    name: "汽车制造",
    parentId: "engineering_industrial",
    level: 2,
    description: "3D打印技术在汽车工业中的应用",
    subcategories: ["engineering_industrial_automotive_parts", "engineering_industrial_automotive_interior"]
  },
  {
    id: "engineering_industrial_electronics",
    name: "电子产品",
    parentId: "engineering_industrial",
    level: 2,
    description: "3D打印技术在电子产品制造中的应用",
    subcategories: ["engineering_industrial_electronics_consumer"]
  },
  {
    id: "engineering_industrial_equipment",
    name: "工业设备部件",
    parentId: "engineering_industrial",
    level: 2,
    description: "3D打印技术在工业设备零部件中的应用",
    subcategories: []
  },

  // 汽车制造三级分类
  {
    id: "engineering_industrial_automotive_parts",
    name: "汽车零部件",
    parentId: "engineering_industrial_automotive",
    level: 3,
    description: "3D打印技术制造的轻量化汽车零部件"
  },
  {
    id: "engineering_industrial_automotive_interior",
    name: "内饰定制",
    parentId: "engineering_industrial_automotive",
    level: 3,
    description: "3D打印技术在汽车内饰个性化定制中的应用"
  },

  // 电子产品三级分类
  {
    id: "engineering_industrial_electronics_consumer",
    name: "消费电子产品",
    parentId: "engineering_industrial_electronics",
    level: 3,
    description: "3D打印技术在消费电子产品设计与制造中的应用"
  },

  // 医疗健康领域子分类
  {
    id: "medical_health_devices",
    name: "医疗设备",
    parentId: "medical_health",
    level: 2,
    description: "3D打印技术在医疗设备与辅助器具中的应用",
    subcategories: ["medical_health_devices_guide", "medical_health_devices_implants", "medical_health_devices_prosthetics"]
  },
  {
    id: "medical_health_dental",
    name: "牙科矫正",
    parentId: "medical_health",
    level: 2,
    description: "3D打印技术在牙科医疗中的应用",
    subcategories: ["medical_health_dental_orthodontics"]
  },

  // 医疗设备三级分类
  {
    id: "medical_health_devices_guide",
    name: "截骨导板",
    parentId: "medical_health_devices",
    level: 3,
    description: "3D打印技术制作的手术导航与截骨导板"
  },
  {
    id: "medical_health_devices_implants",
    name: "定制化植入物",
    parentId: "medical_health_devices",
    level: 3,
    description: "3D打印技术制作的个性化医疗植入物"
  },
  {
    id: "medical_health_devices_prosthetics",
    name: "体外假体",
    parentId: "medical_health_devices",
    level: 3,
    description: "3D打印技术制作的个性化义肢与外部假体"
  },

  // 牙科矫正三级分类
  {
    id: "medical_health_dental_orthodontics",
    name: "牙齿矫正",
    parentId: "medical_health_dental",
    level: 3,
    description: "3D打印技术在牙齿矫正与牙科修复中的应用"
  },

  // 时尚媒体领域子分类
  {
    id: "fashion_media_clothing",
    name: "服装",
    parentId: "fashion_media",
    level: 2,
    description: "3D打印技术在服装设计与制造中的应用",
    subcategories: ["fashion_media_clothing_experimental", "fashion_media_clothing_functional", "fashion_media_clothing_fabrics"]
  },
  {
    id: "fashion_media_accessories",
    name: "配饰",
    parentId: "fashion_media",
    level: 2,
    description: "3D打印技术在时尚配饰中的应用",
    subcategories: ["fashion_media_accessories_footwear", "fashion_media_accessories_wearable"]
  },

  // 服装三级分类
  {
    id: "fashion_media_clothing_experimental",
    name: "实验性时装",
    parentId: "fashion_media_clothing",
    level: 3,
    description: "3D打印技术在概念时装与艺术服装中的应用"
  },
  {
    id: "fashion_media_clothing_functional",
    name: "功能性服饰",
    parentId: "fashion_media_clothing",
    level: 3,
    description: "3D打印技术在功能性服装中的应用"
  },
  {
    id: "fashion_media_clothing_fabrics",
    name: "服装面料",
    parentId: "fashion_media_clothing",
    level: 3,
    description: "3D打印技术在服装面料与纺织创新中的应用"
  },

  // 配饰三级分类
  {
    id: "fashion_media_accessories_footwear",
    name: "鞋履箱包",
    parentId: "fashion_media_accessories",
    level: 3,
    description: "3D打印技术在鞋类与箱包设计中的应用"
  },
  {
    id: "fashion_media_accessories_wearable",
    name: "穿戴配饰",
    parentId: "fashion_media_accessories",
    level: 3,
    description: "3D打印技术在穿戴配饰中的应用"
  }
];

export const categories = [...primaryCategories, ...subcategories];

// 获取所有分类（一级+二级）
export const allCategories = [...primaryCategories, ...subcategories];

// Helper functions for working with categories
export const categoryUtils = {
  // 通过ID获取分类信息
  getCategoryById(id: string): CategoryInfo | undefined {
    if (id.startsWith('primary_')) {
      return primaryCategories.find(cat => cat.id === id.substring(8));
    }
    return [...primaryCategories, ...subcategories].find(cat => cat.id === id);
  },
  
  // 获取指定级别的分类
  getCategoriesByLevel(level: 1 | 2 | 3 | 4): CategoryInfo[] {
    return [...primaryCategories, ...subcategories].filter(cat => cat.level === level);
  },
  
  // 获取子分类
  getSubcategoriesByParentId(parentId: string): CategoryInfo[] {
    return subcategories.filter(cat => cat.parentId === parentId);
  },
  
  // 获取分类名称
  getCategoryName(id: string): string {
    const category = this.getCategoryById(id);
    return category ? category.name : id;
  },
  
  // 检查是否为主分类
  isPrimaryCategory(id: string): boolean {
    return primaryCategories.some(cat => cat.id === id);
  },
  
  // 获取分类的父分类
  getParentCategory(id: string): CategoryInfo | undefined {
    const category = this.getCategoryById(id);
    if (category && category.parentId) {
      return this.getCategoryById(category.parentId);
    }
    return undefined;
  },
  
  // 获取分类的完整路径（从一级到当前级别）
  getCategoryPath(id: string): CategoryInfo[] {
    const result: CategoryInfo[] = [];
    let currentCategory = this.getCategoryById(id);
    
    while (currentCategory) {
      result.unshift(currentCategory);
      if (currentCategory.parentId) {
        currentCategory = this.getCategoryById(currentCategory.parentId);
      } else {
        break;
      }
    }
    
    return result;
  },
  
  // 获取特定分类下的所有产品
  getProductsByCategory(categoryId: string, artworks: any[]): any[] {
    // 获取当前分类及其所有子分类
    const allCategoryIds = this.getAllSubcategoryIds(categoryId);
    // 返回属于这些分类的所有产品
    return artworks.filter(artwork => 
      artwork.category.some((cat: string) => allCategoryIds.includes(cat))
    );
  },
  
  // 获取分类及其所有子分类的ID
  getAllSubcategoryIds(categoryId: string): string[] {
    if (categoryId === 'all') {
      return [];
    }
    
    const result = [categoryId];
    const category = this.getCategoryById(categoryId);
    
    if (category && category.subcategories && category.subcategories.length > 0) {
      for (const subId of category.subcategories) {
        result.push(...this.getAllSubcategoryIds(subId));
      }
    }
    
    return result;
  },
  
  // 根据设计师ID获取该设计师在特定四级分类下的产品
  getProductsByDesignerAndCategory(designerId: string, categoryId: string, artworks: any[]): any[] {
    // 确保是四级分类
    const category = this.getCategoryById(categoryId);
    if (!category || category.level !== 4) {
      return [];
    }
    
    // 返回该设计师在该分类下的所有产品
    return artworks.filter(artwork => 
      artwork.creatorId === designerId && 
      artwork.category.includes(categoryId)
    );
  }
};

// 向后兼容的函数
export const getSubcategories = categoryUtils.getSubcategoriesByParentId.bind(categoryUtils);
