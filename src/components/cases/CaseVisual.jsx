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
  if (caseItem.variant === 'featured') {
    return (
      <>
        <div
          className="case-backdrop case-backdrop-featured"
          style={{ backgroundImage: `url(${caseItem.backdrop})` }}
        />
        <div className="case-visual case-visual-featured">
          <CaseImage
            image={caseItem.image.src}
            mobileImage={caseItem.mobileImage?.src}
            alt={caseItem.mobileImage?.alt || caseItem.image.alt}
          />
        </div>
      </>
    );
  }

  if (caseItem.variant === 'wide') {
    return (
      <div className="case-visual case-visual-news">
        <CaseImage
          image={caseItem.image.src}
          mobileImage={caseItem.mobileImage?.src}
          alt={caseItem.mobileImage?.alt || caseItem.image.alt}
        />
      </div>
    );
  }

  if (caseItem.variant === 'kokoc') {
    return (
      <>
        <div className="case-visual case-visual-kokoc-main">
          <CaseImage
            image={caseItem.image.src}
            mobileImage={caseItem.mobileImage?.src}
            alt={caseItem.mobileImage?.alt || caseItem.image.alt}
          />
        </div>
        <div className="case-visual case-visual-kokoc-side">
          <img src={caseItem.secondaryImage.src} alt={caseItem.secondaryImage.alt} />
        </div>
      </>
    );
  }

  return (
    <div className="case-visual case-visual-iquoto">
      <CaseImage
        image={caseItem.image.src}
        mobileImage={caseItem.mobileImage?.src}
        alt={caseItem.mobileImage?.alt || caseItem.image.alt}
      />
    </div>
  );
}
