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
          "Complete each word by typing the missing letters. Use the whole paragraph for context.",
        segments: [
          "Many city parks provide more than a place to relax. They also create important ",
          { blank: "habitats", visible: "hab", answer: "itats" },
          " for birds, insects, and small animals. Trees help ",
          { blank: "reduce", visible: "red", answer: "uce" },
          " air pollution, while areas of grass absorb rainwater and lower the risk of flooding. For these reasons, urban planners increasingly ",
          { blank: "recognize", visible: "recog", answer: "nize" },
          " parks as essential parts of a healthy city."
        ]
      },
      {
        id: "cw-2",
        instruction:
          "Complete each word by typing the missing letters. Spelling counts.",
        segments: [
          "Honeybees communicate the location of food through movement. A worker bee performs a special ",
          { blank: "dance", visible: "dan", answer: "ce" },
          " inside the hive. Its direction tells other bees where to fly, and its speed can ",
          { blank: "indicate", visible: "indi", answer: "cate" },
          " the distance. This remarkable system allows the colony to gather food ",
          { blank: "efficiently", visible: "effici", answer: "ently" },
          "."
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
    estimatedMinutes: 5,
    questions: [
      {
        id: "dl-1",
        instruction: "Read the notice, then choose the best answer.",
        visual: {
          kind: "notice",
          kicker: "RIVERSIDE COMMUNITY LIBRARY",
          title: "Weekend Book Sale",
          date: "SATURDAY, MAY 18",
          time: "10:00 AM — 3:00 PM",
          body:
            "Used books, magazines, and children’s stories from $1. Bring your own bag and receive one free book with any purchase.",
          note: "All proceeds support free summer reading programs.",
          tag: "RAIN OR SHINE"
        },
        prompt: "What can visitors do to receive a free book?",
        choices: [
          "Donate to the summer reading program",
          "Arrive before 10:00 in the morning",
          "Bring a bag and make a purchase",
          "Buy a children’s story"
        ],
        answer: 2,
        explanation:
          "The notice says visitors who bring their own bag receive one free book with any purchase."
      },
      {
        id: "dl-2",
        instruction: "Read the message, then choose the best answer.",
        visual: {
          kind: "message",
          sender: "Maya",
          time: "2:14 PM",
          body:
            "Hi Leo — the 3:30 workshop moved from Room 204 to the media lab on the first floor. I left your notebook with the front desk because I have to leave early. Don’t forget we need to email our slides to Dr. Chen by 6!"
        },
        prompt: "Why did Maya leave Leo’s notebook at the front desk?",
        choices: [
          "The workshop changed rooms",
          "She could not stay until the workshop ended",
          "Dr. Chen needed to see it",
          "The media lab did not allow notebooks"
        ],
        answer: 1,
        explanation:
          "Maya says she left the notebook at the desk because she had to leave early."
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
    estimatedMinutes: 7,
    passageTitle: "How Young Plants Find Light",
    passage: [
      "Plants may appear stationary, but they continuously adjust their growth in response to the environment. One of the most visible examples is phototropism—the tendency of a plant’s stem to grow toward a source of light. This response is especially important for young plants growing beneath taller vegetation, where access to sunlight may determine whether they survive.",
      "The mechanism depends on a plant hormone called auxin. When light reaches a young stem mainly from one direction, auxin becomes more concentrated on the shaded side. In stems, the hormone causes cells to lengthen. Cells on the shaded side therefore grow slightly longer than those on the illuminated side, and this unequal growth bends the stem toward the light.",
      "Early experiments helped scientists identify this process. Charles Darwin and his son Francis observed that grass seedlings failed to bend toward light when their tips were covered. Covering the lower portion had no such effect. They concluded that the tip detects light and sends some kind of signal to the growing region below. Later research identified auxin as a major part of that signal.",
      "Phototropism does not simply move a plant closer to light. By changing the position and angle of its leaves, it can increase the surface area exposed to sunlight. This improves photosynthesis, the process through which plants use light energy to produce sugars. A small change in direction can therefore have a substantial effect on a plant’s growth over time."
    ],
    questions: [
      {
        id: "ar-1",
        instruction: "Choose the best answer according to the passage.",
        prompt: "What is the main purpose of the passage?",
        choices: [
          "To compare the growth rates of different plants",
          "To explain how and why plants grow toward light",
          "To argue that plants need more direct sunlight",
          "To describe several experiments performed by Darwin"
        ],
        answer: 1,
        explanation:
          "The passage explains the mechanism of phototropism and why growing toward light benefits a plant."
      },
      {
        id: "ar-2",
        instruction: "Choose the best answer according to the passage.",
        prompt: "According to paragraph 2, why does a stem bend toward light?",
        choices: [
          "Cells on its shaded side grow longer",
          "Auxin destroys cells exposed to light",
          "Its illuminated side becomes heavier",
          "The source of light attracts the plant’s tip"
        ],
        answer: 0,
        explanation:
          "Auxin collects on the shaded side and causes those cells to lengthen, creating unequal growth that bends the stem."
      },
      {
        id: "ar-3",
        instruction: "Choose the best answer according to the passage.",
        prompt:
          "Why does the author mention Darwin’s experiments with covered seedling tips?",
        choices: [
          "To show how the light-detecting part of a plant was located",
          "To suggest that modern research has disproved early observations",
          "To explain why grass seedlings grow faster than other plants",
          "To demonstrate that auxin is produced in a plant’s lower stem"
        ],
        answer: 0,
        explanation:
          "The experiments showed that covering the tip prevented bending, indicating that the tip detects light."
      }
    ]
  }
];
