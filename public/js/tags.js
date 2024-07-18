console.log("parsing markdown");
const markdownTags = document.querySelectorAll("markdown");
markdownTags.forEach((tag) => {
  tag.innerHTML = marked.parse(tag.innerHTML);
  tag.setAttribute("loaded", "");
});
