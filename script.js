const timelineContent = document.querySelector('#timeline .timeline-content');
const timelineWrapper = document.querySelector('.timeline-wrapper');
const items = document.querySelectorAll('.timeline-content li');

// Observe each li relative to the scrollable timeline-content container
const itemObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { root: timelineContent, threshold: 0.1 });

items.forEach(item => itemObserver.observe(item));

// Timeline scroll arrows
const updateTimelineArrows = () => {
  if (!timelineContent || !timelineWrapper) return;
  const { scrollTop, scrollHeight, clientHeight } = timelineContent;
  timelineWrapper.classList.toggle('can-scroll-down', scrollTop + clientHeight < scrollHeight - 1);
  timelineWrapper.classList.toggle('can-scroll-up', scrollTop > 1);
};

if (timelineContent) {
  timelineContent.addEventListener('scroll', updateTimelineArrows);
}

window.addEventListener('load', updateTimelineArrows);
window.addEventListener('resize', updateTimelineArrows);
