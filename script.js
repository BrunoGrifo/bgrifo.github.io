const items = document.querySelectorAll('.timeline-content li');

const isInViewport = el => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const run = () =>
  items.forEach(item => {
    if (isInViewport(item)) {
      item.classList.add('show');
    }
  });

// Events
window.addEventListener('load', run);
window.addEventListener('resize', run);

// Use IntersectionObserver to trigger timeline animations when sections snap into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) run();
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(s => observer.observe(s));

// Timeline scroll arrows
const timelineContent = document.querySelector('#timeline .timeline-content');
const timelineWrapper = document.querySelector('.timeline-wrapper');

const updateTimelineArrows = () => {
  if (!timelineContent || !timelineWrapper) return;
  const { scrollTop, scrollHeight, clientHeight } = timelineContent;
  timelineWrapper.classList.toggle('can-scroll-down', scrollTop + clientHeight < scrollHeight - 1);
  timelineWrapper.classList.toggle('can-scroll-up', scrollTop > 1);
};

if (timelineContent) {
  timelineContent.addEventListener('scroll', () => {
    updateTimelineArrows();
    run();
  });
}

window.addEventListener('load', updateTimelineArrows);
window.addEventListener('resize', updateTimelineArrows);
