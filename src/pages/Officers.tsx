import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Officers = () => {
  // Data for the current 2026-2027 officers
  const officers = [
    {
      name: "Alivia Cui",
      role: "President",
      year: "Junior",
      bio: "Bio coming soon.",
      funFact: "Fun fact coming soon.",
    },
    {
      name: "Anish Muralikrishnan",
      role: "Vice President",
      year: "Sophomore",
      bio: "Bio coming soon.",
      funFact: "Fun fact coming soon.",
    },
    {
      name: "Riyansh Goyal",
      role: "Event Coordinator",
      year: "Sophomore",
      bio: "Bio coming soon.",
      funFact: "Fun fact coming soon.",
    },
    {
      name: "Sparsh Gupta",
      role: "Secretary",
      year: "Junior",
      bio: "Bio coming soon.",
      funFact: "Fun fact coming soon.",
    },
    {
      name: "Ian Kweon",
      role: "Treasurer",
      year: "Sophomore",
      bio: "Bio coming soon.",
      funFact: "Fun fact coming soon.",
    },
  ];

  // Data for the club advisor
  const advisor = {
    name: "Dr. Bhatnagar",
    role: "Advisor",
    bio: "Taught math courses like Calc BC at EVHS for a looooooooooooong time!",
  };

  // Data for past officers, organized by year
  const pastOfficerYears = [
    {
        year: "2025-2026",
        officers: [
            { role: "President", name: "Pranshu Sharma & Saanvi Kotha" },
            { role: "Vice President", name: "Yash Pattekar" },
            { role: "Treasurer", name: "Alivia Cui" },
            { role: "Secretary", name: "Andy Xing" },
        ]
    },
    {
        year: "2024-2025",
        officers: [
            { role: "President", name: "Vincent Lo" },
            { role: "Vice President", name: "Saanvi Kotha" },
            { role: "Treasurer", name: "Jian Kweon" },
            { role: "Secretary", name: "Dhruva Cheethirala" },
            { role: "Event Coordinator", name: "Pranshu Sharma" }
        ]
    },
    {
        year: "2023-2024",
        officers: [
            { role: "President", name: "Prajwal Vandana" },
            { role: "Vice President", name: "Eleanor Yang" },
            { role: "Treasurer", name: "Vincent Lo" },
            { role: "Secretary", name: "Saanvi Kotha" },
            { role: "Event Coordinator", name: "Dhruva Cheethirala" }
        ]
    },
    {
        year: "2022-2023",
        officers: [
            { role: "President", name: "Arianna Cao" },
            { role: "Vice President", name: "Prajwal Vandana & Andrew Chang" },
            { role: "Treasurer", name: "Alex Li" },
            { role: "Secretary", name: "Eleanor Yang" },
            { role: "Event Coordinator", name: "Vincent Lo" }
        ]
    },
    {
        year: "2021-2022",
        officers: [
            { role: "President", name: "Ralph Cao" },
            { role: "Vice President", name: "Jessica Qu" },
            { role: "Treasurer", name: "Arianna Cao" },
            { role: "Secretary", name: "Andrew Chang" },
            { role: "Event Coordinator", name: "Prajwal Vandana" }
        ]
    },
    {
        year: "2020-2021",
        officers: [
            { role: "President", name: "Allen Ma" },
            { role: "Vice President", name: "Felix Zhu" },
            { role: "Treasurer", name: "Jessica Qu" },
            { role: "Secretary", name: "Ralph Cao" },
            { role: "Event Coordinator", name: "Arianna Cao" }
        ]
    },
    {
        year: "2019-2020",
        officers: [
            { role: "President", name: "Suhas Kotha" },
            { role: "Vice President", name: "Allen Ma" },
            { role: "Treasurer", name: "Felix Zhu" },
            { role: "Secretary", name: "Jessica Qu" },
            { role: "Event Coordinator", name: "Ralph Cao" }
        ]
    },
    {
        year: "2018-2019",
        officers: [
            { role: "President", name: "Matthew Guo" },
            { role: "Vice President", name: "Jocelin Su" },
            { role: "Treasurer", name: "Suhas Kotha" },
            { role: "Secretary", name: "Allen Ma" },
            { role: "Event Coordinator", name: "Felix Zhu" }
        ]
    },
    {
        year: "2017-2018",
        officers: [
            { role: "President", name: "Deven Navani" },
            { role: "Vice President", name: "Michelle Li" },
            { role: "Treasurer", name: "Matthew Guo" },
            { role: "Secretary", name: "Jocelin Su" },
            { role: "Event Coordinator", name: "Suhas Kotha" }
        ]
    },
    {
        year: "2016-2017",
        officers: [
            { role: "President", name: "Anton Cao" },
            { role: "Vice President", name: "Rohan Joshi" },
            { role: "Treasurer", name: "Kevin Cao" },
            { role: "Secretary", name: "Dylan Tian" },
            { role: "Event Coordinator", name: "Deven Navani" }
        ]
    },
    {
        year: "2015-2016",
        officers: [
            { role: "President", name: "Anton Cao" },
            { role: "Vice President", name: "Rohan Joshi" },
            { role: "Treasurer", name: "Kevin Cao" },
            { role: "Secretary", name: "Dylan Tian" },
            { role: "Event Coordinator", name: "Nagaganesh Jaladanki" }
        ]
    },
    {
        year: "2014-2015",
        officers: [
            { role: "President", name: "Andre Xiong" },
            { role: "Vice President", name: "Justin Hao" },
            { role: "Treasurer", name: "Charlie Tian" },
            { role: "Secretary", name: "Jeremiah Fan" },
            { role: "Events Coordinator", name: "Yongqi Gan" }
        ]
    },
    {
        year: "2013-2014",
        officers: [
            { role: "President", name: "Richard Qian" },
        ]
    },
    {
        year: "2012-2013",
        officers: [
            { role: "President", name: "Yizhe Liu" },
            { role: "Officer", name: "Crystal Pan" },
            { role: "Officer", name: "Julie Chen" },
            { role: "Officer", name: "Louis Chen" },
            { role: "Officer", name: "Richard Qian" },
        ]
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Officers</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The officers and advisor leading the EVHS Math Club.
        </p>
      </div>

      {/* Current Officers Grid */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-8 pb-2 border-b">Current Officers (2026-2027)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {officers.map((officer, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">{officer.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{officer.role}</Badge>
                    <Badge variant="outline">{officer.year}</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{officer.bio}</p>
                <div className="pt-2">
                  <h4 className="text-sm font-medium text-foreground">Fun Fact</h4>
                  <p className="text-muted-foreground text-sm">{officer.funFact}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Advisor Section */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-8 pb-2 border-b">Advisor</h2>
        <Card className="max-w-2xl">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-foreground">{advisor.name}</h3>
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground">{advisor.role}</Badge>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">{advisor.bio}</p>
          </CardContent>
        </Card>
      </section>

      {/* Past Officers Section */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-8 pb-2 border-b">Past Officers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastOfficerYears.map((yearData) => (
            <Card key={yearData.year} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>{yearData.year}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {yearData.officers.map((officer, index) => (
                    <li key={index} className="text-muted-foreground">
                      <span className="font-semibold text-foreground">{officer.role}:</span> {officer.name}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Officers;
