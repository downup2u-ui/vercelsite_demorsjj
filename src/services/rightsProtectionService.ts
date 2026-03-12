import { ViolationReportFormData } from '@/components/rights-protection/ViolationReportForm';
import { CaseStatus } from '@/components/rights-protection/CaseTrackingForm';

// 本地存储键
const VIOLATION_REPORTS_KEY = 'violation_reports';

// 存储在本地的报告类型
interface StoredReport extends ViolationReportFormData {
  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
  status: 'pending' | 'reviewing' | 'rejected' | 'approved' | 'resolved';
  evidenceFileNames: string[]; // 由于不能存储File对象，仅存储文件名
  comments?: string[];
}

/**
 * 生成唯一的案件编号
 */
const generateReferenceNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const randomPart = Math.floor(10000 + Math.random() * 90000);
  
  return `IPR-${year}${month}${day}-${randomPart}`;
};

/**
 * 获取所有存储的侵权举报
 */
const getAllReports = (): StoredReport[] => {
  try {
    const reportsJson = localStorage.getItem(VIOLATION_REPORTS_KEY);
    return reportsJson ? JSON.parse(reportsJson) : [];
  } catch (error) {
    console.error('获取侵权举报数据失败:', error);
    return [];
  }
};

/**
 * 保存侵权举报到本地存储
 */
const saveReports = (reports: StoredReport[]): void => {
  try {
    localStorage.setItem(VIOLATION_REPORTS_KEY, JSON.stringify(reports));
  } catch (error) {
    console.error('保存侵权举报数据失败:', error);
  }
};

/**
 * 提交侵权举报
 */
export const submitViolationReport = async (data: ViolationReportFormData): Promise<{ referenceNumber: string }> => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const reports = getAllReports();
  
  // 准备新报告数据
  const now = new Date().toISOString();
  const referenceNumber = generateReferenceNumber();
  
  // 转换文件数据，只保存文件名
  const evidenceFileNames = data.evidenceFiles.map(file => file.name);
  
  const newReport: StoredReport = {
    ...data,
    referenceNumber,
    createdAt: now,
    updatedAt: now,
    status: 'pending',
    evidenceFileNames,
    evidenceFiles: [], // 不存储实际的File对象
    comments: ['您的举报已成功提交，我们的工作人员将尽快进行审核。']
  };
  
  // 添加到报告列表
  reports.push(newReport);
  saveReports(reports);
  
  return { referenceNumber };
};

/**
 * 通过案件编号查询案件状态
 */
export const trackCaseByReferenceNumber = async (referenceNumber: string): Promise<CaseStatus | null> => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const reports = getAllReports();
  const report = reports.find(r => r.referenceNumber === referenceNumber);
  
  if (!report) {
    return null;
  }
  
  // 转换为CaseStatus格式
  return {
    referenceNumber: report.referenceNumber,
    status: report.status,
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
    title: getReportTitle(report),
    description: report.violationDescription,
    comments: report.comments
  };
};

/**
 * 根据举报数据生成标题
 */
const getReportTitle = (report: StoredReport): string => {
  const getViolationTypeName = (type: string): string => {
    switch (type) {
      case 'patent': return '专利';
      case 'trademark': return '商标';
      case 'copyright': return '版权';
      case 'other': return report.violationTypeOther || '其他';
      default: return type;
    }
  };
  
  return `${getViolationTypeName(report.violationType)}侵权举报 - ${report.locationOfViolation}`;
};

/**
 * 获取常见问题列表
 */
export const getFAQs = async () => {
  // 这里可以从API获取，但现在提供静态数据
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 'faq-1',
      question: '什么是知识产权侵权？',
      answer: '知识产权侵权是指未经授权使用、复制、分发或以其他方式侵犯他人合法拥有的知识产权的行为。常见的知识产权侵权包括：<br/><br/>1. <strong>专利侵权</strong>：未经专利权人许可，制造、使用、销售、许诺销售专利产品或使用专利方法<br/>2. <strong>商标侵权</strong>：未经商标注册人许可，在相同或类似商品上使用相同或近似的商标<br/>3. <strong>版权侵权</strong>：未经著作权人许可，复制、发行、表演、展览作品等<br/>4. <strong>商业秘密侵权</strong>：非法获取、披露或使用他人商业秘密',
      category: '基础知识'
    },
    {
      id: 'faq-2',
      question: '我应该如何收集侵权证据？',
      answer: '收集侵权证据是维护您知识产权的关键步骤，有效的证据收集包括：<br/><br/>1. <strong>保存侵权产品样本</strong>：如能安全合法获取，购买侵权产品并保留购买凭证<br/>2. <strong>拍摄照片或录制视频</strong>：对侵权产品、包装、标签等进行拍照或录像，确保清晰可见<br/>3. <strong>网络内容证据保全</strong>：对网络上的侵权内容进行截图，最好通过公证处进行证据保全<br/>4. <strong>记录时间和位置</strong>：详细记录发现侵权的时间、地点、网址等信息<br/>5. <strong>公证取证</strong>：对于重要案件，建议通过公证处进行证据保全，增加证据效力',
      category: '侵权举报'
    },
    {
      id: 'faq-3',
      question: '提交侵权举报后，多久能得到处理结果？',
      answer: '处理时间取决于案件的复杂程度和所涉侵权类型。一般情况下：<br/><br/>1. <strong>初步审核</strong>：1-3个工作日内完成对举报材料的初步审核<br/>2. <strong>详细调查</strong>：复杂案件可能需要2-4周时间进行深入调查<br/>3. <strong>处理结果</strong>：从提交举报到得到最终处理结果，简单案件通常在15个工作日内，复杂案件可能需要1-3个月<br/><br/>您可以随时通过案件编号在本平台查询处理进度。如案件处理超过预期时间，您可以联系我们的客服获取最新进展。',
      category: '处理流程'
    },
    {
      id: 'faq-4',
      question: '我可以撤回已提交的侵权举报吗？',
      answer: '是的，您可以在某些情况下撤回已提交的侵权举报：<br/><br/>1. <strong>审核前撤回</strong>：如果您的举报尚未开始审核，可以完全撤回<br/>2. <strong>审核中撤回</strong>：如果举报正在审核中，您可以申请撤回，但需要说明原因<br/>3. <strong>执行阶段</strong>：如果已进入执行阶段，撤回可能会受到限制<br/><br/>撤回举报需要通过客服联系我们，并提供您的案件编号和身份验证信息。如果撤回是因为与侵权方达成和解，我们建议您将和解协议内容告知我们，以便完整记录案件处理过程。',
      category: '处理流程'
    },
    {
      id: 'faq-5',
      question: '哪些知识产权受法律保护？',
      answer: '中国法律保护的主要知识产权类型包括：<br/><br/>1. <strong>专利权</strong>：包括发明专利（保护期20年）、实用新型专利（保护期10年）和外观设计专利（保护期15年）<br/>2. <strong>商标权</strong>：注册商标的保护期为10年，可以无限次续展<br/>3. <strong>著作权</strong>：作者生前及死后50年（自然人作者）或首次发表后50年（法人或其他组织）<br/>4. <strong>商业秘密</strong>：只要信息保持非公开状态且具有商业价值，就可以持续受到保护<br/>5. <strong>集成电路布图设计权</strong>：保护期为10年<br/>6. <strong>植物新品种权</strong>：保护期为15-20年（取决于植物类型）<br/><br/>注意，不同类型的知识产权有不同的保护要求和期限，建议咨询专业律师了解具体情况。',
      category: '基础知识'
    },
    {
      id: 'faq-6',
      question: '我发现有人侵犯我的知识产权，有哪些解决途径？',
      answer: '面对知识产权侵权，您有多种解决途径：<br/><br/>1. <strong>直接沟通</strong>：向侵权方发送侵权通知，要求停止侵权行为<br/>2. <strong>平台举报</strong>：如果侵权发生在电商平台、社交媒体等，可以通过平台知识产权保护机制举报<br/>3. <strong>行政投诉</strong>：向相关行政部门（如市场监督管理局、版权局等）投诉<br/>4. <strong>司法诉讼</strong>：向法院提起民事诉讼，要求停止侵权并赔偿损失<br/>5. <strong>调解和仲裁</strong>：通过第三方调解或仲裁机构解决纠纷<br/>6. <strong>海关保护</strong>：对于进出口产品的侵权，可以申请海关知识产权保护<br/><br/>不同情况适合不同的解决方式，您可以根据侵权严重程度、证据充分性、时间和成本考虑等因素选择最适合的方式。',
      category: '侵权举报'
    },
    {
      id: 'faq-7',
      question: '提交侵权举报需要哪些材料？',
      answer: '提交有效的侵权举报通常需要以下材料：<br/><br/>1. <strong>知识产权证明文件</strong>：如专利证书、商标注册证、著作权登记证书或其他权利证明<br/>2. <strong>侵权证据</strong>：侵权产品照片、网页截图、购买凭证、测试报告等<br/>3. <strong>对比分析</strong>：说明侵权产品/内容与您的知识产权之间的相似点和侵权点<br/>4. <strong>权利人身份证明</strong>：个人身份证明或企业营业执照复印件<br/>5. <strong>授权文件</strong>：如果您不是权利人本人，需提供授权委托书<br/><br/>提供详细、准确的材料有助于加快处理流程。对于不同类型的知识产权侵权，可能需要提供的具体材料有所不同。',
      category: '侵权举报'
    },
    {
      id: 'faq-8',
      question: '知识产权侵权的法律责任有哪些？',
      answer: '知识产权侵权可能导致多种法律责任：<br/><br/>1. <strong>民事责任</strong>：<br/>- 停止侵权<br/>- 赔偿经济损失（包括权利人的实际损失或侵权人的违法所得）<br/>- 赔偿合理维权费用<br/>- 消除影响、恢复名誉<br/><br/>2. <strong>行政责任</strong>：<br/>- 行政罚款<br/>- 没收违法所得<br/>- 没收、销毁侵权产品和主要用于制造侵权产品的工具<br/><br/>3. <strong>刑事责任</strong>：<br/>- 对情节严重的侵权行为，可能构成犯罪，处以罚金甚至有期徒刑<br/><br/>侵权责任的轻重取决于侵权行为的性质、情节、范围和造成的损害等因素。',
      category: '法律法规'
    },
    {
      id: 'faq-9',
      question: '我们公司想加强知识产权保护，有哪些建议？',
      answer: '企业加强知识产权保护的建议：<br/><br/>1. <strong>全面梳理和注册</strong>：<br/>- 对公司现有的技术、品牌、设计等进行梳理<br/>- 及时申请专利、注册商标、登记著作权<br/>- 考虑在主要市场国家进行知识产权布局<br/><br/>2. <strong>建立内部管理制度</strong>：<br/>- 制定知识产权管理规章制度<br/>- 与员工签订保密协议和知识产权归属协议<br/>- 对核心技术和商业秘密设立访问权限<br/><br/>3. <strong>定期监测市场</strong>：<br/>- 开展市场监测，及时发现侵权行为<br/>- 使用知识产权监测工具或服务<br/>- 建立侵权应对预案<br/><br/>4. <strong>知识产权培训</strong>：<br/>- 对员工进行知识产权意识培训<br/>- 让研发人员了解专利申请流程和标准<br/><br/>5. <strong>合作前尽职调查</strong>：<br/>- 与他人合作前进行知识产权尽职调查<br/>- 在合同中明确知识产权条款<br/><br/>6. <strong>寻求专业支持</strong>：<br/>- 聘请知识产权律师或顾问<br/>- 与专业知识产权服务机构合作',
      category: '保护策略'
    },
    {
      id: 'faq-10',
      question: '知识产权的地域限制是什么？',
      answer: '知识产权保护通常遵循"地域性原则"：<br/><br/>1. <strong>地域限制基本原则</strong>：<br/>- 知识产权保护通常限于授予或认可该权利的国家或地区<br/>- 在一个国家获得的知识产权保护不自动延伸到其他国家<br/><br/>2. <strong>不同类型知识产权的地域性</strong>：<br/>- <strong>专利权</strong>：必须在每个希望获得保护的国家单独申请<br/>- <strong>商标权</strong>：同样需要在各个国家单独注册，虽然有马德里体系等国际注册途径<br/>- <strong>著作权</strong>：根据《伯尔尼公约》等国际条约，著作权在成员国间可以得到一定程度的自动互认<br/><br/>3. <strong>应对地域限制的方法</strong>：<br/>- 通过国际条约途径（如PCT国际专利申请、马德里商标国际注册）<br/>- 在重要市场国家及时申请保护<br/>- 利用优先权制度在多国申请保护<br/><br/>对于跨国经营的企业，建议制定全球知识产权保护策略，在主要市场国家及时申请相应的知识产权保护。',
      category: '法律法规'
    }
  ];
};

/**
 * 模拟案件状态更新
 * 在实际应用中，这应该由管理员通过后台系统完成
 */
export const simulateCaseUpdate = async (referenceNumber: string): Promise<boolean> => {
  const reports = getAllReports();
  const reportIndex = reports.findIndex(r => r.referenceNumber === referenceNumber);
  
  if (reportIndex === -1) {
    return false;
  }
  
  const report = reports[reportIndex];
  
  // 根据当前状态更新到下一状态
  switch (report.status) {
    case 'pending':
      report.status = 'reviewing';
      report.comments?.push('您的举报已开始审核。我们的专业团队正在评估您提供的信息和证据。');
      break;
    case 'reviewing':
      // 随机决定是批准还是拒绝
      if (Math.random() > 0.3) {
        report.status = 'approved';
        report.comments?.push('您的举报已通过审核。我们确认存在侵权行为，将采取相应措施处理。');
      } else {
        report.status = 'rejected';
        report.comments?.push('经审核，您提供的信息和证据不足以确认侵权行为。请提供更详细的证据材料。');
      }
      break;
    case 'approved':
      report.status = 'resolved';
      report.comments?.push('侵权问题已解决。相关侵权内容已被移除或处理。感谢您的举报。');
      break;
    default:
      return false;
  }
  
  report.updatedAt = new Date().toISOString();
  reports[reportIndex] = report;
  saveReports(reports);
  
  return true;
}; 