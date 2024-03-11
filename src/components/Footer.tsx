import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";

const navigation = {
  product: [
    { name: "Google Docs", href: "/guides/googledocs" },
    { name: "Notion", href: "/guides/notion" },
    { name: "Pricing", href: "/pricing" },
  ],
  resources: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Guides", href: "/guides" },
  ],
  tools: [
    { name: "PostHog", href: "https://posthog.com" },
    { name: "Umami", href: "https://umami.is" },
  ],
  alternatives: [{ name: "Quillcap", href: "/alternatives/quilllcap" }],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/phukon/clack",
      icon: () => <FaGithub className="h-6 w-6" aria-hidden="true" />,
    },
    {
      name: "X / Twitter",
      href: "https://twitter.com/clackapp",
      icon: () => <FaTwitter className="h-5 w-5" aria-hidden="true" />,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 mt-10 border-gray-200" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-7xl pt-20 pb-4 px-4 md:px-8">
        {" "}
        {/* px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32 */}
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <span className="text-2xl font-bold tracking-tighter --local-comfortaa text-black">Clack</span>
            <p className="leading-6 text-gray-500">Track your writing progress, effortlessly.</p>
            <div className="flex space-x-2">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-10 rounded-md px-2.5 py-1 font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-6 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="font-semibold leading-6 text-black">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="leading-6 text-gray-500 hover:text-black">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="font-semibold leading-6 text-black">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="leading-6 text-gray-500 hover:text-black">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="font-semibold leading-6 text-black">Tools</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.tools.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="leading-6 text-gray-500 hover:text-black">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="font-semibold leading-6 text-black">Alternatives</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.alternatives.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="leading-6 text-gray-500 hover:text-black">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-black/10 pt-4 sm:mt-20 lg:mt-24">
          <p className="text-sm leading-5 text-gray-500">&copy; 2024 Clack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
