export default function PrivacyPage() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">隐私政策</h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            我们重视您的隐私，本政策说明我们如何收集、使用和保护您的个人信息
          </p>
        </div>
        
        <div className="mt-16 space-y-12">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. 数据收集范围</h2>
            <div className="mt-4 text-gray-600 space-y-4">
              <p>
                潮创共坊平台（以下简称"我们"或"平台"）可能收集以下类型的个人信息：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>账户信息</strong>：当您注册账户时，我们会收集您的姓名、电子邮件地址、电话号码和密码。
                </li>
                <li>
                  <strong>个人资料信息</strong>：您可能会提供额外的个人资料信息，如头像、职业、专业领域、教育背景和工作经历。
                </li>
                <li>
                  <strong>支付信息</strong>：当您进行交易时，我们会收集必要的支付信息，如银行账户信息或第三方支付账户信息。
                </li>
                <li>
                  <strong>内容数据</strong>：您在平台上上传、发布或分享的内容，包括但不限于设计作品、3D模型、评论和消息。
                </li>
                <li>
                  <strong>使用数据</strong>：我们自动收集有关您如何使用我们服务的信息，包括您访问的页面、点击的链接、搜索的内容和其他操作。
                </li>
                <li>
                  <strong>设备信息</strong>：我们可能收集有关您使用的设备的信息，如设备类型、操作系统、浏览器类型、IP地址和设备标识符。
                </li>
                <li>
                  <strong>位置信息</strong>：在您授权的情况下，我们可能会收集您的位置信息，以提供基于位置的服务。
                </li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. 数据使用方式</h2>
            <div className="mt-4 text-gray-600 space-y-4">
              <p>
                我们使用收集的个人信息用于以下目的：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>提供服务</strong>：使用您的信息来提供、维护和改进我们的服务，包括处理交易、客户支持和技术支持。
                </li>
                <li>
                  <strong>个性化体验</strong>：根据您的偏好、兴趣和行为定制您的体验，包括推荐可能感兴趣的内容、功能或服务。
                </li>
                <li>
                  <strong>沟通</strong>：与您沟通有关我们服务的信息，包括确认、通知、更新和安全警报。
                </li>
                <li>
                  <strong>营销</strong>：在您同意的情况下，向您发送有关我们产品、服务、活动和促销的营销信息。
                </li>
                <li>
                  <strong>分析和改进</strong>：分析用户行为和趋势，以改进我们的服务质量和用户体验。
                </li>
                <li>
                  <strong>安全和保护</strong>：保护我们的服务、用户和公众免受欺诈、滥用和未经授权的访问。
                </li>
                <li>
                  <strong>法律合规</strong>：遵守适用的法律法规和法律程序，包括响应政府和执法机构的合法请求。
                </li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. 数据保护措施</h2>
            <div className="mt-4 text-gray-600 space-y-4">
              <p>
                我们采取多种安全措施保护您的个人信息：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>技术保护</strong>：使用加密技术、安全协议和防火墙保护您的数据免受未经授权的访问和泄露。
                </li>
                <li>
                  <strong>访问控制</strong>：限制员工访问个人信息，只有需要处理您数据的授权人员才能访问。
                </li>
                <li>
                  <strong>定期安全审计</strong>：定期评估和更新我们的安全措施，确保它们符合最新的安全标准和最佳实践。
                </li>
                <li>
                  <strong>数据备份</strong>：定期备份数据，以防止意外数据丢失。
                </li>
                <li>
                  <strong>第三方监督</strong>：与遵守严格数据保护标准的第三方服务提供商合作。
                </li>
              </ul>
              <p>
                尽管我们采取了这些措施，但请注意，互联网传输和电子存储不可能是100%安全的。我们无法保证您的信息在传输过程中或存储在我们的系统中时的绝对安全。
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. 用户隐私权利</h2>
            <div className="mt-4 text-gray-600 space-y-4">
              <p>
                根据适用的数据保护法律，您可能拥有以下权利：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>访问权</strong>：您有权访问我们持有的关于您的个人信息。
                </li>
                <li>
                  <strong>更正权</strong>：如果您认为我们持有的关于您的信息不准确或不完整，您有权要求更正。
                </li>
                <li>
                  <strong>删除权</strong>：在某些情况下，您有权要求删除您的个人信息。
                </li>
                <li>
                  <strong>限制处理权</strong>：在某些情况下，您有权限制我们处理您的个人信息。
                </li>
                <li>
                  <strong>数据可携权</strong>：您有权以结构化、常用和机器可读的格式接收您提供给我们的个人信息，并有权将这些信息传输给另一个控制者。
                </li>
                <li>
                  <strong>反对权</strong>：在某些情况下，您有权反对我们处理您的个人信息。
                </li>
                <li>
                  <strong>撤回同意权</strong>：如果我们基于您的同意处理您的个人信息，您有权随时撤回您的同意。
                </li>
              </ul>
              <p>
                如果您想行使这些权利，请通过本政策末尾提供的联系方式与我们联系。我们将在合理的时间内回应您的请求，通常不超过30天。
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Cookie和类似技术</h2>
            <div className="mt-4 text-gray-600 space-y-4">
              <p>
                我们使用Cookie和类似技术（如网络信标、像素标签和本地存储）来收集和存储有关您如何使用我们服务的信息。这些技术帮助我们识别您、记住您的偏好、分析网站流量和提供个性化体验。
              </p>
              <p>
                您可以通过浏览器设置控制Cookie的使用。但请注意，禁用Cookie可能会影响我们服务的某些功能。
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. 第三方服务</h2>
            <div className="mt-4 text-gray-600 space-y-4">
              <p>
                我们的服务可能包含链接到第三方网站或服务，这些网站或服务有自己的隐私政策。我们对这些第三方的隐私做法不负责任，建议您阅读他们的隐私政策。
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. 儿童隐私</h2>
            <div className="mt-4 text-gray-600 space-y-4">
              <p>
                我们的服务不面向16岁以下的儿童。我们不会故意收集16岁以下儿童的个人信息。如果您发现我们可能收集了16岁以下儿童的个人信息，请联系我们，我们将采取措施删除这些信息。
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. 隐私政策更新</h2>
            <div className="mt-4 text-gray-600 space-y-4">
              <p>
                我们可能会不时更新本隐私政策。更新后的政策将在平台上发布，并在发布时生效。我们鼓励您定期查看本政策，以了解我们如何保护您的信息。
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900">9. 联系我们</h2>
            <div className="mt-4 text-gray-600">
              <p>
                如果您对本隐私政策有任何疑问或顾虑，请通过以下方式联系我们：<br />
                电子邮件：privacy@chaochuanggongfang.com<br />
                地址：中国广东省广州市天河区潮创共坊大厦
              </p>
            </div>
          </section>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            最后更新日期：2025年3月28日
          </p>
        </div>
      </div>
    </div>
  );
}
