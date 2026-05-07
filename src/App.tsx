import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Users, 
  MailOpen, 
  MousePointerClick, 
  ArrowUpRight, 
  Leaf, 
  Sparkles,
  BarChart as ChartIcon,
  TrendingUp,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Zap,
  Activity,
  Globe,
  PieChart as PieIcon
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell
} from 'recharts';

// --- DATA FROM USER SCREENSHOTS & LINKS ---
const AUDIENCE_STATS = {
  activeSubscribers: 14570,
  growthRate: 16,
  avgOpenRate: 44.51,
  avgClickRate: 1.15,
  earnings: 96.76
};

const GROWTH_DATA = [
  { month: 'Jan', users: 8200 },
  { month: 'Feb', users: 9500 },
  { month: 'Mar', users: 10800 },
  { month: 'Apr', users: 12200 },
  { month: 'May', users: 13100 },
  { month: 'Jun', users: 14570 },
];

const ENGAGEMENT_DATA = [
  { name: 'Open Rate', value: 44.5, color: '#2160ae' },
  { name: 'Click Rate', value: 1.15, color: '#7aca55' },
];

const PARTNERS = [
  { name: "AG1", industry: "Supplements", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Athletic_Greens_Logo.png" },
  { name: "Claer.ai", industry: "Software", logo: "" },
  { name: "The Craving Fast", industry: "Own Product", logo: "" }
];

const CAMPAIGN_HISTORY = [
  {
    title: "They told you to avoid spices—that might be why your gut is still messed up",
    url: "https://naturethecurenow.beehiiv.com/p/they-told-you-to-avoid-spices-that-might-be-why-your-gut-is-still-messed-up",
    brand: "Advanced Bionutritionals",
    delivered: 12257,
    openRate: 40.48,
    ctor: 3.49,
    totalClicks: 252,
    highlights: "Digestive Formula Partner Performance"
  },
  {
    title: "Top anti-aging doctors were buzzing about this",
    url: "https://naturethecurenow.beehiiv.com/p/top-anti-aging-doctors-were-buzzing-about-this",
    brand: "Advanced Bionutritionals",
    delivered: 12133,
    openRate: 40.62,
    ctor: 2.66,
    totalClicks: 169,
    highlights: "Pep-Tonic Anti-Aging Success"
  },
  {
    title: "You’re taking the right supplements… wrong",
    url: "https://naturethecurenow.beehiiv.com/p/you-re-taking-the-right-supplements-wrong",
    brand: "Claer.ai",
    delivered: 12258,
    openRate: 49.50,
    ctor: 1.57,
    totalClicks: 133,
    highlights: "High trust editorial integration"
  },
  {
    title: "Why I stopped drinking at night — and what happened",
    url: "https://naturethecurenow.beehiiv.com/p/why-i-stopped-drinking-at-night-and-what-happened-308d",
    brand: "Pique Life",
    delivered: 12111,
    openRate: 42.42,
    ctor: 1.56,
    totalClicks: 451,
    highlights: "Peak engagement volume"
  },
  {
    title: "It’s here: Break free from sugar cravings for good",
    url: "https://naturethecurenow.beehiiv.com/p/it-s-here-break-free-from-sugar-cravings-for-good",
    brand: "The Craving Fast",
    delivered: 6730,
    openRate: 43.00,
    ctor: 1.97,
    totalClicks: 113,
    highlights: "Direct product conversion"
  },
  {
    title: "88% of tickets resolved—so why are customers still leaving",
    url: "https://naturethecurenow.beehiiv.com/p/88-of-tickets-resolved-so-why-are-customers-still-leaving",
    brand: "Gladly",
    delivered: 12118,
    openRate: 47.09,
    ctor: 0.91,
    totalClicks: 98,
    highlights: "Customer Experience Strategy"
  },
  {
    title: "I wish I'd had this years ago",
    url: "https://naturethecurenow.beehiiv.com/p/i-wish-i-d-had-this-years-ago",
    brand: "AG1",
    delivered: 12403,
    openRate: 41.09,
    ctor: 1.41,
    totalClicks: 87,
    highlights: "Editorial Resonance"
  },
  {
    title: "Sneaky way to get more veggies in your diet",
    url: "https://naturethecurenow.beehiiv.com/p/sneaky-way-to-get-more-veggies-in-your-diet",
    brand: "Advanced Bionutritionals",
    delivered: 12140,
    openRate: 39.36,
    ctor: 2.24,
    totalClicks: 144,
    highlights: "Pep-Tonic Nutrition Success"
  },
  {
    title: "I felt tired all the time",
    url: "https://naturethecurenow.beehiiv.com/p/i-felt-tired-all-the-time",
    brand: "Advanced Bionutritionals",
    delivered: 12140,
    openRate: 39.36,
    ctor: 2.24,
    totalClicks: 144,
    highlights: "Pep-Tonic Recovery Alignment"
  },
  {
    title: "Your Welcome Kit is waiting (6 FREE packs inside!)",
    url: "https://naturethecurenow.beehiiv.com/p/your-welcome-kit-is-waiting-6-free-packs-inside",
    brand: "AG1",
    delivered: 11807,
    openRate: 43.80,
    ctor: 1.51,
    totalClicks: 95,
    highlights: "Premier Partnership Success"
  },
  {
    title: "Why my winter mornings feel different this year",
    url: "https://naturethecurenow.beehiiv.com/p/why-my-winter-mornings-feel-different-this-year",
    brand: "Pique Life",
    delivered: 11775,
    openRate: 43.91,
    ctor: 1.16,
    totalClicks: 134,
    highlights: "Seasonal Wellness Performance"
  },
  {
    title: "How evening rituals change everything",
    url: "https://naturethecurenow.beehiiv.com/p/how-evening-rituals-change-everything",
    brand: "Pique Life",
    delivered: 10459,
    openRate: 44.92,
    ctor: 1.64,
    totalClicks: 203,
    highlights: "Pique Ceremonial Performance"
  },
  {
    title: "Why I’m not drinking and it’s not what you think",
    url: "https://naturethecurenow.beehiiv.com/p/why-i-m-not-drinking-and-it-s-not-what-you-think",
    brand: "Pique Life",
    delivered: 7585,
    openRate: 48.03,
    ctor: 1.76,
    totalClicks: 175,
    highlights: "High Intent Ritual Substitution"
  },
  {
    title: "A calmer night starts with this",
    url: "https://naturethecurenow.beehiiv.com/p/a-calmer-night-starts-with-this",
    brand: "CBDistillery",
    delivered: 7033,
    openRate: 48.66,
    ctor: 0.99,
    totalClicks: 73,
    highlights: "Targeted Niche Engagement"
  },
  {
    title: "Your daily detox habit starts here (Holiday deal inside)",
    url: "https://naturethecurenow.beehiiv.com/p/your-daily-detox-habit-starts-here-holiday-deal-inside",
    brand: "AG1",
    delivered: 7033,
    openRate: 48.66,
    ctor: 0.99,
    totalClicks: 73,
    highlights: "Internal Holiday Conversion"
  }
];

// --- COMPONENTS ---

const InteractiveCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = 'rgba(33, 96, 174, ' + (Math.random() * 0.2 + 0.05) + ')';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > (canvas?.width || 0)) this.x = 0;
        else if (this.x < 0) this.x = canvas?.width || 0;
        if (this.y > (canvas?.height || 0)) this.y = 0;
        else if (this.y < 0) this.y = canvas?.height || 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 30000); // More sparse
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.strokeStyle = `rgba(33, 96, 174, ${0.08 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-50 z-0 no-print" />;
};

const StatCard = ({ label, value, icon: Icon, unit = "", subtext = "", color = "blue" }: any) => {
  const colorMap: any = {
    blue: "text-brand-blue bg-brand-blue-5",
    green: "text-brand-green bg-brand-green-5",
    slate: "text-slate-600 bg-slate-100"
  };
  
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
    className="glass-card p-6 rounded-2xl group relative overflow-hidden transition-all duration-500 border border-white-40"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-xl ${colorMap[color]}`}>
          <Icon size={18} />
        </div>
        {subtext && (
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">
            {subtext}
          </span>
        )}
      </div>
      <div>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-3xl font-bold text-slate-900 tracking-tighter">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h3>
          <span className="text-sm font-medium text-slate-400">{unit}</span>
        </div>
      </div>
    </motion.div>
  );
};

const DashboardSection = () => {
  return (
    <div id="metrics" className="max-w-7xl mx-auto px-4 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-brand-blue" size={20} />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue">Analytics Dashboard</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-medium text-brand-blue-dark tracking-tight">Performance Overview</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Growth Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 glass-card p-8 rounded-[32px] border border-white-40"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900">Audience Growth</h3>
              <p className="text-slate-500 text-xs">Total subscribers over last 6 months</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-slate-900 tracking-tighter">{AUDIENCE_STATS.activeSubscribers.toLocaleString()}</span>
              <p className="text-emerald-500 text-[10px] font-bold uppercase">+16% M-o-M</p>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2160ae" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2160ae" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    fontSize: '12px',
                    fontWeight: 600
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#2160ae" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Small Stats Grid */}
        <div className="grid grid-cols-1 gap-6">
          <StatCard 
            label="Avg Open Rate" 
            value={`${AUDIENCE_STATS.avgOpenRate}%`} 
            icon={MailOpen} 
            subtext="Industry Lead"
            color="blue"
          />
          <StatCard 
            label="Click Rate" 
            value={`${AUDIENCE_STATS.avgClickRate}%`} 
            icon={MousePointerClick} 
            subtext="High Intent"
            color="green"
          />
          <StatCard 
            label="Highest Click Rate" 
            value="4%" 
            icon={Zap} 
            subtext="Peak Interest"
            color="slate"
          />
        </div>

        {/* Engagement Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-[32px] border border-white-40"
        >
          <h3 className="text-lg font-serif font-bold text-slate-900 mb-6">Engagement Mix</h3>
          <div className="h-[200px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ENGAGEMENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1500}>
                  {ENGAGEMENT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
                <span>Open Rate</span>
              </div>
              <span className="text-slate-900">44.5%</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />
                <span>CTOR</span>
              </div>
              <span className="text-slate-900">1.15%</span>
            </div>
          </div>
        </motion.div>

        {/* Audience Geographic Hub */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 glass-card p-8 rounded-[32px] border border-white-40 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-slate-900">Global Hubs</h3>
              <p className="text-slate-500 text-xs">Primary audience cluster density</p>
            </div>
            <Globe className="text-brand-blue-20" size={32} />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { city: "New York", percent: 18, color: "#2160ae" },
              { city: "London", percent: 12, color: "#7aca55" },
              { city: "Los Angeles", percent: 9, color: "#2160ae" },
              { city: "San Fran", percent: 7, color: "#7aca55" }
            ].map((item) => (
              <div key={item.city} className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.city}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-900">{item.percent}</span>
                  <span className="text-xs font-semibold text-slate-400">%</span>
                </div>
                <div className="w-full h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percent * 4}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CampaignCard = ({ post, index }: any) => (
  <motion.a 
    href={post.url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.06)" }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white-5 border border-white-10 p-8 rounded-[32px] transition-all group backdrop-blur-md block cursor-pointer relative overflow-hidden group"
  >
    <div className="absolute top-6 right-6 text-transparent group-hover:text-white-40 transition-all transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
      <ExternalLink size={20} />
    </div>
    
    <div className="flex justify-between items-start mb-8">
      <div className="px-3 py-1.5 bg-brand-green-10 text-brand-green rounded-full text-[10px] font-bold tracking-widest uppercase border border-brand-green-20">
        {post.brand || "Partner"}
      </div>
      <div className="text-white-30 italic font-serif text-sm">#0{index + 1}</div>
    </div>
    
    <h3 className="text-2xl font-serif font-medium text-white mb-8 line-clamp-2 leading-tight min-h-[3.5rem] tracking-tight group-hover:text-brand-light-blue transition-colors">
      {post.title}
    </h3>

    <div className="space-y-6 mb-10">
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <div className="text-[10px] font-extrabold text-white-60 uppercase tracking-[0.2em]">Open Rate</div>
          <div className="text-3xl font-bold text-white font-serif tracking-tighter">{post.openRate}%</div>
        </div>
        <div className="h-1.5 bg-white-10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${post.openRate}%` }}
            transition={{ duration: 1.2, delay: 0.5, ease: "circOut" }}
            className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <div className="text-[10px] font-extrabold text-white-60 uppercase tracking-[0.2em]">Click Rate (CTOR)</div>
          <div className="text-3xl font-bold text-brand-green font-serif tracking-tighter">{post.ctor}%</div>
        </div>
        <div className="h-1.5 bg-white-10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${post.ctor * 15}%` }} 
            transition={{ duration: 1.2, delay: 0.7, ease: "circOut" }}
            className="h-full bg-brand-green shadow-[0_0_15px_rgba(122,202,85,0.4)]"
          />
        </div>
      </div>
    </div>

    <div className="p-5 bg-white-5 rounded-2xl border border-white-5 group-hover:border-white-10 transition-colors">
      <div className="flex items-center gap-2 text-brand-green mb-2">
        <TrendingUp size={14} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Performance Outcome</span>
      </div>
      <p className="text-white-70 text-xs font-medium leading-relaxed mb-3">{post.highlights}</p>
      <div className="flex items-center justify-between">
        <div className="text-white-20 text-[10px] font-bold uppercase tracking-tighter">Reach: {post.delivered.toLocaleString()}</div>
        <div className="text-[10px] font-bold text-brand-blue font-sans uppercase">Audience Lead</div>
      </div>
    </div>
  </motion.a>
);

const INSTAGRAM_URL = "https://www.instagram.com/naturethecure?igsh=MTR6Z3o5aDhzemZnZg==";

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  
  const [showAll, setShowAll] = useState(false);
  const visibleCampaigns = showAll ? CAMPAIGN_HISTORY : CAMPAIGN_HISTORY.slice(0, 15);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-brand-blue-20 selection:text-brand-blue-dark overflow-x-hidden font-sans">
      <InteractiveCanvas />
      
      {/* Navigation (Floating) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 no-print w-[90%] max-w-2xl">
        <div className="bg-white-90 backdrop-blur-xl border border-white-50 px-4 md:px-8 py-3 rounded-full shadow-2xl flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-blue-dark-60">
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-serif font-black italic text-brand-blue-dark text-lg lowercase normal-case tracking-tighter">Nature the cure</span>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden sm:flex items-center gap-4 md:gap-6">
              <button onClick={() => scrollTo('metrics')} className="hover:text-brand-blue-dark transition-colors cursor-pointer uppercase">Metrics</button>
              <button onClick={() => scrollTo('campaigns')} className="hover:text-brand-blue-dark transition-colors cursor-pointer uppercase">Partners</button>
            </div>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-blue text-white px-4 py-2 rounded-full hover:bg-brand-blue-dark transition-colors shrink-0">Inquire</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }} 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                staggerChildren: 0.2,
                delayChildren: 0.3
              }
            }
          }}
          className="z-10 mt-20"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <span className="h-px w-8 bg-brand-blue-20"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-blue">Media Kit 2026</span>
            <span className="h-px w-8 bg-brand-blue-20"></span>
          </motion.div>
          
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
            }}
            className="text-6xl md:text-9xl font-serif font-medium tracking-tight text-brand-blue-dark mb-8 leading-[0.9]"
          >
            Pure Reach. <br />
            <span className="italic">Proven Results.</span>
          </motion.h1>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-lg md:text-xl text-brand-blue-dark-80 max-w-2xl mx-auto font-medium leading-relaxed mb-12 px-8"
          >
            Nature the cure connects high-quality wellness brands with 14,000+ newsletter subscribers focused on natural health and longevity.
          </motion.p>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-wrap justify-center gap-5"
          >
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-5 bg-brand-blue text-white rounded-2xl font-bold hover:bg-brand-blue-dark transition-all shadow-2xl shadow-brand-blue-20 flex items-center gap-3 group translate-y-0 active:translate-y-1"
            >
              Start Partnership
              <ExternalLink size={18} className="text-brand-green group-hover:rotate-12 transition-transform" />
            </a>
            <div className="flex -space-x-3 items-center ml-4">
              {[1,2,3].map(i => (
                <motion.div 
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + (i * 0.1) }}
                  className="w-12 h-12 rounded-full bg-brand-blue-10 border-4 border-white overflow-hidden shadow-sm"
                >
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=brand${i}`} alt="Partner" />
                </motion.div>
              ))}
              <span className="pl-6 text-xs font-bold text-brand-blue-dark-40 uppercase tracking-widest">Trusted by 20+ Premium Brands</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-brand-blue-20"
        >
          <div className="w-6 h-10 border-2 border-brand-blue-10 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-brand-blue-20 rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Audience Dashboard Section */}
      <DashboardSection />

      {/* Partner Logos (Mini Section) */}
      <section className="py-20 border-y border-brand-blue-10 bg-white shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-blue-5 to-transparent animate-pulse opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
          >
            <span className="font-serif text-2xl font-bold tracking-tighter text-brand-blue-dark uppercase">Advanced Bionutritionals</span>
            <span className="font-sans text-xl font-black tracking-widest text-[#2160ae] italic">AG1</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl">+</div>
              <span className="font-sans text-2xl font-extrabold tracking-tight text-brand-blue-dark">Gladly</span>
            </div>
            <span className="font-serif text-3xl font-bold tracking-tighter text-brand-blue-dark uppercase">PIQUE</span>
            <span className="font-serif text-2xl font-bold tracking-tight text-brand-blue">Restored Rituals</span>
            <div className="flex items-center gap-2">
              <span className="font-sans text-xl font-black text-brand-blue">CLARITY</span>
              <span className="font-sans text-xl font-light text-brand-blue-dark">Culture</span>
            </div>
            <span className="font-sans text-xl font-black tracking-widest text-brand-blue-dark">CLAER.AI</span>
            <span className="font-sans text-xl font-bold tracking-tight text-brand-blue-dark uppercase border-2 border-brand-blue-dark px-2 leading-none">BEEHIIV</span>
          </motion.div>
        </div>
      </section>

      {/* Campaign Deep Dive */}
      <section className="py-32 bg-brand-blue-dark text-white relative overflow-hidden rounded-[60px] mx-4 my-8 shadow-2xl shadow-brand-blue-30 campaign-snapshots">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <Sparkles className="w-full h-full text-white" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-24 text-left md:text-center max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block px-4 py-1.5 bg-brand-blue-20 text-brand-green rounded-full text-[9px] font-bold uppercase tracking-[0.3em] mb-6 border border-white-10"
            >
              Partner Performance
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-serif font-medium mb-8">Campaign Snapshots</h2>
            <p className="text-brand-light-blue-60 text-lg leading-relaxed">
              We leverage safe, evidence-based storytelling to drive measurable action for our partners. Here is how we've performed recently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {visibleCampaigns.map((post, i) => (
                <CampaignCard key={post.url} post={post} index={i} />
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-4 bg-white-5 border border-white-10 text-brand-light-blue rounded-2xl font-bold hover:bg-white-10 transition-all flex items-center gap-3 backdrop-blur-sm group"
            >
              {showAll ? "Show Less" : "Show Me More"}
              <ChevronDown size={20} className={`transition-transform duration-500 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Partnership CTA */}
          <div className="mt-32 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-green rounded-[48px] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative glass-card bg-white-5 border-white-10 p-10 md:p-16 rounded-[48px] text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                  <div className="p-3 bg-brand-green rounded-2xl">
                    <Zap size={24} className="text-brand-blue-dark" />
                  </div>
                  <h4 className="text-4xl font-serif font-medium">Ready to Partner?</h4>
                </div>
                <p className="text-brand-blue-40 text-lg">Our editorial calendar is filling fast. Book a placeholder for your next launch early.</p>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <a 
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white text-brand-blue-dark rounded-2xl font-bold hover:scale-105 transition-transform text-center inline-block"
                >
                  Request Rate Card
                </a>
                <div className="text-center text-[10px] font-bold text-white-30 uppercase tracking-widest">Typical response: &lt;24 hours</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-brand-blue-5 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-16">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-serif font-bold italic text-brand-blue-dark text-xl tracking-tight">Nature the cure</span>
            </div>
            <p className="text-brand-blue-dark-60 text-sm leading-relaxed mb-8">
              Empowering individuals to reclaim their health through natural, data-backed wellness rituals.
            </p>
            <div className="flex gap-4">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-brand-blue-dark hover:bg-brand-blue-dark hover:text-white transition-colors cursor-pointer"><TrendingUp size={20} /></a>
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-brand-blue-dark hover:bg-brand-blue-dark hover:text-white transition-colors cursor-pointer"><Users size={20} /></div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-brand-blue-dark hover:bg-brand-blue-dark hover:text-white transition-colors cursor-pointer"><MailOpen size={20} /></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 w-full lg:w-auto">
            <div>
              <h6 className="font-bold text-[10px] uppercase tracking-[0.2em] text-brand-blue-dark-20 mb-6">Company</h6>
              <ul className="space-y-3 text-sm font-semibold text-brand-blue-dark-60">
                <li className="hover:text-brand-blue-dark transition-colors cursor-pointer" onClick={() => scrollTo('metrics')}>About</li>
                <li className="hover:text-brand-blue-dark transition-colors cursor-pointer">Privacy</li>
                <li className="hover:text-brand-blue-dark transition-colors cursor-pointer" onClick={() => scrollTo('campaigns')}>Archive</li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-[10px] uppercase tracking-[0.2em] text-brand-blue-dark-20 mb-6">Sponsorship</h6>
              <ul className="space-y-3 text-sm font-semibold text-brand-blue-dark-60">
                <li className="hover:text-brand-blue-dark transition-colors cursor-pointer"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Rate Card</a></li>
                <li className="hover:text-brand-blue-dark transition-colors cursor-pointer">Guidelines</li>
                <li className="hover:text-brand-blue-dark transition-colors cursor-pointer" onClick={() => scrollTo('campaigns')}>Past Partners</li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-[10px] uppercase tracking-[0.2em] text-brand-blue-dark-20 mb-6">Social</h6>
              <ul className="space-y-3 text-sm font-semibold text-brand-blue-dark-60">
                <li className="hover:text-brand-blue-dark transition-colors cursor-pointer"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold text-brand-blue-20 uppercase tracking-widest">
          <p>© 2026 Nature the cure.</p>
          <p>Built with precision by AI Studio.</p>
        </div>
      </footer>
    </div>
  );
}
