// 模拟设计师的法律服务请求数据
export const designerLegalRequests = [
  {
    id: "LR001",
    title: "设计服务合同起草",
    serviceType: "contract_drafting",
    description: "需要一份设计服务合同，用于XYZ品牌视觉识别系统设计项目。合同应包括：\n- 服务范围明确定义\n- 付款条件和时间表\n- 知识产权条款\n- 保密条款\n- 项目交付标准\n\n希望尽快完成，以便启动正式合作。",
    relatedProject: "XYZ品牌视觉识别系统",
    submittedAt: "2024-07-10 14:23",
    status: "in_progress",
    statusText: "律师处理中",
    assignedLawyer: "张律师",
    attachments: ["项目需求说明.pdf", "参考合同模板.docx"],
    responses: [
      {
        respondent: "张律师 (法务顾问)",
        responseDate: "2024-07-11 09:45",
        message: "您好，已收到您的设计服务合同起草请求。我正在根据您提供的信息准备合同初稿。\n\n我需要一些额外信息：\n1. 项目预计持续时间\n2. 您期望的付款方式（一次性付款或分阶段付款）\n3. 是否需要包含版权转让条款\n\n请在方便时回复上述问题，我将尽快完成合同起草。",
        attachments: []
      }
    ]
  },
  {
    id: "LR002",
    title: "NDA保密协议审核",
    serviceType: "nda_review",
    description: `客户提供了一份保密协议(NDA)，在我开始新产品"Alpha"概念设计前需要签署。希望法务团队能审核这份NDA，确保我的权益受到保护。\n\n特别关注点：\n- 保密期限是否合理\n- 是否有过于宽泛的限制条款\n- 违约责任是否对等`,
    relatedProject: `新产品"Alpha"概念设计`,
    submittedAt: "2024-07-15 16:08",
    status: "pending_confirmation",
    statusText: "待设计师确认",
    assignedLawyer: "李法务",
    attachments: ["客户提供NDA.pdf"],
    responses: [
      {
        respondent: "李法务 (法务专员)",
        responseDate: "2024-07-16 11:30",
        message: `您好，我已审阅了您上传的NDA文件，发现以下几点需要注意：\n\n1. 保密期限设定为"永久"，建议修改为固定年限（3-5年）\n2. 第4条对您的设计使用有过度限制，可能影响您将来的独立创作\n3. 违约金条款对您不公平，赔偿责任上限应当是双方对等的\n\n我已在附件中提供了修改建议和批注，您可以据此与客户协商修改。`,
        attachments: ["NDA审阅意见.pdf", "NDA修改版本.docx"]
      }
    ]
  },
  {
    id: "LR003",
    title: "IP授权协议咨询",
    serviceType: "ip_license_consult",
    description: "我创作了一系列城市剪影插画，现有出版社想要获得使用授权用于书籍出版。我想咨询以下问题：\n\n1. 授权范围应如何界定？\n2. 合理的授权费用标准是什么？\n3. 是否应保留某些权利？\n4. 如何保证我的署名权？",
    relatedProject: `插画系列"城市剪影"`,
    submittedAt: "2024-07-18 10:15",
    status: "completed",
    statusText: "已完成",
    assignedLawyer: "王顾问",
    attachments: ["插画作品样例.zip", "出版社需求说明.pdf"],
    responses: [
      {
        respondent: "王顾问 (知识产权专家)",
        responseDate: "2024-07-19 14:22",
        message: "您好，关于您的IP授权问题，我有以下建议：\n\n授权范围：建议限定为特定书籍出版，指明印刷版与电子版权限，限定在特定地区和语言版本。\n\n授权费用：可采用以下方案之一：\n1. 一次性授权费：根据您作品的市场价值，建议5000-10000元\n2. 版税模式：按零售价的5-8%收取，设定最低保证金\n\n权利保留：务必保留：\n- 创作者署名权\n- 作品修改权\n- 二次开发权（如周边产品、数字产品等）\n- 未来授权给其他出版商的权利\n\n我已在附件中提供了授权协议模板，您可以据此与出版社谈判。",
        attachments: ["IP授权协议模板.docx", "知识产权保护指南.pdf"]
      },
      {
        respondent: "王顾问 (知识产权专家)",
        responseDate: "2024-07-22 09:15",
        message: "跟进一下您的IP授权事宜，您是否已与出版社开始谈判？如有任何新问题，请随时咨询。",
        attachments: []
      }
    ]
  },
  {
    id: "LR004",
    title: "文创产品合作协议审核",
    serviceType: "contract_review",
    description: "一家文创品牌希望与我合作，基于我的设计制作一系列产品。他们提供了一份合作协议，希望法务能审核其中的条款是否公平，尤其关注产品收益分成比例和知识产权归属问题。",
    relatedProject: "文创产品系列合作",
    submittedAt: "2024-07-22 15:30",
    status: "cancelled",
    statusText: "已取消",
    assignedLawyer: null,
    attachments: ["合作协议草案.pdf", "产品概念图.jpg"],
    responses: []
  }
]; 