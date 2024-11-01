# Image Optimizer w/ Multiple Images

This makes it trivial to specify multiple images which can be delivered at different
breakpoints for Edge Delivery Services.

Example:

```js
const resultElement = createMultiOptimizedPicture([
    {
        src: '/some_mobile_image.jpg',
        alt: "Alt text for image to be delivered to mobile devices",
        breakpoints: [{ width: 1000 }]
    },
    {
        src: '/some_desktop_image.jpg',
        alt: "Alt text for image",
        breakpoints: [{ media: '(min-width: 600px)', width: 2000}]
    }
]);
```

This results in markup like the following:

```
<picture>
    <source type="image/webp" srcset="/some_mobile_image.jpg?width=1000&format=webply&optimize=medium">
    <source media="(min-width: 600px)" type="image/webp" srcset="/some_desktop_image.jpg?width=2000&format=webply&optimize=medium">
    <img loading="lazy" alt="Alt text for image" src="/some_desktop_image.jpg?width=2000&format=jpg&optimize=medium">
</picture>
```
