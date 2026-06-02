import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar, Download, FileText, Video, BookOpen, Presentation, ExternalLink } from "lucide-react";

const Archive = () => {
  // Section 1: Data for Evergreen Valley Math Tournament (EVMT)
  const evmtTournaments = [
    {
      year: "2026",
      divisions: [
        { name: "Division 1", problemsLink: "https://placeholder.example.com/evmt-2026-div1-problems", solutionsLink: "https://placeholder.example.com/evmt-2026-div1-solutions" },
        { name: "Division 2", problemsLink: "https://placeholder.example.com/evmt-2026-div2-problems", solutionsLink: "https://placeholder.example.com/evmt-2026-div2-solutions" },
      ]
    },
    {
      year: "2025",
      divisions: [
        { name: "Division 1", problemsLink: "https://placeholder.example.com/evmt-2025-div1-problems", solutionsLink: "https://placeholder.example.com/evmt-2025-div1-solutions" },
        { name: "Division 2", problemsLink: "https://placeholder.example.com/evmt-2025-div2-problems", solutionsLink: "https://placeholder.example.com/evmt-2025-div2-solutions" },
      ]
    },
    {
      year: "2024",
      divisions: [
        { name: "Division 1", problemsLink: "https://drive.google.com/file/d/1D3tysyXrFxxJX8OeZGlF7c5uLEWIUmLl/view?usp=sharing", solutionsLink: "https://drive.google.com/file/d/1VauQLqJzQfgJLLFcZSj4pV0YSgrMqquA/view?usp=sharing" },
        { name: "Division 2", problemsLink: "https://drive.google.com/file/d/196OnZEXp7MfxMPM-r_bI3dSeu3xpWBTX/view?usp=sharing", solutionsLink: "https://drive.google.com/file/d/12gjNyV65C9tETLGms9kFdZaosqEOv6QI/view?usp=sharing" },
      ]
    },
    {
      year: "2022",
      divisions: [
        { name: "Division 1", problemsLink: "https://drive.google.com/file/d/1e0lh6ag0ej9SYkx3UEndkucm4fwxDTiM/view?usp=sharing", solutionsLink: null },
        { name: "Division 2", problemsLink: "https://drive.google.com/file/d/1Pjnb1WMEhiTkryYZZ1c_Ph7t44szZMfY/view?usp=sharing", solutionsLink: null },
      ]
    },
    {
      year: "2021",
      divisions: [
        { name: "Division 1", problemsLink: "https://docs.google.com/document/d/1LR9g3afFRRWSrPf341m41yqO3AYz3k4CucOKS3CQaDY/edit?usp=sharing", solutionsLink: null },
        { name: "Division 2", problemsLink: "https://docs.google.com/document/d/11-8XzPInt3FmVrPCRV3ihcgT6LXkTLKV-frzRo6zjsY/edit?usp=share_link", solutionsLink: null },
      ]
    },
    {
      year: "2020",
      divisions: [
        { name: "Division 1", problemsLink: "https://docs.google.com/document/d/1u7si7dUgQ4Xtu8MgvVq_paD5_8Xa84eoE7spUGL1rSc/edit?usp=sharing", solutionsLink: null },
        { name: "Division 2", problemsLink: "https://docs.google.com/document/d/11-8XzPInt3FmVrPCRV3ihcgT6LXkTLKV-frzRo6zjsY/edit?usp=share_link", solutionsLink: null },
      ]
    },
    {
      year: "2019",
      divisions: [
        { name: "Division 1", problemsLink: "https://docs.google.com/document/d/1M_3K8SZBmq2HW2iPz9pv2SpM-3OWGxZqVbksi-JA2z0/edit?usp=sharing", solutionsLink: null },
        { name: "Division 2", problemsLink: "https://docs.google.com/document/d/11K5mxi5FzI2F899XNodMikzrGMTzs-0EHOiYavBE4aY/edit?usp=sharing", solutionsLink: null },
      ]
    },
  ];

  // Section 2: Data for Integration Bee with updated links
  const integrationBees = [
    {
      year: "2025",
      date: "April 10, 2025",
      winner: "Jonathan Tran",
      runnerUps: "Yash Pattekar, Abijeet Sathishkumar",
      participants: 57,
      materials: {
        preliminary: {
          problemsLink: "https://drive.google.com/file/d/1b9sAhu-wC603meUvFJu54E3oFf8zO-yS/view?usp=sharing",
          solutionsLink: "https://drive.google.com/file/d/1IIIAvNHjFO2ggBv-WjQ4GLHmbDcUWaTc/view?usp=sharing",
        },
        final: {
          problemsLink: "https://drive.google.com/file/d/1zDVGjiT5YSPeZQY7H9o2WXYVuz4xi8gS/view?usp=sharing",
          solutionsLink: "https://drive.google.com/file/d/1Issni7eTzqeI0CgpHWulMDbgOjedixrr/view?usp=sharing",
        },
      },
    },
  ];

  // Section 3: Data for Past Lecture Materials
  const lecturePresentations = [
    {
      schoolYear: "2024-25",
      links: [
        "https://docs.google.com/presentation/d/1AfEhPLraH1nVn7qkxCu6ETuHoEmngWePmO2H284ZKTM/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1qaDwFvn-TkU-V48b3MzkDWJ58OKvQ6znVD7Qgf3fryw/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1ZhNGUuWL3FhZF-e-lHI7tTJNTJJvASw3HyHWW5HBs1k/edit?usp=sharing",
        "https://docs.google.com/presentation/d/11i2nu3jv7eR1lCskZeIN1CT_am70WNX69xPw2zBI9B8/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1j4ZBnM88JFPQJ6R2p3AAUkJ1VLwluE3-G6gLL8Wthd4/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1c9aHYIDDaIhpCIuXzr7v5LT4RJSQCboCRCyvU6KkDCw/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1pyulMKBD7iUKd33cuXvWueuVIUjYglyi6BQyyhP1XwA/edit?usp=sharing",
      ]
    },
    {
      schoolYear: "2023-24",
      links: [
        "https://docs.google.com/presentation/d/1D0HYtXIFVHcu3IOU-JokSGur7iotz2fLNK-wwUT5yJY/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1XWEP5fng9ZkrD9HkFDIw8On0pvsAa1uYGRQlLikUSlY/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1Tr_SJ39cmVRuYZ85hbH2PYpf04PR95TWFQE_wpFhYP0/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1dvj5r8LXoZX_TSSjBDvQTr-hUW5mS_gaV1XIuvekhYY/edit?usp=sharing",
      ]
    },
    { schoolYear: "2022-23", links: ["https://docs.google.com/presentation/d/1coa6y1L9GEfPJyJBeq6oR6rbCnrfb_KOa83rRyx2DOY/edit?usp=sharing"] },
    {
      schoolYear: "2021-22",
      links: [
        "https://docs.google.com/presentation/d/1vGB4r80Wumn-NahrbpPyUjo_o8_WKRHPN-TcffGRmDQ/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1JE9f0nxS1p9r9s55tnwzlns2wv45mXxfrQipzgPIXMo/edit?usp=sharing",
      ]
    },
    {
      schoolYear: "2020-21",
      links: [
        "https://docs.google.com/presentation/d/18I-_ZQQSNIR6YO6XvFuWt67cS_f9o2He5EhAgL90Q3o/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1qXJmswf8efyT20cZ7EZ23T1h2KBrBXH8yhP7NpqR-iU/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1KDGyqIbQ8pWdG52osHwCJ-lH_JBQwtBfJhgl949DhwY/edit?usp=sharing",
      ]
    },
    { schoolYear: "2019-20", links: [] },
    {
      schoolYear: "2018-19",
      links: [
        "https://docs.google.com/presentation/d/1dBoL95JMsJFOQNaDPpovY8hHvZEmzgsj8_awuGjiock/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1Bws0n28EQQDic7CBMFGfUC072YfymTnvddOb6qcymcA/edit?usp=sharing",
      ]
    },
    {
      schoolYear: "2017-18",
      links: [
        "https://docs.google.com/presentation/d/1QghoY2s1ero06RMwFy_oyPGJKIAyUCUgZhdDP6bXJc8/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1672gJQKBAnta1HJ3q7kBbKQP9-FEPQp6ZYIeRf0mCOw/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1eLmfN40uxPUdXy0-mdSigHb1d005usvfBceCEp_0N-E/edit?usp=sharing",
      ]
    },
    {
      schoolYear: "2016-17",
      links: [
        "https://docs.google.com/presentation/d/1zKex710LfpKDCGwpg6QbZWxLxSs0rxXITkSqbsYN8Kk/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1dlZ5wDYbIdReDsrQZSbKq5tejpXsOujuMgkCW1p1Vwk/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1Jzt7oFAuvcLVLKQCkhdW4te2lIDCB1_oAS19xITxaH0/edit?usp=sharing",
      ]
    },
    {
      schoolYear: "2015-16",
      links: [
        "https://docs.google.com/presentation/d/1kdik4dhXe8-Qaepop6ig5I4QmqdbQqC9YrqFVrPyKzQ/edit?usp=sharing",
        "https://docs.google.com/presentation/d/0B9RjAGI4U4RcZFBwY1l1dFdXZEE/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1qfAmpBdXYIM4slwGoRiNx3AxY0AjW_21QZzxS239gxU/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1Gxthmn_U70-NW9lINql0xSMxY07W_uuFCNx1azs1eGo/edit?usp=sharing",
        "https://docs.google.com/presentation/d/0B9RjAGI4U4RceGxiRzVCcnhJQ3c/edit?usp=sharing",
        "https://docs.google.com/presentation/d/1o4QX_OzYZymObbA3-_7OrMZdrWYb--2R8hvJT2xQxxQ/edit?usp=sharing",
      ]
    },
    {
      schoolYear: "2014-15",
      links: [
        "https://docs.google.com/presentation/d/146_cCZ7q6bbQTGazdsu8_oyGCsGK025qIX7NS18JoQo/edit?usp=sharing",
        "https://docs.google.com/presentation/d/0B9RjAGI4U4RcYUtjd2N4aWFXR3c/edit?usp=sharing",
      ]
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Archive</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore materials and results from our past events, including the Evergreen Valley Math Tournament, Integration Bees, and lecture slides.
        </p>
      </div>

      {/* Section 1: Evergreen Valley Math Tournament (EVMT) */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-6 pb-2 border-b">
          Evergreen Valley Math Tournament (EVMT)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evmtTournaments.map((tourney) => (
            <Card key={tourney.year} className="flex flex-col hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-xl">EVMT {tourney.year}</CardTitle>
                <CardDescription>Competition Materials</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                {tourney.divisions.map((division) => (
                  <div key={division.name} className="bg-muted/40 p-4 rounded-lg flex items-center flex-wrap gap-4">
                    <h4 className="font-semibold flex-grow">{division.name}</h4>
                    <div className="flex gap-2 flex-wrap">
                      {division.problemsLink && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={division.problemsLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Problems
                          </a>
                        </Button>
                      )}
                      {division.solutionsLink && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={division.solutionsLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Solutions
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 2: Integration Bee */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-6 pb-2 border-b">Integration Bee</h2>
        <div className="max-w-2xl">
          {integrationBees.map((bee) => (
            <Card key={bee.year} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Integration Bee {bee.year}</CardTitle>
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <CardDescription>{bee.date}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm border-b pb-4">
                  <div className="flex justify-between"><span className="text-muted-foreground">Winner:</span> <span className="font-semibold text-primary">{bee.winner}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Runner Ups:</span> <span className="font-medium">{bee.runnerUps}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Participants:</span> <span className="font-medium">{bee.participants}</span></div>
                </div>
                <div className="space-y-3 pt-2">
                  <h4 className="font-semibold">Competition Materials</h4>
                  <div className="space-y-2">
                    <div className="bg-muted/40 p-3 rounded-lg flex items-center flex-wrap gap-x-4 gap-y-2">
                      <span className="font-medium text-sm flex-grow">Preliminary Round</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={bee.materials.preliminary.problemsLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Problems
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={bee.materials.preliminary.solutionsLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Solutions
                          </a>
                        </Button>
                      </div>
                    </div>
                    <div className="bg-muted/40 p-3 rounded-lg flex items-center flex-wrap gap-x-4 gap-y-2">
                      <span className="font-medium text-sm flex-grow">Final Round</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={bee.materials.final.problemsLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Problems
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={bee.materials.final.solutionsLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Solutions
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 3: Past Lecture Materials */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-6 pb-2 border-b">Past Lecture Materials</h2>
        <Accordion type="single" collapsible className="w-full">
          {lecturePresentations.map((yearData) => (
            <AccordionItem value={yearData.schoolYear} key={yearData.schoolYear}>
              <AccordionTrigger>{yearData.schoolYear}</AccordionTrigger>
              <AccordionContent>
                {yearData.links.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {yearData.links.map((link, index) => (
                      <Button asChild key={index} variant="outline" className="justify-start">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          <Presentation className="mr-2 h-4 w-4" />
                          Presentation {index + 1}
                        </a>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No materials available for this year.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default Archive;
