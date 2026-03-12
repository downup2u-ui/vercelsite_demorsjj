// 模拟的财务服务请求数据
export const designerFinancialRequests = [
  {
    id: "FR001",
    title: "项目预算编制咨询",
    serviceType: "项目预算咨询与编制",
    relatedProject: "环保主题展览设计",
    description: "需要专业财务顾问协助编制环保主题展览设计项目的详细预算，包括材料成本、人力成本、场地租赁等方面的合理估算。",
    attachments: ["project_overview.pdf", "preliminary_budget.xlsx"],
    status: "进行中",
    submittedAt: "2024-07-25",
    responses: [
      {
        respondent: "张财务顾问",
        responseDate: "2024-07-26",
        message: "已收到您的项目预算咨询请求。我已初步审阅了您提供的资料，需要了解更多关于材料供应商和具体展览时间安排的信息，以便提供更精确的预算建议。",
        attachments: ["information_request.docx"]
      }
    ]
  },
  {
    id: "FR002",
    title: "设计师工作室税务筹划",
    serviceType: "税务筹划与申报辅导",
    relatedProject: "2024年度税务规划",
    description: "作为个人工作室，希望了解如何合理进行税务筹划，优化成本结构，合法节税，并获得有关年度申报的专业指导。",
    attachments: ["studio_financial_summary.pdf"],
    status: "已完成",
    submittedAt: "2024-06-10",
    responses: [
      {
        respondent: "王税务专员",
        responseDate: "2024-06-15",
        message: "您好，我已完成对您工作室财务状况的分析。根据您的经营情况，我提出了几项税务筹划建议，包括合理安排收入确认时间、充分利用可抵扣项目、合理设置薪资结构等。详细方案请查看附件。",
        attachments: ["tax_planning_proposal.pdf", "deduction_guide.docx"]
      }
    ]
  },
  {
    id: "FR003",
    title: "跨境设计业务财务咨询",
    serviceType: "其他财务咨询",
    relatedProject: "",
    description: "最近接到海外客户的设计委托，需要了解跨境收款、外汇管理及相关税务处理方面的专业建议。",
    attachments: ["foreign_client_agreement_draft.pdf"],
    status: "待处理",
    submittedAt: "2024-08-01",
    responses: []
  },
  {
    id: "FR004",
    title: "季度财务报表解读",
    serviceType: "财务报表编制与解读",
    relatedProject: "2024年第二季度",
    description: "需要专业财务人员帮助编制并解读工作室第二季度的财务报表，分析运营状况和盈利能力。",
    attachments: ["q2_financial_data.xlsx"],
    status: "已取消",
    submittedAt: "2024-07-02",
    responses: []
  }
];

// 模拟的财务顾问处理的请求
export const financialConsultantRequests = [
  {
    id: "DFR001",
    designerName: "赵设计",
    designerPortfolio: "/profiles/designer-zhao",
    requestType: "税务筹划",
    title: "年度税务优化咨询",
    description: "个人设计工作室年度税务规划咨询，寻求合法减税方案",
    attachments: ["financial_summary_2024.pdf"],
    status: "待处理",
    submittedAt: "2024-08-05"
  },
  {
    id: "DFR002",
    designerName: "钱艺术",
    designerPortfolio: "/profiles/designer-qian",
    requestType: "项目预算",
    title: "大型展览项目预算编制",
    description: "为期三个月的艺术展览项目，需要详细的预算编制与成本控制方案",
    attachments: ["exhibition_plan.docx", "venue_quotations.pdf"],
    status: "处理中",
    submittedAt: "2024-07-28",
    response: {
      message: "我已完成初步的预算框架设计，但需要更多关于人员配置和设备租赁的具体信息。特别是对于灯光设备，市场价格波动较大，建议提供几家供应商的报价以便比较。",
      sentAt: "2024-07-30"
    }
  },
  {
    id: "DFR003",
    designerName: "孙产品",
    designerPortfolio: "/profiles/designer-sun",
    requestType: "财务报表",
    title: "初创设计公司财务报表制作",
    description: "新成立的产品设计公司需要规范的财务报表体系，用于投资人展示",
    attachments: ["company_transactions.xlsx"],
    status: "已完成",
    submittedAt: "2024-07-10",
    response: {
      message: "已完成贵公司的财务报表体系搭建，包括资产负债表、利润表和现金流量表。同时附上了针对投资人展示的财务摘要和关键指标分析。建议每月更新这些报表以便持续监控财务状况。",
      sentAt: "2024-07-18",
      attachments: ["financial_statements_package.xlsx", "investor_presentation_slides.pptx"]
    }
  }
]; 