export function Features() {
  const items = [
    {
      icon: '🎯',
      title: 'Interactive Learning',
      body: 'Type real commands and see instant feedback. Learn by doing, not just reading.',
    },
    {
      icon: '💾',
      title: 'Track Your Progress',
      body: 'Your progress is saved automatically. Pick up right where you left off.',
    },
    {
      icon: '🚀',
      title: 'No Setup Required',
      body: 'Everything runs in your browser. No installation, no configuration needed.',
    },
  ];

  return (
    <section
      className="mt-16"
      aria-labelledby="landing-features-heading"
    >
      <h2 id="landing-features-heading" className="sr-only">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-terminal-surface rounded-lg p-6 border border-terminal-surface"
          >
            <div className="text-3xl mb-3" aria-hidden>
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-terminal-muted text-sm">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
