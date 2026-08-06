"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

type Step = "far" | "near" | "reveal";

type Episode = {
  id: string;
  doorColorLabel: string;
  doorSrc: string;
  characterSrc: string;
  characterName: string;
  farText: string;
  nearPrompt: string;
  revealText: string;
  tapsToZoom: number;
  tapsToOpen: number;
};

const ASSET = "/images/tonton";

const EPISODES: Episode[] = [
  {
    id: "red",
    doorColorLabel: "あかい",
    doorSrc: `${ASSET}/door-red.png`,
    characterSrc: `${ASSET}/red-squirrel.png`,
    characterName: "リスさん",
    farText: "トントントン！ あかい ドア。だれの おうちかな？",
    nearPrompt: "ドアを 2かい トントン タップしてね！",
    revealText: "どんぐり だいすき リスさんでした！",
    tapsToZoom: 1,
    tapsToOpen: 2
  },
  {
    id: "yellow",
    doorColorLabel: "きいろい",
    doorSrc: `${ASSET}/door-yellow.png`,
    characterSrc: `${ASSET}/yellow-fox.png`,
    characterName: "キツネさん",
    farText: "トントントン！ きいろい ドア。だれの おうちかな？",
    nearPrompt: "ドアを 3かい トントン タップしてね！",
    revealText: "おはな だいすき キツネさんでした！",
    tapsToZoom: 2,
    tapsToOpen: 3
  },
  {
    id: "blue",
    doorColorLabel: "あおい",
    doorSrc: `${ASSET}/door-blue.png`,
    characterSrc: `${ASSET}/blue-owl.png`,
    characterName: "フクロウさん",
    farText: "トントントン！ あおい ドア。だれの おうちかな？",
    nearPrompt: "ドアを 4かい トントン タップしてね！",
    revealText: "フクロウさんでした！ もりの おともだちが みんな そろったね！",
    tapsToZoom: 3,
    tapsToOpen: 4
  }
];

type Ripple = { id: number; x: number; y: number };

function KnockMarks({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-3 w-3 rounded-full border-2 border-amber-700 transition sm:h-4 sm:w-4 ${
            i < current ? "scale-110 bg-amber-300" : "bg-white/70"
          }`}
        />
      ))}
    </div>
  );
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => ({
        id: i,
        left: `${(i * 17) % 100}%`,
        delay: (i % 8) * 0.08,
        color: ["#ff8a5b", "#ffd166", "#6aa35a", "#7ec8e3", "#f2b8c6"][i % 5],
        x: ((i * 37) % 120) - 60
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-10%] h-3 w-2 rounded-sm"
          style={{ left: p.left, backgroundColor: p.color }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{ y: "120vh", opacity: [1, 1, 0], rotate: 360, x: p.x }}
          transition={{ duration: 2.4, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function TontonBook() {
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const [step, setStep] = useState<Step>("far");
  const [knockCount, setKnockCount] = useState(0);
  const [doorOpen, setDoorOpen] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [finished, setFinished] = useState(false);

  const episode = EPISODES[episodeIndex];
  const needed =
    step === "far" ? episode.tapsToZoom : step === "near" ? episode.tapsToOpen : 0;

  const caption = useMemo(() => {
    if (step === "far") return episode.farText;
    if (step === "near") return episode.nearPrompt;
    return episode.revealText;
  }, [episode, step]);

  const addRipple = useCallback((clientX: number, clientY: number, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const ripple: Ripple = {
      id: Date.now() + Math.random(),
      x: clientX - rect.left,
      y: clientY - rect.top
    };
    setRipples((prev) => [...prev, ripple]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 600);
  }, []);

  const playKnockFeedback = useCallback(() => {
    setShaking(true);
    window.setTimeout(() => setShaking(false), 280);
  }, []);

  const resetEpisodeState = useCallback(() => {
    setStep("far");
    setKnockCount(0);
    setDoorOpen(false);
    setShowConfetti(false);
  }, []);

  const restartAll = useCallback(() => {
    setEpisodeIndex(0);
    setFinished(false);
    resetEpisodeState();
  }, [resetEpisodeState]);

  const goNextEpisode = useCallback(() => {
    if (episodeIndex >= EPISODES.length - 1) {
      setFinished(true);
      setShowConfetti(true);
      return;
    }
    setEpisodeIndex((i) => i + 1);
    resetEpisodeState();
  }, [episodeIndex, resetEpisodeState]);

  const handleDoorTap = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (step === "reveal" || finished) return;

      addRipple(e.clientX, e.clientY, e.currentTarget);
      playKnockFeedback();

      const nextCount = knockCount + 1;
      setKnockCount(nextCount);

      if (step === "far") {
        if (nextCount >= episode.tapsToZoom) {
          setStep("near");
          setKnockCount(0);
        }
        return;
      }

      if (step === "near" && nextCount >= episode.tapsToOpen) {
        setDoorOpen(true);
        setStep("reveal");
        if (episodeIndex === EPISODES.length - 1) {
          setFinished(true);
          setShowConfetti(true);
        }
      }
    },
    [
      addRipple,
      episode.tapsToOpen,
      episode.tapsToZoom,
      episodeIndex,
      finished,
      knockCount,
      playKnockFeedback,
      step
    ]
  );

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 px-3 py-4 sm:gap-5 sm:px-5 sm:py-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="rounded-full bg-white/80 px-3 py-1.5 text-sm font-bold text-stone-700 shadow"
        >
          ← トップへ
        </Link>
        <h1
          className="text-center text-xl text-white drop-shadow sm:text-3xl"
          style={{ fontFamily: '"Yomogi", cursive' }}
        >
          トントントン！だれの おうちかな？
        </h1>
        <span className="rounded-full bg-white/80 px-3 py-1.5 text-sm font-extrabold text-stone-600">
          {episodeIndex + 1} / {EPISODES.length}
        </span>
      </div>

      <p className="text-center text-base font-bold text-stone-600 sm:text-lg">
        〜もりのおともだち〜
      </p>

      {/* 16:9 ステージ */}
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[22px] border-[3px] border-white/80 bg-[#fff8ea] shadow-2xl">
        <motion.div
          className="relative aspect-video w-full origin-center overflow-hidden"
          animate={{
            scale: step === "far" ? 1 : 1.55
          }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transformOrigin: "50% 58%"
          }}
        >
          {/* 背景 */}
          <Image
            src={`${ASSET}/forest-bg.png`}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* キャラクター（ドアの真後ろ） */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[52%] z-10 w-[28%] -translate-x-1/2 -translate-y-1/2 sm:w-[24%]"
            initial={false}
            animate={
              doorOpen
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.2, y: 24 }
            }
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: doorOpen ? 0.15 : 0 }}
          >
            <Image
              src={episode.characterSrc}
              alt={episode.characterName}
              width={500}
              height={500}
              className="h-auto w-full drop-shadow-xl"
              priority
            />
          </motion.div>

          {/* ドア */}
          <motion.button
            type="button"
            aria-label={`${episode.doorColorLabel}ドアをトントン`}
            className="absolute left-1/2 top-[56%] z-20 w-[22%] -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 sm:w-[18%]"
            onClick={handleDoorTap}
            animate={
              doorOpen
                ? { rotateY: -72, x: "-18%", opacity: 0.35 }
                : shaking
                  ? { x: [0, -6, 6, -4, 4, 0], rotate: [0, -1.5, 1.5, 0] }
                  : { rotateY: 0, x: 0, opacity: 1 }
            }
            transition={
              doorOpen
                ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.28 }
            }
            style={{ transformStyle: "preserve-3d", perspective: 800 }}
            disabled={step === "reveal"}
          >
            <Image
              src={episode.doorSrc}
              alt={`${episode.doorColorLabel}ドア`}
              width={400}
              height={640}
              className="h-auto w-full drop-shadow-lg"
              priority
            />

            {/* 波紋 */}
            <AnimatePresence>
              {ripples.map((r) => (
                <motion.span
                  key={r.id}
                  className="pointer-events-none absolute rounded-full border-4 border-amber-200/90 bg-amber-100/30"
                  style={{ left: r.x, top: r.y, marginLeft: -10, marginTop: -10 }}
                  initial={{ width: 20, height: 20, opacity: 0.9 }}
                  animate={{ width: 120, height: 120, opacity: 0, marginLeft: -60, marginTop: -60 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                />
              ))}
            </AnimatePresence>

            {/* コン！視覚エフェクト */}
            <AnimatePresence>
              {shaking && (
                <motion.span
                  className="pointer-events-none absolute left-1/2 top-[-8%] -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-lg font-extrabold text-amber-700 shadow sm:text-2xl"
                  initial={{ opacity: 0, y: 8, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1.05 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  コン！
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {showConfetti && <Confetti />}

        {/* おしまいオーバーレイ */}
        <AnimatePresence>
          {finished && step === "reveal" && episodeIndex === EPISODES.length - 1 && (
            <motion.div
              className="absolute inset-x-0 bottom-0 z-40 flex flex-col items-center gap-3 bg-gradient-to-t from-[#fff7e8]/95 to-transparent px-4 pb-5 pt-16"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p
                className="text-4xl text-rose-500 sm:text-5xl"
                style={{ fontFamily: '"Yomogi", cursive' }}
              >
                おしまい
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* テキストUI */}
      <div className="mx-auto w-full max-w-5xl rounded-3xl bg-[#fffaf0]/95 p-4 text-center shadow-lg sm:p-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${episode.id}-${step}-${caption}`}
            className="text-2xl font-bold leading-relaxed text-stone-700 sm:text-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            {caption}
          </motion.p>
        </AnimatePresence>

        {step !== "reveal" && needed > 0 && (
          <div className="mt-3 space-y-1">
            <KnockMarks total={needed} current={knockCount} />
            <p className="text-base font-bold text-emerald-700 sm:text-lg">
              のこり {Math.max(0, needed - knockCount)}かい
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {step === "reveal" && !finished && (
            <button
              type="button"
              onClick={goNextEpisode}
              className="rounded-2xl bg-[#6aa35a] px-5 py-3 text-xl font-extrabold text-white shadow-[0_3px_0_#4e7f42] transition hover:-translate-y-0.5 sm:text-2xl"
            >
              つぎのおうちへ
            </button>
          )}

          {finished && (
            <button
              type="button"
              onClick={restartAll}
              className="rounded-2xl bg-orange-400 px-5 py-3 text-xl font-extrabold text-white shadow-[0_3px_0_#c27120] transition hover:-translate-y-0.5 sm:text-2xl"
            >
              もういちどあそぶ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
