import { BottomNav } from "@/components/BottomNav";

export default function AboutPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <div className="relative z-10 mx-auto flex max-w-md flex-col gap-12 px-6 py-20">
        {/* Title */}
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Reset</h1>
          <p className="mt-2 text-sm text-black/40">Clean content. That's it.</p>
        </div>

        {/* The manifesto */}
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            You won't find boobs here.<br />
            No thirst traps. No rage bait. No algorithm
            designed to make you feel like garbage.
          </p>

          <p>
            This app is for the ones who are sick and tired.<br />
            Tired of opening an app and losing 40 minutes
            to content that leaves them emptier than before.
          </p>

          <p>
            Reset is fuel for the soul.<br />
            Clean motivation. Ancient wisdom. Words that
            actually mean something. Videos that lift you up
            instead of dragging you down.
          </p>

          <p>
            No likes. No comments. No followers.<br />
            No one performing. No one selling you anything.
            Just content that makes you stronger.
          </p>

          <p className="font-medium">
            If your mind matters to you — you're in the right place.
          </p>
        </div>

        {/* Values */}
        <div className="flex flex-col gap-3 border-t border-black/10 pt-8">
          <div className="flex items-center gap-3">
            <span className="text-black/30">01</span>
            <span>No negativity. Ever.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-black/30">02</span>
            <span>No distractions. No noise.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-black/30">03</span>
            <span>Only content that builds you up.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-black/30">04</span>
            <span>Your time is sacred. We respect it.</span>
          </div>
        </div>

      </div>

      {/* Mountain image at bottom with smooth white fade on top */}
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-white to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80"
          alt="Sunlit mountain peaks"
          className="block h-[70vh] w-full object-cover object-center"
        />
      </div>

      <BottomNav />
    </div>
  );
}
