import { Hexagon, Github, Facebook, Video, Sparkles as SparklesIcon, Cpu, Mic } from 'lucide-react';
import { Sparkles } from './ui/sparkles-new';

const GithubLogo = () => (
  <div className="flex items-center justify-center gap-2 w-full">
    <Github className="w-8 h-8" />
    <span className="text-xl font-bold tracking-tight">GitHub</span>
  </div>
);

const VercelLogo = () => (
  <svg viewBox="0 0 180 54" fill="currentColor" className="w-full h-8">
    <path d="M89.515 20.5c-4.424 0-7.614 2.925-7.614 7.313 0 4.387 3.59 7.312 8.014 7.312 2.673 0 5.03-1.072 6.488-2.88l-3.066-1.796c-.81.898-2.04 1.422-3.422 1.422-1.919 0-3.55-1.016-4.155-2.64h11.228c.088-.456.14-.927.14-1.423 0-4.383-3.19-7.308-7.613-7.308zm-3.791 5.89c.5-1.62 1.871-2.64 3.787-2.64 1.919 0 3.29 1.02 3.786 2.64h-7.573zm46.938-5.89c-4.424 0-7.613 2.925-7.613 7.313 0 4.387 3.59 7.312 8.014 7.312 2.672 0 5.028-1.072 6.487-2.88l-3.065-1.796c-.81.898-2.04 1.422-3.422 1.422-1.92 0-3.551-1.016-4.156-2.64h11.228c.088-.456.14-.927.14-1.423 0-4.383-3.189-7.308-7.613-7.308zm-3.787 5.89c.501-1.62 1.872-2.64 3.787-2.64 1.919 0 3.29 1.02 3.787 2.64h-7.574zm-15.639 1.422c0 2.438 1.571 4.063 4.007 4.063 1.651 0 2.889-.76 3.526-1.999l3.078 1.8c-1.275 2.153-3.663 3.449-6.604 3.449-4.428 0-7.613-2.925-7.613-7.313 0-4.387 3.189-7.312 7.613-7.312 2.941 0 5.325 1.296 6.604 3.45l-3.078 1.799c-.637-1.24-1.875-1.999-3.526-1.999-2.432 0-4.007 1.625-4.007 4.063zm33.05-11.78v18.687h-3.607V16.03h3.607zM47.806 14l14.806 26H33l14.806-26zm37.016 2.031l-11.103 19.5-11.103-19.5h4.163l6.94 12.188 6.94-12.188h4.163zm23.606 4.875v3.937a4.517 4.517 0 00-1.283-.2c-2.328 0-4.007 1.626-4.007 4.063v6.013h-3.606V20.906h3.606v3.738c0-2.064 2.369-3.738 5.29-3.738z" />
  </svg>
);

const NetlifyLogo = () => (
  <div className="flex items-center justify-center gap-2 w-full">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M10.95 21.05l-4.2-4.25-4.2 4.25c-.2.2-.5.2-.7 0-.2-.2-.2-.5 0-.7l4.2-4.25-4.2-4.25c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0l4.2 4.25 4.2-4.25c.2-.2.5-.2.7 0 .2.2.2.5 0 .7l-4.2 4.25 4.2 4.25c.2.2.2.5 0 .7-.2.2-.5.2-.7 0zM22.15 11.85l-4.2-4.25-4.2 4.25c-.2.2-.5.2-.7 0-.2-.2-.2-.5 0-.7l4.2-4.25-4.2-4.25c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0l4.2 4.25 4.2-4.25c.2-.2.5-.2.7 0 .2.2.2.5 0 .7l-4.2 4.25 4.2 4.25c.2.2.2.5 0 .7-.2.2-.5.2-.7 0z"/>
    </svg>
    <span className="text-xl font-bold tracking-tight">Netlify</span>
  </div>
);

const ArcLogo = () => (
  <svg viewBox="0 0 180 56" fill="currentColor" className="w-full h-8">
    <path d="M133.969 31.642a.918.918 0 00-.673.287c-.909.938-2.098 1.51-3.483 1.51a4.803 4.803 0 01-2.232-.546c-1.814-.947-2.987-3.015-2.661-5.319.356-2.529 2.567-4.411 5.045-4.338 1.322.04 2.457.604 3.334 1.509a.914.914 0 00.672.286c.554 0 1.029-.49 1.029-1.02 0-.247-.078-.53-.278-.735a6.742 6.742 0 00-4.277-2.055c-3.913-.348-7.435 2.84-7.557 6.886-.122 4.066 3.01 7.374 6.925 7.374 1.94 0 3.642-.777 4.909-2.081.198-.204.278-.49.278-.734-.002-.533-.478-1.023-1.031-1.023zM116.535 29.095c1.283-.735 2.135-2.1 2.094-3.77-.055-2.325-1.995-4.135-4.25-4.135h-6.239c-.546 0-.989.457-.989 1.02v11.883c0 .519.358.995.856 1.052.616.07 1.123-.356 1.123-.974V31.58c0-.2.131-.372.317-.42l3.506-.895 1.447-.38a.415.415 0 01.484.238l1.959 4.44c.16.365.507.58.872.58a.96.96 0 00.632-.244c.33-.288.399-.788.22-1.193l-2.032-4.61zm-7.405-.42v-5.093c0-.24.188-.431.418-.431h4.767c1.384 0 2.335.98 2.335 2.288 0 1.307-.779 2.251-2.37 2.602l-4.643 1.056a.421.421 0 01-.507-.422zM96.89 21.967c-.21-.455-.655-.727-1.192-.727-.537 0-.983.272-1.192.725l-5.462 11.742c-.071.145-.11.325-.11.488 0 .557.422.976.985.976a.944.944 0 00.895-.57l1.017-2.172a8.97 8.97 0 001.403.386c.792.151 1.59.203 2.377.194.79-.007 1.568-.104 2.335-.235.383-.066.76-.163 1.141-.243l.466-.133 1.024 2.188a.956.956 0 00.903.587c.638 0 .982-.502.982-.975 0-.166-.041-.344-.105-.481l-5.467-11.75zm.757 9.04c-.686.117-1.38.205-2.066.21-.687.006-1.37-.036-2.03-.164a7.106 7.106 0 01-.962-.251l.82-1.755h-.003l1.913-4.085a.413.413 0 01.753 0l1.761 3.76.088.188.064.137.797 1.707-.11.031c-.34.074-.68.164-1.025.223zM77.035 23.307c.212-1.058.044-2.13-.468-3.019-.592-1.023-1.538-1.714-2.668-1.946a3.901 3.901 0 00-.808-.08c-1.92 0-3.536 1.387-3.931 3.371a9.394 9.394 0 01-1.183 3.015.11.11 0 01-.1.054.113.113 0 01-.1-.069l-3.765-8.17c-.521-1.129-1.449-1.967-2.546-2.298-1.876-.569-3.922.376-4.762 2.197l-3.897 8.449a.048.048 0 01-.043.028c-.028 0-.033-.016-.037-.028-.618-1.575-2.08-2.593-3.729-2.593-.533 0-1.054.109-1.55.322-.992.426-1.756 1.24-2.158 2.292a4.375 4.375 0 00.032 3.214c.737 1.818 1.97 3.573 3.566 5.074.039.036.05.09.027.138l-1.258 2.732c-.95 2.063-.151 4.556 1.78 5.56a3.9 3.9 0 001.813.448c1.543 0 2.97-.929 3.633-2.366l1.086-2.356a.112.112 0 01.135-.062 14.83 14.83 0 004.025.578c1.458 0 2.942-.223 4.404-.66a.111.111 0 01.136.061l1.074 2.333c.69 1.494 2.124 2.464 3.66 2.474h.023a3.87 3.87 0 001.812-.447c1.93-1.005 2.728-3.505 1.772-5.575l-1.357-2.934a.12.12 0 01.028-.137c2.742-2.617 4.643-6.026 5.354-9.6zM54.201 36.69l-.98 2.126a2.19 2.19 0 01-1.975 1.286c-.338 0-.664-.078-.97-.234-1.06-.543-1.492-1.916-.964-3.065l1.045-2.268a.122.122 0 01.108-.071c.018 0 .041.005.062.021a17.81 17.81 0 003.61 2.044c.04.016.06.05.066.068a.107.107 0 01-.002.093zm9.565-1.345a.108.108 0 01-.07.061c-1.19.325-2.391.49-3.571.49-5.465 0-11.24-3.817-13.15-8.688-.45-1.15.09-2.465 1.206-2.931.261-.11.537-.166.817-.166.896 0 1.69.552 2.025 1.409 1.247 3.183 5.417 5.873 9.102 5.873.555 0 1.125-.055 1.694-.164.053-.01.106.014.127.064l1.82 3.947a.136.136 0 010 .105zm-4.468-6.183l.733-1.591a.273.273 0 01.252-.164.28.28 0 01.253.164l.716 1.553a.29.29 0 01-.007.26.27.27 0 01-.204.147 6.112 6.112 0 01-1.518.04.276.276 0 01-.213-.144.292.292 0 01-.012-.265zm11.09 10.706a2.108 2.108 0 01-.969.234 2.188 2.188 0 01-1.972-1.286l-6.578-14.27a.584.584 0 00-1.07 0l-2.04 4.426a.115.115 0 01-.137.064c-1.361-.483-2.638-1.295-3.596-2.282a.117.117 0 01-.018-.13l4.408-9.562c.148-.32.359-.578.609-.746.592-.4 1.265-.519 1.899-.337a2.199 2.199 0 011.382 1.201l9.047 19.626c.53 1.146.096 2.52-.965 3.062zm.526-8.807a.123.123 0 01-.106.036.11.11 0 01-.082-.067l-1.929-4.186a.12.12 0 01.014-.123c1.09-1.443 1.837-3.086 2.16-4.755.205-1.05 1.103-1.812 2.138-1.812h.002c.177 0 .356.024.533.069 1.144.293 1.84 1.506 1.584 2.76-.613 3.001-2.103 5.793-4.314 8.078z" />
  </svg>
);

const MetaLogo = () => (
  <div className="flex items-center justify-center gap-2 w-full">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 13.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm-9 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
    <span className="text-xl font-bold tracking-tight">META</span>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-silver/10 overflow-hidden relative">
      <div className="w-full pt-24 pb-12 relative z-20">
        <div className="mx-auto w-full max-w-4xl px-4">
          <div className="text-center text-3xl md:text-4xl text-silver font-bold tracking-tight">
            <span className="text-cyan">
              Trusted by experts.
            </span>
            <br />
            <span>Used by the leaders.</span>
          </div>

          <div className="mt-16 overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="flex w-max animate-[scroll_30s_linear_infinite] hover:animate-none">
              <div className="flex items-center gap-16 px-8 text-white min-w-max">
                <GithubLogo />
                <VercelLogo />
                <NetlifyLogo />
                <ArcLogo />
                <MetaLogo />
              </div>
              <div className="flex items-center gap-16 px-8 text-white min-w-max">
                <GithubLogo />
                <VercelLogo />
                <NetlifyLogo />
                <ArcLogo />
                <MetaLogo />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] pointer-events-none">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#00E5FF,transparent_70%)] before:opacity-20" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-cyan/30 bg-charcoal" />
        <Sparkles
          density={1200}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          color="#ffffff"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Hexagon className="text-cyan w-6 h-6" />
            <span className="font-mono text-lg font-bold tracking-wider text-silver">
              VORTEX<span className="text-cyan">DIGI</span>LABS
            </span>
          </div>
          
          <div className="flex gap-6">
            <a href="https://www.facebook.com/VortexDigiLabs" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-silver/60 hover:text-cyan transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://github.com/cloud_walker369" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-silver/60 hover:text-cyan transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.heygen.com/?sid=rewardful&via=vortexdigilabs" target="_blank" rel="noopener noreferrer" title="HeyGen" className="text-silver/60 hover:text-cyan transition-colors">
              <Video className="w-5 h-5" />
            </a>
            <a href="https://yupp.ai/join/brief-salmon-endor" target="_blank" rel="noopener noreferrer" title="YUPP" className="text-silver/60 hover:text-cyan transition-colors">
              <SparklesIcon className="w-5 h-5" />
            </a>
            <a href="https://manus.im/invitation/XZDS0OAWATATW" target="_blank" rel="noopener noreferrer" title="Manus" className="text-silver/60 hover:text-cyan transition-colors">
              <Cpu className="w-5 h-5" />
            </a>
            <a href="https://wisprflow.ai/r?VORTEX7" target="_blank" rel="noopener noreferrer" title="WhisprFlow" className="text-silver/60 hover:text-cyan transition-colors">
              <Mic className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-silver/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono text-silver/40">
          <p>&copy; {new Date().getFullYear()} Vortex Digi Labs. All rights reserved.</p>
          <p>Location: South Africa // Status: Online</p>
        </div>
      </div>
    </footer>
  );
}
