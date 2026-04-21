import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Palette, 
  Bot, 
  HardHat, 
  Cpu, 
  Landmark
} from 'lucide-react';
import { cn } from '../lib/utils';

const options = [
  {
    id: 1,
    icon: GraduationCap,
    main: 'Canva Teacher',
    sub: 'Essentials Certificate',
    bgUrl: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/sign/Credentials/Canva%20Teacher%20Essentials.PNG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODI5Y2JlNC02MWI3LTQ2NjAtYmNiYi0wZTk3YWQ0NjY5NzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDcmVkZW50aWFscy9DYW52YSBUZWFjaGVyIEVzc2VudGlhbHMuUE5HIiwiaWF0IjoxNzczMjQ5NzU3LCJleHAiOjI2MzcyNDk3NTd9.8cvr5wK0hjco0O17jDvHt_u2uOiHYQOmcURMcQgRbb4',
    color: '#ED5565',
    link: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/sign/Credentials/Canva%20-%20teacher-essentials-certificate.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODI5Y2JlNC02MWI3LTQ2NjAtYmNiYi0wZTk3YWQ0NjY5NzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDcmVkZW50aWFscy9DYW52YSAtIHRlYWNoZXItZXNzZW50aWFscy1jZXJ0aWZpY2F0ZS5wZGYiLCJpYXQiOjE3NzMyNDg0NjQsImV4cCI6MjYzNzI0ODQ2NH0.0LtiBHpS8x9bvPJi-KSFSH7f2cxPXZVcOj_pOj7uRyM'
  },
  {
    id: 2,
    icon: Palette,
    main: 'Canva Essentials',
    sub: 'Graphic Design',
    bgUrl: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/sign/Credentials/Canva%20Essentials.PNG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODI5Y2JlNC02MWI3LTQ2NjAtYmNiYi0wZTk3YWQ0NjY5NzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDcmVkZW50aWFscy9DYW52YSBFc3NlbnRpYWxzLlBORyIsImlhdCI6MTc3MzI0OTY5NywiZXhwIjoyNjM3MjQ5Njk3fQ.2HUTzmca4FpiOVtgqhyCA1f9PmrUDh70hwOJ1qiOtYM',
    color: '#FC6E51',
    link: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/sign/Credentials/Canva-essentials-certificate.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODI5Y2JlNC02MWI3LTQ2NjAtYmNiYi0wZTk3YWQ0NjY5NzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDcmVkZW50aWFscy9DYW52YS1lc3NlbnRpYWxzLWNlcnRpZmljYXRlLnBkZiIsImlhdCI6MTc3MzI0ODQ4MSwiZXhwIjoyNjM3MjQ4NDgxfQ.YZ-czndxthLpPtuALq0xwmJVkp5gS-3gbMSUz-4Ka_Y'
  },
  {
    id: 3,
    icon: HardHat,
    main: 'OSHA',
    sub: 'Occupational Safety',
    bgUrl: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/sign/Credentials/OSHA%20Certificate.PNG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODI5Y2JlNC02MWI3LTQ2NjAtYmNiYi0wZTk3YWQ0NjY5NzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDcmVkZW50aWFscy9PU0hBIENlcnRpZmljYXRlLlBORyIsImlhdCI6MTc3MzI1MDIzNCwiZXhwIjoyNjM3MjUwMjM0fQ.y5seuEzNpCYr72ZQv9traBKnusgENAc0ydM-2_icR4k',
    color: '#FFCE54',
    link: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/sign/Credentials/OSHA%20CERTIF.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODI5Y2JlNC02MWI3LTQ2NjAtYmNiYi0wZTk3YWQ0NjY5NzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDcmVkZW50aWFscy9PU0hBIENFUlRJRi5wZGYiLCJpYXQiOjE3NzMyNDg1NTksImV4cCI6MjYzNzI0ODU1OX0.oxPRUi07Ma4xfSE2ODX3ng-ZDBHfzasDr7iSYUeFD_g'
  },
  {
    id: 4,
    icon: Bot,
    main: 'HuggingFace',
    sub: 'AI & Machine Learning',
    bgUrl: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/sign/Credentials/HuggingFace%20Certificate.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODI5Y2JlNC02MWI3LTQ2NjAtYmNiYi0wZTk3YWQ0NjY5NzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDcmVkZW50aWFscy9IdWdnaW5nRmFjZSBDZXJ0aWZpY2F0ZS5qcGVnIiwiaWF0IjoxNzczMjQ5Nzc0LCJleHAiOjI2MzcyNDk3NzR9.kI4vfIHYtEPJK1hLB103YBcrR_LBeTTtudJbbJpfUpE',
    color: '#2ECC71',
    link: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/sign/Credentials/HuggingFace%20Certificate.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODI5Y2JlNC02MWI3LTQ2NjAtYmNiYi0wZTk3YWQ0NjY5NzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDcmVkZW50aWFscy9IdWdnaW5nRmFjZSBDZXJ0aWZpY2F0ZS5qcGVnIiwiaWF0IjoxNzczMjQ4NTE5LCJleHAiOjI2MzcyNDg1MTl9.GT4MIRXNyIxf859XP8C8Hp8E_lYWQhwp3r1S8T8hEVo'
  },
  {
    id: 5,
    icon: Cpu,
    main: 'Outskill AI',
    sub: 'Mastermind',
    bgUrl: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/sign/Credentials/Outskill%20Certificate%20%20AI%20Mastermind.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODI5Y2JlNC02MWI3LTQ2NjAtYmNiYi0wZTk3YWQ0NjY5NzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDcmVkZW50aWFscy9PdXRza2lsbCBDZXJ0aWZpY2F0ZSAgQUkgTWFzdGVybWluZC5wbmciLCJpYXQiOjE3NzMyNDk4MTIsImV4cCI6MjYzNzI0OTgxMn0.fh0CfBGUzOsvdPbh8Di0P9vNuKFQe_Ss4cpVyvrVo_8',
    color: '#EC87C0',
    link: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/sign/Credentials/Outskill%20Certificate%20%20AI%20Mastermind.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODI5Y2JlNC02MWI3LTQ2NjAtYmNiYi0wZTk3YWQ0NjY5NzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDcmVkZW50aWFscy9PdXRza2lsbCBDZXJ0aWZpY2F0ZSAgQUkgTWFzdGVybWluZC5wbmciLCJpYXQiOjE3NzMyNDg1NzksImV4cCI6MjYzNzI0ODU3OX0.KM251vskNABJpqyGenhFWjaN3JeS4IIosQDdn4AlGZQ'
  },
  {
    id: 6,
    icon: Landmark,
    main: 'WITS',
    sub: 'University',
    bgUrl: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/sign/Credentials/Wits.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODI5Y2JlNC02MWI3LTQ2NjAtYmNiYi0wZTk3YWQ0NjY5NzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDcmVkZW50aWFscy9XaXRzLnBuZyIsImlhdCI6MTc3MzI0OTgyOCwiZXhwIjoyNjM3MjQ5ODI4fQ.wTGextCdvtN4GVRSqtLbYcEl5K-tJ62o5ZxylDkQexw',
    color: '#4A89DC',
    link: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/sign/Credentials/WITS%20PDF.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODI5Y2JlNC02MWI3LTQ2NjAtYmNiYi0wZTk3YWQ0NjY5NzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDcmVkZW50aWFscy9XSVRTIFBERi5wZGYiLCJpYXQiOjE3NzMyNDg2MTIsImV4cCI6MjYzNzI0ODYxMn0.U2nGILG_L-SwUZ82eDNDpTnZoHa5M6Gh9C7wia36_EI'
  }
];

export default function Certifications() {
  const [activeId, setActiveId] = useState(1);

  return (
    <section id="certifications" className="py-24 relative bg-black border-t border-silver/10 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <style>{`
        .options-container {
          width: 100%;
          max-width: 1200px;
        }
        @media screen and (max-width: 900px) {
          .option-item:nth-child(6) { display: none; }
        }
        @media screen and (max-width: 768px) {
          .option-item:nth-child(5) { display: none; }
        }
        @media screen and (max-width: 640px) {
          .option-item:nth-child(4) { display: none; }
        }
        @media screen and (max-width: 500px) {
          .option-item:nth-child(3) { display: none; }
        }
      `}</style>
      
      <div className="text-center mb-16 w-full max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
        >
          VERIFIED <span className="text-cyan">CREDENTIALS</span>
        </motion.h2>
      </div>

      <div className="options-container flex flex-row items-stretch overflow-hidden h-[400px] mx-auto transition-all duration-250 px-4">
        {options.map((option) => {
          const isActive = activeId === option.id;
          const Icon = option.icon;
          
          return (
            <div
              key={option.id}
              onClick={() => setActiveId(option.id)}
              className={cn(
                "option-item relative overflow-hidden m-[5px] sm:m-[10px] cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)]",
                isActive ? "flex-[10000] max-w-[600px] m-0 rounded-[40px]" : "flex-1 min-w-[50px] sm:min-w-[60px] rounded-[30px]"
              )}
              style={{
                background: `url(${option.bgUrl})`,
                backgroundSize: isActive ? 'auto 100%' : 'auto 120%',
                backgroundPosition: 'center',
                backgroundColor: option.color
              }}
            >
              <div 
                className={cn(
                  "absolute left-0 right-0 h-[120px] transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)]",
                  isActive 
                    ? "bottom-0 shadow-[inset_0_-120px_120px_-120px_black,inset_0_-120px_120px_-100px_black]" 
                    : "-bottom-[40px] shadow-[inset_0_-120px_0px_-120px_black,inset_0_-120px_0px_-100px_black]"
                )}
              />
              
              <div 
                className={cn(
                  "flex absolute right-0 h-[40px] transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)]",
                  isActive ? "bottom-[20px] left-[20px]" : "bottom-[10px] left-[10px]"
                )}
              >
                <div 
                  className="flex flex-row justify-center items-center min-w-[40px] max-w-[40px] h-[40px] rounded-full bg-white"
                  style={{ color: option.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex flex-col justify-center ml-[10px] text-white whitespace-pre">
                  <div 
                    className={cn(
                      "relative transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)]",
                      isActive ? "left-0 opacity-100" : "left-[20px] opacity-0"
                    )}
                  >
                    <div className="font-bold text-[1.2rem]">{option.main}</div>
                  </div>
                  <div 
                    className={cn(
                      "relative transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] delay-100",
                      isActive ? "left-0 opacity-100" : "left-[20px] opacity-0"
                    )}
                  >
                    <div className="text-sm text-white/80">{option.sub}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
