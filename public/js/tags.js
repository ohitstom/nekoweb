console.log("parsing markdown");
const markdownTags = document.querySelectorAll("markdown");
markdownTags.forEach(tag => {
	tag.innerHTML = marked.parse(tag.innerHTML.trim().replace(/\\n/g, "\n").replace(/\t/g, ""));
	tag.setAttribute("loaded", "");
});
