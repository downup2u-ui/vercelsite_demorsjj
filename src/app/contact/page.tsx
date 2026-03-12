export default function ContactPage() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">联系我们</h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            我们期待听到您的声音，无论是问题、建议还是合作意向
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">联系信息</h2>
            <div className="mt-6 space-y-8">
              <div className="flex gap-x-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">办公地址</h3>
                  <p className="mt-1 text-gray-600">中国广东省广州市天河区<br />潮创共坊大厦 15楼</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500">
                      在地图上查看 &rarr;
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-x-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">电话联系</h3>
                  <p className="mt-1 text-gray-600">+86 (020) 8888-7777</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    周一至周五 9:00-18:00
                  </p>
                </div>
              </div>
              
              <div className="flex gap-x-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">电子邮件</h3>
                  <p className="mt-1 text-gray-600">info@chaochuanggongfang.com</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    我们会在24小时内回复您
                  </p>
                </div>
              </div>
              
              <div className="flex gap-x-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">社交媒体</h3>
                  <div className="mt-1 flex space-x-4">
                    <a href="https://weixin.qq.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                      <span className="sr-only">微信</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.691 2C4.802 2 1.645 4.557 1.645 7.715c0 1.71.992 3.198 2.544 4.222-.177.618-.957 2.634-.99 2.808 0 0-.018.101.053.145.07.044.124.014.124.014s3.268-1.66 3.652-1.851c.519.101 1.053.154 1.604.154 4.009 0 7.166-2.552 7.166-5.71C15.857 4.557 12.7 2 8.691 2zm5.97 6.737c-.293.44-.873.293-1.074-.293-.22-.587.073-1.174.366-1.467.293-.293.806-.44 1.026.073.293.514.073 1.247-.319 1.687zm-3.103-.293c-.293.44-.873.293-1.074-.293-.22-.587.073-1.174.366-1.467.293-.293.806-.44 1.026.073.22.514.073 1.247-.318 1.687z" />
                        <path d="M22.355 14.941c0-2.685-2.685-4.883-5.857-4.883-3.285 0-5.857 2.198-5.857 4.883 0 2.684 2.572 4.882 5.857 4.882.659 0 1.318-.112 1.977-.223.366.223 2.177 1.434 2.177 1.434s.112.112.223.112c.112 0 .112-.112.112-.112-.112-.223-.659-2.009-.771-2.232 1.318-.882 2.139-2.232 2.139-3.861zm-7.722-1.097c-.223.335-.67.223-.882-.223-.112-.447.112-.894.335-1.118.223-.224.67-.335.882.111.112.447 0 .894-.335 1.23zm3.173 0c-.223.335-.671.223-.882-.223-.112-.447.112-.894.335-1.118.223-.224.67-.335.882.111.112.447 0 .894-.335 1.23z" />
                      </svg>
                    </a>
                    <a href="https://weibo.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                      <span className="sr-only">微博</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10.098 20c-3.297 0-6-2.31-6-5.156 0-2.846 2.703-5.155 6-5.155s6 2.31 6 5.155c0 2.846-2.703 5.156-6 5.156zm0-8.77c-2.316 0-4.2 1.718-4.2 3.846 0 2.128 1.884 3.846 4.2 3.846s4.2-1.718 4.2-3.846c0-2.128-1.884-3.846-4.2-3.846z" />
                        <path d="M10.5 15.077c-.774 0-1.397-.633-1.397-1.385 0-.752.623-1.385 1.397-1.385.774 0 1.397.633 1.397 1.385 0 .752-.623 1.385-1.397 1.385zm-.2-2.308c-.263 0-.474.214-.474.462 0 .247.211.461.474.461.263 0 .474-.214.474-.461 0-.248-.211-.462-.474-.462z" />
                        <path d="M12.3 13.23c-.197-.09-.237-.33-.09-.527.146-.198.474-.308.67-.22.197.09.237.33.09.527-.146.198-.474.308-.67.22z" />
                        <path d="M18.6 12.923c-.197 0-.395-.11-.494-.33-.146-.308-.044-.66.248-.77.292-.11.633.044.779.352.146.308.044.66-.248.77-.1.044-.197.044-.285 0v-.022zm-1.397-1.846c-.197-.088-.237-.33-.09-.527.146-.198.474-.308.67-.22.197.09.237.33.09.527-.146.198-.474.308-.67.22z" />
                        <path d="M19.8 11.538c-.197 0-.395-.11-.494-.33-.146-.308-.044-.66.248-.77.292-.11.633.044.779.352.146.308.044.66-.248.77-.1.044-.197.044-.285 0v-.022z" />
                        <path d="M17.203 9.23c-.197 0-.395-.11-.494-.33-.146-.308-.044-.66.248-.77.292-.11.633.044.779.352.146.308.044.66-.248.77-.1.044-.197.044-.285 0v-.022z" />
                        <path d="M19.8 8.308c-.197 0-.395-.11-.494-.33-.146-.308-.044-.66.248-.77.292-.11.633.044.779.352.146.308.044.66-.248.77-.1.044-.197.044-.285 0v-.022z" />
                        <path d="M15.806 11.538c-.197 0-.395-.11-.494-.33-.146-.308-.044-.66.248-.77.292-.11.633.044.779.352.146.308.044.66-.248.77-.1.044-.197.044-.285 0v-.022z" />
                        <path d="M17.203 7.385c-.197 0-.395-.11-.494-.33-.146-.308-.044-.66.248-.77.292-.11.633.044.779.352.146.308.044.66-.248.77-.1.044-.197.044-.285 0v-.022zM16.5 5c-.197 0-.395-.11-.494-.33-.146-.308-.044-.66.248-.77.292-.11.633.044.779.352.146.308.044.66-.248.77-.1.044-.197.044-.285 0V5z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-900">营业时间</h2>
              <dl className="mt-6 space-y-4 text-base leading-7 text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">周一至周五</span>
                    <span className="font-semibold text-gray-900">工作日</span>
                  </dt>
                  <dd>上午 9:00 – 下午 6:00</dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">周六</span>
                    <span className="font-semibold text-gray-900">周六</span>
                  </dt>
                  <dd>上午 10:00 – 下午 4:00</dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">周日</span>
                    <span className="font-semibold text-gray-900">周日</span>
                  </dt>
                  <dd>休息</dd>
                </div>
              </dl>
            </div>
          </div>
          
          <form className="flex flex-col gap-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                姓名
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                电子邮件
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                电话
              </label>
              <div className="mt-2.5">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-gray-900">
                主题
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                留言内容
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <input
                id="privacy-policy"
                name="privacy-policy"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="privacy-policy" className="text-sm leading-6 text-gray-600">
                我已阅读并同意{' '}
                <a href="/privacy" className="font-semibold text-indigo-600">
                  隐私政策
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              提交留言
            </button>
          </form>
        </div>
        
        <div className="mt-16 h-96 w-full overflow-hidden rounded-lg">
          <div className="h-full w-full border-0" style={{ background: '#f3f4f6' }}>
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">地图将在这里显示</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
