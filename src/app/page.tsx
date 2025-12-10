"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Download,
  Mail,
  Youtube,
  Globe,
  TrendingUp,
  Users,
  Play,
  MonitorPlay,
  CheckCircle2,
  BarChart3,
  ExternalLink,
  Menu,
  Clock,
  Zap,
  Calendar,
} from "lucide-react";

import { stats } from "@/data/stats";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import { DownloadPdfButton } from "@/components/site/DownloadPdfButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// Helper per formattare i numeri
function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function MediaKitPage() {
  const [isMounted, setIsMounted] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const [activeSection, setActiveSection] = React.useState("");
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Chart Data
  const chartData = React.useMemo(() => [
    { type: "reels", category: "Reels (<90s)", duration: stats.avgDurationReels, fill: "var(--color-reels)" },
    { type: "video", category: "Video (>90s)", duration: stats.avgDurationVideos, fill: "var(--color-video)" },
  ], []);

  const chartConfig = React.useMemo(() => ({
    reels: { label: "Reels", color: "hsl(var(--chart-1))" },
    video: { label: "Video", color: "hsl(var(--chart-2))" },
  }) satisfies ChartConfig, []);

  React.useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Simple active section detection
      const sections = ["about", "numeri", "portfolio", "servizi", "contatti"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary selection:text-primary-foreground relative">
      
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all"
      >
        <TrendingUp className="h-6 w-6" />
      </motion.button>

      
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between px-6 md:px-12">
          <Link href="/" className="flex items-center gap-2 group" onClick={scrollToTop}>
            <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full border border-border shadow-sm">
              <Image 
                src="/mediakit/logoFinito2.png" 
                alt="Logo Ingeimaks" 
                fill 
                className="object-cover"
                onError={() => {
                  // Fallback to avatar if logo.png is missing
                }}
              />
            </div>
            <span className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
              INGEIMAKS
            </span>
          </Link>

          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["About", "Numeri", "Portfolio", "Servizi", "Contatti"].map(
              (item) => {
                const lowerItem = item.toLowerCase();
                return (
                  <Link
                    key={item}
                    href={`#${lowerItem}`}
                    className={cn(
                      "relative transition-colors hover:text-primary",
                      activeSection === lowerItem ? "text-primary font-bold" : "text-muted-foreground"
                    )}
                  >
                    {item}
                    {activeSection === lowerItem && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              }
            )}
          </nav>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <DownloadPdfButton className="hidden md:flex" />

            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="text-center sm:text-center">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8 mt-10 items-center text-center">
                  {["About", "Numeri", "Portfolio", "Servizi", "Contatti"].map(
                    (item) => (
                      <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-xl font-medium hover:text-primary transition-colors py-2 w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    )
                  )}
                  <DownloadPdfButton className="w-full flex md:hidden mt-4" />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="w-full py-8 space-y-24 md:space-y-32 overflow-x-hidden">
        
        <motion.section
          style={{ opacity, scale }}
          className="relative flex flex-col items-center text-center space-y-8 py-20 md:py-32 overflow-hidden px-6 md:px-12"
        >
          
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              x: [0, 100, 0],
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
            className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -100, 0],
            }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10" 
          />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1.5,
            }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-full bg-black blur-md opacity-50"></div>
            <Avatar className="h-32 w-32 md:h-48 md:w-48 border-4 border-background relative shadow-2xl">
              <AvatarImage
                src={stats.avatarUrl || "https://yt3.googleusercontent.com/ytc/AIdro_k2e9wWwW9wW9wW9wW9wW9wW9wW9wW9wW9w=s900-c-k-c0x00ffffff-no-rj"}
                alt="Giovanni Mannara"
                className="object-cover"
              />
              <AvatarFallback className="text-4xl md:text-6xl font-bold bg-muted">
                GM
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-4 max-w-3xl"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-300% animate-gradient"
            >
              Giovanni Mannara
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-3xl text-muted-foreground font-light"
            >
              Tech Content Creator & Maker •{" "}
              <span className="text-primary font-semibold">Ingeimaks</span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {["Electronics", "Programming", "DIY Projects", "Tech Reviews"].map(
              (tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-4 py-1.5 text-sm md:text-base hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {tag}
                </Badge>
              )
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full text-lg h-12 px-8 shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all hover:-translate-y-1"
            >
              <Link href="mailto:info@ingeimaks.it">Collabora con me</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full text-lg h-12 px-8 border-2 hover:bg-accent/50 transition-all hover:-translate-y-1"
            >
              <Link href="https://youtube.com/ingeimaks" target="_blank">
                <Youtube className="mr-2 h-5 w-5 text-red-600" />
                Canale YouTube
              </Link>
            </Button>
          </motion.div>
        </motion.section>

        
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid md:grid-cols-2 gap-12 items-center relative px-6 md:px-12"
        >
          <div className="space-y-8 z-10">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight border-l-4 border-primary pl-4">
                Chi è Ingeimaks?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sono Giovanni Mannara, un ingegnere e maker appassionato di
                tecnologia. Su YouTube condivido la mia passione per
                l&apos;elettronica, la programmazione e il fai-da-te tecnologico.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Il mio obiettivo è rendere la tecnologia accessibile a tutti,
                spiegando concetti complessi in modo semplice e divertente, e
                ispirando la mia community a costruire i propri progetti.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="font-bold text-lg">Italia 🇮🇹</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Lingua
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-bold text-lg">Italiano</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-gradient-to-br from-muted/50 to-muted rounded-2xl p-8 border border-border/50 shadow-inner flex flex-col justify-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:scale-110 transition-transform duration-500" />
            
            <h3 className="text-2xl font-bold">Perché collaborare?</h3>
            <ul className="space-y-4">
              {[
                "Pubblico altamente profilato e appassionato",
                "Contenuti di alta qualità tecnica e visiva",
                "Credibilità e fiducia costruita negli anni",
                "Approccio creativo al brand placement",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        
        <motion.section
          id="numeri"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-12 px-6 md:px-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              I Numeri del Canale YouTube
            </h2>
            <p className="text-muted-foreground text-lg">
              Dati aggiornati e verificati (YouTube Data API)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                label: "Iscritti",
                value: stats.subscribers,
                icon: Users,
                desc: "Community fedele",
                color: "text-blue-500",
              },
              {
                label: "Visualizzazioni Totali",
                value: stats.totalViews,
                icon: Play,
                desc: "Lifetime views",
                color: "text-red-500",
              },
              {
                label: "Media Views / Video",
                value: stats.avgViewsPerVideo,
                icon: MonitorPlay,
                desc: `Su ${stats.videoCount} video`,
                color: "text-green-500",
              },
              {
                label: "Engagement Rate",
                value: stats.engagementRatePct,
                suffix: "%",
                icon: TrendingUp,
                desc: "Alta interazione",
                color: "text-purple-500",
              },
              {
                label: "Durata Media",
                value: stats.avgDurationMinutes,
                suffix: " min",
                icon: Clock,
                desc: "Formato approfondito",
                color: "text-orange-500",
              },
              {
                label: "Views Recenti",
                value: stats.recentAvgViews,
                icon: Zap,
                desc: "Ultimi 10 video",
                color: "text-yellow-500",
            },
            {
              label: "Frequenza Upload",
              value: stats.uploadsPerMonth,
              suffix: " /mese",
              icon: Calendar,
              desc: "Costanza pubblicazione",
              color: "text-cyan-500",
            },
          ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2 group-hover:text-foreground transition-colors">
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      {stat.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold tracking-tight">
                      {formatNumber(stat.value)}
                      {stat.suffix}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 group-hover:text-primary transition-colors">
                      {stat.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          
          <motion.div variants={fadeInUp} className="w-full">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Durata Media Contenuti
                </CardTitle>
                <CardDescription>
                  Confronto tra formati brevi (Reels) e lunghi (Video) - Precisione al secondo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto aspect-[2/1] max-h-[300px] w-full">
                  <BarChart
                    accessibilityLayer
                    data={chartData}
                    layout="vertical"
                    margin={{ left: 0, right: 50 }}
                  >
                    <YAxis
                      dataKey="category"
                      type="category"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      width={100}
                    />
                    <XAxis type="number" hide />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="duration" layout="vertical" radius={5}>
                      <LabelList
                        dataKey="duration"
                        position="right"
                        offset={8}
                        className="fill-foreground font-bold"
                        fontSize={12}
                        formatter={(value: number) => {
                          const m = Math.floor(value / 60);
                          const s = value % 60;
                          return `${m}m ${s}s`;
                        }}
                      />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        
        <motion.section
          id="ecosistema"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="space-y-8 px-6 md:px-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ecosistema Digitale
            </h2>
            <p className="text-muted-foreground text-lg">
              Oltre YouTube: una community attiva su più fronti
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.socials && Object.entries(stats.socials).map(([key, social]) => {
               const logoPath = `/mediakit/socials/${key}.svg`;
               
               const count = social.followers || social.subscribers || 0;
               const label = social.followers ? "Follower" : social.subscribers ? "Iscritti" : "Community";
               
               // Colori per le ombre (rimossi bordi colorati)
               const shadowClass = 
                 key === 'facebook' ? "hover:shadow-blue-500/40" :
                 key === 'telegram' ? "hover:shadow-sky-500/40" :
                 key === 'instagram' ? "hover:shadow-pink-500/40" :
                 key === 'tiktok' ? "hover:shadow-zinc-500/40" :
                 key === 'patreon' ? "hover:shadow-orange-500/40" :
                 "hover:shadow-primary/40";

               return (
                <Link 
                  key={key} 
                  href={social.url}
                  target="_blank"
                  className={`group relative flex flex-col items-center justify-center p-6 gap-4 bg-card/50 backdrop-blur-sm border-2 border-border/50 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${shadowClass}`}
                >
                  <div className="relative h-12 w-12 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={logoPath}
                      alt={social.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  <div className="text-center space-y-1">
                    <div className="font-bold text-lg">{social.label}</div>
                    {count > 0 ? (
                      <div className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                        {formatNumber(count)} {label}
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground opacity-70">Unisciti ora</div>
                    )}
                  </div>
                </Link>
               );
            })}
          </div>
        </motion.section>

        
        <section id="audience" className="grid md:grid-cols-2 gap-8 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Users className="h-6 w-6 text-primary" /> Demografica
                </CardTitle>
                <CardDescription>Chi guarda i miei video</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {[
                  { label: "Uomini", val: 94, color: "bg-blue-500" },
                  { label: "Età 18-34", val: 65, color: "bg-primary" },
                  { label: "Interesse Tech/Maker", val: 100, color: "bg-green-500" },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{item.label}</span>
                      <span>{item.val}%</span>
                    </div>
                    <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 * i }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Globe className="h-6 w-6 text-primary" /> Geografia
                </CardTitle>
                <CardDescription>Provenienza del traffico</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paese</TableHead>
                      <TableHead className="text-right">%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { c: "Italia 🇮🇹", p: "92%" },
                      { c: "Svizzera 🇨🇭", p: "3%" },
                      { c: "Altro 🌍", p: "5%" },
                    ].map((row, i) => (
                      <TableRow key={i} className="hover:bg-muted/50">
                        <TableCell className="font-medium text-lg">
                          {row.c}
                        </TableCell>
                        <TableCell className="text-right font-bold text-lg">
                          {row.p}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        
        <section id="portfolio" className="space-y-12 px-6 md:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Top Videos
            </h2>
            <Button variant="ghost" className="group" asChild>
              <Link href="https://youtube.com/ingeimaks" target="_blank">
                Vedi tutti{" "}
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {stats.topVideos.map((video, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="flex flex-col h-full overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group border-muted hover:border-primary/30">
                  <div className="relative aspect-video w-full bg-muted overflow-hidden">
                    <Image
                      src={`https://img.youtube.com/vi/${
                        video.url.split("v=")[1]
                      }/hqdefault.jpg`}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="h-16 w-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <Play className="fill-black text-black h-8 w-8 ml-1" />
                      </div>
                    </div>
                    <Badge className="absolute bottom-2 right-2 bg-black/80 text-white hover:bg-black/80">
                      {formatNumber(video.views)} views
                    </Badge>
                  </div>
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-lg line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      {video.title}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="p-5 pt-auto mt-auto">
                    <Button variant="outline" className="w-full group/btn" asChild>
                      <Link href={video.url} target="_blank">
                        Guarda su YouTube
                        <ExternalLink className="ml-2 h-3 w-3 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        
        <motion.section
          id="collaborazioni"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="space-y-8 px-6 md:px-12"
        >
          <div className="text-center space-y-4">
             <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
               Brand che si fidano
             </h2>
             <p className="text-muted-foreground text-lg">
               Alcune delle aziende con cui ho collaborato
             </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              { name: "Geekmall", domain: "geekmall.eu" },
              { name: "Geekbuying", domain: "geekbuying.com" },
              { name: "Engwe", domain: "engwe-bikes.com" },
              { name: "Imou", domain: "imoulife.com" },
              { name: "Linogy", domain: "linogy.com" },
              { name: "Toocaa", domain: "toocaa.com" },
              { name: "Acmer", domain: "acmerlaser.com" },
              { name: "BIGTREETECH", domain: "bigtree-tech.com" },
              { name: "Monport", domain: "monportlaser.com" },
              { name: "PCBWay", domain: "pcbway.com" },
              { name: "Banggood", domain: "banggood.com" },
              { name: "Elegoo", domain: "elegoo.com" },
              { name: "Anycubic", domain: "anycubic.com" },
            ].map((brand) => (
              <Link
                key={brand.name}
                href={`https://${brand.domain}`}
                target="_blank"
                className="group flex flex-col items-center justify-center gap-3 h-28 w-32 md:h-32 md:w-40 bg-white dark:bg-muted/30 rounded-lg border border-border/50 p-4 transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:scale-105"
                title={brand.name}
              >
                <div className="relative h-12 w-full md:h-14">
                  <Image
                    src={`/mediakit/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                    alt={brand.name}
                    fill
                    className="object-contain transition-all duration-500"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors text-center">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </motion.section>

        
        <motion.section
          id="servizi"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative bg-gradient-to-br from-muted/50 via-background to-muted/50 p-8 md:p-12 rounded-[2rem] border border-border/50 overflow-hidden mx-6 md:mx-12"
        >
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10" />

          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Servizi & Collaborazioni
            </h2>
            <p className="text-muted-foreground text-lg">
              Come possiamo lavorare insieme
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Video Dedicato",
                desc: "Un intero video dedicato al tuo prodotto o servizio. Ideale per tutorial complessi e recensioni approfondite.",
              },
              {
                title: "Integrazione (Mid-roll)",
                desc: "Una menzione organica di 60-90 secondi. Il modo più efficace per raggiungere l'audience senza interrompere il flusso.",
                highlight: true,
              },
              {
                title: "YouTube Shorts",
                desc: "Video brevi, dinamici e ad alto impatto virale. Perfetti per mostrare funzionalità 'wow' del prodotto.",
              },
            ].map((service, idx) => (
              <Card
                key={idx}
                className={cn(
                  "bg-background/80 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
                  service.highlight
                    ? "border-primary shadow-lg shadow-primary/10 scale-105 z-10"
                    : "border-border"
                )}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className={service.highlight ? "text-primary text-xl" : "text-xl"}>
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        
        <motion.section
          id="contatti"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 text-center space-y-8 px-6 md:px-12"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-300% animate-gradient">
              Parliamo del tuo progetto
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Sono sempre alla ricerca di partner che condividano la mia passione
              per l&apos;innovazione. Contattami per richiedere il listino prezzi o
              discutere un&apos;idea.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6">
            <Button
              size="lg"
              className="gap-3 text-lg px-8 h-16 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105"
              asChild
            >
              <Link href="mailto:info@ingeimaks.it">
                <Mail className="h-6 w-6" />
                Scrivimi una Email
              </Link>
            </Button>
            <p className="text-xl font-medium text-foreground tracking-wide selection:bg-primary selection:text-primary-foreground">
              info@ingeimaks.it
            </p>
          </div>
        </motion.section>
      </main>

      <footer className="py-12 border-t bg-muted/30 text-center text-sm text-muted-foreground">
        <div className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            © {new Date().getFullYear()} Giovanni Mannara (Ingeimaks). Tutti i
            diritti riservati.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/termini" className="hover:text-primary transition-colors">
              Termini e Condizioni
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
