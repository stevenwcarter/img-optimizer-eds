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
  return pictureEl;
};
