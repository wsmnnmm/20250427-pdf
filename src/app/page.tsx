// ... existing code ... <default export>
"use client";

import PdfViewer from "./components/PdfViewer";

export default function HomePage() {
  return (
    <>
      <header className="bg-white w-full sticky top-0 z-10 border-b border-gray-100">
        <div className="mx-4 flex items-center justify-between py-4 px-4 lg:px-0">
          <a
            href="/"
            className="flex items-center text-lg font-semibold gap-2"
            aria-label="PDF.ai Home"
          >
            <img
              src="https://ext.same-assets.com/1526427961/3785751866.svg"
              alt="PDF.ai Logo"
              className="h-6"
            />
            <span>PDF.ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-[16px]">
            <a href="#" className="hover:underline">
              Pricing
            </a>
            <a href="#" className="hover:underline">
              Chrome extension
            </a>
            <a href="#" className="hover:underline">
              Use cases
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium bg-transparent border-none focus:outline-none"
              aria-label="Change language (currently EN)"
              tabIndex={0}
            >
              <img
                src="https://ext.same-assets.com/1526427961/3533093031.svg"
                alt="English"
                className="h-5 w-5"
              />
              <span className="font-medium">EN</span>
            </button>
            <a
              href="#"
              className="hover:underline font-medium ml-2 flex items-center gap-1"
            >
              Get started →
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full bg-[#f7f5ee]">
        <section className="container w-[1855px] mx-auto py-20 px-4 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-serif text-center">Rotate PDF Pages</h1>
          <p className="mt-4 text-gray-600 max-w-xl text-center">
            Simply click on a page to rotate it. You can then download your
            modified PDF.
          </p>
          <div className="w-full mt-10">
            <PdfViewer />
          </div>
        </section>
      </main>
      <footer className="bg-white border-t border-gray-100 pt-12 pb-8 px-4 mt-10">
        <div className="container mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="space-y-8">
            <div className="text-sm text-gray-600">
              Chat with any PDF: ask questions, get summaries, find information,
              and more.
            </div>
            <div className="flex space-x-6 mt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                >
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                >
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 xl:col-span-2">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                Products
              </h3>
              <ul className="mt-6 space-y-4 p-0">
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Use cases
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Chrome extension
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    API docs
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Video tutorials
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                We also built
              </h3>
              <ul className="mt-6 space-y-4 p-0">
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Resume AI Scanner
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Invoice AI Scanner
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    AI Quiz Generator
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    QuickyAI
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Doctrine
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    PDF GPTs
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    PDF AI generator
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Other PDF tools
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                Company
              </h3>
              <ul className="mt-6 space-y-4 p-0">
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    PDF.ai vs ChatPDF
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    PDF.ai vs Acrobat Reader
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Legal
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Affiliate program 💵
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Investor
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
