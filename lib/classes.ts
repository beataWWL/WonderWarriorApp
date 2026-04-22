export type Block =
  | { type: "p"; html: string }
  | { type: "italic-note"; html: string }
  | { type: "core-intention"; html: string }
  | { type: "featured-quote"; html: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "steps"; steps: string[] }
  | { type: "tags"; tags: string[] }
  | { type: "notice-list"; items: string[] }
  | { type: "is-not-grid"; isNot: string[]; is: string[] }
  | { type: "agreements"; items: string[] };

export type Section =
  | { kind: "card"; title: string; icon?: string; blocks: Block[] }
  | { kind: "discussion"; title: string; questions: string[] }
  | { kind: "takeaway"; title: string; body: string }
  | {
      kind: "reflection";
      prompt: string;
      placeholders: string[];
    }
  | { kind: "course-review" };

export type ClassData = {
  slug: string;
  num: number;
  label: string;
  title: string;
  subtitle: string;
  sections: Section[];
};

export const classes: ClassData[] = [
  {
    slug: "warm-stillness",
    num: 1,
    label: "Class 1 · Practice 1",
    title: "Warm Stillness",
    subtitle: "Building the heart to stay",
    sections: [
      {
        kind: "card",
        title: "Opening Quote",
        icon: "✦",
        blocks: [
          {
            type: "quote",
            text: "Your mind has a flood of questions. There is but one teacher who can answer them. Who is this teacher? Your silence-loving heart.",
            cite: "Sri Chinmoy",
          },
        ],
      },
      {
        kind: "takeaway",
        title: "Season Take-away #1",
        body: "You bring Wonder by <strong>loving the world as it is</strong> — by <strong>letting it be</strong>.",
      },
      {
        kind: "card",
        title: "What is Wonder?",
        icon: "✦",
        blocks: [
          {
            type: "p",
            html: "Wonder is not defined by or dependent on any particular feeling. It is not reliant on joy, positivity, awe, or specialness — neither created nor found. Wonder is <em>endemic in the mundane, the everyday, the simple.</em>",
          },
          {
            type: "p",
            html: "Wonder connects us to the great mystery — the profound, the unknowable that is always here. Nothing is hidden.",
          },
          {
            type: "tags",
            tags: [
              "Let go of outcomes",
              "Hold no idea of gain or change",
              "Loving the world as-is",
            ],
          },
        ],
      },
      {
        kind: "discussion",
        title: "💬 Share Your Wonder",
        questions: [
          "Your name and something that gives you a sense of Wonder?",
          "Did you know that the moons of Jupiter can be seen with binoculars — and that it rains diamonds on Jupiter?",
        ],
      },
      {
        kind: "card",
        title: "Practice 1 — Warm Stillness",
        icon: "🌙",
        blocks: [
          {
            type: "core-intention",
            html: "Be still and awake with a feeling of care toward yourself.",
          },
          {
            type: "steps",
            steps: [
              "Commit to practice Warm Stillness for <strong>five minutes a day</strong> to start — increase as you are comfortable and wish to do so.",
              "Sit, stand, or lie down in a comfortable position (Aligned · Stable · Awake) so that you can be still and stay alert for the allotted time.",
              "Feel your body and yourself in your body — feel your hands, feet, face, breath, any sensations.",
              "Feel into this posture of <em>nothing to seek, nowhere to go, nothing to fix or do.</em>",
              'When you find your attention elsewhere, bring it back to your body. You can note "positive," "negative," or "neutral" emotions.',
              "When time is up, note how you feel as you slowly move into your next activity.",
            ],
          },
          {
            type: "italic-note",
            html: "Goal: work up to 30 minutes, five days a week.",
          },
        ],
      },
      {
        kind: "reflection",
        prompt:
          "Use this space to note your experience with Warm Stillness between sessions.",
        placeholders: [
          "What did you notice during Warm Stillness practice?",
          "What obstacles came up? What supported you?",
        ],
      },
    ],
  },
  {
    slug: "generative-commitment",
    num: 2,
    label: "Class 2 · Practice 2",
    title: "Generative Commitment",
    subtitle: "Stabilizing the vessel",
    sections: [
      {
        kind: "card",
        title: "Opening Insight",
        icon: "✦",
        blocks: [
          {
            type: "quote",
            text: "Your brain's most important job is not rationality, not emotion, not imagination or creativity or empathy. Your brain's most important job is to manage your body's energy by predicting energy needs before they arise.",
            cite: "Lisa Feldman Barrett",
          },
          {
            type: "p",
            html: "Being awake to our habitual patterns is a motivator to be in charge of ourselves — to express what we hold as noble and dear in our brief and precious human lives.",
          },
        ],
      },
      {
        kind: "discussion",
        title: "💬 Sharing Your Wonder",
        questions: [
          "What Wonder did you encounter this week?",
          "What did you experience in doing Warm Stillness?",
          "What did you learn that might encourage others?",
        ],
      },
      {
        kind: "discussion",
        title: "🔍 Deeper Inquiry — Mining for Wonder Gold",
        questions: [
          "What obstacles or barriers did you encounter?",
          "What did Warm Stillness open up, if anything?",
        ],
      },
      {
        kind: "card",
        title: "Practice 2 — Generative Commitment",
        icon: "🌙",
        blocks: [
          {
            type: "p",
            html: "Commitment requires eyes open — being undeceived so you naturally abide in what you hold most precious. We are conditioned beings with habits of mind and body, ruts and patterns that comfort us in their familiarity.",
          },
          {
            type: "steps",
            steps: [
              "Notice what comes up when you practice Warm Stillness this week — especially thoughts or feelings that want to <em>delay or block</em> your practice.",
              "Each day, write down anything you notice that wants to derail you.",
              "Before class next week, review your notes and write down what patterns you observe in what comes up for you.",
            ],
          },
        ],
      },
      {
        kind: "card",
        title: "Working Agreements",
        icon: "🤝",
        blocks: [
          {
            type: "agreements",
            items: [
              "We honor the efforts, experience, ideas, and sharing of all by listening more than we speak (2 ears, 1 mouth) and by being kind.",
              "There are no dumb questions and no wrong answers.",
              "Keep an attitude of mutual support at all times.",
              "Suspend judgment, disagreement, and personal preference for the duration of our time together.",
            ],
          },
        ],
      },
      {
        kind: "reflection",
        prompt: "What habitual patterns show up when you sit down to practice?",
        placeholders: [
          "What tries to derail my practice…",
          "What I hold as most precious in my life…",
        ],
      },
    ],
  },
  {
    slug: "wide-field",
    num: 3,
    label: "Class 3 · Practice 3",
    title: "Cultivating a Wide Field",
    subtitle: "Including this, too",
    sections: [
      {
        kind: "card",
        title: "Opening Quote",
        icon: "✦",
        blocks: [
          {
            type: "quote",
            text: "Even though you try to put people under control, it is impossible. You cannot do it. The best way to control people is to encourage them to be mischievous. Then they will be in control in a wider sense. To give your sheep or cow a large, spacious meadow is the way to control them. So it is with people.",
            cite: "Shunryu Suzuki-roshi",
          },
        ],
      },
      {
        kind: "discussion",
        title: "💬 Sharing Your Wonder",
        questions: [
          "What Wonder did you encounter?",
          "What makes commitment <em>generative</em>?",
          "What did you learn that might encourage others?",
        ],
      },
      {
        kind: "discussion",
        title: "🔍 Deeper Inquiry",
        questions: [
          "What obstacles or barriers did you encounter?",
          "What did Generative Commitment bring up, if anything?",
        ],
      },
      {
        kind: "card",
        title: "Practice 3 — Cultivating a Wide Field",
        icon: "🌙",
        blocks: [
          {
            type: "quote",
            text: "…to see things as they are and to let everything go as it goes. This is to put everything under control in its widest sense.",
            cite: "Suzuki-roshi",
          },
          {
            type: "core-intention",
            html: 'Be as you are, creating space for all of you as-is. Same with "others."',
          },
          {
            type: "steps",
            steps: [
              "Notice moments when you <strong>reject</strong> — turn away from or push away — parts of your experience.",
              "Instead, <strong>invite them in</strong> specifically. In the moment, enlarge their presence by increasing your contact (smell, taste, touch, hearing, seeing, intuiting).",
              "Turn toward the experience or your reaction with <em>curiosity and care.</em> Get closer — move in with your mind and/or body.",
              "Let yourself create a field wide enough for all parts of you to come out and play.",
              "If you wish, make a few brief notes about your experience to share in class.",
            ],
          },
        ],
      },
      {
        kind: "reflection",
        prompt:
          "What did you notice when you invited in experiences rather than pushing them away?",
        placeholders: [
          "Moments I noticed myself rejecting an experience…",
          "What happened when I turned toward it with curiosity…",
        ],
      },
    ],
  },
  {
    slug: "living-in-question",
    num: 4,
    label: "Class 4 · Practice 4",
    title: "Living in Question",
    subtitle: "Breaking through blocks and habits of mind",
    sections: [
      {
        kind: "card",
        title: "Core Insight",
        icon: "✦",
        blocks: [
          { type: "featured-quote", html: '"Not Knowing is the key!"' },
          {
            type: "p",
            html: "Just starting to think about what your question might be will help you penetrate to your real, most vital concern.",
          },
        ],
      },
      {
        kind: "discussion",
        title: "💬 Sharing Your Wonder",
        questions: [
          "What Wonder did you encounter?",
          "What did you experience when engaging the Wide Field?",
          "What did you learn that might encourage others?",
        ],
      },
      {
        kind: "discussion",
        title: "🔍 Deeper Inquiry",
        questions: [
          "What obstacles or barriers did you encounter?",
          "What was different when you were a Wide Field?",
        ],
      },
      {
        kind: "card",
        title: "Practice 4 — Living in Question",
        icon: "🌙",
        blocks: [
          {
            type: "p",
            html: 'Practice formulating a concise question that reflects the primary issue in your life right now. You might start with something very general — like <em>"What is my suffering?"</em> Then your practice of putting this question before yourself will gradually sculpt it into something very personal and specific.',
          },
          {
            type: "steps",
            steps: [
              "Formulate a <strong>concise question</strong> that reflects the primary issue in your life right now. If you can't get a handle on the main issue right away, that's fine — just begin.",
              "Repeat your question when you: <strong>wake up in the morning · brush your teeth · begin each meal · rise to walk · fall asleep · whenever it comes to mind.</strong>",
              "Notice what comes up for you. Make a few notes if you wish.",
            ],
          },
        ],
      },
      {
        kind: "reflection",
        prompt: "What is your question? What has living with it revealed?",
        placeholders: [
          "My question for this week is…",
          "What came up when I asked myself this question…",
        ],
      },
    ],
  },
  {
    slug: "purposelessness",
    num: 5,
    label: "Class 5 · Practice 5",
    title: "Intentional Purposelessness",
    subtitle: "The wisdom of nowhere to go, nothing to fix",
    sections: [
      {
        kind: "card",
        title: "Opening Quote",
        icon: "✦",
        blocks: [
          {
            type: "quote",
            text: "The going river and the evanescence of life — ingraspable things — is itself medicine. Sometimes it looks like poison, but actually those are only medicine.",
            cite: "Zen Master Shunryu Suzuki, 1968",
          },
          {
            type: "quote",
            text: "Let go of hundreds of years and relax completely. Open your hands and walk, innocent.",
            cite: '"Stone Head" Shitou, Song of the Grass Roof Hermitage',
          },
        ],
      },
      {
        kind: "discussion",
        title: "💬 Sharing Your Wonder",
        questions: [
          "What Wonder did you encounter?",
          "What did you experience Living in the Question?",
          "What did you learn that might encourage others?",
        ],
      },
      {
        kind: "discussion",
        title: "🔍 Deeper Inquiry",
        questions: [
          "What obstacles or barriers did you encounter?",
          "What changed when you were Living in Question?",
        ],
      },
      {
        kind: "card",
        title: "What Intentional Purposelessness Is and Isn't",
        icon: "⚖️",
        blocks: [
          {
            type: "is-not-grid",
            isNot: ["unintentional", "unconscious", "aimless", "indeliberate"],
            is: [
              "Purposeful Purposelessness",
              "Activity for its own sake",
              "No gaining idea",
              "Wide awake",
            ],
          },
        ],
      },
      {
        kind: "card",
        title: "Practice 5 — Intentional Purposelessness",
        icon: "🌙",
        blocks: [
          {
            type: "core-intention",
            html: "Activity for its own sake with no gaining idea.",
          },
          {
            type: "steps",
            steps: [
              'For at least <strong>10 full minutes each day</strong>, pick up an activity and do it for no reason at all. Take a walk with no destination in mind. Sit in a warm bath with no goal of washing or cleaning. Wash your dishes with a focus on the activity of your hands instead of the goal of finishing.',
              'Notice your body right now as you "do" — what are you sensing? Allow it. Just now, take in what you sense completely, with your whole body-mind.',
              "Let yourself connect with the activity itself, your body doing. <em>Nothing to explain or understand. No words needed. Just this.</em>",
            ],
          },
        ],
      },
      {
        kind: "reflection",
        prompt:
          "What activity did you choose? What did you notice when you dropped the goal?",
        placeholders: [
          "The activity I chose…",
          "What I noticed when I let go of the purpose…",
        ],
      },
    ],
  },
  {
    slug: "deep-noticing",
    num: 6,
    label: "Class 6 · Practice 6",
    title: "Connection — Deep Noticing",
    subtitle: "Antidote to suffering",
    sections: [
      {
        kind: "card",
        title: "Opening Invitation",
        icon: "✦",
        blocks: [
          {
            type: "quote",
            text: "Do not ask your children to strive for extraordinary lives. Such striving may seem admirable, but it is the way of foolishness. Help them instead to find the wonder and the marvel of an ordinary life. Show them the joy of tasting tomatoes, apples and pears. Show them how to cry when pets and people die. Show them the infinite pleasure in the touch of a hand. And make the ordinary come alive for them. The extraordinary will take care of itself.",
            cite: "William Martin",
          },
        ],
      },
      {
        kind: "discussion",
        title: "💬 Sharing Your Wonder",
        questions: [
          "What Wonder did you encounter?",
          "What did you experience with Intentional Purposelessness?",
          "What did you learn that might encourage others?",
        ],
      },
      {
        kind: "discussion",
        title: "🔍 Deeper Inquiry",
        questions: [
          "What obstacles or barriers did you encounter?",
          "What did you notice about Intentional Purposelessness?",
        ],
      },
      {
        kind: "card",
        title: "Practice 6 — Connection: Deep Noticing",
        icon: "🌙",
        blocks: [
          {
            type: "core-intention",
            html: "Keep in touch with the ways in which you are included in everything — connected, not separate. This is a wider meaning of connection than our usual view.",
          },
          {
            type: "p",
            html: "Begin with the common, everyday, ubiquitous objects around you that support your life:",
          },
          {
            type: "notice-list",
            items: [
              "Spoon",
              "Microwave",
              "Cup",
              "Chair",
              "Toothpick",
              "Toilet",
            ],
          },
          {
            type: "steps",
            steps: [
              "Notice their <strong>usefulness</strong>. Note whether they ease your suffering in some way.",
              "Experience their help in <strong>nourishing body and mind</strong>. Take in how they make things more convenient for you.",
              "See if/how their <strong>beauty or form feeds you</strong>. Can you practice respect and appreciation for the comfort and relationship they offer you?",
              "Can you get still enough to <strong>receive their support</strong>? Can you pace your life so you feel able to include and be included by everything?",
              "Feel the connection between you and who/what relies on you for care — plant, pet, person. If you wish, make a few notes to share.",
            ],
          },
        ],
      },
      {
        kind: "reflection",
        prompt:
          "What did you notice when you turned your attention toward the ordinary things in your life?",
        placeholders: [
          "An object I noticed with new appreciation…",
          "How it felt to receive support from the ordinary…",
        ],
      },
    ],
  },
  {
    slug: "body-of-now",
    num: 7,
    label: "Class 7 · Practice 7 · Final Session",
    title: "Immediacy — the Body of Now",
    subtitle: "Intimacy in everyday life",
    sections: [
      {
        kind: "card",
        title: "Opening Quote",
        icon: "✦",
        blocks: [
          {
            type: "quote",
            text: "Through one word, or seven words, or three times five — even if you investigate thoroughly myriad forms, nothing can be depended upon. Night advances, the moon glows and falls into the ocean. The black dragon jewel you have been searching for is everywhere.",
            cite: "Zen Master Dogen Zenji",
          },
        ],
      },
      {
        kind: "discussion",
        title: "💬 Sharing Your Wonder",
        questions: [
          "What Wonder did you encounter?",
          "What did you experience when noticing Connection — Deep Noticing?",
          "What did you learn that might encourage others?",
        ],
      },
      {
        kind: "discussion",
        title: "🔍 Deeper Inquiry",
        questions: [
          "What obstacles or barriers did you encounter?",
          "What did you experience when noticing Connection?",
        ],
      },
      {
        kind: "card",
        title: "Practice 7 — Immediacy: the Body of Now",
        icon: "🌙",
        blocks: [
          {
            type: "core-intention",
            html: "Intimacy with this moment — exactly as it is. Even potholes are a bottomless source of wonder.",
          },
          {
            type: "italic-note",
            html: "The practice of Immediacy invites you into direct, unmediated contact with this moment — through your body, your senses, and the simple fact of being alive right now. Nothing is excluded. Everything belongs.",
          },
          {
            type: "steps",
            steps: [
              "In any moment, drop into direct sensory contact with what is happening in your body <strong>right now</strong>. Not a thought about it — the raw experience itself.",
              'Let irritations, inconveniences, or "problems" become entry points to presence. The pothole, the traffic, the difficult colleague — each one is an invitation.',
              "Practice with the full texture of the moment — warmth, coolness, weight, breath, sound. Not analyzing — just meeting.",
            ],
          },
        ],
      },
      { kind: "course-review" },
      {
        kind: "discussion",
        title: "📝 Final Feedback",
        questions: [
          "What worked in this workshop?",
          "What would you change?",
          "Anything else you'd like to explore?",
        ],
      },
      {
        kind: "reflection",
        prompt:
          "In just a few words — what Wonder did you encounter on this journey?",
        placeholders: [
          "The practice that has changed me most is…",
          "The Wonder I carry forward is…",
        ],
      },
      {
        kind: "takeaway",
        title: "The black dragon jewel you have been searching for…",
        body: "is everywhere.",
      },
    ],
  },
];

export function getClassBySlug(slug: string): ClassData | undefined {
  return classes.find((c) => c.slug === slug);
}

export function getAdjacentClasses(slug: string): {
  prev: ClassData | undefined;
  next: ClassData | undefined;
} {
  const i = classes.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? classes[i - 1] : undefined,
    next: i < classes.length - 1 ? classes[i + 1] : undefined,
  };
}
