export interface Breakpoint {
  media?: string;
  width: number;
}
export interface PictureProps {
  src: string;
  alt?: string;
  eager?: boolean;
  breakpoints?: Breakpoint[];
}
export const createMultiOptimizedPicture = (
  pictures: PictureProps[],
): HTMLPictureElement | null => {
  if (!pictures || pictures.length === 0) {
    console.error('No pictures provided');
    return null;
  }
  const pictureEl = document.createElement('picture');
  pictures.forEach((picture, i) => {
    const lastElement = i === pictures.length - 1;
    const {
      src,
      alt = '',
      eager = false,
      breakpoints = [{ media: '(min-width: 600px)', width: 2000 }, { width: 750 }],
    } = picture;

    const url = new URL(src, window.location.href);
    const { pathname } = url;
    const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

    // webp
    breakpoints.forEach((br) => {
      const source = document.createElement('source');
      if (br.media) source.setAttribute('media', br.media);
      source.setAttribute('type', 'image/webp');
      source.setAttribute('srcset', `${pathname}?width=${br.width}&format=webply&optimize=medium`);
      pictureEl.appendChild(source);
    });

    // fallback
    breakpoints.forEach((br, i) => {
      if (i < breakpoints.length - 1) {
        const source = document.createElement('source');
        if (br.media) source.setAttribute('media', br.media);
        source.setAttribute(
          'srcset',
          `${pathname}?width=${br.width}&format=${ext}&optimize=medium`,
        );
        pictureEl.appendChild(source);
      } else if (lastElement) {
        const img = document.createElement('img');
        img.setAttribute('loading', eager ? 'eager' : 'lazy');
        img.setAttribute('alt', alt);
        pictureEl.appendChild(img);
        img.setAttribute('src', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
      }
    });
  });
  return sortPictureElement(pictureEl);
};

const sortPictureElement = (pictures: HTMLPictureElement): HTMLPictureElement => {
  const sources = Array.from(pictures.querySelectorAll('source'));
  const img = pictures.querySelector('img');
  sources.sort(breakpointSort);
  pictures.innerHTML = '';
  sources.forEach((source) => {
    pictures.appendChild(source);
  });
  if (img) {
    pictures.appendChild(img);
  }
  return pictures;
};

const minWidthRegex = /.*min-width: *(\d+)px/;
const breakpointSort = (a: HTMLSourceElement, b: HTMLSourceElement) => {
  const a_width = parseMinWidth(a);
  const b_width = parseMinWidth(b);

  console.log(a_width, b_width);

  return b_width - a_width;
};

const parseMinWidth = (source: HTMLSourceElement): number => {
  const media = source.getAttribute('media') || '';

  return minWidthRegex.test(media) ? parseInt(minWidthRegex.exec(media)![1], 10) : 0;
};
