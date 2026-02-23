import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, Users, BookOpen, Trophy, ExternalLink, Info } from "lucide-react";

import 'katex/dist/katex.min.css';
// Keeping the import even though we aren't rendering Latex right now, 
// in case you add a Latex problem back later.
import Latex from "react-latex-next"; 

/**
 * Lightweight, self-contained Matter.js canvas used in the hero's animation area.
 * - no SSR assumptions (dynamic import of matter-js)
 * - crisp on HiDPI
 * - responsive to container size
 * - mouse/touch drag enabled
 */
function PhysicsAnimation() {
  const mountRef = useRef(null);

  useEffect(() => {
    let engine, render, runner;
    let walls = [];
    let ramps = [];
    let destroyed = false;

    const setup = async () => {
      const Matter = await import("matter-js");
      const { Engine, Render, Runner, Bodies, Body, Composite, World } = Matter;

      if (!mountRef.current) return;
      const container = mountRef.current;
      const rect = container.getBoundingClientRect();

      engine = Engine.create({ gravity: { x: 0, y: 1.0 } });

      render = Render.create({
        element: container,
        engine,
        options: {
          width: Math.max(320, Math.floor(rect.width)),
          height: Math.max(260, Math.floor(rect.height)),
          wireframes: false,
          background: "transparent",
          pixelRatio: window.devicePixelRatio || 1,
        },
      });

      const COLORS = ["#f97316", "#f59e0b", "#fbbf24", "#fde68a", "#0f2940"];
      const rand = (min, max) => Math.random() * (max - min) + min;
      const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

      const makeBall = (x, y) =>
        Bodies.circle(x, y, rand(8, 18), {
          restitution: 0.45,
          friction: 0.001,
          frictionAir: 0,
          render: {
            fillStyle: pick(COLORS),
            strokeStyle: "rgba(0,0,0,0.06)",
            lineWidth: 1,
          },
        });

      const mkWalls = (W, H) => {
        const thick = 80;
        const opts = { isStatic: true, render: { visible: false } };
        walls = [];
        World.add(engine.world, walls);
      };

      const rampStyle = {
        isStatic: true,
        chamfer: { radius: 6 },
        render: {
          fillStyle: "transparent",
          strokeStyle: "#ffffff",
          lineWidth: 3,
        },
      };

      const mkRamps = (W, H) => {
        const a1 = -0.2;
        const a2 = +0.17;
        const a3 = -0.26;

        const r1 = Bodies.rectangle(W * 0.66, H * 0.22, W * 0.5, 12, {
          ...rampStyle,
          angle: a1,
        });
        const r2 = Bodies.rectangle(W * 0.32, H * 0.55, W * 0.56, 12, {
          ...rampStyle,
          angle: a2,
        });
        const r3 = Bodies.rectangle(W * 0.6, H * 0.86, W * 0.82, 12, {
          ...rampStyle,
          angle: a3,
        });

        ramps = [r1, r2, r3];
        World.add(engine.world, ramps);
      };

      const W = render.options.width;
      const H = render.options.height;
      mkWalls(W, H);
      mkRamps(W, H);

      const initial = 5;
      const balls = Array.from({ length: initial }, () =>
        makeBall(rand(W * 0.8, W * 0.28), rand(-40, H * 0.05))
      );
      World.add(engine.world, balls);

      balls.forEach((b) => Body.setAngularVelocity(b, rand(-0.05, 0.05)));

      let spawned = 0;
      const timer = window.setInterval(() => {
        if (destroyed || spawned > 40) return window.clearInterval(timer);
        const b = makeBall(rand(W * 0.9, W * 0.22), -30);
        World.add(engine.world, b);
        spawned += 1;
      }, 700);

      const resize = () => {
        if (!mountRef.current) return;
        const { width, height } = mountRef.current.getBoundingClientRect();
        const newW = Math.max(320, Math.floor(width));
        const newH = Math.max(260, Math.floor(height));

        render.options.width = newW;
        render.options.height = newH;
        render.canvas.width = newW * (window.devicePixelRatio || 1);
        render.canvas.height = newH * (window.devicePixelRatio || 1);
        render.canvas.style.width = `${newW}px`;
        render.canvas.style.height = `${newH}px`;
        Render.setPixelRatio(render, window.devicePixelRatio || 1);

        if (walls.length) World.remove(engine.world, walls);
        if (ramps.length) World.remove(engine.world, ramps);
        mkWalls(newW, newH);
        mkRamps(newW, newH);
      };

      window.addEventListener("resize", resize);

      Render.run(render);
      runner = Runner.create();
      Runner.run(runner, engine);

      return () => {
        window.removeEventListener("resize", resize);
        window.clearInterval(timer);
        try {
          Runner.stop(runner);
          Render.stop(render);
          if (render?.canvas && render.canvas.parentNode)
            render.canvas.parentNode.removeChild(render.canvas);
          Engine.clear(engine);
        } catch {}
      };
    };

    let cleanup;
    (async () => (cleanup = await setup()))();

    return () => {
      destroyed = true;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div ref={mountRef} className="relative w-full h-[420px] lg:h-[520px]" />
  );
}

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>

        {/* BACKGROUND GLOWS */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Glow 1 */}
          <div className="absolute top-20 left-20">
            <div className="w-72 h-72 rounded-full overflow-hidden">
              <div className="w-full h-full bg-primary/20 blur-3xl animate-float" />
            </div>
          </div>

          {/* Glow 2 */}
          <div className="absolute bottom-20 right-20">
            <div className="w-96 h-96 rounded-full overflow-hidden">
              <div
                className="w-full h-full bg-accent/20 blur-3xl animate-float"
                style={{ animationDelay: "2s" }}
              />
            </div>
          </div>

          {/* Glow 3 */}
          <div className="absolute top-1/2 left-[46%] -translate-x-1/2 -translate-y-1/2">
            <div className="w-[600px] h-[600px] rounded-full overflow-hidden">
              <div
                className="w-full h-full bg-cyan-500/10 blur-3xl animate-float"
                style={{ animationDelay: "4s" }}
              />
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                EVHS<span className="block">Math Club</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Join us in exploring mathematics through competitions,
                problem-solving, and collaborative learning.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://discord.gg/HeAM7TYV2y"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:shadow-glow-purple transition-all duration-300 text-white font-semibold px-8 py-4 text-lg"
                  >
                    Join Our Discord
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Link to="/resources">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 px-8 py-4 text-lg"
                  >
                    View Resources
                  </Button>
                </Link>
              </div>
            </div>

            {/* Animation Area w/ Matter.js */}
            <div
              className="hidden lg:block lg:order-last animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <PhysicsAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow-purple hover:border-primary/30 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Next Meeting
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary group-hover:text-primary-glow transition-colors duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                March 3
              </div>
              <p className="text-xs text-muted-foreground">Room B109 @ Lunch</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:shadow-glow-cyan hover:border-cyan-500/30 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Members
              </CardTitle>
              <Users className="h-4 w-4 text-cyan-500 group-hover:text-cyan-400 transition-colors duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">
                127
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Signups This Year
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:shadow-glow-orange hover:border-accent/30 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Next Competition
              </CardTitle>
              <Trophy className="h-4 w-4 text-accent group-hover:text-accent-hover transition-colors duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                SMT Online
              </div>
              <p className="text-xs text-muted-foreground">April 18</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:shadow-glow-purple hover:border-emerald-400/30 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resources
              </CardTitle>
              <BookOpen className="h-4 w-4 text-emerald-400 group-hover:text-emerald-500 transition-colors duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                85+
              </div>
              <p className="text-xs text-muted-foreground">
                Available Resources
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-card border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-glow-cyan">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">
                Announcements
              </CardTitle>
              <Info className="h-6 w-6 text-cyan-500" />
            </div>
            <CardDescription>
              Important dates and deadlines.
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none text-muted-foreground space-y-4">
            <div className="bg-card/50 p-4 rounded-lg border border-border/50 space-y-2">
              <h4 className="font-semibold text-lg text-foreground">
                EVMT Problem Writing
              </h4>
              <p>
                We are currently organizing this year's <strong>Evergreen Valley Math Tournament</strong>.
                If you are interested in helping write problems, please contact any of the officers or email{" "}
                <a href="mailto:mathclub.evhs@gmail.com" className="text-cyan-400 hover:underline">
                  mathclub.evhs@gmail.com
                </a>.
              </p>
            </div>

            <div className="bg-card/50 p-4 rounded-lg border border-border/50 space-y-2">
              <h4 className="font-semibold text-lg text-foreground">
                Officer Elections Coming Soon
              </h4>
              <p>
                Officer elections are approaching soon. If you are in{" "}
                <strong>9th, 10th, or 11th grade</strong> and have been an active club member (attended at least half of meetings and at least one event/competition), apply using the document below and share it with{" "}
                <a href="mailto:mathclub.evhs@gmail.com" className="text-cyan-400 hover:underline">
                  mathclub.evhs@gmail.com
                </a>.
              </p>
              <p>
                Application document:{" "}
                <a
                  href="https://docs.google.com/document/d/1OA2LgtknaKW2OIKhWJQdXjKyl9GCqcy50h4b57pi9Mo/edit?tab=t.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  2026-2027 Math Club Officer Application
                </a>
              </p>
              <p>
                Deadline: <strong>Sunday, March 1, 2026</strong>. Applicants will give a 1-minute speech at the next meeting on <strong>Tuesday, March 3</strong>, followed by club voting.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Problem of the Month */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-card border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-glow-orange">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                Problem of the Month
              </CardTitle>
              <Badge
                variant="secondary"
                className="bg-accent/20 text-accent border-accent/30 hover:bg-accent/30 transition-colors duration-300"
              >
                February 2026
              </Badge>
            </div>
            <CardDescription>
              Submit your solution for a chance to be featured!
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none text-muted-foreground space-y-6">
            <p className="text-lg">
              The problem for this month is available directly on the submission form. Please click the button below to view the problem and submit your solution.
            </p>

            <div className="not-prose flex">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdPSxAoWVvvqirhAAi6QSGKajmr7ZocT4oc1bL5AOnQKniJ8Q/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-gradient-secondary hover:shadow-glow-orange transition-all duration-300 text-white font-semibold px-8 py-4 text-lg"
                >
                  View Problem & Submit
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Connect Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl"></div>
          <div className="relative backdrop-blur-sm bg-card/30 border border-border/50 rounded-3xl p-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Stay Connected
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join our community on Discord for announcements, discussions,
                and competition updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-2">
                <a
                  href="https://discord.gg/HeAM7TYV2y"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold px-8 py-4 text-lg hover:shadow-lg hover:shadow-[#5865F2]/25 transition-all duration-300">
                    Join Discord Server
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a
                  href="https://www.facebook.com/groups/evhsmathclub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary font-semibold px-8 py-4 text-lg transition-all duration-300"
                  >
                    Follow on Facebook
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12"></div>
    </div>
  );
};

export default Home;
