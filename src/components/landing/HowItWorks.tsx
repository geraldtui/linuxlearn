export function HowItWorks() {
  const steps = [
    {
      title: 'Read the instruction',
      body: 'Each step explains a concept and tells you what to try in the terminal.',
    },
    {
      title: 'Type the command',
      body: 'Use the simulated shell like the real thing—same prompts, same feedback.',
    },
    {
      title: 'Get instant feedback',
      body: 'See output and errors immediately so you learn what works and what does not.',
    },
    {
      title: 'Move forward',
      body: 'When your command matches the lesson, advance to the next step and build mastery.',
    },
  ];

  return (
    <section
      className="mt-20 max-w-3xl mx-auto text-left"
      aria-labelledby="landing-how-heading"
    >
      <h2
        id="landing-how-heading"
        className="text-2xl font-bold text-terminal-text mb-8 text-center"
      >
        How it works
      </h2>
      <ol className="space-y-6">
        {steps.map((item, index) => (
          <li key={item.title} className="flex gap-4">
            <span
              className="flex-shrink-0 w-10 h-10 rounded-full bg-terminal-prompt/20 border border-terminal-prompt text-terminal-prompt font-semibold flex items-center justify-center"
              aria-hidden
            >
              {index + 1}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-terminal-text mb-1">
                {item.title}
              </h3>
              <p className="text-terminal-muted text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
