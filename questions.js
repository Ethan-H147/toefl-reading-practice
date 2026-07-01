window.READING_SETS = [
  {
    id: "complete-words",
    number: "01",
    type: "word-completion",
    eyebrow: "Language in context",
    title: "Complete the words",
    shortTitle: "Complete the words",
    description: "Restore missing letters and use the paragraph to guide you.",
    accent: "coral",
    estimatedMinutes: 4,
    questions: [
      {
        id: "cw-1",
        instruction:
          "Complete each word by typing the missing letters. Each underscore represents one letter.",
        segments: [
          "The history of the South Pacific is marked by diverse cultures and significant events. Indigenous popul",
          { blank: "populations", visible: "", answer: "ations" },
          " developed com",
          { blank: "complex", visible: "", answer: "plex" },
          " societies wi",
          { blank: "with", visible: "", answer: "th" },
          " rich tradi",
          { blank: "traditions", visible: "", answer: "tions" },
          " and soc",
          { blank: "social", visible: "", answer: "ial" },
          " structures. T",
          { blank: "The", visible: "", answer: "he" },
          " region's poli",
          { blank: "political", visible: "", answer: "tical" },
          " and econ",
          { blank: "economic", visible: "", answer: "omic" },
          " landscapes exper",
          { blank: "experienced", visible: "", answer: "ienced" },
          " profound cha",
          { blank: "changes", visible: "", answer: "nges" },
          " following colonization by European powers. Studying this history allows for a greater understanding of cultural interactions and the ongoing effects of historical events on contemporary South Pacific societies. Traditional navigation techniques using stars and ocean swells enabled remarkable voyaging achievements, while contemporary movements focus on cultural preservation, language revitalization, and addressing climate change impacts on island nations."
        ]
      },
      {
        id: "cw-2",
        instruction:
          "Complete each word by typing the missing letters. Each underscore represents one letter.",
        segments: [
          "Tigers are solitary animals known for their territorial behavior; males use scent markings and vocalizations to define their territories. Each ma",
          { blank: "male", visible: "", answer: "le" },
          " tiger estab",
          { blank: "establishes", visible: "", answer: "lishes" },
          " control ov",
          { blank: "over", visible: "", answer: "er" },
          " a la",
          { blank: "large", visible: "", answer: "rge" },
          " territory span",
          { blank: "spanning", visible: "", answer: "ning" },
          " several squ",
          { blank: "square", visible: "", answer: "are" },
          " miles a",
          { blank: "and", visible: "", answer: "nd" },
          " patrols t",
          { blank: "the", visible: "", answer: "he" },
          " area regul",
          { blank: "regularly", visible: "", answer: "arly" },
          " to lo",
          { blank: "look", visible: "", answer: "ok" },
          " for prey and maintain dominance. This behavior helps reduce conflicts over prey, but tigers are known to fiercely defend their territory from intruders when necessary. Often hunting at night, tigers use stealth and their excellent night vision to their advantage."
        ]
      },
      {
        id: "cw-3",
        instruction:
          "Complete each word by typing the missing letters. Each underscore represents one letter.",
        segments: [
          "Tectonic plates are large pieces of Earth's outer shell that move slowly over the planet's surface, and their study is fundamental in understanding Earth's geological activity. These plates fit toge",
          { blank: "together", visible: "", answer: "ther" },
          " much li",
          { blank: "like", visible: "", answer: "ke" },
          " a jig",
          { blank: "jigsaw", visible: "", answer: "saw" },
          " puzzle a",
          { blank: "and", visible: "", answer: "nd" },
          " constantly sh",
          { blank: "shift", visible: "", answer: "ift" },
          ", causing earth",
          { blank: "earthquakes", visible: "", answer: "quakes" },
          ", the form",
          { blank: "formation", visible: "", answer: "ation" },
          " of moun",
          { blank: "mountains", visible: "", answer: "tains" },
          ", and volc",
          { blank: "volcanic", visible: "", answer: "anic" },
          " eruptions. Scien",
          { blank: "Scientists", visible: "", answer: "tists" },
          " analyze these movements to better understand natural disasters and how Earth's surface changes over time. Advances in this field have significantly improved our ability to monitor and prepare for natural disasters as well as to mitigate their impacts."
        ]
      }
    ]
  },
  {
    id: "daily-reading",
    number: "02",
    type: "visual-mcq",
    eyebrow: "Everyday reading",
    title: "Read in daily life",
    shortTitle: "Daily life",
    description: "Understand notices, schedules, advertisements, and messages.",
    accent: "blue",
    estimatedMinutes: 12,
    materials: [
      {
        id: "fitlife-membership",
        kind: "membership",
        url: "https://www.fitlifegym.com",
        title: "FitLife Gym Membership",
        plans: [
          {
            name: "Monthly",
            price: "$30",
            details: "Equipment access only"
          },
          {
            name: "Quarterly",
            price: "$80",
            details: "Group classes and swimming pool privileges"
          },
          {
            name: "Annual",
            price: "$300",
            details: "Personal training discounts plus guest passes"
          }
        ],
        note:
          "New members get a one-week free trial but must commit to a minimum three-month membership afterward."
      },
      {
        id: "career-fair-email",
        kind: "email",
        sender: "Ryan",
        recipient: "Team",
        paragraphs: [
          "Blundin University hosted a career fair yesterday. I was able to speak to several promising candidates for summer internships with our company.",
          "See their attached resumes. I’d like everyone to give me their feedback no later than Friday."
        ]
      },
      {
        id: "ai-art-article",
        kind: "article",
        title: "AI-Generated Art on Campus",
        paragraphs: [
          "Visitors to the Petrunich Gallery can now view an exhibit of AI-generated paintings that blur the line between human creativity and machine learning. One standout work, Dream Algorithm, depicts a city floating in a sea of binary code, while another, Echoes of Light, uses layered brushstrokes created by artificial neural networks to mimic sunrise over glass towers.",
          "The exhibit, which was funded by an arts innovation grant, allows visitors to interact with a program that generates custom artwork in real time, allowing them to choose themes and color palettes. This feature has become the centerpiece of the show, enchanting everyone from art majors to computer science instructors."
        ],
        quotes: [
          {
            text:
              "We’re exploring the intersection of creativity and technology. It challenges what art means.",
            attribution: "Dana Fields, curator"
          },
          {
            text:
              "I made a painting with code—it felt empowering. It’s a new frontier.",
            attribution: "Sofia Ramirez, senior art major"
          }
        ]
      },
      {
        id: "data-skills-catalog",
        kind: "catalog",
        title: "Downtown School of Data Skills",
        schedule:
          "All classes meet for eight sessions from 6:00 P.M. to 7:00 P.M., beginning September 1.",
        courses: [
          {
            title: "Spreadsheet Introduction",
            description:
              "Students will learn how to create spreadsheets and use functions that can speed up work. This course is good for beginners and those who need to relearn basics.",
            sections: [
              "Section A: Mondays and Wednesdays",
              "Section B: Tuesdays and Thursdays",
              "Section C: (virtual) Wednesdays and Fridays"
            ]
          },
          {
            title: "Formulas",
            description:
              "Instructors will show students how to use basic spreadsheet formulas for business. Students should have basic spreadsheet skills before enrolling.",
            sections: [
              "Section D: Tuesdays",
              "Section E: (virtual) Thursdays"
            ]
          },
          {
            title: "Data Seminar",
            description:
              "Taught by industry professionals, this course is for researchers who want to learn how to work with complex data.",
            sections: ["Section F: (virtual) Mondays"]
          },
          {
            title: "Data Representation",
            description:
              "This course is for analysts and researchers who need to show audiences easy-to-read graphs and charts.",
            sections: ["Section G: (virtual) Wednesdays"]
          }
        ]
      }
    ],
    questions: [
      {
        id: "dl-1",
        materialId: "fitlife-membership",
        instruction: "Read the membership information, then choose the best answer.",
        prompt:
          "What benefits does a quarterly member have that a monthly member lacks?",
        choices: [
          "Equipment access and guest passes",
          "Personal training discounts only",
          "Group classes and swimming privileges",
          "Free trial and minimum commitment"
        ],
        answer: 2,
        explanation:
          "The quarterly plan adds group classes and swimming pool privileges, while the monthly plan includes equipment access only."
      },
      {
        id: "dl-2",
        materialId: "fitlife-membership",
        instruction: "Read the membership information, then choose the best answer.",
        prompt: "What is required of new members after the one-week free trial ends?",
        choices: [
          "Nothing",
          "A one-month membership",
          "A three-month membership",
          "An annual membership"
        ],
        answer: 2,
        explanation:
          "The notice says new members must commit to a minimum three-month membership after the trial."
      },
      {
        id: "dl-3",
        materialId: "career-fair-email",
        instruction: "Read the e-mail, then choose the best answer.",
        prompt: "What did Ryan do yesterday?",
        choices: [
          "He took a class at a university.",
          "He attended a job fair.",
          "He was interviewed by a manager.",
          "He hired some summer interns."
        ],
        answer: 1,
        explanation:
          "Ryan says Blundin University hosted a career fair yesterday and that he spoke with candidates there."
      },
      {
        id: "dl-4",
        materialId: "career-fair-email",
        instruction: "Read the e-mail, then choose the best answer.",
        prompt: "What does Ryan ask his team to do?",
        choices: [
          "Share their opinions of some job candidates",
          "Review a summer internship program",
          "Update their résumés by Friday",
          "Introduce themselves to new interns"
        ],
        answer: 0,
        explanation:
          "Ryan asks everyone to review the candidates’ attached résumés and give him feedback by Friday."
      },
      {
        id: "dl-5",
        materialId: "ai-art-article",
        instruction: "Read the article, then choose the best answer.",
        prompt: "What is the main topic of the article?",
        choices: [
          "An art exhibit highlighting technology-driven creativity",
          "A debate over mixing art and technology",
          "How students are learning traditional painting",
          "A plan to replace the art gallery with a data center"
        ],
        answer: 0,
        explanation:
          "The article describes an AI-generated art exhibit that combines human creativity with machine learning."
      },
      {
        id: "dl-6",
        materialId: "ai-art-article",
        instruction: "Read the article, then choose the best answer.",
        prompt: "Which of the following is true of the exhibit?",
        choices: [
          "Its dates have been extended because of public enthusiasm.",
          "It prohibits visitor participation.",
          "It merges artistic expression with digital innovation.",
          "It features computer-aided musical performances."
        ],
        answer: 2,
        explanation:
          "The exhibit combines paintings and interactive artwork with AI and machine-learning technology."
      },
      {
        id: "dl-7",
        materialId: "ai-art-article",
        instruction: "Read the article, then choose the best answer.",
        prompt:
          "What can be inferred about the impact of the exhibit’s interactive portion?",
        choices: [
          "It asks visitors to consider the ethical implications of using AI to create art.",
          "It has caused visitors to switch majors from art to computer science.",
          "It has led to calls to replace traditional art with AI art.",
          "It helps visitors feel comfortable using AI in their creative endeavors."
        ],
        answer: 3,
        explanation:
          "Visitors can generate their own art, and the article describes the experience as enchanting and empowering."
      },
      {
        id: "dl-8",
        materialId: "data-skills-catalog",
        instruction: "Read the course catalog, then choose the best answer.",
        prompt:
          "Peter has no experience with spreadsheets and cannot attend class on Wednesdays. He should enroll in",
        choices: ["Section A", "Section B", "Section C", "Section D"],
        answer: 1,
        explanation:
          "Peter needs Spreadsheet Introduction, and Section B meets on Tuesdays and Thursdays rather than Wednesdays."
      },
      {
        id: "dl-9",
        materialId: "data-skills-catalog",
        instruction: "Read the course catalog, then choose the best answer.",
        prompt: "What does Michelle need before enrolling in Section D?",
        choices: [
          "Experience creating new spreadsheet formulas",
          "A research position that requires creating formulas",
          "Training in how to present complex data",
          "Previous experience using spreadsheets"
        ],
        answer: 3,
        explanation:
          "Section D is part of the Formulas course, which requires basic spreadsheet skills before enrolling."
      },
      {
        id: "dl-10",
        materialId: "data-skills-catalog",
        instruction: "Read the course catalog, then choose the best answer.",
        prompt:
          "Beth has worked with formulas for years and is ready to learn advanced data skills. She should enroll in",
        choices: [
          "Section A, B, or C",
          "Section D or E",
          "Section F",
          "Section G"
        ],
        answer: 2,
        explanation:
          "Section F is the Data Seminar, where experienced learners work with complex data."
      }
    ]
  },
  {
    id: "academic-reading",
    number: "03",
    type: "passage-mcq",
    eyebrow: "Academic reading",
    title: "Read an academic passage",
    shortTitle: "Academic passage",
    description: "Work through longer passages and evidence-based questions.",
    accent: "green",
    estimatedMinutes: 14,
    materials: [
      {
        id: "augmented-reality-training",
        title: "Augmented Reality in Training",
        passage: [
          "Augmented reality (AR) has emerged as a groundbreaking tool in the field of human performance technology, particularly in training environments. AR overlays digital information on the real world, providing immersive experiences that enhance learning and skill acquisition. For example, AR can simulate complex machinery operations, allowing trainees to interact with virtual components as if they were physically present. This hands-on approach helps learners understand intricate processes without the risks associated with real-world practice.",
          "The adaptability of AR makes it suitable for various industries. In medicine, AR can project 3D models of human anatomy, guiding surgeons through complex procedures. In aviation, pilots use AR to practice emergency protocols, offering a safe yet realistic training environment. Studies have shown that these AR applications significantly improve retention rates and performance outcomes. Moreover, AR’s ability to customize training scenarios based on individual needs further enhances its effectiveness.",
          "However, integrating AR into training programs presents challenges. The technology requires substantial investment in hardware and software development. Additionally, creating accurate and responsive AR content demands expertise that many organizations may lack. Despite these hurdles, the benefits of AR in boosting human performance are undeniable. As the technology continues to evolve, it promises even more sophisticated and effective training solutions."
        ]
      },
      {
        id: "sedimentary-rocks",
        title: "The Formation and Study of Sedimentary Rocks",
        passage: [
          "Sedimentary rocks form through deposition, compaction, and cementation of materials like mineral particles, organic matter, and chemical precipitates. These sediments accumulate in layers, often in bodies of water like rivers, lakes, and oceans. As layers are deposited, the weight of the overlying layers exerts pressure on the sediments below, reducing their volume and ejecting water, a process known as compaction. Cementation occurs when dissolved minerals leave groundwater and fill the spaces between compacted particles, binding them together. This dual process is called lithification, transforming loose sediments into solid rock.",
          "Sedimentary rocks are classified into three primary categories: clastic, chemical, and organic. Clastic sedimentary rocks, such as sandstone and shale, are composed of fragments of pre-existing rocks. Chemical sedimentary rocks, including limestone and gypsum, form from dissolved minerals leaching out of water. Organic sedimentary rocks, like coal, develop from the accumulation and lithification of plant and animal matter.",
          "The study of sedimentary rocks offers insights into Earth’s history. These rocks often contain fossils, which are preserved remains of ancient organisms. Fossils can reveal much about past environments, climate conditions, and evolutionary processes. Additionally, the layering of sedimentary rocks can indicate significant geological events, such as volcanic eruptions or changes in sea level."
        ]
      }
    ],
    questions: [
      {
        id: "art-1",
        materialId: "augmented-reality-training",
        instruction: "Choose the best answer according to the passage.",
        highlight: "groundbreaking",
        prompt:
          "The word “groundbreaking” in the passage is closest in meaning to",
        choices: [
          "educational",
          "practical",
          "revolutionary",
          "interesting"
        ],
        answer: 2,
        explanation:
          "“Groundbreaking” describes something innovative or revolutionary."
      },
      {
        id: "art-2",
        materialId: "augmented-reality-training",
        instruction: "Choose the best answer according to the passage.",
        prompt: "What is the function of AR as described in the passage?",
        choices: [
          "AR artificially enhances human performance.",
          "AR produces realistic experiences in a learning environment.",
          "AR enables unskilled humans to interact with complex machines.",
          "AR produces a digital record of real-world content."
        ],
        answer: 1,
        explanation:
          "The passage says AR overlays digital information on the real world to provide immersive, realistic training experiences."
      },
      {
        id: "art-3",
        materialId: "augmented-reality-training",
        instruction: "Choose the best answer according to the passage.",
        prompt:
          "AR reduces which of the following problems associated with traditional training environments?",
        choices: [
          "Their inability to simulate authentic experiences",
          "Their physical dangers",
          "Their inaccessibility to many learners",
          "Their high financial costs"
        ],
        answer: 1,
        explanation:
          "AR lets learners practice complex processes without the risks associated with real-world practice."
      },
      {
        id: "art-4",
        materialId: "augmented-reality-training",
        instruction: "Choose the best answer according to the passage.",
        prompt:
          "Why does the author cite studies showing that AR improves retention rates?",
        choices: [
          "To demonstrate its usefulness when practicing emergency protocols",
          "To provide an example of its adaptability",
          "To explain why fields outside medicine and aviation are slower to adopt it",
          "To support the claim that it is useful to industries"
        ],
        answer: 3,
        explanation:
          "The study results support the broader claim that AR is effective across training applications and industries."
      },
      {
        id: "art-5",
        materialId: "augmented-reality-training",
        instruction: "Choose the best answer according to the passage.",
        prompt: "What is one problem the passage mentions related to the use of AR?",
        choices: [
          "The costs associated with making it useful to particular clients",
          "Disagreement among experts regarding its accuracy",
          "A lack of measurable benefits in its present stage of development",
          "The absence of existing training programs into which it may be integrated"
        ],
        answer: 0,
        explanation:
          "The passage identifies substantial investment and customized content development as challenges."
      },
      {
        id: "sr-1",
        materialId: "sedimentary-rocks",
        instruction: "Choose the best answer according to the passage.",
        highlight: "ejecting",
        prompt: "The word “ejecting” in the passage is closest in meaning to",
        choices: ["combining with", "heating", "forcing out", "accumulating"],
        answer: 2,
        explanation:
          "In this context, pressure reduces the sediments’ volume by forcing water out."
      },
      {
        id: "sr-2",
        materialId: "sedimentary-rocks",
        instruction: "Choose the best answer according to the passage.",
        prompt: "What is the role of groundwater in sedimentary rock formation?",
        choices: [
          "It provides the compaction needed for the sedimentation process.",
          "It eventually dissolves the particles in sedimentary rocks.",
          "It carries sediments to new locations.",
          "It deposits minerals that bind sediments together."
        ],
        answer: 3,
        explanation:
          "Dissolved minerals leave groundwater and fill spaces between compacted particles, cementing them together."
      },
      {
        id: "sr-3",
        materialId: "sedimentary-rocks",
        instruction: "Choose the best answer according to the passage.",
        prompt:
          "Pieces of pre-existing rock are most likely to be found in which of the following?",
        choices: ["Sandstone", "Limestone", "Coal", "Fossils"],
        answer: 0,
        explanation:
          "The passage identifies sandstone as a clastic rock, and clastic rocks consist of fragments of pre-existing rocks."
      },
      {
        id: "sr-4",
        materialId: "sedimentary-rocks",
        instruction: "Choose the best answer according to the passage.",
        prompt: "Why does the author mention fossils in sedimentary rocks?",
        choices: [
          "To provide details on the preservation of ancient organisms",
          "To introduce an explanation of the types of materials found in sedimentary rocks",
          "To highlight the use of fossils in understanding Earth’s history",
          "To add to an explanation of how past climate conditions are studied"
        ],
        answer: 2,
        explanation:
          "Fossils are presented as evidence that helps scientists understand Earth’s past environments, climate, and evolution."
      }
    ]
  },
  {
    id: "listening-module-2",
    number: "L4",
    section: "listening",
    type: "listening-mixed",
    eyebrow: "Listening · Module 2",
    title: "Listening Module 2",
    shortTitle: "Module 2",
    description: "Complete the final listening tasks for Set 1.",
    accent: "teal",
    estimatedMinutes: 16,
    audioPattern: "Module 2 listening tasks",
    materials: [
      {
        id: "module2-response-01",
        title: "Spoken prompt 13",
        context: "Listen to one question, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-13.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "module2-response-02",
        title: "Spoken prompt 14",
        context: "Listen to one request, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-14.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "module2-response-03",
        title: "Spoken prompt 15",
        context: "Listen to one request, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-15.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "module2-conversation-01",
        title: "Mural project",
        context: "Questions 36 and 37 refer to this conversation.",
        audioSrc: "assets/audio/set-1/listening-conversation-04.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "module2-conversation-02",
        title: "Yoga class",
        context: "Questions 38 and 39 refer to this conversation.",
        audioSrc: "assets/audio/set-1/listening-conversation-05.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "module2-talk-01",
        title: "Multi-species anthropology",
        context: "Questions 40 through 43 refer to this anthropology talk.",
        audioSrc: "assets/audio/set-1/listening-talk-06.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "module2-talk-02",
        title: "The Eastgate Centre",
        context: "Questions 44 through 47 refer to this architecture talk.",
        audioSrc: "assets/audio/set-1/listening-talk-07.mp3",
        audioType: "audio/mpeg"
      }
    ],
    questions: [
      {
        id: "lm2-1",
        materialId: "module2-response-01",
        taskName: "Listen and choose a response",
        heading: "Choose the best response",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "Let’s see what’s on the agenda first.",
          "We need to send invitations.",
          "The club room is more spacious.",
          "Friday is better."
        ],
        answer: 0,
        explanation:
          "The speaker asks whether to invite the whole club or only the officers, so checking the agenda first is the most natural response."
      },
      {
        id: "lm2-2",
        materialId: "module2-response-02",
        taskName: "Listen and choose a response",
        heading: "Choose the best response",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "I need to clean them up first.",
          "I don’t think Tim took notes either.",
          "Class ran long.",
          "I didn’t expect so many people to be there."
        ],
        answer: 0,
        explanation:
          "The speaker asks for notes from yesterday’s class, so needing to clean them up first is a relevant answer."
      },
      {
        id: "lm2-3",
        materialId: "module2-response-03",
        taskName: "Listen and choose a response",
        heading: "Choose the best response",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "Yes, I need them immediately.",
          "I have no idea where I left them.",
          "No, it’s actually quite far from here.",
          "You can put them in here."
        ],
        answer: 1,
        explanation:
          "The speaker asks to borrow headphones, and saying they are misplaced is the only relevant response."
      },
      {
        id: "lm2-4",
        materialId: "module2-conversation-01",
        taskName: "Conversations",
        heading: "Listen to the conversation and answer the question",
        instruction: "Listen to the conversation, then choose the best answer.",
        prompt: "What does the man encourage the woman to do?",
        choices: [
          "Enter a contest",
          "Take an art class",
          "Speak with a judge",
          "Go to see a mural"
        ],
        answer: 0,
        explanation:
          "He tells her she should enter the university mural project because her paintings are strong."
      },
      {
        id: "lm2-5",
        materialId: "module2-conversation-01",
        taskName: "Conversations",
        heading: "Listen to the conversation and answer the question",
        instruction: "Listen to the conversation, then choose the best answer.",
        prompt: "Why does the man mention the Newspaper Club and Student Council?",
        choices: [
          "To identify where he heard about some upcoming events",
          "To explain why he is unavailable",
          "To encourage the woman to join new activities",
          "To point out why he would be a strong candidate"
        ],
        answer: 1,
        explanation:
          "Those activities are mentioned as existing commitments that make participating difficult."
      },
      {
        id: "lm2-6",
        materialId: "module2-conversation-02",
        taskName: "Conversations",
        heading: "Listen to the conversation and answer the question",
        instruction: "Listen to the conversation, then choose the best answer.",
        prompt: "What did the man do at noon?",
        choices: [
          "He signed up for a yoga class.",
          "He entered an empty conference room.",
          "He read an email sent by the yoga instructor.",
          "He forwarded an email to the woman."
        ],
        answer: 1,
        explanation:
          "The man says he stopped in at noon and no one was in the conference room."
      },
      {
        id: "lm2-7",
        materialId: "module2-conversation-02",
        taskName: "Conversations",
        heading: "Listen to the conversation and answer the question",
        instruction: "Listen to the conversation, then choose the best answer.",
        prompt: "What does the woman imply the man can do tomorrow?",
        choices: [
          "Check his email more frequently",
          "Send the yoga instructor an email",
          "Attend a yoga class",
          "Attend a meeting in the conference room"
        ],
        answer: 2,
        explanation:
          "She says the instructor rescheduled the yoga class for tomorrow."
      },
      {
        id: "lm2-8",
        materialId: "module2-talk-01",
        taskName: "Announcements and academic talks",
        heading: "Listen to the talk and answer the question",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "What is the main purpose of the talk?",
        choices: [
          "To contrast two different approaches to anthropology",
          "To emphasize the importance of anthropology",
          "To explore the distinction in anthropology between \"culture\" and \"nature\"",
          "To argue that plants are less important than animals as cultural symbols"
        ],
        answer: 2,
        explanation:
          "The speaker explains how traditional anthropology separated human culture from nature before introducing multi-species anthropology."
      },
      {
        id: "lm2-9",
        materialId: "module2-talk-01",
        taskName: "Announcements and academic talks",
        heading: "Listen to the talk and answer the question",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "What does the speaker imply about a study related to seals?",
        choices: [
          "It led to the development of multispecies anthropology.",
          "It was the first study to examine Arctic hunting rituals.",
          "It challenged common views about rituals.",
          "Its view of the animal-human relationship was too simple."
        ],
        answer: 3,
        explanation:
          "The speaker says early seal studies focused on human symbolism while overlooking seals’ own behaviors and ecological roles."
      },
      {
        id: "lm2-10",
        materialId: "module2-talk-01",
        taskName: "Announcements and academic talks",
        heading: "Listen to the talk and answer the question",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt:
          "What point does the speaker make about studies of mushroom foragers in Siberia?",
        choices: [
          "They were initially rejected by most anthropologists.",
          "They emphasize the interdependence among different living organisms.",
          "They focus on the value of mushrooms in the foragers’ rituals.",
          "They show the symbolic meaning of mushrooms in the lives of foragers."
        ],
        answer: 1,
        explanation:
          "The talk presents mushrooms, trees, and humans as part of an interdependent network."
      },
      {
        id: "lm2-11",
        materialId: "module2-talk-01",
        taskName: "Announcements and academic talks",
        heading: "Listen to the talk and answer the question",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "What will the speaker discuss next?",
        choices: [
          "How a study was influenced by a researcher’s personal background",
          "How culture influences human foraging practices",
          "How humans have damaged the natural environment",
          "How research methods have changed"
        ],
        answer: 3,
        explanation:
          "The speaker says the next topic will be how the multi-species perspective reshapes research methods."
      },
      {
        id: "lm2-12",
        materialId: "module2-talk-02",
        taskName: "Announcements and academic talks",
        heading: "Listen to the talk and answer the question",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "What is the main topic of the talk?",
        choices: [
          "A type of architecture that combines modern needs with traditional styles",
          "A building project designed to protect local plant and animal life",
          "The use of natural materials in modern construction",
          "A design solution inspired by nature"
        ],
        answer: 3,
        explanation:
          "The talk explains how the Eastgate Centre’s cooling design was inspired by termite mounds."
      },
      {
        id: "lm2-13",
        materialId: "module2-talk-02",
        taskName: "Announcements and academic talks",
        heading: "Listen to the talk and answer the question",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "What is the Eastgate Centre built to house?",
        choices: [
          "A research center",
          "An energy-production facility",
          "A factory for air conditioners",
          "Offices and stores"
        ],
        answer: 3,
        explanation:
          "The speaker describes the Eastgate Centre as a mixed-use complex with retail spaces and offices."
      },
      {
        id: "lm2-14",
        materialId: "module2-talk-02",
        taskName: "Announcements and academic talks",
        heading: "Listen to the talk and answer the question",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "What was the architect’s main challenge when designing the Eastgate Centre?",
        choices: [
          "Designing a tall structure using only brick and concrete",
          "Avoiding the need for conventional air conditioning",
          "Convincing governmental officials to support his project",
          "Creating a structure that could survive in a harsh environment"
        ],
        answer: 1,
        explanation:
          "The architect needed to keep the shops and offices cool without traditional air conditioning."
      },
      {
        id: "lm2-15",
        materialId: "module2-talk-02",
        taskName: "Announcements and academic talks",
        heading: "Listen to the talk and answer the question",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "What does the speaker imply about vents in the termite mounds?",
        choices: [
          "They are located primarily below ground level.",
          "They help to protect the termites from predators.",
          "They are much larger than termites’ bodies.",
          "Termites use them to actively control the airflow in the mounds."
        ],
        answer: 3,
        explanation:
          "The speaker says termites fine-tune airflow by opening, closing, enlarging, and sealing vents."
      }
    ]
  }
];

window.LISTENING_SETS = [
  {
    id: "listen-and-respond",
    number: "L1",
    section: "listening",
    type: "listening-response",
    eyebrow: "Listening · Short response",
    title: "Listen and choose a response",
    shortTitle: "Choose a response",
    description: "Select the best response to a spoken question or statement.",
    accent: "purple",
    estimatedMinutes: 5,
    audioPattern: "One audio clip → one multiple-choice question",
    materials: [
      {
        id: "response-prompt-01",
        title: "Spoken prompt 1",
        context: "Listen to one question, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-01.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "response-prompt-02",
        title: "Spoken prompt 2",
        context: "Listen to one question, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-02.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "response-prompt-03",
        title: "Spoken prompt 3",
        context: "Listen to one statement, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-03.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "response-prompt-04",
        title: "Spoken prompt 4",
        context: "Listen to one statement, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-04.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "response-prompt-05",
        title: "Spoken prompt 5",
        context: "Listen to one question, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-05.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "response-prompt-06",
        title: "Spoken prompt 6",
        context: "Listen to one question, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-06.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "response-prompt-07",
        title: "Spoken prompt 7",
        context: "Listen to one question, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-07.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "response-prompt-08",
        title: "Spoken prompt 8",
        context: "Listen to one statement, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-08.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "response-prompt-09",
        title: "Spoken prompt 9",
        context: "Listen to one question, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-09.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "response-prompt-10",
        title: "Spoken prompt 10",
        context: "Listen to one question, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-10.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "response-prompt-11",
        title: "Spoken prompt 11",
        context: "Listen to one request, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-11.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "response-prompt-12",
        title: "Spoken prompt 12",
        context: "Listen to one question, then choose the most natural response.",
        audioSrc: "assets/audio/set-1/listening-response-12.mp3",
        audioType: "audio/mpeg"
      }
    ],
    questions: [
      {
        id: "lr-1",
        materialId: "response-prompt-01",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "The last appointment is at 2 p.m.",
          "The wait time is three hours.",
          "Near the registrar’s office.",
          "She’s following the doctor’s advice."
        ],
        answer: 2,
        explanation:
          "The speaker asks where the campus wellness center is, so a location near the registrar’s office is the appropriate response."
      },
      {
        id: "lr-2",
        materialId: "response-prompt-02",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "I just submitted the science lab report.",
          "That’s a good idea.",
          "My tuition is due soon.",
          "I like knowing how things work."
        ],
        answer: 3,
        explanation:
          "The speaker asks why the listener chose a science course. Enjoying how things work gives a relevant reason."
      },
      {
        id: "lr-3",
        materialId: "response-prompt-03",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "The membership dues.",
          "The auditorium on the second floor.",
          "Last night it rained a lot.",
          "At least five said they would come."
        ],
        answer: 3,
        explanation:
          "The speaker is unsure how many people will join the study group, and the response provides a likely number."
      },
      {
        id: "lr-4",
        materialId: "response-prompt-04",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "What size did you buy?",
          "It was a good-looking design.",
          "I’ll give him the list of what we need.",
          "This year it starts earlier than usual."
        ],
        answer: 2,
        explanation:
          "Because Peter will look for supplies, giving him a list of the needed items is the most natural response."
      },
      {
        id: "lr-5",
        materialId: "response-prompt-05",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "This is an excellent poem.",
          "No, it’s not always true.",
          "Yes, I bought a new one.",
          "I have too much work."
        ],
        answer: 3,
        explanation:
          "The speaker asks whether the listener is going to a conference. Having too much work gives a relevant reason not to attend."
      },
      {
        id: "lr-6",
        materialId: "response-prompt-06",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "Yes, that was most likely true.",
          "All companies offer similar benefits.",
          "I was too busy.",
          "I wanted to help my fellow students."
        ],
        answer: 3,
        explanation:
          "The speaker asks why the listener volunteered, and helping fellow students supplies a clear reason."
      },
      {
        id: "lr-7",
        materialId: "response-prompt-07",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "I’ve been there once.",
          "I’ve been too busy to organize it.",
          "The new furniture looks great.",
          "It should arrive tomorrow."
        ],
        answer: 1,
        explanation:
          "Being too busy to organize the desk directly explains why it is cluttered."
      },
      {
        id: "lr-8",
        materialId: "response-prompt-08",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "It’s a device that runs on solar power.",
          "Yes, they usually go out to eat.",
          "I thought it was a powerful speech.",
          "It looks like the streetlights outside the dorm are still on."
        ],
        answer: 3,
        explanation:
          "The illuminated streetlights provide relevant evidence about whether the whole area lost power."
      },
      {
        id: "lr-9",
        materialId: "response-prompt-09",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "I think Emily should.",
          "Everyone needs to register online.",
          "It was a lively class.",
          "There is new homework."
        ],
        answer: 0,
        explanation:
          "The speaker asks who will present the project, and Emily is the only proposed person."
      },
      {
        id: "lr-10",
        materialId: "response-prompt-10",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "The conference call lasted two hours.",
          "Most of our classmates, I think.",
          "The professor took attendance during the afternoon class.",
          "No, I wasn’t there."
        ],
        answer: 1,
        explanation:
          "The question asks who will attend the conference, and the response identifies most of the speaker’s classmates."
      },
      {
        id: "lr-11",
        materialId: "response-prompt-11",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "Yes, I think it is.",
          "A very noisy concert.",
          "Sure, sorry about that.",
          "No, I’m not going to return it."
        ],
        answer: 2,
        explanation:
          "The speaker makes a polite request to lower the volume, so agreeing and apologizing is the natural response."
      },
      {
        id: "lr-12",
        materialId: "response-prompt-12",
        instruction: "Listen to the prompt, then choose the best response.",
        prompt: "Choose the best response.",
        choices: [
          "My order was placed yesterday.",
          "Let’s check in the main office.",
          "There are a lot of new clubs this year.",
          "One box and four bags."
        ],
        answer: 1,
        explanation:
          "Checking with the main office is a relevant way to learn the current status of the club registration."
      }
    ]
  },
  {
    id: "listening-conversations",
    number: "L2",
    section: "listening",
    type: "listening-conversation",
    eyebrow: "Listening · Conversations",
    title: "Conversations",
    shortTitle: "Conversations",
    description: "Answer several questions about each short conversation.",
    accent: "amber",
    estimatedMinutes: 8,
    audioPattern: "One conversation → several multiple-choice questions",
    materials: [
      {
        id: "conversation-01",
        title: "University orchestra concert",
        context: "Questions 13 and 14 refer to this conversation.",
        audioSrc: "assets/audio/set-1/listening-conversation-01.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "conversation-02",
        title: "Parking garage",
        context: "Questions 15 and 16 refer to this conversation.",
        audioSrc: "assets/audio/set-1/listening-conversation-02.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "conversation-03",
        title: "A birthday gift",
        context: "Questions 17 and 18 refer to this conversation.",
        audioSrc: "assets/audio/set-1/listening-conversation-03.mp3",
        audioType: "audio/mpeg"
      }
    ],
    questions: [
      {
        id: "lc-1",
        materialId: "conversation-01",
        instruction: "Listen to the conversation, then choose the best answer.",
        prompt: "What are the man and the woman talking about?",
        choices: [
          "The location of a new park",
          "Their favorite types of music",
          "Their plans to attend an event",
          "The best places to listen to music"
        ],
        answer: 2,
        explanation:
          "They discuss attending a university orchestra concert in the park together."
      },
      {
        id: "lc-2",
        materialId: "conversation-01",
        instruction: "Listen to the conversation, then choose the best answer.",
        prompt:
          "What does the man imply when he says, “I’ll bring a blanket too”?",
        choices: [
          "He is worried that he might get cold.",
          "He thinks the tickets are too expensive.",
          "He would like a seat close to the stage.",
          "He will sit in the grass with the woman’s friends."
        ],
        answer: 3,
        explanation:
          "The woman’s group plans to sit on blankets in the grass, and the man agrees to join them there."
      },
      {
        id: "lc-3",
        materialId: "conversation-02",
        instruction: "Listen to the conversation, then choose the best answer.",
        prompt: "What change occurred at a parking garage?",
        choices: [
          "Some lines were repainted.",
          "Parking must be reserved ahead of time.",
          "Students can no longer park on one of the levels.",
          "Monthly permits are no longer available."
        ],
        answer: 2,
        explanation:
          "The first level used to allow student parking but is now reserved for faculty."
      },
      {
        id: "lc-4",
        materialId: "conversation-02",
        instruction: "Listen to the conversation, then choose the best answer.",
        prompt: "What did the woman fail to notice?",
        choices: [
          "A parking ticket on her car",
          "Signs about parking rules",
          "A change in parking garage hours",
          "An email about faculty parking"
        ],
        answer: 1,
        explanation:
          "The man says signs were posted outside the garage, and the woman admits she probably was not paying attention."
      },
      {
        id: "lc-5",
        materialId: "conversation-03",
        instruction: "Listen to the conversation, then choose the best answer.",
        prompt: "What is the woman looking for?",
        choices: [
          "A new recipe book",
          "A set of kitchen knives",
          "A gift for a friend",
          "A cooking class"
        ],
        answer: 2,
        explanation:
          "The woman says she needs to buy a birthday present for a friend who loves cooking."
      },
      {
        id: "lc-6",
        materialId: "conversation-03",
        instruction: "Listen to the conversation, then choose the best answer.",
        prompt: "What does the man recommend?",
        choices: [
          "Trying a new restaurant",
          "Attending her friend’s birthday party",
          "Visiting the kitchenware store",
          "Buying an unusual kind of knife"
        ],
        answer: 2,
        explanation:
          "He recommends visiting the downtown kitchenware store and asking its staff for advice."
      }
    ]
  },
  {
    id: "listening-talks",
    number: "L3",
    section: "listening",
    type: "listening-talk",
    eyebrow: "Listening · Talks",
    title: "Announcements and academic talks",
    shortTitle: "Announcements and talks",
    description: "Answer questions about announcements and academic talks.",
    accent: "teal",
    estimatedMinutes: 12,
    audioPattern: "One announcement or talk → several multiple-choice questions",
    materials: [
      {
        id: "talk-01",
        title: "Environmental science assignment",
        context: "Questions 19 and 20 refer to this classroom announcement.",
        audioSrc: "assets/audio/set-1/listening-talk-01.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "talk-02",
        title: "School art exhibit",
        context: "Questions 21 and 22 refer to this exhibit announcement.",
        audioSrc: "assets/audio/set-1/listening-talk-02.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "talk-03",
        title: "Library closure",
        context: "Questions 23 and 24 refer to this campus announcement.",
        audioSrc: "assets/audio/set-1/listening-talk-03.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "talk-04",
        title: "Forces acting on a bicycle",
        context: "Questions 25 through 28 refer to this physics talk.",
        audioSrc: "assets/audio/set-1/listening-talk-04.mp3",
        audioType: "audio/mpeg"
      },
      {
        id: "talk-05",
        title: "Industrial cities",
        context: "Questions 29 through 32 refer to this history talk.",
        audioSrc: "assets/audio/set-1/listening-talk-05.mp3",
        audioType: "audio/mpeg"
      }
    ],
    questions: [
      {
        id: "lt-1",
        materialId: "talk-01",
        instruction: "Listen to the announcement, then choose the best answer.",
        prompt: "What is the main purpose of the announcement?",
        choices: [
          "To remind students of a deadline",
          "To point out the requirements for an assignment",
          "To invite students to office hours",
          "To discuss environmental science topics"
        ],
        answer: 1,
        explanation:
          "The speaker explains the topic, length, source, and formatting requirements for an upcoming report."
      },
      {
        id: "lt-2",
        materialId: "talk-01",
        instruction: "Listen to the announcement, then choose the best answer.",
        prompt: "Why does the speaker mention a research symposium?",
        choices: [
          "To recommend a topic for a report",
          "To explain the need for formatting guidelines",
          "To emphasize the need for scholarly sources",
          "To provide the reason for a schedule change"
        ],
        answer: 3,
        explanation:
          "The symposium is the reason the speaker moves one Thursday office-hours session to Wednesday."
      },
      {
        id: "lt-3",
        materialId: "talk-02",
        instruction: "Listen to the announcement, then choose the best answer.",
        prompt: "What is the purpose of the announcement?",
        choices: [
          "To ask for volunteers",
          "To give information about a museum’s history",
          "To explain the plan for a tour",
          "To request donations"
        ],
        answer: 2,
        explanation:
          "The speaker describes the sequence of galleries the group will visit during the tour."
      },
      {
        id: "lt-4",
        materialId: "talk-02",
        instruction: "Listen to the announcement, then choose the best answer.",
        prompt: "What will the speaker probably do next?",
        choices: [
          "Take students to the next floor",
          "Discuss an artist",
          "Collect feedback from visitors",
          "Hand out some printed information"
        ],
        answer: 3,
        explanation:
          "The speaker says that first, before beginning the tour, a detailed map will be distributed."
      },
      {
        id: "lt-5",
        materialId: "talk-03",
        instruction: "Listen to the announcement, then choose the best answer.",
        prompt: "Why is the library being closed?",
        choices: [
          "Because routine maintenance work needs to be performed",
          "Because too few students have been using it",
          "Because there is damage to the building",
          "Because the computer system is being upgraded"
        ],
        answer: 2,
        explanation:
          "Heavy rain caused a major roof leak that must be repaired to prevent damage to library resources."
      },
      {
        id: "lt-6",
        materialId: "talk-03",
        instruction: "Listen to the announcement, then choose the best answer.",
        prompt: "Why does the speaker mention the student center?",
        choices: [
          "Because it is open 24 hours a day",
          "Because it will house library resources temporarily",
          "Because it is located in the same building as the library",
          "Because it is an alternative place for students to study"
        ],
        answer: 3,
        explanation:
          "The speaker identifies the student center as available study space while the library is closed."
      },
      {
        id: "lt-7",
        materialId: "talk-04",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "What is the purpose of the talk?",
        choices: [
          "To show how easy it is to conduct a physics experiment",
          "To describe the discovery of a law of physics",
          "To explain two physical forces acting on a moving bicycle",
          "To offer reasons why many physicists like bicycle riding"
        ],
        answer: 2,
        explanation:
          "The speaker uses bicycle turning to explain how inertia and gravity interact."
      },
      {
        id: "lt-8",
        materialId: "talk-04",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "What does the speaker suggest about turning?",
        choices: [
          "It is more complicated than it seems.",
          "It is the hardest skill to learn.",
          "It is easier to turn right than left.",
          "It is important to go slowly."
        ],
        answer: 0,
        explanation:
          "The speaker contrasts the apparently simple act of turning the wheel with the need to balance inertia, gravity, and body position."
      },
      {
        id: "lt-9",
        materialId: "talk-04",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "What does leaning in help a cyclist to do?",
        choices: [
          "Go faster",
          "Avoid falling down",
          "See more clearly around corners",
          "Prevent uneven wear on the wheels"
        ],
        answer: 1,
        explanation:
          "Leaning in helps the rider balance the forces involved in a turn, which helps prevent falling."
      },
      {
        id: "lt-10",
        materialId: "talk-04",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "What do professional cyclists try to do when turning?",
        choices: [
          "Slide out significantly on some turns in the road",
          "Keep their bikes relatively upright at high speeds",
          "Shift their weight just enough to work against inertia",
          "Change the direction of only their front wheel"
        ],
        answer: 2,
        explanation:
          "The talk explains that skilled riders shift their weight to counter inertia while turning."
      },
      {
        id: "lt-11",
        materialId: "talk-05",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "What is the main topic of the talk?",
        choices: [
          "Factors contributing to the Industrial Revolution in Europe",
          "How the historic layouts of medieval cities were preserved",
          "How the Industrial Revolution affected European cities",
          "The emergence of the factory system in Europe"
        ],
        answer: 2,
        explanation:
          "The talk focuses on city changes caused by industrialization, including walls, workplaces, and street layouts."
      },
      {
        id: "lt-12",
        materialId: "talk-05",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "According to the talk, why were city walls removed?",
        choices: [
          "Newer walls were built farther from the centers as cities grew larger.",
          "Cities were no longer directly threatened by their enemies.",
          "Laws required greater freedom of movement between neighboring cities.",
          "Cities used the walls' bricks to build factories."
        ],
        answer: 1,
        explanation:
          "The talk connects the removal of old walls with changing defensive needs as cities expanded."
      },
      {
        id: "lt-13",
        materialId: "talk-05",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt: "What point does the speaker make about industrial workplaces?",
        choices: [
          "They did not change much from medieval times.",
          "Entire districts were devoted to factories and housing for workers.",
          "They often did not provide good conditions for workers.",
          "Cathedrals were often repurposed as commercial workplaces."
        ],
        answer: 2,
        explanation:
          "The speaker points out that early industrial workplaces were often crowded or unhealthy for workers."
      },
      {
        id: "lt-14",
        materialId: "talk-05",
        instruction: "Listen to the talk, then choose the best answer.",
        prompt:
          "According to the speaker, what was one consequence of street layout changes in industrial cities?",
        choices: [
          "Property became easier to buy and sell.",
          "Modern forms of transportation became available.",
          "New spaces were created for expanding central markets.",
          "New laws were passed that separated residential and industrial areas."
        ],
        answer: 1,
        explanation:
          "The street changes supported modern transportation needs in growing industrial cities."
      }
    ]
  }
];
