// 模拟的知识产权服务请求数据
export const designerIPRequests = [
  {
    id: "IPR001",
    title: "潮玩系列商标注册",
    ipType: "商标注册/保护",
    description: "为新设计的潮玩系列产品进行商标查询，并准备申请材料。初步构想包含图形和文字部分。",
    attachments: ["logo_design_v1.jpg", "brand_concept.pdf"],
    status: "处理中",
    submittedAt: "2024-07-28",
    responses: [
      {
        respondent: "王知产顾问",
        responseDate: "2024-07-29",
        message: "您好，我已收到您的商标注册申请。经初步查询，您的商标设计与现有的几个注册商标存在一定相似度，可能会影响注册成功率。建议对图形部分进行调整，我已在附件中标注了需要注意的部分。",
        attachments: ["similarity_analysis.pdf", "revision_suggestions.docx"]
      }
    ]
  },
  {
    id: "IPR002",
    title: "数字艺术作品版权登记",
    ipType: "版权登记/保护",
    description: "为我的数字艺术作品系列'未来都市'申请版权登记保护，共5幅作品。",
    attachments: ["future_city_collection.zip"],
    status: "已完成",
    submittedAt: "2024-07-22",
    responses: [
      {
        respondent: "刘版权专员",
        responseDate: "2024-07-25",
        message: "您的作品版权登记申请已提交，预计1-2周内完成登记。",
        attachments: []
      },
      {
        respondent: "刘版权专员",
        responseDate: "2024-08-05",
        message: "恭喜您！您的'未来都市'系列作品版权登记已完成，登记证书已生成，请查收附件。",
        attachments: ["copyright_certificate.pdf"]
      }
    ]
  },
  {
    id: "IPR003",
    title: "产品外观设计专利申请",
    ipType: "外观设计专利",
    description: "为新设计的可折叠家具系列申请外观设计专利保护。",
    attachments: ["folding_furniture_designs.pdf", "product_photos.zip"],
    status: "待补充资料",
    submittedAt: "2024-08-01",
    responses: [
      {
        respondent: "张专利顾问",
        responseDate: "2024-08-03",
        message: "您好，您的外观设计专利申请材料我已经初步审阅。需要您补充产品从不同角度的照片或渲染图，以及更详细的设计说明文档。这将有助于提高申请的完整性和成功率。",
        attachments: ["additional_materials_required.pdf"]
      }
    ]
  },
  {
    id: "IPR004",
    title: "作品授权合同审核",
    ipType: "知识产权许可",
    description: "需要专业人士审核与出版社签订的插画作品授权使用合同，确保我的权益得到保障。",
    attachments: ["publishing_contract_draft.pdf"],
    status: "已取消",
    submittedAt: "2024-06-15",
    responses: []
  }
];

// 模拟的知识产权顾问处理的请求
export const ipConsultantRequests = [
  {
    id: "DR001",
    designerName: "张三",
    designerPortfolio: "/profiles/designer-zhangsan",
    requestType: "商标注册",
    title: "服装品牌LOGO商标注册",
    description: "需要为服装品牌'Urban Edge'注册文字及图形商标",
    attachments: ["logo_files.zip", "brand_guidelines.pdf"],
    status: "待处理",
    submittedAt: "2024-08-02"
  },
  {
    id: "DR002",
    designerName: "李四",
    designerPortfolio: "/profiles/designer-lisi",
    requestType: "版权登记",
    title: "家居产品设计作品版权登记",
    description: "需要为10件家居产品设计作品申请版权登记",
    attachments: ["furniture_designs.pdf"],
    status: "处理中",
    submittedAt: "2024-07-30",
    response: {
      message: "您好，我已开始处理您的版权登记申请。我注意到部分设计图的分辨率较低，可能不足以清晰展示设计细节。建议您提供更高分辨率的图片，以便更好地保护您的设计。",
      sentAt: "2024-07-31"
    }
  },
  {
    id: "DR003",
    designerName: "王五",
    designerPortfolio: "/profiles/designer-wangwu",
    requestType: "专利申请",
    title: "可折叠电子设备外观设计专利",
    description: "为创新型可折叠电子设备申请外观设计专利",
    attachments: ["device_drawings.pdf", "technical_specifications.docx"],
    status: "已完成",
    submittedAt: "2024-07-15",
    response: {
      message: "专利申请已成功提交，申请号为CN2024123456。预计审查周期为9-12个月。所有相关文件和收据已附上，请查收。",
      sentAt: "2024-07-20",
      attachments: ["patent_application_receipt.pdf", "filing_confirmation.pdf"]
    }
  }
]; 