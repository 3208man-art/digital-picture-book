import Link from "next/link";

const works = [
  {
    href: "/tonton",
    title: "トントントン！だれの おうちかな？",
    subtitle: "もりのおともだち",
    description: "ドアを トントンして、もりの おともだちを さがそう！",
    badge: "しんさく",
    accent: "from-rose-400 to-orange-300"
  },
  {
    href: "/hoshi",
    title: "ほしの たび",
    subtitle: "デジタル絵本",
    description: "おほしさまの たびが はじまるよ。ページを めくってみよう！",
    badge: "絵本",
    accent: "from-sky-400 to-amber-200"
  }
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12">
      <header className="text-center">
        <p
          className="text-4xl text-white drop-shadow sm:text-5xl"
          style={{ fontFamily: '"Yomogi", cursive' }}
        >
          AIデジタル絵本ラボ
        </p>
        <h1 className="mt-3 text-xl font-bold text-stone-700 sm:text-2xl">
          タップで動く！遊んで学べるデジタル絵本＆ミニゲーム
        </h1>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        {works.map((work) => (
          <Link
            key={work.href}
            href={work.href}
            className="group overflow-hidden rounded-3xl border-4 border-white/80 bg-[#fffaf0] shadow-xl transition hover:-translate-y-1"
          >
            <div className={`h-28 bg-gradient-to-br ${work.accent} sm:h-36`} />
            <div className="space-y-2 p-5 sm:p-6">
              <p className="text-sm font-extrabold tracking-wide text-orange-600">
                {work.badge}
              </p>
              <h2
                className="text-2xl leading-snug text-stone-800 sm:text-3xl"
                style={{ fontFamily: '"Yomogi", cursive' }}
              >
                {work.title}
              </h2>
              <p className="text-base font-bold text-stone-500">{work.subtitle}</p>
              <p className="text-lg leading-relaxed text-stone-600 sm:text-xl">
                {work.description}
              </p>
              <span className="inline-flex rounded-2xl bg-[#6aa35a] px-4 py-2 text-lg font-extrabold text-white shadow-[0_3px_0_#4e7f42] group-hover:translate-y-[-1px]">
                あそぶ
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
