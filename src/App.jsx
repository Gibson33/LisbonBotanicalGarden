import { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import p1 from "./assets/lisbon/photo1.jpg";
import p2 from "./assets/lisbon/photo2.jpg";
import p3 from "./assets/lisbon/photo3.jpg";
import p4 from "./assets/lisbon/photo4.jpg";
import p5 from "./assets/lisbon/photo5.jpg";

const IMAGES = [
  { src: p1, alt: "Lisbon Garden 1" },
  { src: p2, alt: "Lisbon Garden 2" },
  { src: p3, alt: "Lisbon Garden 3" },
  { src: p4, alt: "Lisbon Garden 4" },
  { src: p5, alt: "Lisbon Garden 5" },
];

export default function LisbonBotanicalGarden() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (
        openIndex !== null &&
        (e.key === "ArrowRight" || e.key === "ArrowLeft")
      ) {
        setOpenIndex((prev) => {
          if (prev == null) return prev;
          const dir = e.key === "ArrowRight" ? 1 : -1;
          return (prev + dir + IMAGES.length) % IMAGES.length;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <div className="page">
      <section className="row row-top" aria-label="Top images">
        <button
          className="photo"
          onClick={() => setOpenIndex(0)}
          aria-label="Open image 1"
        >
          <img src={IMAGES[0].src} alt={IMAGES[0].alt} loading="lazy" />
        </button>
        <button
          className="photo"
          onClick={() => setOpenIndex(1)}
          aria-label="Open image 2"
        >
          <img src={IMAGES[1].src} alt={IMAGES[1].alt} loading="lazy" />
        </button>
      </section>

      <section className="heroTitle" aria-label="Title">
        <h1 className="hero-heading">
          LISBON{"\n"}BOTANICAL{"\n"}GARDEN
        </h1>
      </section>

      <section className="row row-bottom" aria-label="Bottom images">
        <button
          className="photo"
          onClick={() => setOpenIndex(2)}
          aria-label="Open image 3"
        >
          <img src={IMAGES[2].src} alt={IMAGES[2].alt} loading="lazy" />
        </button>
        <button
          className="photo"
          onClick={() => setOpenIndex(3)}
          aria-label="Open image 4"
        >
          <img src={IMAGES[3].src} alt={IMAGES[3].alt} loading="lazy" />
        </button>
        <button
          className="photo"
          onClick={() => setOpenIndex(4)}
          aria-label="Open image 5"
        >
          <img src={IMAGES[4].src} alt={IMAGES[4].alt} loading="lazy" />
        </button>
      </section>

      {openIndex !== null && (
        <Lightbox index={openIndex} setIndex={setOpenIndex} images={IMAGES} />
      )}
    </div>
  );
}

function Lightbox({ index, setIndex, images }) {
  const backdropRef = useRef(null);
  const close = () => setIndex(null);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);
  const onBackdrop = (e) => {
    if (e.target === backdropRef.current) close();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={backdropRef} className="lightbox" onClick={onBackdrop}>
      <button className="x" onClick={close} aria-label="Close">
        ×
      </button>
      <button className="nav left" onClick={prev} aria-label="Previous">
        ‹
      </button>
      <figure className="frame">
        <img src={images[index].src} alt={images[index].alt} />
      </figure>
      <button className="nav right" onClick={next} aria-label="Next">
        ›
      </button>
    </div>
  );
}
