import React from 'react';

function CaseImage({ image, mobileImage, alt, className = '' }) {
  return (
    <picture>
      {mobileImage ? <source media="(max-width: 1024px)" srcSet={mobileImage} /> : null}
      <img className={className} src={image} alt={alt} />
    </picture>
  );
}

export function CaseVisual({ caseItem }) {
  const isClickable = caseItem.href && caseItem.href !== '#';

  if (caseItem.variant === 'featured') {
    return (
      <>
        <div
          className="case-backdrop case-backdrop-featured"
          style={{ backgroundImage: `url(${caseItem.backdrop})` }}
        />
        <a
          className={`case-visual case-visual-featured${
            isClickable ? ' case-visual-link' : ''
          }`}
          href={isClickable ? caseItem.href : undefined}
          aria-label={isClickable ? `Открыть кейс ${caseItem.title}` : undefined}
        >
          <CaseImage
            image={caseItem.image.src}
            mobileImage={caseItem.mobileImage?.src}
            alt={caseItem.mobileImage?.alt || caseItem.image.alt}
          />
        </a>
      </>
    );
  }

  if (caseItem.variant === 'wide') {
    return (
      <a
        className={`case-visual case-visual-news${isClickable ? ' case-visual-link' : ''}`}
        href={isClickable ? caseItem.href : undefined}
        aria-label={isClickable ? `Открыть кейс ${caseItem.title}` : undefined}
      >
        <CaseImage
          image={caseItem.image.src}
          mobileImage={caseItem.mobileImage?.src}
          alt={caseItem.mobileImage?.alt || caseItem.image.alt}
        />
      </a>
    );
  }

  if (caseItem.variant === 'kokoc') {
    return (
      <>
        <a
          className={`case-visual case-visual-kokoc-main${
            isClickable ? ' case-visual-link' : ''
          }`}
          href={isClickable ? caseItem.href : undefined}
          aria-label={isClickable ? `Открыть кейс ${caseItem.title}` : undefined}
        >
          <CaseImage
            image={caseItem.image.src}
            mobileImage={caseItem.mobileImage?.src}
            alt={caseItem.mobileImage?.alt || caseItem.image.alt}
          />
        </a>
        <a
          className={`case-visual case-visual-kokoc-side${
            isClickable ? ' case-visual-link' : ''
          }`}
          href={isClickable ? caseItem.href : undefined}
          aria-label={isClickable ? `Открыть кейс ${caseItem.title}` : undefined}
        >
          <img src={caseItem.secondaryImage.src} alt={caseItem.secondaryImage.alt} />
        </a>
      </>
    );
  }

  return (
    <a
      className={`case-visual case-visual-iquoto${isClickable ? ' case-visual-link' : ''}`}
      href={isClickable ? caseItem.href : undefined}
      aria-label={isClickable ? `Открыть кейс ${caseItem.title}` : undefined}
    >
      <CaseImage
        image={caseItem.image.src}
        mobileImage={caseItem.mobileImage?.src}
        alt={caseItem.mobileImage?.alt || caseItem.image.alt}
      />
    </a>
  );
}
